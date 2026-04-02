// Full-width brand-colored pill — used on product cards
export function InlineQtyControl({ id, qty }) {
  return `
    <div class="qty-inline">
      <button class="qi-btn" data-action="dec-card" data-id="${id}" aria-label="Decrease">−</button>
      <span class="qi-count">${qty}</span>
      <button class="qi-btn" data-action="inc-card" data-id="${id}" aria-label="Increase">+</button>
    </div>`;
}

// Small square buttons — used in cart drawer and product page
export function QtyControl({ id, qty }) {
  return `
    <div style="display:flex;align-items:center;gap:6px;">
      <button class="qty-btn" data-action="dec-qty" data-id="${id}" aria-label="Decrease">−</button>
      <span style="width:24px;text-align:center;font-size:0.875rem;font-weight:600;">${qty}</span>
      <button class="qty-btn" data-action="inc-qty" data-id="${id}" aria-label="Increase">+</button>
    </div>`;
}
