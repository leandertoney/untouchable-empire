'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Truck, MapPin, ArrowRight, MessageCircle, AtSign } from 'lucide-react';
import ProductCard from '@/components/shop/product-card';
import { getFeaturedProducts, DEMO_PRODUCTS } from '@/lib/data/demo-products';
import { SERVICES } from '@/lib/data/services';
import NeonSign from '@/components/ui/neon-sign';

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden -mt-[28px]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=1920&h=1080&fit=crop"
            alt="Premium Sneakers"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        <div className="absolute top-24 right-6 sm:right-10 lg:right-20 z-20 hidden sm:block">
          <NeonSign />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-4">
              <span className="text-gradient-gold">Brand New Kicks.</span>
              <br />
              <span className="text-white">Unbeatable Prices.</span>
            </h1>
            <p className="text-white/60 text-lg sm:text-xl mb-8">
              Steals on the hottest sneakers &mdash; always new, always below retail. Lancaster, PA.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="bg-gold-500 hover:bg-gold-400 text-black font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,160,23,0.3)] flex items-center gap-2 text-sm uppercase tracking-wider"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="border border-white/30 hover:border-gold-500/50 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 text-sm uppercase tracking-wider backdrop-blur-sm">
                <MessageCircle className="w-4 h-4" />
                Ask Us Anything
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className="py-6 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-8 sm:gap-16">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold-500" />
              <span className="text-white/60 text-xs sm:text-sm">100% Authentic</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gold-500" />
              <span className="text-white/60 text-xs sm:text-sm">Local Pickup</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-gold-500" />
              <span className="text-white/60 text-xs sm:text-sm">Free Local Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RECENTLY SOLD — sneaker-focused grid ===== */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-gold-400 text-xs uppercase tracking-[0.2em] mb-1">Previously in Stock</p>
              <h2 className="text-2xl sm:text-3xl font-bold">Recently Sold</h2>
            </div>
            <Link href="/products" className="flex items-center gap-1 text-gold-400 hover:text-gold-300 transition-colors text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECOND SNEAKER BANNER ===== */}
      <section className="relative h-[40vh] sm:h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=1920&h=800&fit=crop"
            alt="Jordan Collection"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold-400 text-xs uppercase tracking-[0.2em] mb-2">Below Retail, Every Time</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Hottest Drops.<br />Before They Sell Out.</h2>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-black font-bold px-6 py-3 rounded-full transition-all text-sm uppercase tracking-wider"
          >
            Browse Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ===== MORE SNEAKERS ===== */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">All Past Inventory</h2>
            <Link href="/products" className="flex items-center gap-1 text-gold-400 hover:text-gold-300 transition-colors text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {DEMO_PRODUCTS.slice(4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES — Card grid linking to individual pages ===== */}
      <section id="services" className="py-14 sm:py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-gold-400 text-xs uppercase tracking-[0.2em] mb-1">More Than Sneakers</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Our Services</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map(service => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative h-48 rounded-xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-300"
              >
                <Image
                  src={service.image_url}
                  alt={service.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg group-hover:text-gold-400 transition-colors">{service.name}</h3>
                  <p className="text-white/50 text-sm">{service.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">About Us</h2>
          <p className="text-white/50 leading-relaxed">
            Untouchable Empire delivers premium, authentic products with personal service
            in Lancaster, PA and surrounding areas. Every item is verified. Free local pickup or delivery.
          </p>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-14 sm:py-20 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ready to Order?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-gold-500 hover:bg-gold-400 text-black font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,160,23,0.3)] flex items-center gap-2 text-sm uppercase tracking-wider">
              <MessageCircle className="w-4 h-4" />
              Chat With Us
            </button>
            <a
              href="https://instagram.com/untouchableservices"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:border-gold-500/50 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 text-sm uppercase tracking-wider"
            >
              <AtSign className="w-4 h-4" />
              @untouchableservices
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
