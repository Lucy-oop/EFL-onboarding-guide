import { useState } from 'react';
import { AlertTriangle, Check, Copy, ExternalLink, Lightbulb } from 'lucide-react';
import { SITE_URL } from '../i18n';
import Screenshot from './Screenshot';
import useIsDesktop from '../useIsDesktop';

function OpenSite({ s }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: user can still tap the link */
    }
  };
  return (
    <div className="mt-4 flex flex-col sm:flex-row gap-2">
      <a
        href={SITE_URL}
        target="_blank"
        rel="noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-navy font-bold px-5 py-3.5 hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.99] transition"
      >
        {s.openSite} <ExternalLink className="w-4 h-4" aria-hidden />
      </a>
      <button
        onClick={copy}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" aria-hidden /> : <Copy className="w-4 h-4" aria-hidden />}
        <span className="font-mono">eflsite.com</span>
        <span className="sr-only">{copied ? s.copied : s.copy}</span>
      </button>
    </div>
  );
}

function Callout({ kind, text }) {
  const warn = kind === 'warn';
  const Icon = warn ? AlertTriangle : Lightbulb;
  return (
    <div
      className={`mt-4 flex gap-3 rounded-xl border p-4 text-sm ${
        warn ? 'border-red-400/40 bg-red-500/10 text-red-100' : 'border-sky-400/30 bg-sky-500/10 text-sky-100'
      }`}
      role={warn ? 'alert' : undefined}
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${warn ? 'text-red-400' : 'text-sky-400'}`} aria-hidden />
      <p className="font-medium">{text}</p>
    </div>
  );
}

export default function StepCard({ number, total, step, meta, s }) {
  const Icon = meta.icon;
  const isDesktop = useIsDesktop();
  const device = isDesktop ? 'desktop' : 'mobile';
  const text = (isDesktop ? step.textDesktop : step.textMobile) ?? step.text;
  const src = meta.image[device];
  return (
    <article className="animate-fade-up rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gold text-navy font-extrabold text-lg shrink-0">
          {number}
        </span>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-widest text-gold font-semibold flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5" aria-hidden />
            {s.stepOf(number, total)}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white">{step.title}</h2>
        </div>
      </div>

      <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">{text}</p>

      {step.link && <OpenSite s={s} />}
      {step.callout && <Callout {...step.callout} />}

      <div className="mt-5">
        <Screenshot key={src} src={src} phone={!isDesktop} alt={step.title} highlight={meta.highlight?.[device]} s={s} />
      </div>
    </article>
  );
}
