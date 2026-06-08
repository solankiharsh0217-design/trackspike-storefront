# TrackSpike USA - Project Context

## Project Overview
Premium athletic footwear e-commerce site. Deployed on Vercel from `master` branch.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"` + `@theme` in CSS, NOT `tailwind.config.ts`)
- **3D**: React Three Fiber + @react-three/drei (Three.js)
- **State**: Zustand with persist middleware
- **Animations**: CSS keyframes + Tailwind animate utilities (no framer-motion)
- **Icons**: Lucide React
- **API Client**: Custom fetch wrapper (`src/lib/api.ts`)
- **Utilities**: clsx + tailwind-merge (`cn()` function)
- **Package Manager**: npm (standalone repo, not monorepo)

## Repository
- **GitHub**: `https://github.com/solankiharsh0217-design/trackspike-storefront`
- **Vercel**: Auto-deploys from `master` branch

## Directory Structure
```
trackspike-storefront/
├── public/images/                    # SVG shoe illustrations
│   ├── shoe-black.svg                # Black shoe with gold swoosh
│   ├── shoe-white.svg                # White shoe with gold accents
│   ├── shoe-gold.svg                 # Gold shoe with dark sole
│   ├── hero-shoe.svg                 # Large hero shoe with glow
│   ├── category-running.svg          # Running category illustration
│   ├── category-casual.svg           # Casual category illustration
│   └── category-trail.svg            # Trail category illustration
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout - DM Sans + Inter fonts
│   │   ├── globals.css               # ALL Tailwind v4 theme config lives here
│   │   └── (shop)/
│   │       ├── layout.tsx            # Shop layout - Navbar + CartDrawer + Footer
│   │       ├── page.tsx              # Homepage (imports Hero, FeaturedProducts, etc.)
│   │       ├── cart/page.tsx         # Cart page
│   │       └── products/
│   │           ├── page.tsx          # Product listing with sidebar filters
│   │           └── [slug]/page.tsx   # Product detail page
│   ├── components/
│   │   ├── 3d/
│   │   │   └── shoe-viewer.tsx       # R3F 3D shoe (box geometry, auto-rotate, studio lighting)
│   │   ├── cart/
│   │   │   └── cart-drawer.tsx       # Slide-out cart drawer
│   │   ├── home/
│   │   │   ├── hero.tsx              # Dark gradient hero with animated elements
│   │   │   ├── featured-products.tsx # Product grid with nav arrows
│   │   │   ├── category-showcase.tsx # 3 category cards with SVGs
│   │   │   ├── brand-story.tsx       # Split section with features
│   │   │   └── newsletter.tsx        # Dark CTA section
│   │   ├── layout/
│   │   │   ├── navbar.tsx            # Glass morphism sticky navbar
│   │   │   └── footer.tsx            # Dark multi-tier footer
│   │   ├── product/
│   │   │   ├── product-card.tsx      # Card with star ratings, hover effects
│   │   │   ├── product-gallery.tsx   # Image gallery + 3D viewer toggle
│   │   │   ├── product-info.tsx      # Product details, ratings, trust badges
│   │   │   ├── product-selector.tsx  # Color/size selectors + add to cart
│   │   │   ├── products-grid.tsx     # Filterable product grid
│   │   │   ├── products-filters.tsx  # Sidebar category/brand/price filters
│   │   │   └── related-products.tsx  # Related products section
│   │   └── ui/
│   │       ├── button.tsx            # Variants: primary, secondary, ghost, outline
│   │       ├── card.tsx              # Card, CardHeader, CardContent, CardFooter
│   │       ├── badge.tsx             # Variants: default, accent, success, error, warning
│   │       ├── input.tsx             # Input with label and error states
│   │       └── skeleton.tsx          # Skeleton + ProductCardSkeleton
│   ├── lib/
│   │   ├── api.ts                    # API client (products, auth, cart, orders, payments, reviews)
│   │   └── utils.ts                  # cn(), formatPrice(), slugify(), truncate()
│   ├── store/
│   │   ├── cart-store.ts             # Zustand - items, addItem, removeItem, updateQuantity, total, itemCount
│   │   └── ui-store.ts               # Zustand - isMobileMenuOpen, isCartOpen, isSearchOpen
│   ├── styles/
│   │   └── globals.css               # ALL theme config: colors, fonts, shadows, animations, utilities
│   └── types/
│       └── index.ts                  # Product, CartItem, Order, User, Address, Review, etc.
├── next.config.ts
├── package.json
├── postcss.config.mjs                # { "@tailwindcss/postcss": {} }
└── tsconfig.json
```

## Design System (CSS Variables in globals.css)

### Colors
```css
--color-primary: #0a0a0a;        /* Near black */
--color-primary-hover: #1a1a1a;
--color-secondary: #6b7280;      /* Gray */
--color-accent: #d4a520;         /* Gold */
--color-accent-hover: #b8941c;
--color-accent-light: #f5e6a3;
--color-surface: #ffffff;
--color-background: #fafafa;
--color-border: #e5e5e5;
--color-border-hover: #d4d4d4;
```

### Fonts
```css
--font-heading: 'DM Sans', system-ui, sans-serif;   /* Used via font-heading class */
--font-body: 'Inter', system-ui, sans-serif;         /* Used via font-body class */
```

### Shadows (defined in @theme)
```
shadow-xs, shadow-sm, shadow-md, shadow-lg, shadow-xl, shadow-2xl
shadow-gold: 0 4px 20px rgba(212, 165, 32, 0.3)
shadow-gold-lg: 0 8px 32px rgba(212, 165, 32, 0.4)
shadow-card: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)
shadow-card-hover: 0 8px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)
shadow-glass: 0 8px 32px rgba(0,0,0,0.08)
```

### Animations (defined as CSS @keyframes, used via animate-* utility)
```
animate-fade-in, animate-slide-up, animate-slide-in, animate-scale-in
animate-float, animate-pulse-gold, animate-shimmer, animate-gradient
animate-fade-in-up, animate-fade-in-left, animate-fade-in-right
animate-slide-down, animate-spin-slow
```

### Custom CSS Utilities (in globals.css, not Tailwind)
```
.glass              /* bg-white/70 backdrop-blur-2xl border-white/30 */
.glass-dark         /* bg-black/70 backdrop-blur-2xl border-white/10 */
.glass-gold         /* bg-accent/8 backdrop-blur-2xl border-accent/15 */
.gradient-text      /* Gold gradient animated text */
.hover-lift         /* translateY(-6px) + shadow on hover */
.img-zoom           /* scale(1.08) on parent hover */
.skeleton           /* Shimmer loading animation */
.noise-overlay      /* SVG noise texture overlay */
.grid-pattern       /* Grid line pattern */
.dot-pattern        /* Dot pattern */
```

## Key Design Tokens
- Gold accent: `#d4a520` (hover: `#b8941c`)
- Dark backgrounds: `#0a0a0a`, `#111111`, `#1a1a1a`
- Buttons: `rounded-full` (pill shape)
- Cards: `rounded-2xl` or `rounded-3xl`
- Glass effect: `bg-white/80 backdrop-blur-2xl border border-white/20`

## Mock Data
- All products are hardcoded in components (NOT from API)
- Product images reference SVGs: `/images/shoe-black.svg`, `/images/shoe-white.svg`, `/images/shoe-gold.svg`
- API base URL: `http://localhost:8787` (Hono.js on Cloudflare Workers) - NOT wired yet
- Product detail mock data is in `src/app/(shop)/products/[slug]/page.tsx`

## Zustand Stores

### cart-store.ts
```typescript
interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  itemCount: () => number;
}
// Persisted to localStorage as 'trackspike-cart'
```

### ui-store.ts
```typescript
interface UIStore {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  toggleMobileMenu: () => void;
  toggleCart: () => void;
  toggleSearch: () => void;
  closeAll: () => void;
}
```

## Types (src/types/index.ts)
- `Product` - id, name, slug, description, price, comparePrice, sku, brand, category, images[], model3dUrl?, colors: ProductColor[], sizes[], features?, tags?, isActive, isFeatured, variants?: ProductVariant[], reviews?: Review[]
- `ProductColor` - name, hex, images?
- `ProductVariant` - id, productId, color, size, sku, stock, price?, images?
- `CartItem` - id, productId, variantId, name, price, image, color, size, quantity, stock
- `Order` - id, orderNumber, userId, status, subtotal, shipping, tax, total, currency, paymentIntentId?, shippingAddress, billingAddress, notes?, items[], createdAt, updatedAt
- `User` - id, email, firstName, lastName, phone?
- `Address` - label, line1, line2?, city, state, postalCode, country
- `Review` - id, productId, userId, rating, title, content?, isVerified, createdAt

## CRITICAL BUILD RULES (Tailwind v4)

1. **NEVER create `tailwind.config.ts`** - it conflicts with `@theme` in CSS. All theme config lives in `globals.css`.

2. **`@import url(...)` for fonts MUST come AFTER `@import "tailwindcss"`** - otherwise CSS build warns about import order.

3. **`@keyframes` must be defined OUTSIDE `@theme` block** - putting them inside won't generate `animate-*` utility classes.

4. **All client components need `'use client'` at top** - components using hooks, browser APIs, or event handlers.

5. **SVG images in `/public/images/` work with Next.js `Image` component** - they render as `<img>` tags.

6. **`next.config.ts`** - `reactCompiler: true` was removed (requires babel-plugin-react-compiler which wasn't installed).

## What's NOT Done
- No real product images (using SVG placeholders)
- No API integration (all mock data hardcoded)
- No auth/login/register pages
- No checkout page
- No about/contact pages
- No Stripe payment integration
- No Supabase connection
- No email/newsletter functionality
- The 3D shoe uses box-geometry, not a real shoe mesh
- No SEO metadata for individual pages
- No error boundaries
- No loading states (only skeleton)
- No responsive testing done
