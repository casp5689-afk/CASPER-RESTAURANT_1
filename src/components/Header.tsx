const PHONE_DISPLAY = "01001254381";
const logo = "./images/logo.png";

export default function Header() {
  return (
    <header className="relative z-20 border-b border-sky-500/20 bg-[#050b18]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-6 px-4 py-6 sm:px-6 md:flex-row md:justify-between lg:px-8">
        {/* Contact card */}
        <div className="flex w-full flex-col items-center gap-3 rounded-2xl border border-sky-500/30 bg-sky-950/40 px-6 py-4 text-center shadow-[0_0_25px_-5px_rgba(56,189,248,0.4)] md:w-auto md:items-start md:text-right">
          <span className="text-xs font-semibold tracking-widest text-sky-400">رقم التواصل</span>
          <a
            href={`tel:${PHONE_DISPLAY}`}
            className="text-lg font-bold text-white transition hover:text-sky-300"
            dir="ltr"
          >
            {PHONE_DISPLAY}
          </a>
          <div className="flex items-center gap-3 pt-1">
            {["facebook", "instagram", "phone"].map((icon) => (
              <span
                key={icon}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-500/40 text-sky-300 transition hover:bg-sky-500/20"
              >
                <SocialIcon name={icon} />
              </span>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-2 text-center md:items-end md:text-right">
          <span className="text-xs font-bold tracking-[0.3em] text-sky-400">CASPER RESTAURANT</span>
          <h1 className="text-4xl font-black text-white drop-shadow-[0_0_20px_rgba(56,189,248,0.45)] sm:text-5xl">
            مطعم كاسبر
          </h1>
          <p className="text-lg font-semibold text-sky-300">شبح المأكولات السورية</p>
          <p className="max-w-sm text-sm text-slate-400">
            مصنع سيد – شارع السبيل – بجوار سوبر ماركت القدس
          </p>
        </div>

        {/* Logo */}
        <div className="shrink-0">
          <img
            src={logo}
            alt="شعار مطعم كاسبر"
            className="h-24 sm:h-28 w-auto max-w-[240px] rounded-2xl border-2 border-sky-400/40 object-contain bg-[#050b18]/60 p-1.5 shadow-[0_0_35px_-5px_rgba(56,189,248,0.6)]"
          />
        </div>
      </div>
    </header>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.16 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.78 8.44-4.94 8.44-9.94Z" />
      </svg>
    );
  }
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1.1l-2.3 2.1Z" />
    </svg>
  );
}
