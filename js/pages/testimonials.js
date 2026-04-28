import { Cart } from "../cart.js";
import { showToast } from "../toast.js";
import { HeaderHTML, updateBadge, initHeader } from "../components/header.js";
import { FooterHTML } from "../components/footer.js";
import {
  CartDrawerHTML,
  refreshCartDrawer,
  openCartDrawer,
  closeCartDrawer,
  initCartDrawer,
} from "../components/cartDrawer.js";
import { PRODUCTS } from "../data.js";

// ── CURATED FALLBACK TESTIMONIALS ────────────────────────
// Shown when Shopify metaobjects are not yet configured.
// Replace or supplement these via Shopify Admin → Content → Metaobjects → Testimonial.
const CURATED_TESTIMONIALS = [
  {
    author: "Justin P.",
    location: "Edmonton, AB",
    rating: 5,
    text: "This garage door anti-freeze works exactly as advertised. I'm located in Manitoba, and for a few years now have had nothing but issues with our garage doors freezing and sticking to the concrete floor. After using this system for most of this winter, I am very pleased with how it has performed, our door hasn't stuck once since this system has been installed. Thanks.",
    date: "March 2026",
    verified: true,
    source: "shopify",
  },
  {
    author: "James L.",
    location: "Calgary, AB",
    rating: 5,
    text: "I have been looking for a solution to prevent my garage doors from freezing down for several years. I found Frozen Garage Door Solutions and thought I would give it a try. I have used it for about 30 days now and it has done exactly what it’s supposed to do. It’s a well made, simple design Thats easy to install and it works! I just ordered one for my other garage door.",
    date: "February 2026",
    verified: true,
    source: "shopify",
  },
  {
    author: "Rick S.",
    location: "Vancouver, BC",
    rating: 5,
    text: "Great product ! this Really saves your door when you least expect it. I highly recommend Frozen Garage Door Solutions for their products and Service ! Don't wait to get yours though because it will be too late if you have a frozen Door.",
    date: "April 2024",
    verified: true,
    source: "shopify",
  },
];

// ── HELPERS ──────────────────────────────────────────────
const stars = (n) =>
  Array.from(
    { length: 5 },
    (_, i) =>
      `<svg width="14" height="14" viewBox="0 0 24 24" fill="${i < n ? "#f59e0b" : "#e5e7eb"}" xmlns="http://www.w3.org/2000/svg">
       <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
     </svg>`,
  ).join("");

const sourceBadge = (source) =>
  source === "google"
    ? `<span style="display:inline-flex;align-items:center;gap:5px;font-size:0.7rem;font-weight:700;color:#4285F4;background:#EFF6FF;border:1px solid #BFDBFE;padding:2px 8px;border-radius:20px;letter-spacing:0.02em;">
       <svg width="10" height="10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
         <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
         <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
         <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
         <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
       </svg>
       Google Review
     </span>`
    : `<span style="display:inline-flex;align-items:center;gap:5px;font-size:0.7rem;font-weight:700;color:#16a34a;background:#f0fdf4;border:1px solid #bbf7d0;padding:2px 8px;border-radius:20px;letter-spacing:0.02em;">
       <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
       Verified Purchase
     </span>`;

const avatar = (r) =>
  r.avatar
    ? `<img src="${r.avatar}" alt="${r.author}" style="width:42px;height:42px;border-radius:50%;object-fit:cover;flex-shrink:0;">`
    : `<div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#2695c8,#1a6d96);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700;font-size:1rem;color:#fff;">${(r.author || "?")[0].toUpperCase()}</div>`;

function ReviewCard(r) {
  return `
    <article style="
      background:#fff; border-radius:16px; padding:24px;
      border:1px solid rgba(0,0,0,0.06);
      box-shadow:0 1px 2px rgba(38,149,200,0.03),0 4px 16px rgba(38,149,200,0.05),0 12px 24px rgba(0,0,0,0.04);
      display:flex; flex-direction:column; gap:14px;
    ">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;">
        <div style="display:flex;align-items:center;gap:12px;">
          ${avatar(r)}
          <div>
            <div style="font-weight:600;font-size:0.9rem;color:#1a1a1a;">${r.author}</div>
            ${r.location ? `<div style="font-size:0.75rem;color:#9ca3af;margin-top:1px;">${r.location}</div>` : ""}
          </div>
        </div>
        ${sourceBadge(r.source)}
      </div>

      <div style="display:flex;align-items:center;gap:6px;">
        <div style="display:flex;gap:2px;">${stars(r.rating)}</div>
        <span style="font-size:0.75rem;color:#6b7280;margin-left:4px;">${r.date || ""}</span>
      </div>

      <p style="font-size:0.88rem;line-height:1.75;color:#374151;margin:0;">${r.text}</p>
    </article>`;
}

function RatingBar({ label, count, total }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return `
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="font-size:0.78rem;color:#6b7280;width:32px;text-align:right;flex-shrink:0;">${label}★</span>
      <div style="flex:1;height:6px;border-radius:3px;background:#e5e7eb;overflow:hidden;">
        <div style="height:100%;width:${pct}%;background:#f59e0b;border-radius:3px;transition:width 0.6s ease;"></div>
      </div>
      <span style="font-size:0.75rem;color:#9ca3af;width:28px;flex-shrink:0;">${count}</span>
    </div>`;
}

function RatingSummary({ overallRating, totalRatings, allReviews }) {
  const dist = [5, 4, 3, 2, 1].map((n) => ({
    label: n,
    count: allReviews.filter((r) => r.rating === n).length,
  }));
  return `
    <div style="
      background:#fff; border-radius:20px; padding:32px;
      border:1px solid rgba(0,0,0,0.06);
      box-shadow:0 1px 2px rgba(38,149,200,0.03),0 8px 24px rgba(38,149,200,0.06);
      display:flex; gap:40px; align-items:center; flex-wrap:wrap; margin-bottom:48px;
    ">
      <div style="text-align:center;flex-shrink:0;">
        <div style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:4rem;line-height:1;color:#1a1a1a;">${overallRating.toFixed(1)}</div>
        <div style="display:flex;justify-content:center;gap:2px;margin:8px 0 6px;">${stars(Math.round(overallRating))}</div>
        <div style="font-size:0.78rem;color:#9ca3af;">${totalRatings} reviews</div>
      </div>
      <div style="flex:1;min-width:180px;display:flex;flex-direction:column;gap:8px;">
        ${dist.map(({ label, count }) => RatingBar({ label, count, total: totalRatings })).join("")}
      </div>
    </div>`;
}

// ── RENDER ────────────────────────────────────────────────
function renderPage(googleData, shopifyData) {
  const googleReviews = googleData.reviews || [];
  const shopifyTestimonials =
    shopifyData.configured && shopifyData.testimonials?.length
      ? shopifyData.testimonials
      : CURATED_TESTIMONIALS;

  const allReviews = [...googleReviews, ...shopifyTestimonials];
  const totalRatings = allReviews.length;
  const overallRating = totalRatings
    ? allReviews.reduce((s, r) => s + r.rating, 0) / totalRatings
    : 5.0;

  const googleConfigured = googleData.configured;

  document.getElementById("main-root").innerHTML = `
    <div style="max-width:1100px;margin:0 auto;padding:calc(var(--hdr) + var(--banner) + 32px) 24px 96px;">

      <!-- Breadcrumb -->
      <nav style="display:flex;align-items:center;gap:8px;font-size:0.8rem;color:#9ca3af;margin-bottom:40px;flex-wrap:wrap;">
        <a href="index.html" style="color:#6b7280;text-decoration:none;transition:color 0.15s;"
           onmouseover="this.style.color='#1a1a1a'" onmouseout="this.style.color='#6b7280'">Home</a>
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        <span style="color:#1a1a1a;font-weight:500;">Customer Reviews</span>
      </nav>

      <!-- Heading -->
      <div style="margin-bottom:40px;">
        <h1 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(2rem,5vw,3rem);letter-spacing:-0.02em;color:#1a1a1a;margin-bottom:8px;">What Our Customers Say</h1>
        <p style="font-size:0.95rem;color:#6b7280;max-width:560px;line-height:1.7;">Real reviews from verified Google customers and confirmed purchases.</p>
      </div>

      <!--
      ${
        !googleConfigured
          ? `
        <div style="display:flex;align-items:center;gap:12px;background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:14px 18px;margin-bottom:40px;font-size:0.84rem;color:#92400e;">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>Google reviews will appear here once you add your <strong>Place ID</strong> and <strong>API key</strong> to <code style="background:#fef3c7;padding:1px 5px;border-radius:4px;">api.config.mjs</code>. Showing curated testimonials in the meantime.</span>
        </div>`
          : ""
      }
      -->

      <!-- Tabs -->
      <div style="display:flex;gap:0;margin-bottom:36px;border-bottom:2px solid #e5e7eb;">
        <button id="tab-all"    class="rev-tab rev-tab-active" onclick="switchTab('all')">All Reviews <span class="rev-tab-count">${allReviews.length}</span></button>
        <button id="tab-google" class="rev-tab" onclick="switchTab('google')">
          Google <span class="rev-tab-count">${googleReviews.length}</span>
        </button>
        <button id="tab-curated" class="rev-tab" onclick="switchTab('curated')">
          Verified Purchases <span class="rev-tab-count">${shopifyTestimonials.length}</span>
        </button>
      </div>

      <!-- Review grid -->
      <div id="review-grid" style="
        display:grid;
        grid-template-columns:repeat(auto-fill,minmax(320px,1fr));
        gap:20px;
        margin-bottom:48px;
      ">
        ${allReviews.map(ReviewCard).join("")}
      </div>

      <!-- Rating summary -->
      ${RatingSummary({ overallRating, totalRatings, allReviews })}

      <div>
        <a href="https://www.google.com/maps/place/Frozen+Garage+Door+Solutions+LTD/@62.6573279,-95.989235,3z/data=!4m8!3m7!1s0x28afe3b05212b649:0x8c7c93e4cfe6abe1!8m2!3d62.6573279!4d-95.989235!9m1!1b1!16s%2Fg%2F11tfj_g6kv?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;margin-top:14px;padding:9px 18px;background:#fff;border:1px solid rgba(0,0,0,0.1);border-radius:10px;font-size:0.84rem;font-weight:600;color:#1a1a1a;text-decoration:none;box-shadow:0 1px 4px rgba(0,0,0,0.06);transition:box-shadow 0.15s,border-color 0.15s;" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';this.style.borderColor='rgba(0,0,0,0.18)'" onmouseout="this.style.boxShadow='0 1px 4px rgba(0,0,0,0.06)';this.style.borderColor='rgba(0,0,0,0.1)'">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          View all Google Reviews
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>

    </div>`;

  // Tab switching
  const googleCards = googleReviews.map(ReviewCard);
  const curatedCards = shopifyTestimonials.map(ReviewCard);
  const allCards = allReviews.map(ReviewCard);

  window.switchTab = (tab) => {
    document
      .querySelectorAll(".rev-tab")
      .forEach((b) => b.classList.remove("rev-tab-active"));
    document.getElementById(`tab-${tab}`)?.classList.add("rev-tab-active");
    const grid = document.getElementById("review-grid");
    if (!grid) return;
    const cards =
      tab === "google"
        ? googleCards
        : tab === "curated"
          ? curatedCards
          : allCards;
    grid.innerHTML = cards.length
      ? cards.join("")
      : `<p style="color:#9ca3af;font-size:0.9rem;padding:24px 0;">No reviews in this category yet.</p>`;
  };
}

// ── MOUNT CHROME ─────────────────────────────────────────
document.getElementById("cart-root").innerHTML = CartDrawerHTML();
document.getElementById("header-root").innerHTML = HeaderHTML({
  logoHref: "index.html",
});
document.getElementById("footer-root").innerHTML = FooterHTML();
document.title = "Customer Reviews — FDGS Garage Parts";

// ── LOAD DATA ─────────────────────────────────────────────
document.getElementById("main-root").innerHTML = `
  <div style="min-height:60vh;display:flex;align-items:center;justify-content:center;">
    <div style="text-align:center;">
      <div style="width:40px;height:40px;border:3px solid #e5e7eb;border-top-color:#2695c8;border-radius:50%;animation:spin 0.7s linear infinite;margin:0 auto 16px;"></div>
      <p style="color:#9ca3af;font-size:0.875rem;">Loading reviews…</p>
    </div>
  </div>`;

Promise.all([
  fetch("/api/google-reviews")
    .then((r) => r.json())
    .catch(() => ({ configured: false, reviews: [] })),
  fetch("/api/metareviews")
    .then((r) => r.json())
    .catch(() => ({ configured: false, testimonials: [] })),
]).then(([googleData, shopifyData]) => {
  renderPage(googleData, shopifyData);
});

// ── INIT ─────────────────────────────────────────────────
initHeader({
  onCartOpen() {
    refreshCartDrawer(PRODUCTS);
    openCartDrawer();
  },
});
initCartDrawer({
  products: PRODUCTS,
  onCheckout() {
    showToast("Redirecting to checkout…");
  },
});
Cart.onChange(() => {
  updateBadge();
  if (document.getElementById("cart-drawer")?.classList.contains("open"))
    refreshCartDrawer(PRODUCTS);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCartDrawer();
});
updateBadge();
