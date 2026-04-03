'use client';
export const dynamic = 'force-dynamic';

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

  const loadData = () => {
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setProducts(allProducts);
    setUsers(allUsers);
  };

  // Product functions
  const approveProduct = (id: string) => {
    const updated = products.map(p => p.id === id ? { ...p, status: 'approved' } : p);
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
  };

  const rejectProduct = (id: string) => {
    const updated = products.map(p => p.id === id ? { ...p, status: 'rejected' } : p);
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
  };

  const deleteProduct = (id: string) => {
    if (confirm('Delete this product?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem('products', JSON.stringify(updated));
    }
  };

  // User functions - DELETE MEMBERS
  const deleteUser = (userId: string, userEmail: string) => {
    // Don't allow deleting yourself
    if (user?.email === userEmail) {
      alert('You cannot delete your own admin account!');
      return;
    }

    if (confirm(`Delete user: ${userEmail}? This will also delete ALL their products.`)) {
      // Delete user
      const updatedUsers = users.filter(u => u.email !== userEmail);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Delete all products by this user
      const updatedProducts = products.filter(p => p.sellerId !== userEmail);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      alert(`User ${userEmail} deleted successfully!`);
    }
  };

  const pendingProducts = products.filter(p => p.status === 'pending');
  const approvedProducts = products.filter(p => p.status === 'approved');

  if (!user) return null;

  return (
    <div className="min-h-screen">
      {/* Admin Navigation */}
      <nav className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-wrap gap-4">
          <div className="text-xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            ⚡ Admin Panel
          </div>
          <div className="flex gap-4 items-center flex-wrap">
            <span className="text-gray-300">👑 {user.name}</span>
            <button onClick={() => setActiveTab('products')} className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'products' ? 'bg-blue-600' : 'bg-gray-700'}`}>📦 Products</button>
            <button onClick={() => setActiveTab('users')} className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'users' ? 'bg-blue-600' : 'bg-gray-700'}`}>👥 Users</button>
            <Link href="/" className="text-gray-300 hover:text-white text-sm">View Site</Link>
            <button onClick={() => { localStorage.removeItem('user'); router.push('/login'); }} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 text-center"><div className="text-4xl mb-2">📦</div><div className="text-2xl font-bold text-white">{products.length}</div><div className="text-gray-400">Total Products</div></div>
          <div className="card p-6 text-center"><div className="text-4xl mb-2">⏳</div><div className="text-2xl font-bold text-yellow-400">{pendingProducts.length}</div><div className="text-gray-400">Pending Review</div></div>
          <div className="card p-6 text-center"><div className="text-4xl mb-2">👥</div><div className="text-2xl font-bold text-white">{users.length}</div><div className="text-gray-400">Total Users</div></div>
          <div className="card p-6 text-center"><div className="text-4xl mb-2">👑</div><div className="text-2xl font-bold text-green-400">{users.filter(u => u.role === 'admin').length}</div><div className="text-gray-400">Admins</div></div>
        </div>

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <>
            {/* Pending Products */}
            {pendingProducts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">⏳ Pending Approval ({pendingProducts.length})</h2>
                <div className="space-y-4">
                  {pendingProducts.map((product) => (
                    <div key={product.id} className="card p-5">
                      <div className="flex flex-wrap gap-4 justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">{product.title}</h3>
                          <p className="text-gray-400 text-sm mb-2">{product.description?.substring(0, 100)}...</p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <span className="text-blue-400">TSh {product.price?.toLocaleString()}</span>
                            <span className="text-gray-500">📂 {product.category}</span>
                            <span className="text-gray-500">📍 {product.location}</span>
                            <span className="text-gray-500">👤 {product.sellerName}</span>
                            <span className="text-green-400">📞 {product.phone}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => approveProduct(product.id)} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm">✓ Approve</button>
                          <button onClick={() => rejectProduct(product.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm">✗ Reject</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Approved Products */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">📦 All Products ({approvedProducts.length})</h2>
              <div className="space-y-4">
                {approvedProducts.length === 0 && pendingProducts.length === 0 ? (
                  <div className="text-center text-gray-400 py-12">No products yet</div>
                ) : (
                  approvedProducts.map((product) => (
                    <div key={product.id} className="card p-5">
                      <div className="flex flex-wrap gap-4 justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">{product.title}</h3>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <span className="text-blue-400">TSh {product.price?.toLocaleString()}</span>
                            <span className="text-gray-500">📂 {product.category}</span>
                            <span className="text-gray-500">📍 {product.location}</span>
                            <span className="text-gray-500">👤 {product.sellerName}</span>
                          </div>
                        </div>
                        <button onClick={() => deleteProduct(product.id)} className="px-4 py-2 bg-red-600/50 hover:bg-red-600 rounded-lg text-sm">Delete</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {/* USERS TAB - DELETE MEMBERS */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">👥 All Users ({users.length})</h2>
            <div className="space-y-4">
              {users.length === 0 ? (
                <div className="text-center text-gray-400 py-12">No users yet</div>
              ) : (
                users.map((u) => (
                  <div key={u.email} className="card p-5">
                    <div className="flex flex-wrap gap-4 justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-xl font-semibold text-white">{u.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${u.role === 'admin' ? 'bg-red-600' : 'bg-blue-600'}`}>
                            {u.role === 'admin' ? '👑 Admin' : '👤 User'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-2">
                          <span>📧 {u.email}</span>
                          <span>🎓 {u.studentId || 'No ID'}</span>
                          <span>📞 {u.phone || 'No phone'}</span>
                          <span>📅 Joined: {new Date(u.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Products listed: {products.filter(p => p.sellerId === u.email).length}
                        </div>
                      </div>
                      {u.role !== 'admin' && (
                        <button 
                          onClick={() => deleteUser(u.id, u.email)} 
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition"
                        >
                          🗑️ Delete User
                        </button>
                      )}
                      {u.role === 'admin' && u.email === user.email && (
                        <span className="text-yellow-400 text-sm">(You - cannot delete yourself)</span>
                      )}
                      {u.role === 'admin' && u.email !== user.email && (
                        <button 
                          onClick={() => deleteUser(u.id, u.email)} 
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition"
                        >
                          🗑️ Delete Admin
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* User Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-4">
                <h3 className="text-lg font-semibold text-white mb-2">📊 User Statistics</h3>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-400">👥 Total Users: <span className="text-white">{users.length}</span></p>
                  <p className="text-gray-400">👑 Admins: <span className="text-white">{users.filter(u => u.role === 'admin').length}</span></p>
                  <p className="text-gray-400">👤 Regular Users: <span className="text-white">{users.filter(u => u.role !== 'admin').length}</span></p>
                  <p className="text-gray-400">📦 Products listed: <span className="text-white">{products.length}</span></p>
                </div>
              </div>
              <div className="card p-4">
                <h3 className="text-lg font-semibold text-white mb-2">⚠️ Delete User Warning</h3>
                <p className="text-gray-400 text-sm">When you delete a user:</p>
                <ul className="text-gray-400 text-sm list-disc list-inside mt-1">
                  <li>All their products are deleted</li>
                  <li>Their account is permanently removed</li>
                  <li>This action cannot be undone</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}