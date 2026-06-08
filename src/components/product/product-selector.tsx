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

    // Simulate API delay
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
    <div className="space-y-6 p-6 bg-background rounded-2xl border border-border">
      {/* Color Selection */}
      <div>
        <h3 className="font-medium text-primary mb-3">
          Color: <span className="text-secondary">{selectedColor || 'Select a color'}</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={cn(
                'relative w-10 h-10 rounded-full border-2 transition-all duration-200',
                selectedColor === color.name
                  ? 'border-accent scale-110'
                  : 'border-border hover:border-border-hover'
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
          <h3 className="font-medium text-primary">
            Size: <span className="text-secondary">{selectedSize || 'Select a size'}</span>
          </h3>
          <button className="text-sm text-accent hover:text-accent-hover transition-colors duration-200">
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                'py-3 rounded-lg border text-sm font-medium transition-all duration-200',
                selectedSize === size
                  ? 'border-accent bg-accent text-white'
                  : 'border-border bg-surface text-primary hover:border-border-hover'
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
          className="flex-1"
          size="lg"
        >
          {isAdding ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
          className="px-4"
          aria-label="Add to wishlist"
        >
          <Heart className="w-5 h-5" />
        </Button>
      </div>

      {/* Stock Status */}
      <p className="text-sm text-green-600 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-600 rounded-full" />
        In Stock - Ready to ship
      </p>
    </div>
  );
}
