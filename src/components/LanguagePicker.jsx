import { ArrowRight } from 'lucide-react';
import { LANGS, LOGO, t } from '../i18n';

export default function LanguagePicker({ onPick }) {
  return (
    <main className="min-h-[100svh] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md animate-fade-up">
        <div className="flex justify-center mb-6">
          <img
            src={LOGO}
            alt="eflsite.com"
            width="112"
            height="112"
            className="w-28 h-28 rounded-3xl bg-white p-1 shadow-lg shadow-black/30"
          />
        </div>

        <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-white leading-tight text-balance">
          {t.en.welcome}
        </h1>
        <p className="text-center text-slate-400 mt-3 text-sm text-balance" lang="my">{t.my.welcome}</p>
        <p className="text-center text-slate-400 mt-1 text-sm text-balance" lang="zh-CN">{t.zh.welcome}</p>

        <p className="flex flex-wrap justify-center gap-x-2 text-center text-xs uppercase tracking-widest text-gold font-semibold mt-8 mb-3">
          <span className="whitespace-nowrap">Choose language</span>
          <span aria-hidden className="hidden min-[400px]:inline">·</span>
          <span className="whitespace-nowrap" lang="my">ဘာသာစကားရွေးပါ</span>
          <span aria-hidden className="hidden min-[400px]:inline">·</span>
          <span className="whitespace-nowrap" lang="zh-CN">选择语言</span>
        </p>

        <ul className="space-y-3">
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                onClick={() => onPick(l.code)}
                lang={l.htmlLang}
                className="group w-full flex items-center gap-4 rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 text-left hover:border-gold hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold active:scale-[0.99] transition"
              >
                <span className="text-3xl" aria-hidden>{l.flag}</span>
                <span className="flex-1 min-w-0">
                  <span className="block text-lg font-bold text-white">{l.native}</span>
                  <span className="block text-sm text-slate-400">{t[l.code].start}</span>
                </span>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-gold group-hover:translate-x-0.5 transition" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
