# ระบบจัดการสต็อกสินค้า

ระบบจัดการสต็อกสินค้าเบื้องต้น พัฒนาด้วย React + TypeScript + Tailwind CSS + React Router DOM

## โครงสร้างโปรเจกต์

```
src/
├── types.ts                  # Interface: Product
├── hooks/
│   └── useInventory.ts       # Custom Hook สำหรับจัดการ state ทั้งหมด
├── pages/
│   ├── Dashboard.tsx         # หน้า / — สรุปภาพรวมสต็อก
│   └── Products.tsx          # หน้า /products — ฟอร์มและรายการสินค้า
├── App.tsx                   # Routing + shared state
├── main.tsx
└── index.css
```

## วิธีติดตั้งและรัน

```bash
# ติดตั้ง dependencies
bun install
# หรือ
npm install

# รัน development server
bun dev
# หรือ
npm run dev
```

## ฟีเจอร์

- **Dashboard (/)** — แสดงจำนวนสินค้า, มูลค่าสต็อกรวม (reduce), สินค้าหมดสต็อก (filter)
- **Products (/products)** — เพิ่มสินค้า, ปรับ +/− จำนวน, ลบสินค้า, ค้นหาแบบ real-time
- **Conditional Styling** — แถวสีแดงอ่อน + badge "สินค้าหมด" เมื่อ quantity === 0
- **Custom Hook** — `useInventory` แยก logic ออกจาก UI อย่างสมบูรณ์
- **TypeScript** — Interface `Product` ใน `src/types.ts`
