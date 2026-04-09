export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import type { CreateShoeRequestPayload } from '@/types/database';

export async function POST(request: NextRequest) {
  const body: CreateShoeRequestPayload = await request.json();

  if (!body.customer_name || !body.customer_email || !body.shoe_name || !body.size) {
    return NextResponse.json(
      { error: 'Name, email, shoe name, and size are required' },
      { status: 400 }
    );
  }

  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from('shoe_requests')
    .insert({
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone || null,
      shoe_name: body.shoe_name,
      brand: body.brand || null,
      style_code: body.style_code || null,
      size: body.size,
      max_price: body.max_price ? Math.round(body.max_price * 100) : null,
      notes: body.notes || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ request: data }, { status: 201 });
}

export async function GET() {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from('shoe_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ requests: data });
}
