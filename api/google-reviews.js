// api/google-reviews.js — GET /api/google-reviews
import { jsonResponse } from './shopify-helpers.js';

const API_KEY  = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

export default async function handler() {
  if (!API_KEY || API_KEY.startsWith('YOUR_')) {
    return jsonResponse({ configured: false, reviews: [] });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json`
      + `?place_id=${encodeURIComponent(PLACE_ID)}`
      + `&fields=name,rating,reviews,user_ratings_total`
      + `&reviews_sort=newest`
      + `&key=${API_KEY}`;

    const res  = await fetch(url);
    const data = await res.json();

    if (data.status !== 'OK') {
      return jsonResponse({ error: `Places API: ${data.status}`, reviews: [] }, 502);
    }

    const reviews = (data.result.reviews || []).slice(0, 5).map(r => ({
      author: r.author_name,
      avatar: r.profile_photo_url || null,
      rating: r.rating,
      text:   r.text,
      date:   r.relative_time_description,
      source: 'google',
    }));

    return jsonResponse({
      configured:    true,
      businessName:  data.result.name,
      overallRating: data.result.rating,
      totalRatings:  data.result.user_ratings_total,
      reviews,
    });
  } catch (err) {
    return jsonResponse({ error: err.message, reviews: [] }, 502);
  }
}
