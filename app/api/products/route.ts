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
    
    // Remove image if it's too large (base64)
    const productToSave = { ...product };
    if (productToSave.image && productToSave.image.length > 50000) {
      delete productToSave.image; // Skip image if too large
    }
    
    const response = await fetch(`${supabaseUrl}/rest/v1/products`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productToSave)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Supabase error:', errorText);
      return NextResponse.json({ error: 'Failed to save to database' }, { status: 500 });
    }
    
    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}