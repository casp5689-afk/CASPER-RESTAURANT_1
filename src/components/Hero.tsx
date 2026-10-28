const heroBg = "./images/hero-bg.jpg";
const heroFood = "./images/hero-food.png";

export default function Hero({ onOrderClick }: { onOrderClick: () => void }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-sky-500/20">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/40 via-[#030712]/70 to-[#030712]" />

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-8 px-4 py-14 sm:px-6 md:flex-row md:py-20 lg:px-8">
        <div className="flex flex-1 flex-col items-center gap-5 text-center md:items-end md:text-right">
          <span className="rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-1 text-xs font-bold tracking-widest text-sky-300">
            👻 طعم سوري أصيل من قلب الحي
          </span>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
            جوّع واطلب... <span className="text-sky-400">كاسبر هيوصلك</span>
          </h2>
          <p className="max-w-xl text-sm text-slate-300 sm:text-base">
            شاورما سورية، كريبات، برجر، حواوشي ووجبات كومبو طازة كل يوم. اختار
            طلبك من المنيو وبعتهولنا على الواتساب في ثواني وإحنا نتصرف.
          </p>
          <button
            onClick={onOrderClick}
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-sky-500 px-7 py-3 text-sm font-bold text-[#021022] shadow-[0_0_25px_-5px_rgba(56,189,248,0.8)] transition hover:scale-105 hover:bg-sky-400"
          >
            🛒 اطلب الآن
          </button>
        </div>
        <div className="flex flex-1 justify-center">
          <img
            src={heroFood}
            alt="أكلات مطعم كاسبر"
            className="w-64 drop-shadow-[0_0_35px_rgba(56,189,248,0.45)] sm:w-80 md:w-96"
          />
        </div>
      </div>
    </section>
  );
}
