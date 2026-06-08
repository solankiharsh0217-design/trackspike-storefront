import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-secondary">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #CA8A04 2px, transparent 2px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-white space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              New Collection 2026
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Run Your
              <span className="text-accent block">Own Race</span>
            </h1>

            <p className="text-xl text-white/80 max-w-lg">
              Premium athletic footwear engineered for performance. Built for those who push boundaries.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="group">
                  Shop Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Our Story
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8">
              <div>
                <p className="text-3xl font-bold text-accent">50K+</p>
                <p className="text-white/60 text-sm">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">100+</p>
                <p className="text-white/60 text-sm">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">4.9</p>
                <p className="text-white/60 text-sm">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Image Placeholder - Replace with 3D viewer or product image */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <div className="text-center text-white/50">
                <p className="text-lg font-heading font-semibold">3D Product Viewer</p>
                <p className="text-sm">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
