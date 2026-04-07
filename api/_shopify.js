// api/_shopify.js — shared Shopify helpers for all Vercel functions

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN  = process.env.SHOPIFY_STOREFRONT_TOKEN;

export function shopifyConfigured() {
  return TOKEN &&
    !TOKEN.startsWith('YOUR_') &&
    !TOKEN.endsWith('Shopify-Storefront-Access-Token');
}

export async function shopifyGQL(query, variables = {}) {
  const res = await fetch(`https://${DOMAIN}/api/2025-01/graphql.json`, {
    method:  'POST',
    headers: {
      'Content-Type':                      'application/json',
      'X-Shopify-Storefront-Access-Token':  TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type':                'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
