// js/products.js
// Async product loader — Shopify-first, falls back to local data.js

import { PRODUCTS as LOCAL_PRODUCTS, TYPES } from './data.js';
import { fetchProducts } from './shopify.js';

export { TYPES };

let _products = null;

/**
 * Load products from Shopify if configured, otherwise use local data.
 * Caches result for the lifetime of the page.
 */
export async function loadProducts() {
  if (_products) return _products;
  try {
    const r = await fetchProducts();
    if (r.configured && r.products?.length > 0) {
      _products = r.products;
      return _products;
    }
  } catch {
    // Shopify unavailable — fall through to local data
  }
  _products = LOCAL_PRODUCTS;
  return _products;
}

/**
 * Synchronous accessor — returns whatever was last loaded.
 * Always call loadProducts() first and await it before using this.
 */
export function getProducts() {
  return _products ?? LOCAL_PRODUCTS;
}
