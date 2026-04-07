'use client';

import { useState } from 'react';

export default function SetupAdmin() {
  const [result, setResult] = useState<any>(null);

  const setupAdmin = async () => {
    const res = await fetch('/api/setup-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@campusbiz.com',
        name: 'Super Admin',
        password: 'Stan@3101',
        studentId: 'ADMIN001',
        phone: '0775123741'
      })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white/10 p-8 rounded-2xl text-center">
        <h1 className="text-white text-2xl mb-4">Admin Setup</h1>
        <button onClick={setupAdmin} className="px-6 py-3 bg-blue-600 rounded-xl text-white">
          Make me Admin
        </button>
        {result && (
          <pre className="text-white mt-4 text-left">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
