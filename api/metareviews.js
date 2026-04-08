// api/metareviews.js — GET /api/metareviews
import { shopifyConfigured, shopifyGQL, jsonResponse } from './shopify-helpers.js';

export default async function handler() {
  if (!shopifyConfigured()) {
    return jsonResponse({ configured: false, testimonials: [] });
  }

  const query = `{
    metaobjects(type: "testimonial", first: 10) {
      nodes {
        fields { key value }
      }
    }
  }`;

  try {
    const data = await shopifyGQL(query);
    const nodes = data?.data?.metaobjects?.nodes || [];

    const testimonials = nodes.map(node => {
      const f = Object.fromEntries(node.fields.map(({ key, value }) => [key, value]));
      return {
        author:   f.author   || 'Anonymous',
        body:     f.body     || '',
        rating:   parseInt(f.rating || '5', 10),
        date:     f.date     || null,
        verified: f.verified === 'true',
        source:   'shopify',
      };
    });

    return jsonResponse({ configured: true, testimonials });
  } catch (err) {
    return jsonResponse({ error: err.message, testimonials: [] }, 502);
  }
}
