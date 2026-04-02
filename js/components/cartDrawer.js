import { Cart } from '../cart.js';
import { QtyControl } from './qtyControl.js';

export function CartDrawerHTML() {
  return `
    <div id="cart-scrim" class="scrim"></div>
    <div id="cart-drawer" role="dialog" aria-label="Shopping cart">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid #f3f4f6;flex-shrink:0;">
        <h2 class="font-display font-bold uppercase" style="font-size:1.25rem;letter-spacing:-0.01em;">Cart</h2>
        <button id="cart-close" class="btn btn-ghost" style="color:#6b7280;padding:6px;border-radius:8px;" aria-label="Close cart">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div id="cart-items" style="flex:1;overflow-y:auto;padding:16px 24px;display:none;"></div>

      <div id="cart-empty" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;text-align:center;">
        <div style="width:56px;height:56px;border-radius:14px;background:#e8f4fb;display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
          <svg width="26" height="26" fill="none" stroke="#2695c8" stroke-width="1.8" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        </div>
        <p class="font-semibold" style="font-size:1.05rem;margin-bottom:6px;">Your cart is empty</p>
        <p style="color:#6b7280;font-size:0.875rem;margin-bottom:24px;">Browse our OHD parts catalog to get started.</p>
        <button id="cart-browse" class="btn btn-primary">Browse Products</button>
      </div>

      <div id="cart-footer" style="display:none;border-top:1px solid #f3f4f6;padding:20px 24px;flex-shrink:0;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <span style="font-size:0.875rem;color:#6b7280;">Subtotal</span>
          <span id="cart-sub" style="font-weight:700;font-size:1.15rem;"></span>
        </div>
        <p style="font-size:0.75rem;color:#9ca3af;margin-bottom:16px;">Taxes &amp; shipping calculated at checkout</p>
        <button id="cart-checkout" class="btn btn-primary" style="width:100%;padding:14px 20px;font-size:0.95rem;border-radius:12px;justify-content:center;">
          Checkout
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <a href="cart.html" style="display:flex;align-items:center;justify-content:center;width:100%;margin-top:8px;padding:10px;font-size:0.82rem;font-weight:500;color:#2695c8;text-decoration:none;border-radius:8px;border:1px solid #bae6fd;background:#f0f9ff;transition:background 0.15s;" onmouseover="this.style.background='#e0f2fe'" onmouseout="this.style.background='#f0f9ff'">
          View Cart
        </a>
        <button id="cart-continue" style="width:100%;margin-top:6px;font-size:0.8rem;color:#9ca3af;background:none;border:none;cursor:pointer;padding:8px;border-radius:8px;transition:color 0.15s;" onmouseover="this.style.color='#1a1a1a'" onmouseout="this.style.color='#9ca3af'">
          Continue Shopping
        </button>
      </div>
    </div>`;
}

export function refreshCartDrawer(products) {
  const cart    = Cart.get();
  const itemsEl = document.getElementById('cart-items');
  const emptyEl = document.getElementById('cart-empty');
  const footEl  = document.getElementById('cart-footer');
  if (!itemsEl) return;

  const hasItems = cart.length > 0;
  itemsEl.style.display = hasItems ? 'block' : 'none';
  emptyEl.style.display = hasItems ? 'none'  : 'flex';
  footEl.style.display  = hasItems ? 'block' : 'none';
  if (!hasItems) return;

  itemsEl.innerHTML = cart.map(item => {
    const p = products.find(x => x.id === item.id);
    if (!p) return '';
    return `
      <div style="display:flex;gap:12px;padding:14px 0;border-bottom:1px solid #f9fafb;">
        <a href="product.html?id=${p.id}" style="width:60px;height:60px;border-radius:10px;overflow:hidden;background:#e8f4fb;flex-shrink:0;display:block;">
          <img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;">
        </a>
        <div style="flex:1;min-width:0;">
          <p style="font-weight:600;font-size:0.82rem;line-height:1.3;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${p.name}</p>
          <p style="font-size:0.75rem;color:#6b7280;margin-bottom:8px;">${p.type}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
            ${QtyControl({ id: p.id, qty: item.qty })}
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-weight:700;font-size:0.9rem;">$${(p.price * item.qty).toFixed(2)}</span>
              <button data-action="remove" data-id="${p.id}" style="color:#d1d5db;background:none;border:none;cursor:pointer;padding:4px;border-radius:6px;transition:color 0.15s;display:flex;" onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='#d1d5db'" aria-label="Remove">
                <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');

  document.getElementById('cart-sub').textContent = '$' + Cart.subtotal(products).toFixed(2);
}

export function openCartDrawer() {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('cart-scrim')?.classList.add('on');
  document.body.style.overflow = 'hidden';
}

export function closeCartDrawer() {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('cart-scrim')?.classList.remove('on');
  document.body.style.overflow = '';
}

export function initCartDrawer({ products, onCheckout, onRefreshCards } = {}) {
  document.getElementById('cart-scrim')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cart-close')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cart-browse')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cart-continue')?.addEventListener('click', closeCartDrawer);

  document.getElementById('cart-checkout')?.addEventListener('click', () => onCheckout?.());

  // Event delegation for qty + remove buttons inside drawer
  document.getElementById('cart-items')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id     = parseInt(btn.dataset.id);
    const action = btn.dataset.action;
    const p      = products.find(x => x.id === id);
    if (action === 'dec-qty') { Cart.changeQty(id, -1, p?.stock ?? 99); }
    if (action === 'inc-qty') { Cart.changeQty(id,  1, p?.stock ?? 99); }
    if (action === 'remove')  { Cart.remove(id); }
    onRefreshCards?.();
  });
}
