import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductInfo } from '@/components/product/product-info';
import { ProductSelector } from '@/components/product/product-selector';
import { RelatedProducts } from '@/components/product/related-products';
import { fetchProductBySlug, getAllProductSlugs } from '@/lib/products';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs();
    return slugs;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

// A couple of lifestyle shots to enrich every product gallery
const lifestyleViews = [
  '/images/lifestyle/street-airmax.jpg',
  '/images/lifestyle/jordans-track.jpg',
];

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const galleryImages = [...product.images, ...lifestyleViews];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs uppercase tracking-wider text-white/40">
          <Link href="/" className="transition-colors hover:text-accent">Home</Link>
          <span className="text-white/20">/</span>
          <Link href="/products" className="transition-colors hover:text-accent">Products</Link>
          <span className="text-white/20">/</span>
          <span className="text-white/70">{product.name}</span>
        </nav>

        {/* Product section */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={galleryImages} name={product.name} />

          <div className="space-y-8">
            <ProductInfo product={product} />
            <ProductSelector product={product} />
          </div>
        </div>

        <RelatedProducts slug={slug} />
      </div>
    </div>
  );
}
