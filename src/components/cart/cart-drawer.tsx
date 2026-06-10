'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { useUIStore } from '@/store/ui-store';
import { formatPrice } from '@/lib/utils';

const FREE_SHIPPING_THRESHOLD = 100;

export function CartDrawer() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCartStore();
  const { isCartOpen, toggleCart } = useUIStore();

  const subtotal = total();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

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
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={toggleCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-[#0c0c0c] text-white shadow-2xl transition-transform duration-500 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 p-6">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5 text-accent" />
              <h2 className="font-heading text-lg font-black uppercase tracking-tight">
                Cart · {itemCount()}
              </h2>
            </div>
            <button
              onClick={toggleCart}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:text-white"
              aria-label="Close cart"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Free shipping progress */}
          {items.length > 0 && (
            <div className="border-b border-white/10 px-6 py-4">
              <p className="mb-2 text-xs text-white/55">
                {remaining > 0 ? (
                  <>
                    Add <span className="font-bold text-accent">{formatPrice(remaining)}</span> for
                    free shipping
                  </>
                ) : (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-accent">
                    <Check className="h-3.5 w-3.5" /> You&apos;ve unlocked free shipping!
                  </span>
                )}
              </p>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
                  <ShoppingBag className="h-10 w-10 text-white/25" />
                </div>
                <p className="mb-2 font-heading text-lg font-bold">Your cart is empty</p>
                <p className="mb-8 text-sm text-white/40">Add some heat to get started.</p>
                <button
                  onClick={toggleCart}
                  className="rounded-full bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wider text-black"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-[#161616]">
                      <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-heading text-sm font-bold">{item.name}</h3>
                      <p className="mt-0.5 text-xs text-white/40">
                        {item.color} · Size {item.size}
                      </p>
                      <p className="mt-1 font-bold text-accent">{formatPrice(item.price)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="rounded-lg border border-white/15 p-1 transition-colors hover:border-white/40"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="rounded-lg border border-white/15 p-1 transition-colors hover:border-white/40 disabled:opacity-40"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="ml-auto text-xs font-medium text-white/40 transition-colors hover:text-red-400"
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
            <div className="space-y-4 border-t border-white/10 p-6">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white/55">Subtotal</span>
                <span className="font-heading text-xl font-black">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-white/40">Shipping &amp; taxes calculated at checkout</p>
              <Link
                href="/checkout"
                onClick={toggleCart}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-sm font-bold uppercase tracking-wider text-black shadow-gold transition-all duration-300 hover:shadow-gold-lg"
              >
                Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/cart"
                onClick={toggleCart}
                className="block text-center text-sm font-medium text-white/50 transition-colors hover:text-accent"
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
