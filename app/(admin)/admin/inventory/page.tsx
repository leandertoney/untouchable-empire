'use client';

import { useState, useCallback, useRef } from 'react';
import { Plus, Pencil, Trash2, Search, ShoppingBag, X, Zap, Check } from 'lucide-react';
import Image from 'next/image';
import { DEMO_PRODUCTS } from '@/lib/data/demo-products';
import { searchCatalog, type CatalogEntry } from '@/lib/data/sneaker-catalog';
import { formatPrice, generateSlug } from '@/lib/utils';
import type { Product } from '@/types/database';

interface ProductForm {
  name: string;
  brand: string;
  colorway: string;
  size: string;
  condition: string;
  price: string;
  compare_at_price: string;
  stock_quantity: string;
  sku: string;
  category: string;
  gender: string;
  description: string;
  release_date: string;
  authenticity_notes: string;
  pickup_available: boolean;
  delivery_available: boolean;
  is_featured: boolean;
  image_url: string;
}

const emptyForm: ProductForm = {
  name: '',
  brand: '',
  colorway: '',
  size: '',
  condition: 'new',
  price: '',
  compare_at_price: '',
  stock_quantity: '1',
  sku: '',
  category: 'sneakers',
  gender: 'mens',
  description: '',
  release_date: '',
  authenticity_notes: '100% Authentic. Verified by Untouchable Empire.',
  pickup_available: true,
  delivery_available: true,
  is_featured: false,
  image_url: '',
};

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [addedMessage, setAddedMessage] = useState('');

  // Style code lookup state
  const [styleQuery, setStyleQuery] = useState('');
  const [lookupResults, setLookupResults] = useState<CatalogEntry[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.brand?.toLowerCase().includes(search.toLowerCase())) ||
    (p.sku?.toLowerCase().includes(search.toLowerCase()))
  );

  const lookupStyle = useCallback((query: string) => {
    setStyleQuery(query);

    if (query.length < 2) {
      setLookupResults([]);
      return;
    }

    // Debounce 150ms — local search is instant, just avoiding re-renders per keystroke
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setLookupResults(searchCatalog(query));
    }, 150);
  }, []);

  const selectResult = useCallback((entry: CatalogEntry) => {
    const retailDollars = entry.retail_price > 0 ? (entry.retail_price / 100).toFixed(2) : '';
    setForm(prev => ({
      ...prev,
      name: entry.name,
      brand: entry.brand,
      colorway: entry.colorway,
      sku: entry.styleID,
      compare_at_price: retailDollars,
      category: entry.category,
      gender: entry.gender,
      description: entry.description,
      release_date: entry.release_date,
      image_url: entry.image_url,
    }));
    setLookupResults([]);
    setStyleQuery('');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const priceInCents = Math.round(parseFloat(form.price) * 100);
    const compareInCents = form.compare_at_price
      ? Math.round(parseFloat(form.compare_at_price) * 100)
      : null;

    const newProduct: Product = {
      id: `local-${Date.now()}`,
      name: form.name,
      slug: generateSlug(`${form.name}-${form.size}`),
      brand: form.brand || null,
      model: null,
      colorway: form.colorway || null,
      gender: (form.gender as Product['gender']) || null,
      category: (form.category as Product['category']) || null,
      size: form.size,
      condition: form.condition as Product['condition'],
      price: priceInCents,
      compare_at_price: compareInCents,
      sku: form.sku || null,
      stock_quantity: parseInt(form.stock_quantity) || 1,
      is_active: true,
      is_featured: form.is_featured,
      pickup_available: form.pickup_available,
      delivery_available: form.delivery_available,
      delivery_fee: 0,
      description: form.description || null,
      authenticity_notes: form.authenticity_notes || null,
      image_urls: form.image_url ? [form.image_url] : [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setProducts(prev => [newProduct, ...prev]);
    setForm(emptyForm);
    setShowAddModal(false);
    setAddedMessage(form.name);
    setTimeout(() => setAddedMessage(''), 3000);
  };

  const updateField = (field: keyof ProductForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 sm:p-8">
      {/* Success toast */}
      {addedMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">Added: {addedMessage}</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-white/40 text-sm mt-1">{products.length} products</p>
        </div>
        <button
          onClick={() => { setForm(emptyForm); setStyleQuery(''); setLookupResults([]); setShowAddModal(true); }}
          className="bg-gold-500 hover:bg-gold-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          placeholder="Search inventory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-gold-500/50 outline-none transition-colors"
        />
      </div>

      {/* Product table */}
      <div className="bg-zinc-900 rounded-xl border border-white/5 overflow-hidden">
        <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-3 bg-black/50 text-white/30 text-xs uppercase tracking-wider border-b border-white/5">
          <div className="col-span-4">Product</div>
          <div className="col-span-1">Size</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-1">Stock</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Featured</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {filtered.map(product => (
          <div
            key={product.id}
            className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-4 py-4 border-b border-white/5 last:border-0 items-center hover:bg-white/[0.02] transition-colors"
          >
            <div className="sm:col-span-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden">
                {product.image_urls.length > 0 ? (
                  <Image src={product.image_urls[0]} alt="" fill sizes="40px" className="object-cover" />
                ) : (
                  <ShoppingBag className="w-4 h-4 text-white/10" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">{product.name}</p>
                <p className="text-white/30 text-xs">{product.brand} &middot; {product.sku || 'No SKU'}</p>
              </div>
            </div>

            <div className="sm:col-span-1">
              <span className="text-white/70 text-sm">{product.size}</span>
            </div>

            <div className="sm:col-span-2">
              <span className="text-white font-medium text-sm">{formatPrice(product.price)}</span>
              {product.compare_at_price && (
                <span className="text-white/20 text-xs line-through ml-2">
                  {formatPrice(product.compare_at_price)}
                </span>
              )}
            </div>

            <div className="sm:col-span-1">
              <span className={`text-sm font-medium ${
                product.stock_quantity === 0 ? 'text-red-400' :
                product.stock_quantity <= 2 ? 'text-amber-400' : 'text-green-400'
              }`}>
                {product.stock_quantity}
              </span>
            </div>

            <div className="sm:col-span-1">
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                product.is_active && product.stock_quantity > 0
                  ? 'bg-green-500/10 text-green-400'
                  : product.stock_quantity === 0
                  ? 'bg-red-500/10 text-red-400'
                  : 'bg-white/5 text-white/30'
              }`}>
                {product.stock_quantity === 0 ? 'Sold Out' : product.is_active ? 'Active' : 'Draft'}
              </span>
            </div>

            <div className="sm:col-span-1">
              {product.is_featured && (
                <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-gold-500/10 text-gold-400">
                  Featured
                </span>
              )}
            </div>

            <div className="sm:col-span-2 flex items-center justify-end gap-2">
              <button className="p-2 text-white/30 hover:text-gold-400 transition-colors rounded-lg hover:bg-white/5">
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => setProducts(prev => prev.filter(p => p.id !== product.id))}
                className="p-2 text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/30 text-sm">No products found.</p>
          </div>
        )}
      </div>

      {/* ===== ADD PRODUCT MODAL ===== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 rounded-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Add Product</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white/30 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* STEP 1: Style Code Lookup */}
            <div className="mb-6 p-4 bg-gold-500/5 border border-gold-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-gold-500" />
                <p className="text-gold-400 text-sm font-semibold">Style Code Lookup</p>
              </div>
              <p className="text-white/40 text-xs mb-3">
                Enter a style number (e.g. DD0587-002) or shoe name and we&apos;ll pull all the details automatically.
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                <input
                  type="text"
                  placeholder="Enter style code or shoe name..."
                  value={styleQuery}
                  onChange={(e) => lookupStyle(e.target.value)}
                  className="w-full bg-black border border-gold-500/20 rounded-lg pl-10 pr-10 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-500/50 outline-none transition-colors"
                />
              </div>

              {/* Results dropdown */}
              {lookupResults.length > 0 && (
                <div className="mt-3 bg-zinc-800 border border-white/10 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                  {lookupResults.map((entry, i) => (
                    <button
                      key={i}
                      onClick={() => selectResult(entry)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0"
                    >
                      {entry.image_url ? (
                        <div className="w-14 h-14 bg-zinc-700 rounded-lg shrink-0 relative overflow-hidden">
                          <Image src={entry.image_url} alt="" fill sizes="56px" className="object-contain" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 bg-zinc-700 rounded-lg shrink-0 flex items-center justify-center">
                          <ShoppingBag className="w-5 h-5 text-white/10" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{entry.name}</p>
                        <p className="text-white/40 text-xs">
                          {entry.styleID} &middot; {entry.colorway}
                          {entry.retail_price > 0 && ` · Retail ${formatPrice(entry.retail_price)}`}
                        </p>
                        {entry.release_date && (
                          <p className="text-white/25 text-xs">Released: {entry.release_date}</p>
                        )}
                      </div>
                      <span className="text-gold-400 text-xs font-semibold shrink-0">Select</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Preview of selected shoe */}
            {form.name && (
              <div className="mb-6 flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-white/5">
                {form.image_url ? (
                  <div className="w-20 h-20 rounded-lg relative overflow-hidden shrink-0 bg-white">
                    <Image src={form.image_url} alt="" fill sizes="80px" className="object-contain" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-8 h-8 text-white/10" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-white font-semibold truncate">{form.name}</p>
                  <p className="text-white/40 text-xs">{form.colorway}</p>
                  {form.sku && <p className="text-white/30 text-xs">Style: {form.sku}</p>}
                  {form.release_date && <p className="text-white/25 text-xs">Released: {form.release_date}</p>}
                  {form.compare_at_price && <p className="text-gold-400 text-xs">Retail: ${form.compare_at_price}</p>}
                </div>
              </div>
            )}

            {/* STEP 2: Just size and price */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {form.name && (
                <div className="p-4 bg-zinc-800/50 rounded-xl border border-white/5">
                  <p className="text-gold-400 text-xs uppercase tracking-wider font-semibold mb-3">You just need to fill in:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-white/60 text-xs block mb-1.5">Size *</label>
                      <input type="text" required value={form.size} onChange={(e) => updateField('size', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-gold-500/50 outline-none text-center font-semibold" placeholder="10" autoFocus />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs block mb-1.5">Your Price ($) *</label>
                      <input type="number" required step="0.01" min="0" value={form.price} onChange={(e) => updateField('price', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-gold-500/50 outline-none text-center font-semibold" placeholder="180.00" />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs block mb-1.5">Qty in Stock</label>
                      <input type="number" min="1" value={form.stock_quantity} onChange={(e) => updateField('stock_quantity', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-gold-500/50 outline-none text-center font-semibold" />
                    </div>
                  </div>
                </div>
              )}

              {/* Full form (collapsed by default, expandable) */}
              {!form.name && (
                <p className="text-white/30 text-sm text-center py-4">
                  Search for a shoe above, or fill in the details manually below.
                </p>
              )}

              <details className={form.name ? 'text-white/30' : ''}>
                <summary className="text-white/40 text-xs uppercase tracking-wider cursor-pointer hover:text-white/60 transition-colors py-2">
                  {form.name ? 'Edit Details' : 'Manual Entry'}
                </summary>
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider block mb-1.5">Name *</label>
                      <input type="text" required value={form.name} onChange={(e) => updateField('name', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-gold-500/50 outline-none" />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider block mb-1.5">Brand</label>
                      <input type="text" value={form.brand} onChange={(e) => updateField('brand', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-gold-500/50 outline-none" />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider block mb-1.5">Colorway</label>
                      <input type="text" value={form.colorway} onChange={(e) => updateField('colorway', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-gold-500/50 outline-none" />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider block mb-1.5">Style Code / SKU</label>
                      <input type="text" value={form.sku} onChange={(e) => updateField('sku', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-gold-500/50 outline-none" />
                    </div>
                    {!form.name && (
                      <>
                        <div>
                          <label className="text-white/40 text-xs uppercase tracking-wider block mb-1.5">Size *</label>
                          <input type="text" required value={form.size} onChange={(e) => updateField('size', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-gold-500/50 outline-none" placeholder="10" />
                        </div>
                        <div>
                          <label className="text-white/40 text-xs uppercase tracking-wider block mb-1.5">Your Price ($) *</label>
                          <input type="number" required step="0.01" min="0" value={form.price} onChange={(e) => updateField('price', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-gold-500/50 outline-none" placeholder="180.00" />
                        </div>
                      </>
                    )}
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider block mb-1.5">Compare at Price ($)</label>
                      <input type="number" step="0.01" min="0" value={form.compare_at_price} onChange={(e) => updateField('compare_at_price', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-gold-500/50 outline-none" />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider block mb-1.5">Condition</label>
                      <select value={form.condition} onChange={(e) => updateField('condition', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-gold-500/50 outline-none">
                        <option value="new">New / Deadstock</option>
                        <option value="like_new">Like New</option>
                        <option value="used_excellent">Used - Excellent</option>
                        <option value="used_good">Used - Good</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider block mb-1.5">Category</label>
                      <select value={form.category} onChange={(e) => updateField('category', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-gold-500/50 outline-none">
                        <option value="sneakers">Sneakers</option>
                        <option value="slides">Slides</option>
                        <option value="boots">Boots</option>
                        <option value="accessories">Accessories</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider block mb-1.5">Gender</label>
                      <select value={form.gender} onChange={(e) => updateField('gender', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-gold-500/50 outline-none">
                        <option value="mens">Mens</option>
                        <option value="womens">Womens</option>
                        <option value="unisex">Unisex</option>
                        <option value="youth">Youth</option>
                        <option value="toddler">Toddler</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-white/40 text-xs uppercase tracking-wider block mb-1.5">Description</label>
                    <textarea rows={3} value={form.description} onChange={(e) => updateField('description', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-gold-500/50 outline-none resize-none" />
                  </div>

                  <div>
                    <label className="text-white/40 text-xs uppercase tracking-wider block mb-1.5">Image URL</label>
                    <input type="url" value={form.image_url} onChange={(e) => updateField('image_url', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-gold-500/50 outline-none" />
                  </div>

                  <div className="flex items-center gap-6 flex-wrap">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.pickup_available} onChange={(e) => updateField('pickup_available', e.target.checked)} className="accent-gold-500 w-4 h-4" />
                      <span className="text-white/60 text-sm">Pickup</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.delivery_available} onChange={(e) => updateField('delivery_available', e.target.checked)} className="accent-gold-500 w-4 h-4" />
                      <span className="text-white/60 text-sm">Delivery</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.is_featured} onChange={(e) => updateField('is_featured', e.target.checked)} className="accent-gold-500 w-4 h-4" />
                      <span className="text-white/60 text-sm">Featured</span>
                    </label>
                  </div>
                </div>
              </details>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm text-white/40 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gold-500 hover:bg-gold-400 text-black font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add to Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
