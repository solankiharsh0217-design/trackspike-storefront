import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductInfo } from '@/components/product/product-info';
import { ProductSelector } from '@/components/product/product-selector';
import { RelatedProducts } from '@/components/product/related-products';
import type { Product } from '@/types';

const mockProducts: Record<string, Product> = {
  'air-sprint-pro': {
    id: '1',
    name: 'Air Sprint Pro',
    slug: 'air-sprint-pro',
    description: 'Lightweight running shoe with responsive cushioning for speed training. Features our proprietary AirBoost technology for maximum energy return with every stride. The engineered mesh upper provides breathability and support where you need it most.',
    price: 149.99,
    comparePrice: 179.99,
    sku: 'TSP-001',
    brand: 'TrackSpike',
    category: 'running',
    images: ['/images/shoe-black.svg'],
    model3dUrl: '/models/shoe.glb',
    colors: [
      { name: 'Black', hex: '#1C1917', images: ['/images/shoe-black.svg'] },
      { name: 'White', hex: '#FFFFFF', images: ['/images/shoe-white.svg'] },
      { name: 'Gold', hex: '#CA8A04', images: ['/images/shoe-gold.svg'] },
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    features: [
      'AirBoost responsive cushioning',
      'Engineered mesh upper',
      'Continental rubber outsole',
      'Weight: 280g (size 10)',
      'Drop: 8mm',
    ],
    tags: ['running', 'speed', 'training', 'lightweight'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = mockProducts[slug];

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

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = mockProducts[slug];

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-secondary mb-8">
        <a href="/" className="hover:text-accent transition-colors duration-200">Home</a>
        <span className="text-border">/</span>
        <a href="/products" className="hover:text-accent transition-colors duration-200">Products</a>
        <span className="text-border">/</span>
        <span className="text-primary font-medium">{product.name}</span>
      </nav>

      {/* Product Section */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Gallery */}
        <ProductGallery
          images={product.images}
          model3dUrl={product.model3dUrl}
          colors={product.colors}
        />

        {/* Info */}
        <div className="space-y-8">
          <ProductInfo product={product} />
          <ProductSelector product={product} />
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={product.category}
        currentProductId={product.id}
      />
    </div>
  );
}
