export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { getStripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const stripe = getStripe();
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata?.order_id;

    if (!orderId) {
      console.error('No order_id in session metadata:', session.id);
      return NextResponse.json({ received: true });
    }

    const supabase = createServiceRoleClient();

    // Idempotency check: skip if already processed
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('payment_status')
      .eq('id', orderId)
      .single();

    if (existingOrder?.payment_status === 'paid') {
      return NextResponse.json({ received: true });
    }

    // Update order status
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        order_status: 'confirmed',
        stripe_session_id: session.id,
      })
      .eq('id', orderId);

    if (updateError) {
      console.error('Failed to update order:', updateError);
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }

    // Fetch order items and decrement stock
    const { data: orderItems } = await supabase
      .from('order_items')
      .select('product_id, quantity')
      .eq('order_id', orderId);

    if (orderItems) {
      for (const item of orderItems) {
        if (!item.product_id) continue;

        const { error: stockError } = await supabase.rpc('decrement_stock', {
          p_product_id: item.product_id,
          p_quantity: item.quantity,
        });

        if (stockError) {
          // Log but don't fail — payment already succeeded.
          // Flag for manual review.
          console.error(
            `Stock decrement failed for product ${item.product_id}:`,
            stockError.message
          );
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
