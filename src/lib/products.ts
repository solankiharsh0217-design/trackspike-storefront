import type { Product } from '@/types';

/**
 * Central product catalog. Single source of truth for the storefront demo —
 * featured grid, listing, related, and detail pages all read from here so
 * imagery and copy never drift apart.
 */

const now = new Date('2026-01-01');

export const products: Product[] = [
  {
    id: '1',
    name: 'Velocity Racer',
    slug: 'velocity-racer',
    description:
      'Our fastest shoe, period. A featherweight flyknit upper wraps the foot like a second skin while the carbon-infused plate snaps energy back into every stride. Built for race day, tuned for personal bests.',
    price: 149.99,
    comparePrice: 179.99,
    sku: 'TSP-VR-001',
    brand: 'TrackSpike',
    category: 'running',
    images: ['/images/products/flyknit-red.jpg'],
    colors: [
      { name: 'Inferno Red', hex: '#DC2626' },
      { name: 'Core Black', hex: '#1C1917' },
      { name: 'Volt', hex: '#D4A520' },
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    features: [
      'Carbon-infused propulsion plate',
      'Engineered flyknit upper',
      'Energy-return foam midsole',
      'Weight: 218g (size 10)',
      'Heel-to-toe drop: 8mm',
    ],
    tags: ['running', 'racing', 'lightweight', 'carbon'],
    isActive: true,
    isFeatured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '2',
    name: 'Apex Air',
    slug: 'apex-air',
    description:
      'Visible air, invisible limits. The Apex Air pairs a breathable mesh upper with a full-length cushioning unit that turns every step into a launchpad. Daily miles never felt this effortless.',
    price: 159.99,
    sku: 'TSP-AA-002',
    brand: 'TrackSpike',
    category: 'running',
    images: ['/images/products/airmax-orange.jpg'],
    colors: [
      { name: 'Solar Orange', hex: '#EA580C' },
      { name: 'Cloud White', hex: '#FFFFFF' },
      { name: 'Storm Grey', hex: '#6B7280' },
    ],
    sizes: ['7', '8', '9', '10', '11', '12', '13'],
    features: [
      'Full-length visible air unit',
      'Breathable engineered mesh',
      'Reinforced heel counter',
      'Weight: 280g (size 10)',
      'Heel-to-toe drop: 10mm',
    ],
    tags: ['running', 'cushioned', 'daily'],
    isActive: true,
    isFeatured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '3',
    name: "Court Legend '85",
    slug: 'court-legend-85',
    description:
      'A hardwood icon, reborn. Premium tumbled leather, a chunky cupsole, and that unmistakable retro silhouette make the Court Legend as at home on the street as it once was on the court.',
    price: 189.99,
    comparePrice: 219.99,
    sku: 'TSP-CL-003',
    brand: 'TrackSpike',
    category: 'casual',
    images: ['/images/products/jordan-red.jpg'],
    colors: [
      { name: 'Varsity Red', hex: '#B91C1C' },
      { name: 'Black/White', hex: '#1C1917' },
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    features: [
      'Premium tumbled leather upper',
      'Vulcanized cupsole',
      'Padded collar & tongue',
      'Heritage outsole tread',
    ],
    tags: ['casual', 'retro', 'leather', 'basketball'],
    isActive: true,
    isFeatured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '4',
    name: 'Heritage One',
    slug: 'heritage-one',
    description:
      'The everyday essential. Clean lines, full-grain leather, and a cushioned cupsole that goes with everything. The Heritage One is the shoe you reach for without thinking.',
    price: 129.99,
    sku: 'TSP-H1-004',
    brand: 'TrackSpike',
    category: 'casual',
    images: ['/images/products/af1-tan.jpg'],
    colors: [
      { name: 'Desert Tan', hex: '#C8A878' },
      { name: 'Triple White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#1C1917' },
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    features: [
      'Full-grain leather upper',
      'Cushioned cupsole',
      'Perforated toe box',
      'Timeless low-top profile',
    ],
    tags: ['casual', 'everyday', 'leather'],
    isActive: true,
    isFeatured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '5',
    name: 'Trailhead GTX',
    slug: 'trailhead-gtx',
    description:
      'Built for the wild. A waterproof membrane keeps you dry while an aggressive lugged outsole bites into mud, rock, and root. When the path ends, the Trailhead keeps going.',
    price: 169.99,
    comparePrice: 199.99,
    sku: 'TSP-TH-005',
    brand: 'TrackSpike',
    category: 'trail',
    images: ['/images/products/nb-olive.jpg'],
    colors: [
      { name: 'Olive Drab', hex: '#556B2F' },
      { name: 'Slate', hex: '#475569' },
    ],
    sizes: ['7', '8', '9', '10', '11', '12', '13'],
    features: [
      'Waterproof GTX membrane',
      '5mm multi-directional lugs',
      'Rock-plate forefoot protection',
      'Abrasion-resistant toe cap',
    ],
    tags: ['trail', 'waterproof', 'grip', 'outdoor'],
    isActive: true,
    isFeatured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '6',
    name: 'Deck Classic',
    slug: 'deck-classic',
    description:
      'Skate-born, street-approved. A vulcanized sole and reinforced canvas give you board feel and durability, while the low profile keeps the look effortlessly clean.',
    price: 89.99,
    sku: 'TSP-DC-006',
    brand: 'TrackSpike',
    category: 'casual',
    images: ['/images/products/vans-burgundy.jpg'],
    colors: [
      { name: 'Port Wine', hex: '#7B2D3A' },
      { name: 'Off White', hex: '#F5F5F0' },
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    features: [
      'Vulcanized waffle outsole',
      'Double-stitched canvas upper',
      'Reinforced toe cap',
      'Padded sock liner',
    ],
    tags: ['casual', 'skate', 'canvas'],
    isActive: true,
    isFeatured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '7',
    name: 'Clean Court',
    slug: 'clean-court',
    description:
      'Minimal done right. A crisp leather upper on a slimline cupsole — the Clean Court is the modern tennis-inspired sneaker that elevates everything from denim to tailoring.',
    price: 119.99,
    sku: 'TSP-CC-007',
    brand: 'TrackSpike',
    category: 'casual',
    images: ['/images/products/puma-white.jpg'],
    colors: [
      { name: 'Triple White', hex: '#FFFFFF' },
      { name: 'Cream', hex: '#F0EAD6' },
    ],
    sizes: ['6', '7', '8', '9', '10', '11'],
    features: [
      'Smooth leather upper',
      'Slimline cupsole',
      'Tonal heel tab',
      'Ortholite comfort insole',
    ],
    tags: ['casual', 'minimal', 'tennis'],
    isActive: true,
    isFeatured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '8',
    name: 'Mono Elite',
    slug: 'mono-elite',
    description:
      'Stealth performance. An all-monochrome knit upper meets a precision-tuned foam stack for a shoe that looks as sharp as it runs. Your fastest fit, head to toe.',
    price: 199.99,
    sku: 'TSP-ME-008',
    brand: 'TrackSpike',
    category: 'running',
    images: ['/images/products/nike-pedestal.jpg'],
    colors: [
      { name: 'Triple Black', hex: '#0A0A0A' },
      { name: 'Phantom', hex: '#2A2A2A' },
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    features: [
      'Seamless monochrome knit',
      'Dual-density foam stack',
      'Internal bootie construction',
      'Weight: 245g (size 10)',
    ],
    tags: ['running', 'premium', 'knit'],
    isActive: true,
    isFeatured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '9',
    name: 'Studio Trainer',
    slug: 'studio-trainer',
    description:
      'One shoe, every session. A stable, low-drop platform built for lifting, HIIT, and everything in between. Locked-in support when you need it, flex where you want it.',
    price: 109.99,
    sku: 'TSP-ST-009',
    brand: 'TrackSpike',
    category: 'training',
    images: ['/images/products/trainer-blue.jpg'],
    colors: [
      { name: 'Sky Blue', hex: '#7DB9E8' },
      { name: 'Graphite', hex: '#383838' },
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    features: [
      'Flat 4mm training drop',
      'Wide stable base',
      'Rope-guard sidewalls',
      'Breathable mesh upper',
    ],
    tags: ['training', 'gym', 'stable'],
    isActive: true,
    isFeatured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '10',
    name: 'Rose Runner',
    slug: 'rose-runner',
    description:
      'Soft looks, serious miles. A plush collar and rose-toned upper sit on a responsive foam midsole that keeps recovery runs feeling smooth from the first step to the last.',
    price: 139.99,
    sku: 'TSP-RR-010',
    brand: 'TrackSpike',
    category: 'running',
    images: ['/images/products/nb-pink.jpg'],
    colors: [
      { name: 'Dusty Rose', hex: '#D9A5A5' },
      { name: 'Stone Grey', hex: '#A8A29E' },
    ],
    sizes: ['5', '6', '7', '8', '9', '10', '11'],
    features: [
      'Responsive foam midsole',
      'Plush padded collar',
      'Suede & mesh upper',
      'Weight: 255g (size 9)',
    ],
    tags: ['running', 'comfort', 'recovery'],
    isActive: true,
    isFeatured: false,
    createdAt: now,
    updatedAt: now,
  },
];

export const featuredProducts = products.filter((p) => p.isFeatured);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(category: string, excludeId: string, limit = 4): Product[] {
  const sameCategory = products.filter((p) => p.category === category && p.id !== excludeId);
  const others = products.filter((p) => p.category !== category && p.id !== excludeId);
  return [...sameCategory, ...others].slice(0, limit);
}

export const categories = [
  { id: 'running', name: 'Running', count: products.filter((p) => p.category === 'running').length },
  { id: 'casual', name: 'Casual', count: products.filter((p) => p.category === 'casual').length },
  { id: 'trail', name: 'Trail', count: products.filter((p) => p.category === 'trail').length },
  { id: 'training', name: 'Training', count: products.filter((p) => p.category === 'training').length },
];
