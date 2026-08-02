import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PARTNER_LOGOS } from '../data';
import { Building2, Home, Sun, Compass, ShieldCheck } from 'lucide-react';
import { InfiniteMarquee } from './InfiniteMarquee';
import { SplitTextHeading } from './SplitTextHeading';

gsap.registerPlugin(ScrollTrigger);

export const TrustedPartnersSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const partnerItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        partnerItemsRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getPartnerIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building': return <Building2 className="w-5 h-5 text-amber-700" />;
      case 'Home': return <Home className="w-5 h-5 text-emerald-700" />;
      case 'Sun': return <Sun className="w-5 h-5 text-cyan-700" />;
      case 'Compass': return <Compass className="w-5 h-5 text-stone-700" />;
      default: return <ShieldCheck className="w-5 h-5 text-emerald-800" />;
    }
  };

  return (
    <section ref={containerRef} className="w-full bg-[#FAF7F2] text-stone-900 pt-24 pb-16 px-4 sm:px-8 border-t border-stone-300/80 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        
        {/* Main Heading */}
        <SplitTextHeading
          text="Trusted Partner in Exceptional Architecture"
          className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif leading-tight max-w-3xl mx-auto"
        />

        {/* Subtitle Statement */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-stone-700 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-serif"
        >
          Your Trusted Ally in Property Investment: With extensive expertise and deep market insights, we guide you in making informed real estate decisions that perfectly align with your investment goals.
        </motion.p>

        {/* Partner Logos Strip with GSAP Stagger */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {PARTNER_LOGOS.map((partner, idx) => (
            <div 
              key={partner.name}
              ref={(el) => { partnerItemsRef.current[idx] = el; }}
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-2 rounded-xl bg-stone-100 shadow-inner group-hover:scale-110 group-hover:bg-emerald-50 transition-all">
                {getPartnerIcon(partner.icon)}
              </div>
              <span className="text-xs sm:text-sm font-extrabold tracking-tight uppercase text-stone-800 font-sans">
                {partner.name}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Infinite Awwwards Marquee Ribbon */}
      <InfiniteMarquee />
    </section>
  );
};
