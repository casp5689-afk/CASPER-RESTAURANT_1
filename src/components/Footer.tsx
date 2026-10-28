export default function Footer() {
  return (
    <footer className="border-t border-sky-500/20 bg-[#050b18] px-4 py-8 text-center">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3">
        <p className="text-sm font-bold text-sky-300">مطعم كاسبر – شبح المأكولات السورية</p>
        <p className="text-xs text-slate-400">مصنع سيد – شارع السبيل – بجوار سوبر ماركت القدس</p>
        <div className="flex items-center gap-4 text-sm font-bold text-white" dir="ltr">
          <a href="tel:01001254381" className="hover:text-sky-300">01001254381</a>
        </div>
        <p className="mt-2 text-[11px] text-slate-500">
          © {new Date().getFullYear()} جميع الحقوق محفوظة لمطعم كاسبر 👻
        </p>
      </div>
    </footer>
  );
}
