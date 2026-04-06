import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const product = await request.json();
    console.log('Received product:', product);
    
    // Simple success response for testing
    return NextResponse.json({ 
      success: true, 
      message: 'Product received',
      product: product 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json([{ id: 1, title: 'Sample Product' }]);
}