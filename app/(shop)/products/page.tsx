'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/shop/product-card';
import { DEMO_PRODUCTS } from '@/lib/data/demo-products';

const BRANDS = Array.from(new Set(DEMO_PRODUCTS.map(p => p.brand).filter(Boolean))) as string[];
const CATEGORIES = ['sneakers', 'slides', 'boots', 'accessories'] as const;

export default function ProductsPage() {
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  const filtered = useMemo(() => {
    let products = DEMO_PRODUCTS.filter(p => p.is_active);

    if (brandFilter) {
      products = products.filter(p => p.brand === brandFilter);
    }
    if (categoryFilter) {
      products = products.filter(p => p.category === categoryFilter);
    }

    switch (sortBy) {
      case 'price-asc':
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products = [...products].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return products;
  }, [brandFilter, categoryFilter, sortBy]);

  const hasFilters = brandFilter || categoryFilter;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-2">Collection</p>
          <h1 className="text-3xl sm:text-4xl font-bold">All Products</h1>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:border-gold-500/30 text-white/70 hover:text-white text-sm transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {hasFilters && (
              <button
                onClick={() => { setBrandFilter(null); setCategoryFilter(null); }}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gold-500/10 text-gold-400 text-sm hover:bg-gold-500/20 transition-colors"
              >
                Clear All <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-white/30 text-sm hidden sm:block">{filtered.length} products</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-zinc-900 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-gold-500/50 outline-none"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="mb-8 p-4 rounded-xl bg-zinc-900 border border-white/5 flex flex-wrap gap-6">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Brand</p>
              <div className="flex flex-wrap gap-2">
                {BRANDS.map(brand => (
                  <button
                    key={brand}
                    onClick={() => setBrandFilter(brandFilter === brand ? null : brand)}
                    className={`px-3 py-1 rounded-full text-xs transition-colors ${
                      brandFilter === brand
                        ? 'bg-gold-500 text-black font-semibold'
                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
                    className={`px-3 py-1 rounded-full text-xs capitalize transition-colors ${
                      categoryFilter === cat
                        ? 'bg-gold-500 text-black font-semibold'
                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg mb-4">No products match your filters.</p>
            <button
              onClick={() => { setBrandFilter(null); setCategoryFilter(null); }}
              className="text-gold-400 hover:text-gold-300 text-sm underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
