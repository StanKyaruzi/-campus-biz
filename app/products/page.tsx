'use client';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProductsPage() {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
    
    // Load products from Supabase API
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading products:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let results = products;
    if (search) results = results.filter(p => p.title?.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'all') results = results.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    setFiltered(results);
  }, [search, category, products]);

  const categories = ['all', 'Electronics', 'Clothing', 'Books', 'Furniture', 'Sports', 'Vehicles'];

  if (!isMounted) return null;

  return (
    <div className="min-h-screen">
      <nav className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-wrap gap-4">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">🎓 Campus Biz</Link>
          <div className="flex gap-4 items-center">
            <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
            <Link href="/sell" className="text-gray-300 hover:text-white">Sell</Link>
            {user && <Link href="/my-items" className="text-gray-300 hover:text-white">My Items</Link>}
            {user ? (
              <button onClick={() => { localStorage.removeItem('user'); window.location.href = '/'; }} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm">Logout</button>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">Login</Link>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">All Items</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <input type="text" placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field flex-1" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field w-full md:w-40">
            {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20"><p className="text-gray-400">No items found.</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -10 }} className="card overflow-hidden cursor-pointer">
                  <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-7xl">
                    {product.image ? (
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                      '📦'
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-white mb-2">{product.title}</h3>
                    <p className="text-2xl font-bold text-blue-400 mb-3">TSh {product.price?.toLocaleString()}</p>
                    <div className="flex justify-between items-center text-gray-400 text-sm">
                      <span>📍 {product.location}</span>
                      <span>📞 {product.phone}</span>
                    </div>
                    <div className="mt-2 text-gray-500 text-xs">Seller: {product.seller_name}</div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <footer className="bg-black/80 border-t border-white/10 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© 2026 Campus Biz. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="mailto:stankyaruzi@gmail.com?subject=Report%20Scam" className="text-gray-500 text-xs hover:text-red-400">🚨 Report Scam</a>
            <a href="mailto:stankyaruzi@gmail.com?subject=Feedback" className="text-gray-500 text-xs hover:text-blue-400">💡 Feedback</a>
            <Link href="/" className="text-gray-500 text-xs hover:text-white">🏠 Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}