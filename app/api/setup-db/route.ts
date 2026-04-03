import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        student_id TEXT,
        phone TEXT,
        role TEXT DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    // Create products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        price INTEGER,
        category TEXT,
        condition TEXT,
        location TEXT,
        image TEXT,
        phone TEXT,
        seller_name TEXT,
        seller_email TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    return NextResponse.json({ success: true, message: 'Database tables created!' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}