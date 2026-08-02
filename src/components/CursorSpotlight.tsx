import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CursorSpotlight: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const glow = glowRef.current;
    if (!wrap || !glow) return;
    // Skip on touch devices and reduced-motion
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const xTo = gsap.quickTo(wrap, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(wrap, 'y', { duration: 0.6, ease: 'power3.out' });
    const scaleTo = gsap.quickTo(glow, 'scale', { duration: 0.4, ease: 'power2.out' });
    const opacityTo = gsap.quickTo(glow, 'opacity', { duration: 0.4, ease: 'power2.out' });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Hover cursor scale: glow expands over interactive elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-hover-scale], input, textarea, select')) {
        scaleTo(1.45);
        opacityTo(0.7);
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-hover-scale], input, textarea, select')) {
        scaleTo(1);
        opacityTo(0.4);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed top-0 left-0 z-[60] will-change-transform hidden md:block"
      aria-hidden="true"
    >
      <div
        ref={glowRef}
        className="w-[42rem] h-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 mix-blend-screen will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.22), rgba(251, 191, 36, 0.08) 40%, transparent 70%)',
        }}
      />
    </div>
  );
};
