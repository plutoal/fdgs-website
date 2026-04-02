import { Cart }             from '../cart.js';
import { HeaderHTML, updateBadge, initHeader } from '../components/header.js';
import { FooterHTML }        from '../components/footer.js';
import { CartDrawerHTML, refreshCartDrawer, openCartDrawer, closeCartDrawer, initCartDrawer } from '../components/cartDrawer.js';
import { PRODUCTS }          from '../data.js';

// ── MOUNT CHROME ─────────────────────────────────────────
document.getElementById('cart-root').innerHTML   = CartDrawerHTML();
document.getElementById('header-root').innerHTML = HeaderHTML({ logoHref: 'index.html' });
document.getElementById('footer-root').innerHTML = FooterHTML();
document.title = 'Order Confirmed — FDGS Garage Parts';

// ── EXTRACT ORDER INFO ────────────────────────────────────
const params  = new URLSearchParams(window.location.search);
const orderId = params.get('order_id') || params.get('order') || null;

// Clear cart on arrival (PRD §3.6)
Cart.clear?.() ?? localStorage.removeItem('fdgs_cart');

// Estimated delivery (3–7 business days from today)
function estimatedDelivery() {
  const d = new Date();
  d.setDate(d.getDate() + 5);
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

// ── RENDER ────────────────────────────────────────────────
document.getElementById('main-root').innerHTML = `
  <div style="max-width:640px;margin:0 auto;padding:72px 24px 96px;text-align:center;">

    <!-- Checkmark -->
    <div style="
      width:80px;height:80px;border-radius:50%;
      background:linear-gradient(135deg,#dcfce7,#bbf7d0);
      display:flex;align-items:center;justify-content:center;
      margin:0 auto 28px;
      box-shadow:0 4px 24px rgba(22,163,74,0.2);
    ">
      <svg width="36" height="36" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    </div>

    <!-- Heading -->
    <h1 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(2rem,6vw,3rem);letter-spacing:-0.02em;color:#1a1a1a;margin-bottom:10px;">
      Order Confirmed!
    </h1>
    <p style="font-size:1rem;color:#6b7280;line-height:1.7;max-width:440px;margin:0 auto 32px;">
      Thank you for your purchase. You'll receive a confirmation email with your order details and tracking information shortly.
    </p>

    <!-- Order details card -->
    <div style="
      background:#fff;border-radius:16px;padding:28px;
      border:1px solid rgba(0,0,0,0.07);text-align:left;margin-bottom:28px;
      box-shadow:0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.05);
    ">
      ${orderId ? `
        <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:16px;margin-bottom:16px;border-bottom:1px solid rgba(0,0,0,0.07);">
          <span style="font-size:0.82rem;color:#6b7280;font-weight:500;">Order Number</span>
          <span style="font-size:0.9rem;font-weight:700;color:#1a1a1a;font-family:monospace;">#${orderId}</span>
        </div>` : ''}
      <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:16px;margin-bottom:16px;border-bottom:1px solid rgba(0,0,0,0.07);">
        <span style="font-size:0.82rem;color:#6b7280;font-weight:500;">Status</span>
        <span style="display:inline-flex;align-items:center;gap:6px;font-size:0.82rem;font-weight:700;color:#16a34a;">
          <svg width="12" height="12" fill="#16a34a" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
          Processing
        </span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:16px;margin-bottom:16px;border-bottom:1px solid rgba(0,0,0,0.07);">
        <span style="font-size:0.82rem;color:#6b7280;font-weight:500;">Shipping Method</span>
        <span style="font-size:0.82rem;font-weight:600;color:#1a1a1a;">Standard Ground (5–7 days)</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:0.82rem;color:#6b7280;font-weight:500;">Estimated Delivery</span>
        <span style="font-size:0.82rem;font-weight:600;color:#1a1a1a;">By ${estimatedDelivery()}</span>
      </div>
    </div>

    <!-- Guest account prompt (PRD §3.6) -->
    <div style="
      background:linear-gradient(135deg,#e8f4fb,#f0f9ff);
      border:1px solid rgba(38,149,200,0.2);border-radius:16px;padding:24px;
      text-align:left;margin-bottom:32px;
    ">
      <div style="display:flex;gap:14px;align-items:flex-start;">
        <div style="
          width:40px;height:40px;border-radius:10px;flex-shrink:0;
          background:#2695c8;display:flex;align-items:center;justify-content:center;
        ">
          <svg width="18" height="18" fill="none" stroke="#fff" stroke-width="2.2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <div>
          <p style="font-weight:700;font-size:0.9rem;color:#1a1a1a;margin-bottom:4px;">Track your order anytime</p>
          <p style="font-size:0.82rem;color:#4b5563;line-height:1.6;margin-bottom:14px;">Create a free account to view order history, track shipments, and save addresses for faster checkout next time.</p>
          <a href="#" style="
            display:inline-flex;align-items:center;gap:8px;
            background:#2695c8;color:#fff;text-decoration:none;
            padding:10px 20px;border-radius:9px;font-size:0.84rem;font-weight:600;
            transition:background 0.15s;
          " onmouseover="this.style.background='#1a6d96'" onmouseout="this.style.background='#2695c8'">
            Create Account
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </div>

    <!-- CTAs -->
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <a href="index.html" class="btn btn-primary" style="padding:13px 28px;font-size:0.9rem;">
        Continue Shopping
      </a>
      <a href="shipping-policy.html" class="btn" style="padding:13px 24px;font-size:0.9rem;background:#fff;border:1.5px solid #e5e7eb;color:#374151;">
        Shipping Info
      </a>
    </div>

  </div>`;

// ── INIT ─────────────────────────────────────────────────
initHeader({ onCartOpen() { refreshCartDrawer(PRODUCTS); openCartDrawer(); } });
initCartDrawer({ products: PRODUCTS, onCheckout() {} });
Cart.onChange(() => { updateBadge(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCartDrawer(); });
updateBadge();
