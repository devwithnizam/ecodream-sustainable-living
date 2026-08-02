import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  aspectRatio?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  onClick?: () => void;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  direction = 'up',
  aspectRatio,
  referrerPolicy = 'no-referrer',
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    let initialClip = 'inset(100% 0% 0% 0%)';
    if (direction === 'down') initialClip = 'inset(0% 0% 100% 0%)';
    if (direction === 'left') initialClip = 'inset(0% 0% 0% 100%)';
    if (direction === 'right') initialClip = 'inset(0% 100% 0% 0%)';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Curtain overlay wipe + scale reveal
      tl.fromTo(
        containerRef.current,
        {
          clipPath: initialClip,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power4.inOut',
        }
      ).fromTo(
        imageRef.current,
        {
          scale: 1.3,
        },
        {
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
        },
        '-=1.2'
      );

      if (overlayRef.current) {
        tl.fromTo(
          overlayRef.current,
          { scaleY: 1, transformOrigin: 'top' },
          { scaleY: 0, duration: 0.8, ease: 'power3.inOut' },
          '-=1.2'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Decorative curtain wipe layer */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-stone-900 z-20 pointer-events-none origin-top"
      />

      <img
        ref={imageRef}
        src={src}
        alt={alt}
        referrerPolicy={referrerPolicy}
        className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${imgClassName}`}
      />
    </div>
  );
};
