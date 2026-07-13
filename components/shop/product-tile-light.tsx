'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types/database';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/context/cart-context';

export default function ProductTileLight({ product }: { product: Product }) {
  const { addItem } = useCart();
  const isSoldOut = product.stock_quantity === 0;

  return (
    <div className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-square bg-neutral-100 rounded-2xl relative overflow-hidden">
          {product.image_urls.length > 0 ? (
            <Image
              src={product.image_urls[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-neutral-300">
              <ShoppingBag className="w-10 h-10 mb-2" />
              <span className="text-xs uppercase tracking-wider">{product.brand}</span>
            </div>
          )}
          {isSoldOut && (
            <span className="absolute top-3 left-3 bg-black text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
              Sold out
            </span>
          )}
          {product.compare_at_price && !isSoldOut && (
            <span className="absolute top-3 left-3 bg-white text-black text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
              Sale
            </span>
          )}
        </div>
      </Link>

      <div className="mt-3">
        <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-400 mb-1">{product.brand}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-[15px] font-medium leading-snug line-clamp-2 hover:text-neutral-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-neutral-400 text-xs mt-1">Size {product.size}</p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-[15px]">{formatPrice(product.price)}</span>
            {product.compare_at_price && (
              <span className="text-neutral-400 text-xs line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>
          {!isSoldOut && (
            <button
              onClick={(e) => { e.preventDefault(); addItem(product); }}
              className="bg-black hover:bg-neutral-800 text-white p-2 rounded-full transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
