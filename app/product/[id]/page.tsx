'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const found = products.find((p: any) => p.id === params.id);
    if (found && found.status === 'approved') {
      setProduct(found);
    } else {
      router.push('/products');
    }
    setLoading(false);
  }, [params.id, router]);

  if (!isMounted) return null;
  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center text-white">Product not found</div>;

  return (
    <div className="min-h-screen">
      <nav className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">🎓 Campus Biz</Link>
          <Link href="/products" className="text-gray-300 hover:text-white">← Back to Products</Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
          <div className="text-center mb-8">
            <div className="text-7xl mb-4">
              {product.image ? (
                <img src={product.image} alt={product.title} className="w-48 h-48 object-cover rounded-lg mx-auto" />
              ) : (
                '📦'
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.title}</h1>
            <p className="text-3xl font-bold text-blue-400">TSh {product.price.toLocaleString()}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-3">
              <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-gray-400">Category:</span><span>{product.category}</span></div>
              <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-gray-400">Condition:</span><span>{product.condition}</span></div>
              <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-gray-400">Location:</span><span>📍 {product.location}</span></div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-gray-400">Seller:</span><span>{product.sellerName}</span></div>
              <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-gray-400">WhatsApp/Phone:</span><span className="text-green-400">{product.phone}</span></div>
              <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-gray-400">Posted:</span><span>{new Date(product.createdAt).toLocaleDateString()}</span></div>
            </div>
          </div>

          <div className="mb-8"><h2 className="text-xl font-semibold text-white mb-3">Description</h2><p className="text-gray-300 leading-relaxed">{product.description}</p></div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${product.phone.replace(/\s/g, '')}`} target="_blank" className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-semibold text-center transition-all">📱 Contact on WhatsApp</a>
            <Link href="/products" className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-xl font-semibold text-center transition-all">← Browse More Items</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}