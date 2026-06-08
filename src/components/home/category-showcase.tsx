import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Running',
    description: 'Engineered for speed and endurance',
    href: '/products?category=running',
    image: '/images/category-running.jpg',
    color: 'from-accent/20 to-accent/5',
  },
  {
    name: 'Casual',
    description: 'Style meets everyday comfort',
    href: '/products?category=casual',
    image: '/images/category-casual.jpg',
    color: 'from-primary/20 to-primary/5',
  },
  {
    name: 'Trail',
    description: 'Conquer any terrain',
    href: '/products?category=trail',
    image: '/images/category-trail.jpg',
    color: 'from-green-500/20 to-green-500/5',
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary">
            Shop by Category
          </h2>
          <p className="text-secondary mt-2 max-w-2xl mx-auto">
            Find the perfect shoe for your activity, from daily runs to weekend adventures.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`group relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br ${category.color} border border-border hover:border-accent/30 transition-all duration-300`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/80 mb-4">{category.description}</p>
                <span className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all duration-200">
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
