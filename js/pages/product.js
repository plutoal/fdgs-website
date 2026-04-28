import { loadProducts, getProducts } from "../products.js";
import { redirectToCheckout } from "../checkout.js";
import { Cart } from "../cart.js";
import { showToast } from "../toast.js";
import { HeaderHTML, updateBadge, initHeader } from "../components/header.js";
import { FooterHTML } from "../components/footer.js";
import { ManualButton } from "../components/manualButton.js";
import {
  CartDrawerHTML,
  refreshCartDrawer,
  openCartDrawer,
  closeCartDrawer,
  initCartDrawer,
} from "../components/cartDrawer.js";
import { BadgeList, StockBadge } from "../components/badges.js";
import { InlineQtyControl } from "../components/qtyControl.js";

// ── MOUNT CHROME ─────────────────────────────────────────
document.getElementById("cart-root").innerHTML = CartDrawerHTML();
document.getElementById("header-root").innerHTML = HeaderHTML({
  logoHref: "index.html",
});
document.getElementById("footer-root").innerHTML = FooterHTML();

(async () => {
  // ── LOAD PRODUCT ─────────────────────────────────────────
  await loadProducts();
  const params = new URLSearchParams(window.location.search);
  const p = getProducts().find((x) => x.id === parseInt(params.get("id")));

  if (!p) {
    document.getElementById("main-root").innerHTML = `
    <div style="min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 24px;">
      <h1 class="font-display font-bold" style="font-size:2.5rem;margin-bottom:12px;">Product Not Found</h1>
      <p style="color:#6b7280;margin-bottom:24px;">This product doesn't exist or has been removed.</p>
      <a href="index.html" class="btn btn-primary">Back to Shop</a>
    </div>`;
    document.title = "Not Found — FDGS";
  } else {
    document.title = `${p.name} — FDGS Garage Parts`;

    const isLow = p.stock > 0 && p.stock <= 5;
    const isOut = false; // STOCK CHECK DISABLED — restore: p.stock === 0
    const isSale = !!(p.compareAt && p.compareAt > p.price);
    const disc = isSale ? Math.round((1 - p.price / p.compareAt) * 100) : 0;

    document.getElementById("main-root").innerHTML = `
    <div style="max-width:1280px;margin:0 auto;padding:32px 24px 80px;">

      <!-- Breadcrumb -->
      <nav style="display:flex;align-items:center;gap:8px;font-size:0.8rem;color:#9ca3af;margin-bottom:40px;flex-wrap:wrap;">
        <a href="index.html" style="color:#6b7280;text-decoration:none;transition:color 0.15s;" onmouseover="this.style.color='#1a1a1a'" onmouseout="this.style.color='#6b7280'">Home</a>
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        <a href="index.html#catalog" style="color:#6b7280;text-decoration:none;transition:color 0.15s;" onmouseover="this.style.color='#1a1a1a'" onmouseout="this.style.color='#6b7280'">Shop</a>
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        <span style="color:#1a1a1a;font-weight:500;">${p.name}</span>
      </nav>

      <!-- 2-col layout -->
      <div class="prod-layout">

        <!-- Image -->
          <div style="border-radius:20px;overflow:hidden;background:linear-gradient(135deg,#e8f4fb,#f0f9ff);aspect-ratio:3/3;position:relative;">
            <img id="prod-img" src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;display:block;">
            <div style="position:absolute;top:16px;left:16px;display:flex;flex-direction:column;gap:6px;">
              ${BadgeList({ isSale, disc, isLow, isOut })}
            </div>
          </div>

        <!-- Info -->
        <div>
          <span style="font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#2695c8;">${p.type}</span>
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin:10px 0 20px;">
            <h1 class="font-display font-bold" style="font-size:clamp(1.8rem,4vw,2.6rem);letter-spacing:-0.02em;line-height:1.1;color:#1a1a1a;">${p.name}</h1>
            ${ManualButton()}
          </div>

          <!-- Price -->
          <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:12px;">
            <span style="font-size:2rem;font-weight:800;color:#1a1a1a;">$${p.price.toFixed(2)}</span>
            ${isSale ? `<span style="font-size:1rem;color:#9ca3af;text-decoration:line-through;">$${p.compareAt.toFixed(2)}</span>` : ""}
            ${isSale ? `<span class="bdg bdg-sale">−${disc}%</span>` : ""}
          </div>

          <!-- Stock -->
          <div id="prod-stock" style="margin-bottom:24px;">${StockBadge(p)}</div>

          <!-- Description -->
          <p style="font-size:0.95rem;line-height:1.75;color:#4b5563;margin-bottom:32px;">${p.desc}</p>

          <!-- CTA -->
          <div id="prod-cta" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:40px;"></div>

          <!-- Specs table -->
          <div style="border-radius:14px;border:1px solid rgba(0,0,0,0.07);overflow:hidden;">
            <div style="padding:14px 20px;background:#f8f8f8;border-bottom:1px solid rgba(0,0,0,0.07);">
              <span class="font-display font-bold" style="font-size:1rem;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;">Kit Includes</span>
            </div>
            
            <table style="width:100%;border-collapse:collapse;">
              ${p.specs
                ? p.specs.split("\n").filter(l => l.trim()).map((line, idx, arr) => {
                    const text = line.replace(/^[-–]\s*/, "");
                    const [item, qty] = text.split(/\s*\((\d+[^)]*)\)\s*$/).filter(Boolean);
                    return `<tr style="background:${idx % 2 === 0 ? "#fff" : "#fafafa"};">
                      <td style="padding:12px 20px;font-size:0.85rem;color:#1a1a1a;font-weight:500;${idx < arr.length - 1 ? "border-bottom:1px solid rgba(0,0,0,0.05);" : ""}">
                        <span style="display:inline-flex;align-items:center;gap:8px;">
                          <svg width="14" height="14" fill="none" stroke="#2695c8" stroke-width="2.2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                          ${item?.trim() ?? text}
                        </span>
                      </td>
                      <td style="padding:12px 20px;font-size:0.85rem;color:#6b7280;text-align:right;${idx < arr.length - 1 ? "border-bottom:1px solid rgba(0,0,0,0.05);" : ""}">
                        ${qty ? `<span style="background:#f3f4f6;padding:2px 8px;border-radius:6px;font-size:0.78rem;font-weight:600;">×${qty}</span>` : ""}
                      </td>
                    </tr>`;
                  }).join("")
                : `<tr><td style="padding:20px;font-size:0.85rem;color:#9ca3af;">No kit contents listed.</td></tr>`
              }
            </table>
          </div>
        </div>
      </div>
    </div>`;

    renderCTA();
    initStickyCTA();
  }

  // ── CTA RENDERING ────────────────────────────────────────
  function ctaHTML() {
    if (!p) return "";
    const qty = Cart.qty(p.id);
    // STOCK CHECK DISABLED —uncomment when inventory is live
    // if (p.stock === 0) {
    //   return `<button class="btn" ... disabled>Out of Stock</button>
    //           <span ...>Check back soon</span>`;
    // }
    if (qty > 0) {
      return `${InlineQtyControl({ id: p.id, qty }).replace('class="qty-inline"', 'class="qty-inline" style="min-width:180px;flex:1;"')}
            <button id="view-cart-btn" class="btn" style="padding:14px 24px;font-size:1rem;border-radius:12px;border:1.5px solid #2695c8;color:#2695c8;background:transparent;font-weight:600;transition:background .15s;white-space:nowrap;" onmouseover="this.style.background='#e8f4fb'" onmouseout="this.style.background='transparent'">View Cart</button>`;
    }
    return `<button id="add-to-cart-btn" class="btn btn-primary" style="padding:14px 40px;font-size:1rem;border-radius:12px;flex:1;">
            Add to Cart
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          </button>`;
  }

  function bindCTAButtons(root) {
    root.querySelectorAll("#add-to-cart-btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        Cart.add(p.id);
        showToast("✓ Added to cart");
        updateBadge(true);
      }),
    );
    root.querySelectorAll("#view-cart-btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        refreshCartDrawer(getProducts());
        openCartDrawer();
      }),
    );
    root
      .querySelectorAll('[data-action="dec-card"]')
      .forEach((btn) => btn.addEventListener("click", () => Cart.dec(p.id)));
    root
      .querySelectorAll('[data-action="inc-card"]')
      .forEach((btn) =>
        btn.addEventListener("click", () => Cart.inc(p.id, p.stock)),
      );
  }

  function renderCTA() {
    const el = document.getElementById("prod-cta");
    const stick = document.getElementById("sticky-cta-bar");
    if (!el || !p) return;

    const html = ctaHTML();
    el.innerHTML = html;
    if (stick) stick.innerHTML = html;

    bindCTAButtons(el);
    if (stick) bindCTAButtons(stick);
  }

  // ── STICKY BOTTOM CTA (mobile only) ─────────────────────
  function initStickyCTA() {
    if (!p) return;

    // Inject the bar into the page (after main-root)
    const bar = document.createElement("div");
    bar.id = "sticky-cta-bar";
    document.body.appendChild(bar);
    document.body.classList.add("has-sticky-cta");

    // Use IntersectionObserver to show/hide based on main CTA visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        bar.classList.toggle("visible", !entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -20px 0px" },
    );

    // Observe the main CTA div once it exists
    const mainCTA = document.getElementById("prod-cta");
    if (mainCTA) observer.observe(mainCTA);

    renderCTA(); // populate sticky bar
  }

  // ── INIT ─────────────────────────────────────────────────
  initHeader({
    onCartOpen() {
      refreshCartDrawer(getProducts());
      openCartDrawer();
    },
  });

  initCartDrawer({
    products: getProducts(),
    async onCheckout() {
      showToast("Redirecting to checkout…");
      await redirectToCheckout({ onError: (msg) => showToast(`⚠ ${msg}`) });
    },
  });

  Cart.onChange(() => {
    updateBadge();
    renderCTA();
    if (document.getElementById("cart-drawer")?.classList.contains("open")) {
      refreshCartDrawer(getProducts());
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCartDrawer();
  });

  updateBadge();
})();
