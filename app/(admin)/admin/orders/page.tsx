'use client';

import { Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// Demo orders for display
const DEMO_ORDERS = [
  {
    id: 'ord-001',
    customer_name: 'Marcus Johnson',
    customer_email: 'marcus@example.com',
    fulfillment_method: 'pickup' as const,
    payment_status: 'paid' as const,
    order_status: 'confirmed' as const,
    total: 21500,
    created_at: '2026-04-08T14:30:00Z',
    items: [{ product_name: 'Air Jordan 4 Retro "Military Black"', size: '10', quantity: 1 }],
  },
  {
    id: 'ord-002',
    customer_name: 'Aisha Williams',
    customer_email: 'aisha@example.com',
    fulfillment_method: 'delivery' as const,
    payment_status: 'paid' as const,
    order_status: 'ready' as const,
    total: 13500,
    created_at: '2026-04-07T11:15:00Z',
    items: [{ product_name: 'Nike Dunk Low "Panda"', size: '9', quantity: 1 }],
  },
  {
    id: 'ord-003',
    customer_name: 'Darnell Thompson',
    customer_email: 'darnell@example.com',
    fulfillment_method: 'pickup' as const,
    payment_status: 'paid' as const,
    order_status: 'completed' as const,
    total: 35000,
    created_at: '2026-04-05T09:45:00Z',
    items: [{ product_name: 'Air Jordan 1 Retro High OG "Chicago"', size: '10.5', quantity: 1 }],
  },
  {
    id: 'ord-004',
    customer_name: 'Keisha Brown',
    customer_email: 'keisha@example.com',
    fulfillment_method: 'delivery' as const,
    payment_status: 'pending' as const,
    order_status: 'pending' as const,
    total: 15000,
    created_at: '2026-04-09T08:00:00Z',
    items: [{ product_name: 'Yeezy Slide "Onyx"', size: '11', quantity: 1 }],
  },
];

const statusConfig = {
  pending: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10', label: 'Pending' },
  confirmed: { icon: CheckCircle, color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Confirmed' },
  ready: { icon: Package, color: 'text-purple-400', bg: 'bg-purple-500/10', label: 'Ready' },
  completed: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10', label: 'Completed' },
  cancelled: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10', label: 'Cancelled' },
};

export default function OrdersPage() {
  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-white/40 text-sm mt-1">{DEMO_ORDERS.length} orders</p>
      </div>

      {/* Order list */}
      <div className="space-y-4">
        {DEMO_ORDERS.map(order => {
          const status = statusConfig[order.order_status];
          const StatusIcon = status.icon;

          return (
            <div key={order.id} className="bg-zinc-900 rounded-xl border border-white/5 p-5 hover:border-white/10 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${status.bg} flex items-center justify-center`}>
                    <StatusIcon className={`w-4 h-4 ${status.color}`} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{order.customer_name}</p>
                    <p className="text-white/30 text-xs">{order.customer_email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${status.bg} ${status.color}`}>
                    {status.label}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    order.payment_status === 'paid' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {order.payment_status === 'paid' ? 'Paid' : 'Pending Payment'}
                  </span>
                  <div className="flex items-center gap-1.5 text-white/30">
                    {order.fulfillment_method === 'delivery' ? (
                      <Truck className="w-3.5 h-3.5" />
                    ) : (
                      <Package className="w-3.5 h-3.5" />
                    )}
                    <span className="text-xs capitalize">{order.fulfillment_method}</span>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="bg-black/30 rounded-lg p-3 mb-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">
                      {item.product_name} <span className="text-white/30">&middot; Size {item.size}</span>
                    </span>
                    <span className="text-white/30 text-sm">x{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/20 text-xs">
                  {new Date(order.created_at).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
                  })}
                </span>
                <span className="text-white font-bold">{formatPrice(order.total)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
