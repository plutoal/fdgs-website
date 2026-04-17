// api/google-reviews.js — GET /api/google-reviews
const https = require("https");

function httpsGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const opts = { hostname: parsed.hostname, path: parsed.pathname + parsed.search, headers };
    const req = https.get(opts, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error("Invalid JSON"));
        }
      });
    });
    req.on("error", reject);
    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error("Request timed out"));
    });
  });
}

module.exports = async function handler(_req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;

  if (!API_KEY || API_KEY.startsWith("YOUR_")) {
    return res.status(200).json({ configured: false, reviews: [] });
  }

  try {
    const url =
      `https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}` +
      `?key=${API_KEY}`;

    const data = await httpsGet(url, {
      "X-Goog-FieldMask": "displayName,rating,reviews,userRatingCount",
    });

    if (data.error) {
      return res
        .status(502)
        .json({ error: `Places API: ${data.error.message}`, reviews: [] });
    }

    const reviews = (data.reviews || []).slice(0, 5).map((r) => ({
      author: r.authorAttribution?.displayName || "Anonymous",
      avatar: r.authorAttribution?.photoUri || null,
      rating: r.rating,
      text: r.text?.text || "",
      date: r.relativePublishTimeDescription,
      source: "google",
    }));

    return res.status(200).json({
      configured: true,
      businessName: data.displayName?.text,
      overallRating: data.rating,
      totalRatings: data.userRatingCount,
      reviews,
    });
  } catch (err) {
    return res.status(502).json({ error: err.message, reviews: [] });
  }
};
