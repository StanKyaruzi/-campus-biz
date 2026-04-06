import { NextResponse } from 'next/server';

let productsStore: any[] = [];

export async function GET() {
  return NextResponse.json(productsStore.filter(p => p.status === 'approved'));
}

export async function POST(request: Request) {
  try {
    const product = await request.json();
    const newProduct = {
      id: Date.now().toString(),
      ...product,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    productsStore.unshift(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}