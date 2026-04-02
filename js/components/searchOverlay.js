export function SearchOverlayHTML() {
  return `
    <div id="search-scrim" class="scrim"></div>
    <div id="search-overlay">
      <button id="search-close" class="btn btn-ghost" style="position:absolute;top:20px;right:20px;padding:8px;border-radius:10px;color:rgba(255,255,255,0.5);" aria-label="Close search">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <div style="width:100%;max-width:620px;padding:0 24px;">
        <p style="font-size:0.875rem;margin-bottom:12px;color:rgba(255,255,255,0.35);text-align:center;">Search for OHD parts and kits</p>
        <div style="position:relative;">
          <svg style="position:absolute;left:16px;top:50%;transform:translateY(-50%);color:rgba(255,255,255,0.4);pointer-events:none;" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input id="sov-input" type="text" placeholder="e.g. chain drive opener, torsion spring…"
            style="width:100%;background:rgba(255,255,255,0.09);border:1px solid rgba(255,255,255,0.18);color:#fff;padding:14px 16px 14px 46px;border-radius:12px;font-size:1.05rem;outline:none;font-family:'Inter',sans-serif;transition:border-color 0.2s,background 0.2s;"
            onfocus="this.style.borderColor='#2695c8';this.style.background='rgba(255,255,255,0.13)';"
            onblur="this.style.borderColor='rgba(255,255,255,0.18)';this.style.background='rgba(255,255,255,0.09)';">
        </div>
        <p style="font-size:0.75rem;margin-top:12px;color:rgba(255,255,255,0.28);text-align:center;">Press Enter to search · Esc to close</p>
      </div>
    </div>`;
}

export function openSearch() {
  document.getElementById('search-overlay')?.classList.add('on');
  document.getElementById('search-scrim')?.classList.add('on');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('sov-input')?.focus(), 80);
}

export function closeSearch() {
  document.getElementById('search-overlay')?.classList.remove('on');
  document.getElementById('search-scrim')?.classList.remove('on');
  document.body.style.overflow = '';
}

export function initSearchOverlay({ onInput, onSubmit } = {}) {
  document.getElementById('search-scrim')?.addEventListener('click', closeSearch);
  document.getElementById('search-close')?.addEventListener('click', closeSearch);

  const input = document.getElementById('sov-input');
  input?.addEventListener('input',   e => onInput?.(e.target.value));
  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter') { onSubmit?.(e.target.value); closeSearch(); }
    if (e.key === 'Escape') closeSearch();
  });
}
