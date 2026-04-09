'use client';

import { useState, useCallback } from 'react';
import { Send, Check, Loader2, Search } from 'lucide-react';
import { searchCatalog, type CatalogEntry } from '@/lib/data/sneaker-catalog';

interface ShoeRequestFormProps {
  prefillShoe?: string;
  prefillBrand?: string;
  prefillStyleCode?: string;
  compact?: boolean;
}

export default function ShoeRequestForm({
  prefillShoe,
  prefillBrand,
  prefillStyleCode,
  compact = false,
}: ShoeRequestFormProps) {
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shoe_name: prefillShoe || '',
    brand: prefillBrand || '',
    style_code: prefillStyleCode || '',
    size: '',
    max_price: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Catalog search for shoe name autocomplete
  const [shoeResults, setShoeResults] = useState<CatalogEntry[]>([]);

  const handleShoeSearch = useCallback((query: string) => {
    setForm(prev => ({ ...prev, shoe_name: query }));
    if (query.length >= 2) {
      setShoeResults(searchCatalog(query));
    } else {
      setShoeResults([]);
    }
  }, []);

  const selectShoe = useCallback((entry: CatalogEntry) => {
    setForm(prev => ({
      ...prev,
      shoe_name: entry.name,
      brand: entry.brand,
      style_code: entry.styleID,
    }));
    setShoeResults([]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          max_price: form.max_price ? parseFloat(form.max_price) : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className={`text-center ${compact ? 'py-6' : 'py-12'}`}>
        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
          <Check className="w-6 h-6 text-green-400" />
        </div>
        <h3 className="text-xl font-bold mb-2">Request Submitted!</h3>
        <p className="text-white/50 text-sm">
          We&apos;ll reach out when we source your shoe. No payment until delivery.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Shoe search with autocomplete */}
      <div className="relative">
        <label className="text-white/50 text-xs uppercase tracking-wider block mb-1.5">What shoe are you looking for? *</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            required
            value={form.shoe_name}
            onChange={(e) => handleShoeSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-500/50 outline-none"
            placeholder='e.g. "Air Jordan 4 Military Black" or style code "DH6927-111"'
          />
        </div>

        {shoeResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-20 max-h-48 overflow-y-auto">
            {shoeResults.map((entry, i) => (
              <button
                key={i}
                type="button"
                onClick={() => selectShoe(entry)}
                className="w-full flex items-center gap-3 p-2.5 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{entry.name}</p>
                  <p className="text-white/40 text-xs">{entry.styleID} &middot; {entry.brand}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wider block mb-1.5">Your Name *</label>
          <input
            type="text"
            required
            value={form.customer_name}
            onChange={(e) => setForm(prev => ({ ...prev, customer_name: e.target.value }))}
            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-500/50 outline-none"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wider block mb-1.5">Email *</label>
          <input
            type="email"
            required
            value={form.customer_email}
            onChange={(e) => setForm(prev => ({ ...prev, customer_email: e.target.value }))}
            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-500/50 outline-none"
            placeholder="john@email.com"
          />
        </div>
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wider block mb-1.5">Phone</label>
          <input
            type="tel"
            value={form.customer_phone}
            onChange={(e) => setForm(prev => ({ ...prev, customer_phone: e.target.value }))}
            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-500/50 outline-none"
            placeholder="(717) 555-0000"
          />
        </div>
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wider block mb-1.5">Size *</label>
          <input
            type="text"
            required
            value={form.size}
            onChange={(e) => setForm(prev => ({ ...prev, size: e.target.value }))}
            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-500/50 outline-none"
            placeholder="10"
          />
        </div>
      </div>

      {!compact && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-white/50 text-xs uppercase tracking-wider block mb-1.5">Max Budget ($)</label>
            <input
              type="number"
              step="1"
              min="0"
              value={form.max_price}
              onChange={(e) => setForm(prev => ({ ...prev, max_price: e.target.value }))}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-500/50 outline-none"
              placeholder="200"
            />
          </div>
          <div>
            <label className="text-white/50 text-xs uppercase tracking-wider block mb-1.5">Style Code</label>
            <input
              type="text"
              value={form.style_code}
              onChange={(e) => setForm(prev => ({ ...prev, style_code: e.target.value }))}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-500/50 outline-none"
              placeholder="DH6927-111"
            />
          </div>
        </div>
      )}

      {!compact && (
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wider block mb-1.5">Notes</label>
          <textarea
            rows={2}
            value={form.notes}
            onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-500/50 outline-none resize-none"
            placeholder="Any preferences — colorway, condition, urgency..."
          />
        </div>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gold-500 hover:bg-gold-400 text-black font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,160,23,0.3)] flex items-center justify-center gap-2 text-sm uppercase tracking-wider disabled:opacity-50"
      >
        {submitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Request
          </>
        )}
      </button>

      <p className="text-white/20 text-xs text-center">
        No payment required. We&apos;ll contact you when we source your shoe.
      </p>
    </form>
  );
}
