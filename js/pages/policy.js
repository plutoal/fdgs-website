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
    lastUpdated: "June 29th, 2022",
    sections: [
      {
        heading: "Introduction",
        body: `Frozen Garage Door Solutions Ltd. (the "Company") respects your ("You" and "Your") privacy. This "Privacy Policy" describes how the Company collects, uses, maintains, discloses, and protects Personal Information (defined below) as well as the rights and choices You have regarding Your Personal Information, including how You can access and update Your Personal Information. This Privacy Policy was last amended June 29th, 2022. "Personal Information" is information that identifies You or could be combined by the Company or the Company's services providers or affiliates with other information to identify You. By accessing or using the Company's website located at <a href="https://frozengaragedoorsolutions.com">frozengaragedoorsolutions.com</a> (the "Website") or any content on or through the Website, You signify Your consent to the terms of this Privacy Policy and Your intent to be legally bound by them. If You do not agree with any terms of this Privacy Policy, please do not access or use the Website or any content on or through the Website, or otherwise submit any Personal Information to the Company.`,
      },
      {
        heading: "TYPES OF PERSONAL INFORMATION COLLECTED",
        body: `The Personal Information the Company collects about You will depend on the manner in which You access or use the Website or any content on or through the Website and may include:\n\nYour name, age, or contact information, such as Your mailing address, telephone number, or email address, or other similar information associated with You; Your location, time-zone setting, network information, device type, browser type and version, browser plug-in types and version, operating system and platform, language, standard web log data, and IP address used to connect Your computer to the Internet or other similar identifier, or the equipment You use to access or use the Website and usage details; Data on the pages, services, or content You access or use on or through the Website, including the amount of time You spend on certain pages, products or services You viewed or searched for, clickstreams to, through, and from the Website, page response times, downloads and download errors, page interactions, or methods used to browse away from the Website; Billing or account information, if applicable; and Any other Personal Information that You choose to submit to us.\n\nThe Website and any content provided on or through the Website is not directed to any person who is not the legal age of majority under applicable law. The Company will not knowingly collect Personal Information from any person who is not the legal age of majority under applicable law.`,
      },
      {
        heading: "METHODS FOR COLLECTING PERSONAL INFORMATION",
        body: `The Company takes steps to ensure that any Personal Information we collect about You is adequate for, relevant to, and not excessive for the uses of such Personal Information, as described by this Privacy Policy.\n\n**Information Provided to the Company by You**\nPersonal Information the Company collects from You on or through the Website and as a result of Your access to or use of the Website or any content on or through the Website may include Personal Information You provide the Company directly, for example by:\n\nSubmitting, posting, publishing, displaying, or otherwise transmitting user generated content; filling in forms, making search queries, or corresponding with the Company on or through the Website, or otherwise communicating with the Company by any means including by phone, email, or other electronic messaging; or if applicable or available through or on the Website: creating or registering for an account; subscribing, purchasing, or requesting information on a service or product; entering a contest or promotion; or otherwise engaging with the Company through interaction points that might exist from time-to-time between You and the Company.\n\n**Information Collected by the Company Through Technological Means**\nThe Company may also use cookies or other technological collection methods to collect information, some of which may be Personal Information, about:\n\nThe device or equipment You use, including information about Your computer or mobile device, internet connection, IP address, operating system, and browser type; or Your browsing activities and patterns, including information about Your visits to the Website such as traffic data, location data, logs, and other similar communication data.\n\n**This information helps the Company improve the Website and the content available on or through the Website and otherwise improve the services of the Company by:**\n\nHelping the Company understand audience sizes and usage patterns on the Website; allowing the Company to tailor the Website to Your preferences and interests; and recognizing You when You visit the Website multiple times.\n\nThe technologies used by the Company to automatically collect the information described above may include cookies, which are small files placed on the hard drive of Your computer. You can turn off cookies using Your internet browser but doing so may limit or remove certain parts of the Website, certain content on the Website, or the functionality of the Website.\n\n**Third-Party Features**\nThe Website may include, integrate, or rely on links, plug-ins, services, social networks, content, or applications of third parties. Your access or use of such links, plug-ins, services, social networks, content, or applications may allow the third-party provider to collect or share information about You, some of which may be Personal Information. The Company does not control such third parties' use of cookies or similar technologies – if You would like to know more about how these third parties use such technologies, You should contact the responsible provider directly. The Company does not accept any responsibility or liability for the privacy policies of any such third parties or their compliance or non-compliance with such privacy policies.`,
      },
      {
        heading: "USING AND DISCLOSING PERSONAL INFORMATION",
        body: `**Use of Personal Information by the Company**\nThe Company collects Personal Information to provide You with a secure, smooth, efficient, and customized experience through or on the Website or any content on the Website. The Company may use Your Personal Information to:\n\nProvide You with content, services, or products on or through the Website; customize, measure, and improve the Website or content provided on or through the Website, or otherwise analyze or manage the Company's business operations or Website performance; prevent prohibited or illegal activities, loss, or fraud; enforce the Company's Terms of Use, or otherwise protect the security or integrity of the Website or the Company's business; deliver targeted marketing, service update notices, or promotional offers based on Your communication preferences; send You things in the mail or through other channels, such as products or services that You have requested; Register You for, or authenticate You when You sign into, an account or online services or when You purchase a product or service, or to provide You with notices about such accounts, subscriptions, or purchases; provide You notice about changes to the Website, this Privacy Policy, or the Company's Terms of Use; otherwise fulfill the purposes for which You have provided Personal Information or that were described when such Personal Information was collected; or carry out other purposes that are disclosed to You and to which You consent, or which are otherwise permitted or required by law.\n\nThe Company may combine all the Personal Information the Company collects, including Yours, in order to analyze and understand aggregate trends.\n\n**Third-Party Transfers**\nThe Company may transfer Your Personal Information to third parties that assist the Company with the use of Personal Information described in "Use of Personal Information by the Company", above. Such third parties may combine Personal Information provided by the Company with other information that they have independently collected from or about You. Some third parties may be located outside of Canada and may accordingly be subject to laws that are different from those in Canada.\n\nThe Company requires that all third parties that received any Personal Information from the Company use the same standards as the Company in using, maintaining, disclosing, and protecting such Personal Information.\n\nThe Company may share or sell aggregated, non-personally-identifiable information to third parties. For clarity, the Company does not sell Personal Information. The Company may also share aggregated, non-personally-identifiable information publicly to show trends about the general use of the Website, or any content, services, or products provided on or through the Website.\n\n**Other Disclosures of Personal Information**\nThe Company may disclose Your Personal Information if necessary to collect a debt from You or where the Company has reason to believe that such Personal Information is relevant to the investigation or decision to investigate a breach of the laws of Canada, a province or territory of Canada, or a foreign jurisdiction, and the Company is legally permitted or required to do so, or to otherwise comply with any court order, law, or legal process, including in response to any government or regulatory request or process, in accordance with applicable law. The Company may also disclose Your Personal Information, if necessary, to enforce this Privacy Policy or the Company's Terms of Use, or if the disclosure is necessary to protect the rights, property, or safety of the Company, the Website, users of the Website, or third parties.\n\nThe Company may transfer information about You, including Personal Information, in connection with a merger or sale (including any transfers made as part of an insolvency of bankruptcy proceedings) involving all or part of the Company's business or as part of a corporate reorganization or stock sale or other changes in corporate control.`,
      },
      {
        heading: "ACCESS AND CORRECTION",
        body: `You have the right to access Your Personal Information and to request a correction to Your Personal Information if You believe it is inaccurate. If You would like to access Your Personal Information, or have Your Personal Information corrected or deleted, please contact the Company in the manner set out by this Privacy Policy. The Company may charge You a fee to access Your Personal Information and will notify You in advance of any such fee.\n\nThe Company will provide You with access to Your Personal Information in accordance with applicable privacy legislation, and may decline to provide You access to Your Personal Information on the basis that such Personal Information is:\n\nProtected by solicitor-client privilege; or part of a legal proceeding, government or regulatory investigation or process, or otherwise part of a formal dispute resolution process. Where the Company is unable to provide You with access to Your Personal Information, reasons will be provided subject to any legal or regulatory restriction. You may have the right to withdraw the consent You have provided under this Privacy Policy in certain circumstances. To withdraw Your consent, if applicable, please contact the Company in the manner set out by this Privacy Policy.`,
      },
      {
        heading: "DATA SECURITY",
        body: `The security of Your Personal Information is important to the Company. The Company protects Your Personal Information by maintaining physical, organizational, and technological safeguards against unauthorized access, unauthorized disclosure, theft, or misuse appropriate to the sensitivity of such Personal Information. Personal Information collected by the Company may only be accessed by persons within the Company who require access to provide You with access to, use of, or content, services, or products provided on or through the Website. The Personal Information the Company collects is maintained in Frozen Garage Door Solutions Ltd. database.\n\nAlthough the Company takes measures to protect against data breaches and unauthorized access to Your Personal Information, no company can completely mitigate the risks of such breaches or unauthorized access and no website is fully secure. The Company cannot guarantee that hacking, data loss, breaches, or other unsanctioned access of the Company's security systems will never occur. Accordingly, You should not submit or otherwise provide Personal Information to the Company by any means if You consider that Personal Information to be sensitive.\n\nExcept as otherwise permitted or required by applicable law or regulation, the Company retains Personal Information only for as long as necessary for the purposes for which such Personal Information was collected. The Company reserves the right to use anonymous and de-identified information, including anonymized or otherwise de-identified Personal Information, for any legitimate business purpose without further notice to You and without Your Consent.`,
      },
      {
        heading: "CHANGES TO THE PRIVACY POLICY",
        body: `The Company reserves the right to amend this Privacy Policy for any or no reason, at any time, and from time to time in accordance with the terms of this Privacy Policy.\n\nThe Company will reflect any such amendments on the Website. Your continued access to or use of the Website or any content on or though the Website after any such amendment constitutes Your acceptance of the Privacy Policy as then amended. The Company includes the date this Privacy Policy was last amended at the top of this page.`,
      },
      {
        heading: "CONTACT INFORMATION AND CHALLENGING COMPLIANCE",
        body: `The Company has appointed a privacy officer responsible for ensuring compliance with this Privacy Policy. If You have any questions regarding this Privacy Policy or Your Personal Information, please contact the Company's privacy officer at <a href="mailto:info@frozengaragedoorsolutions.com">info@frozengaragedoorsolutions.com</a>`,
      },
    ],
  },

  terms: {
    title: "Terms of Service",
    lastUpdated: "June 29th, 2022",
    sections: [
      {
        heading: "1. INTRODUCTION",
        body: ``,
      },
      {
        heading: "1.1 Acceptance of Terms and Conditions of Use",
        body: `**IMPORTANT! YOUR ACCESS TO THIS WEBSITE IS SUBJECT TO THESE GENERAL TERMS AND CONDITIONS OF USE. CAREFULLY READ ALL OF THE FOLLOWING TERMS AND CONDITIONS OF USE BEFORE PROCEEDING. ACCESSING THIS WEBSITE IS THE EQUIVALENT OF YOUR SIGNATURE AND INDICATES YOUR ACCEPTANCE OF THESE TERMS AND CONDITIONS AND THAT YOU INTEND TO BE LEGALLY BOUND BY THEM. IF YOU DO NOT AGREE WITH THESE TERMS AND CONDITIONS, PLEASE DO NOT USE THIS WEBSITE AND DO NOT ENQUIRE ABOUT ANY PRODUCTS AND/OR SERVICES OFFERED FROM THIS WEBSITE OR DESCRIBED ON THIS WEBSITE.**\n\nThese general terms and conditions of use (the "Terms of Use") constitute a legal agreement between you ("You" and "Your") and Big Fist Home (the "Company") governing Your use of frozengaragedoorsolutions.com and all associated web pages owned by the Company (collectively, the "Website"). "We" and "Us" means both You and the Company. By accessing or using the Website or otherwise indicating Your consent to these Terms of Use, You agree to be bound by these Terms of Use and the documents referred to herein. If You do not agree with or accept any of the terms of these Terms of Use, You should cease using the Website immediately. These electronic Terms of Use shall be the equivalent of a written paper agreement between Us.\n\nBy using the Website, You represent and warrant that You are the legal age of majority under applicable law to form a binding contract with the Company.`,
      },
      {
        heading: "1.2 Amendment of Terms of Use",
        body: `These Terms of Use are dated June 29th, 2022. The Company reserves the right in its sole discretion to amend these Terms of Use for any or no reason, at any time, and from time to time. Any and all such amendments will be effective from the date they are published and will apply to all access to or continued use of the Website.\n\nBy continuing to use or access the Website following such amendment to these Terms of Use, You agree to be bound by the Terms of Use as amended, regardless of whether or not the Company notified You of such amendments. You agree to periodically review these Terms of Use in order to be aware of any amendments. No changes to these Terms of Use are valid or have any effect unless agreed to by the Company in writing.`,
      },
      {
        heading: "2. YOUR USE OF AND CONDUCT ON THE WEBSITE",
        body: ``,
      },
      {
        heading: "2.1 Nature of Use",
        body: `The Website is for Your personal and non-commercial use only. You agree that You will only access or use the Website for lawful purposes and in accordance with these Terms of Use. As a condition of Your access to and use of the Website, You warrant and agree that You will not use or access the Website to:\n\nViolate or promote the violation of any government-imposed restriction or rule or of any third-party's rights; impersonate any person or entity, misrepresent Your affiliation with a person or entity, or do any other thing or act that brings the Company, any other user of the Website, or any third-party into disrepute or causes liability for the Company; distribute viruses, malware, or any other technologies that are malicious or that may harm the Company, the Website, other users of the Website, the Company's affiliates, or any third-party, or in any other way interfere or attempt to interfere with the proper working of the Website; reverse engineer, decompile, copy, modify, distribute, transmit, license, sublicense, display, revise, perform, transfer, sell, or otherwise make available to any third-party, or otherwise publish, deeplink, create derivative works from or exploit in any way the Website or any content on the Website except as permitted by the Company under these Terms of Use; and harvest or otherwise collect, use, or disclose (including through the use of any robot, spider, or other automatic device, process, or means) content on the Website or personal information about any other user or users of the Website for any purpose.\n\nYou further represent and warrant with respect to any account that You may make on or through the Website that:\n\nAll the information You provide on or through the Website is correct, current, and complete; any username, password, or any other piece of information chosen by You, or provided to You as part of the Company's security procedures, if any, will be treated as confidential by You and will not be disclosed to any other person or entity; You will notify the Company immediately of any unauthorized access to or use of Your username or password, if applicable, or any other breach of security; and You will not transfer Your account, if any, to another person without the prior written consent of the Company.`,
      },
      {
        heading: "2.2 User Generated Content",
        body: `You may be able to submit, post, publish, display, or otherwise transmit content, material, or information to the Website or to other users or persons through or using the Website ("User Generated Content"). You are entirely responsible for all User Generated Content You submit, post, publish, display, or otherwise transmit on or through the Website. The Company is not responsible or legally liable to any third party for the content or accuracy of any User Generated Content submitted, posted, published, displayed, or otherwise transmitted on or through the Website by You or any other user of the Website. Any and all User Generated Content must comply with all applicable laws, regulations, and these Terms of Use.\n\nUser Generated Content may be removed, hidden, edited, or otherwise altered at the sole discretion of the Company for any or no reason, with or without notice, and at any time. However, the Company has no obligation, nor any responsibility to any party to monitor the Website or its use, and does not and cannot undertake to review User Generated Content. The Company cannot ensure prompt removal of objectionable material, including User Generated Content, and the Company has no liability for any action or inaction regarding transmissions, communications, or content, including User Generated Content, provided by any user of the Website or third-party, subject to applicable laws.\n\nThe discretion of the Company will be informed, but not limited by, the following guidelines for inappropriate User Generated Content. User Generated Content may be deemed inappropriate by the Company if it contains, depicts, includes, discusses, encourages, or involves, without limitation:\n\nMaterial or conduct that is illegal, exploitative, obscene, harmful, threatening, abusive, harassing, hateful, defamatory, sexually explicit or pornographic, violent, inflammatory, or discriminatory based on race, sex, religion, nationality, disability, sexual orientation, age, or other such legally prohibited ground; any false, inaccurate, or misleading information, or the impersonation or attempted impersonation of the Company, an employee of the Company, another user of the Website, or any other person or entity; conduct that restricts or inhibits anyone's use or enjoyment of the Website, or which, as determined by the Company in its sole discretion, may harm the Company or users of the Website, or expose either to liability; cause annoyance, inconvenience, or needless anxiety or be likely to upset, embarrass, or alarm any other person; or material or conduct that is otherwise objectionable, as determined by the Company at its sole discretion.\n\nBy submitting, posting, publishing, displaying, or otherwise transmitting any User Generated Content on or through the Website, You agree to grant the Company, its successors, and assigns, and the Company's affiliates and service providers as necessary, a worldwide, royalty free, perpetual, irrevocable, non-exclusive license to use, reproduce, modify, perform, display, distribute, copy, and otherwise disclose for any purpose any User Generated Content You submit, post, publish, display, or otherwise transmit on or through the Website. You waive all moral rights in any such User Generated Content.`,
      },
      {
        heading: "2.3 Ordering and Purchases",
        body: `You may be able to purchase products on the Website and Your purchase of any such goods will be governed by this subsection 2.3, subject to any additional terms relating to a particular product ("Additional Terms"), which will be made available to You at or before Your time of ordering and will prevail over these Terms of Use in the event of a conflict.\n\nBy selecting a product, quantity, colour, and/or any other features required to be selected by You, providing Your provided method of payment, and completing the steps required of You during the check-out process, You can place an order for a product on the Website. You may receive an email confirming that such order has been received by the Company, however: (a) any such order confirmation provided to You by the Company does not constitute an acceptance of Your order; and (b) the Company reserves the right, at its sole discretion, to accept or reject any order prior to shipment of that order. Without limiting the foregoing sentence, the Company may reject all or a portion of Your order because of the unavailability of the ordered product or products for purchase, errors in product pricing information, or a product recall for one or all of the products You ordered. Shipment and processing of payment for each product in Your order will constitute the Company's acceptance of that portion of Your order.\n\nThe Company does not represent or warrant that any product's description, image, or other such content on the Website is accurate, complete, reliable, or current. If You deem that a product You purchased on the Website is not as described on the Website, Your sole recourse is to return that product to the Company for a refund. Please direct such return inquiries to <a href="mailto:info@frozengaragedoorsolutions.com">info@frozengaragedoorsolutions.com</a>. To the extent legally permissible, the only warranties and conditions provided to You with respect to any particular product are those warranties and conditions described on the Website.\n\nBy placing an order for a product or products on the Website, and specifically by confirming your order at the conclusion of the check-out process, You agree to pay the Company the total amount set-out at the time You confirm Your order. All prices quoted on the Website, including the prices for products and shipping, are in Canadian dollars unless otherwise explicitly stated. Your provided method of payment will be charged for Your order or for each product in Your order as each portion of Your order is accepted by the Company and shipped. The Company reserves the right to reject Your order where the price of an ordered product has changed or was misstated on the Website; You may be provided an opportunity to accept such price change and continue with Your order. You are required to pay for all products shipped to You by the Company, even where such product is shipped to You as a result of an error by the Company, unless You return such product to the Company within 14 calendar days of Your receipt thereof. All payments owed by You are due no more than 30 calendar days after Your receipt of the product and/or order and the Company reserves the right to charge interest on any amounts owed but not paid by You within such time at the lower of 1.5% or the maximum rate permitted by law.\n\nAll information provided by You to the Company during the check-out process must be truthful, accurate, and complete for the purposes for which such information was requested. By providing payment information to the Company, You represent and warrant that You are the authorized owner of such payment method.\n\nThe Company may use third-party carriers to ship and deliver the products You order and the Company is not responsible for any loss or damage to any such products after the Company has delivered the products to a third-party carrier. Products You order may be shipped in one or multiple packages. Shipping costs provided to You during the check-out process are estimates only and are realized by the Company at the time of shipping. You agree to pay all shipping costs unless otherwise stated by the Company at the time of Your order, including without limitation any increase in the price of shipping or any duties or other such taxes.\n\nThe Company will respect any certain legal rights You have with respect to Your order under applicable consumer protection laws. For information on the Company's exchange and returns policy <a href="mailto:info@frozengaragedoorsolutions.com">info@frozengaragedoorsolutions.com</a>.`,
      },
      {
        heading: "3. INTELLECTUAL PROPERTY RIGHTS AND OWNERSHIP",
        body: `The Website and all the content of the Website (including without limitation all information, reports, data, databases, graphics, interfaces, web pages, text, files, software, code, product names, company names, trademarks, logos, trade names, any other intellectual property contained on the Website but excluding User Generated Content), the manner in which such content is presented or appears and all information relating thereto, and the Website's features and functionality (collectively, the "Website IP") are owned by the Company, its licensors, or other providers of such Website IP, and are protected in all forms by intellectual property laws, including without limitation copyright, trademark, patent, trade secret, industrial design, and any other proprietary rights.\n\nThe Company grants You a personal, revocable, non-transferable, and non-exclusive license to access and read the Website IP.\n\nYou agree that, except as explicitly authorized by the Company, You will not:\n\nDistribute the Website IP for any purpose, including without limitation by compiling an internal database, or by redistributing or reproducing the Website IP by the press or media or through any commercial network, cable, or satellite system; create derivative works of, reverse engineer, decompile, disassemble, adapt, translate, transmit, distribute, publish or republish, download, store, arrange, modify, copy, bundle, sell, sub-license, export, merge, transfer, loan, rent, lease, assign, share, outsource, host, make available to any person or otherwise use, either directly or indirectly, the Website IP in whole or in part, in any form or by any means whatsoever, be they physical, electronic, or otherwise; or allow any third-party to access the Website IP.`,
      },
      {
        heading: "4. ENFORCEMENT, SUSPENSION, AND TERMINATION",
        body: `The Company may in its sole discretion for any or no reason, with or without notice, and at any time:\n\nTerminate these Terms of Use; limit, suspend, or terminate Your access to or use of the Website; take technical and legal steps to prevent You from accessing or using the Website; or remove or otherwise modify any User Generated Content.\n\nAny such termination or action by the Company shall be in addition to and without prejudice to such rights and remedies as may be available to the Company, including injunction and equitable remedies. Any terms of these Terms of Use which are necessary to give effect to the rights of the Company under these Terms of Use or that contemplate survival beyond termination shall survive, except to the extent not permitted by law.`,
      },
      {
        heading: "5. INDEMNITY",
        body: `To the maximum extent permitted by applicable law, You agree at all times to indemnify, defend, and hold harmless the Company, its agents, affiliates, partners, and its and their respective directors, officers, employees, agents, service providers, contractors, licensors, suppliers, successors, and assigns from and against any claims, actions, proceedings, demands, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including legal and other fees and disbursements) sustained, incurred, or paid by the Company, or arising out of or relating to Your breach of these Terms of Use or Your access or use of the Website, including without limitation any User Generated Content You submit, post, publish, display, or otherwise transmit on or through the Website, and Your access to, use, or misuse of the Website or any content on the Website.`,
      },
      {
        heading: "6. LIMITATIONS ON LIABILITY AND DISCLAIMER",
        body: ``,
      },
      {
        heading: "6.1 Limitations on Liability",
        body: `**EXCEPT TO THE EXTENT PERMITTED BY LAW, IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, AGENTS, LICENSORS, SUPPLIERS, OR ITS OR THEIR RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, SERVICE PROVIDERS, CONTRACTORS, LICENSORS, LICENSEES, SUPPLIERS, OR SUCCESSORS BE LIABLE, WHETHER IN TORT, CONTRACT, OR OTHERWISE, FOR ANY SPECIAL, INDIRECT, INCIDENTAL, PUNITIVE, EXEMPLARY, AGGRAVATED, ECONOMIC, OR CONSEQUENTIAL DAMAGES, HOWSOEVER CAUSED, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF USE, LOST PROFITS, LOST GOODWILL OR BUSINESS REPUTATION, LOST DATA, OR LOST SAVINGS, EVEN IF THE COMPANY OR ANY OF ITS LAWFUL AGENTS OR EMPLOYEES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES OR CLAIM, RESULTING FROM YOUR USE OF OR INABILITY TO USE THE WEBSITE OR ANY CONTENT ON THE WEBSITE, INCLUDING WITHOUT LIMITATION: (A) ANY CHANGES THE COMPANY MAY MAKE TO THE WEBSITE OR TO ANY CONTENT ON THE WEBSITE, OR FOR ANY PERMANENT OR TEMPORARY CESSATION IN THE PROVISION OF THE WEBSITE OR ANY CONTENT ON THE WEBSITE; (B) THE DELETION OF, CORRUPTION OF, OR FAILURE TO SEND, DISPLAY, OR STORE ANY ADS, USER GENERATED CONTENT, OR OTHER COMMUNICATIONS OR DATA MAINTAINED OR TRANSMITTED BY OR THROUGH THE WEBSITE OR ANY CONTENT ON THE WEBSITE, INCLUDING USER GENERATED CONTENT; (C) YOUR FAILURE TO PROVIDE THE COMPANY WITH ACCURATE ACCOUNT INFORMATION OR TO KEEP YOUR PASSWORD OR ACCOUNT DETAILS SECURE AND CONFIDENTIAL, AS APPLICABLE. NOTWITHSTANDING THE FOREGOING, IF THE COMPANY IS FOUND TO BE LIABLE FOR ANY REASON, THE COMPANY'S LIABILITY TO YOU OR ANY THIRD PARTY IS LIMITED TO THE GREATER OF: (Y) THE TOTAL FEES SUCH PARTY MADE TO THE COMPANY IN THE 12 MONTHS PRIOR TO THE ACTION GIVING RISE TO THE LIABILITY; AND (Z) $150 CAD.**`,
      },
      {
        heading: "6.2 Availability, Completeness, and Quality",
        body: `You understand and agree that the Website, any content on the Website, and any services or items found or attained through the Website are provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied, including without limitation the implied warranties of merchantability, fitness for particular purpose, or non-infringement.\n\nExcept as otherwise expressly required by applicable law, the Company makes no representations, warranties, conditions, or other terms (whether express or implied) in relation to the provision of the Website or any content on the Website, including without limitation as to completeness, security, reliability, suitability, accuracy, availability, or currency of the Website or any content on the Website, that the Website or any content on the Website will be free from bugs, errors, or omission, or as to the satisfactory quality or fitness of the Website or any content on the Website for a particular purpose. The Company assumes no obligation to update the Website or any content on the Website. The Website or any content on the Website may be changed without notice to You.\n\nTo the maximum extent permitted by applicable law, the Company excludes all liability (whether arising in contract, tort, breach of statutory duty, or otherwise), which the Company may otherwise have to You as a result of any error or inaccuracies in the Website or any content on the Website, the unavailability of the Website for any reason, or any representation or statement made on or through the Website or any content on the Website.\n\nThe Company is not responsible for any content on the Website, including User Generated Content, that You may find undesirable or objectionable.`,
      },
      {
        heading: "6.3 Downloads",
        body: `The Company cannot and does not guarantee or warrant that files or data available for downloading on, through, or as a result of the Website will be free of viruses or other destructive code. You are solely and entirely responsible for Your use of the Website and Your computer, Internet, and data security. To the fullest extent provided by law, the Company will not be liable for any loss or damage caused by denial-of-service attack, distributed denial-of-service attack, overloading, flooding, mailbombing or crashing, viruses, trojan horses, worms, logic bombs, or other technologically harmful materials that may infect Your computer equipment, computer programs, data, or other proprietary material due to Your use of the Website or any services or items found or attained on, through, or as a result of the Website or to Your downloading of any material posted on or through the Website, or on any website linked to the Website.`,
      },
      {
        heading: "6.4 Third-Party Sites",
        body: `The Website or content on the Website may contain links to third-party sites. The Company does not assume responsibility for the accuracy or appropriateness of, and has no control over, the information, data, opinion, advice, or statements contained at such sites, and makes no representations about any such websites that may be accessed from the Website or from any content on the Website. Where You access such sites, You acknowledge and agree You are doing so at Your own risk. Your use of a third-party site may be governed by the terms and conditions of such site.\n\nIn providing links to third-party sites, the Company is in no way acting as a publisher or disseminator of any material contained on those sites and does not and does not seek to monitor or control such sites.\n\nA link to a third-party site does not mean and should not be construed to mean that the Company is affiliated or associated with such third-party in any way. The Company does not recommend or endorse any material found on such third-party sites. The mention of another party or its product or service on the Website or in any content on the Website is not and should not be construed as an endorsement of that party or its product or service.`,
      },
      {
        heading: "6.5 No Reliance",
        body: `Any reliance You may place on the Website or any content available on, through, or as a result of the Website is at Your own risk. Any content provided by the Company on, through, or as a result of the Website is provided for general information purposes only and to inform You about the Company and the Company's products, news, features, services, and other websites. Such content does not constitute technical, financial, or legal advice, or any other type of advice, and should not be relied on for any purpose. You agree to apply Your own judgment or obtain specific or professional advice before taking, or refraining from, any action or inaction on the basis of the Website or any content on the Website, including User Generated Content, including without limitation the use of the Website or any content on the Website, including User Generated Content, as the basis for any conclusions.`,
      },
      {
        heading: "6.6 No Offer of Sale",
        body: `Unless explicitly stated, the Website and the content on the Website are not to be construed as an offer to sell any product or service.`,
      },
      {
        heading: "6.7 Force Majeure",
        body: `The Company shall have no liability to You for any breach of these Terms of Use caused by any event or circumstances beyond the Company's reasonable control including without limitation strikes, lock-outs and other industrial disputes, breakdown of systems or network access, disease, flood, fire, explosion, or accident.`,
      },
      {
        heading: "7. RELEASE",
        body: `If You have a dispute with one or more other users of the Website, You release the Company, its affiliates, and licensors (and its and their directors, officers, employees, agents, and subsidiaries) from any claims, demands, and damages (actual and consequential) of every kind and nature, known and unknown, arising out of or in any way connected with such disputes.`,
      },
      {
        heading: "8. PRIVACY",
        body: `The use by the Company of Your personal information is governed by the Company's privacy policy ("Privacy Policy"), which can be found at <a href="privacy-policy.html">frozengaragedoorsolutions.com/privacy-policy</a>. By using the Company's Website or by submitting Your personal information, including User Generated Content, on or through the Website, You consent to the collection, use, and disclosure of Your personal information in accordance with the terms of the Privacy Policy.`,
      },
      {
        heading: "9. GENERAL",
        body: ``,
      },
      {
        heading: "9.1 No Agency",
        body: `No agency, partnership, joint venture, employee-employer, or franchiser-franchisee relationship is intended or created by these Terms of Use.`,
      },
      {
        heading: "9.2 Governing Law, Jurisdiction, and Attornment",
        body: `These Terms of Use shall be governed by and construed in accordance with the laws of the Province of Alberta and the federal laws of Canada applicable therein, without giving effect to any choice of law provision, principle, or rule, and notwithstanding Your domicile, residence, or physical location.\n\nFor the purpose of all legal proceedings, these Terms of Use shall be deemed to have been performed in the Province of Alberta and the courts of the Province of Alberta shall have jurisdiction to entertain any action arising under or out of these Terms of Use. You and the Company agree to irrevocably attorn and submit to the exclusive jurisdiction of the courts of the Province of Alberta. You further waive any and all objections to the exercise of jurisdiction over You by such courts and to the venue of such courts.\n\nYou agree to waive any right You may have to a trial by jury or to commence or participate in any class action against the Company related to the Website or any content on the Website, including User Generated Content, or these Terms of Use.`,
      },
      {
        heading: "9.3 Waiver",
        body: `No failure to exercise, or delay in exercising, any right, remedy, power, or privilege arising from these Terms of Use operates, or may be construed, as a waiver thereof. No single or partial exercise of any right, remedy, power, or privilege hereunder precludes any other or further exercise thereof or the exercise of any other right, remedy, power, or privilege.`,
      },
      {
        heading: "9.4 Severability",
        body: `Any term of these Terms of Use that is prohibited or unenforceable in any jurisdiction shall, as to that jurisdiction, be ineffective to the extent of such prohibition or unenforceability and shall be severed from the balance of these Terms of Use, all without affecting the remaining terms of these Terms of Use or affecting the validity or enforceability of such terms in any other jurisdiction. Nothing in these Terms of Use shall operate to prejudice any mandatory statutory requirement or Your statutory rights.`,
      },
      {
        heading: "9.5 Entire Agreement",
        body: `These Terms of Use together with the Privacy Policy and other documents referred to herein contain the entire understanding and agreement between Us in relation to Your use of the Website, and supersede and replace all prior and contemporaneous understandings, agreements, representation, statement, or other communication made by You or the Company, whether written or oral, that is not contained herein.`,
      },
      {
        heading: "9.6 Notices",
        body: `The Website is operated by Big Fist Home.\n\nYou consent to the exchange of information and documents between Us electronically over the Internet or by e-mail. If You have an account profile with the Company or have purchased a product or service from the Company, the Company will send You information and documents to the e-mail address in Your account profile on the Website or provided in the course of purchasing such product or service. You will send information and documents to the Company by email to <a href="mailto:info@frozengaragedoorsolutions.com">info@frozengaragedoorsolutions.com</a>.\n\nEvery notice that You are required or permitted to provide under these Terms of Use to the Company shall be in writing and provided to <a href="mailto:info@frozengaragedoorsolutions.com">info@frozengaragedoorsolutions.com</a>. All notices from the Company to You will be displayed on the Website from time to time.`,
      },
      {
        heading: "9.7 Assignment",
        body: `You may not assign, sublicense, or otherwise transfer any of Your rights and obligations in these Terms of Use to any other person.`,
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
        ${s.heading ? `<h2 style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.25rem;letter-spacing:-0.01em;color:#1a1a1a;margin-bottom:12px;">${s.heading}</h2>` : ""}
        <p style="font-size:0.92rem;line-height:1.75;color:#4b5563;">${body.replace(/<a /g, '<a style="color:#2695c8;text-decoration:underline;" ')}</p>
        ${tableHTML}
      </section>`;
  };

  document.getElementById("main-root").innerHTML = `
    <div style="max-width:780px;margin:0 auto;padding:24px 24px 96px;">

      <!-- Breadcrumb -->
      <nav style="display:flex;align-items:center;gap:8px;font-size:0.8rem;color:#9ca3af;margin-bottom:40px;flex-wrap:wrap;">
        <a href="index.html" style="color:#6b7280;text-decoration:none;transition:color 0.15s;" onmouseover="this.style.color='#1a1a1a'" onmouseout="this.style.color='#6b7280'">Home</a>
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        <span style="color:#1a1a1a;font-weight:500;">${policy.title}</span>
      </nav>

      <!-- Header -->
      <div style="margin-bottom:48px;padding-bottom:32px;border-bottom:1px solid rgba(0,0,0,0.08);">
        <h1 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(2rem,5vw,3rem);letter-spacing:-0.02em;color:#1a1a1a;margin-bottom:8px;">${policy.title}</h1>
        ${policy.lastUpdated ? `<p style="font-size:0.82rem;color:#9ca3af;">Last updated: ${policy.lastUpdated}</p>` : ""}
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
