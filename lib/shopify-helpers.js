// api/shopify-helpers.js — shared Shopify helpers for all Vercel functions

export function shopifyConfigured() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token  = process.env.SHOPIFY_STOREFRONT_TOKEN;
  return domain && token &&
    !token.startsWith('YOUR_') &&
    !token.endsWith('Shopify-Storefront-Access-Token');
}

export async function shopifyGQL(query, variables = {}) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token  = process.env.SHOPIFY_STOREFRONT_TOKEN;
  const res = await fetch(`https://${domain}/api/2025-01/graphql.json`, {
    method:  'POST',
    headers: {
      'Content-Type':                      'application/json',
      'X-Shopify-Storefront-Access-Token':  token,
    },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(8000),
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
