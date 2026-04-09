'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, MessageCircle } from 'lucide-react';
import type { Service } from '@/lib/data/services';

export default function ServicePage({ service }: { service: Service }) {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative h-[50vh] sm:h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.image_url}
            alt={service.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">{service.name}</h1>
          <p className="text-gold-400 text-lg">{service.tagline}</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-white/60 text-lg leading-relaxed mb-10">
          {service.description}
        </p>

        <div className="space-y-3 mb-12">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-gold-500" />
              </div>
              <span className="text-white/80">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="bg-gold-500 hover:bg-gold-400 text-black font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,160,23,0.3)] flex items-center gap-2 text-sm uppercase tracking-wider">
            <MessageCircle className="w-4 h-4" />
            Inquire Now
          </button>
          <Link
            href="/products"
            className="border border-white/20 hover:border-gold-500/50 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-sm uppercase tracking-wider"
          >
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  );
}
