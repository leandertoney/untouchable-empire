'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types/database';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/context/cart-context';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const isSoldOut = product.stock_quantity === 0;

  return (
    <div className="group bg-zinc-900 rounded-xl border border-white/5 overflow-hidden hover-gold-glow transition-all duration-300">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square bg-zinc-800 relative overflow-hidden">
          {product.image_urls.length > 0 ? (
            <Image
              src={product.image_urls[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
              <ShoppingBag className="w-12 h-12 mb-2" />
              <span className="text-xs uppercase tracking-wider">{product.brand}</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {isSoldOut && (
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                SOLD OUT
              </span>
            )}
            {product.compare_at_price && !isSoldOut && (
              <span className="bg-gold-500 text-black text-xs font-bold px-2 py-1 rounded">
                SALE
              </span>
            )}
            {product.condition !== 'new' && (
              <span className="bg-white/10 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                {product.condition.replace('_', ' ').toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <p className="text-gold-400 text-xs uppercase tracking-wider mb-1">{product.brand}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-white font-semibold text-sm leading-snug mb-1 group-hover:text-gold-300 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-white/40 text-xs mb-3">Size {product.size}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-white font-bold text-lg">{formatPrice(product.price)}</span>
            {product.compare_at_price && (
              <span className="text-white/30 text-sm line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>

          {!isSoldOut && (
            <button
              onClick={(e) => { e.preventDefault(); addItem(product); }}
              className="bg-gold-500 hover:bg-gold-400 text-black p-2 rounded-lg transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
