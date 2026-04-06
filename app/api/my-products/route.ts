import { NextResponse } from 'next/server';

let productsStore: any[] = [];

export async function POST(request: Request) {
  try {
    const { seller_email } = await request.json();
    const products = productsStore.filter(p => p.seller_email === seller_email);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json([]);
  }
}