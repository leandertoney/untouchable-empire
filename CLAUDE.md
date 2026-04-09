# Untouchable Empire

Sneaker storefront built with Next.js 14, Supabase, Stripe, and Tailwind CSS.

## Tech Stack
- **Framework**: Next.js 14 (App Router, TypeScript)
- **Database**: Supabase (PostgreSQL + Auth + RLS)
- **Payments**: Stripe Checkout Sessions (one-time payments)
- **Styling**: Tailwind CSS

## Key Conventions
- All monetary values stored as **integers in cents** (e.g., $150.00 = 15000)
- Use `createServiceRoleClient()` for admin/write operations (bypasses RLS)
- Use `createClient()` for public reads (respects RLS)
- Stock is only decremented on successful payment (webhook), never on order creation
- Admin auth uses email match against `ADMIN_EMAIL` env var

## Database
- Schema defined in `supabase/migrations/00000000000000_initial_schema.sql`
- 3 tables: `products`, `orders`, `order_items`
- `decrement_stock()` SQL function handles atomic stock reduction

## API Routes
- `GET/POST /api/products` - List/create products
- `GET/PUT/DELETE /api/products/[id]` - Single product CRUD
- `POST /api/orders` - Create order with items
- `POST /api/checkout` - Create Stripe Checkout session
- `POST /api/stripe/webhook` - Handle payment confirmation

## Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
```
