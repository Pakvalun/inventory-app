import { useState } from 'react';
import { Product } from '../types';

const initialProducts: Product[] = [
  { id: 1, name: 'กระเป๋า', price: 1290, quantity: 15 },
  { id: 2, name: 'หูฟังไร้สาย', price: 890, quantity: 0 },
  { id: 3, name: 'แก้วเก็บความเย็น', price: 350, quantity: 42 },
  { id: 4, name: 'สมุดโน้ต', price: 89, quantity: 0 },
  { id: 5, name: 'ปากกา', price: 10, quantity: 28 },
];

export function useInventory() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [nextId, setNextId] = useState<number>(6);

  // เพิ่มสินค้าใหม่
  const addProduct = (name: string, price: number, quantity: number): void => {
    const newProduct: Product = { id: nextId, name, price, quantity };
    setProducts((prev) => [...prev, newProduct]);
    setNextId((n) => n + 1);
  };

  // เพิ่ม/ลดจำนวนสต็อก (ห้ามต่ำกว่า 0)
  const updateQuantity = (id: number, delta: number): void => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(0, p.quantity + delta) } : p
      )
    );
  };

  // ลบสินค้า
  const deleteProduct = (id: number): void => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // สรุปข้อมูลด้วย reduce / filter
  const totalItems = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const outOfStock = products.filter((p) => p.quantity === 0).length;

  return {
    products,
    addProduct,
    updateQuantity,
    deleteProduct,
    totalItems,
    totalValue,
    outOfStock,
  };
}
