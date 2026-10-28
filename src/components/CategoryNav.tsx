import type { MenuCategory } from "../types";

export default function CategoryNav({
  categories,
  activeId,
  onSelect,
}: {
  categories: MenuCategory[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="sticky top-0 z-30 border-b border-sky-500/20 bg-[#050b18]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <span className="shrink-0 rounded-full border border-sky-500/30 bg-sky-950/60 px-4 py-1.5 text-center text-xs font-bold text-sky-300">
          جميع الأسعار بالجنيه المصري
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2 overflow-x-auto md:justify-end">
          <span className="ml-1 hidden text-xs font-bold tracking-widest text-sky-400 md:inline">
            قائمة الطعام
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                activeId === cat.id
                  ? "border-sky-400 bg-sky-500 text-[#021022]"
                  : "border-sky-500/30 bg-sky-950/40 text-sky-200 hover:bg-sky-500/20"
              }`}
            >
              {cat.number} · {cat.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
