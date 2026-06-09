import { Hero } from '@/components/home/hero';
import { MarqueeBanner } from '@/components/home/marquee-banner';
import { FeaturedProducts } from '@/components/home/featured-products';
import { CategoryShowcase } from '@/components/home/category-showcase';
import { TechFeatures } from '@/components/home/tech-features';
import { BrandStory } from '@/components/home/brand-story';
import { Testimonials } from '@/components/home/testimonials';
import { Lookbook } from '@/components/home/lookbook';
import { Newsletter } from '@/components/home/newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBanner />
      <FeaturedProducts />
      <CategoryShowcase />
      <TechFeatures />
      <BrandStory />
      <Testimonials />
      <Lookbook />
      <Newsletter />
    </>
  );
}
