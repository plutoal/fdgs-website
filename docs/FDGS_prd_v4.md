# FDGS GARAGE PARTS STORE

## Product Requirements Document

**Headless Next.js + Shopify — Version 4**

Architecture: Decoupled Headless Commerce | Target: Premium UX, SEO-Optimized Storefront

*March 2026*

---

## 1. Project Overview

- **Product Name:** FDGS Garage Parts Store
- **Architecture:** Headless Commerce (Decoupled)
- **Frontend:** Next.js 15+ (App Router), Tailwind CSS
- **Backend Engine:** Shopify Storefront API (GraphQL)
- **Checkout/Payment:** Shopify Managed Checkout
- **Hosting:** Vercel (recommended for Next.js ISR support)
- **Target:** High-performance, SEO-optimized storefront for OHD kits with a premium UX feel
- **Guest Browsing:** Customers can browse, search, add to cart, and complete checkout without creating an account

---

## 2. Technical Architecture

| Component | Technology | Responsibility |
|-----------|-----------|----------------|
| Frontend Framework | Next.js 15+ | Routing, UI, SSR/ISR |
| Styling | Tailwind CSS | Responsive UI + branding |
| API Layer | Next.js Route Handlers | Secure proxy for Shopify API |
| Data Fetching | Shopify Storefront API | Products, collections, inventory |
| State Management | React Context + Server Components | Cart + UI state |
| Customer Auth | Shopify Customer Account API (OAuth) | Optional login/signup, order history |
| Database | Shopify Admin | Source of truth for all data |
| Custom Data | Shopify Metafields | Product specs, icons |
| Hosting / CI/CD | Vercel | Deployment, preview envs, ISR |

---

## 3. Core Features

### 3.1 Guest-First Shopping Experience

Customers can browse the full catalog, search and filter products, add items to cart, and complete checkout as guests with no login required. Account creation is optional and only needed for viewing order history or managing profile data.

### 3.2 Product Catalog (OHD Kits)

- **Source:** Shopify Admin
- **Uses metafields:** `custom.specs` (JSON) and `custom.icon_name` (String)

**Inventory Logic:**

- Show "Low Stock" badge if quantity ≤ 5
- Disable "Add to Cart" and show "Out of Stock" if quantity = 0
- If a cart item goes out of stock mid-session, notify the user and remove or disable the item at checkout redirect

**Metafield Fallbacks:**

- If `custom.specs` is empty or malformed JSON, display a generic "Specs unavailable" message
- If `custom.icon_name` is missing, fall back to a default product icon

### 3.3 Navigation and UI

**Sticky Header:**

- Logo (FDGS)
- Search bar (collapses to icon on mobile)
- Cart badge with item count
- Account link (shows "Sign In" for guests, profile menu for logged-in users)

**Hero Section:**

- Gradient background
- "Shop Now" CTA (scroll to catalog or route to /collections)

**Mobile-Specific Behavior:**

- Search bar collapses to a search icon; tapping opens full-width search overlay
- Filter sidebar renders as a bottom sheet or full-screen modal on screens < 768px
- Cart drawer slides up from bottom on mobile
- Sticky header reduces height on scroll for more viewport space

### 3.4 Search and Filtering

**Search (MVP):**

- Search bar in header
- Uses Shopify Storefront API products query with `query` parameter
- Submit-based: redirects to `/search?q=term`

**Filtering (MVP):**

- Price range
- Product type (category)
- Availability (In Stock only)

**UI Components:** `<SearchBar />`, `<FilterSidebar />`, `<ProductGrid />`

**Future Enhancements (Post-MVP):**

- Faceted filtering via Shopify Search & Discovery API
- Autocomplete/instant search
- Sorting by price, popularity, newest

### 3.5 Shopping Cart

**Cart Flow:**

1. User adds item → update local state
2. Call Shopify mutation: `cartCreate` (first item) or `cartLinesAdd` (subsequent)
3. Store `cartId` in localStorage
4. Receive `checkoutUrl` from Shopify

**Persistence:**

```js
localStorage.setItem("cartId", cart.id)
```

**Known Limitation (MVP):** Cart is tied to localStorage. If the user clears browser data or switches devices, the cart is lost. Post-MVP, associate carts with authenticated customer accounts for cross-device persistence.

**UI — Slide-out Cart Drawer:**

- Line items with product image, name, variant
- Quantity adjuster (+/−)
- Line item price and subtotal
- Checkout button → redirects to Shopify managed checkout

### 3.6 Checkout Flow

The checkout is fully managed by Shopify. No login is required; customers check out as guests.

1. User clicks "Checkout" in cart drawer
2. Redirect to Shopify hosted checkout (`checkout.shopify.com/[store-id]`)
3. Shopify handles: payment processing, tax calculation, shipping options and rates
4. On success, Shopify redirects to `/thank-you?order_id={id}`

**Thank-You Page:**

- Extract `order_id` from URL parameters
- Optionally verify the order server-side via Shopify Admin API before displaying confirmation
- Display order number, summary, and expected delivery info
- Clear `cartId` from localStorage
- Prompt guest users to create an account to track their order

### 3.7 Post-Purchase: Shipping and Tracking

Shipping and tracking is managed via Shopify. Customers receive updates through:

- Shopify automated email notifications (order confirmation, shipping confirmation with tracking link, delivery notification)
- Optional: Build an `/orders/[id]` status page using Shopify Customer Account API for logged-in users

**MVP Approach:** Rely on Shopify email notifications for all post-purchase communication. Guest customers receive tracking via the email provided at checkout. An order lookup page is a post-MVP enhancement.

---

## 4. API Layer

All Shopify requests go through a secure backend layer inside Next.js Route Handlers. No Shopify tokens are exposed to the client.

**Route Structure:**

```
/app/api/shopify/
  products/route.ts
  cart/route.ts
  search/route.ts
  collections/route.ts
```

**Responsibilities:**

- Proxy requests to Shopify Storefront API
- Hide API tokens (`SHOPIFY_STOREFRONT_ACCESS_TOKEN`)
- Normalize and transform responses
- Handle errors centrally with consistent error response format
- Handle Shopify API rate limits (Storefront API uses cost-based throttling)

**Error Handling Strategy:**

- Return standardized error JSON: `{ error: string, code: string }`
- On Shopify rate limit (throttled response), implement exponential backoff or queue
- On network failure, return 503 with retry guidance
- Log errors server-side for debugging

---

## 5. User Authentication (Optional for Customers)

Authentication is entirely optional. All core shopping flows (browse, search, cart, checkout) work without an account.

**Technology:** Shopify Customer Account API (OAuth 2.0, newer version)

**OAuth Flow:**

1. User clicks "Sign In" on the storefront
2. Redirect to Shopify's hosted authentication page (`shopify.com/authentication`)
3. User authenticates and is redirected back with an authorization code
4. Next.js backend exchanges code for access token
5. Store token in a secure HTTP-only cookie
6. Token enables: order history, saved addresses, profile management

**Important:** This is completely separate from Shopify Admin authentication. The admin logs into Shopify Admin (`your-store.myshopify.com/admin`) independently to manage products, inventory, and orders. The OAuth flow described here only applies to storefront customers.

---

## 6. Admin and Management

All product and store management is handled via the Shopify Admin dashboard. No custom admin panel is needed for MVP.

**Admin Workflow:**

1. Log into Shopify Admin (`your-store.myshopify.com/admin`)
2. Add/edit products, update stock levels, adjust pricing
3. Configure shipping zones and rates
4. Manage orders, refunds, and fulfillment
5. Site updates propagate to the Next.js frontend via ISR revalidation

ISR ensures the storefront reflects admin changes within the configured revalidation window (default: 300 seconds / 5 minutes). For time-sensitive updates like flash sales, on-demand revalidation can be triggered via a webhook.

---

## 7. Environment and Deployment

**Hosting:**

- Platform: Vercel (native Next.js support, ISR, edge functions, preview deployments)
- Production domain: configured via Vercel dashboard
- Preview environments: automatic per pull request

**Environment Variables:**

| Variable | Purpose |
|----------|---------|
| `SHOPIFY_STORE_DOMAIN` | Your Shopify store URL |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API access token |
| `SHOPIFY_ADMIN_ACCESS_TOKEN` | Admin API token (for order verification) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for redirects |

**CI/CD:**

- Push to main branch triggers production deployment on Vercel
- Pull requests generate preview URLs for review
- Environment variables managed via Vercel project settings

---

## 8. SEO Strategy

The headless architecture requires deliberate SEO implementation since Shopify's built-in SEO features do not carry over to the custom frontend.

**Implementation:**

- **Dynamic metadata:** Generate unique title, description, and Open Graph tags per product and collection page using Next.js `generateMetadata()`
- **Structured data:** Add JSON-LD Product schema to every product page (name, price, availability, review rating if applicable)
- **Canonical URLs:** Set canonical tags on all pages to prevent duplicate content issues
- **Sitemap:** Auto-generate `sitemap.xml` pulling product and collection URLs from Shopify
- **Robots.txt:** Configure to allow crawling of public pages, block API routes and internal pages
- **Image optimization:** Use `next/image` with descriptive alt text for all product images

---

## 9. Functional Requirements

### 9.1 Data Model Mapping

| PRD Field | Shopify Field | Fallback |
|-----------|--------------|----------|
| Product Name | `title` | — |
| Price | `variants.price` | — |
| Original Price | `compareAtPrice` | Hide badge if null |
| Description | `descriptionHtml` | — |
| Stock | `inventoryQuantity` | — |
| Specs | `metafield custom.specs` | "Specs unavailable" |
| Icon | `metafield custom.icon_name` | Default product icon |

### 9.2 Performance Requirements

- Lighthouse score ≥ 90 across all categories
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Use `next/image` for all product images with lazy loading
- ISR caching with 300-second revalidation by default

**Caching Pattern:**

```js
fetch(url, { next: { revalidate: 300 } })
```

### 9.3 Error and Edge Case Handling

| Scenario | Handling |
|----------|---------|
| Cart item out of stock | Notify user, disable item in cart, prevent checkout of unavailable items |
| Shopify API rate limit | Implement retry with exponential backoff; show loading state to user |
| Failed checkout redirect | Show error page with option to retry or return to cart |
| Stale ISR cache | On-demand revalidation via Shopify webhook for critical changes; 404 for deleted products |
| Malformed metafield data | Graceful fallback with default values (see Section 3.2) |
| Network/API failure | User-friendly error message with retry option; server-side error logging |

---

## 10. Success Metrics

| Metric | Target |
|--------|--------|
| Page Load Time | < 2 seconds on 4G connection |
| Lighthouse Score | ≥ 90 in Performance, Accessibility, Best Practices, SEO |
| Core Web Vitals | LCP < 2.5s, FID < 100ms, CLS < 0.1 |
| Cart-to-Checkout Rate | Track and establish baseline in first 30 days |
| Inventory Sync Accuracy | Zero customer-facing out-of-stock purchase errors |
| Search Relevance | Top 3 results match user intent > 80% of the time |
| Mobile Responsiveness | Full functionality on screens 320px–2560px |
| Guest Checkout Completion | Track percentage of guest vs. account checkouts |

---

## 11. Future Enhancements (Post-MVP)

- Cross-device cart persistence for authenticated users
- Order status/tracking page (`/orders/[id]`) for logged-in customers
- Faceted search and autocomplete via Shopify Search & Discovery API
- Sorting options (price, popularity, newest)
- Product reviews and ratings
- Wishlist functionality for authenticated users
- On-demand ISR revalidation via Shopify webhooks for instant content updates
- Custom admin dashboard using Shopify Admin API (if needed beyond Shopify Admin)
