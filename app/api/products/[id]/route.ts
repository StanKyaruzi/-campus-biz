import { NextResponse } from 'next/server';
import { getProducts, updateProduct, deleteProduct } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const products = getProducts();
  const product = products.find((p: any) => p.id === id);
  return NextResponse.json(product || null);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updates = await request.json();
  updateProduct(id, updates);
  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  deleteProduct(id);
  return NextResponse.json({ success: true });
}