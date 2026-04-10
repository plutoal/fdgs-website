export function FooterHTML() {
  const shopLinks = [
    { label: "OHD Kits", href: "index.html#catalog" },
    // { label: 'Spring Systems',  href: 'index.html#catalog' },
    // { label: 'Safety Sensors',  href: 'index.html#catalog' },
    // { label: 'Accessories',     href: 'index.html#catalog' },
    { label: "All Products", href: "index.html#catalog" },
  ];
  const helpLinks = [
    { label: "Shipping Info", href: "shipping-policy.html" },
    { label: "Returns & Refunds", href: "returns-policy.html" },
    { label: "Installation Guides", href: "instructions.html" },
    { label: "Contact Us", href: "#" },
    { label: "Reviews", href: "testimonials.html" },
    { label: "Sign In / Register", href: "#" },
  ];

  const navList = (links) =>
    links
      .map(
        ({ label, href }) =>
          `<li style="margin-bottom:10px;">
      <a href="${href}" style="color:rgba(255,255,255,0.55);font-size:0.875rem;text-decoration:none;transition:color 0.15s;"
         onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">${label}</a>
    </li>`,
      )
      .join("");

  return `
    <footer style="background:#111;color:#fff;padding:64px 24px 40px;">
      <div style="max-width:1280px;margin:0 auto;">
        <div class="ft-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:48px;margin-bottom:56px;">

          <div style="grid-column:span 2/span 2;" class="ft-brand">
            <div style="display:inline-block;background:rgba(255,255,255,0.96);border-radius:10px;padding:6px 12px;margin-bottom:16px;box-shadow:0 1px 8px rgba(0,0,0,0.2);">
              <img src="brand_assets/FrozenGarageDoors-fINAL-01.PNG" alt="Frozen Garage Door Solutions" style="height:40px;width:auto;display:block;">
            </div>
            <p style="color:rgba(255,255,255,0.45);font-size:0.875rem;line-height:1.7;max-width:280px;">
              Professional-grade OHD garage door parts. Serving residential and commercial customers across North America.
            </p>
            <div style="display:flex;gap:10px;margin-top:20px;">
              <a href="#" style="width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.6);text-decoration:none;transition:background 0.15s;" onmouseover="this.style.background='rgba(255,255,255,0.16)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'" aria-label="Facebook">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" style="width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.6);text-decoration:none;transition:background 0.15s;" onmouseover="this.style.background='rgba(255,255,255,0.16)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'" aria-label="Instagram">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 class="font-display font-bold" style="font-size:0.72rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.35);margin-bottom:16px;">Shop</h4>
            <ul style="list-style:none;">${navList(shopLinks)}</ul>
          </div>

          <div>
            <h4 class="font-display font-bold" style="font-size:0.72rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.35);margin-bottom:16px;">Help</h4>
            <ul style="list-style:none;">${navList(helpLinks)}</ul>
          </div>

        </div>

        <div style="padding-top:28px;border-top:1px solid rgba(255,255,255,0.08);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;">
          <p style="font-size:0.75rem;color:rgba(255,255,255,0.28);">© 2026 Frozen Garage Door Solutions. All rights reserved.</p>
          <div style="display:flex;gap:24px;">
            <a href="privacy-policy.html" style="font-size:0.75rem;color:rgba(255,255,255,0.28);text-decoration:none;transition:color 0.15s;" onmouseover="this.style.color='rgba(255,255,255,0.6)'" onmouseout="this.style.color='rgba(255,255,255,0.28)'">Privacy Policy</a>
            <a href="terms-of-service.html" style="font-size:0.75rem;color:rgba(255,255,255,0.28);text-decoration:none;transition:color 0.15s;" onmouseover="this.style.color='rgba(255,255,255,0.6)'" onmouseout="this.style.color='rgba(255,255,255,0.28)'">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>`;
}
