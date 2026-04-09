'use client';

import { useState } from 'react';
import { MessageCircle, Mail, Phone, Clock, CheckCircle, Search as SearchIcon, Package, XCircle } from 'lucide-react';

// Demo requests for display
const DEMO_REQUESTS = [
  {
    id: 'req-001',
    customer_name: 'Marcus Johnson',
    customer_email: 'marcus@example.com',
    customer_phone: '(717) 555-1234',
    shoe_name: 'Air Jordan 4 Retro "Military Black"',
    brand: 'Jordan',
    style_code: 'DH6927-111',
    size: '10.5',
    max_price: 19000,
    notes: 'Need before next weekend if possible',
    status: 'new' as const,
    created_at: '2026-04-09T10:30:00Z',
  },
  {
    id: 'req-002',
    customer_name: 'Aisha Williams',
    customer_email: 'aisha@example.com',
    customer_phone: null,
    shoe_name: 'Nike Dunk Low "Panda"',
    brand: 'Nike',
    style_code: 'DD1391-100',
    size: '7',
    max_price: 12000,
    notes: null,
    status: 'contacted' as const,
    created_at: '2026-04-08T14:15:00Z',
  },
  {
    id: 'req-003',
    customer_name: 'Darnell Thompson',
    customer_email: 'darnell@example.com',
    customer_phone: '(717) 555-5678',
    shoe_name: 'Yeezy Slide "Onyx"',
    brand: 'Adidas',
    style_code: 'HQ6448',
    size: '12',
    max_price: null,
    notes: 'Any size 12-13 works',
    status: 'sourcing' as const,
    created_at: '2026-04-07T09:00:00Z',
  },
  {
    id: 'req-004',
    customer_name: 'Keisha Brown',
    customer_email: 'keisha@example.com',
    customer_phone: '(717) 555-9012',
    shoe_name: 'Air Jordan 1 "Chicago Lost & Found"',
    brand: 'Jordan',
    style_code: 'DZ5485-612',
    size: '8',
    max_price: 18000,
    notes: null,
    status: 'fulfilled' as const,
    created_at: '2026-04-05T16:45:00Z',
  },
];

const statusConfig = {
  new: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10', label: 'New' },
  contacted: { icon: MessageCircle, color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Contacted' },
  sourcing: { icon: SearchIcon, color: 'text-purple-400', bg: 'bg-purple-500/10', label: 'Sourcing' },
  fulfilled: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10', label: 'Fulfilled' },
  closed: { icon: XCircle, color: 'text-white/30', bg: 'bg-white/5', label: 'Closed' },
};

export default function RequestsPage() {
  const [requests] = useState(DEMO_REQUESTS);
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all'
    ? requests
    : requests.filter(r => r.status === filter);

  const newCount = requests.filter(r => r.status === 'new').length;

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Shoe Requests</h1>
          <p className="text-white/40 text-sm mt-1">
            {requests.length} requests
            {newCount > 0 && <span className="text-gold-400"> &middot; {newCount} new</span>}
          </p>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'new', 'contacted', 'sourcing', 'fulfilled', 'closed'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
              filter === status
                ? 'bg-gold-500 text-black'
                : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Request cards */}
      <div className="space-y-4">
        {filtered.map(req => {
          const status = statusConfig[req.status];
          const StatusIcon = status.icon;

          return (
            <div key={req.id} className="bg-zinc-900 rounded-xl border border-white/5 p-5 hover:border-white/10 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-semibold">{req.shoe_name}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${status.bg} ${status.color} flex items-center gap-1`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-white/40 text-sm">
                    {req.brand && <span>{req.brand}</span>}
                    {req.style_code && <span>&middot; {req.style_code}</span>}
                    <span>&middot; Size {req.size}</span>
                    {req.max_price && <span>&middot; Budget: ${(req.max_price / 100).toFixed(0)}</span>}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-white/20 text-xs">
                    {new Date(req.created_at).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              {/* Customer info */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <span className="font-medium text-white">{req.customer_name}</span>
                </div>
                <a href={`mailto:${req.customer_email}`} className="flex items-center gap-1.5 text-white/40 hover:text-gold-400 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  {req.customer_email}
                </a>
                {req.customer_phone && (
                  <a href={`tel:${req.customer_phone}`} className="flex items-center gap-1.5 text-white/40 hover:text-gold-400 transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                    {req.customer_phone}
                  </a>
                )}
              </div>

              {req.notes && (
                <p className="mt-3 text-white/30 text-sm bg-black/30 rounded-lg px-3 py-2">
                  &ldquo;{req.notes}&rdquo;
                </p>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-10 h-10 text-white/10 mx-auto mb-3" />
            <p className="text-white/30 text-sm">No requests in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
