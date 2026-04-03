import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if DATABASE_URL exists
    const dbUrl = process.env.DATABASE_URL;
    
    if (!dbUrl) {
      return NextResponse.json({ 
        error: 'DATABASE_URL not set in environment variables',
        fix: 'Go to Vercel → Settings → Environment Variables → Add DATABASE_URL'
      }, { status: 500 });
    }
    
    // Parse the connection string
    const url = new URL(dbUrl);
    const host = url.hostname;
    const database = url.pathname.slice(1);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database URL is configured',
      host: host,
      database: database
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}