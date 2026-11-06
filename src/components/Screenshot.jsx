import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ImageOff, X, ZoomIn } from 'lucide-react';

export default function Screenshot({ src, alt, highlight, phone, s }) {
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // stop the page scrolling behind the lightbox
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (failed) {
    return (
      <div className={`rounded-2xl border border-dashed border-white/20 bg-black/20 ${phone ? 'aspect-[9/16] max-w-[300px] mx-auto' : 'aspect-[16/10]'} flex flex-col items-center justify-center gap-2 text-center p-4`}>
        <ImageOff className="w-8 h-8 text-slate-500" aria-hidden />
        <p className="text-sm text-slate-400">{s.screenshotSoon}</p>
        <code className="text-xs text-slate-500">{src}</code>
      </div>
    );
  }

  const image = (
    <div className="relative">
      <img src={src} alt={alt} onError={() => setFailed(true)} className="block w-full h-auto" loading="lazy" />
      {highlight && (
        <span
          className="absolute rounded-lg ring-4 ring-red-500 shadow-[0_0_0_9999px_rgba(10,25,47,0.12)] animate-pulse pointer-events-none"
          style={{
            left: `${highlight.x}%`,
            top: `${highlight.y}%`,
            width: `${highlight.w}%`,
            height: `${highlight.h}%`,
          }}
          aria-hidden
        />
      )}
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`group relative block w-full ${phone ? 'max-w-[340px] mx-auto' : ''} overflow-hidden rounded-2xl border border-white/10 bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold`}
      >
        {image}
        <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs text-white">
          <ZoomIn className="w-3.5 h-3.5" aria-hidden /> {s.tapToZoom}
        </span>
      </button>

      {open &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 overflow-auto p-4 pt-16 flex items-start sm:items-center justify-center"
        >
          <button
            onClick={() => setOpen(false)}
            className="fixed top-3 right-3 z-10 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
            aria-label={s.close}
          >
            <X className="w-6 h-6" />
          </button>
          <div className={`w-full ${phone ? 'max-w-md' : 'max-w-5xl'}`} onClick={(e) => e.stopPropagation()}>
            {image}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
