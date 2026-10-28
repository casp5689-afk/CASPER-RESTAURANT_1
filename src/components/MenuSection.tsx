import type { MenuCategory } from "../types";

const WHATSAPP_NUMBER = "201001254381";

export default function MenuSection({
  category,
  quantities,
  onAdd,
  onIncrease,
  onDecrease,
}: {
  category: MenuCategory;
  quantities: Record<string, number>;
  onAdd: (id: string, name: string, price: number) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}) {
  if (category.infoOnly) {
    return (
      <section
        id={category.id}
        className="scroll-mt-32 rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-sky-950/30 p-6 shadow-lg"
      >
        <CategoryHeader number={category.number} title={category.title} />
        <p className="mt-4 text-sm leading-relaxed text-amber-100/90">{category.infoText}</p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            "مرحباً، حابب أعرف تفاصيل عروض الوجبات العائلية في مطعم كاسبر 👻"
          )}`}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-[#2a1600] transition hover:bg-amber-300"
        >
          تواصل معنا على الواتساب
        </a>
      </section>
    );
  }

  return (
    <section
      id={category.id}
      className="scroll-mt-32 rounded-2xl border border-sky-500/20 bg-[#071326]/80 shadow-lg shadow-black/30"
    >
      <CategoryHeader number={category.number} title={category.title} />
      <ul className="divide-y divide-sky-500/10 px-3 pb-2 sm:px-4">
        {category.items.map((item) => {
          const qty = quantities[item.id] || 0;
          return (
            <li key={item.id} className="flex items-center justify-between gap-3 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="shrink-0 rounded-lg bg-sky-500/15 px-2.5 py-1 text-sm font-bold text-sky-300 ring-1 ring-inset ring-sky-500/30">
                  {item.price}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-100 sm:text-[15px]">
                    {item.name}
                  </p>
                  {item.note && (
                    <p className="mt-0.5 truncate text-xs text-slate-400">{item.note}</p>
                  )}
                </div>
              </div>

              {qty === 0 ? (
                <button
                  onClick={() => onAdd(item.id, item.name, item.price)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-lg font-bold text-[#021022] transition hover:scale-110 hover:bg-sky-400"
                  aria-label={`أضف ${item.name}`}
                >
                  +
                </button>
              ) : (
                <div className="flex shrink-0 items-center gap-2 rounded-full border border-sky-500/40 bg-sky-950/60 px-1.5 py-1">
                  <button
                    onClick={() => onDecrease(item.id)}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-sm font-bold text-sky-200 hover:bg-sky-500/40"
                  >
                    −
                  </button>
                  <span className="w-4 text-center text-sm font-bold text-white">{qty}</span>
                  <button
                    onClick={() => onIncrease(item.id)}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-sm font-bold text-sky-200 hover:bg-sky-500/40"
                  >
                    +
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {category.footerNote && (
        <p className="mx-3 mb-4 rounded-lg bg-sky-500/10 px-3 py-2 text-center text-xs font-semibold text-sky-300 sm:mx-4">
          {category.footerNote}
        </p>
      )}
    </section>
  );
}

function CategoryHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-t-2xl bg-gradient-to-l from-sky-600/30 to-sky-900/10 px-4 py-3">
      <h3 className="text-base font-extrabold text-white sm:text-lg">{title}</h3>
      <span className="flex h-7 w-9 items-center justify-center rounded-md bg-sky-500/20 text-xs font-bold text-sky-300 ring-1 ring-inset ring-sky-500/40">
        {number}
      </span>
    </div>
  );
}
