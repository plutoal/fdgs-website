/**
 * API credentials for server-side proxies in serve.mjs
 * Fill in your real values — never commit secrets to source control.
 *
 * HOW TO FIND YOUR GOOGLE PLACE ID:
 *   1. Go to https://developers.google.com/maps/documentation/places/web-service/place-id
 *   2. Search for "Frozen Garage Door Solutions" in the Place ID Finder
 *   3. Copy the Place ID (starts with "ChIJ…") and paste below
 *
 * HOW TO GET A GOOGLE PLACES API KEY:
 *   1. Go to https://console.cloud.google.com/
 *   2. Enable "Places API" for your project
 *   3. Create an API key under Credentials → restrict it to Places API
 */

export const GOOGLE_PLACES_API_KEY = "YOUR_GOOGLE_PLACES_API_KEY";
export const GOOGLE_PLACE_ID = "YOUR_GOOGLE_PLACE_ID"; // e.g. ChIJN1t_tDeuEmsRUsoyG83frY4

/**
 * SHOPIFY — Storefront API (public token, safe to use server-side)
 *
 * HOW TO GET YOUR STOREFRONT ACCESS TOKEN:
 *   Shopify Admin → Apps → Develop Apps → your app → API credentials
 *   → Storefront API access token
 *
 * The metaobject type must be "testimonial" with fields:
 *   author (single_line_text), body (multi_line_text),
 *   rating (number_integer 1–5), date (date), verified (boolean)
 */
export const SHOPIFY_STORE_DOMAIN =
  "frozen-garage-door-solutions-ltd.myshopify.com";
export const SHOPIFY_STOREFRONT_TOKEN =
  "6eb0b320ada355b9a0cb54550febaa886eb0b320ada355b9a0cb54550febaa88-Shopify-Storefront-Access-Token";
