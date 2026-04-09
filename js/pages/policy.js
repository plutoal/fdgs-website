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

// ── POLICY CONTENT ───────────────────────────────────────
const POLICIES = {
  shipping: {
    title: "Shipping Policy",
    lastUpdated: "March 2026",
    sections: [
      {
        heading: "Processing Time",
        body: `All in-stock orders are processed within 1–2 business days (Monday–Friday, excluding federal holidays). Orders placed after 2:00 PM EST will begin processing the next business day. You will receive a shipping confirmation email with tracking information once your order has shipped.`,
      },
      {
        heading: "Shipping Methods & Rates",
        body: `We ship across the continental United States via UPS and FedEx Ground. Shipping rates are calculated at checkout based on order weight and delivery destination.\n\n**Free Standard Shipping** is available on all orders over $200.00 (before taxes). This threshold is automatically applied at checkout — no coupon code required.`,
        table: {
          headers: ["Method", "Estimated Transit", "Rate"],
          rows: [
            ["Standard Ground", "5–7 business days", "Calculated at checkout"],
            ["Expedited (2-Day)", "2 business days", "Calculated at checkout"],
            ["Overnight", "1 business day", "Calculated at checkout"],
            ["Free Standard", "5–7 business days", "Free on orders $200+"],
          ],
        },
      },
      {
        heading: "Order Tracking",
        body: `Once your order ships, you will receive an automated email containing your carrier and tracking number. You can track your shipment directly on the carrier's website. If you have not received a tracking email within 3 business days of placing your order, please contact us.`,
      },
      {
        heading: "Shipping Restrictions",
        body: `We currently ship to the 48 contiguous United States only. We do not ship to Alaska, Hawaii, US territories, APO/FPO addresses, or internationally at this time. Large or heavy items (such as full spring system kits) may be subject to freight shipping — you will be notified prior to fulfillment if this applies to your order.`,
      },
      {
        heading: "Damaged or Lost Shipments",
        body: `If your order arrives damaged, please photograph the packaging and contents immediately and contact us within 48 hours of delivery. We will file a carrier claim on your behalf and arrange a replacement or refund at no cost to you. For lost shipments (tracking shows no movement for 5+ business days), contact us and we will investigate with the carrier.`,
      },
    ],
  },

  returns: {
    title: "Return & Refund Policy",
    lastUpdated: "March 2026",
    sections: [
      {
        heading: "Return Window",
        body: `We accept returns on most items within **30 days** of the delivery date. Items must be in their original, unused condition with all original packaging and hardware included. Returns initiated after 30 days will not be accepted.`,
      },
      {
        heading: "Eligible Items",
        body: `The following items are eligible for return:\n\n- Unopened opener kits and spring system packages\n- Accessories in original sealed packaging\n- Safety sensors that have not been installed or wired\n\nThe following items are **not eligible** for return:\n\n- Items that have been installed, modified, or show signs of use\n- Custom-cut springs or custom-order components\n- Electrical components that have been wired or powered on\n- Items damaged by improper installation`,
      },
      {
        heading: "How to Initiate a Return",
        body: `To start a return, contact our support team at support@frozengaragedoors.com with your order number and reason for return. We will provide a Return Merchandise Authorization (RMA) number and prepaid return shipping label within 1–2 business days. Do not ship items back without an RMA number — unauthorized returns will be refused.`,
      },
      {
        heading: "Refund Processing",
        body: `Once we receive and inspect your return, we will notify you of the approval or rejection of your refund within 3 business days. Approved refunds are issued to your original payment method within 5–7 business days. Original shipping charges are non-refundable unless the return is due to our error (wrong item, defective product).`,
      },
      {
        heading: "Exchanges",
        body: `We do not process direct exchanges. If you need a different item, initiate a return for the original item and place a new order. This ensures the fastest possible turnaround for your replacement part.`,
      },
      {
        heading: "Defective or Incorrect Items",
        body: `If you received a defective item or an incorrect product, contact us immediately. We will arrange a prepaid return and ship the correct or replacement item at no additional charge. Defective items are covered under the manufacturer's warranty — terms vary by product and are included in the product documentation.`,
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    lastUpdated: "2022",
    sections: [
      {
        heading: "Introduction",
        body: `Frozen Garage Door Solutions Ltd. (the "Company") respects your ("You" and "Your") privacy. This "Privacy Policy" describes how the Company collects, uses, maintains, and protects Personal Information (defined below), as well as the rights and choices You have regarding Your Personal Information. This Privacy Policy applies to access or use of the Company's services provided through the Company's website, located at [website URL], effective as of 2022. "Personal Information" is information that identifies You or could be combined by the Company or the Company's services providers or other information with other information to identify You. By accessing or using the Company's website located at [website URL] (the "Website"), You consent to the terms of this Privacy Policy and You intend to be legally bound by them. If You do not agree with any terms of this Privacy Policy, please do not access or use the Website or any content on or through the Website, or otherwise submit any Personal Information to the Company.`,
      },
      {
        heading: "Types of Personal Information Collected",
        body: `The Personal Information the Company collects about You will depend on the manner in which You access or use the Website or any content on or through the Website and may include:\n\n- Your name, age, or contact information, such as Your mailing address, telephone number, or email address, or other similar information associated with You; Your location data; date, time, settings or other information, such as browser type, browser version, browser plug-in types and versions, operating system and platform, language, standard web log data, and IP addresses used to connect Your computer to the Internet or other similar identifier, or the equipment You use to access or use the Website and usage details; Data on the pages, services, or content You access; Your access or use history on the Website; Your access or use of third-party websites; Products or services You viewed or searched for; clickstreams to, through, and from the Website, including date and time; Products or services You purchased; Any URL or other site used to browse away from the Website; Billing or account information, if applicable; and Any other Personal Information that You voluntarily submit to us.`,
      },
      {
        heading: "Methods for Collecting Personal Information",
        body: `The Company takes steps to ensure that any Personal Information we collect about You is collected for legitimate purposes and is reasonable for the uses of such Personal Information, as described by this Privacy Policy.\n\n**Information Provided to the Company by You**\nThe Company collects Personal Information You give us on the Website and as a result of Your access to or use of the Website or any content on or through the Website including, without limitation, by submitting Personal Information to us, for example by: submitting, publishing, displaying, or otherwise transmitting user generated content; filling in forms, making search queries, or corresponding with the Company on or through the Website; or when You communicate with the Company by any means, including by phone, email, or other electronic messaging; or if applicable or available to You on the Website when creating or registering for an account; ordering, purchasing, or requesting information on a service or product; entering a contest or promotion; or otherwise engaging with any functions or interactive features that might exist from time-to-time between You and the Company.\n\n**Information Collected by the Company through Technological Means**\nThe Company also use cookies or other tracking or data collection tools to collect information, some of which may be Personal Information, about:\n\n- Helping the Company understand audience sizes and usage patterns on the Website;\n- Allowing the Company to tailor the Website to Your preferences and interests; and\n- recognizing You each time You visit the Website.\n\nThe technologies used by the Company to automatically collect the information described above may include cookies placed on Your hard drive of Your computer. You can turn off cookies using Your Internet browser but doing so may limit or remove certain parts of the Website, certain content on the Website, or the functionality of the Website.\n\n**Third-Party Features**\nThe Website may include, integrate, or rely on links, plug-ins, services, social networks, content, or other applications. Clicking on those links or enabling those connections or features may allow third parties to collect or share data about You. The Company does not control such third parties' use of cookies or similar technologies. You should contact the responsible provider directly. The Company does not accept any responsibility or liability for the privacy policies of any such third parties or their compliance or non-compliance with such privacy policies.`,
      },
      {
        heading: "Using and Disclosing Personal Information",
        body: `**Use of Personal Information by the Company**\nThe Company collects Your Personal Information to provide You with a secure, smooth, efficient, and customized experience when You access or use the Website or any content on the Website. The Company may use Your Personal Information to:\n\n- Provide You with content, services, or products on or through the Website; customize, measure, and improve content, services, or products on or through the Website; help the Company's business operations and improve the Company's business operations; help administer Your account, if applicable; comply with the Company's Terms of Use, or otherwise protect the security or integrity of the Website or the Company's business; deliver targeted offers, advertisements and other promotional offers based on Your communications with the Company; send You things in the mail through other channels, such as products You purchase; Re-market the Company's products or services after You leave the Website, in order to remind You of the Company or when You purchase a product or service, or to provide You with notices about recall options, as applicable; or contact You through the Website; or verify that You access or use the Website, this Privacy Policy, or the Company's Terms of Use; otherwise fulfill the reasons for which Personal Information on You and to which You Consent, or were collected; carry out other purposes that are disclosed to You and to which You Consent, or which are otherwise permitted or required by law.\n\n**Third-Party Transfers**\nThe Company may disclose Your Personal Information to third parties that assist the Company with the use of Personal Information described in "Use of Personal Information by the Company" above. Any Personal Information provided by the Company with other information that they have independently collected from or about You. This information may be stored outside of Canada and may accordingly be subject to laws that are different from those in Canada.\n\nThe Company requires that all third parties that received any Personal Information from the Company act consistently with the way in which the Company is using, maintaining, disclosing, and protecting such Personal Information.\n\nThe Company may share or sell aggregated, non-personally identifiable information to third parties. For clarity, the Company does not share Personal Information with third parties. The Company may also share aggregated, non-personally identifiable information publicly to show trends about the general use of the Website, or any content, services, or products provided on or through the Website.\n\n**Other Disclosures of Personal Information**\nThe Company may disclose Personal Information if necessary to collect a debt owed by You to the Company, to comply with a subpoena, or other legal process, relevant to the investigation or decision to investigate a breach of the laws of Canada, a Canadian territory of Canada, or a foreign jurisdiction, and the Company is legally permitted or required to do so, or to otherwise comply with any court order, law, or legal process, including to respond to any government or regulatory request or process, in accordance with applicable law. The Company may also disclose Your Personal Information, if necessary, to enforce this Privacy Policy or the Company's Terms of Use, or if the disclosure is necessary to protect the rights, property, or safety of the Company, the Website, users of the Website, or third parties.`,
      },
      {
        heading: "Access and Correction",
        body: `You have the right to access Your Personal Information and to request a correction to Your Personal Information if You believe it is inaccurate. If You would like to access Your Personal Information, or have Your Personal Information corrected or deleted, please contact the Company in the manner set out by this Privacy Policy. The Company may charge You a fee to access Your Personal Information and will notify You in advance of any such fee.`,
      },
      {
        heading: "Security",
        body: `The security of Your Personal Information is important to the Company. The Company maintains reasonable information security practices by maintaining physical, administrative, technological safeguards against unauthorized access, unauthorized disclosure, theft, and misuse of Personal Information that the Company holds. Your Personal Information collected by the Company may only be accessed by persons within the Company's organization who require access to provide You with information, products, services, or products provided on or through the Website. The Personal Information the Company collects is managed through Frozen Garage Door Solutions Ltd.'s database.\n\nAlthough the Company takes measures to protect against data breaches and unauthorized access to Personal Information, it cannot guarantee that its measures will mitigate the risks of such breaches or unauthorized access and no website is fully secure. The Company cannot guarantee that emails or other things You submit will prevent unauthorized access of the Company's security systems will never occur. Accordingly, You should not submit or otherwise provide Personal Information to the Company by any means if You consider that Personal Information to be sensitive.\n\nExcept as otherwise permitted or required by applicable law or regulation, the Company retains Personal Information only for as long as necessary to fulfill purposes for which it was collected. After such time, the Company will destroy, delete, or use anonymous and de-identified information, including anonymized or otherwise de-identified information retained for legitimate business purpose without further notice to You and without Your Consent.`,
      },
      {
        heading: "Changes to the Privacy Policy",
        body: `The Company reserves the right to update or change this Privacy Policy for any reason, at any time, and from time-to-time in accordance with the terms of this Privacy Policy.\n\nThe Company will reflect any such amendments on the Website. Your continued access to or use of the Website or any content on or through the Website after such amendment constitutes Your acceptance of the Privacy Policy as then amended. The Company will indicate the date it was last updated at the top of this page.`,
      },
      {
        heading: "Contact Information and Challenging Compliance",
        body: `The Company has appointed a privacy officer responsible for ensuring compliance with this Privacy Policy. If You have any questions about this Privacy Policy or Your Personal Information, please contact the Company's privacy officer.`,
      },
    ],
  },

  terms: {
    title: "Terms of Service",
    lastUpdated: "March 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: `By accessing or using the FDGS Garage Parts Store website (the "Site"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Site. These terms apply to all visitors, customers, and users of the Site.`,
      },
      {
        heading: "2. Use of the Site",
        body: `You agree to use the Site only for lawful purposes and in accordance with these Terms. You must not use the Site to engage in any fraudulent, abusive, or harmful conduct; attempt to gain unauthorized access to any part of the Site; transmit viruses or any other malicious code; or violate any applicable local, national, or international laws.`,
      },
      {
        heading: "3. Product Information",
        body: `We make every effort to display product information, specifications, and pricing accurately. However, we reserve the right to correct errors or update information at any time without prior notice. Product images are for illustrative purposes and may differ slightly from the actual product. Compatibility information is provided as a guide — always verify fitment before ordering.`,
      },
      {
        heading: "4. Pricing and Payment",
        body: `All prices are listed in US Dollars and are subject to change without notice. Applicable sales tax will be calculated and added at checkout based on your delivery address. We accept major credit cards, debit cards, and other payment methods as displayed at checkout. Payment is processed securely through Shopify's managed payment infrastructure.`,
      },
      {
        heading: "5. Order Acceptance",
        body: `Placing an order constitutes an offer to purchase. We reserve the right to accept, decline, or cancel any order for any reason, including product unavailability, pricing errors, or suspected fraud. If we cancel an order after payment has been processed, a full refund will be issued to your original payment method.`,
      },
      {
        heading: "6. Intellectual Property",
        body: `All content on the Site — including text, images, logos, graphics, and software — is the property of Frozen Garage Door Solutions or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any Site content without our express written permission.`,
      },
      {
        heading: "7. Limitation of Liability",
        body: `To the fullest extent permitted by law, Frozen Garage Door Solutions shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of, or inability to use, the Site or products purchased through it. Our total liability in connection with any claim shall not exceed the amount paid for the product giving rise to the claim.`,
      },
      {
        heading: "8. Governing Law",
        body: `These Terms of Service are governed by the laws of the State of Delaware, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts located in Delaware.`,
      },
      {
        heading: "9. Changes to Terms",
        body: `We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of the Site after any changes constitutes your acceptance of the new Terms.`,
      },
      {
        heading: "10. Contact",
        body: `Questions about these Terms? Contact us at legal@frozengaragedoors.com or by mail at:\n\nFrozen Garage Door Solutions\nLegal Department\n[Business Address]\n[City, State ZIP]`,
      },
    ],
  },
};

// ── MOUNT CHROME ─────────────────────────────────────────
document.getElementById("cart-root").innerHTML = CartDrawerHTML();
document.getElementById("header-root").innerHTML = HeaderHTML({
  logoHref: "index.html",
});
document.getElementById("footer-root").innerHTML = FooterHTML();

// ── RENDER PAGE ──────────────────────────────────────────
const key = document.body.dataset.policy;
const policy = POLICIES[key];

if (!policy) {
  document.getElementById("main-root").innerHTML = `
    <div style="min-height:60vh;display:flex;align-items:center;justify-content:center;padding:80px 24px;text-align:center;">
      <p style="color:#6b7280;">Page not found.</p>
    </div>`;
} else {
  document.title = `${policy.title} — FDGS Garage Parts`;

  const renderSection = (s) => {
    const body = s.body
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n\n/g, '</p><p style="margin-top:12px;">')
      .replace(
        /\n- /g,
        '</p><li style="margin:6px 0 6px 20px;list-style:disc;">',
      )
      .replace(/\n/g, "<br>");

    const tableHTML = s.table
      ? `
      <div style="margin-top:20px;border-radius:12px;border:1px solid rgba(0,0,0,0.07);overflow:hidden;">
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="background:#f8f8f8;">
              ${s.table.headers.map((h) => `<th style="padding:12px 16px;text-align:left;font-size:0.78rem;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid rgba(0,0,0,0.07);">${h}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${s.table.rows
              .map(
                (row, i) => `
              <tr style="${i % 2 === 0 ? "background:#fff" : "background:#fafafa"}">
                ${row.map((cell) => `<td style="padding:12px 16px;font-size:0.85rem;color:#1a1a1a;border-bottom:1px solid rgba(0,0,0,0.05);">${cell}</td>`).join("")}
              </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>`
      : "";

    return `
      <section style="margin-bottom:40px;">
        <h2 style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.25rem;letter-spacing:-0.01em;color:#1a1a1a;margin-bottom:12px;">${s.heading}</h2>
        <p style="font-size:0.92rem;line-height:1.75;color:#4b5563;">${body}</p>
        ${tableHTML}
      </section>`;
  };

  document.getElementById("main-root").innerHTML = `
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
      ${policy.sections.map(renderSection).join("")}

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
