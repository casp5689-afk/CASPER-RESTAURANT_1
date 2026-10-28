import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryNav from "./components/CategoryNav";
import MenuSection from "./components/MenuSection";
import FloatingCartButton from "./components/FloatingCartButton";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import menuData from "./data/menuData";
import type { CartLine } from "./types";

type CartState = Record<string, { name: string; price: number; qty: number }>;

export default function App() {
  const [cart, setCart] = useState<CartState>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(menuData[0]?.id ?? null);

  const quantities = useMemo(() => {
    const q: Record<string, number> = {};
    Object.entries(cart).forEach(([id, v]) => (q[id] = v.qty));
    return q;
  }, [cart]);

  const addItem = (id: string, name: string, price: number) => {
    setCart((prev) => ({
      ...prev,
      [id]: { name, price, qty: (prev[id]?.qty || 0) + 1 },
    }));
  };

  const increase = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: { ...prev[id], qty: prev[id].qty + 1 },
    }));
  };

  const decrease = (id: string) => {
    setCart((prev) => {
      const current = prev[id];
      if (!current) return prev;
      if (current.qty <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: { ...current, qty: current.qty - 1 } };
    });
  };

  const removeItem = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const lines: CartLine[] = useMemo(
    () =>
      Object.entries(cart).map(([id, v]) => ({
        id,
        name: v.name,
        price: v.price,
        qty: v.qty,
        categoryTitle: "",
      })),
    [cart]
  );

  const totalCount = lines.reduce((sum, l) => sum + l.qty, 0);
  const totalPrice = lines.reduce((sum, l) => sum + l.qty * l.price, 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0.1 }
    );

    menuData.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#030712] text-slate-100">
      <Header />
      <Hero onOrderClick={() => scrollToCategory(menuData[0].id)} />
      <CategoryNav
        categories={menuData}
        activeId={activeId}
        onSelect={scrollToCategory}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {menuData.map((category) => (
            <MenuSection
              key={category.id}
              category={category}
              quantities={quantities}
              onAdd={addItem}
              onIncrease={increase}
              onDecrease={decrease}
            />
          ))}
        </div>
      </main>

      <Footer />

      <FloatingCartButton
        count={totalCount}
        total={totalPrice}
        onClick={() => setDrawerOpen(true)}
      />

      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        lines={lines}
        total={totalPrice}
        onIncrease={increase}
        onDecrease={decrease}
        onRemove={removeItem}
        onOrderSent={() => setCart({})}
      />
    </div>
  );
}
