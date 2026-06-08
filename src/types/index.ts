export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  sku: string;
  brand: string;
  category: string;
  subcategory?: string;
  images: string[];
  model3dUrl?: string;
  colors: ProductColor[];
  sizes: string[];
  features?: string[];
  tags?: string[];
  isActive: boolean;
  isFeatured: boolean;
  weight?: number;
  createdAt: Date;
  updatedAt: Date;
  variants?: ProductVariant[];
  reviews?: Review[];
}

export interface ProductColor {
  name: string;
  hex: string;
  images?: string[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  color: string;
  size: string;
  sku: string;
  stock: number;
  price?: number;
  images?: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  stock: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  paymentIntentId?: string;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  image: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface Address {
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  content?: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
