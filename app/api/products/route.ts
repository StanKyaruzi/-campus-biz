import { NextResponse } from 'next/server';

const supabaseUrl = 'https://ejdhpsepaadumcoqjdki.supabase.co';
const supabaseKey = 'sb_publishable_pw43WcZAdlmXcd2DG57OPQ_hcTOTj1B';

export async function GET() {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/products?select=*&status=eq.approved&order=created_at.desc`, {
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

export async function POST(request: Request) {
  try {
    const product = await request.json();
    
    const response = await fetch(`${supabaseUrl}/rest/v1/products`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        condition: product.condition,
        location: product.location,
        phone: product.phone,
        image: product.image,
        seller_name: product.seller_name,
        seller_email: product.seller_email,
        status: 'pending'
      })
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}