export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Admin sidebar nav */}
      <div className="flex">
        <aside className="hidden md:flex w-64 bg-black border-r border-white/10 min-h-screen flex-col p-6 fixed top-0 left-0">
          <div className="mb-8">
            <h2 className="text-gradient-gold font-bold text-lg tracking-wide">UNTOUCHABLE</h2>
            <p className="text-white/30 text-xs uppercase tracking-wider">Admin Panel</p>
          </div>

          <nav className="space-y-1 flex-1">
            <a
              href="/admin"
              className="block px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 text-sm transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/admin/inventory"
              className="block px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 text-sm transition-colors"
            >
              Inventory
            </a>
            <a
              href="/admin/orders"
              className="block px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 text-sm transition-colors"
            >
              Orders
            </a>
          </nav>

          <div className="pt-4 border-t border-white/10">
            <a
              href="/"
              className="block px-3 py-2 rounded-lg text-white/30 hover:text-white/60 text-sm transition-colors"
            >
              &larr; Back to Store
            </a>
          </div>
        </aside>

        {/* Main content area */}
        <div className="flex-1 md:ml-64">
          {/* Mobile admin header */}
          <div className="md:hidden bg-black border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <div>
              <h2 className="text-gradient-gold font-bold text-sm">UNTOUCHABLE ADMIN</h2>
            </div>
            <div className="flex gap-4">
              <a href="/admin" className="text-white/50 hover:text-white text-xs">Dashboard</a>
              <a href="/admin/inventory" className="text-white/50 hover:text-white text-xs">Inventory</a>
              <a href="/admin/orders" className="text-white/50 hover:text-white text-xs">Orders</a>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
