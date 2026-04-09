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
    lastUpdated: null,
    sections: [
      {
        heading: "",
        body: `All orders are processed within 4 to 6 weeks (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.\nDue to higher demand than expected, shipping times may vary.`,
      },
      {
        heading: "",
        body: `Frozen Garage Door Solutions can ship our kits to any location in Canada serviced by an approved carrier.`,
      },
      {
        heading: "",
        body: `When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.`,
      },
      {
        heading: "",
        body: `If you haven't received your order within 10 days of receiving your shipping confirmation email, please contact us at <a href="mailto:info@frozengaragedoorsolutions.com" style="color:#2695c8;text-decoration:underline;">info@frozengaragedoorsolutions.com</a> with your name and order number, and we will look into it for you.`,
      },
    ],
  },

  returns: {
    title: "Return Policy",
    lastUpdated: null,
    sections: [
      {
        heading: "",
        body: `The customer must contact Frozen Garage Door Solutions before any returns. Frozen Garage Door Solutions accepts returns of our product for a period of 60 days. It must be returned in the original packaging and with proof of purchase. The refund will be made to the original credit card that was used to purchase the kit. The customer is responsible for the cost of returning our product, it will be deducted from the refund. In the event that your order arrives damaged in any way, please email us as soon as possible at <a href="mailto:info@frozengaragedoorsolutions.com" style="color:#2695c8;text-decoration:underline;">info@frozengaragedoorsolutions.com</a> with your order number and a photo of the item's condition. We address these on a case-by-case basis but will try our best to work towards a satisfactory solution.`,
      },
      {
        heading: "",
        body: `If you have any further questions, please don't hesitate to contact us at <a href="mailto:info@frozengaragedoorsolutions.com" style="color:#2695c8;text-decoration:underline;">info@frozengaragedoorsolutions.com</a>`,
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
    title: "Terms of Use",
    lastUpdated: "2022",
    sections: [
      {
        heading: "ACCEPTANCE OF TERMS",
        body: `By using the Website, You accept and agree to be bound by these Terms of Use (the "Terms") and all applicable laws and regulations. Please read these Terms carefully before using the Website. By accessing or using the Website, You agree to be bound by these Terms. If You do not agree with any of these Terms, You are prohibited from accessing or using the Website or any content on or through the Website.\n\nThe Company may revise these Terms at any time without notice. By accessing or using the Website, You agree to be bound by the then-current version of these Terms. These Terms together with the Company's Privacy Policy represent the entire agreement between You and the Company with respect to Your use of the Website and supersede all prior or contemporaneous communications and proposals, whether electronic, oral, or written, between You and the Company with respect to the Website.`,
      },
      {
        heading: "IS YOUR USE OF OUR WEBSITE RESTRICTED?",
        body: `You must be of the age of majority in Your jurisdiction of residence to use the Website. By using the Website, You represent and warrant that You are of the age of majority in Your jurisdiction of residence and that You have the right, authority, and capacity to agree to and comply with these Terms.\n\nYou are not permitted to access or use the Website if You are located in, or a resident of, any jurisdiction where the provision of the Website, the products, services, content, or other materials of the Website would be contrary to applicable law or regulation, or where the Company would be required to register or obtain a license. It is Your responsibility to determine whether Your access to or use of the Website is lawful in Your jurisdiction.`,
      },
      {
        heading: "YOUR USE OF THIS WEBSITE",
        body: `You agree to use the Website only for lawful purposes and in a manner consistent with all applicable laws and regulations. You must not use the Website:\n\n- In any way that violates any applicable local, national, or international law or regulation;\n- To transmit, or procure the sending of, any unsolicited or unauthorized advertising or promotional material or any other form of similar solicitation;\n- To transmit any data, send or upload any material that contains viruses, Trojan horses, worms, time-bombs, keystroke loggers, spyware, adware, or any other harmful programs or similar computer code designed to adversely affect the operation of any computer software or hardware;\n- To access without authority, interfere with, damage, or disrupt any part of the Website, any equipment or network on which the Website is stored, any software used in the provision of the Website, or any equipment or network or software owned or used by any third party;\n- To reproduce, duplicate, copy, or re-sell any part of the Website in contravention of these Terms;\n- To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Website, or which, as determined by the Company, may harm the Company or users of the Website, or expose them to liability.\n\nThe Company reserves the right, at its sole discretion, to restrict or terminate Your access to and use of the Website or any feature or part thereof, at any time without notice, for any reason, including, without limitation, for violation of these Terms.`,
      },
      {
        heading: "INTELLECTUAL PROPERTY",
        body: `The Website and all of its content, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Company, its licensors, or other providers of such material and are protected by Canadian and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.\n\nThese Terms permit You to use the Website for Your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on the Website without the prior written consent of the Company, except as follows:\n\n- Your computer may temporarily store copies of such materials in RAM incidental to Your accessing and viewing those materials;\n- You may store files that are automatically cached by Your Web browser for display enhancement purposes;\n- You may print or download one copy of a reasonable number of pages of the Website for Your own personal, non-commercial use and not for further reproduction, publication, or distribution.\n\nIf You print, copy, modify, download, or otherwise use or provide any other person with access to any part of the Website in breach of these Terms, Your right to use the Website will stop immediately and You must, at the Company's option, return or destroy any copies of the materials You have made.`,
      },
      {
        heading: "DISCLAIMER",
        body: `The Website is provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. Neither the Company nor any person associated with the Company makes any warranty or representation with respect to the completeness, security, reliability, quality, accuracy, or availability of the Website.\n\nThe Company hereby disclaims all warranties of any kind, whether express or implied, statutory, or otherwise, including but not limited to any warranties of merchantability, non-infringement, and fitness for particular purpose.\n\nThe foregoing does not affect any warranties that cannot be excluded or limited under applicable law.`,
      },
      {
        heading: "LIMITATION OF LIABILITY",
        body: `To the fullest extent provided by law, in no event will the Company, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with Your use, or inability to use, the Website, any websites linked to it, any content on the Website or such other websites, including any direct, indirect, special, incidental, consequential, or punitive damages, including but not limited to, personal injury, pain and suffering, emotional distress, loss of revenue, loss of profits, loss of business or anticipated savings, loss of use, loss of goodwill, loss of data, and whether caused by tort (including negligence), breach of contract, or otherwise, even if foreseeable.\n\nThe foregoing does not affect any liability which cannot be excluded or limited under applicable law.`,
      },
      {
        heading: "INDEMNIFICATION AND THIRD PARTY CLAIMS",
        body: `You agree to defend, indemnify, and hold harmless the Company, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable legal fees) arising out of or relating to Your violation of these Terms or Your use of the Website, including, but not limited to, any use of the Website's content, services, and products other than as expressly authorized in these Terms, or Your use of any information obtained from the Website.\n\nIf You have a dispute with any other user of the Website, or with any third party linked to or from the Website, the Company is under no obligation to become involved.`,
      },
      {
        heading: "THIRD PARTY LINKS",
        body: `The Website may contain links to third-party websites or services that are not owned or controlled by the Company. The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.\n\nWe strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit. The inclusion of any link does not imply endorsement by the Company of the linked site.`,
      },
      {
        heading: "GOVERNING LAW",
        body: `These Terms and any dispute or claim arising out of, or related to, them, their subject matter, or their formation (in each case, including non-contractual disputes or claims) shall be governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein, without giving effect to any choice or conflict of law provision or rule.\n\nAny legal suit, action, or proceeding arising out of, or related to, these Terms or the Website shall be instituted exclusively in the courts of the Province of Ontario, although we retain the right to bring any suit, action, or proceeding against You for breach of these Terms in Your country of residence or any other relevant country.`,
      },
      {
        heading: "ENTIRE AGREEMENT",
        body: `These Terms, together with the Company's Privacy Policy and any other legal notices published by the Company on the Website, shall constitute the entire agreement between You and the Company concerning the Website and supersede all prior agreements, representations, warranties, and understandings with respect to the Website and the subject matter of these Terms.\n\nIf any provision of these Terms is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavour to give effect to the parties' intentions as reflected in the provision, and the other provisions of these Terms remain in full force and effect.\n\nThe Company's failure to exercise or enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. If You have any questions about these Terms, please contact us.`,
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
        ${s.heading ? `<h2 style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.25rem;letter-spacing:-0.01em;color:#1a1a1a;margin-bottom:12px;">${s.heading}</h2>` : ''}
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
        ${policy.lastUpdated ? `<p style="font-size:0.82rem;color:#9ca3af;">Last updated: ${policy.lastUpdated}</p>` : ''}
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
