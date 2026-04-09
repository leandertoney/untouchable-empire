-- Shoe request / lead generation table
-- Captures customer interest in specific shoes for pre-sales and sourcing

CREATE TABLE IF NOT EXISTS public.shoe_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shoe_name TEXT NOT NULL,
  brand TEXT,
  style_code TEXT,
  size TEXT NOT NULL,
  max_price INTEGER,  -- cents, optional budget cap
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'sourcing', 'fulfilled', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shoe_requests_status ON public.shoe_requests(status);
CREATE INDEX idx_shoe_requests_email ON public.shoe_requests(customer_email);

-- RLS: service-role only
ALTER TABLE public.shoe_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Shoe requests are manageable by service role"
  ON public.shoe_requests FOR ALL
  USING (auth.role() = 'service_role');
