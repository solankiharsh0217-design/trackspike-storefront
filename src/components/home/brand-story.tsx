import { Check } from 'lucide-react';

const features = [
  'Premium materials sourced globally',
  '30-day comfort guarantee',
  'Free shipping on orders over $100',
  'Sustainable manufacturing',
];

export function BrandStory() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Placeholder */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-secondary/50">
                <p className="text-lg font-heading font-semibold">Brand Image</p>
                <p className="text-sm">Replace with actual image</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <p className="text-accent font-medium mb-2">Our Story</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary">
                Crafted for Athletes, by Athletes
              </h2>
            </div>

            <p className="text-secondary text-lg">
              Founded in 2024, TrackSpike was born from a simple idea: create footwear that
              keeps up with your ambition. Every shoe we make is designed to help you push
              your limits and achieve your personal best.
            </p>

            <p className="text-secondary">
              We combine cutting-edge technology with timeless design to deliver shoes that
              perform as good as they look. From the track to the street, TrackSpike is
              your trusted partner.
            </p>

            {/* Features */}
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-primary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
