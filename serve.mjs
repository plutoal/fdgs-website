import http from "http";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  GOOGLE_PLACES_API_KEY,
  GOOGLE_PLACE_ID,
  SHOPIFY_STORE_DOMAIN,
  SHOPIFY_STOREFRONT_TOKEN,
} from "./api.config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

// ── JSON response helper ──────────────────────────────────
function json(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify(data));
}

// ── HTTPS GET helper ──────────────────────────────────────
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (r) => {
        let body = "";
        r.on("data", (c) => (body += c));
        r.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch {
            reject(new Error("Invalid JSON from upstream"));
          }
        });
      })
      .on("error", reject);
  });
}

// ── HTTPS POST helper ─────────────────────────────────────
function httpsPost(hostname, path, headers, body) {
  return new Promise((resolve, reject) => {
    const payload = typeof body === "string" ? body : JSON.stringify(body);
    const req = https.request(
      {
        hostname,
        path,
        method: "POST",
        headers: { ...headers, "Content-Length": Buffer.byteLength(payload) },
      },
      (r) => {
        let data = "";
        r.on("data", (c) => (data += c));
        r.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error("Invalid JSON from upstream"));
          }
        });
      },
    );
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

// ── Request body helper ───────────────────────────────────
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve({});
      }
    });
    req.on("error", reject);
  });
}

// ── Shopify Storefront helper ─────────────────────────────
function shopifyConfigured() {
  return (
    SHOPIFY_STOREFRONT_TOKEN &&
    !SHOPIFY_STOREFRONT_TOKEN.startsWith("YOUR_") &&
    !SHOPIFY_STOREFRONT_TOKEN.endsWith("Shopify-Storefront-Access-Token")
  );
}

function shopifyGQL(query, variables = {}) {
  return httpsPost(
    SHOPIFY_STORE_DOMAIN,
    "/api/2025-01/graphql.json",
    {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    { query, variables },
  );
}

// ── API ROUTE: Products ───────────────────────────────────
async function handleProducts(res) {
  if (!shopifyConfigured()) {
    return json(res, 200, { configured: false, products: [] });
  }
  const query = `{
    products(first: 50) {
      nodes {
        id handle title description productType
        images(first: 1) { nodes { url } }
        priceRange       { minVariantPrice { amount } }
        compareAtPriceRange { minVariantPrice { amount } }
        variants(first: 1) {
          nodes { id quantityAvailable price { amount } compareAtPrice { amount } }
        }
        metafield(namespace: "custom", key: "specs") { value }
      }
    }
  }`;
  try {
    const data = await shopifyGQL(query);
    const nodes = data?.data?.products?.nodes || [];
    const products = nodes.map((p, i) => {
      const v = p.variants.nodes[0] || {};
      const price = parseFloat(
        v.price?.amount || p.priceRange.minVariantPrice.amount,
      );
      const compareRaw =
        parseFloat(
          v.compareAtPrice?.amount ||
            p.compareAtPriceRange.minVariantPrice.amount,
        ) || null;
      const compareAt = compareRaw && compareRaw !== price ? compareRaw : null;
      let specs = {};
      if (p.metafield?.value) {
        try {
          specs = JSON.parse(p.metafield.value);
        } catch {}
      }
      return {
        id: i + 1,
        shopifyId: p.id,
        variantId: v.id,
        handle: p.handle,
        name: p.title,
        type: p.productType || "OHD Kits",
        price,
        compareAt,
        stock: v.quantityAvailable ?? 99,
        desc: p.description,
        specs,
        img:
          p.images.nodes[0]?.url ||
          `https://placehold.co/480x320/dbeafe/1d4ed8?text=${encodeURIComponent(p.title)}`,
      };
    });
    json(res, 200, { configured: true, products });
  } catch (err) {
    json(res, 502, { error: err.message, products: [] });
  }
}

// ── API ROUTE: Storefront GraphQL proxy (cart mutations) ──
async function handleStorefront(req, res) {
  if (!shopifyConfigured()) {
    return json(res, 200, { configured: false });
  }
  try {
    const body = await readBody(req);
    const data = await shopifyGQL(body.query, body.variables || {});
    json(res, 200, data);
  } catch (err) {
    json(res, 502, { error: err.message });
  }
}

// ── API ROUTE: Google Reviews ─────────────────────────────
async function handleGoogleReviews(res) {
  if (!GOOGLE_PLACES_API_KEY || GOOGLE_PLACES_API_KEY.startsWith("YOUR_")) {
    return json(res, 200, { configured: false, reviews: [] });
  }
  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${encodeURIComponent(GOOGLE_PLACE_ID)}` +
      `&fields=name,rating,reviews,user_ratings_total` +
      `&reviews_sort=newest` +
      `&key=${GOOGLE_PLACES_API_KEY}`;

    const data = await httpsGet(url);

    if (data.status !== "OK") {
      return json(res, 502, {
        error: `Places API: ${data.status}`,
        reviews: [],
      });
    }

    const reviews = (data.result.reviews || []).slice(0, 5).map((r) => ({
      author: r.author_name,
      avatar: r.profile_photo_url || null,
      rating: r.rating,
      text: r.text,
      date: r.relative_time_description,
      source: "google",
    }));

    json(res, 200, {
      configured: true,
      businessName: data.result.name,
      overallRating: data.result.rating,
      totalRatings: data.result.user_ratings_total,
      reviews,
    });
  } catch (err) {
    json(res, 502, { error: err.message, reviews: [] });
  }
}

// ── API ROUTE: Shopify Metaobject Testimonials ────────────
async function handleMetaReviews(res) {
  if (
    !SHOPIFY_STOREFRONT_TOKEN ||
    SHOPIFY_STOREFRONT_TOKEN.startsWith("YOUR_")
  ) {
    return json(res, 200, { configured: false, testimonials: [] });
  }
  const query = `{
    metaobjects(type: "testimonial", first: 10) {
      nodes {
        fields { key value }
      }
    }
  }`;
  try {
    const data = await httpsPost(
      SHOPIFY_STORE_DOMAIN,
      "/api/2024-04/graphql.json",
      {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      { query },
    );

    const nodes = data?.data?.metaobjects?.nodes || [];
    const testimonials = nodes.map((node) => {
      const f = Object.fromEntries(
        node.fields.map(({ key, value }) => [key, value]),
      );
      return {
        author: f.author || "Anonymous",
        body: f.body || "",
        rating: parseInt(f.rating || "5", 10),
        date: f.date || null,
        verified: f.verified === "true",
        source: "shopify",
      };
    });

    json(res, 200, { configured: true, testimonials });
  } catch (err) {
    json(res, 502, { error: err.message, testimonials: [] });
  }
}

// ── SERVER ────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const urlPath = req.url.split("?")[0];

  // API routes
  if (urlPath === "/api/products") return handleProducts(res);
  if (urlPath === "/api/storefront") return handleStorefront(req, res);
  if (urlPath === "/api/google-reviews") return handleGoogleReviews(res);
  if (urlPath === "/api/metareviews") return handleMetaReviews(res);

  // Static files
  let filePath = path.join(
    __dirname,
    decodeURIComponent(urlPath === "/" ? "/index.html" : urlPath),
  );
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found: " + urlPath);
      return;
    }
    res.writeHead(200, { "Content-Type": mime });
    res.end(data);
  });
});

server.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
