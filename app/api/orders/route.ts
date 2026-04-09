export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import type { CreateOrderPayload } from '@/types/database';

export async function POST(request: NextRequest) {
  const body: CreateOrderPayload = await request.json();

  // Validate required fields
  if (!body.customer_name || !body.customer_email || !body.fulfillment_method) {
    return NextResponse.json(
      { error: 'customer_name, customer_email, and fulfillment_method are required' },
      { status: 400 }
    );
  }

  if (!body.items || body.items.length === 0) {
    return NextResponse.json(
      { error: 'At least one item is required' },
      { status: 400 }
    );
  }

  // Validate delivery address if delivery
  if (body.fulfillment_method === 'delivery') {
    if (!body.delivery_address_line1 || !body.delivery_city || !body.delivery_state || !body.delivery_zip) {
      return NextResponse.json(
        { error: 'Delivery address is required for delivery orders' },
        { status: 400 }
      );
    }
  }

  const supabase = createServiceRoleClient();

  // Fetch all products for the order items and verify availability
  const productIds = body.items.map(item => item.product_id);
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('*')
    .in('id', productIds)
    .eq('is_active', true);

  if (productsError) {
    return NextResponse.json({ error: productsError.message }, { status: 500 });
  }

  if (!products || products.length !== productIds.length) {
    return NextResponse.json(
      { error: 'One or more products not found or inactive' },
      { status: 400 }
    );
  }

  // Verify stock for each item
  for (const item of body.items) {
    const product = products.find(p => p.id === item.product_id);
    if (!product) {
      return NextResponse.json(
        { error: `Product ${item.product_id} not found` },
        { status: 400 }
      );
    }
    if (product.stock_quantity < item.quantity) {
      return NextResponse.json(
        { error: `${product.name} is sold out` },
        { status: 400 }
      );
    }
  }

  // Calculate totals
  let subtotal = 0;
  const orderItems = body.items.map(item => {
    const product = products.find(p => p.id === item.product_id)!;
    subtotal += product.price * item.quantity;
    return {
      product_id: product.id,
      product_name: product.name,
      size: product.size,
      price: product.price,
      quantity: item.quantity,
    };
  });

  // Delivery fee: use the max delivery_fee among items if delivery
  let deliveryFee = 0;
  if (body.fulfillment_method === 'delivery') {
    deliveryFee = Math.max(
      ...body.items.map(item => {
        const product = products.find(p => p.id === item.product_id)!;
        return product.delivery_fee;
      })
    );
  }

  const total = subtotal + deliveryFee;

  // Create the order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone || null,
      fulfillment_method: body.fulfillment_method,
      pickup_time_preference: body.pickup_time_preference || null,
      delivery_address_line1: body.delivery_address_line1 || null,
      delivery_address_line2: body.delivery_address_line2 || null,
      delivery_city: body.delivery_city || null,
      delivery_state: body.delivery_state || null,
      delivery_zip: body.delivery_zip || null,
      order_notes: body.order_notes || null,
      subtotal,
      delivery_fee: deliveryFee,
      total,
    })
    .select()
    .single();

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 });
  }

  // Create order items
  const itemsWithOrderId = orderItems.map(item => ({
    ...item,
    order_id: order.id,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(itemsWithOrderId);

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  return NextResponse.json({ order }, { status: 201 });
}
