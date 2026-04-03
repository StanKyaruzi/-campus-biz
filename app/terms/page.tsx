export const dynamic = 'force-dynamic';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <nav className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">🎓 Campus Biz</Link>
          <Link href="/" className="text-gray-300 hover:text-white">← Back to Home</Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-white text-center mb-4">Terms of Service</h1>
        <p className="text-gray-400 text-center mb-12">Last updated: 2026</p>
        
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-2">1. Acceptance of Terms</h2>
            <p className="text-gray-400">By using Campus Biz, you agree to these Terms of Service.</p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-2">2. Eligibility</h2>
            <p className="text-gray-400">You must be a currently enrolled student with a valid student ID to use Campus Biz.</p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-2">3. Prohibited Items</h2>
            <p className="text-gray-400">No illegal items, weapons, drugs, counterfeit goods, or items violating campus policies.</p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-2">4. Transaction Safety</h2>
            <p className="text-gray-400">Always meet in public places on campus. Inspect items before paying. Campus Biz is not responsible for transactions.</p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-2">5. Account Termination</h2>
            <p className="text-gray-400">We reserve the right to suspend accounts that violate these terms.</p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-2">6. Contact</h2>
            <p className="text-gray-400">For questions: stankyaruzi@gmail.com</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-blue-400 hover:text-blue-300">← Return to Homepage</Link>
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