import type { Product, ProductColor } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

/**
 * Transform API product to frontend format
 */
function transformProduct(product: any): Product {
  return {
    ...product,
    price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
    comparePrice: product.comparePrice 
      ? (typeof product.comparePrice === 'string' ? parseFloat(product.comparePrice) : product.comparePrice)
      : undefined,
    colors: typeof product.colors === 'string' ? JSON.parse(product.colors || '[]') : (product.colors || []),
    weight: product.weight ? (typeof product.weight === 'string' ? parseFloat(product.weight) : product.weight) : undefined,
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
    products: data.products.map(transformProduct),
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
  return products.map(transformProduct);
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
  return products.map(transformProduct);
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
