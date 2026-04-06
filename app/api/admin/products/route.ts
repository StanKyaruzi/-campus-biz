import { NextResponse } from 'next/server';
import { getProducts, updateProduct, deleteProduct } from '@/lib/data';

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function PUT(request: Request) {
  try {
    const { productId, status } = await request.json();
    updateProduct(productId, { status });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');
    if (productId) deleteProduct(productId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}