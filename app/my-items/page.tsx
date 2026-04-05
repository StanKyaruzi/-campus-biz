'use client';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MyItemsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [myProducts, setMyProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    title: '', description: '', price: '', category: '', condition: '', location: '', phone: ''
  });

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    
    // Load user's products from Supabase
    fetch('/api/my-products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seller_email: parsedUser.email })
    })
      .then(res => res.json())
      .then(data => {
        setMyProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [router]);

  const handleDelete = async (productId: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await fetch(`/api/products/${productId}`, {
          method: 'DELETE'
        });
        setMyProducts(myProducts.filter(p => p.id !== productId));
        alert('Item deleted successfully!');
      } catch (err) {
        alert('Failed to delete item');
      }
    }
  };

  const startEdit = (product: any) => {
    setEditingProduct(product);
    setEditForm({
      title: product.title,
      description: product.description || '',
      price: product.price.toString(),
      category: product.category,
      condition: product.condition,
      location: product.location,
      phone: product.phone
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editForm.title,
          description: editForm.description,
          price: Number(editForm.price),
          category: editForm.category,
          condition: editForm.condition,
          location: editForm.location,
          phone: editForm.phone,
          status: 'pending'
        })
      });
      
      // Update local state
      setMyProducts(myProducts.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...editForm, price: Number(editForm.price), status: 'pending' }
          : p
      ));
      
      setEditingProduct(null);
      alert('Item updated! Pending admin approval.');
    } catch (err) {
      alert('Failed to update item');
    }
  };

  if (!isMounted) return null;
  if (!user) return null;

  return (
    <div className="min-h-screen">
      <nav className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-wrap gap-4">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">🎓 Campus Biz</Link>
          <div className="flex gap-4 items-center">
            <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
            <Link href="/products" className="text-gray-300 hover:text-white">Browse</Link>
            <Link href="/sell" className="text-gray-300 hover:text-white">Sell</Link>
            <button onClick={() => { localStorage.removeItem('user'); router.push('/'); }} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">My Items</h1>

        {/* Edit Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Edit Item</h2>
                <button onClick={() => setEditingProduct(null)} className="text-gray-400 hover:text-white text-2xl">×</button>
              </div>
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <input type="text" placeholder="Title" required value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} className="input-field" />
                <textarea placeholder="Description" rows={3} required value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} className="input-field" />
                <input type="number" placeholder="Price (TSh)" required value={editForm.price} onChange={(e) => setEditForm({...editForm, price: e.target.value})} className="input-field" />
                <select value={editForm.category} onChange={(e) => setEditForm({...editForm, category: e.target.value})} className="input-field">
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Sports">Sports</option>
                  <option value="Vehicles">Vehicles</option>
                </select>
                <select value={editForm.condition} onChange={(e) => setEditForm({...editForm, condition: e.target.value})} className="input-field">
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
                <input type="text" placeholder="Location" required value={editForm.location} onChange={(e) => setEditForm({...editForm, location: e.target.value})} className="input-field" />
                <input type="tel" placeholder="Phone Number" required value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} className="input-field" />
                <div className="flex gap-3 mt-4">
                  <button type="submit" className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">Save Changes</button>
                  <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading...</div>
        ) : myProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-400 text-lg">You haven't posted any items yet.</p>
            <Link href="/sell" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">→ Sell your first item</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {myProducts.map((product) => (
              <div key={product.id} className="card p-5">
                <div className="flex flex-wrap gap-4 justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 flex-wrap">
                      {product.image ? (
                        <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded-lg" />
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center text-3xl">📦</div>
                      )}
                      <div>
                        <h3 className="text-xl font-semibold text-white">{product.title}</h3>
                        <p className="text-2xl font-bold text-blue-400">TSh {product.price?.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3 text-sm">
                      <span className="text-gray-400">📂 {product.category}</span>
                      <span className="text-gray-400">📍 {product.location}</span>
                      <span className="text-gray-400">📞 {product.phone}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        product.status === 'approved' ? 'bg-green-600' : 
                        product.status === 'pending' ? 'bg-yellow-600' : 'bg-red-600'
                      }`}>
                        {product.status || 'pending'}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">{product.description?.substring(0, 100)}...</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(product)} className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm">✏️ Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm">🗑️ Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}