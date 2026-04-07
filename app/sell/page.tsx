'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { uploadImage, isValidImage } from '@/lib/cloudinary';

export default function SellPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', category: 'Electronics', condition: 'Good', location: '', phone: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const categories = ['Electronics', 'Clothing', 'Books', 'Furniture', 'Sports', 'Vehicles'];
  const conditions = ['New', 'Like New', 'Good', 'Fair'];

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!isValidImage(file)) {
        setError('Please upload a valid image file');
        return;
      }
      setImageFile(file);
      const preview = await uploadImage(file);
      setImagePreview(preview);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!user) return;
    if (!formData.location.trim()) {
      setError('Please enter your location');
      setLoading(false);
      return;
    }

    let imageUrl = '';
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const productData = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      condition: formData.condition,
      location: formData.location,
      phone: formData.phone,
      image: imageUrl,
      seller_name: user.name,
      seller_email: user.email,
      status: 'pending'
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (res.ok) {
        setSuccess('Item posted! Pending admin approval.');
        setFormData({ title: '', description: '', price: '', category: 'Electronics', condition: 'Good', location: '', phone: '' });
        setImagePreview(null);
        setImageFile(null);
      } else {
        const err = await res.json();
        setError(err.error || 'Failed to post item');
      }
    } catch (err) {
      setError('Something went wrong');
    }
    setLoading(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-8">Sell an Item</h1>
          
          {error && <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-xl mb-6 text-center">{error}</div>}
          {success && <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded-xl mb-6 text-center">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Product Image</label>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center hover:border-blue-500 transition cursor-pointer">
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                    <button type="button" onClick={() => { setImagePreview(null); setImageFile(null); }} className="absolute top-2 right-2 bg-red-600 rounded-full w-6 h-6 text-white text-sm">×</button>
                  </div>
                ) : (
                  <label className="cursor-pointer block py-8">
                    <div className="text-4xl mb-2">📷</div>
                    <p className="text-gray-400">Click to upload product photo</p>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            <input type="text" placeholder="Item Title *" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="input-field" />
            <textarea placeholder="Description *" rows={4} required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="input-field" />
            
            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Price (TSh) *" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="input-field" />
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="input-field">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <select value={formData.condition} onChange={(e) => setFormData({...formData, condition: e.target.value})} className="input-field">
                {conditions.map(c => <option key={c}>{c}</option>)}
              </select>
              <input type="text" placeholder="Location *" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="input-field" />
            </div>

            <input type="tel" placeholder="WhatsApp / Phone Number *" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="input-field" />

            <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-all">
              {loading ? 'Posting...' : 'Post Item'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}