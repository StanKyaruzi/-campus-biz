export const dynamic = 'force-dynamic';
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MyItemsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [myProducts, setMyProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    location: '',
    phone: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const myItems = allProducts.filter((p: any) => p.sellerId === parsedUser.email);
    setMyProducts(myItems);
  }, [router]);

  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
      const updated = allProducts.filter((p: any) => p.id !== productId);
      localStorage.setItem('products', JSON.stringify(updated));
      setMyProducts(myProducts.filter(p => p.id !== productId));
      alert('Item deleted successfully!');
    }
  };

  const startEdit = (product: any) => {
    setEditingProduct(product);
    setEditForm({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      condition: product.condition,
      location: product.location,
      phone: product.phone
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const updated = allProducts.map((p: any) => 
      p.id === editingProduct.id 
        ? { ...p, ...editForm, price: Number(editForm.price), status: 'pending' }
        : p
    );
    localStorage.setItem('products', JSON.stringify(updated));
    
    setMyProducts(myProducts.map(p => 
      p.id === editingProduct.id 
        ? { ...p, ...editForm, price: Number(editForm.price), status: 'pending' }
        : p
    ));
    
    setEditingProduct(null);
    alert('Item updated! Pending admin approval.');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
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

        {myProducts.length === 0 ? (
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
                        <p className="text-2xl font-bold text-blue-400">TSh {product.price.toLocaleString()}</p>
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
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(product)} className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm transition">✏️ Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition">🗑️ Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-white/10 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© 2026 Campus Biz. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="mailto:stankyaruzi@gmail.com" className="text-gray-500 text-xs hover:text-blue-400">Contact Support</a>
            <Link href="/" className="text-gray-500 text-xs hover:text-white">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}