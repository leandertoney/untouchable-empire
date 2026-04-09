'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '@/lib/context/cart-context';
import { SERVICES } from '@/lib/data/services';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { itemCount } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <nav className="absolute top-[28px] left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/untouchable_logo.png"
              alt="Untouchable Empire"
              width={80}
              height={80}
              className="rounded mix-blend-lighten"
            />
            <span className="hidden sm:block text-gradient-gold font-bold text-lg tracking-wide">
              UNTOUCHABLE EMPIRE
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white/70 hover:text-gold-400 transition-colors text-sm uppercase tracking-wider">
              Home
            </Link>
            <Link href="/products" className="text-white/70 hover:text-gold-400 transition-colors text-sm uppercase tracking-wider">
              Shop
            </Link>

            {/* Services dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="text-white/70 hover:text-gold-400 transition-colors text-sm uppercase tracking-wider flex items-center gap-1"
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                  {SERVICES.map(service => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={() => setServicesOpen(false)}
                      className="block px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 text-sm transition-colors border-b border-white/5 last:border-0"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/request" className="text-gold-400 hover:text-gold-300 transition-colors text-sm uppercase tracking-wider font-semibold">
              Request a Shoe
            </Link>
            <Link href="/#about" className="text-white/70 hover:text-gold-400 transition-colors text-sm uppercase tracking-wider">
              About
            </Link>
          </div>

          {/* Cart + Mobile toggle */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative group">
              <ShoppingBag className="w-6 h-6 text-white/70 group-hover:text-gold-400 transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white/70 hover:text-gold-400 transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            <Link href="/" onClick={() => setMobileOpen(false)} className="block text-white/70 hover:text-gold-400 transition-colors text-sm uppercase tracking-wider py-2.5">
              Home
            </Link>
            <Link href="/products" onClick={() => setMobileOpen(false)} className="block text-white/70 hover:text-gold-400 transition-colors text-sm uppercase tracking-wider py-2.5">
              Shop
            </Link>

            {/* Mobile services accordion */}
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between text-white/70 hover:text-gold-400 transition-colors text-sm uppercase tracking-wider py-2.5"
            >
              Services
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 space-y-1">
                {SERVICES.map(service => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                    className="block text-white/50 hover:text-gold-400 transition-colors text-sm py-2"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/request" onClick={() => setMobileOpen(false)} className="block text-gold-400 hover:text-gold-300 transition-colors text-sm uppercase tracking-wider py-2.5 font-semibold">
              Request a Shoe
            </Link>
            <Link href="/#about" onClick={() => setMobileOpen(false)} className="block text-white/70 hover:text-gold-400 transition-colors text-sm uppercase tracking-wider py-2.5">
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
