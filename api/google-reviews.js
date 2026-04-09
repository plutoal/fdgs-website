// api/google-reviews.js — GET /api/google-reviews
const https = require('https');

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch { reject(new Error('Invalid JSON')); } });
    });
    req.on('error', reject);
    req.setTimeout(8000, () => { req.destroy(); reject(new Error('Request timed out')); });
  });
}

module.exports = async function handler(_req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const API_KEY  = process.env.GOOGLE_PLACES_API_KEY;
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;

  if (!API_KEY || API_KEY.startsWith('YOUR_')) {
    return res.status(200).json({ configured: false, reviews: [] });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json`
      + `?place_id=${encodeURIComponent(PLACE_ID)}`
      + `&fields=name,rating,reviews,user_ratings_total`
      + `&reviews_sort=newest`
      + `&key=${API_KEY}`;

    const data = await httpsGet(url);

    if (data.status !== 'OK') {
      return res.status(502).json({ error: `Places API: ${data.status}`, reviews: [] });
    }

    const reviews = (data.result.reviews || []).slice(0, 5).map(r => ({
      author: r.author_name,
      avatar: r.profile_photo_url || null,
      rating: r.rating,
      text:   r.text,
      date:   r.relative_time_description,
      source: 'google',
    }));

    return res.status(200).json({
      configured:    true,
      businessName:  data.result.name,
      overallRating: data.result.rating,
      totalRatings:  data.result.user_ratings_total,
      reviews,
    });
  } catch (err) {
    return res.status(502).json({ error: err.message, reviews: [] });
  }
};
