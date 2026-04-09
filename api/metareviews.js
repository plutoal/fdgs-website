// api/metareviews.js — GET /api/metareviews
const https = require('https');

function shopifyConfigured() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token  = process.env.SHOPIFY_STOREFRONT_TOKEN;
  return !!(domain && token &&
    !token.startsWith('YOUR_') &&
    !token.endsWith('Shopify-Storefront-Access-Token'));
}

function shopifyPost(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ query, variables });
    const req = https.request({
      hostname: process.env.SHOPIFY_STORE_DOMAIN,
      path: '/api/2025-01/graphql.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_TOKEN,
        'Content-Length': Buffer.byteLength(payload),
      },
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch { reject(new Error('Invalid JSON')); } });
    });
    req.on('error', reject);
    req.setTimeout(8000, () => { req.destroy(); reject(new Error('Shopify request timed out')); });
    req.write(payload);
    req.end();
  });
}

module.exports = async function handler(_req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (!shopifyConfigured()) {
    return res.status(200).json({ configured: false, testimonials: [] });
  }

  const query = `{
    metaobjects(type: "testimonial", first: 10) {
      nodes {
        fields { key value }
      }
    }
  }`;

  try {
    const data = await shopifyPost(query);
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

    return res.status(200).json({ configured: true, testimonials });
  } catch (err) {
    return res.status(502).json({ error: err.message, testimonials: [] });
  }
};
