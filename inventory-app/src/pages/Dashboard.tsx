import { Product } from '../types';

interface InventoryProps {
  inventory: {
    products: Product[];
    totalItems: number;
    totalValue: number;
    outOfStock: number;
  };
}

export default function Dashboard({ inventory }: InventoryProps) {
  const { products, totalItems, totalValue, outOfStock } = inventory;

  const formatPrice = (n: number) =>
    n.toLocaleString('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 });

  return (
    <div>
      <div className="flex items-baseline gap-3 mb-5">
        <h1 className="text-xl font-semibold text-gray-800">ภาพรวมสต็อก</h1>
        <span className="text-sm text-gray-400">อัปเดตแบบเรียลไทม์</span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-400 mb-1">รายการสินค้าทั้งหมด</p>
          <p className="text-3xl font-semibold text-blue-500 font-mono">{totalItems}</p>
          <p className="text-xs text-gray-300 mt-1">ชนิดสินค้า</p>
        </div>

        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
          <p className="text-xs text-emerald-600 mb-1">มูลค่าสต็อกรวม</p>
          <p className="text-3xl font-semibold text-emerald-600 font-mono leading-none">
            {formatPrice(totalValue)}
          </p>
          <p className="text-xs text-emerald-400 mt-1">price × quantity ทุกรายการ</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-400 mb-1">สินค้าที่หมดสต็อก</p>
          <p className="text-3xl font-semibold text-red-400 font-mono">{outOfStock}</p>
          <p className="text-xs text-gray-300 mt-1">รายการที่ quantity = 0</p>
        </div>
      </div>

      {/* Product Summary Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
          รายการสินค้าทั้งหมด
        </p>

        {products.length === 0 ? (
          <div className="text-center py-12 text-gray-300">
            <p className="text-sm">ยังไม่มีสินค้าในระบบ</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="pb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">ชื่อสินค้า</th>
                <th className="pb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">ราคา</th>
                <th className="pb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">จำนวน</th>
                <th className="pb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">มูลค่ารวม</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className={`border-b border-gray-50 last:border-none ${
                    p.quantity === 0 ? 'bg-red-50' : ''
                  }`}
                >
                  <td className="py-3 font-medium text-gray-700 flex items-center gap-2">
                    {p.name}
                    {p.quantity === 0 && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                        สินค้าหมด
                      </span>
                    )}
                  </td>
                  <td className="py-3 font-mono text-gray-500">{formatPrice(p.price)}</td>
                  <td className={`py-3 font-mono font-medium ${p.quantity === 0 ? 'text-red-400' : 'text-gray-700'}`}>
                    {p.quantity}
                  </td>
                  <td className="py-3 font-mono text-gray-500">{formatPrice(p.price * p.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
