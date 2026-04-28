import { loadProducts, getProducts } from "../products.js";
import { redirectToCheckout } from "../checkout.js";
import { Cart } from "../cart.js";
import { showToast } from "../toast.js";
import { HeaderHTML, updateBadge, initHeader } from "../components/header.js";
import { FooterHTML } from "../components/footer.js";
import { QtyControl } from "../components/qtyControl.js";

// ── MOUNT CHROME ─────────────────────────────────────────
document.getElementById("header-root").innerHTML = HeaderHTML({
  logoHref: "index.html",
});
document.getElementById("footer-root").innerHTML = FooterHTML();

// STOCK CHECK DISABLED — uncomment when inventory is live (PRD §9.3)
// function auditCartStock() {
//   const cart    = Cart.get();
//   const removed = [];
//   cart.forEach(item => {
//     const p = getProducts().find(x => x.id === item.id);
//     if (!p || p.stock === 0) {
//       Cart.remove(item.id);
//       removed.push(p?.name || `Item #${item.id}`);
//     } else if (item.qty > p.stock) {
//       Cart.changeQty(item.id, p.stock - item.qty, p.stock);
//     }
//   });
//   if (removed.length) {
//     showToast(`⚠ Removed out-of-stock item${removed.length > 1 ? 's' : ''}: ${removed.join(', ')}`);
//   }
// }
function auditCartStock() {} // disabled

// ── RENDER ───────────────────────────────────────────────
function render() {
  auditCartStock();
  const cart = Cart.get();
  const sub = Cart.subtotal(getProducts());

  if (cart.length === 0) {
    document.getElementById("main-root").innerHTML = `
      <div style="min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 24px;">
        <div style="width:64px;height:64px;border-radius:16px;background:#e8f4fb;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
          <svg width="28" height="28" fill="none" stroke="#2695c8" stroke-width="1.8" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        </div>
        <h1 class="font-display font-bold" style="font-size:2rem;margin-bottom:10px;">Your cart is empty</h1>
        <p style="color:#6b7280;margin-bottom:28px;">Browse our OHD parts catalog to get started.</p>
        <a href="index.html" class="btn btn-primary" style="padding:12px 32px;font-size:1rem;border-radius:12px;">Browse Products</a>
      </div>`;
    return;
  }

  const freeShipping = sub >= 200;

  document.getElementById("main-root").innerHTML = `
    <div style="max-width:1280px;margin:0 auto;padding:24px 24px 80px;">

      <!-- Continue shopping link -->
      <a href="index.html" style="display:inline-flex;align-items:center;gap:6px;font-size:0.875rem;color:#6b7280;text-decoration:none;margin-bottom:24px;transition:color 0.15s;" onmouseover="this.style.color='#1a1a1a'" onmouseout="this.style.color='#6b7280'">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
        Continue Shopping
      </a>

      <!-- Page title -->
      <h1 class="font-display font-bold uppercase" style="font-size:clamp(2rem,5vw,3rem);letter-spacing:-0.02em;margin-bottom:8px;">Your Cart</h1>
      <p style="color:#6b7280;font-size:0.9rem;margin-bottom:48px;">${cart.length} item${cart.length !== 1 ? "s" : ""}</p>

      <div class="cart-layout">

        <!-- Items list -->
        <div id="cart-items-list">
          ${cart
            .map((item) => {
              const p = getProducts().find((x) => x.id === item.id);
              if (!p) return "";
              return `
              <div style="display:flex;gap:20px;padding:24px 0;border-bottom:1px solid #f3f4f6;" data-cart-row="${p.id}">
                <a href="product.html?id=${p.id}" style="width:90px;height:90px;border-radius:14px;overflow:hidden;background:#e8f4fb;flex-shrink:0;display:block;">
                  <img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;">
                </a>
                <div style="flex:1;min-width:0;">
                  <a href="product.html?id=${p.id}" style="font-weight:600;font-size:0.95rem;line-height:1.35;color:#1a1a1a;text-decoration:none;display:block;margin-bottom:4px;">${p.name}</a>
                  <p style="font-size:0.8rem;color:#9ca3af;margin-bottom:14px;">${p.type}</p>
                  <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
                    ${QtyControl({ id: p.id, qty: item.qty })}
                    <span style="font-weight:700;font-size:1rem;color:#1a1a1a;">$${(p.price * item.qty).toFixed(2)}</span>
                    <button data-action="remove" data-id="${p.id}" style="color:#d1d5db;background:none;border:none;cursor:pointer;padding:6px;border-radius:8px;display:flex;transition:color 0.15s;" onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='#d1d5db'" aria-label="Remove item">
                      <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                    </button>
                  </div>
                </div>
              </div>`;
            })
            .join("")}

        </div>

        <!-- Order summary -->
        <div style="position:sticky;top:88px;background:#fff;border-radius:20px;border:1px solid rgba(0,0,0,0.07);padding:28px;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <h2 class="font-display font-bold uppercase" style="font-size:1.1rem;letter-spacing:0.02em;margin-bottom:24px;">Order Summary</h2>

          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">
            ${cart
              .map((item) => {
                const p = getProducts().find((x) => x.id === item.id);
                if (!p) return "";
                return `
                <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;">
                  <span style="font-size:0.82rem;color:#6b7280;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${p.name.split(" ").slice(0, 4).join(" ")}… <span style="font-size:0.75rem;color:#9ca3af;">×${item.qty}</span></span>
                  <span style="font-size:0.82rem;font-weight:500;flex-shrink:0;">$${(p.price * item.qty).toFixed(2)}</span>
                </div>`;
              })
              .join("")}
          </div>

          <div style="border-top:1px solid #f3f4f6;padding-top:16px;display:flex;flex-direction:column;gap:10px;">
            <div style="display:flex;justify-content:space-between;font-size:0.875rem;">
              <span style="color:#6b7280;">Subtotal</span>
              <span style="font-weight:600;">$${sub.toFixed(2)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.875rem;">
              <span style="color:#6b7280;">Shipping</span>
              <span style="font-weight:600;color:${freeShipping ? "#16a34a" : "#6b7280"};">${freeShipping ? "Free" : "Calculated at checkout"}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.875rem;">
              <span style="color:#6b7280;">Tax</span>
              <span style="color:#9ca3af;font-size:0.8rem;">Calculated at checkout</span>
            </div>
            <div style="border-top:1px solid #f3f4f6;padding-top:14px;display:flex;justify-content:space-between;">
              <span style="font-weight:700;font-size:1rem;">Estimated Total</span>
              <span style="font-weight:800;font-size:1.2rem;color:#1a1a1a;">$${sub.toFixed(2)}</span>
            </div>
          </div>

          <button id="checkout-btn" class="btn btn-primary" style="width:100%;padding:14px;font-size:0.95rem;border-radius:12px;justify-content:center;margin-top:20px;">
            Proceed to Checkout
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          ${!freeShipping ? `<p style="font-size:0.75rem;color:#9ca3af;text-align:center;margin-top:10px;">Add $${(200 - sub).toFixed(2)} more for free shipping</p>` : ""}
        </div>
      </div>
    </div>`;

  // Bind events
  document.getElementById("checkout-btn")?.addEventListener("click", async () => {
    showToast("Redirecting to checkout…");
    await redirectToCheckout({ onError: (msg) => showToast(`⚠ ${msg}`) });
  });

  document.getElementById("cart-items-list")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const id = parseInt(btn.dataset.id);
    const p = getProducts().find((x) => x.id === id);
    if (btn.dataset.action === "dec-qty")
      Cart.changeQty(id, -1, p?.stock ?? 99);
    if (btn.dataset.action === "inc-qty") Cart.changeQty(id, 1, p?.stock ?? 99);
    if (btn.dataset.action === "remove") Cart.remove(id);
  });
}

// ── INIT ─────────────────────────────────────────────────
initHeader({});

(async () => {
  await loadProducts();
  Cart.onChange(() => {
    updateBadge();
    render();
  });
  updateBadge();
  render();
})();
