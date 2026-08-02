import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
}

export const SplitTextHeading: React.FC<SplitTextHeadingProps> = ({
  text,
  as: Component = 'h2',
  className = '',
  delay = 0,
  stagger = 0.04,
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  const words = text.split(' ');

  useEffect(() => {
    if (!headingRef.current) return;

    const ctx = gsap.context(() => {
      const wordElements = headingRef.current?.querySelectorAll('.split-word-inner');
      if (wordElements && wordElements.length > 0) {
        gsap.fromTo(
          wordElements,
          {
            y: '110%',
            rotateX: -20,
            opacity: 0,
          },
          {
            y: '0%',
            rotateX: 0,
            opacity: 1,
            duration: 0.9,
            delay: delay,
            stagger: stagger,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, headingRef);

    return () => ctx.revert();
  }, [text, delay, stagger]);

  return (
    <Component ref={headingRef as any} className={`perspective-1000 ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-1 mr-[0.28em] align-top">
          <span className="split-word-inner inline-block transform-gpu origin-bottom">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};
