import type { Product } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

// Placeholder images for products without images
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
  'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80',
  'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&q=80',
  'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80',
  'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800&q=80',
];

/**
 * Get placeholder image based on product index
 */
export function getPlaceholderImage(index: number): string {
  return PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length];
}

/**
 * Get product images or placeholders
 */
export function getProductImages(product: Product, index?: number): string[] {
  if (product.images && product.images.length > 0) {
    return product.images;
  }
  // Return placeholder based on product index or id
  const idx = index ?? Math.abs(hashString(product.id)) % PLACEHOLDER_IMAGES.length;
  return [PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length]];
}

/**
 * Simple string hash for consistent placeholder selection
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
}

/**
 * Transform API product to frontend format
 */
function transformProduct(product: any, index?: number): Product {
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [getPlaceholderImage(index ?? 0)];

  return {
    ...product,
    price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
    comparePrice: product.comparePrice 
      ? (typeof product.comparePrice === 'string' ? parseFloat(product.comparePrice) : product.comparePrice)
      : undefined,
    colors: typeof product.colors === 'string' ? JSON.parse(product.colors || '[]') : (product.colors || []),
    weight: product.weight ? (typeof product.weight === 'string' ? parseFloat(product.weight) : product.weight) : undefined,
    images,
    createdAt: product.createdAt ? new Date(product.createdAt) : new Date(),
    updatedAt: product.updatedAt ? new Date(product.updatedAt) : new Date(),
  };
}

/**
 * Fetch all products from API
 */
export async function fetchProducts(params?: {
  category?: string;
  brand?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<{ products: Product[]; page: number; limit: number }> {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set('category', params.category);
  if (params?.brand) searchParams.set('brand', params.brand);
  if (params?.search) searchParams.set('search', params.search);
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.limit) searchParams.set('limit', params.limit.toString());

  const response = await fetch(`${API_BASE_URL}/api/products?${searchParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return {
    ...data,
    products: data.products.map((p: any, i: number) => transformProduct(p, i)),
  };
}

/**
 * Fetch a single product by slug
 */
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${slug}`);
    if (!response.ok) {
      return null;
    }
    const product = await response.json();
    return transformProduct(product);
  } catch {
    return null;
  }
}

/**
 * Fetch featured products
 */
export async function fetchFeaturedProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/api/products/featured`);
  if (!response.ok) {
    throw new Error('Failed to fetch featured products');
  }
  const products = await response.json();
  return products.map((p: any, i: number) => transformProduct(p, i));
}

/**
 * Fetch categories with counts
 */
export async function fetchCategories(): Promise<{ id: string; name: string; count: number }[]> {
  const response = await fetch(`${API_BASE_URL}/api/products/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const categories = await response.json();
  return categories.map((name: string) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    count: 0,
  }));
}

/**
 * Fetch related products
 */
export async function fetchRelatedProducts(slug: string): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/api/products/${slug}/related`);
  if (!response.ok) {
    throw new Error('Failed to fetch related products');
  }
  const products = await response.json();
  return products.map((p: any, i: number) => transformProduct(p, i));
}

/**
 * Generate static params for product pages (for SSG)
 */
export async function getAllProductSlugs(): Promise<{ slug: string }[]> {
  try {
    const { products } = await fetchProducts({ limit: 1000 });
    return products.map((product) => ({ slug: product.slug }));
  } catch {
    return [];
  }
}
