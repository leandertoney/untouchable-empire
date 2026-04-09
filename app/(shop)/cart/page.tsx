'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/context/cart-context';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup');

  // Calculate delivery fee as max of all product delivery fees
  const deliveryFee = fulfillment === 'delivery'
    ? Math.max(...items.map(item => item.product.delivery_fee), 0)
    : 0;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag className="w-16 h-16 text-white/10 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-white/40 mb-8">Browse our collection and add some heat.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-black font-bold px-6 py-3 rounded-full transition-colors text-sm uppercase tracking-wider"
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>

        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-4 p-4 bg-zinc-900 rounded-xl border border-white/5"
              >
                {/* Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-800 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden">
                  {product.image_urls.length > 0 ? (
                    <Image
                      src={product.image_urls[0]}
                      alt={product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <ShoppingBag className="w-8 h-8 text-white/10" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                    {product.name}
                  </h3>
                  <p className="text-white/40 text-xs mt-0.5">
                    {product.brand} &middot; Size {product.size}
                  </p>
                  <p className="text-white font-bold mt-2">{formatPrice(product.price)}</p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-white/10 rounded-lg">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-1.5 text-white/40 hover:text-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-sm font-medium">{quantity}</span>
                      <button
                        onClick={() => {
                          if (quantity < product.stock_quantity) {
                            updateQuantity(product.id, quantity + 1);
                          }
                        }}
                        className="p-1.5 text-white/40 hover:text-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-white/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Line total */}
                <div className="text-right">
                  <p className="text-white font-bold">{formatPrice(product.price * quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-zinc-900 rounded-xl border border-white/5 p-6">
              <h2 className="text-lg font-bold mb-6">Order Summary</h2>

              {/* Fulfillment Method */}
              <div className="mb-6">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Fulfillment</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFulfillment('pickup')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                      fulfillment === 'pickup'
                        ? 'bg-gold-500 text-black'
                        : 'bg-white/5 text-white/60 hover:text-white'
                    }`}
                  >
                    Pickup (Free)
                  </button>
                  <button
                    onClick={() => setFulfillment('delivery')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                      fulfillment === 'delivery'
                        ? 'bg-gold-500 text-black'
                        : 'bg-white/5 text-white/60 hover:text-white'
                    }`}
                  >
                    Delivery
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Subtotal</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                {fulfillment === 'delivery' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Delivery</span>
                    <span className="text-white">{formatPrice(deliveryFee)}</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-white font-bold text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout button — will wire to Stripe when live */}
              <button
                className="w-full bg-gold-500 hover:bg-gold-400 text-black font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,160,23,0.3)] text-sm uppercase tracking-wider"
              >
                Proceed to Checkout
              </button>

              <p className="text-white/20 text-xs text-center mt-4">
                Secure payment powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
