import { TYPES } from '../data.js';

// Shared filter state — imported by filterSidebar and page orchestrators
export const filters = { q: '', type: 'All', inStock: false };

export function filterProducts(products) {
  return products.filter(p => {
    const q = filters.q.toLowerCase();
    if (q && !p.name.toLowerCase().includes(q) && !p.type.toLowerCase().includes(q)) return false;
    if (filters.type !== 'All' && p.type !== filters.type) return false;
    if (filters.inStock && p.stock === 0) return false;
    return true;
  });
}

function filterBodyHTML() {
  return `
    <div style="margin-bottom:24px;">
      <p style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#6b7280;margin-bottom:12px;">Category</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${TYPES.map(t => `
          <label style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-filter-type="${t}">
            <div class="fcheck ${filters.type === t ? 'active' : ''}">
              ${filters.type === t ? '<svg width="9" height="9" viewBox="0 0 9 9" fill="white"><path d="M1 4.5l2.5 2.5L8 2"/></svg>' : ''}
            </div>
            <span style="font-size:0.875rem;${filters.type === t ? 'color:#1a1a1a;font-weight:600' : 'color:#6b7280'};">${t}</span>
          </label>`).join('')}
      </div>
    </div>

    <div>
      <p style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#6b7280;margin-bottom:12px;">Availability</p>
      <label style="display:flex;align-items:center;gap:12px;cursor:pointer;">
        <div class="toggle">
          <input type="checkbox" ${filters.inStock ? 'checked' : ''} id="instock-toggle">
          <div class="toggle-track"></div>
          <div class="toggle-thumb"></div>
        </div>
        <span style="font-size:0.875rem;color:${filters.inStock ? '#1a1a1a' : '#6b7280'};${filters.inStock ? 'font-weight:500' : ''}">In Stock only</span>
      </label>
    </div>`;
}

export function renderFilterPanels() {
  const sbBody = document.getElementById('sidebar-filter-body');
  const shBody = document.getElementById('sheet-filters');
  if (sbBody) {
    sbBody.innerHTML = filterBodyHTML();
    if (sbBody.style.maxHeight !== '0px' && sbBody.style.maxHeight !== '') {
      sbBody.style.maxHeight = sbBody.scrollHeight + 200 + 'px';
    }
  }
  if (shBody) shBody.innerHTML = filterBodyHTML();
  reAttachFilterEvents();
}

function reAttachFilterEvents() {
  // Category labels
  document.querySelectorAll('[data-filter-type]').forEach(label => {
    label.addEventListener('click', () => {
      filters.type = label.dataset.filterType;
      window._onFilterChange?.();
    });
  });
  // In-stock toggle
  document.querySelectorAll('#instock-toggle').forEach(cb => {
    cb.addEventListener('change', e => {
      filters.inStock = e.target.checked;
      window._onFilterChange?.();
    });
  });
}

export function SidebarHTML() {
  return `
    <aside id="sidebar" style="width:240px;flex-shrink:0;position:sticky;top:88px;display:none;">
      <div style="background:#fff;border-radius:16px;border:1px solid rgba(0,0,0,0.06);box-shadow:0 1px 2px rgba(38,149,200,0.04),0 4px 16px rgba(0,0,0,0.05);overflow:hidden;">
        <button id="sidebar-toggle" style="width:100%;padding:16px 20px;border:none;background:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;">
          <span class="font-display font-bold" style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;color:#6b7280;">Filters</span>
          <svg id="sidebar-chevron" width="14" height="14" fill="none" stroke="#6b7280" stroke-width="2.2" viewBox="0 0 24 24" style="transition:transform 0.25s ease;"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div id="sidebar-filter-body" style="padding:0 20px;max-height:0;overflow:hidden;transition:max-height 0.3s ease, padding 0.3s ease;"></div>
        <div id="sidebar-reset-wrap" style="display:none;padding:0 20px 16px;">
          <button id="reset-filters" style="font-size:0.75rem;color:#2695c8;background:none;border:none;cursor:pointer;padding:2px 6px;border-radius:4px;transition:background 0.15s;" onmouseover="this.style.background='#e8f4fb'" onmouseout="this.style.background='none'">Reset</button>
        </div>
      </div>
    </aside>`;
}

export function FilterSheetHTML() {
  return `
    <div id="filter-scrim" class="scrim"></div>
    <div id="filter-sheet">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 24px;border-bottom:1px solid #f3f4f6;position:sticky;top:0;background:#fff;z-index:1;">
        <h3 class="font-display font-bold uppercase" style="font-size:1.1rem;letter-spacing:0.02em;">Filters</h3>
        <button id="filter-close" class="btn btn-ghost" style="color:#6b7280;padding:6px;border-radius:8px;" aria-label="Close filters">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div id="sheet-filters" style="padding:20px 24px 40px;"></div>
    </div>`;
}

export function openFilterSheet() {
  document.getElementById('filter-sheet')?.classList.add('open');
  document.getElementById('filter-scrim')?.classList.add('on');
  document.body.style.overflow = 'hidden';
}

export function closeFilterSheet() {
  document.getElementById('filter-sheet')?.classList.remove('open');
  document.getElementById('filter-scrim')?.classList.remove('on');
  document.body.style.overflow = '';
}

export function initFilterSidebar({ onChange } = {}) {
  window._onFilterChange = () => {
    renderFilterPanels();
    onChange?.();
  };

  // Sidebar collapse toggle
  const toggle = document.getElementById('sidebar-toggle');
  const body = document.getElementById('sidebar-filter-body');
  const chevron = document.getElementById('sidebar-chevron');
  const resetWrap = document.getElementById('sidebar-reset-wrap');
  let sidebarOpen = false;

  toggle?.addEventListener('click', () => {
    sidebarOpen = !sidebarOpen;
    if (sidebarOpen) {
      renderFilterPanels();
      body.style.maxHeight = body.scrollHeight + 200 + 'px';
      body.style.padding = '20px 20px 12px';
      chevron.style.transform = 'rotate(180deg)';
      if (resetWrap) resetWrap.style.display = 'block';
    } else {
      body.style.maxHeight = '0';
      body.style.padding = '0 20px';
      chevron.style.transform = 'rotate(0deg)';
      if (resetWrap) resetWrap.style.display = 'none';
    }
  });

  document.getElementById('filter-scrim')?.addEventListener('click', closeFilterSheet);
  document.getElementById('filter-close')?.addEventListener('click', closeFilterSheet);

  document.getElementById('filter-btn')?.addEventListener('click', () => {
    renderFilterPanels();
    openFilterSheet();
  });

  document.getElementById('reset-filters')?.addEventListener('click', () => {
    Object.assign(filters, { q: '', type: 'All', inStock: false });
    const hdrInput = document.getElementById('hdr-search');
    const sovInput = document.getElementById('sov-input');
    if (hdrInput) hdrInput.value = '';
    if (sovInput) sovInput.value = '';
    renderFilterPanels();
    onChange?.();
    updateChips(onChange);
  });
}

export function updateChips(onChange) {
  const el = document.getElementById('chips');
  if (!el) return;

  const tags = [];
  if (filters.type !== 'All')   tags.push({ label: 'Category: ' + filters.type, clear: () => { filters.type = 'All'; run(); } });
if (filters.inStock)          tags.push({ label: 'In Stock', clear: () => { filters.inStock = false; run(); } });
  if (filters.q)                tags.push({ label: `Search: "${filters.q}"`, clear: () => { filters.q = ''; document.getElementById('hdr-search').value = ''; document.getElementById('sov-input').value = ''; run(); } });

  function run() { renderFilterPanels(); onChange?.(); updateChips(onChange); }

  el.innerHTML = tags.map((t, i) => `
    <span style="display:inline-flex;align-items:center;gap:5px;background:#e8f4fb;color:#1a6d96;border:1px solid #bae6fd;border-radius:100px;padding:3px 10px 3px 12px;font-size:0.75rem;font-weight:500;">
      ${t.label}
      <button data-chip="${i}" style="display:flex;background:none;border:none;cursor:pointer;color:#1a6d96;padding:1px;" aria-label="Remove filter">
        <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </span>`).join('');

  el.querySelectorAll('[data-chip]').forEach(btn =>
    btn.addEventListener('click', () => tags[parseInt(btn.dataset.chip)].clear())
  );
}
