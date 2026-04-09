'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ShoeRequestForm from '@/components/shop/shoe-request-form';

function RequestFormWithParams() {
  const searchParams = useSearchParams();
  const prefillShoe = searchParams.get('shoe') || undefined;
  const prefillBrand = searchParams.get('brand') || undefined;
  const prefillStyleCode = searchParams.get('style') || undefined;

  return (
    <ShoeRequestForm
      prefillShoe={prefillShoe}
      prefillBrand={prefillBrand}
      prefillStyleCode={prefillStyleCode}
    />
  );
}

export default function RequestPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <p className="text-gold-400 text-xs uppercase tracking-[0.2em] mb-2">Can&apos;t find your shoe?</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Request a Shoe</h1>
          <p className="text-white/50">
            Tell us what you&apos;re looking for and we&apos;ll source it at the best price. No upfront payment &mdash; you only pay when we deliver.
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 sm:p-8">
          <Suspense fallback={<ShoeRequestForm />}>
            <RequestFormWithParams />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
