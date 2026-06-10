import type { MetadataRoute } from 'next';
import { fetchProducts } from '@/lib/products';

const BASE = 'https://trackspike-storefront.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/products',
    '/about',
    '/contact',
    '/faq',
    '/shipping',
    '/size-guide',
    '/track',
    '/careers',
    '/press',
    '/privacy',
    '/terms',
    '/cookies',
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  let productRoutes: MetadataRoute.Sitemap = [];

  try {
    const { products } = await fetchProducts({ limit: 1000 });
    productRoutes = products.map((p) => ({
      url: `${BASE}/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Failed to fetch products for sitemap:', error);
  }

  return [...staticRoutes, ...productRoutes];
}
