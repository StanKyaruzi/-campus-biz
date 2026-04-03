'use client';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', studentId: '', phone: ''
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (!formData.studentId) {
      setError('Student ID is required');
      setLoading(false);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find((u: any) => u.email === formData.email)) {
      setError('Email already registered');
      setLoading(false);
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      studentId: formData.studentId,
      phone: formData.phone,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    router.push('/login?registered=true');
    setLoading(false);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">📝</div>
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-gray-400 text-sm mt-2">Join the campus marketplace</p>
        </div>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name *" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="input-field" />
          <input type="email" placeholder="Email *" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="input-field" />
          <input type="text" placeholder="Student ID *" required value={formData.studentId} onChange={(e) => setFormData({...formData, studentId: e.target.value})} className="input-field" />
          <input type="tel" placeholder="WhatsApp / Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="input-field" />
          <input type="password" placeholder="Password (min 6 characters) *" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="input-field" />
          <input type="password" placeholder="Confirm Password *" required value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="input-field" />
          
          <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-semibold transition-all disabled:opacity-50">
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account? <Link href="/login" className="text-blue-400 hover:text-blue-300">Login here</Link>
        </p>
      </motion.div>
    </div>
  );
}