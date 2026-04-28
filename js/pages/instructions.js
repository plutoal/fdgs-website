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
    text: ` With the garage door closed, use the pencil to mark a line on the concrete from one side of the door to the other.  Do this on the inside and outside of the door.`,
    hasVideo: true,
    link: `
      <div style="
        width:100%; aspect-ratio:16/9; border-radius:14px; overflow:hidden;
        background:#1a1a1a; display:flex; flex-direction:column;
        align-items:center; justify-content:center; gap:12px;
        border:1px solid rgba(255,255,255,0.06); margin:24px 0 8px;
      ">
      <iframe width="100%" height="100%" src="https://www.youtube.com/embed/SSwD_HIJ_B8?si=2gkhFITtI97G-hRb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `,
  },
  {
    n: 3,
    text: ` The power cord can be positioned on the left or right side of your overhead door. Ensure to leave at least 1 1/4 inches of space at each end between the angle steel/aluminum and the track of the garage door. This is to leave enough space for the tip of the heated wire and for the wire to bend around the garage door track. `,
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
    text: ` Open the garage door and place the angle steel inside the marked lines. Place the angle steel with the holes on the inside of the garage. Leave a gap of approximately 1/8 inch in between the angle steel/aluminum where the water will flow outside. Water will also drain underneath the angle steel/aluminum. `,
    hasVideo: true,
    link: `
      <div style="width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;
                  background:#1a1a1a;position:relative;
                  border:1px solid rgba(255,255,255,0.06);margin:24px 0 8px;">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/lmjaDOlHQ34?si=8A0PfK3oTJX10h8n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>      
      </div>
    `,
  },
  {
    n: 5,
    text: ` Using the hammer and punch, mark the centre of each hole on the angle steel/aluminum, this will determine where you will drill the hole into the concrete. `,
    hasVideo: true,
    link: `
      <div style="width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;
                  background:#1a1a1a;position:relative;
                  border:1px solid rgba(255,255,255,0.06);margin:24px 0 8px;">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Jy07xupPm9Y?si=DfHFmMjhqg4_zLDK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `,
  },
  {
    n: 6,
    text: ` Drill holes using a half inch drill bit. Place a tape on the drill bit at approximately 1 1/4 inch from the tip to help determine how deep to drill the hole. `,
    hasVideo: true,
    link: `
      <div style="width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;
                  background:#1a1a1a;position:relative;
                  border:1px solid rgba(255,255,255,0.06);margin:24px 0 8px;">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/bhhjpBLHO1k?si=wFgIwTxU0tarat1w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `,
  },
  {
    n: 7,
    text: `Vacuum all holes. Insert the bolt and washer into the top of the anchor (marked “1/4 Bolt”) and catch the nut. Hand-tighten as much as possible without expanding the anchor. </br>
- 7.1: Insert the anchor into the hole and tighten the bolt with a 7/16" ratchet to secure it. Once set, remove the bolt; the nut should remain in place near the top of the anchor.`,
    hasVideo: true,
    link: `
      <div style="width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;
                  background:#1a1a1a;position:relative;
                  border:1px solid rgba(255,255,255,0.06);margin:24px 0 8px;">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/LUVmDhGzMj4?si=MgyA1g9H3SNC1wih" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `,
  },
  {
    n: 8,
    text: ` Insert the wire tip behind the track and extend it along the marked area. </br>
- 8.1: Position the angle steel over the wire, ensuring the wire lies flat and is not pinched. Align the steel with your drilled holes. </br>
- 8.2: Starting at the wire tip (opposite the plug), install the bolts and washers. Tighten firmly, but do not overtighten to avoid breaking the anchors. </br>
- Note: If an anchor breaks, drill it out with a metal bit and replace it with one of the two provided spares. `,
    hasVideo: true,
    link: `
      <div style="width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;
                  background:#1a1a1a;position:relative;
                  border:1px solid rgba(255,255,255,0.06);margin:24px 0 8px;">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/oXg338Bu9TE?si=eUyBeN-0_FxK0DNs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `,
  },
  {
    n: 9,
    text: ` Plug heated wire into outlet and conduct a test as instructed on the wire box. `,
    hasVideo: true,
    link: `
      <div style="width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;
                  background:#1a1a1a;position:relative;
                  border:1px solid rgba(255,255,255,0.06);margin:24px 0 8px;">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/d696RzUf5Jw?si=TW5HPQfU0P9-TXCv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `,
  },
  {
    n: 10,
    text: `Install Reflective stickers on the angle steel/aluminum to alert everybody of the tripping hazard. `,
    hasVideo: true,
    link: `
      <div style="width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;
                  background:#1a1a1a;position:relative;
                  border:1px solid rgba(255,255,255,0.06);margin:24px 0 8px;">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/0cNMRayDo18?si=HcgvPSKqQ016kaCZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `,
  },
  {
    n: 11,
    text: `The garage door down travel may require some adjustment, locate the side of your garage door motor which should show down travel button and adjust as necessary. `,
    hasVideo: true,
    link: `
      <div style="width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;
                  background:#1a1a1a;position:relative;
                  border:1px solid rgba(255,255,255,0.06);margin:24px 0 8px;">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Pxk2-c3NwRc?si=VT-aXNa9hJ2jmy0l" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `,
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
document.title = "Install Guide — FDGS Garage Parts";

// ── RENDER PAGE ──────────────────────────────────────────
document.getElementById("main-root").innerHTML = `
  <div style="max-width:780px;margin:0 auto;padding:24px 24px 96px;">

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
        Install Guide
      </h1>
      <p style="font-size:0.95rem;line-height:1.75;color:#4b5563;max-width:640px;">${INTRO}</p>
    </div>

    <!-- Manual download -->
    <button id="manual-dl-btn"
       style="
         display:inline-flex; align-items:center; gap:10px;
         background:#1a1a1a; color:#fff; text-decoration:none;
         padding:12px 22px; border-radius:12px; font-size:0.875rem; font-weight:600;
         margin-bottom:48px; border:none; cursor:pointer;
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
    </button>

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

// ── MANUAL DOWNLOAD (language-aware) ─────────────────────
document.getElementById("manual-dl-btn").addEventListener("click", () => {
  const isFr = document.cookie.includes("googtrans=/en/fr");
  const pdf = isFr
    ? "manuals/Frozen Garage Door Solutions Cable Manual FR.pdf"
    : "manuals/Frozen Garage Door Solutions Cable Manual.pdf";
  window.open(pdf, "_blank", "noopener");
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
  if (document.getElementById("cart-drawer")?.classList.contains("open")) {
    refreshCartDrawer(PRODUCTS);
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCartDrawer();
});
updateBadge();
