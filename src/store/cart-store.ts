'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface CartStore {
  items: CartItem[];
  serverCartId: string | null;
  addItem: (item: Omit<CartItem, 'id'>) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  syncWithServer: (token: string) => Promise<void>;
  total: () => number;
  itemCount: () => number;
}

async function apiCall(path: string, options: RequestInit, token?: string) {
  if (!API_BASE_URL) return null;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) return null;
  return res.json();
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      serverCartId: null,

      addItem: async (item) => {
        // Always update local state first
        const existing = get().items.find(
          (i) => i.variantId === item.variantId
        );

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.variantId === item.variantId
                ? { ...i, quantity: Math.min(i.quantity + 1, i.stock) }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              { ...item, id: crypto.randomUUID() },
            ],
          });
        }

        // Sync to server if logged in
        const authData = localStorage.getItem('trackspike-auth');
        if (authData) {
          try {
            const { state } = JSON.parse(authData);
            if (state?.token) {
              await apiCall('/api/cart/items', {
                method: 'POST',
                body: JSON.stringify({
                  variantId: item.variantId,
                  quantity: 1,
                  color: item.color,
                  size: item.size,
                }),
              }, state.token);
            }
          } catch {}
        }
      },

      removeItem: async (variantId) => {
        set({
          items: get().items.filter((i) => i.variantId !== variantId),
        });

        const authData = localStorage.getItem('trackspike-auth');
        if (authData) {
          try {
            const { state } = JSON.parse(authData);
            if (state?.token) {
              const cartData = await apiCall('/api/cart', {}, state.token);
              if (cartData?.items) {
                const serverItem = cartData.items.find(
                  (i: any) => i.variantId === variantId
                );
                if (serverItem) {
                  await apiCall(`/api/cart/items/${serverItem.id}`, {
                    method: 'DELETE',
                  }, state.token);
                }
              }
            }
          } catch {}
        }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }

        set({
          items: get().items.map((i) =>
            i.variantId === variantId
              ? { ...i, quantity: Math.min(quantity, i.stock) }
              : i
          ),
        });

        const authData = localStorage.getItem('trackspike-auth');
        if (authData) {
          try {
            const { state } = JSON.parse(authData);
            if (state?.token) {
              const cartData = await apiCall('/api/cart', {}, state.token);
              if (cartData?.items) {
                const serverItem = cartData.items.find(
                  (i: any) => i.variantId === variantId
                );
                if (serverItem) {
                  await apiCall(`/api/cart/items/${serverItem.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ quantity }),
                  }, state.token);
                }
              }
            }
          } catch {}
        }
      },

      clearCart: async () => {
        set({ items: [] });

        const authData = localStorage.getItem('trackspike-auth');
        if (authData) {
          try {
            const { state } = JSON.parse(authData);
            if (state?.token) {
              await apiCall('/api/cart', { method: 'DELETE' }, state.token);
            }
          } catch {}
        }
      },

      syncWithServer: async (token) => {
        if (!API_BASE_URL) return;

        try {
          // Get server cart
          const serverCart = await apiCall('/api/cart', {}, token);

          if (serverCart?.items?.length > 0) {
            // Merge: prefer server items, add any local-only items
            const localItems = get().items;
            const serverItems: CartItem[] = serverCart.items.map((item: any) => ({
              id: item.id,
              productId: item.productId,
              variantId: item.variantId,
              name: item.name,
              price: item.price,
              image: item.image,
              color: item.color,
              size: item.size,
              quantity: item.quantity,
              stock: item.stock,
            }));

            // Add local items not on server
            for (const localItem of localItems) {
              const existsOnServer = serverItems.some(
                (si: CartItem) => si.variantId === localItem.variantId
              );
              if (!existsOnServer) {
                await apiCall('/api/cart/items', {
                  method: 'POST',
                  body: JSON.stringify({
                    variantId: localItem.variantId,
                    quantity: localItem.quantity,
                    color: localItem.color,
                    size: localItem.size,
                  }),
                }, token);
                serverItems.push(localItem);
              }
            }

            set({ items: serverItems });
          } else {
            // Server cart is empty, push local items
            for (const item of get().items) {
              await apiCall('/api/cart/items', {
                method: 'POST',
                body: JSON.stringify({
                  variantId: item.variantId,
                  quantity: item.quantity,
                  color: item.color,
                  size: item.size,
                }),
              }, token);
            }
          }
        } catch {}
      },

      total: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'trackspike-cart',
    }
  )
);
