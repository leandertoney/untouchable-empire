// All prices are in CENTS (integers). $150.00 = 15000.

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string | null;
  model: string | null;
  colorway: string | null;
  gender: 'mens' | 'womens' | 'unisex' | 'youth' | 'toddler' | null;
  category: 'sneakers' | 'slides' | 'boots' | 'accessories' | null;
  size: string;
  condition: 'new' | 'like_new' | 'used_excellent' | 'used_good';
  price: number;
  compare_at_price: number | null;
  sku: string | null;
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  pickup_available: boolean;
  delivery_available: boolean;
  delivery_fee: number;
  description: string | null;
  authenticity_notes: string | null;
  image_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  fulfillment_method: 'pickup' | 'delivery';
  pickup_time_preference: string | null;
  delivery_address_line1: string | null;
  delivery_address_line2: string | null;
  delivery_city: string | null;
  delivery_state: string | null;
  delivery_zip: string | null;
  order_notes: string | null;
  stripe_session_id: string | null;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  subtotal: number;
  delivery_fee: number;
  total: number;
  order_status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  size: string;
  price: number;
  quantity: number;
}

export interface CreateOrderPayload {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  fulfillment_method: 'pickup' | 'delivery';
  pickup_time_preference?: string;
  delivery_address_line1?: string;
  delivery_address_line2?: string;
  delivery_city?: string;
  delivery_state?: string;
  delivery_zip?: string;
  order_notes?: string;
  items: {
    product_id: string;
    quantity: number;
  }[];
}

export interface CreateProductPayload {
  name: string;
  slug?: string;
  brand?: string;
  model?: string;
  colorway?: string;
  gender?: Product['gender'];
  category?: Product['category'];
  size: string;
  condition?: Product['condition'];
  price: number;
  compare_at_price?: number;
  sku?: string;
  stock_quantity?: number;
  is_active?: boolean;
  is_featured?: boolean;
  pickup_available?: boolean;
  delivery_available?: boolean;
  delivery_fee?: number;
  description?: string;
  authenticity_notes?: string;
  image_urls?: string[];
}
