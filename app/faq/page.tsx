import Link from 'next/link';

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <nav className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">🎓 Campus Biz</Link>
          <Link href="/" className="text-gray-300 hover:text-white">← Back to Home</Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-white text-center mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-400 text-center mb-12">Find answers to common questions about Campus Biz</p>
        
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-white mb-2">How do I create an account?</h3>
            <p className="text-gray-400">Click on 'Register' in the top menu. Fill in your name, email, student ID, and create a password.</p>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-semibold text-white mb-2">How do I sell an item?</h3>
            <p className="text-gray-400">Login to your account, click 'Sell', fill in item details, and submit for admin approval.</p>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-semibold text-white mb-2">How do I contact a seller?</h3>
            <p className="text-gray-400">Each product listing shows the seller's WhatsApp number. Click 'Contact on WhatsApp' to message them.</p>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-semibold text-white mb-2">Is selling free?</h3>
            <p className="text-gray-400">Yes! Selling is currently FREE.</p>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-semibold text-white mb-2">How do I report a scam?</h3>
            <p className="text-gray-400">Email stankyaruzi@gmail.com with details of the suspicious activity.</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">Still have questions?</p>
          <a href="mailto:stankyaruzi@gmail.com" className="text-blue-400 hover:text-blue-300 mt-2 inline-block">📧 Contact Support</a>
        </div>
      </div>

      <footer className="bg-black/80 border-t border-white/10 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© 2026 Campus Biz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}