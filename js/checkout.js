// js/checkout.js
// Builds a Shopify cart from localStorage and redirects to Shopify checkout

import { Cart } from './cart.js';
import { getProducts } from './products.js';
import { cartCreate, setStoredCartId } from './shopify.js';

/**
 * Redirect to Shopify checkout.
 * Builds a cartCreate mutation from current localStorage cart items,
 * then redirects the browser to the Shopify-hosted checkout URL.
 *
 * @param {{ onError?: (msg: string) => void }} options
 */
export async function redirectToCheckout({ onError } = {}) {
  const cartItems = Cart.get();
  const products  = getProducts();

  if (!cartItems.length) {
    onError?.('Your cart is empty.');
    return;
  }

  // Map localStorage items to Shopify { merchandiseId, quantity } lines
  const lines = cartItems.flatMap(item => {
    const p = products.find(x => x.id === item.id);
    if (!p?.variantId) {
      console.warn('[checkout] no variantId for cart item id:', item.id, p);
      return [];
    }
    return [{ merchandiseId: p.variantId, quantity: item.qty }];
  });

  console.log('[checkout] lines to send:', lines);

  if (!lines.length) {
    onError?.('No valid products found. Please refresh and try again.');
    return;
  }

  try {
    const result = await cartCreate(lines);
    console.log('[checkout] cartCreate result:', result);

    if (result?.userErrors?.length) {
      onError?.(result.userErrors.map(e => e.message).join(', '));
      return;
    }

    const checkoutUrl = result?.cart?.checkoutUrl;
    if (!checkoutUrl) {
      console.error('[checkout] no checkoutUrl in result:', result);
      onError?.('Could not create checkout. Please try again.');
      return;
    }

    // Persist cart ID in case we need it later (e.g. cart recovery)
    setStoredCartId(result.cart.id);

    // Redirect to Shopify checkout
    window.location.href = checkoutUrl;
  } catch (err) {
    console.error('[checkout] error:', err);
    onError?.(err.message || 'Checkout failed. Please try again.');
  }
}
