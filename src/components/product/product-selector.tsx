'use client';

import { useState } from 'react';
import { ShoppingBag, Heart, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { useUIStore } from '@/store/ui-store';
import { SizeGuideModal } from './size-guide-modal';
import type { Product } from '@/types';

interface ProductSelectorProps {
  product: Product;
}

export function ProductSelector({ product }: ProductSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useUIStore((state) => state.toggleCart);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setError(true);
      return;
    }
    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 450));

    const colorObj = product.colors.find((c) => c.name === selectedColor);
    addItem({
      productId: product.id,
      variantId: `${product.id}-${selectedColor}-${selectedSize}`,
      name: product.name,
      price: product.price,
      image: colorObj?.images?.[0] || product.images[0],
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
      stock: 10,
    });

    setIsAdding(false);
    toggleCart();
  };

  return (
    <div className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      {/* Color */}
      <div>
        <h3 className="mb-3 text-sm font-bold text-white">
          Color: <span className="font-normal text-white/50">{selectedColor || 'Select'}</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={cn(
                'relative h-11 w-11 rounded-full border-2 transition-all duration-300',
                selectedColor === color.name
                  ? 'scale-110 border-accent'
                  : 'border-white/15 hover:scale-105 hover:border-white/40'
              )}
              style={{ backgroundColor: color.hex }}
              aria-label={`Select ${color.name}`}
            >
              {selectedColor === color.name && (
                <Check
                  className={cn(
                    'absolute inset-0 m-auto h-5 w-5',
                    color.hex === '#FFFFFF' || color.hex === '#F0EAD6' ? 'text-black' : 'text-white'
                  )}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">
            Size: <span className="font-normal text-white/50">{selectedSize || 'Select'}</span>
          </h3>
          <button
            onClick={() => setShowSizeGuide(true)}
            className="text-xs font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                setSelectedSize(size);
                setError(false);
              }}
              className={cn(
                'rounded-xl border py-3 text-sm font-bold transition-all duration-300',
                selectedSize === size
                  ? 'border-accent bg-accent text-black'
                  : 'border-white/15 text-white hover:border-white/40'
              )}
            >
              {size}
            </button>
          ))}
        </div>
        {error && (
          <p className="mt-2 text-xs font-medium text-red-400">Please select a size first.</p>
        )}
      </div>

      {/* Add to cart */}
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-gold transition-all duration-300 hover:shadow-gold-lg disabled:opacity-60"
        >
          {isAdding ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
              Adding…
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </>
          )}
        </button>
        <button
          onClick={() => setWishlisted((w) => !w)}
          aria-label="Add to wishlist"
          className={cn(
            'flex h-[56px] w-[56px] items-center justify-center rounded-full border transition-all duration-300',
            wishlisted
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-white/15 text-white hover:border-accent hover:text-accent'
          )}
        >
          <Heart className={cn('h-5 w-5', wishlisted && 'fill-current')} />
        </button>
      </div>

      {/* Stock */}
      <div className="flex items-center gap-2 text-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
        </span>
        <span className="font-medium text-green-400">In Stock</span>
        <span className="text-white/40">— ships in 1–2 days</span>
      </div>

      <SizeGuideModal open={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </div>
  );
}
