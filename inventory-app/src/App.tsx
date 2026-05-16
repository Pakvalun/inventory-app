import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useInventory } from './hooks/useInventory';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';

export default function App() {
  const inventory = useInventory();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 flex items-center h-14 gap-1">
            <div className="flex items-center gap-2 mr-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span className="font-semibold text-gray-800 text-sm">ระบบสต็อกสินค้า</span>
            </div>

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-4 h-14 text-sm border-b-2 transition-colors ${
                  isActive
                    ? 'border-emerald-500 text-emerald-600 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-4 h-14 text-sm border-b-2 transition-colors ${
                  isActive
                    ? 'border-emerald-500 text-emerald-600 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`
              }
            >
              จัดการสินค้า
            </NavLink>
          </div>
        </nav>

        {/* Routes */}
        <main className="max-w-5xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard inventory={inventory} />} />
            <Route path="/products" element={<Products inventory={inventory} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
