// api/storefront.js — POST /api/storefront (cart mutation proxy)
import { shopifyConfigured, shopifyGQL, jsonResponse } from './shopify-helpers.js';

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (!shopifyConfigured()) {
    return jsonResponse({ configured: false });
  }

  try {
    const body = await req.json();
    const data = await shopifyGQL(body.query, body.variables || {});
    return jsonResponse(data);
  } catch (err) {
    return jsonResponse({ error: err.message }, 502);
  }
}
