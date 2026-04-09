export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/auth/admin';
import { generateSlug } from '@/lib/utils';
import type { CreateProductPayload } from '@/types/database';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  // Filters
  const brand = searchParams.get('brand');
  if (brand) query = query.eq('brand', brand);

  const category = searchParams.get('category');
  if (category) query = query.eq('category', category);

  const gender = searchParams.get('gender');
  if (gender) query = query.eq('gender', gender);

  const featured = searchParams.get('featured');
  if (featured === 'true') query = query.eq('is_featured', true);

  // By default, only show active products for public queries
  const showAll = searchParams.get('all');
  if (showAll !== 'true') {
    query = query.eq('is_active', true);
  }

  // Pagination
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '50');
  const from = (page - 1) * limit;
  query = query.range(from, from + limit - 1);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ products: data, page, limit });
}

export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: CreateProductPayload = await request.json();

  if (!body.name || !body.size || !body.price) {
    return NextResponse.json(
      { error: 'name, size, and price are required' },
      { status: 400 }
    );
  }

  const supabase = createServiceRoleClient();

  const slug = body.slug || generateSlug(`${body.name}-${body.size}`);

  const { data, error } = await supabase
    .from('products')
    .insert({
      name: body.name,
      slug,
      brand: body.brand || null,
      model: body.model || null,
      colorway: body.colorway || null,
      gender: body.gender || null,
      category: body.category || null,
      size: body.size,
      condition: body.condition || 'new',
      price: body.price,
      compare_at_price: body.compare_at_price || null,
      sku: body.sku || null,
      stock_quantity: body.stock_quantity ?? 1,
      is_active: body.is_active ?? true,
      is_featured: body.is_featured ?? false,
      pickup_available: body.pickup_available ?? true,
      delivery_available: body.delivery_available ?? true,
      delivery_fee: body.delivery_fee ?? 0,
      description: body.description || null,
      authenticity_notes: body.authenticity_notes || null,
      image_urls: body.image_urls || [],
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ product: data }, { status: 201 });
}
