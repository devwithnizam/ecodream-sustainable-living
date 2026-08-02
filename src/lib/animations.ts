import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Respect users who prefer reduced motion — reveals become instant. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export type RevealStyle =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'fade'
  | 'zoom'
  | 'soft'
  | 'screen';

const REVEAL_FROM: Record<Exclude<RevealStyle, 'soft' | 'screen'>, gsap.TweenVars> = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: -56 },
  right: { x: 56 },
  fade: {},
  zoom: { scale: 0.88 },
};

/**
 * Modern "open screen" reveal system.
 *
 * Two behaviors, chosen by the data-reveal value:
 *
 *   Scroll-scrubbed section opens (elements scroll into the viewport with the
 *   page — no dead/blank band at the top):
 *     data-reveal="soft" | data-reveal="screen"
 *
 *   One-shot staggered entrances (smaller elements, play once):
 *     data-reveal="up|down|left|right|fade|zoom"
 *
 * Optional knobs (one-shot only):
 *   data-reveal-delay="0.2"  (seconds)
 *   data-reveal-dur="1.0"    (seconds)
 */
export function initReveals(scope: ParentNode = document) {
  if (prefersReducedMotion()) return [];

  const triggers: ScrollTrigger[] = [];
  const items = (scope as HTMLElement).querySelectorAll<HTMLElement>('[data-reveal]');

  items.forEach((el) => {
    const style = (el.dataset.reveal || 'up') as RevealStyle;
    const delay = parseFloat(el.dataset.revealDelay || '0') || 0;
    const duration = parseFloat(el.dataset.revealDur || '1') || 1;

    // Scroll-scrubbed section open: follows the scroll position exactly, so the
    // section never sits blank while waiting — it renders while it enters.
    if (style === 'soft' || style === 'screen') {
      const tween = gsap.fromTo(
        el,
        { y: style === 'screen' ? 90 : 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: style === 'screen' ? 'top 15%' : 'top 35%',
            scrub: 0.7,
          },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      return;
    }

    const from = REVEAL_FROM[style] || REVEAL_FROM.up;

    const tween = gsap.fromTo(
      el,
      { ...from, opacity: 0 },
      {
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      }
    );

    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  return triggers;
}

/**
 * Scroll-linked parallax drift.
 *
 *   <div data-parallax="40">    → drifts +40px as the element crosses the viewport
 *   <div data-parallax="-24">   → drifts in the opposite direction
 */
export function initParallax(scope: ParentNode = document) {
  if (prefersReducedMotion()) return [];

  const triggers: ScrollTrigger[] = [];
  const items = (scope as HTMLElement).querySelectorAll<HTMLElement>('[data-parallax]');

  items.forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || '30') || 0;
    const tween = gsap.fromTo(
      el,
      { y: 0 },
      {
        y: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  return triggers;
}

/** Kill every ScrollTrigger owned by a previous reveal/parallax pass. */
export function killTriggers(triggers: ScrollTrigger[]) {
  triggers.forEach((t) => t.kill());
}