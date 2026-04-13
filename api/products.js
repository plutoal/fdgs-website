// api/products.js — GET /api/products
const https = require("https");

function shopifyConfigured() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
  return !!(
    domain &&
    token &&
    !token.startsWith("YOUR_") &&
    !token.endsWith("Shopify-Storefront-Access-Token")
  );
}

function shopifyPost(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ query, variables });
    const req = https.request(
      {
        hostname: process.env.SHOPIFY_STORE_DOMAIN,
        path: "/api/2025-01/graphql.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            process.env.SHOPIFY_STOREFRONT_TOKEN,
          "Content-Length": Buffer.byteLength(payload),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error("Invalid JSON"));
          }
        });
      },
    );
    req.on("error", reject);
    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error("Shopify request timed out"));
    });
    req.write(payload);
    req.end();
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  if (!shopifyConfigured()) {
    return res.status(200).json({ configured: false, products: [] });
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
    metaobjects(type: "site_assets", first: 1) {
      nodes {
        fields { key value }
      }
    }
  }`;

  try {
    const data = await shopifyPost(query);
    const nodes = data?.data?.products?.nodes || [];

    const siteAssets = data?.data?.metaobjects?.nodes?.[0]?.fields || [];
    const heroVideo =
      siteAssets.find((f) => f.key === "hero_video")?.value || null;

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

    return res.status(200).json({ configured: true, products, heroVideo });
  } catch (err) {
    return res.status(502).json({ error: err.message, products: [] });
  }
};
