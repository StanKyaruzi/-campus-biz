import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
  try {
    const { email, name, password, studentId, phone } = await request.json();
    const sql = neon(process.env.DATABASE_URL!);
    
    // Check if user exists
    const existing = await sql`SELECT * FROM users WHERE email = ${email}`;
    
    if (existing.length === 0) {
      // Create new admin user
      await sql`
        INSERT INTO users (email, name, password, student_id, phone, role)
        VALUES (${email}, ${name}, ${password}, ${studentId}, ${phone}, 'admin')
      `;
      return NextResponse.json({ success: true, message: 'Admin created in database!' });
    } else {
      // Update existing to admin
      await sql`UPDATE users SET role = 'admin' WHERE email = ${email}`;
      return NextResponse.json({ success: true, message: 'User updated to admin in database!' });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}