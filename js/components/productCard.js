import { Cart } from "../cart.js";
import { BadgeList } from "./badges.js";
import { InlineQtyControl } from "./qtyControl.js";

export function ProductCard(p, i = 0) {
  const qty = Cart.qty(p.id);
  const isLow = p.stock > 0 && p.stock <= 5;
  const isOut = false; // STOCK CHECK DISABLED — restore: p.stock === 0
  const isSale = !!(p.compareAt && p.compareAt > p.price);
  const disc = isSale ? Math.round((1 - p.price / p.compareAt) * 100) : 0;

  const stockColor = isOut ? "#9ca3af" : isLow ? "#c2410c" : "#16a34a";
  const stockText = isOut
    ? "Unavailable"
    : isLow
      ? `${p.stock} left`
      : "In stock";

  // STOCK CHECK DISABLED — uncomment when inventory is live
  // const cta = isOut
  //   ? `<button class="btn" style="width:100%;padding:10px;border-radius:10px;font-size:0.82rem;" disabled>Out of Stock</button>`
  //   : qty > 0
  //     ? InlineQtyControl({ id: p.id, qty })
  //     : `<button class="btn btn-primary" style="width:100%;padding:10px;border-radius:10px;font-size:0.82rem;" data-action="add-to-cart" data-id="${p.id}">Add to Cart</button>`;
  const cta =
    qty > 0
      ? InlineQtyControl({ id: p.id, qty })
      : `<button class="btn btn-primary" style="width:100%;padding:10px;border-radius:10px;font-size:0.82rem;" data-action="add-to-cart" data-id="${p.id}">Add to Cart</button>`;

  return `
    <div class="pcard" style="animation-delay:${i * 0.06}s;" data-card-id="${p.id}">
      <a class="pcard-link" href="product.html?id=${p.id}">
        <div class="pimg">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          ${BadgeList({ isSale, disc, isLow, isOut })}
        </div>
        <div class="pcard-info" style="padding:16px 18px 10px;">
          <h3 style="font-weight:600;font-size:0.93rem;line-height:1.35;margin:4px 0 10px;color:#1a1a1a;">${p.name}</h3>
          <div style="display:flex;align-items:baseline;gap:7px;margin-bottom:3px;">
            <span class="pcard-price" style="font-size:1.15rem;font-weight:700;color:#1a1a1a;">$${p.price.toFixed(2)}</span>
            ${isSale ? `<span style="font-size:0.78rem;color:#9ca3af;text-decoration:line-through;">$${p.compareAt.toFixed(2)}</span>` : ""}
          </div>
        </div>
      </a>
      <div style="padding:0 18px 18px;" data-cta>
        ${cta}
      </div>
    </div>`;
}
