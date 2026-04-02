export function BadgeList({ isSale, disc, isLow, isOut }) {
  const parts = [];
  if (isSale) parts.push(`<span class="bdg bdg-sale">−${disc}%</span>`);
  if (isLow)  parts.push(`<span class="bdg bdg-low">Low Stock</span>`);
  if (isOut)  parts.push(`<span class="bdg bdg-out">Out of Stock</span>`);
  return parts.length
    ? `<div class="badge-stack">${parts.join('')}</div>`
    : '';
}

export function StockBadge(p) {
  if (p.stock === 0) return '<span class="bdg bdg-out">Out of Stock</span>';
  if (p.stock <= 5)  return `<span class="bdg bdg-low">Low Stock — only ${p.stock} left</span>`;
  return `<span class="bdg bdg-in">✓ In Stock (${p.stock} available)</span>`;
}
