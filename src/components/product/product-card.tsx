'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-surface rounded-xl border border-border overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-background overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hasDiscount && (
            <Badge variant="accent">
              -{discountPercent}%
            </Badge>
          )}
          {product.isFeatured && (
            <Badge variant="warning">
              Featured
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="p-2 bg-surface/90 backdrop-blur-sm rounded-full shadow-md hover:bg-accent hover:text-white transition-colors duration-200"
            aria-label="Add to wishlist"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Add to wishlist
            }}
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            className="p-2 bg-surface/90 backdrop-blur-sm rounded-full shadow-md hover:bg-accent hover:text-white transition-colors duration-200"
            aria-label="Quick add to cart"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Quick add to cart
            }}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-secondary/60 uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <h3 className="font-heading font-semibold text-primary group-hover:text-accent transition-colors duration-200 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-secondary mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className={cn(
            'font-semibold',
            hasDiscount ? 'text-accent' : 'text-primary'
          )}>
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-secondary/60 line-through">
              {formatPrice(product.comparePrice!)}
            </span>
          )}
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1.5 mt-3">
          {product.colors.slice(0, 4).map((color) => (
            <div
              key={color.name}
              className="w-4 h-4 rounded-full border border-border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-secondary/60">
              +{product.colors.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
