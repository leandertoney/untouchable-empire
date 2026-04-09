export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { getStripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  const { order_id } = await request.json();

  if (!order_id) {
    return NextResponse.json({ error: 'order_id is required' }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  // Fetch the order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', order_id)
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  if (order.payment_status !== 'pending') {
    return NextResponse.json(
      { error: 'Order has already been processed' },
      { status: 400 }
    );
  }

  // Fetch order items
  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', order_id);

  if (itemsError || !items || items.length === 0) {
    return NextResponse.json({ error: 'No items found for this order' }, { status: 400 });
  }

  // Re-verify stock availability
  for (const item of items) {
    if (!item.product_id) continue;

    const { data: product } = await supabase
      .from('products')
      .select('stock_quantity, name')
      .eq('id', item.product_id)
      .single();

    if (!product || product.stock_quantity < item.quantity) {
      return NextResponse.json(
        { error: `${product?.name || 'Product'} is no longer available` },
        { status: 400 }
      );
    }
  }

  // Build Stripe line items
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.product_name,
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  // Add delivery fee as separate line item
  if (order.delivery_fee > 0) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Delivery Fee',
        },
        unit_amount: order.delivery_fee,
      },
      quantity: 1,
    });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    metadata: {
      order_id: order.id,
    },
    customer_email: order.customer_email,
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout/canceled`,
  });

  // Store the Stripe session ID on the order
  await supabase
    .from('orders')
    .update({ stripe_session_id: session.id })
    .eq('id', order.id);

  return NextResponse.json({ url: session.url });
}
