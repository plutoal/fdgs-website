import { Cart } from "../cart.js";
import { showToast } from "../toast.js";
import { HeaderHTML, updateBadge, initHeader } from "../components/header.js";
import { FooterHTML } from "../components/footer.js";

document.getElementById("header-root").innerHTML = HeaderHTML({ logoHref: "index.html" });
document.getElementById("footer-root").innerHTML = FooterHTML();

document.getElementById("main-root").innerHTML = `
  <div style="max-width:600px;margin:0 auto;padding:24px 24px 96px;">

    <!-- Breadcrumb -->
    <nav style="display:flex;align-items:center;gap:8px;font-size:0.8rem;color:#9ca3af;margin-bottom:40px;">
      <a href="index.html" style="color:#6b7280;text-decoration:none;transition:color 0.15s;" onmouseover="this.style.color='#1a1a1a'" onmouseout="this.style.color='#6b7280'">Home</a>
      <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      <span style="color:#1a1a1a;font-weight:500;">Contact Us</span>
    </nav>

    <!-- Header -->
    <div style="margin-bottom:40px;padding-bottom:32px;border-bottom:1px solid rgba(0,0,0,0.08);">
      <h1 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(2rem,5vw,3rem);letter-spacing:-0.02em;color:#1a1a1a;margin-bottom:8px;">Get in Touch</h1>
      <p style="font-size:0.9rem;color:#6b7280;line-height:1.6;">Have a question about your order or our products? Send us a message and we'll get back to you as soon as possible.</p>
    </div>

    <!-- Form -->
    <form id="contact-form" style="display:flex;flex-direction:column;gap:20px;">

      <div style="display:flex;flex-direction:column;gap:6px;">
        <label for="contact-name" style="font-size:0.82rem;font-weight:600;color:#1a1a1a;">Name</label>
        <input id="contact-name" name="name" type="text" required placeholder="Your name"
          style="width:100%;padding:11px 14px;border:1px solid rgba(0,0,0,0.12);border-radius:10px;font-size:0.9rem;font-family:'Inter',sans-serif;color:#1a1a1a;background:#fff;outline:none;transition:border-color 0.15s;"
          onfocus="this.style.borderColor='#2695c8'" onblur="this.style.borderColor='rgba(0,0,0,0.12)'">
      </div>

      <div style="display:flex;flex-direction:column;gap:6px;">
        <label for="contact-email" style="font-size:0.82rem;font-weight:600;color:#1a1a1a;">Email</label>
        <input id="contact-email" name="email" type="email" required placeholder="your@email.com"
          style="width:100%;padding:11px 14px;border:1px solid rgba(0,0,0,0.12);border-radius:10px;font-size:0.9rem;font-family:'Inter',sans-serif;color:#1a1a1a;background:#fff;outline:none;transition:border-color 0.15s;"
          onfocus="this.style.borderColor='#2695c8'" onblur="this.style.borderColor='rgba(0,0,0,0.12)'">
      </div>

      <div style="display:flex;flex-direction:column;gap:6px;">
        <label for="contact-message" style="font-size:0.82rem;font-weight:600;color:#1a1a1a;">Message</label>
        <textarea id="contact-message" name="message" required rows="6" placeholder="How can we help you?"
          style="width:100%;padding:11px 14px;border:1px solid rgba(0,0,0,0.12);border-radius:10px;font-size:0.9rem;font-family:'Inter',sans-serif;color:#1a1a1a;background:#fff;outline:none;resize:vertical;transition:border-color 0.15s;line-height:1.6;"
          onfocus="this.style.borderColor='#2695c8'" onblur="this.style.borderColor='rgba(0,0,0,0.12)'"></textarea>
      </div>

      <button id="contact-submit" type="submit" class="btn btn-primary" style="padding:13px 28px;font-size:0.95rem;border-radius:12px;justify-content:center;width:100%;">
        Send Message
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>

    </form>

    <!-- Contact info -->
    <div style="margin-top:40px;padding:20px;background:#f8f8f8;border-radius:14px;display:flex;align-items:flex-start;gap:12px;">
      <div style="width:36px;height:36px;border-radius:10px;background:#e8f4fb;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="16" height="16" fill="none" stroke="#2695c8" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      </div>
      <div>
        <p style="font-size:0.82rem;font-weight:600;color:#1a1a1a;margin-bottom:2px;">Email us directly</p>
        <a href="mailto:info@frozengaragedoorsolutions.com" style="font-size:0.85rem;color:#2695c8;text-decoration:none;">info@frozengaragedoorsolutions.com</a>
      </div>
    </div>

  </div>`;

// Form submit handler
document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = document.getElementById("contact-submit");
  const name    = document.getElementById("contact-name").value.trim();
  const email   = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  btn.disabled = true;
  btn.textContent = "Sending…";

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (res.ok) {
      showToast("Message sent! We'll be in touch soon.");
      e.target.reset();
    } else {
      showToast(`⚠ ${data.error || "Failed to send message. Please try again."}`);
    }
  } catch {
    showToast("⚠ Network error. Please try again.");
  } finally {
    btn.disabled = false;
    btn.innerHTML = `Send Message <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
  }
});

initHeader({});
Cart.onChange(() => updateBadge());
updateBadge();
