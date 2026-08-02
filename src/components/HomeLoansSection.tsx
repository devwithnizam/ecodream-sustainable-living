import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LOAN_OPTIONS } from '../data';
import { Award, Percent, DollarSign, ArrowUpRight } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { SplitTextHeading } from './SplitTextHeading';

gsap.registerPlugin(ScrollTrigger);

export const HomeLoansSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const icons = [Award, Percent, DollarSign];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#FAF7F2] text-stone-900 py-24 sm:py-32 px-4 sm:px-8 border-t border-stone-300/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-800 bg-emerald-100/90 px-4 py-1.5 rounded-full border border-emerald-300/60 shadow-sm inline-block mb-4">
            Green Financing & Loans
          </span>
          <SplitTextHeading
            text="Why EcoDream Home Loans?"
            className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif leading-tight"
          />
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Acquiring a sustainable residence is a guided journey. Our dedicated green loan officers ensure predictable budgets, carbon-offset interest rates, and seamless online approvals.
          </p>
        </motion.div>

        {/* 3 Step Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Subtle Connecting Process Line */}
          <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-stone-300/60 -translate-y-1/2 z-0" />

          {LOAN_OPTIONS.map((loan, idx) => {
            const IconComp = icons[idx % icons.length];

            return (
              <div
                key={loan.id}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className="relative z-10 h-full"
              >
                <TiltCard className="flex flex-col items-center text-center bg-white p-8 rounded-3xl border border-stone-200/90 shadow-xl hover:shadow-2xl transition-all duration-300 group h-full justify-between">
                  <div>
                    {/* Circle Icon Badge */}
                    <div className="w-16 h-16 rounded-2xl bg-stone-900 text-emerald-400 flex items-center justify-center shadow-xl mb-6 mx-auto group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-stone-950 transition-all duration-300">
                      <IconComp className="w-8 h-8" />
                    </div>

                    <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full mb-3 inline-block border border-emerald-200">
                      {loan.badge}
                    </span>

                    <h3 className="text-2xl font-bold font-serif text-stone-900 mb-2">
                      {loan.title}
                    </h3>

                    <span className="text-sm font-extrabold text-emerald-700 mb-4 block font-sans">
                      {loan.rate}
                    </span>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xs mx-auto">
                      {loan.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 w-full flex items-center justify-center">
                    <span className="text-xs font-bold text-stone-700 group-hover:text-emerald-700 transition-colors flex items-center gap-1">
                      Learn More <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <button className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-stone-900 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm transition-all shadow-xl hover:shadow-2xl cursor-pointer group">
            <span>See All Loan Offerings</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
