const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

interface RequestOptions extends RequestInit {
  token?: string;
}

async function fetchAPI<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Products
export const productsApi = {
  list: (params?: { category?: string; brand?: string; search?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.brand) searchParams.set('brand', params.brand);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    return fetchAPI<{ products: any[]; page: number; limit: number }>(`/api/products?${searchParams}`);
  },

  getBySlug: (slug: string) => fetchAPI<any>(`/api/products/${slug}`),

  getFeatured: () => fetchAPI<any[]>('/api/products/featured'),

  getCategories: () => fetchAPI<string[]>('/api/products/categories'),

  getRelated: (slug: string) => fetchAPI<any[]>(`/api/products/${slug}/related`),
};

// Auth
export const authApi = {
  register: (data: { email: string; password: string; firstName: string; lastName: string }) =>
    fetchAPI<{ user: any; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    fetchAPI<{ user: any; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: (token: string) => fetchAPI<any>('/api/auth/me', { token }),
};

// Cart
export const cartApi = {
  get: (token: string) => fetchAPI<any>('/api/cart', { token }),

  addItem: (token: string, data: { variantId: string; quantity: number; color: string; size: string }) =>
    fetchAPI<any>('/api/cart/items', {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    }),

  updateItem: (token: string, itemId: string, quantity: number) =>
    fetchAPI<any>(`/api/cart/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
      token,
    }),

  removeItem: (token: string, itemId: string) =>
    fetchAPI<any>(`/api/cart/items/${itemId}`, {
      method: 'DELETE',
      token,
    }),

  clear: (token: string) =>
    fetchAPI<any>('/api/cart', {
      method: 'DELETE',
      token,
    }),
};

// Orders
export const ordersApi = {
  create: (token: string, data: { shippingAddress: any; billingAddress: any; notes?: string }) =>
    fetchAPI<any>('/api/orders', {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    }),

  list: (token: string) => fetchAPI<any[]>('/api/orders', { token }),

  getById: (token: string, id: string) => fetchAPI<any>(`/api/orders/${id}`, { token }),
};

// Payments
export const paymentsApi = {
  createIntent: (token: string, orderId: string) =>
    fetchAPI<{ clientSecret: string }>('/api/payments/create-intent', {
      method: 'POST',
      body: JSON.stringify({ orderId }),
      token,
    }),
};

// Reviews
export const reviewsApi = {
  getByProduct: (slug: string) => fetchAPI<any[]>(`/api/products/${slug}/reviews`),

  create: (token: string, slug: string, data: { rating: number; title: string; content?: string }) =>
    fetchAPI<any>(`/api/products/${slug}/reviews`, {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    }),
};
