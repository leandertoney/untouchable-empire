'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { STORE_CONFIG } from '@/config/store';

export const HERO_STAGE_COUNT = 5;

const IMAGES = [
  '/hero-shoe/01-hero.png',
  '/hero-shoe/02-outsole.png',
  '/hero-shoe/03-heel.png',
  '/hero-shoe/04-logo.png',
  '/hero-shoe/05-profile.png',
];

export function VerifyHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function onScroll() {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? (0 - rect.top) / total : 0;
      setProgress(Math.max(0, Math.min(1, p)));
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const N = IMAGES.length;
  const raw = progress * (N - 1);
  const introOpacity = raw <= 0.25 ? 1 : Math.max(0, 1 - (raw - 0.25) * 2.4);

  // Ease-in-out per stage: each image holds near-full opacity, then
  // transitions quickly through a short window around the midpoint,
  // so scroll feels like stepping between shots rather than a linear dissolve.
  function stageOpacity(dist: number) {
    const HOLD = 0.32; // fraction of the gap to each side that stays ~fully visible
    if (dist >= 1 - HOLD) return 0;
    if (dist <= HOLD) return 1;
    const t = (dist - HOLD) / (1 - 2 * HOLD);
    const eased = t * t * (3 - 2 * t); // smoothstep
    return 1 - eased;
  }

  return (
    <section ref={stageRef} className="relative" style={{ height: `${N * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black text-white flex flex-col">
        <div className="relative w-full" style={{ height: '76vh' }}>
          {IMAGES.map((src, i) => {
            const dist = Math.abs(raw - i);
            const opacity = stageOpacity(dist);
            const signedDist = raw - i;
            const scale = 1 + Math.min(1, Math.abs(signedDist)) * 0.06;
            const translateX = Math.max(-1, Math.min(1, signedDist)) * 3;
            return (
              <div
                key={src}
                className="absolute inset-0"
                style={{ opacity, zIndex: i }}
              >
                <Image
                  src={src}
                  alt={STORE_CONFIG.name}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  style={{ transform: `scale(${scale}) translateX(${translateX}%)` }}
                />
              </div>
            );
          })}
        </div>

        <div
          className={`flex-1 flex flex-col items-center justify-center px-6 text-center transition-all duration-700 ease-out ${mounted ? 'translate-y-0' : 'translate-y-6'}`}
          style={{ opacity: mounted ? introOpacity : 0 }}
        >
          <h1 className="font-sans font-semibold text-[9vw] leading-[1] tracking-tight sm:text-[44px] lg:text-[56px]">
            Untouchable Prices.
          </h1>
          <p className="mt-3 text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-white/60">
            100% Authentic
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-white text-black px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-neutral-200 transition-colors"
            >
              Shop current inventory
            </Link>
            <Link
              href="#guarantee"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold tracking-wide hover:border-white transition-colors"
            >
              The guarantee
            </Link>
          </div>
        </div>

        <p
          className="pb-4 text-center text-[11px] uppercase tracking-[0.2em] text-white/40"
          style={{ opacity: mounted ? introOpacity : 0 }}
        >
          Scroll to explore
        </p>
      </div>
    </section>
  );
}
