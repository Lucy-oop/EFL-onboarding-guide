import { Languages } from 'lucide-react';
import { LANGS, LOGO } from '../i18n';

export default function GuideHeader({ s, lang, onLang, step, total, done }) {
  const pct = done ? 100 : ((step + 1) / total) * 100;
  return (
    <header className="sticky top-0 z-30 bg-navy/90 backdrop-blur border-b border-white/10">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
        <img src={LOGO} alt="" width="36" height="36" className="w-9 h-9 rounded-lg bg-white shrink-0" />
        <span className="font-bold text-white truncate flex-1">{s.guideTitle}</span>
        <label className="relative flex items-center gap-1.5 text-sm text-slate-300">
          <Languages className="w-4 h-4" aria-hidden />
          <span className="sr-only">{s.changeLang}</span>
          <select
            value={lang}
            onChange={(e) => onLang(e.target.value)}
            className="bg-white/5 border border-white/15 rounded-lg pl-2 pr-1 py-1.5 text-white focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code} className="bg-navy">
                {l.flag} {l.native}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div
        className="h-1 bg-white/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
      >
        <div className="h-full bg-gold transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
    </header>
  );
}
