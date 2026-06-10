'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';

const FREE_SHIPPING_THRESHOLD = 100;

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } = useCartStore();
  const [isClearing, setIsClearing] = useState(false);

  const subtotal = total();
  const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const orderTotal = subtotal + shipping + tax;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleClearCart = async () => {
    setIsClearing(true);
    await new Promise((r) => setTimeout(r, 400));
    clearCart();
    setIsClearing(false);
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 text-center text-white">
        <div>
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white/5">
            <ShoppingBag className="h-12 w-12 text-white/25" />
          </div>
          <h1 className="font-heading text-4xl font-black uppercase">Your Cart is Empty</h1>
          <p className="mx-auto mt-3 max-w-md text-white/45">
            Looks like you haven&apos;t added anything yet. Let&apos;s fix that.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Shop the Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <h1 className="mb-10 font-heading text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-[-0.03em]">
          Your Bag <span className="text-white/30">({itemCount()})</span>
        </h1>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Items */}
          <div className="space-y-4 lg:col-span-2">
            {/* Free shipping bar */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <p className="mb-2 text-sm text-white/60">
                {remaining > 0 ? (
                  <>
                    You&apos;re <span className="font-bold text-accent">{formatPrice(remaining)}</span>{' '}
                    away from free shipping
                  </>
                ) : (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-accent">
                    <Check className="h-4 w-4" /> You&apos;ve unlocked free shipping!
                  </span>
                )}
              </p>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-sm font-medium text-white/50">Items</p>
              <button
                onClick={handleClearCart}
                disabled={isClearing}
                className="text-sm font-medium text-white/40 transition-colors hover:text-red-400"
              >
                {isClearing ? 'Clearing…' : 'Clear bag'}
              </button>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-[#161616]">
                  <Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-heading text-lg font-bold">{item.name}</h2>
                      <p className="mt-1 text-sm text-white/40">
                        {item.color} · Size {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="rounded-xl p-2 text-white/40 transition-colors hover:text-red-400"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center rounded-xl border border-white/15">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="p-2.5 transition-colors hover:text-accent"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="p-2.5 transition-colors hover:text-accent disabled:opacity-40"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="font-heading text-lg font-black">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="mb-5 font-heading text-lg font-black uppercase">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  <span className="font-semibold text-white">
                    {shipping === 0 ? <span className="text-accent">Free</span> : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Tax (est.)</span>
                  <span className="font-semibold text-white">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3">
                  <span className="font-bold">Total</span>
                  <span className="font-heading text-xl font-black">{formatPrice(orderTotal)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-sm font-bold uppercase tracking-wider text-black shadow-gold transition-all duration-300 hover:shadow-gold-lg"
              >
                Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-center text-xs text-white/35">Secure checkout · Demo only</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
