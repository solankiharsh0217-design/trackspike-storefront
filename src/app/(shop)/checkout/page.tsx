'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Check, ArrowLeft, CreditCard, Loader2 } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [placed, setPlaced] = useState(false);

  const subtotal = total();
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const orderTotal = subtotal + shipping + tax;

  async function handleCheckout() {
    if (items.length === 0) return;

    setLoading(true);
    try {
      // Create a cart ID for Shopify
      const cartId = crypto.randomUUID();
      
      // For now, we'll show a demo checkout
      // In production, this would redirect to Shopify checkout
      // const response = await fetch(`${API_BASE_URL}/api/checkout/create-checkout`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ cartId, email: '' }),
      // });
      // const { checkoutUrl } = await response.json();
      // window.location.href = checkoutUrl;

      // Demo: simulate checkout
      await new Promise(resolve => setTimeout(resolve, 1500));
      clearCart();
      setPlaced(true);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (placed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 text-center text-white">
        <div>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/15">
            <Check className="h-10 w-10 text-accent" />
          </div>
          <h1 className="font-heading text-4xl font-black uppercase">Order Confirmed</h1>
          <p className="mx-auto mt-3 max-w-md text-white/50">
            Thanks for the order. A confirmation is on its way to your inbox, and your kicks ship
            within 1–2 business days.
          </p>
          <p className="mt-4 font-mono text-sm text-accent">#TSP-{Math.floor(Math.random() * 900000 + 100000)}</p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-black"
          >
            Keep Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 text-center text-white">
        <div>
          <h1 className="font-heading text-3xl font-black uppercase">Your cart is empty</h1>
          <p className="mt-3 text-white/50">Add a pair before you check out.</p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-black"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <Link
          href="/cart"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to cart
        </Link>

        <h1 className="mb-10 font-heading text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-[-0.03em]">
          Checkout
        </h1>

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCheckout();
            }}
            className="space-y-10"
          >
            {/* Contact */}
            <Section step="01" title="Contact">
              <Input label="Email" type="email" full />
              <Input label="Phone" type="tel" full />
            </Section>

            {/* Shipping */}
            <Section step="02" title="Shipping Address">
              <Input label="First name" />
              <Input label="Last name" />
              <Input label="Address" full />
              <Input label="City" />
              <Input label="State" />
              <Input label="ZIP code" />
              <Input label="Country" />
            </Section>

            {/* Payment */}
            <Section step="03" title="Payment">
              <div className="sm:col-span-2">
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/5 p-3 text-sm text-accent">
                  <Lock className="h-4 w-4" />
                  Secured &amp; encrypted — you will be redirected to Shopify for payment.
                </div>
              </div>
            </Section>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-5 text-sm font-bold uppercase tracking-wider text-black shadow-gold transition-all duration-300 hover:shadow-gold-lg disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Continue to Payment · {formatPrice(orderTotal)}
                </>
              )}
            </button>
          </form>

          {/* Summary */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="mb-5 font-heading text-lg font-bold uppercase">Order Summary</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-[#161616]">
                      <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-black">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-white/40">{item.color} · Size {item.size}</p>
                    </div>
                    <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-sm">
                <Row label="Subtotal" value={formatPrice(subtotal)} />
                <Row label="Shipping" value={shipping === 0 ? 'Free' : formatPrice(shipping)} />
                <Row label="Tax" value={formatPrice(tax)} />
                <div className="flex justify-between border-t border-white/10 pt-3">
                  <span className="font-bold">Total</span>
                  <span className="font-heading text-xl font-black">{formatPrice(orderTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className="font-heading text-sm font-black text-accent">{step}</span>
        <h2 className="font-heading text-lg font-bold uppercase tracking-tight">{title}</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Input({
  label,
  type = 'text',
  full,
  placeholder,
}: {
  label: string;
  type?: string;
  full?: boolean;
  placeholder?: string;
}) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
        {label}
      </label>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:border-accent focus:outline-none"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-white/60">
      <span>{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}
