import { Cart } from '../cart.js';

const NAV_GROUPS = [
  {
    label: 'Shop',
    icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
    links: [
      { label: 'All Products',   href: 'index.html#catalog' },
      { label: 'Opener Kits',    href: 'index.html#catalog' },
      { label: 'Spring Systems', href: 'index.html#catalog' },
      { label: 'Safety Sensors', href: 'index.html#catalog' },
      { label: 'Accessories',    href: 'index.html#catalog' },
    ],
  },
  {
    label: 'Instructions & Manuals', 
    href:  'instructions.html',
    icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>`,
  },
  {
    label: 'Reviews',
    href:  'testimonials.html',
    icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  },
  {
    label: 'Support',
    icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    links: [
      { label: 'Shipping Info',     href: 'shipping-policy.html' },
      { label: 'Returns & Refunds', href: 'returns-policy.html' },
      { label: 'Contact Us',        href: 'contact.html' },
    ],
  },
  {
    label: 'Legal',
    icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    links: [
      { label: 'Privacy Policy',   href: 'privacy-policy.html' },
      { label: 'Terms of Service', href: 'terms-of-service.html' },
    ],
  },
];

const renderNavGroup = ({ label, icon, links, href }) => {
  if (href) return `
    <div class="nav-group">
      <a href="${href}" class="nav-group-header nav-link-direct">
        <span class="nav-group-icon">${icon}</span>
        <span>${label}</span>
      </a>
    </div>`;

  return `
    <details class="nav-group">
      <summary class="nav-group-header">
        <span class="nav-group-icon">${icon}</span>
        <span>${label}</span>
        <svg class="nav-chevron" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
      </summary>
      <ul class="nav-group-links">
        ${links.map(l => `
          <li>
            <a href="${l.href}" ${l.target ? `target="${l.target}" rel="noopener"` : ''} class="nav-link">
              ${l.label}
            </a>
          </li>`).join('')}
      </ul>
    </details>`;
};

export function HeaderHTML({ logoHref = 'index.html', showSearch = false } = {}) {
  return `
    <!-- Google Translate (hidden) -->
    <div id="google_translate_element" style="display:none;"></div>

    <!-- Nav scrim -->
    <div id="nav-scrim" class="scrim" aria-hidden="true"></div>

    <!-- Slide-in nav drawer -->
    <nav id="nav-drawer" aria-label="Site navigation">
      <div class="nav-drawer-header">
        <a href="${logoHref}" style="background:rgba(255,255,255,0.96);border-radius:8px;padding:4px 10px;display:flex;align-items:center;" aria-label="Home">
          <img src="brand_assets/FrozenGarageDoors-fINAL-01.PNG" alt="FDGS" style="height:32px;width:auto;display:block;">
        </a>
        <button id="nav-close-btn" class="nav-close-btn" aria-label="Close menu">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="nav-drawer-body">
        ${NAV_GROUPS.map(renderNavGroup).join('')}
      </div>

      <div class="nav-drawer-footer">
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:0.8rem;color:rgba(255,255,255,0.45);">Language</span>
          <div class="lang-switch" style="position:relative;display:inline-flex;align-items:center;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:20px;padding:2px;">
            <div class="lang-switch-thumb" style="position:absolute;left:2px;top:2px;bottom:2px;width:32px;border-radius:16px;background:rgba(38,149,200,0.75);transition:transform 0.2s cubic-bezier(0.34,1.56,0.64,1);pointer-events:none;"></div>
            <button class="lang-btn notranslate" data-lang="en" translate="no" style="position:relative;z-index:1;width:32px;padding:5px 0;font-size:0.78rem;font-weight:600;background:transparent;border:none;cursor:pointer;color:#fff;font-family:inherit;line-height:1;text-align:center;transition:color 0.15s;">EN</button>
            <button class="lang-btn notranslate" data-lang="fr" translate="no" style="position:relative;z-index:1;width:32px;padding:5px 0;font-size:0.78rem;font-weight:600;background:transparent;border:none;cursor:pointer;color:rgba(255,255,255,0.5);font-family:inherit;line-height:1;text-align:center;transition:color 0.15s;">FR</button>
          </div>
        </div>
      </div>
    </nav>

    <header id="hdr" style="position:fixed;top:0;left:0;right:0;z-index:30;">
      <div class="hdr-inner">

      <button id="hamburger-btn" class="btn btn-ghost" style="padding:10px;border-radius:10px;" aria-label="Open menu" aria-expanded="false" aria-controls="nav-drawer">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
          <line x1="3" y1="6"  x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      
      <a href="${logoHref}" style="flex-shrink:0;background:rgba(255,255,255,0.96);border-radius:10px;padding:5px 10px;display:flex;align-items:center;box-shadow:0 1px 8px rgba(0,0,0,0.18);" aria-label="Frozen Garage Door Solutions — Home">
          <img src="brand_assets/FrozenGarageDoors-fINAL-01.PNG" alt="FDGS" style="height:38px;width:auto;display:block;">
        </a>

        ${showSearch ? `
        <div id="hdr-search-wrap" style="flex:1;max-width:400px;display:none;">
          <form id="hdr-search-form" style="position:relative;">
            <svg style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:rgba(255,255,255,0.38);pointer-events:none;" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input id="hdr-search" type="text" placeholder="Search parts and kits…"
              style="width:100%;background:rgba(255,255,255,0.09);border:1px solid rgba(255,255,255,0.13);color:#fff;padding:9px 12px 9px 36px;border-radius:9px;font-size:0.875rem;outline:none;transition:border-color 0.2s,background 0.2s;font-family:'Inter',sans-serif;"
              onfocus="this.style.borderColor='rgba(38,149,200,0.7)';this.style.background='rgba(255,255,255,0.13)';"
              onblur="this.style.borderColor='rgba(255,255,255,0.13)';this.style.background='rgba(255,255,255,0.09)';">
          </form>
        </div>` : ''}

        <div style="flex:1;"></div>

        <div style="display:flex;align-items:center;gap:4px;">
          ${showSearch ? `
          <button id="mob-search-btn" class="btn btn-ghost" style="padding:10px;border-radius:10px;" aria-label="Search">
            <svg width="19" height="19" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </button>` : ''}
          <div class="lang-switch" style="position:relative;display:inline-flex;align-items:center;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:20px;padding:2px;">
            <div class="lang-switch-thumb" style="position:absolute;left:2px;top:2px;bottom:2px;width:32px;border-radius:16px;background:rgba(38,149,200,0.75);transition:transform 0.2s cubic-bezier(0.34,1.56,0.64,1);pointer-events:none;"></div>
            <button class="lang-btn notranslate" data-lang="en" translate="no" style="position:relative;z-index:1;width:32px;padding:5px 0;font-size:0.78rem;font-weight:600;background:transparent;border:none;cursor:pointer;color:#fff;font-family:inherit;line-height:1;text-align:center;transition:color 0.15s;">EN</button>
            <button class="lang-btn notranslate" data-lang="fr" translate="no" style="position:relative;z-index:1;width:32px;padding:5px 0;font-size:0.78rem;font-weight:600;background:transparent;border:none;cursor:pointer;color:rgba(255,255,255,0.5);font-family:inherit;line-height:1;text-align:center;transition:color 0.15s;">FR</button>
          </div>
          <button id="cart-btn" class="btn btn-ghost" style="padding:10px;border-radius:10px;position:relative;" aria-label="Cart">
            <svg width="19" height="19" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            <span id="cart-badge" style="display:none;position:absolute;top:4px;right:4px;min-width:18px;height:18px;background:#2695c8;color:#fff;border-radius:9px;font-size:0.65rem;font-weight:700;padding:0 4px;line-height:18px;text-align:center;"></span>
          </button>
        </div>
      </div>
    </header>`;
}

export function updateBadge(pop = false) {
  const el = document.getElementById('cart-badge');
  if (!el) return;
  const n = Cart.count();
  if (n > 0) {
    el.textContent = n > 99 ? '99+' : n;
    el.style.display = 'block';
    if (pop) { el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); }
  } else {
    el.style.display = 'none';
  }
}

// ── LANGUAGE TOGGLE ──────────────────────────────────────
function initTranslate() {
  // Inject Google Translate script once
  if (!document.getElementById('gt-script')) {
    window.googleTranslateElementInit = function () {
      new google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,fr', autoDisplay: false },
        'google_translate_element'
      );
    };
    const s = document.createElement('script');
    s.id  = 'gt-script';
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(s);
  }
}

function setLang(lang) {
  const select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event('change'));
  } else {
    // Translate widget not ready yet — use cookie fallback
    const d = location.hostname;
    if (lang === 'en') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${d}`;
    } else {
      document.cookie = `googtrans=/en/${lang}; path=/`;
      document.cookie = `googtrans=/en/${lang}; path=/; domain=${d}`;
    }
    location.reload();
  }
}

function syncLangButtons(activeLang) {
  const active = activeLang ?? (document.cookie.includes('googtrans=/en/fr') ? 'fr' : 'en');
  document.querySelectorAll('.lang-switch-thumb').forEach(thumb => {
    thumb.style.transform = active === 'fr' ? 'translateX(32px)' : 'translateX(0)';
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.style.color = btn.dataset.lang === active ? '#fff' : 'rgba(255,255,255,0.5)';
  });
}

export function initHeader({ onSearchInput, onSearchSubmit, onCartOpen, onSearchOpen } = {}) {
  initTranslate();
  syncLangButtons();
  document.querySelectorAll('.lang-switch').forEach(sw =>
    sw.addEventListener('click', (e) => {
      const rect = sw.getBoundingClientRect();
      const lang = e.clientX < rect.left + rect.width / 2 ? 'en' : 'fr';
      setLang(lang);
      syncLangButtons(lang);
    })
  );
  // Scroll shrink
  window.addEventListener('scroll', () =>
    document.getElementById('hdr')?.classList.toggle('scrolled', window.scrollY > 50)
  );

  // Responsive layout
  function syncLayout() {
    const w = window.innerWidth;
    const searchWrap = document.getElementById('hdr-search-wrap');
    const mobBtn     = document.getElementById('mob-search-btn');
    const hdrLabel   = document.querySelector('.hdr-label');
    if (searchWrap) searchWrap.style.display = w >= 768 ? 'block' : 'none';
    if (mobBtn)     mobBtn.style.display     = w >= 768 ? 'none'  : 'flex';
    if (hdrLabel)   hdrLabel.style.display   = w >= 768 ? 'inline': 'none';
  }
  window.addEventListener('resize', syncLayout);
  syncLayout();

  // Cart button
  document.getElementById('cart-btn')?.addEventListener('click', () => onCartOpen?.());

  // Mobile search button
  document.getElementById('mob-search-btn')?.addEventListener('click', () => onSearchOpen?.());

  // Header search form
  const form  = document.getElementById('hdr-search-form');
  const input = document.getElementById('hdr-search');
  form?.addEventListener('submit', e => { e.preventDefault(); onSearchSubmit?.(input.value); });
  input?.addEventListener('input', e => onSearchInput?.(e.target.value));

  // Nav drawer
  const drawer    = document.getElementById('nav-drawer');
  const scrim     = document.getElementById('nav-scrim');
  const hamburger = document.getElementById('hamburger-btn');
  const closeBtn  = document.getElementById('nav-close-btn');

  function openNav() {
    drawer?.classList.add('open');
    scrim?.classList.add('on');
    hamburger?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    drawer?.classList.remove('open');
    scrim?.classList.remove('on');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', openNav);
  closeBtn?.addEventListener('click', closeNav);
  scrim?.addEventListener('click', closeNav);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

  // Close drawer on nav link click
  drawer?.querySelectorAll('.nav-link').forEach(a =>
    a.addEventListener('click', closeNav)
  );
}
