'use client';

import { useState } from 'react';
import { ShoppingBag, Heart, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { useUIStore } from '@/store/ui-store';
import type { Product } from '@/types';

interface ProductSelectorProps {
  product: Product;
}

export function ProductSelector({ product }: ProductSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useUIStore((state) => state.toggleCart);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const colorObj = product.colors.find((c) => c.name === selectedColor);
    const variant = product.variants?.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );

    addItem({
      productId: product.id,
      variantId: variant?.id || `${product.id}-${selectedColor}-${selectedSize}`,
      name: product.name,
      price: product.price,
      image: colorObj?.images?.[0] || product.images[0],
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
      stock: variant?.stock || 10,
    });

    setIsAdding(false);
    toggleCart();
  };

  return (
    <div className="space-y-6 p-6 bg-surface rounded-2xl border border-border">
      {/* Color Selection */}
      <div>
        <h3 className="font-heading font-semibold text-primary mb-3 text-sm">
          Color: <span className="text-secondary font-normal">{selectedColor || 'Select a color'}</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={cn(
                'relative w-11 h-11 rounded-full border-2 transition-all duration-300',
                selectedColor === color.name
                  ? 'border-accent scale-110 shadow-gold'
                  : 'border-border hover:border-border-hover hover:scale-105'
              )}
              style={{ backgroundColor: color.hex }}
              aria-label={`Select ${color.name}`}
            >
              {selectedColor === color.name && (
                <Check
                  className={cn(
                    'absolute inset-0 m-auto w-5 h-5',
                    color.hex === '#FFFFFF' ? 'text-primary' : 'text-white'
                  )}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold text-primary text-sm">
            Size: <span className="text-secondary font-normal">{selectedSize || 'Select a size'}</span>
          </h3>
          <button className="text-sm text-accent hover:text-accent-hover font-medium transition-colors duration-200">
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                'py-3 rounded-xl border text-sm font-semibold transition-all duration-300',
                selectedSize === size
                  ? 'border-accent bg-accent text-black shadow-gold'
                  : 'border-border bg-background text-primary hover:border-border-hover hover:bg-surface'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart */}
      <div className="flex gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={!selectedSize || isAdding}
          className="flex-1 bg-accent hover:bg-accent-hover text-black font-semibold rounded-full shadow-gold hover:shadow-gold-lg transition-all duration-300"
          size="lg"
        >
          {isAdding ? (
            <>
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="px-5 border-border hover:border-accent hover:bg-accent/5 rounded-full transition-all duration-300"
          aria-label="Add to wishlist"
        >
          <Heart className="w-5 h-5" />
        </Button>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2 text-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
        </span>
        <span className="text-green-600 font-medium">In Stock</span>
        <span className="text-secondary">- Ready to ship</span>
      </div>
    </div>
  );
}
