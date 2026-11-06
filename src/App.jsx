import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, List, Square } from 'lucide-react';
import { LANGS, t } from './i18n';
import { STEPS, visibleSteps } from './steps';
import useIsDesktop from './useIsDesktop';
import LanguagePicker from './components/LanguagePicker';
import GuideHeader from './components/GuideHeader';
import StepCard from './components/StepCard';
import DoneScreen from './components/DoneScreen';


function loadLang() {
  try {
    const v = localStorage.getItem('efl-lang');
    return LANGS.some((l) => l.code === v) ? v : null;
  } catch {
    return null;
  }
}

function saveLang(v) {
  try {
    if (v) localStorage.setItem('efl-lang', v);
    else localStorage.removeItem('efl-lang');
  } catch {
    /* storage unavailable */
  }
}

// #step-3 → position 2, so teachers can share a link to one step
function stepFromHash() {
  const m = window.location.hash.match(/^#step-(\d+)$/);
  return m ? Number(m[1]) - 1 : 0;
}

export default function App() {
  const [lang, setLang] = useState(loadLang);
  const [rawStep, setStep] = useState(stepFromHash);
  const isDesktop = useIsDesktop();
  // step 3 (open the ☰ menu) only exists on phones
  const visible = visibleSteps(isDesktop);
  const TOTAL = visible.length;
  const DONE = TOTAL; // position of the "You're ready" screen
  const step = Math.max(0, Math.min(DONE, rawStep));
  const [showAll, setShowAll] = useState(false);
  const touchX = useRef(null);

  const s = lang ? t[lang] : null;

  useEffect(() => {
    document.documentElement.lang = LANGS.find((l) => l.code === lang)?.htmlLang ?? 'en';
  }, [lang]);

  useEffect(() => {
    if (!lang) return;
    const hash = step === DONE ? '#done' : `#step-${step + 1}`;
    if (window.location.hash !== hash) history.replaceState(null, '', hash);
  }, [step, lang, DONE]);

  const pickLang = (code) => {
    setLang(code);
    saveLang(code);
  };

  const go = (n) => {
    setStep(Math.max(0, Math.min(DONE, n)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!lang) return <LanguagePicker onPick={pickLang} />;

  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 60) return;
    go(step + (dx < 0 ? 1 : -1));
  };

  return (
    <div className="min-h-[100svh]">
      <GuideHeader
        s={s}
        lang={lang}
        onLang={pickLang}
        step={step}
        total={TOTAL}
        done={step === DONE || showAll}
      />

      <main className="max-w-3xl mx-auto px-4 pt-5 pb-32 sm:pb-12">
        <div className="flex items-center justify-between gap-3 mb-4">
          <button
            onClick={() => {
              setLang(null);
              saveLang(null);
              history.replaceState(null, '', ' ');
            }}
            className="text-sm text-slate-400 hover:text-gold"
          >
            ← {LANGS.find((l) => l.code === lang).flag} {s.changeLang}
          </button>
          <button
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-sm text-slate-200 hover:border-gold"
          >
            {showAll ? <Square className="w-4 h-4" aria-hidden /> : <List className="w-4 h-4" aria-hidden />}
            {showAll ? s.showOne : s.showAll}
          </button>
        </div>

        {showAll ? (
          <div className="space-y-6">
            {visible.map((i, pos) => (
              <StepCard key={i} number={pos + 1} total={TOTAL} step={s.steps[i]} meta={STEPS[i]} s={s} />
            ))}
            <DoneScreen s={s} onRestart={() => { setShowAll(false); go(0); }} />
          </div>
        ) : (
          <>
            {/* Step dots */}
            <nav className="flex justify-center gap-2 mb-5" aria-label="Steps">
              {visible.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={s.stepOf(i + 1, TOTAL)}
                  aria-current={i === step ? 'step' : undefined}
                  className={`h-2.5 rounded-full transition-all ${
                    i === step ? 'w-8 bg-gold' : i < step ? 'w-2.5 bg-gold/50' : 'w-2.5 bg-white/20'
                  }`}
                />
              ))}
            </nav>

            <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              {step === DONE ? (
                <DoneScreen s={s} onRestart={() => go(0)} />
              ) : (
                <StepCard
                  key={`${lang}-${visible[step]}`}
                  number={step + 1}
                  total={TOTAL}
                  step={s.steps[visible[step]]}
                  meta={STEPS[visible[step]]}
                  s={s}
                />
              )}
            </div>

            {/* Back / Next — fixed to the bottom on phones for thumb reach */}
            {step !== DONE && (
              <div className="fixed sm:static bottom-0 inset-x-0 z-20 bg-navy/95 sm:bg-transparent backdrop-blur sm:backdrop-blur-0 border-t border-white/10 sm:border-0 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-0 sm:mt-6">
                <div className="max-w-3xl mx-auto flex gap-3">
                  <button
                    onClick={() => go(step - 1)}
                    disabled={step === 0}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 rounded-xl border border-white/15 px-5 py-3.5 font-semibold text-white disabled:opacity-30 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden /> {s.back}
                  </button>
                  <button
                    onClick={() => go(step + 1)}
                    className="flex-[2] sm:flex-none sm:ml-auto inline-flex items-center justify-center gap-1 rounded-xl bg-gold text-navy px-6 py-3.5 font-bold hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {step === TOTAL - 1 ? s.finish : s.next} <ChevronRight className="w-5 h-5" aria-hidden />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
