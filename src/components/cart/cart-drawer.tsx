'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { useUIStore } from '@/store/ui-store';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function CartDrawer() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCartStore();
  const { isCartOpen, toggleCart } = useUIStore();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleCart();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [toggleCart]);

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
          onClick={toggleCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-surface z-50 shadow-2xl transform transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-heading text-lg font-semibold">
              Cart ({itemCount()})
            </h2>
            <button
              onClick={toggleCart}
              className="p-2 text-secondary hover:text-primary transition-colors duration-200"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-secondary/30 mb-4" />
                <p className="text-secondary font-medium mb-2">Your cart is empty</p>
                <p className="text-secondary/60 text-sm mb-6">
                  Add some items to get started
                </p>
                <Button variant="secondary" onClick={toggleCart}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-background rounded-xl"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 bg-border rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-primary truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-secondary">
                        {item.color} / {item.size}
                      </p>
                      <p className="text-accent font-semibold mt-1">
                        {formatPrice(item.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-1 rounded-md hover:bg-border transition-colors duration-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="p-1 rounded-md hover:bg-border transition-colors duration-200 disabled:opacity-50"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="ml-auto text-secondary/60 hover:text-red-500 transition-colors duration-200 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-secondary">Subtotal</span>
                <span className="text-lg font-semibold">{formatPrice(total())}</span>
              </div>
              <p className="text-sm text-secondary/60">
                Shipping and taxes calculated at checkout
              </p>
              <Link href="/checkout" onClick={toggleCart}>
                <Button className="w-full" size="lg">
                  Checkout
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link
                href="/cart"
                onClick={toggleCart}
                className="block text-center text-secondary hover:text-accent transition-colors duration-200"
              >
                View Full Cart
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
