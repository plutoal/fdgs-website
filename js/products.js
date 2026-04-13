// js/products.js
// Async product loader — Shopify-first, falls back to local data.js

import { PRODUCTS as LOCAL_PRODUCTS, TYPES } from "./data.js";
import { fetchProducts } from "./shopify.js";

export { TYPES };

let _products  = null;
let _heroVideo = null;

export async function loadProducts() {
  if (_products) return _products;
  try {
    const r = await fetchProducts();
    if (r.configured && r.products?.length > 0) {
      _products  = r.products;
      _heroVideo = r.heroVideo || null;
      return _products;
    }
  } catch {
    // Shopify unavailable — fall through to local data
  }
  _products = LOCAL_PRODUCTS;
  return _products;
}

export function getProducts() {
  return _products ?? LOCAL_PRODUCTS;
}

export function getHeroVideo() {
  return _heroVideo;
}
