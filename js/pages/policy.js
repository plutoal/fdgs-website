import { Cart }             from '../cart.js';
import { showToast }        from '../toast.js';
import { HeaderHTML, updateBadge, initHeader } from '../components/header.js';
import { FooterHTML }        from '../components/footer.js';
import { CartDrawerHTML, refreshCartDrawer, openCartDrawer, closeCartDrawer, initCartDrawer } from '../components/cartDrawer.js';
import { PRODUCTS }          from '../data.js';

// ── POLICY CONTENT ───────────────────────────────────────
const POLICIES = {
  shipping: {
    title: 'Shipping Policy',
    lastUpdated: 'March 2026',
    sections: [
      {
        heading: 'Processing Time',
        body: `All in-stock orders are processed within 1–2 business days (Monday–Friday, excluding federal holidays). Orders placed after 2:00 PM EST will begin processing the next business day. You will receive a shipping confirmation email with tracking information once your order has shipped.`,
      },
      {
        heading: 'Shipping Methods & Rates',
        body: `We ship across the continental United States via UPS and FedEx Ground. Shipping rates are calculated at checkout based on order weight and delivery destination.\n\n**Free Standard Shipping** is available on all orders over $200.00 (before taxes). This threshold is automatically applied at checkout — no coupon code required.`,
        table: {
          headers: ['Method', 'Estimated Transit', 'Rate'],
          rows: [
            ['Standard Ground', '5–7 business days', 'Calculated at checkout'],
            ['Expedited (2-Day)', '2 business days', 'Calculated at checkout'],
            ['Overnight', '1 business day', 'Calculated at checkout'],
            ['Free Standard', '5–7 business days', 'Free on orders $200+'],
          ],
        },
      },
      {
        heading: 'Order Tracking',
        body: `Once your order ships, you will receive an automated email containing your carrier and tracking number. You can track your shipment directly on the carrier's website. If you have not received a tracking email within 3 business days of placing your order, please contact us.`,
      },
      {
        heading: 'Shipping Restrictions',
        body: `We currently ship to the 48 contiguous United States only. We do not ship to Alaska, Hawaii, US territories, APO/FPO addresses, or internationally at this time. Large or heavy items (such as full spring system kits) may be subject to freight shipping — you will be notified prior to fulfillment if this applies to your order.`,
      },
      {
        heading: 'Damaged or Lost Shipments',
        body: `If your order arrives damaged, please photograph the packaging and contents immediately and contact us within 48 hours of delivery. We will file a carrier claim on your behalf and arrange a replacement or refund at no cost to you. For lost shipments (tracking shows no movement for 5+ business days), contact us and we will investigate with the carrier.`,
      },
    ],
  },

  returns: {
    title: 'Return & Refund Policy',
    lastUpdated: 'March 2026',
    sections: [
      {
        heading: 'Return Window',
        body: `We accept returns on most items within **30 days** of the delivery date. Items must be in their original, unused condition with all original packaging and hardware included. Returns initiated after 30 days will not be accepted.`,
      },
      {
        heading: 'Eligible Items',
        body: `The following items are eligible for return:\n\n- Unopened opener kits and spring system packages\n- Accessories in original sealed packaging\n- Safety sensors that have not been installed or wired\n\nThe following items are **not eligible** for return:\n\n- Items that have been installed, modified, or show signs of use\n- Custom-cut springs or custom-order components\n- Electrical components that have been wired or powered on\n- Items damaged by improper installation`,
      },
      {
        heading: 'How to Initiate a Return',
        body: `To start a return, contact our support team at support@frozengaragedoors.com with your order number and reason for return. We will provide a Return Merchandise Authorization (RMA) number and prepaid return shipping label within 1–2 business days. Do not ship items back without an RMA number — unauthorized returns will be refused.`,
      },
      {
        heading: 'Refund Processing',
        body: `Once we receive and inspect your return, we will notify you of the approval or rejection of your refund within 3 business days. Approved refunds are issued to your original payment method within 5–7 business days. Original shipping charges are non-refundable unless the return is due to our error (wrong item, defective product).`,
      },
      {
        heading: 'Exchanges',
        body: `We do not process direct exchanges. If you need a different item, initiate a return for the original item and place a new order. This ensures the fastest possible turnaround for your replacement part.`,
      },
      {
        heading: 'Defective or Incorrect Items',
        body: `If you received a defective item or an incorrect product, contact us immediately. We will arrange a prepaid return and ship the correct or replacement item at no additional charge. Defective items are covered under the manufacturer's warranty — terms vary by product and are included in the product documentation.`,
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'March 2026',
    sections: [
      {
        heading: 'Information We Collect',
        body: `When you use the FDGS Garage Parts Store, we may collect the following types of information:\n\n**Information you provide:** Name, email address, shipping and billing address, phone number, and payment information when placing an order. Payment details are processed securely through Shopify's payment infrastructure — we do not store raw card data.\n\n**Automatically collected information:** Browser type, IP address, pages visited, time on site, referring URLs, and device type. This data is collected via cookies and similar tracking technologies.`,
      },
      {
        heading: 'How We Use Your Information',
        body: `We use collected information to:\n\n- Process and fulfill your orders\n- Send order confirmation and shipping notifications\n- Respond to customer support inquiries\n- Improve our website and product offerings\n- Send promotional emails (only if you have opted in)\n- Comply with legal obligations`,
      },
      {
        heading: 'Cookies',
        body: `We use essential cookies to maintain your shopping cart session and preferences. We may also use analytics cookies (such as Google Analytics) to understand how visitors interact with our site. You can disable non-essential cookies in your browser settings, though this may affect some site functionality.`,
      },
      {
        heading: 'Data Sharing',
        body: `We do not sell, rent, or trade your personal information. We share data only with trusted third parties necessary to operate our business, including:\n\n- **Shopify** — order management and payment processing\n- **Shipping carriers** (UPS, FedEx) — delivery fulfillment\n- **Email service providers** — transactional and marketing emails\n\nAll third parties are contractually obligated to handle your data securely and in compliance with applicable privacy laws.`,
      },
      {
        heading: 'Data Retention',
        body: `We retain order and customer data for up to 7 years for tax, legal, and accounting purposes. You may request deletion of your personal data at any time by contacting us at privacy@frozengaragedoors.com. Note that certain data may be retained as required by law.`,
      },
      {
        heading: 'Your Rights',
        body: `Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data; opt out of marketing communications; and lodge a complaint with a supervisory authority. To exercise these rights, contact us at privacy@frozengaragedoors.com.`,
      },
      {
        heading: 'Changes to This Policy',
        body: `We may update this Privacy Policy from time to time. Material changes will be communicated via email or a prominent notice on our website. Continued use of the site after changes constitutes acceptance of the updated policy.`,
      },
    ],
  },

  terms: {
    title: 'Terms of Service',
    lastUpdated: 'March 2026',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        body: `By accessing or using the FDGS Garage Parts Store website (the "Site"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Site. These terms apply to all visitors, customers, and users of the Site.`,
      },
      {
        heading: '2. Use of the Site',
        body: `You agree to use the Site only for lawful purposes and in accordance with these Terms. You must not use the Site to engage in any fraudulent, abusive, or harmful conduct; attempt to gain unauthorized access to any part of the Site; transmit viruses or any other malicious code; or violate any applicable local, national, or international laws.`,
      },
      {
        heading: '3. Product Information',
        body: `We make every effort to display product information, specifications, and pricing accurately. However, we reserve the right to correct errors or update information at any time without prior notice. Product images are for illustrative purposes and may differ slightly from the actual product. Compatibility information is provided as a guide — always verify fitment before ordering.`,
      },
      {
        heading: '4. Pricing and Payment',
        body: `All prices are listed in US Dollars and are subject to change without notice. Applicable sales tax will be calculated and added at checkout based on your delivery address. We accept major credit cards, debit cards, and other payment methods as displayed at checkout. Payment is processed securely through Shopify's managed payment infrastructure.`,
      },
      {
        heading: '5. Order Acceptance',
        body: `Placing an order constitutes an offer to purchase. We reserve the right to accept, decline, or cancel any order for any reason, including product unavailability, pricing errors, or suspected fraud. If we cancel an order after payment has been processed, a full refund will be issued to your original payment method.`,
      },
      {
        heading: '6. Intellectual Property',
        body: `All content on the Site — including text, images, logos, graphics, and software — is the property of Frozen Garage Door Solutions or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any Site content without our express written permission.`,
      },
      {
        heading: '7. Limitation of Liability',
        body: `To the fullest extent permitted by law, Frozen Garage Door Solutions shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of, or inability to use, the Site or products purchased through it. Our total liability in connection with any claim shall not exceed the amount paid for the product giving rise to the claim.`,
      },
      {
        heading: '8. Governing Law',
        body: `These Terms of Service are governed by the laws of the State of Delaware, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts located in Delaware.`,
      },
      {
        heading: '9. Changes to Terms',
        body: `We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of the Site after any changes constitutes your acceptance of the new Terms.`,
      },
      {
        heading: '10. Contact',
        body: `Questions about these Terms? Contact us at legal@frozengaragedoors.com or by mail at:\n\nFrozen Garage Door Solutions\nLegal Department\n[Business Address]\n[City, State ZIP]`,
      },
    ],
  },
};

// ── MOUNT CHROME ─────────────────────────────────────────
document.getElementById('cart-root').innerHTML   = CartDrawerHTML();
document.getElementById('header-root').innerHTML = HeaderHTML({ logoHref: 'index.html' });
document.getElementById('footer-root').innerHTML = FooterHTML();

// ── RENDER PAGE ──────────────────────────────────────────
const key    = document.body.dataset.policy;
const policy = POLICIES[key];

if (!policy) {
  document.getElementById('main-root').innerHTML = `
    <div style="min-height:60vh;display:flex;align-items:center;justify-content:center;padding:80px 24px;text-align:center;">
      <p style="color:#6b7280;">Page not found.</p>
    </div>`;
} else {
  document.title = `${policy.title} — FDGS Garage Parts`;

  const renderSection = (s) => {
    const body = s.body
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p style="margin-top:12px;">')
      .replace(/\n- /g, '</p><li style="margin:6px 0 6px 20px;list-style:disc;">')
      .replace(/\n/g, '<br>');

    const tableHTML = s.table ? `
      <div style="margin-top:20px;border-radius:12px;border:1px solid rgba(0,0,0,0.07);overflow:hidden;">
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="background:#f8f8f8;">
              ${s.table.headers.map(h => `<th style="padding:12px 16px;text-align:left;font-size:0.78rem;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid rgba(0,0,0,0.07);">${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${s.table.rows.map((row, i) => `
              <tr style="${i % 2 === 0 ? 'background:#fff' : 'background:#fafafa'}">
                ${row.map(cell => `<td style="padding:12px 16px;font-size:0.85rem;color:#1a1a1a;border-bottom:1px solid rgba(0,0,0,0.05);">${cell}</td>`).join('')}
              </tr>`).join('')}
          </tbody>
        </table>
      </div>` : '';

    return `
      <section style="margin-bottom:40px;">
        <h2 style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.25rem;letter-spacing:-0.01em;color:#1a1a1a;margin-bottom:12px;">${s.heading}</h2>
        <p style="font-size:0.92rem;line-height:1.75;color:#4b5563;">${body}</p>
        ${tableHTML}
      </section>`;
  };

  document.getElementById('main-root').innerHTML = `
    <div style="max-width:780px;margin:0 auto;padding:56px 24px 96px;">

      <!-- Breadcrumb -->
      <nav style="display:flex;align-items:center;gap:8px;font-size:0.8rem;color:#9ca3af;margin-bottom:40px;flex-wrap:wrap;">
        <a href="index.html" style="color:#6b7280;text-decoration:none;transition:color 0.15s;" onmouseover="this.style.color='#1a1a1a'" onmouseout="this.style.color='#6b7280'">Home</a>
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        <span style="color:#1a1a1a;font-weight:500;">${policy.title}</span>
      </nav>

      <!-- Header -->
      <div style="margin-bottom:48px;padding-bottom:32px;border-bottom:1px solid rgba(0,0,0,0.08);">
        <h1 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(2rem,5vw,3rem);letter-spacing:-0.02em;color:#1a1a1a;margin-bottom:8px;">${policy.title}</h1>
        <p style="font-size:0.82rem;color:#9ca3af;">Last updated: ${policy.lastUpdated}</p>
      </div>

      <!-- Sections -->
      ${policy.sections.map(renderSection).join('')}

      <!-- Back link -->
      <div style="margin-top:56px;padding-top:32px;border-top:1px solid rgba(0,0,0,0.08);">
        <a href="index.html" style="display:inline-flex;align-items:center;gap:8px;font-size:0.875rem;font-weight:600;color:#2695c8;text-decoration:none;transition:color 0.15s;" onmouseover="this.style.color='#1a6d96'" onmouseout="this.style.color='#2695c8'">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
          Back to Shop
        </a>
      </div>
    </div>`;
}

// ── INIT ─────────────────────────────────────────────────
initHeader({ onCartOpen() { refreshCartDrawer(PRODUCTS); openCartDrawer(); } });
initCartDrawer({
  products: PRODUCTS,
  onCheckout() { showToast('Redirecting to checkout…'); },
});
Cart.onChange(() => {
  updateBadge();
  if (document.getElementById('cart-drawer')?.classList.contains('open')) {
    refreshCartDrawer(PRODUCTS);
  }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCartDrawer(); });
updateBadge();
