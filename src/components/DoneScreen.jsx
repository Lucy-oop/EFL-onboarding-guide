import { ExternalLink, PartyPopper, RotateCcw } from 'lucide-react';
import { SITE_URL } from '../i18n';

export default function DoneScreen({ s, onRestart }) {
  return (
    <section className="animate-fade-up rounded-3xl border border-gold/30 bg-gold/[0.06] p-6 sm:p-10 text-center">
      <div className="mx-auto w-16 h-16 rounded-2xl bg-gold/15 flex items-center justify-center">
        <PartyPopper className="w-9 h-9 text-gold" aria-hidden />
      </div>
      <h2 className="mt-5 text-2xl sm:text-3xl font-extrabold text-white">{s.doneTitle}</h2>
      <p className="mt-3 text-slate-200 max-w-md mx-auto">{s.doneText}</p>
      <a
        href={SITE_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-navy font-bold px-6 py-3.5 hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {s.openSite} <ExternalLink className="w-4 h-4" aria-hidden />
      </a>
      <div>
        <button
          onClick={onRestart}
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-gold"
        >
          <RotateCcw className="w-4 h-4" aria-hidden /> {s.restart}
        </button>
      </div>
      <p className="mt-6 text-xs text-slate-400">{s.help}</p>
    </section>
  );
}
