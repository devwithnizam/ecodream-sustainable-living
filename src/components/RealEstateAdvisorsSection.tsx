import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Building2, Award, Home, ArrowUpRight } from 'lucide-react';
import { SplitTextHeading } from './SplitTextHeading';
import { ImageReveal } from './ImageReveal';

gsap.registerPlugin(ScrollTrigger);

export const RealEstateAdvisorsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Animated count-up stats on scroll
  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.stat-num', sectionRef.current).forEach((numEl) => {
        const text = numEl.dataset.target ?? '';
        const match = text.match(/^([\d.]+)(.*)$/);
        if (!match) return;

        const target = parseFloat(match[1]);
        const suffix = match[2];
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: numEl,
            start: 'top 88%',
            once: true,
          },
          onUpdate: () => {
            numEl.textContent = Math.round(obj.val) + suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      id: '1',
      number: '18k+',
      label: 'Satisfied Customers',
      icon: Users,
      highlight: false
    },
    {
      id: '2',
      number: '17k+',
      label: 'Total Partners',
      icon: Building2,
      highlight: true // Dark card in reference
    },
    {
      id: '3',
      number: '13+',
      label: 'Years of Experience',
      icon: Award,
      highlight: false
    },
    {
      id: '4',
      number: '14k+',
      label: 'Properties Available',
      icon: Home,
      highlight: false
    }
  ];

  return (
    <section ref={sectionRef} className="relative w-full bg-[#FAF7F2] text-stone-900 py-20 sm:py-28 px-4 sm:px-8 border-t border-stone-300/80 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 inline-block mb-3">
              Pioneering Luxury & Ecology
            </span>
            <SplitTextHeading
              text="Your Trusted Real Estate & Architecture Advisors"
              className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif leading-tight"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-stone-600 text-sm sm:text-base max-w-md leading-relaxed"
          >
            Discover the epitome of luxury living in this offering sweeping panoramic ocean and desert views from every room, constructed with carbon-neutral materials.
          </motion.p>
        </div>

        {/* Content Grid: Photo + Stat Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Big Architecture Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 bg-stone-900 rounded-3xl overflow-hidden shadow-2xl relative min-h-[400px] group border border-stone-300"
          >
            <ImageReveal
              src="/src/assets/images/luxury_villa_pool_1785609657531.jpg"
              alt="Panoramic Glass Villa with Illuminated Pool"
              direction="left"
              className="w-full h-full min-h-[400px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent z-30 pointer-events-none" />
            
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white z-30">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Featured Residence</span>
                <h3 className="text-xl font-bold font-serif text-white mt-1">Malibu Glass Ocean Pavilion</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-white text-stone-900 flex items-center justify-center shadow-lg group-hover:bg-emerald-400 transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: 2x2 Stat Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 hover:shadow-2xl ${
                  stat.highlight
                    ? 'bg-stone-900 text-white border-stone-800 shadow-xl'
                    : 'bg-white text-stone-900 border-stone-200/80 shadow-md hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-2xl ${stat.highlight ? 'bg-stone-800 text-emerald-400' : 'bg-stone-100 text-stone-800'}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-bold tracking-widest uppercase ${stat.highlight ? 'text-stone-400' : 'text-stone-500'}`}>
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h4
                    className="stat-num text-4xl sm:text-5xl font-extrabold tracking-tight font-sans mb-2 tabular-nums"
                    data-target={stat.number}
                  >
                    {stat.number}
                  </h4>
                  <p className={`text-sm font-semibold ${stat.highlight ? 'text-stone-300' : 'text-stone-600'}`}>
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
