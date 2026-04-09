'use client';

import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { DEMO_PRODUCTS } from '@/lib/data/demo-products';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboardPage() {
  const totalProducts = DEMO_PRODUCTS.length;
  const activeProducts = DEMO_PRODUCTS.filter(p => p.is_active && p.stock_quantity > 0).length;
  const soldOutProducts = DEMO_PRODUCTS.filter(p => p.stock_quantity === 0).length;
  const totalValue = DEMO_PRODUCTS.reduce((sum, p) => sum + p.price * p.stock_quantity, 0);

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Overview of your store</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-zinc-900 rounded-xl border border-white/5 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-gold-500" />
            </div>
            <span className="text-white/40 text-sm">Total Products</span>
          </div>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>

        <div className="bg-zinc-900 rounded-xl border border-white/5 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-white/40 text-sm">Active</span>
          </div>
          <p className="text-2xl font-bold">{activeProducts}</p>
        </div>

        <div className="bg-zinc-900 rounded-xl border border-white/5 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-white/40 text-sm">Sold Out</span>
          </div>
          <p className="text-2xl font-bold">{soldOutProducts}</p>
        </div>

        <div className="bg-zinc-900 rounded-xl border border-white/5 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-gold-500" />
            </div>
            <span className="text-white/40 text-sm">Inventory Value</span>
          </div>
          <p className="text-2xl font-bold">{formatPrice(totalValue)}</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="/admin/inventory"
          className="flex items-center gap-4 p-5 bg-zinc-900 rounded-xl border border-white/5 hover:border-gold-500/30 transition-all duration-300 group"
        >
          <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
            <Package className="w-6 h-6 text-gold-500" />
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-gold-400 transition-colors">
              Manage Inventory
            </h3>
            <p className="text-white/40 text-sm">Add, edit, or remove products</p>
          </div>
        </a>

        <a
          href="/admin/orders"
          className="flex items-center gap-4 p-5 bg-zinc-900 rounded-xl border border-white/5 hover:border-gold-500/30 transition-all duration-300 group"
        >
          <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
            <ShoppingCart className="w-6 h-6 text-gold-500" />
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-gold-400 transition-colors">
              View Orders
            </h3>
            <p className="text-white/40 text-sm">Track and manage customer orders</p>
          </div>
        </a>
      </div>
    </div>
  );
}
