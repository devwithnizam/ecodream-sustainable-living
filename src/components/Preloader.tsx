import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onReveal: () => void;
}

const WORD = 'ECODREAM';

export const Preloader: React.FC<PreloaderProps> = ({ onReveal }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const onRevealRef = useRef(onReveal);
  const [done, setDone] = useState(false);

  onRevealRef.current = onReveal;

  useEffect(() => {
    if (done || !rootRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true);
      onRevealRef.current();
      return;
    }

    const ctx = gsap.context(() => {
      const numEl = rootRef.current?.querySelector<HTMLElement>('.pre-num');
      const counter = { v: 0 };

      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: () => setDone(true),
      });

      tl.fromTo(
        counter,
        { v: 0 },
        {
          v: 100,
          duration: 1.55,
          ease: 'power1.inOut',
          onUpdate: () => {
            if (numEl) numEl.textContent = String(Math.round(counter.v)).padStart(2, '0');
          },
        }
      )
        .fromTo(
          '.pre-letter',
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.55, stagger: 0.05 },
          0.05
        )
        .fromTo(
          '.pre-sub',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.2'
        )
        .fromTo(
          '.pre-line',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
          '-=0.45'
        )
        .to(
          '.pre-center',
          { opacity: 0, y: -24, duration: 0.4, ease: 'power3.in' },
          '+=0.15'
        )
        .add(() => onRevealRef.current(), 'curtain')
        .to(
          '.pre-panel-top',
          { yPercent: -100, duration: 1.2, ease: 'power4.inOut' },
          'curtain'
        )
        .to(
          '.pre-panel-bottom',
          { yPercent: 100, duration: 1.2, ease: 'power4.inOut' },
          'curtain'
        );
    }, rootRef);

    return () => ctx.revert();
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9990] pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Top / bottom curtains */}
      <div className="pre-panel-top absolute inset-x-0 top-0 h-[50vh] bg-stone-950 will-change-transform" />
      <div className="pre-panel-bottom absolute inset-x-0 bottom-0 h-[50vh] bg-stone-950 will-change-transform" />

      {/* Center brand content */}
      <div className="pre-center absolute inset-0 z-20 flex flex-col items-center justify-center gap-7">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(36rem_36rem_at_center,rgba(16,185,129,0.16),transparent_70%)]" />

        <div className="overflow-hidden px-4 py-1">
          <span className="flex text-white">
            {WORD.split('').map((ch, i) => (
              <span
                key={i}
                className="pre-letter inline-block text-4xl sm:text-6xl font-extrabold tracking-[0.28em] drop-shadow-[0_0_28px_rgba(52,211,153,0.35)] will-change-transform"
              >
                {ch}
              </span>
            ))}
          </span>
        </div>

        <span className="pre-sub -mt-2 text-[10px] sm:text-xs tracking-[0.55em] text-emerald-300/90 font-semibold uppercase">
          Sustainable Living
        </span>

        <div className="w-56">
          <div className="h-px bg-white/10 overflow-hidden rounded-full">
            <div className="pre-line h-full bg-emerald-400 rounded-full origin-left will-change-transform" />
          </div>
        </div>

        <span className="pre-num text-[10px] font-mono font-bold text-emerald-300/80 tracking-[0.4em] tabular-nums">
          00
        </span>
      </div>
    </div>
  );
};