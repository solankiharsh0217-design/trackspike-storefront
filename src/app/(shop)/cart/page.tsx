'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } = useCartStore();
  const [isClearing, setIsClearing] = useState(false);

  const shipping = total() > 100 ? 0 : 9.99;
  const tax = total() * 0.08;
  const orderTotal = total() + shipping + tax;

  const handleClearCart = async () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      setIsClearing(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      clearCart();
      setIsClearing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 text-secondary/30 mx-auto mb-6" />
          <h1 className="font-heading text-3xl font-bold text-primary mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-secondary mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/products">
            <Button size="lg">
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl font-bold text-primary mb-8">
        Shopping Cart ({itemCount()} items)
      </h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-secondary">Items in your cart</p>
            <button
              onClick={handleClearCart}
              disabled={isClearing}
              className="text-sm text-secondary/60 hover:text-red-500 transition-colors duration-200"
            >
              {isClearing ? 'Clearing...' : 'Clear Cart'}
            </button>
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 p-6 bg-surface border border-border rounded-xl"
            >
              {/* Image */}
              <div className="relative w-32 h-32 bg-background rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-heading font-semibold text-primary text-lg">
                      {item.name}
                    </h2>
                    <p className="text-sm text-secondary mt-1">
                      {item.color} / Size {item.size}
                    </p>
                    <p className="text-sm text-secondary">
                      SKU: {item.variantId.slice(0, 12)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="p-2 text-secondary/60 hover:text-red-500 transition-colors duration-200"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 border border-border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="p-2 hover:bg-background transition-colors duration-200"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="p-2 hover:bg-background transition-colors duration-200 disabled:opacity-50"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-semibold text-primary text-lg">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-sm text-secondary">
                        {formatPrice(item.price)} each
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium transition-colors duration-200 mt-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-surface border border-border rounded-xl p-6 space-y-6">
            <h2 className="font-heading text-xl font-semibold text-primary">
              Order Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-secondary">Subtotal</span>
                <span className="font-medium">{formatPrice(total())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Tax (estimated)</span>
                <span className="font-medium">{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold text-primary">Total</span>
                <span className="font-bold text-xl text-primary">
                  {formatPrice(orderTotal)}
                </span>
              </div>
            </div>

            {shipping > 0 && (
              <p className="text-sm text-secondary bg-background rounded-lg p-3">
                Add {formatPrice(100 - total())} more for free shipping!
              </p>
            )}

            <Link href="/checkout">
              <Button className="w-full" size="lg">
                Checkout
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <div className="text-center text-sm text-secondary/60">
              <p>Secure checkout powered by Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
