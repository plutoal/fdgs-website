// js/shopify.js
// Shopify Storefront API client — all calls go through the serve.mjs proxy

const CART_KEY = 'fdgs_shopify_cart';

async function proxyGQL(query, variables = {}) {
  const r = await fetch('/api/storefront', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ query, variables }),
  });
  return r.json();
}

// ── Cart field fragment ───────────────────────────────────
const CART_FIELDS = `
  id checkoutUrl
  lines(first: 50) {
    nodes {
      id quantity
      merchandise {
        ... on ProductVariant {
          id
          product { title handle }
          price { amount currencyCode }
          image { url }
        }
      }
    }
  }
  cost {
    totalAmount    { amount currencyCode }
    subtotalAmount { amount currencyCode }
  }
`;

// ── Products ──────────────────────────────────────────────
export async function fetchProducts() {
  const r = await fetch('/api/products');
  return r.json(); // { configured, products[] }
}

// ── Cart mutations ────────────────────────────────────────
export async function cartCreate(lines = []) {
  const data = await proxyGQL(`
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }`, { input: { lines } });
  return data?.data?.cartCreate;
}

export async function cartLinesAdd(cartId, lines) {
  const data = await proxyGQL(`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }`, { cartId, lines });
  return data?.data?.cartLinesAdd;
}

export async function cartLinesUpdate(cartId, lines) {
  const data = await proxyGQL(`
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }`, { cartId, lines });
  return data?.data?.cartLinesUpdate;
}

export async function cartLinesRemove(cartId, lineIds) {
  const data = await proxyGQL(`
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }`, { cartId, lineIds });
  return data?.data?.cartLinesRemove;
}

// ── Cart ID persistence ───────────────────────────────────
export function getStoredCartId()   { return localStorage.getItem(CART_KEY); }
export function setStoredCartId(id) {
  if (id) localStorage.setItem(CART_KEY, id);
  else    localStorage.removeItem(CART_KEY);
}
