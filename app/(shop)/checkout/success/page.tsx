import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Order Confirmed</h1>
        <p className="text-white/50 mb-2">
          Thank you for your purchase from Untouchable Empire.
        </p>
        <p className="text-white/50 mb-8">
          You&apos;ll receive a confirmation email with your order details and fulfillment info shortly.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-black font-bold px-6 py-3 rounded-full transition-colors text-sm uppercase tracking-wider"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
