-- Untouchable Empire - Initial Schema
-- Sneaker storefront: products, orders, order items

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================
-- PRODUCTS
-- =====================
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  brand TEXT,
  model TEXT,
  colorway TEXT,
  gender TEXT CHECK (gender IN ('mens', 'womens', 'unisex', 'youth', 'toddler')),
  category TEXT CHECK (category IN ('sneakers', 'slides', 'boots', 'accessories')),
  size TEXT NOT NULL,
  condition TEXT NOT NULL DEFAULT 'new' CHECK (condition IN ('new', 'like_new', 'used_excellent', 'used_good')),
  price INTEGER NOT NULL CHECK (price > 0),
  compare_at_price INTEGER CHECK (compare_at_price IS NULL OR compare_at_price > 0),
  sku TEXT UNIQUE,
  stock_quantity INTEGER NOT NULL DEFAULT 1 CHECK (stock_quantity >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  pickup_available BOOLEAN NOT NULL DEFAULT true,
  delivery_available BOOLEAN NOT NULL DEFAULT true,
  delivery_fee INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  authenticity_notes TEXT,
  image_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_active ON public.products(is_active) WHERE is_active = true;
CREATE INDEX idx_products_featured ON public.products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_brand ON public.products(brand);
CREATE INDEX idx_products_category ON public.products(category);

-- =====================
-- ORDERS
-- =====================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  fulfillment_method TEXT NOT NULL CHECK (fulfillment_method IN ('pickup', 'delivery')),
  pickup_time_preference TEXT,
  delivery_address_line1 TEXT,
  delivery_address_line2 TEXT,
  delivery_city TEXT,
  delivery_state TEXT,
  delivery_zip TEXT,
  order_notes TEXT,
  stripe_session_id TEXT UNIQUE,
  payment_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  subtotal INTEGER NOT NULL CHECK (subtotal >= 0),
  delivery_fee INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL CHECK (total >= 0),
  order_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (order_status IN ('pending', 'confirmed', 'ready', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_email ON public.orders(customer_email);
CREATE INDEX idx_orders_stripe_session ON public.orders(stripe_session_id);
CREATE INDEX idx_orders_status ON public.orders(order_status);

-- =====================
-- ORDER ITEMS
-- =====================
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  size TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price > 0),
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0)
);

CREATE INDEX idx_order_items_order ON public.order_items(order_id);

-- =====================
-- AUTO-UPDATE updated_at TRIGGER
-- =====================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================
-- ROW LEVEL SECURITY
-- =====================

-- Products: public read, service-role write
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Products are manageable by service role"
  ON public.products FOR ALL
  USING (auth.role() = 'service_role');

-- Orders: service-role only
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Orders are manageable by service role"
  ON public.orders FOR ALL
  USING (auth.role() = 'service_role');

-- Order items: service-role only
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Order items are manageable by service role"
  ON public.order_items FOR ALL
  USING (auth.role() = 'service_role');

-- =====================
-- STOCK DECREMENT FUNCTION (atomic, prevents overselling)
-- =====================
CREATE OR REPLACE FUNCTION decrement_stock(p_product_id UUID, p_quantity INTEGER)
RETURNS INTEGER AS $$
DECLARE
  new_stock INTEGER;
BEGIN
  UPDATE public.products
  SET stock_quantity = stock_quantity - p_quantity
  WHERE id = p_product_id
    AND stock_quantity >= p_quantity
  RETURNING stock_quantity INTO new_stock;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient stock for product %', p_product_id;
  END IF;

  RETURN new_stock;
END;
$$ LANGUAGE plpgsql;
