import { useState } from 'react';
import { Product } from '../types';

interface InventoryProps {
  inventory: {
    products: Product[];
    addProduct: (name: string, price: number, quantity: number) => void;
    updateQuantity: (id: number, delta: number) => void;
    deleteProduct: (id: number) => void;
  };
}

export default function Products({ inventory }: InventoryProps) {
  const { products, addProduct, updateQuantity, deleteProduct } = inventory;

  // Form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const [error, setError] = useState('');

  // Search state
  const [search, setSearch] = useState('');

  const formatPrice = (n: number) =>
    n.toLocaleString('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 });

  // Filter สินค้าตาม search query แบบ real-time
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!name.trim()) { setError('ระบุชื่อสินค้า'); return; }
    const parsedPrice = parseFloat(price);
    const parsedQty = parseInt(qty);
    if (isNaN(parsedPrice) || parsedPrice < 0) { setError('ระบุราคาที่ถูกต้อง'); return; }
    if (isNaN(parsedQty) || parsedQty < 0) { setError('ระบุจำนวนที่ถูกต้อง'); return; }

    addProduct(name.trim(), parsedPrice, parsedQty);
    setName('');
    setPrice('');
    setQty('');
    setError('');
  };

  return (
    <div>
      <div className="flex items-baseline gap-3 mb-5">
        <h1 className="text-xl font-semibold text-gray-800">จัดการสินค้า</h1>
        <span className="text-sm text-gray-400">{products.length} รายการ</span>
      </div>

      {/* ฟอร์มเพิ่มสินค้า */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
          เพิ่มสินค้าใหม่
        </p>

        <div className="grid grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-xs text-gray-500 mb-1">ชื่อสินค้า</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="เช่น เสื้อยืดสีขาว"
              className="w-full h-9 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">ราคา (บาท)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full h-9 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">จำนวนเริ่มต้น</label>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="0"
              min="0"
              step="1"
              className="w-full h-9 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
            />
          </div>

          <button
            onClick={handleAdd}
            className="h-9 px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 justify-center"
          >
            + เพิ่มสินค้า
          </button>
        </div>

        {error && (
          <p className="mt-2 text-xs text-red-500">{error}</p>
        )}
      </div>

      {/* รายการสินค้า */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        {/* Search Bar */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาสินค้า..."
            className="w-full h-9 pl-8 pr-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
          />
        </div>

        {search && (
          <p className="text-xs text-gray-400 mb-3">
            พบ {filteredProducts.length} รายการ จาก &quot;{search}&quot;
          </p>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-300">         
            <p className="text-sm">{search ? 'ไม่พบสินค้าที่ค้นหา' : 'ยังไม่มีสินค้าในระบบ'}</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="pb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">ชื่อสินค้า</th>
                <th className="pb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">ราคา</th>
                <th className="pb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">จำนวนสต็อก</th>
                <th className="pb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">มูลค่ารวม</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  className={`border-b border-gray-50 last:border-none ${
                    p.quantity === 0 ? 'bg-red-50' : 'hover:bg-gray-50'
                  } transition-colors`}
                >
                  {/* ชื่อสินค้า */}
                  <td className="py-3">
                    <div className="flex items-center gap-2 font-medium text-gray-700">
                      {p.name}
                      {p.quantity === 0 && (
                        <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full font-normal">
                          สินค้าหมด
                        </span>
                      )}
                    </div>
                  </td>

                  {/* ราคา */}
                  <td className="py-3 font-mono text-gray-500">{formatPrice(p.price)}</td>

                  {/* จำนวนสต็อก + ปุ่มควบคุม */}
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      {/* ปุ่ม [-] ลดจำนวน */}
                      <button
                        onClick={() => updateQuantity(p.id, -1)}
                        disabled={p.quantity === 0}
                        className="w-7 h-7 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-base leading-none flex items-center justify-center"
                        title="ลดจำนวน"
                      >
                        −
                      </button>

                      <span className={`w-8 text-center font-mono font-medium ${p.quantity === 0 ? 'text-red-400' : 'text-gray-700'}`}>
                        {p.quantity}
                      </span>

                      {/* ปุ่ม [+] เพิ่มจำนวน */}
                      <button
                        onClick={() => updateQuantity(p.id, 1)}
                        className="w-7 h-7 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all text-base leading-none flex items-center justify-center"
                        title="เพิ่มจำนวน"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* มูลค่ารวม */}
                  <td className="py-3 font-mono text-gray-500">{formatPrice(p.price * p.quantity)}</td>

                  {/* ปุ่มลบ */}
                  <td className="py-3">
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="w-7 h-7 rounded-lg border border-gray-200 text-gray-300 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all flex items-center justify-center"
                      title="ลบสินค้า"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
