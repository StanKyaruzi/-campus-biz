export const dynamic = 'force-dynamic';
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
    
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const all = JSON.parse(storedProducts);
      setProducts(all.filter((p: any) => p.status === 'approved').slice(0, 6));
    }
  }, []);

  const categories = [
    { name: 'Electronics', icon: '📱', link: '/products?category=electronics' },
    { name: 'Clothing', icon: '👕', link: '/products?category=clothing' },
    { name: 'Books', icon: '📚', link: '/products?category=books' },
    { name: 'Furniture', icon: '🪑', link: '/products?category=furniture' },
    { name: 'Sports', icon: '⚽', link: '/products?category=sports' },
    { name: 'Vehicles', icon: '🚗', link: '/products?category=vehicles' },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-xl z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-wrap gap-4">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🎓 Campus Biz
          </Link>
          
          <div className="flex gap-6 items-center">
            <Link href="/products" className="text-gray-300 hover:text-white">Browse</Link>
            <Link href="/sell" className="text-gray-300 hover:text-white">Sell</Link>
            
            {user && (
              <Link href="/my-items" className="text-gray-300 hover:text-white">My Items</Link>
            )}
            
            {user ? (
              <div className="flex gap-3 items-center">
                <span className="text-blue-400">👤 {user.name}</span>
                {user.role === 'admin' && <Link href="/admin" className="px-3 py-1 bg-red-600 rounded-full text-xs">Admin</Link>}
                <button onClick={() => { localStorage.removeItem('user'); window.location.href = '/'; }} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm">Logout</button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-sm">Login</Link>
                <Link href="/register" className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm">Register</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Campus Biz
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-gray-300 mb-8">
            Buy & Sell Everything on Campus
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex gap-4 justify-center">
            <Link href="/products" className="btn-primary">Browse Items</Link>
            <Link href="/sell" className="btn-secondary">Start Selling</Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <Link key={cat.name} href={cat.link}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="card p-6 text-center">
                  <div className="text-4xl mb-2">{cat.icon}</div>
                  <div className="text-white">{cat.name}</div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Items */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Latest Items</h2>
          {products.length === 0 ? (
            <p className="text-center text-gray-400">No items yet. Be the first to sell!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div className="card p-5 hover:transform hover:-translate-y-2 transition-all">
                    <div className="text-5xl mb-3">📦</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{product.title}</h3>
                    <p className="text-2xl font-bold text-blue-400">TSh {product.price.toLocaleString()}</p>
                    <div className="flex justify-between text-gray-400 text-sm mt-2">
                      <span>📍 {product.location}</span>
                      <span>📞 {product.phone}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-white/10 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">🎓 Campus Biz</h3>
              <p className="text-gray-400 text-sm">Student marketplace where buyers and sellers connect safely.</p>
              <div className="flex gap-4 mt-4">
                <a href="https://instagram.com/amaniglobalofficial" target="_blank" className="text-gray-400 hover:text-pink-500 text-2xl">📷</a>
                <a href="https://tiktok.com/@amani_globall" target="_blank" className="text-gray-400 hover:text-white text-2xl">🎵</a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/products" className="text-gray-400 hover:text-blue-400">Browse Items</Link></li>
                <li><Link href="/sell" className="text-gray-400 hover:text-blue-400">Sell an Item</Link></li>
                <li><Link href="/my-items" className="text-gray-400 hover:text-blue-400">My Items</Link></li>
                <li><Link href="/register" className="text-gray-400 hover:text-blue-400">Create Account</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-blue-400">Login</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact & Support</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-400">📧 <a href="mailto:stankyaruzi@gmail.com" className="hover:text-blue-400">stankyaruzi@gmail.com</a></li>
                <li className="text-gray-400">📞 <a href="tel:+255775123741" className="hover:text-blue-400">0775 123 741</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Need Help?</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/faq" className="text-gray-400 hover:text-blue-400">📖 FAQ</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-blue-400">📜 Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-gray-500 text-sm">© 2026 Campus Biz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}