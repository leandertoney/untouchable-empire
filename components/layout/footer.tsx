import Link from 'next/link';
import Image from 'next/image';
import { AtSign, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/images/untouchable_logo.png"
              alt="Untouchable Empire"
              width={80}
              height={80}
              className="rounded mb-4 mix-blend-lighten"
            />
            <p className="text-white/50 text-sm leading-relaxed">
              Premium Products. Personal Service. Powerful Results.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold-400 font-semibold text-sm uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-white/50 hover:text-white text-sm transition-colors">All Products</Link></li>
              <li><Link href="/products?category=sneakers" className="text-white/50 hover:text-white text-sm transition-colors">Sneakers</Link></li>
              <li><Link href="/products?category=slides" className="text-white/50 hover:text-white text-sm transition-colors">Slides</Link></li>
              <li><Link href="/products?category=accessories" className="text-white/50 hover:text-white text-sm transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-gold-400 font-semibold text-sm uppercase tracking-wider mb-4">Info</h3>
            <ul className="space-y-2">
              <li><Link href="/#about" className="text-white/50 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link href="/#services" className="text-white/50 hover:text-white text-sm transition-colors">Our Services</Link></li>
              <li><span className="text-white/50 text-sm">Authenticity Guaranteed</span></li>
              <li><span className="text-white/50 text-sm">Local Pickup & Delivery</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold-400 font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-gold-500" />
                <button className="text-white/50 hover:text-white text-sm transition-colors">
                  Chat With Us
                </button>
              </li>
              <li className="flex items-center gap-2">
                <AtSign className="w-4 h-4 text-gold-500" />
                <a href="https://instagram.com/untouchableservices" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors">
                  @untouchableservices
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-500" />
                <a href="mailto:info@untouchableempire.com" className="text-white/50 hover:text-white text-sm transition-colors">
                  info@untouchableempire.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs uppercase tracking-wider">
            Fast. Reliable. Untouchable.
          </p>
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Untouchable Empire. All rights reserved.
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.2em]">
            Built by{' '}
            <a
              href="https://universoleappstudios.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-gold-400 transition-colors"
            >
              UNIVERSOLE APP STUDIOS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
