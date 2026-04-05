import { NextResponse } from 'next/server';

const supabaseUrl = 'https://ejdhpsepaadumcoqjdki.supabase.co';
const supabaseKey = 'sb_publishable_pw43WcZAdlmXcd2DG57OPQ_hcTOTj1B';

export async function GET() {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/products?select=*&order=created_at.desc`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    const products = await response.json();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { productId, status } = await request.json();
    
    const response = await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${productId}`, {
      method: 'PATCH',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');
    
    await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${productId}`, {
      method: 'DELETE',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}