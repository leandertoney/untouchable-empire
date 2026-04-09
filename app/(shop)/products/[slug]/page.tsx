'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ShieldCheck, Truck, MapPin, ArrowLeft, Check, Send } from 'lucide-react';
import { getDemoProduct } from '@/lib/data/demo-products';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/context/cart-context';
import { useState } from 'react';

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getDemoProduct(params.slug);
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const isSoldOut = product.stock_quantity === 0;
  const inCart = items.find(item => item.product.id === product.id);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <div className="aspect-square bg-zinc-900 rounded-2xl border border-white/5 relative overflow-hidden">
            {product.image_urls.length > 0 ? (
              <Image
                src={product.image_urls[0]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <ShoppingBag className="w-20 h-20 text-white/10 mb-4" />
                <p className="text-white/20 text-sm uppercase tracking-wider">{product.brand}</p>
                <p className="text-white/10 text-xs mt-1">Product image coming soon</p>
              </div>
            )}

            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {isSoldOut && (
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded">
                  SOLD OUT
                </span>
              )}
              {product.compare_at_price && !isSoldOut && (
                <span className="bg-gold-500 text-black text-xs font-bold px-3 py-1.5 rounded">
                  SALE
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-2">{product.brand}</p>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-white/40 text-sm px-2 py-0.5 bg-white/5 rounded">
                Size {product.size}
              </span>
              <span className="text-white/40 text-sm px-2 py-0.5 bg-white/5 rounded capitalize">
                {product.condition.replace('_', ' ')}
              </span>
              {product.gender && (
                <span className="text-white/40 text-sm px-2 py-0.5 bg-white/5 rounded capitalize">
                  {product.gender}
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
              {product.compare_at_price && (
                <span className="text-xl text-white/30 line-through">
                  {formatPrice(product.compare_at_price)}
                </span>
              )}
            </div>

            {product.description && (
              <div className="mb-8">
                <p className="text-white/60 leading-relaxed">{product.description}</p>
              </div>
            )}

            {product.authenticity_notes && (
              <div className="flex items-start gap-3 mb-8 p-4 bg-gold-500/5 border border-gold-500/20 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-gold-400 text-sm font-semibold mb-0.5">Authenticity Guarantee</p>
                  <p className="text-white/50 text-sm">{product.authenticity_notes}</p>
                </div>
              </div>
            )}

            <div className="mb-8 space-y-3">
              <p className="text-white/40 text-xs uppercase tracking-wider">Fulfillment Options</p>
              <div className="flex flex-col gap-2">
                {product.pickup_available && (
                  <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-lg border border-white/5">
                    <MapPin className="w-4 h-4 text-gold-500" />
                    <div>
                      <p className="text-white text-sm font-medium">Local Pickup</p>
                      <p className="text-white/40 text-xs">Free &mdash; Lancaster, PA area</p>
                    </div>
                  </div>
                )}
                {product.delivery_available && (
                  <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-lg border border-white/5">
                    <Truck className="w-4 h-4 text-gold-500" />
                    <div>
                      <p className="text-white text-sm font-medium">Delivery</p>
                      <p className="text-white/40 text-xs">
                        Free &mdash; Within 10 miles of Lancaster, PA
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!isSoldOut ? (
              <button
                onClick={handleAdd}
                disabled={added}
                className={`w-full font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-gold-500 hover:bg-gold-400 text-black hover:shadow-[0_0_30px_rgba(212,160,23,0.3)]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                    {inCart && ` (${inCart.quantity} in cart)`}
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-3">
                <div className="w-full bg-zinc-800 text-white/30 font-bold py-4 rounded-xl text-sm uppercase tracking-wider text-center">
                  Sold Out
                </div>
                <Link
                  href={`/request?shoe=${encodeURIComponent(product.name)}&brand=${encodeURIComponent(product.brand || '')}&style=${encodeURIComponent(product.sku || '')}`}
                  className="w-full bg-gold-500/10 border border-gold-500/30 hover:bg-gold-500/20 text-gold-400 font-bold py-4 rounded-xl text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Request This Shoe
                </Link>
              </div>
            )}

            {!isSoldOut && product.stock_quantity <= 3 && (
              <p className="text-center text-amber-400/80 text-xs mt-3">
                Only {product.stock_quantity} left in stock
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
