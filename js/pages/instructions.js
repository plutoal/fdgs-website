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

// ── CONTENT ──────────────────────────────────────────────

const VIDEO_PLACEHOLDER = `
  <div style="
    width:100%; aspect-ratio:16/9; border-radius:14px; overflow:hidden;
    background:#1a1a1a; display:flex; flex-direction:column;
    align-items:center; justify-content:center; gap:12px;
    border:1px solid rgba(255,255,255,0.06); margin:24px 0 8px;
  ">
    <div style="
      width:56px; height:56px; border-radius:50%;
      background:rgba(38,149,200,0.18); border:2px solid rgba(38,149,200,0.4);
      display:flex; align-items:center; justify-content:center;
    ">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#2695c8">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    </div>
    <span style="font-size:0.78rem;color:rgba(255,255,255,0.35);letter-spacing:0.04em;">Video coming soon</span>
  </div>`;

const STEPS = [
  {
    n: 1,
    text: "Clean and prepare the area for installation.",
    hasVideo: true,
    link: `
      <div style="
        width:100%; aspect-ratio:16/9; border-radius:14px; overflow:hidden;
        background:#1a1a1a; display:flex; flex-direction:column;
        align-items:center; justify-content:center; gap:12px;
        border:1px solid rgba(255,255,255,0.06); margin:24px 0 8px;
      ">
      <iframe width="100%" height="100%" src="https://www.youtube.com/embed/NN4Y0L0joHA?si=99WkYpkisz0RmAvo" 
        title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; 
        gyroscope; picture-in-picture" allowfullscreen style="display:block;">
      </iframe>
      </div>
    `,
  },
  {
    n: 2,
    text: `[Step 2 instruction text — paste your content here.]`,
    hasVideo: true,
    link: VIDEO_PLACEHOLDER,
  },
  {
    n: 3,
    text: `[Step 3 instruction text — paste your content here.]`,
    hasVideo: true,
    link: `
      <div style="width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;
                  background:#1a1a1a;position:relative;
                  border:1px solid rgba(255,255,255,0.06);margin:24px 0 8px;">
        <iframe style="position:absolute;inset:0;width:100%;height:100%;display:block;border:0;"
          src="https://www.youtube.com/embed/oK95X1-Y7Vc?si=BTPF65Zx_2_rb-av"
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    `,
  },
  {
    n: 4,
    text: `[Step 4 instruction text — paste your content here.]`,
    hasVideo: true,
    link: "",
  },
  {
    n: 5,
    text: `[Step 5 instruction text — paste your content here.]`,
    hasVideo: true,
    link: "",
  },
  {
    n: 6,
    text: `[Step 6 instruction text — paste your content here.]`,
    hasVideo: true,
    link: "",
  },
  {
    n: 7,
    text: `[Step 7 instruction text — paste your content here.]`,
    hasVideo: true,
    link: "",
  },
  {
    n: 8,
    text: `[Step 8 instruction text — paste your content here.]`,
    hasVideo: true,
    link: "",
  },
  {
    n: 9,
    text: `[Step 9 instruction text — paste your content here.]`,
    hasVideo: true,
    link: "",
  },
  {
    n: 10,
    text: `[Step 10 instruction text — paste your content here.]`,
    hasVideo: true,
    link: "",
  },
  {
    n: 11,
    text: `[Step 11 instruction text — paste your content here.]`,
    hasVideo: true,
    link: "",
  },
  {
    n: 12,
    text: `[Step 12 instruction text — paste your content here.]`,
    hasVideo: false,
    link: "",
  },
  {
    n: 13,
    text: `[Step 13 instruction text — paste your content here.]`,
    hasVideo: false,
    link: "",
  },
];

const INTRO = `Follow the steps below to correctly install your OHD garage door system. Watch each video for a visual walkthrough of the step, and refer to the full installation manual for detailed specifications and safety requirements.`;

const renderStep = ({ n, text, hasVideo, link }) => `
  <div style="margin-bottom:48px;">
    <div style="display:flex;align-items:flex-start;gap:16px;">
      <div style="
        flex-shrink:0; width:32px; height:32px; border-radius:50%;
        background:#2695c8; color:#fff; font-family:'Barlow Condensed',sans-serif;
        font-weight:700; font-size:0.95rem; display:flex;
        align-items:center; justify-content:center; margin-top:2px;
      ">${n}</div>
      <p style="font-size:0.95rem;line-height:1.8;color:#374151;padding-top:4px;">${text}</p>
    </div>
    
    ${hasVideo ? link : ""}
  </div>`;

// ── MOUNT CHROME ─────────────────────────────────────────
document.getElementById("cart-root").innerHTML = CartDrawerHTML();
document.getElementById("header-root").innerHTML = HeaderHTML({
  logoHref: "index.html",
});
document.getElementById("footer-root").innerHTML = FooterHTML();
document.title = "Instructions, Videos & Manual — FDGS Garage Parts";

// ── RENDER PAGE ──────────────────────────────────────────
document.getElementById("main-root").innerHTML = `
  <div style="max-width:780px;margin:0 auto;padding:56px 24px 96px;">

    <!-- Breadcrumb -->
    <nav style="display:flex;align-items:center;gap:8px;font-size:0.8rem;color:#9ca3af;margin-bottom:40px;flex-wrap:wrap;">
      <a href="index.html" style="color:#6b7280;text-decoration:none;transition:color 0.15s;"
         onmouseover="this.style.color='#1a1a1a'" onmouseout="this.style.color='#6b7280'">Home</a>
      <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      <span style="color:#1a1a1a;font-weight:500;">Instructions &amp; Manual</span>
    </nav>

    <!-- Page heading -->
    <div style="margin-bottom:32px;">
      <h1 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(2rem,5vw,3rem);letter-spacing:-0.02em;color:#1a1a1a;margin-bottom:10px;">
        Instructions, Videos and Manual
      </h1>
      <p style="font-size:0.95rem;line-height:1.75;color:#4b5563;max-width:640px;">${INTRO}</p>
    </div>

    <!-- Manual download -->
    <a href="manuals/Frozen Garage Door Solutions Cable Manual.pdf" target="_blank" rel="noopener"
       style="
         display:inline-flex; align-items:center; gap:10px;
         background:#1a1a1a; color:#fff; text-decoration:none;
         padding:12px 22px; border-radius:12px; font-size:0.875rem; font-weight:600;
         margin-bottom:48px;
         box-shadow:0 2px 12px rgba(0,0,0,0.18);
         transition:background 0.15s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
       "
       onmouseover="this.style.background='#2695c8';this.style.transform='translateY(-1px)'"
       onmouseout="this.style.background='#1a1a1a';this.style.transform='translateY(0)'">
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="12" y1="12" x2="12" y2="18"/>
        <polyline points="9 15 12 18 15 15"/>
      </svg>
      Download Installation Manual (PDF)
    </a>

    <!-- Numbered steps -->
    ${STEPS.map(renderStep).join("")}

    <!-- Back link -->
    <div style="margin-top:24px;padding-top:32px;border-top:1px solid rgba(0,0,0,0.08);">
      <a href="index.html" style="display:inline-flex;align-items:center;gap:8px;font-size:0.875rem;font-weight:600;color:#2695c8;text-decoration:none;transition:color 0.15s;"
         onmouseover="this.style.color='#1a6d96'" onmouseout="this.style.color='#2695c8'">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
        Back to Shop
      </a>
    </div>
  </div>`;

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
  if (document.getElementById("cart-drawer")?.classList.contains("open")) {
    refreshCartDrawer(PRODUCTS);
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCartDrawer();
});
updateBadge();
