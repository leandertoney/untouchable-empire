import Link from 'next/link';
import { XCircle, ArrowLeft } from 'lucide-react';

export default function CheckoutCanceledPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-white/30" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Checkout Canceled</h1>
        <p className="text-white/50 mb-8">
          Your order was not completed and no charges were made. Your cart items are still saved.
        </p>
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 border border-white/20 hover:border-gold-500/50 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>
      </div>
    </div>
  );
}
