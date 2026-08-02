import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const tween = gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 'max',
        scrub: 0.3,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[80] h-[3px] pointer-events-none" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-emerald-500 via-emerald-300 to-amber-400 shadow-[0_0_12px_rgba(16,185,129,0.6)]"
      />
    </div>
  );
};
