'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'admin') {
      router.push('/');
      return;
    }
    setUser(parsedUser);
    loadData();
  }, [router]);

  const loadData = async () => {
    const res = await fetch('/api/admin/products');
    const data = await res.json();
    setProducts(data);
    
    const usersRes = await fetch('/api/admin/users');
    if (usersRes.ok) {
      const usersData = await usersRes.json();
      setUsers(usersData);
    }
  };

  const approveProduct = async (id: string) => {
    await fetch('/api/admin/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id, status: 'approved' })
    });
    loadData();
  };

  const rejectProduct = async (id: string) => {
    await fetch('/api/admin/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id, status: 'rejected' })
    });
    loadData();
  };

  const deleteProduct = async (id: string) => {
    if (confirm('Delete this product?')) {
      await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      loadData();
    }
  };

  const pendingProducts = products.filter(p => p.status === 'pending');
  const approvedProducts = products.filter(p => p.status === 'approved');

  if (!user) return null;

  return (
    <div className="min-h-screen">
      <nav className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">⚡ Admin Panel</div>
          <div className="flex gap-4">
            <button onClick={() => setActiveTab('products')} className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'products' ? 'bg-blue-600' : 'bg-gray-700'}`}>Products</button>
            <button onClick={() => setActiveTab('users')} className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'users' ? 'bg-blue-600' : 'bg-gray-700'}`}>Users</button>
            <Link href="/" className="text-gray-300 hover:text-white">View Site</Link>
            <button onClick={() => { localStorage.removeItem('user'); router.push('/login'); }} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 text-center"><div className="text-4xl mb-2">📦</div><div className="text-2xl font-bold text-white">{products.length}</div><div className="text-gray-400">Total Products</div></div>
          <div className="card p-6 text-center"><div className="text-4xl mb-2">⏳</div><div className="text-2xl font-bold text-yellow-400">{pendingProducts.length}</div><div className="text-gray-400">Pending Review</div></div>
          <div className="card p-6 text-center"><div className="text-4xl mb-2">👥</div><div className="text-2xl font-bold text-white">{users.length}</div><div className="text-gray-400">Total Users</div></div>
        </div>

        {activeTab === 'products' && (
          <>
            {pendingProducts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">Pending Approval ({pendingProducts.length})</h2>
                {pendingProducts.map((product) => (
                  <div key={product.id} className="card p-5 mb-4">
                    <div className="flex flex-wrap gap-4 justify-between items-start">
                      <div className="flex-1">
                        {product.image && <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded-lg mb-2" />}
                        <h3 className="text-xl font-semibold text-white">{product.title}</h3>
                        <p className="text-gray-400 text-sm">TSh {product.price?.toLocaleString()} | {product.category} | {product.location}</p>
                        <p className="text-gray-500 text-sm">Seller: {product.seller_name} | 📞 {product.phone}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => approveProduct(product.id)} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm">Approve</button>
                        <button onClick={() => rejectProduct(product.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm">Reject</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">All Products ({approvedProducts.length})</h2>
              {approvedProducts.map((product) => (
                <div key={product.id} className="card p-5 mb-4">
                  <div className="flex flex-wrap gap-4 justify-between items-center">
                    <div className="flex-1">
                      {product.image && <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded-lg inline-block mr-3" />}
                      <span className="text-white">{product.title}</span>
                      <span className="text-gray-400 text-sm ml-3">TSh {product.price?.toLocaleString()}</span>
                    </div>
                    <button onClick={() => deleteProduct(product.id)} className="px-4 py-2 bg-red-600/50 hover:bg-red-600 rounded-lg text-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4">
            {users.map((u) => (
              <div key={u.id} className="card p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-semibold">{u.name}</h3>
                    <p className="text-gray-400 text-sm">{u.email}</p>
                    <p className="text-gray-500 text-xs">Student ID: {u.studentId || 'N/A'} | Phone: {u.phone || 'N/A'}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${u.role === 'admin' ? 'bg-red-600' : 'bg-blue-600'}`}>{u.role}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}