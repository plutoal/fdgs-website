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

document.getElementById("cart-root").innerHTML = CartDrawerHTML();
document.getElementById("header-root").innerHTML = HeaderHTML({
  logoHref: "index.html",
});
document.getElementById("footer-root").innerHTML = FooterHTML();
document.title = "About Us — Frozen Garage Door Solutions";

const btn = (label, href) => `
  <a href="${href}" class="btn btn-primary" style="padding:13px 28px;font-size:0.95rem;border-radius:12px;">
    ${label}
    <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  </a>`;

const stat = (value, label) => `
  <div style="text-align:center;">
    <div style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:2.4rem;color:#2695c8;line-height:1;">${value}</div>
    <div style="font-size:0.78rem;color:#6b7280;margin-top:4px;font-weight:500;text-transform:uppercase;letter-spacing:0.06em;">${label}</div>
  </div>`;

const problemCard = (title, desc, img) => `
  <div style="display:flex;gap:14px;align-items:flex-start;padding:20px;background:#fff;border-radius:14px;border:1px solid rgba(0,0,0,0.07);box-shadow:0 1px 6px rgba(0,0,0,0.04);">
    <div style="width:100px;height:100px;border-radius:10px;background:#fef2f2;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
      <img src="${img}" style="width:100px;height:100px;object-fit:cover;display:block;">
    </div>
    <div>
      <div style="font-weight:600;font-size:0.9rem;color:#1a1a1a;margin-bottom:3px;">${title}</div>
      <div style="font-size:0.82rem;color:#6b7280;line-height:1.5;">${desc}</div>
    </div>
  </div>`;

const featureCard = (icon, title, desc) => `
  <div style="padding:24px;background:#fff;border-radius:16px;border:1px solid rgba(0,0,0,0.07);box-shadow:0 1px 6px rgba(0,0,0,0.04);">
    <div style="width:44px;height:44px;border-radius:12px;background:#e8f4fb;display:flex;align-items:center;justify-content:center;margin-bottom:14px;">
      ${icon}
    </div>
    <div style="font-weight:700;font-size:0.95rem;color:#1a1a1a;margin-bottom:6px;">${title}</div>
    <div style="font-size:0.84rem;color:#6b7280;line-height:1.6;">${desc}</div>
  </div>`;

document.getElementById("main-root").innerHTML = `

  <!-- ── HERO ── -->
  <section style="background:#111;color:#fff;padding:calc(var(--hdr) + var(--banner) + 48px) 24px 72px;">
    <div style="max-width:900px;margin:0 auto;text-align:center;">
      <h1 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(2.4rem,6vw,4rem);letter-spacing:-0.02em;line-height:1.05;margin-bottom:20px;">
        Built to Solve a Real Problem.<br><span style="color:#2695c8;">By People Who Had It.</span>
      </h1>
      <p style="font-size:1rem;color:rgba(255,255,255,0.6);max-width:580px;margin:0 auto 36px;line-height:1.7;">
        Frozen Garage Door Solutions was born out of a cold Canadian winter and a door that wouldn't budge. We built the fix ourselves, and now we're sharing it.
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;">
        ${btn("Shop the Kit", "index.html#catalog")}
        <a href="faq.html" style="display:inline-flex;align-items:center;gap:8px;padding:13px 28px;font-size:0.95rem;font-weight:600;border-radius:12px;border:1px solid rgba(255,255,255,0.2);color:#fff;text-decoration:none;transition:background 0.15s;" onmouseover="this.style.background='rgba(255,255,255,0.08)'" onmouseout="this.style.background='transparent'">
          FAQs
        </a>
        <a href="contact.html" style="display:inline-flex;align-items:center;gap:8px;padding:13px 28px;font-size:0.95rem;font-weight:600;border-radius:12px;border:1px solid rgba(255,255,255,0.2);color:#fff;text-decoration:none;transition:background 0.15s;" onmouseover="this.style.background='rgba(255,255,255,0.08)'" onmouseout="this.style.background='transparent'">
          Contact Us
        </a>
      </div>
    </div>
  </section>

  <!-- ── STATS ── -->
  <div style="background:#fff;border-bottom:1px solid rgba(0,0,0,0.07);">
    <div style="max-width:900px;margin:0 auto;padding:36px 24px;display:flex;flex-wrap:wrap;gap:32px;justify-content:space-around;">
      ${stat("100%", "Canadian Made")}
      ${stat("Patent", "Pending")}
      ${stat("DIY", "Friendly Install")}
     <!-- ${stat("−40°C", "Tested Performance")} -->
    </div>
  </div>

  <div style="max-width:900px;margin:0 auto;padding:72px 24px 96px;">

    <!-- ── INSPIRATION ── -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-bottom:96px;" class="about-split">
      <div>
        <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#2695c8;margin-bottom:12px;">Our Inspiration</div>
        <h2 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(1.8rem,4vw,2.6rem);letter-spacing:-0.02em;color:#1a1a1a;margin-bottom:16px;line-height:1.1;">A Quonset Door That Froze Every Winter</h2>
        <p style="font-size:0.92rem;color:#4b5563;line-height:1.75;margin-bottom:14px;">
          Our product was developed out of necessity. Our Quonset overhead door was freezing to the concrete floor due to cold outside temperatures and water accumulations on the inside of the quonset. Once our product was installed, the problem was resolved.
        </p>
        <p style="font-size:0.92rem;color:#4b5563;line-height:1.75;">
          We also discovered and modified it to allow water to drain to the outside of the garage, shop, or quonset, assuming the floor is sloped bringing water towards the door.
        </p>
      </div>
      <div style="border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.12);">
        <img src="https://placehold.co/560x420/1a1a1a/ffffff?text=Frozen+Door" alt="Frozen garage door" style="width:100%;height:100%;object-fit:cover;display:block;">
      </div>
    </div>

    <!-- ── PROBLEMS WE SOLVE ── -->
    <div style="margin-bottom:96px;">
      <div style="text-align:center;margin-bottom:40px;">
        <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#2695c8;margin-bottom:12px;">The Problem</div>
        <h2 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(1.8rem,4vw,2.6rem);letter-spacing:-0.02em;color:#1a1a1a;line-height:1.1;">Freezing Costs Canadians Thousands Every Year</h2>
        <p style="font-size:0.92rem;color:#6b7280;max-width:520px;margin:12px auto 0;line-height:1.7;">Without a proper solution, a frozen garage door leads to expensive repairs and replacements.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:14px;">
        ${problemCard("Garage Door Bottom Seal Replacement", "Minimum $285 for a 16ft door, in Alberta", "docs/IMG_9632.JPG")}
        ${problemCard("Rollers & Hinges Replacement", "Minimum $320 for 10 rollers, in Alberta", "docs/IMG_9631.JPG")}
        ${problemCard("Replacement of a Rusted Door", "Minimum $2,995 for a standard 16ft door, in Alberta", "docs/IMG_9633.JPG")}
        ${problemCard("Replacement of Door Mechanisms", "Minimum $2,995 for standard mechanisms, in Alberta", "docs/IMG_9630.JPG")}
      </div>
    </div>

    <!-- ── THE PRODUCT ── -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-bottom:96px;" class="about-split">
      <div style="border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.12); height:90%">
        <img src="docs/IMG_8647.jpeg" alt="OHD Antifreeze Kit" style="width:100%;height:100%;object-fit:cover;display:block;">
      </div>
      <div>
        <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#2695c8;margin-bottom:12px;">The Solution</div>
        <h2 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(1.8rem,4vw,2.6rem);letter-spacing:-0.02em;color:#1a1a1a;margin-bottom:16px;line-height:1.1;">The OHD Antifreeze Kit</h2>
        <p style="font-size:0.92rem;color:#4b5563;line-height:1.75;margin-bottom:14px;">
          Our product is patent pending. Made in Canada and built strong to withstand the weight of most vehicles. It installs at the base of your garage door and prevents ice from bonding to the concrete.
        </p>
        <p style="font-size:0.92rem;color:#4b5563;line-height:1.75;margin-bottom:14px;">
          It is designed to be energy efficient with a self regulating cable which will only activate once the cable reaches a certain temperature; so it only runs when it needs to.
        </p>
        <p style="font-size:0.92rem;color:#4b5563;line-height:1.75;">
          Built for an effortless setup without the need for remodeling or major garage reconstruction. The system installs quickly by securing the tracks directly to the existing garage floor surface.
        </p>
      </div>
    </div>

    <!-- ── FEATURES ── -->
    <div style="margin-bottom:96px;">
      <div style="text-align:center;margin-bottom:40px;">
        <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#2695c8;margin-bottom:12px;">Why It Works</div>
        <h2 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(1.8rem,4vw,2.6rem);letter-spacing:-0.02em;color:#1a1a1a;line-height:1.1;">Built Different. Built Canadian.</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;">
        ${featureCard(
          `<svg width="20" height="20" fill="none" stroke="#2695c8" stroke-width="2.2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
          "Patent Pending",
          "Unique design protected by Canadian intellectual property law.",
        )}
        ${featureCard(
          `<svg width="24" height="24" fill="none" stroke="#2695c8" stroke-width="2.2" viewBox="0 0 24 24"><path d="m19 11-8-8-8.5 8.5a5.5 5.5 0 0 0 7.78 7.78L19 11Z"/><path d="m5 2 5 5"/><path d="M2 13h15"/><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/></svg>`,
          "Self Wicking Tracks",
          "Prevents moisture accumulation. Automatically drains melted ice and snow away from the track.",
        )}
        ${featureCard(
          `<svg width="20" height="20" fill="none" stroke="#2695c8" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`,
          "Self Regulating Cable",
          "Only activates when needed, saving energy and extending product life.",
        )}
        ${featureCard(
          `<svg width="20" height="20" fill="none" stroke="#2695c8" stroke-width="2.2" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
          "Easy DIY Install",
          "Installs on a level concrete floor in under an hour. No special tools required.",
        )}
        ${featureCard(
          `<svg width="20" height="20" fill="none" stroke="#2695c8" stroke-width="2.2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
          "Vehicle-Rated Strength",
          "Built to withstand the weight of most vehicles driving over it.",
        )}
      </div>
    </div>

    <!-- ── CTA ── -->
    <div style="text-align:center;padding:56px 32px;background:#111;border-radius:24px;color:#fff;">
      <h2 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(1.8rem,4vw,2.8rem);letter-spacing:-0.02em;margin-bottom:12px;">Ready to Stop the Freeze?</h2>
      <p style="font-size:0.92rem;color:rgba(255,255,255,0.55);max-width:420px;margin:0 auto 28px;line-height:1.7;">Free Canada-wide shipping.</p>
      ${btn("Shop the OHD Kit", "index.html#catalog")}
    </div>

  </div>

  <style>
    @media (max-width: 640px) {
      .about-split { grid-template-columns: 1fr !important; }
      .about-split > div:first-child { order: 2; }
      .about-split > div:last-child  { order: 1; }
    }
  </style>
`;

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
  if (document.getElementById("cart-drawer")?.classList.contains("open")) {
    refreshCartDrawer(PRODUCTS);
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCartDrawer();
});
updateBadge();
