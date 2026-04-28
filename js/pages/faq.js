import { Cart } from "../cart.js";
import { showToast } from "../toast.js";
import { HeaderHTML, updateBadge, initHeader } from "../components/header.js";
import { FooterHTML } from "../components/footer.js";
import {
  CartDrawerHTML, refreshCartDrawer, openCartDrawer,
  closeCartDrawer, initCartDrawer,
} from "../components/cartDrawer.js";
import { PRODUCTS } from "../data.js";

document.getElementById("cart-root").innerHTML = CartDrawerHTML();
document.getElementById("header-root").innerHTML = HeaderHTML({ logoHref: "index.html" });
document.getElementById("footer-root").innerHTML = FooterHTML();
document.title = "FAQ — Frozen Garage Door Solutions";

const FAQS = [
  {
    q: "Can the kit come for any size door?",
    a: "Yes, we manufacture the kits for 8, 9, 10, 12, 16, 18 and 20 foot overhead garage doors, but we can custom fabricate any size.",
  },
  {
    q: "How long is the warranty?",
    a: "Frozen Garage Door Solutions warrants this product with proof of purchase, to the original purchaser, to be free from defects resulting from faulty manufacture or faulty components for 2 years.",
  },
  {
    q: "Will I have to drill into my concrete floor?",
    a: "Yes, in order to secure it to the concrete, 1/2 inch holes must be drilled into the concrete about 1 1/4 inch deep.",
  },
  {
    q: "Is it difficult to install?",
    a: "If you are handy with tools, no it is not. We provide written instructions as well as videos for each step. A local garage door repair company can also install this product.",
  },
  {
    q: "Where can I purchase a replacement heated cable?",
    a: "We stock all lengths of heated cable for our product.",
  },
  {
    q: "How much elevation does the angle steel add once installed?",
    a: "Once installed the angle steel will add 1/2 inch of height to your concrete floor. A minor adjustment may be required to the down travel of your door.",
  },
  {
    q: "Why is the Aluminum kit more expensive?",
    a: "The Aluminum kit will last you for a very long time as it will not rust even if the paint eventually gets worn out due to tire traffic.",
  },
  {
    q: "What if the heated wire that is provided is not long enough?",
    a: "You will have to purchase an extension power cord. The cable gauge must be no less than AWG#14.",
  },
  {
    q: "Does the concrete floor need to be level?",
    a: "Yes, proper installation requires the concrete floor under the angle steel/aluminum to be level. Ready mix concrete can be used to level off slight imperfections.",
  },
  {
    q: "What if I don't want the angle steel/aluminium protruding from the concrete floor?",
    a: "Our patent pending covers many variations to the type of materials used, the way to fasten the product to the floor, as well as options to bury it into the concrete.",
  },
];

document.getElementById("main-root").innerHTML = `
  <div style="max-width:760px;margin:0 auto;padding:calc(var(--hdr) + var(--banner) + 32px) 24px 96px;">

    <!-- Breadcrumb -->
    <nav style="display:flex;align-items:center;gap:8px;font-size:0.8rem;color:#9ca3af;margin-bottom:40px;">
      <a href="index.html" style="color:#6b7280;text-decoration:none;transition:color 0.15s;" onmouseover="this.style.color='#1a1a1a'" onmouseout="this.style.color='#6b7280'">Home</a>
      <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      <span style="color:#1a1a1a;font-weight:500;">FAQ</span>
    </nav>

    <!-- Header -->
    <div style="margin-bottom:48px;padding-bottom:32px;border-bottom:1px solid rgba(0,0,0,0.08);">
      <h1 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(2rem,5vw,3rem);letter-spacing:-0.02em;color:#1a1a1a;margin-bottom:8px;">Frequently Asked Questions</h1>
      <p style="font-size:0.9rem;color:#6b7280;line-height:1.6;max-width:500px;">Everything you need to know about the OHD Antifreeze Kit. Can't find your answer? <a href="contact.html" style="color:#2695c8;text-decoration:none;font-weight:500;">Contact us.</a></p>
    </div>

    <!-- FAQ accordion -->
    <div id="faq-list" style="display:flex;flex-direction:column;gap:8px;"></div>

    <!-- CTA -->
    <div style="margin-top:64px;padding:40px 32px;background:#111;border-radius:20px;color:#fff;text-align:center;">
      <h2 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:1.8rem;letter-spacing:-0.02em;margin-bottom:8px;">Still have questions?</h2>
      <p style="font-size:0.88rem;color:rgba(255,255,255,0.5);margin-bottom:24px;">Our team is happy to help.</p>
      <a href="contact.html" class="btn btn-primary" style="padding:12px 28px;font-size:0.9rem;border-radius:12px;">
        Get in Touch
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>

  </div>`;

// Render accordion items
const list = document.getElementById("faq-list");
FAQS.forEach((item, i) => {
  const el = document.createElement("div");
  el.style.cssText = "border-radius:14px;border:1px solid rgba(0,0,0,0.08);background:#fff;overflow:hidden;transition:box-shadow 0.15s;";

  el.innerHTML = `
    <button aria-expanded="false" style="width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 22px;background:transparent;border:none;cursor:pointer;text-align:left;font-family:'Inter',sans-serif;">
      <span style="font-size:0.95rem;font-weight:600;color:#1a1a1a;line-height:1.4;">${item.q}</span>
      <svg class="faq-chevron" width="18" height="18" fill="none" stroke="#6b7280" stroke-width="2.2" viewBox="0 0 24 24" style="flex-shrink:0;transition:transform 0.25s ease;"><path d="M6 9l6 6 6-6"/></svg>
    </button>
    <div class="faq-body" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;">
      <p style="padding:0 22px 20px;font-size:0.88rem;color:#4b5563;line-height:1.75;border-top:1px solid rgba(0,0,0,0.06);padding-top:16px;margin-top:0;">${item.a}</p>
    </div>`;

  const btn = el.querySelector("button");
  const body = el.querySelector(".faq-body");
  const chevron = el.querySelector(".faq-chevron");

  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    // Close all others
    list.querySelectorAll("button[aria-expanded='true']").forEach(b => {
      b.setAttribute("aria-expanded", "false");
      b.closest("div").querySelector(".faq-body").style.maxHeight = "0";
      b.closest("div").querySelector(".faq-chevron").style.transform = "rotate(0deg)";
    });
    if (!isOpen) {
      btn.setAttribute("aria-expanded", "true");
      body.style.maxHeight = body.scrollHeight + "px";
      chevron.style.transform = "rotate(180deg)";
      el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
    } else {
      el.style.boxShadow = "none";
    }
  });

  list.appendChild(el);
});

initHeader({
  onCartOpen() {
    refreshCartDrawer(PRODUCTS);
    openCartDrawer();
  },
});
initCartDrawer({
  products: PRODUCTS,
  onCheckout() { showToast("Redirecting to checkout…"); },
});
Cart.onChange(() => {
  updateBadge();
  if (document.getElementById("cart-drawer")?.classList.contains("open")) {
    refreshCartDrawer(PRODUCTS);
  }
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCartDrawer(); });
updateBadge();
