// ── PROMO BANNER ─────────────────────────────────────────
// Edit PROMOS to add/remove/change promotions.
// Set enabled: false to hide a promo without deleting it.
// If only one promo, no rotation happens.

const PROMOS = [
  {
    enabled: true,
    text: "Free Canada-wide Shipping on all orders",
    icon: `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  },
  {
    enabled: true,
    text: "Spring Sale — 15% off all OHD Kits. Use code SPRING15",
    icon: `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  },
];

const INTERVAL_MS = 7000;

function PromoBannerHTML() {
  const active = PROMOS.filter((p) => p.enabled);
  if (!active.length) return "";

  const items = active
    .map(
      (p, i) => `
    <div class="promo-item${i === 0 ? " promo-active" : ""}" aria-hidden="${i !== 0}">
      ${p.icon ? `<span class="promo-icon">${p.icon}</span>` : ""}
      <span>${p.text}</span>
    </div>`,
    )
    .join("");

  return `<div id="promo-banner" role="region" aria-label="Promotions">${items}</div>`;
}

export function initPromoBanner() {
  const html = PromoBannerHTML();
  if (!html) return;

  const wrap = document.getElementById("promo-banner-wrap");
  if (wrap) wrap.innerHTML = html;

  const banner = document.getElementById("promo-banner");
  if (!banner) return;

  const items = banner.querySelectorAll(".promo-item");
  if (items.length <= 1) return;

  let current = 0;
  setInterval(() => {
    items[current].classList.remove("promo-active");
    items[current].setAttribute("aria-hidden", "true");
    current = (current + 1) % items.length;
    items[current].classList.add("promo-active");
    items[current].setAttribute("aria-hidden", "false");
  }, INTERVAL_MS);
}
