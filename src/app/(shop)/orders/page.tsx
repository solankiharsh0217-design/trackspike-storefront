'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, ChevronRight, Loader2, ShoppingBag } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

interface OrderItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  color: string;
  size: string;
  image: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
  currency: string;
  items: OrderItem[];
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-500',
  paid: 'bg-blue-500/10 text-blue-500',
  processing: 'bg-blue-500/10 text-blue-500',
  shipped: 'bg-purple-500/10 text-purple-500',
  delivered: 'bg-green-500/10 text-green-500',
  cancelled: 'bg-red-500/10 text-red-500',
  refunded: 'bg-gray-500/10 text-gray-500',
};

export default function OrdersPage() {
  const { user, token } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      fetchOrders();
    }
  }, [user, token]);

  async function fetchOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-4xl px-4 pt-32 pb-16 sm:px-6">
          <div className="text-center">
            <ShoppingBag className="mx-auto mb-6 h-12 w-12 text-white/10" />
            <h1 className="font-heading text-3xl font-black uppercase tracking-[-0.03em] mb-4">
              Sign In Required
            </h1>
            <p className="text-sm text-white/40 mb-8">
              Please sign in to view your order history.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-[0_8px_30px_-5px_rgba(212,165,32,0.5)] transition-all hover:shadow-[0_12px_40px_-5px_rgba(212,165,32,0.6)]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-4xl px-4 pt-32 pb-16 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-accent/60">
            Order History
          </p>
          <h1 className="font-heading text-4xl font-black uppercase tracking-[-0.03em]">
            My Orders
          </h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-accent" />
          </div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center">
            <Package className="mx-auto mb-6 h-12 w-12 text-white/10" />
            <h2 className="text-lg font-bold text-white/60 mb-2">
              No orders yet
            </h2>
            <p className="text-sm text-white/30 mb-8">
              Start shopping to see your orders here.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-[0_8px_30px_-5px_rgba(212,165,32,0.5)] transition-all hover:shadow-[0_12px_40px_-5px_rgba(212,165,32,0.6)]"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-white/[0.04] bg-white/[0.02] p-6 hover:border-white/[0.08] transition-colors"
              >
                {/* Order Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-sm font-bold text-white/80">
                        {order.orderNumber}
                      </h3>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          statusColors[order.status] || 'bg-white/10 text-white/60'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/30">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white/80">
                      ${parseFloat(order.total).toFixed(2)}
                    </p>
                    <p className="text-[11px] text-white/30">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-white/[0.04] pt-4">
                  {order.items.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 py-2"
                    >
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-white/[0.03]">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-white/10">
                            <Package className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white/60 truncate">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-white/25">
                          {item.color} / {item.size} × {item.quantity}
                        </p>
                      </div>
                      <p className="text-xs font-medium text-white/50">
                        ${parseFloat(item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-[10px] text-white/25 pt-2">
                      +{order.items.length - 3} more item{order.items.length - 3 !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
