import { NextResponse } from 'next/server';
import { getProducts, addProduct } from '@/lib/data';

export async function GET() {
  const products = getProducts();
  const approved = products.filter((p: any) => p.status === 'approved');
  return NextResponse.json(approved);
}

export async function POST(request: Request) {
  try {
    const product = await request.json();
    const newProduct = addProduct(product);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}