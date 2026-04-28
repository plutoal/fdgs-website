import { loadProducts, getProducts, getHeroVideo } from "../products.js";
import { redirectToCheckout } from "../checkout.js";
import { Cart } from "../cart.js";
import { showToast } from "../toast.js";
import { HeaderHTML, updateBadge, initHeader } from "../components/header.js";
import { HeroHTML, initHero } from "../components/hero.js";
import { FooterHTML } from "../components/footer.js";
import {
  CartDrawerHTML,
  refreshCartDrawer,
  openCartDrawer,
  initCartDrawer,
} from "../components/cartDrawer.js";
import {
  SearchOverlayHTML,
  openSearch,
  closeSearch,
  initSearchOverlay,
} from "../components/searchOverlay.js";
import {
  SidebarHTML,
  FilterSheetHTML,
  filters,
  filterProducts,
  renderFilterPanels,
  initFilterSidebar,
  updateChips,
} from "../components/filterSidebar.js";
import { ProductCard } from "../components/productCard.js";
import { InlineQtyControl } from "../components/qtyControl.js";
import { ManualButton } from "../components/manualButton.js";

// ── MOUNT OVERLAYS + CHROME ──────────────────────────────
document.getElementById("cart-root").innerHTML = CartDrawerHTML();
document.getElementById("search-root").innerHTML = SearchOverlayHTML();
document.getElementById("header-root").innerHTML = HeaderHTML({
  logoHref: "index.html",
  showSearch: true,
});
document.getElementById("hero-root").innerHTML = HeroHTML(); // updated after loadProducts
document.getElementById("footer-root").innerHTML = FooterHTML();

// ── MAIN CATALOG ─────────────────────────────────────────
document.getElementById("main-root").innerHTML = `
  ${FilterSheetHTML()}

  <section id="catalog" style="padding:80px 24px;">
    <div style="max-width:1280px;margin:0 auto;">
      <div style="margin-bottom:48px;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <h2 class="font-display font-bold uppercase" style="font-size:clamp(2rem,5vw,3rem);letter-spacing:-0.02em;line-height:1;">OHD Antifreeze Kit</h2>
          ${ManualButton()}
        </div>
      </div>
      <div style="display:flex;gap:32px;align-items:flex-start;">

        ${SidebarHTML()}

        <div style="flex:1;min-width:0;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:24px;flex-wrap:wrap;">
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <span id="results-count" style="font-size:0.875rem;color:#6b7280;font-weight:500;"></span>
              <div id="chips" style="display:flex;flex-wrap:wrap;gap:6px;"></div>
            </div>
            <button id="filter-btn" class="btn" style="font-size:0.8rem;background:#fff;color:#1a1a1a;border:1px solid rgba(0,0,0,0.1);padding:8px 16px;border-radius:8px;gap:6px;" onmouseover="this.style.borderColor='#2695c8'" onmouseout="this.style.borderColor='rgba(0,0,0,0.1)'">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="16" y2="12"/><line x1="4" y1="18" x2="12" y2="18"/></svg>
              Filters
            </button>
          </div>
          <div id="pgrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:24px;"></div>
          <div id="no-results" style="display:none;padding:80px 0;text-align:center;">
            <div style="width:52px;height:52px;border-radius:14px;background:#e8f4fb;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
              <svg width="22" height="22" fill="none" stroke="#2695c8" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </div>
            <p class="font-semibold" style="font-size:1.05rem;margin-bottom:6px;">No products found</p>
            <p style="color:#6b7280;font-size:0.875rem;margin-bottom:24px;">Try adjusting your filters or search term.</p>
            <button id="clear-filters-btn" class="btn btn-primary">Clear Filters</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── ABOUT CTA ── -->
  <div style="background:#e8f4fb;border-top:1px solid rgba(38,149,200,0.15);padding:72px 24px;text-align:center;">
    <div style="max-width:580px;margin:0 auto;">
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#2695c8;margin-bottom:12px;">Our Story</div>
      <h2 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(1.8rem,4vw,2.6rem);letter-spacing:-0.02em;color:#1a1a1a;line-height:1.1;margin-bottom:16px;">Born from a Canadian Winter.</h2>
      <p style="font-size:0.92rem;color:#6b7280;line-height:1.75;margin-bottom:32px;">We didn't set out to build a product; we set out to fix a problem. Learn why we built this and what drives us.</p>
      <a href="about.html" style="display:inline-flex;align-items:center;gap:8px;padding:13px 28px;font-size:0.95rem;font-weight:600;border-radius:12px;background:#1a1a1a;color:#fff;text-decoration:none;transition:background 0.15s;" onmouseover="this.style.background='#2695c8'" onmouseout="this.style.background='#1a1a1a'">
        The Story Behind the Kit
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  </div>`;

// ── RENDER PRODUCTS ──────────────────────────────────────
function renderProducts() {
  const list = filterProducts(getProducts());
  const grid = document.getElementById("pgrid");
  const noRes = document.getElementById("no-results");
  const countEl = document.getElementById("results-count");
  countEl.textContent = `${list.length} product${list.length !== 1 ? "s" : ""}`;
  noRes.style.display = list.length === 0 ? "block" : "none";
  grid.style.display = list.length === 0 ? "none" : "grid";
  grid.innerHTML = list.map((p, i) => ProductCard(p, i)).join("");
}

// ── RESPONSIVE SIDEBAR ───────────────────────────────────
function syncSidebar() {
  const sidebar = document.getElementById("sidebar");
  const filterBtn = document.getElementById("filter-btn");
  const wide = window.innerWidth >= 1024;
  if (sidebar) sidebar.style.display = wide ? "block" : "none";
  if (filterBtn) filterBtn.style.display = wide ? "none" : "flex";
}
window.addEventListener("resize", syncSidebar);
syncSidebar();

// ── SEARCH SYNC ──────────────────────────────────────────
function syncSearch(val) {
  filters.q = val;
  const hdrInput = document.getElementById("hdr-search");
  const sovInput = document.getElementById("sov-input");
  if (hdrInput) hdrInput.value = val;
  if (sovInput) sovInput.value = val;
  onFilterChange();
}

function onFilterChange() {
  renderProducts();
  updateChips(onFilterChange);
}

function resetFilters() {
  Object.assign(filters, { q: "", type: "All", maxPrice: 700, inStock: false });
  const hdrInput = document.getElementById("hdr-search");
  const sovInput = document.getElementById("sov-input");
  if (hdrInput) hdrInput.value = "";
  if (sovInput) sovInput.value = "";
  renderFilterPanels();
  onFilterChange();
}

// ── EVENT DELEGATION — PRODUCT GRID ─────────────────────
document.getElementById("main-root").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const id = parseInt(btn.dataset.id);
  const p = getProducts().find((x) => x.id === id);
  const action = btn.dataset.action;
  // STOCK CHECK DISABLED — if (action === "add-to-cart" && p?.stock > 0)
  if (action === "add-to-cart" && p) {
    Cart.add(id);
    showToast(`✓  Added: ${p.name.split(" ").slice(0, 4).join(" ")}…`);
  }
  if (action === "inc-card" && p) Cart.inc(id, p.stock);
  if (action === "dec-card") Cart.dec(id);
  if (btn.id === "clear-filters-btn") resetFilters();
});

// Only swap the CTA area of each card — no full grid re-render
function refreshCardCTAs() {
  document.querySelectorAll("[data-card-id]").forEach((card) => {
    const id = parseInt(card.dataset.cardId);
    const p = getProducts().find((x) => x.id === id);
    if (!p) return;
    const el = card.querySelector("[data-cta]");
    if (!el) return;
    const qty = Cart.qty(id);
    // STOCK CHECK DISABLED — uncomment when inventory is live
    // el.innerHTML = p.stock === 0
    //   ? `<button class="btn" ... disabled>Out of Stock</button>`
    //   : qty > 0 ? InlineQtyControl(...) : `<button ...Add to Cart</button>`;
    el.innerHTML =
      qty > 0
        ? InlineQtyControl({ id, qty })
        : `<button class="btn btn-primary" style="width:100%;padding:10px;border-radius:10px;font-size:0.82rem;" data-action="add-to-cart" data-id="${id}">Add to Cart</button>`;
  });
}

Cart.onChange(() => {
  updateBadge();
  refreshCardCTAs();
  if (document.getElementById("cart-drawer")?.classList.contains("open")) {
    refreshCartDrawer(getProducts());
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSearch();
});

// ── INIT ─────────────────────────────────────────────────
initHero();

initHeader({
  onCartOpen() {
    refreshCartDrawer(getProducts());
    openCartDrawer();
  },
  onSearchOpen: openSearch,
  onSearchInput: syncSearch,
  onSearchSubmit(q) {
    syncSearch(q);
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  },
});

initSearchOverlay({
  onInput: syncSearch,
  onSubmit(val) {
    syncSearch(val);
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  },
});

initFilterSidebar({ onChange: onFilterChange });

(async () => {
  await loadProducts();
  // Re-render hero with Shopify-hosted video URL if available
  const heroVideo = getHeroVideo();
  if (heroVideo) {
    document.getElementById("hero-root").innerHTML = HeroHTML(heroVideo);
    initHero();
  }
  initCartDrawer({
    products: getProducts(),
    async onCheckout() {
      showToast("Redirecting to checkout…");
      await redirectToCheckout({ onError: (msg) => showToast(`⚠ ${msg}`) });
    },
    onRefreshCards: renderProducts,
  });
  renderFilterPanels();
  renderProducts();
  updateBadge();
  updateChips(onFilterChange);
})();
