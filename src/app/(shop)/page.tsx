import { Hero } from '@/components/home/hero';
import { FeaturedProducts } from '@/components/home/featured-products';
import { CategoryShowcase } from '@/components/home/category-showcase';
import { BrandStory } from '@/components/home/brand-story';
import { Newsletter } from '@/components/home/newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategoryShowcase />
      <BrandStory />
      <Newsletter />
    </>
  );
}
