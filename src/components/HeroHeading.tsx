import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface HeroHeadingProps {
  onExplore: () => void;
  started?: boolean;
}

const LINES: string[][] = [
  ['YOUR', 'VISION'],
  ['OF', 'SUSTAINABLE'],
  ['LIVING']
];

export const HeroHeading: React.FC<HeroHeadingProps> = ({ onExplore, started = false }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroTl = useRef<gsap.core.Timeline | null>(null);
  const [typed, setTyped] = useState('');

  // Cinematic split-text reveal: masked words rise with blur-to-sharp
  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(
        '.hero-word',
        { yPercent: 120, rotateX: -30, opacity: 0, filter: 'blur(10px)' },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.15,
          ease: 'power4.out',
          stagger: 0.09,
          clearProps: 'filter',
        }
      ).fromTo(
        '.hero-cta',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', immediateRender: true },
        '-=0.4'
      );
      heroTl.current = tl;
    }, rootRef);

    return () => {
      ctx.revert();
      heroTl.current = null;
    };
  }, []);

  // Play hero choreography once the page intro reveals the curtain
  useEffect(() => {
    if (!started || !heroTl.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroTl.current.progress(1);
      return;
    }
    heroTl.current.play();
  }, [started]);

  // Typewriter eyebrow
  useEffect(() => {
    if (!started) {
      setTyped('');
      return;
    }
    const text = 'PIONEERING SUSTAINABLE LUXURY';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(text);
      return;
    }
    let i = 0;
    setTyped('');
    const timer = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, 45);
    return () => clearInterval(timer);
  }, [started]);

  return (
    <div ref={rootRef} className="flex flex-col items-start max-w-2xl text-left z-20" style={{ perspective: 1000 }}>
      {/* Typewriter eyebrow */}
      <div className="mb-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-emerald-300/30 rounded-full px-4 py-1.5 max-w-full overflow-hidden">
        <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.14em] sm:tracking-[0.2em] text-emerald-300 min-h-4 whitespace-nowrap">
          {typed}
          <span className="ml-0.5 inline-block w-2 h-3.5 bg-emerald-400/80 align-middle animate-pulse" />
        </span>
      </div>

      <h1 className="text-white font-extrabold tracking-tight uppercase leading-[0.95] text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl select-none">
        {LINES.map((line, li) => (
          <span key={li} className="block mt-1 overflow-hidden pb-[0.14em] -mb-[0.14em]" style={{ perspective: 1000 }}>
            <span className="flex flex-wrap items-center gap-x-3 sm:gap-x-4">
              {line.map((word, wi) => (
                <span
                  key={`${li}-${wi}`}
                  className={`hero-word inline-block drop-shadow-md will-change-transform ${
                    word === 'LIVING' ? 'text-gradient-animate' : ''
                  }`}
                >
                  {word}
                </span>
              ))}
            </span>
          </span>
        ))}

        {/* Lets Explore Pill Button with Magnetic Effect */}
        <div className="hero-cta mt-6 sm:mt-8">
          <MagneticButton
            onClick={onExplore}
            className="ripple-btn btn-shine inline-flex items-center gap-2 sm:gap-2.5 bg-white hover:bg-stone-100 hover:shadow-[0_0_45px_rgba(52,211,153,0.45)] text-stone-900 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-base tracking-normal normal-case shadow-2xl transition-all duration-300 border border-white/40 cursor-pointer group"
          >
            <span>Lets Explore</span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-stone-900 text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
          </MagneticButton>
        </div>
      </h1>
    </div>
  );
};
