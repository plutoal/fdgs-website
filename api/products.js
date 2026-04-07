// api/products.js — GET /api/products
import { shopifyConfigured, shopifyGQL, jsonResponse } from './_shopify.js';

export default async function handler(req) {
  if (!shopifyConfigured()) {
    return jsonResponse({ configured: false, products: [] });
  }

  const query = `{
    products(first: 50) {
      nodes {
        id handle title description productType
        images(first: 1) { nodes { url } }
        priceRange       { minVariantPrice { amount } }
        compareAtPriceRange { minVariantPrice { amount } }
        variants(first: 1) {
          nodes { id quantityAvailable price { amount } compareAtPrice { amount } }
        }
        metafield(namespace: "custom", key: "specs") { value }
      }
    }
  }`;

  try {
    const data = await shopifyGQL(query);
    const nodes = data?.data?.products?.nodes || [];

    const products = nodes.map((p, i) => {
      const v          = p.variants.nodes[0] || {};
      const price      = parseFloat(v.price?.amount || p.priceRange.minVariantPrice.amount);
      const compareRaw = parseFloat(v.compareAtPrice?.amount || p.compareAtPriceRange.minVariantPrice.amount) || null;
      const compareAt  = compareRaw && compareRaw !== price ? compareRaw : null;
      let specs = {};
      if (p.metafield?.value) { try { specs = JSON.parse(p.metafield.value); } catch {} }
      return {
        id:        i + 1,
        shopifyId: p.id,
        variantId: v.id,
        handle:    p.handle,
        name:      p.title,
        type:      p.productType || 'OHD Kits',
        price,
        compareAt,
        stock:     v.quantityAvailable ?? 99,
        desc:      p.description,
        specs,
        img:       p.images.nodes[0]?.url ||
                   `https://placehold.co/480x320/dbeafe/1d4ed8?text=${encodeURIComponent(p.title)}`,
      };
    });

    return jsonResponse({ configured: true, products });
  } catch (err) {
    return jsonResponse({ error: err.message, products: [] }, 502);
  }
}
