import { NextResponse } from 'next/server';

// Simple in-memory storage
let products: any[] = [];

export async function GET() {
  return NextResponse.json(products.filter(p => p.status === 'approved'));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct = {
      id: Date.now().toString(),
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    products.unshift(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}