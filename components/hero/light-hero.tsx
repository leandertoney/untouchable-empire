'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { STORE_CONFIG } from '@/config/store';

const ProductViewer = dynamic(
  () => import('./product-viewer').then(m => m.ProductViewer),
  { ssr: false }
);

export function LightHero() {
  const [firstWord, ...rest] = STORE_CONFIG.name.split(' ');
  const secondLine = rest.join(' ');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section className="relative w-full bg-white text-black overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 pt-28 pb-10 sm:pt-36 sm:pb-16 grid lg:grid-cols-2 gap-8 items-center">
        <div
          className={`order-2 lg:order-1 transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-neutral-500 mb-5">
            100% Authentic &middot; Below Retail &middot; Guaranteed
          </p>
          <h1 className="font-sans font-semibold text-[13vw] leading-[0.92] tracking-tight sm:text-[80px] lg:text-[88px]">
            {firstWord}
            {secondLine && <><br />{secondLine}</>}
          </h1>
          <p className="mt-6 max-w-md text-neutral-600 text-base sm:text-lg leading-relaxed">
            Verified-authentic Jordan, Nike, and Adidas, priced below retail,
            new stock every week. Drag the shoe. See it from every angle.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-black text-white px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-neutral-800 transition-colors"
            >
              Shop current inventory
            </Link>
            <Link
              href="#guarantee"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-7 py-3.5 text-sm font-semibold tracking-wide hover:border-neutral-500 transition-colors"
            >
              The guarantee
            </Link>
          </div>
        </div>

        <div
          className={`order-1 lg:order-2 relative h-[360px] sm:h-[460px] lg:h-[560px] -mx-6 sm:mx-0 transition-all duration-1000 ease-out delay-150 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <div className="absolute inset-0 rounded-none sm:rounded-3xl bg-gradient-to-b from-neutral-50 to-neutral-100">
            <Suspense fallback={<HeroFallback />}>
              <ProductViewer modelUrl="/models/jordan-4-military-black.glb" />
            </Suspense>
          </div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
            Drag to rotate
          </p>
        </div>
      </div>
    </section>
  );
}

function HeroFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-neutral-300 border-t-black animate-spin" />
    </div>
  );
}
