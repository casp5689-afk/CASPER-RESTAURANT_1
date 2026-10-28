import { useState } from "react";
import type { CartLine } from "../types";

const WHATSAPP_NUMBER = "201001254381";

export default function CartDrawer({
  open,
  onClose,
  lines,
  total,
  onIncrease,
  onDecrease,
  onRemove,
  onOrderSent,
}: {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  total: number;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onOrderSent: () => void;
}) {
  const [step, setStep] = useState<"cart" | "checkout" | "done">("cart");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!open) return null;

  const closeAndReset = () => {
    onClose();
    setTimeout(() => setStep("cart"), 300);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "من فضلك اكتب اسمك";
    if (!phone.trim()) errs.phone = "من فضلك اكتب رقم الموبايل";
    else if (!/^0?1[0-9]{9,10}$/.test(phone.replace(/\s/g, "")))
      errs.phone = "رقم الموبايل غير صحيح";
    if (!address.trim()) errs.address = "من فضلك اكتب العنوان بالتفصيل";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const sendOrder = () => {
    if (!validate()) return;

    const itemsText = lines
      .map((l, i) => `${i + 1}. ${l.name} × ${l.qty} = ${l.price * l.qty} جنيه`)
      .join("\n");

    const message = `مرحباً مطعم كاسبر 👻🍽️ عايز أطلب:

${itemsText}

💰 إجمالي الطلب: ${total} جنيه

👤 الاسم: ${name}
📱 رقم الموبايل: ${phone}
📍 العنوان بالتفصيل: ${address}
${notes.trim() ? `📝 ملاحظات: ${notes}` : ""}

من فضلكم أكدوا الطلب 🙏`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setStep("done");
    onOrderSent();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" dir="rtl">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeAndReset}
      />
      <div className="relative flex h-full w-full max-w-md flex-col bg-[#060e1c] shadow-2xl ring-1 ring-sky-500/20">
        <div className="flex items-center justify-between border-b border-sky-500/20 px-5 py-4">
          <h3 className="text-lg font-extrabold text-white">
            {step === "cart" && "🛒 سلة الطلبات"}
            {step === "checkout" && "📋 بيانات التوصيل"}
            {step === "done" && "✅ تم إرسال الطلب"}
          </h3>
          <button
            onClick={closeAndReset}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/10 text-sky-300 hover:bg-sky-500/30"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {step === "cart" && (
            <>
              {lines.length === 0 ? (
                <div className="mt-16 text-center text-slate-400">
                  <p className="text-5xl">👻</p>
                  <p className="mt-3">السلة فاضية... اختار أكلك الحلو من المنيو!</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {lines.map((line) => (
                    <li
                      key={line.id}
                      className="flex items-center justify-between gap-2 rounded-xl border border-sky-500/15 bg-sky-950/40 px-3 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-white">{line.name}</p>
                        <p className="text-xs text-sky-400">{line.price} جنيه × {line.qty} = {line.price * line.qty} جنيه</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 rounded-full border border-sky-500/40 bg-sky-950/60 px-1.5 py-1">
                          <button
                            onClick={() => onDecrease(line.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-sm font-bold text-sky-200 hover:bg-sky-500/40"
                          >
                            −
                          </button>
                          <span className="w-4 text-center text-sm font-bold text-white">{line.qty}</span>
                          <button
                            onClick={() => onIncrease(line.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-sm font-bold text-sky-200 hover:bg-sky-500/40"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => onRemove(line.id)}
                          className="text-xs font-bold text-red-400 hover:text-red-300"
                        >
                          حذف
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {step === "checkout" && (
            <div className="space-y-4">
              <Field
                label="الاسم بالكامل"
                value={name}
                onChange={setName}
                error={errors.name}
                placeholder="مثال: محمد أحمد"
              />
              <Field
                label="رقم الموبايل"
                value={phone}
                onChange={setPhone}
                error={errors.phone}
                placeholder="01xxxxxxxxx"
                dir="ltr"
                type="tel"
              />
              <Field
                label="العنوان بالتفصيل"
                value={address}
                onChange={setAddress}
                error={errors.address}
                placeholder="المنطقة - الشارع - رقم العمارة - علامة مميزة"
                textarea
              />
              <Field
                label="ملاحظات إضافية (اختياري)"
                value={notes}
                onChange={setNotes}
                placeholder="مثلاً: من غير بصل، إلخ"
                textarea
              />

              <div className="rounded-xl border border-sky-500/20 bg-sky-950/40 p-4">
                <p className="mb-2 text-sm font-bold text-sky-300">ملخص الطلب</p>
                <ul className="space-y-1 text-xs text-slate-300">
                  {lines.map((l) => (
                    <li key={l.id} className="flex justify-between">
                      <span>{l.name} × {l.qty}</span>
                      <span>{l.price * l.qty} جنيه</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex justify-between border-t border-sky-500/20 pt-2 text-sm font-extrabold text-white">
                  <span>الإجمالي</span>
                  <span>{total} جنيه</span>
                </div>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="mt-10 flex flex-col items-center gap-3 text-center">
              <p className="text-6xl">👻✅</p>
              <p className="text-lg font-bold text-white">تم فتح واتساب لإرسال طلبك!</p>
              <p className="text-sm text-slate-400">
                لو الواتساب ما اتفتحش تلقائي، تواصل معانا على الرقم{" "}
                <span dir="ltr" className="font-bold text-sky-300">01001254381</span>
              </p>
            </div>
          )}
        </div>

        {step !== "done" && (
          <div className="border-t border-sky-500/20 bg-[#050b18] px-5 py-4">
            <div className="mb-3 flex items-center justify-between text-sm font-bold text-slate-200">
              <span>الإجمالي</span>
              <span className="text-lg text-sky-300">{total} جنيه</span>
            </div>
            {step === "cart" ? (
              <button
                disabled={lines.length === 0}
                onClick={() => setStep("checkout")}
                className="w-full rounded-full bg-sky-500 py-3 text-sm font-extrabold text-[#021022] transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                متابعة الطلب
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setStep("cart")}
                  className="w-1/3 rounded-full border border-sky-500/40 py-3 text-sm font-bold text-sky-200 hover:bg-sky-500/10"
                >
                  رجوع
                </button>
                <button
                  onClick={sendOrder}
                  className="flex w-2/3 items-center justify-center gap-2 rounded-full bg-green-500 py-3 text-sm font-extrabold text-[#02230f] transition hover:bg-green-400"
                >
                  تأكيد وإرسال عبر واتساب
                </button>
              </div>
            )}
          </div>
        )}
        {step === "done" && (
          <div className="border-t border-sky-500/20 bg-[#050b18] px-5 py-4">
            <button
              onClick={closeAndReset}
              className="w-full rounded-full bg-sky-500 py-3 text-sm font-extrabold text-[#021022] hover:bg-sky-400"
            >
              إغلاق
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  textarea,
  dir,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  textarea?: boolean;
  dir?: "ltr" | "rtl";
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-bold text-sky-300">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className="w-full resize-none rounded-lg border border-sky-500/30 bg-sky-950/40 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
        />
      ) : (
        <input
          value={value}
          dir={dir}
          type={type || "text"}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-sky-500/30 bg-sky-950/40 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
        />
      )}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
