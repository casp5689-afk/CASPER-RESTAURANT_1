export default function FloatingCartButton({
  count,
  total,
  onClick,
}: {
  count: number;
  total: number;
  onClick: () => void;
}) {
  if (count === 0) return null;
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 left-1/2 z-40 flex w-[92%] max-w-sm -translate-x-1/2 items-center justify-between gap-3 rounded-full bg-sky-500 px-5 py-3.5 text-[#021022] shadow-[0_10px_35px_-5px_rgba(56,189,248,0.7)] transition hover:scale-[1.02] hover:bg-sky-400 sm:left-auto sm:right-6 sm:translate-x-0"
      dir="rtl"
    >
      <span className="flex items-center gap-2 text-sm font-extrabold">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#021022] text-sky-300">
          {count}
        </span>
        عرض السلة
      </span>
      <span className="text-sm font-extrabold">{total} جنيه</span>
    </button>
  );
}
