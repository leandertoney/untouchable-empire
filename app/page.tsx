'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Send, ShieldCheck, Truck, Repeat } from 'lucide-react';
import { LightHero } from '@/components/hero/light-hero';
import ProductTileLight from '@/components/shop/product-tile-light';
import { Reveal } from '@/components/reveal';
import { getFeaturedProducts } from '@/lib/data/demo-products';
import { SERVICES } from '@/lib/data/services';
import { STORE_CONFIG } from '@/config/store';

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <div className="home-light bg-white text-black">
      {/* ===== NAV ===== */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 h-16 flex items-center justify-between">
          <span className="font-semibold tracking-tight text-lg">{STORE_CONFIG.name}</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-600">
            <a href="#guarantee" className="hover:text-black transition-colors">The guarantee</a>
            <a href="#inventory" className="hover:text-black transition-colors">Shop</a>
            <a href="#services" className="hover:text-black transition-colors">Services</a>
            <a href="#about" className="hover:text-black transition-colors">About</a>
          </div>
          <Link
            href="/products"
            className="rounded-full bg-black text-white text-sm font-semibold px-5 py-2.5 hover:bg-neutral-800 transition-colors"
          >
            Shop now
          </Link>
        </div>
      </nav>

      {/* ===== HERO (3D) ===== */}
      <LightHero />

      {/* ===== TRUST STRIP ===== */}
      <section className="border-y border-neutral-200 bg-neutral-50">
        <Reveal className="mx-auto max-w-7xl px-6 sm:px-10 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-neutral-500 shrink-0" />
            <span>Every pair verified before it ships</span>
          </div>
          <div className="flex items-center gap-3">
            <Repeat className="w-5 h-5 text-neutral-500 shrink-0" />
            <span>New inventory arriving weekly</span>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-neutral-500 shrink-0" />
            <span>Free local pickup or delivery, {STORE_CONFIG.location}</span>
          </div>
        </Reveal>
      </section>

      {/* ===== GUARANTEE ===== */}
      <section id="guarantee" className="mx-auto max-w-7xl px-6 sm:px-10 py-20 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-4">The guarantee</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
            100% authentic, or your money back.
          </h2>
          <p className="mt-5 text-neutral-600 leading-relaxed max-w-md">
            Every pair is checked before it ships. Not real, not sold, no exceptions.
            Most pairs come with their original box; anything missing a lid is always
            noted on the product page.
          </p>
        </Reveal>
        <Reveal delay={120} className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 relative">
          <Image
            src="/images/products/jordan-1-chicago-lost-found.jpeg"
            alt="Verified authentic sneaker, checked before it ships"
            fill
            className="object-cover"
          />
        </Reveal>
      </section>

      {/* ===== INVENTORY BAND ===== */}
      <section className="bg-black text-white">
        <Reveal className="mx-auto max-w-7xl px-6 sm:px-10 py-16 sm:py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-4">Always moving</p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">New pairs, every week.</h2>
        </Reveal>
      </section>

      {/* ===== CHECK / DETAIL ===== */}
      <section className="mx-auto max-w-7xl px-6 sm:px-10 py-20 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal className="order-2 lg:order-1 aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 relative">
          <Image
            src="/images/products/jordan-4-bred-reimagined.png"
            alt="Macro detail of verified sneaker leather and stitching"
            fill
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={120} className="order-1 lg:order-2">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-4">The check</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
            Verified before it ships.
          </h2>
          <p className="mt-5 text-neutral-600 leading-relaxed max-w-md">
            Retros, Nike, Adidas, streetwear: every pair checked for authenticity
            before it reaches you. If it&apos;s not real, it doesn&apos;t sell.
          </p>
        </Reveal>
      </section>

      {/* ===== FEATURE ROWS ===== */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 divide-y divide-neutral-200">
          {[
            { n: 'Guarantee', h: '100% authentic or refunded', p: 'Every pair verified before it ships. No fakes, no exceptions, money back if it is ever wrong.' },
            { n: 'Catalog', h: 'Jordans, Nike, Adidas, streetwear', p: 'Retros and heat that actually moves, picked for a community that already knows prices.' },
            { n: 'Inventory', h: 'New pairs, every week', p: 'Fresh stock arriving daily and weekly, always brand new. Box included on most pairs, always noted in the listing when it is not.' },
          ].map((row, i) => (
            <Reveal key={row.n} delay={i * 90} className="py-10 grid sm:grid-cols-[120px_1fr] gap-4 sm:gap-10 items-baseline">
              <div className="text-sm font-semibold text-neutral-400">{row.n}</div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">{row.h}</h3>
                <p className="mt-2 text-neutral-600 max-w-2xl">{row.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== RESERVE CTA ===== */}
      <section className="mx-auto max-w-7xl px-6 sm:px-10 py-20 sm:py-28 text-center">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-4">
            Authentic &middot; below retail &middot; new stock weekly
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-8">Get what you came for.</h2>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-black text-white px-8 py-4 text-sm font-semibold tracking-wide hover:bg-neutral-800 transition-colors"
          >
            Shop current inventory
          </Link>
        </Reveal>
      </section>

      {/* ===== LIVE PRODUCT GRID ===== */}
      <section id="inventory" className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-16 sm:py-20">
          <Reveal className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-2">New stock weekly</p>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">Current inventory</h3>
            </div>
            <Link href="/products" className="flex items-center gap-1.5 text-sm font-medium hover:text-neutral-600 transition-colors shrink-0">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={(i % 4) * 80}>
                <ProductTileLight product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REQUEST CTA ===== */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <Reveal className="mx-auto max-w-2xl px-6 sm:px-10 py-16 sm:py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-3">Can&apos;t find your size?</p>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">We can get what you want.</h3>
          <p className="text-neutral-600 mb-8">
            Tell us the shoe and the size, and we&apos;ll source it and get it to you. No upfront cost.
          </p>
          <Link
            href="/request"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-black text-white px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-neutral-800 transition-colors"
          >
            <Send className="w-4 h-4" /> Request a shoe
          </Link>
        </Reveal>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="mx-auto max-w-7xl px-6 sm:px-10 py-16 sm:py-20">
        <Reveal className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-2">More than sneakers</p>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">Our services</h3>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 90}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative h-[200px] rounded-2xl overflow-hidden block bg-neutral-100"
              >
                <Image
                  src={service.image_url}
                  alt={service.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute left-4 bottom-4 right-4">
                  <h4 className="text-white font-semibold text-lg">{service.name}</h4>
                  <p className="text-white/75 text-sm">{service.tagline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="border-t border-neutral-200">
        <Reveal className="mx-auto max-w-2xl px-6 sm:px-10 py-16 sm:py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-3">About {STORE_CONFIG.name}</p>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-5">
            Authentic sneakers, verified in {STORE_CONFIG.location}
          </h3>
          <p className="text-neutral-600 leading-relaxed">
            {STORE_CONFIG.name} brings verified-authentic Jordan, Nike, and Adidas sneakers to{' '}
            {STORE_CONFIG.location} and the surrounding area, always below retail and always brand new.
            Every pair is checked before it ships, backed by a money-back guarantee. Most pairs come with
            their original box; anything boxless or missing a lid is always noted on the product page.
            Free local pickup or delivery within {STORE_CONFIG.deliveryRadius}.
          </p>
        </Reveal>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-8 flex flex-wrap items-center justify-between gap-4">
          <span className="font-semibold tracking-tight">{STORE_CONFIG.name}</span>
          <span className="text-sm text-neutral-500">
            Designed &amp; built by{' '}
            <a href="https://universoleappstudios.com" target="_blank" rel="noopener" className="text-neutral-700 hover:text-black">
              Universole App Studios
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
