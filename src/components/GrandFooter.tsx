import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const GrandFooter: React.FC = () => {
  const wordRef = useRef<HTMLHeadingElement>(null);

  // Giant wordmark letter-mask reveal on scroll
  useEffect(() => {
    if (!wordRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('.foot-letter', {
        yPercent: 115,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.045,
        scrollTrigger: {
          trigger: wordRef.current,
          start: 'top 94%',
          once: true,
        },
      });
    }, wordRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="w-full bg-stone-950 text-white pt-20 pb-12 px-4 sm:px-8 overflow-hidden border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Upper Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-stone-800/80 items-start">
          
          {/* Left Email Column */}
          <div className="md:col-span-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
              Direct Contact & Enquiries
            </span>
            <a
              href="mailto:info.mdnizamuddin@gmail.com"
              className="text-xl sm:text-3xl font-extrabold text-white hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group font-serif"
            >
              <span>info.mdnizamuddin@gmail.com</span>
              <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <p className="text-stone-400 text-xs sm:text-sm mt-3 max-w-md leading-relaxed">
              Leading the transition to carbon-negative residential sanctuaries and zero-impact architectural engineering worldwide.
            </p>
          </div>

          {/* Right Navigation Columns */}
          <div className="md:col-span-6 grid grid-cols-3 gap-6">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Service</h5>
              <ul className="space-y-2.5 text-xs text-stone-300 font-medium">
                <li><a href="#interiors-showcase" className="hover:text-emerald-400 transition-colors">Saving & Loans</a></li>
                <li><a href="#interiors-showcase" className="hover:text-emerald-400 transition-colors">Join Accounts</a></li>
                <li><a href="#interiors-showcase" className="hover:text-emerald-400 transition-colors">Eco Portfolio</a></li>
                <li><a href="#interiors-showcase" className="hover:text-emerald-400 transition-colors">Smart Mortgages</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Help</h5>
              <ul className="space-y-2.5 text-xs text-stone-300 font-medium">
                <li><a href="#contact-section" className="hover:text-emerald-400 transition-colors">Customer Help</a></li>
                <li><a href="#contact-section" className="hover:text-emerald-400 transition-colors">Community</a></li>
                <li><a href="#contact-section" className="hover:text-emerald-400 transition-colors">Green Policy</a></li>
                <li><a href="#contact-section" className="hover:text-emerald-400 transition-colors">Security</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">About</h5>
              <ul className="space-y-2.5 text-xs text-stone-300 font-medium">
                <li><a href="#advisors-section" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
                <li><a href="#advisors-section" className="hover:text-emerald-400 transition-colors">Careers</a></li>
                <li><a href="#advisors-section" className="hover:text-emerald-400 transition-colors">Press Room</a></li>
                <li><a href="#advisors-section" className="hover:text-emerald-400 transition-colors">Architecture Lab</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Giant Brand Typography & Creator Credit */}
        <div className="pt-10 text-center select-none overflow-hidden flex flex-col items-center">
          <h1
            ref={wordRef}
            data-parallax="30"
            className="text-[clamp(2.5rem,11vw,8.5rem)] font-black tracking-tight uppercase text-stone-800/90 font-serif leading-none hover:text-white transition-colors duration-700 cursor-default select-none will-change-transform"
          >
            {'ECODREAM'.split('').map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom pb-2 -mb-2">
                <span className="foot-letter inline-block will-change-transform">{ch}</span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:bg-emerald-500 hover:text-stone-950 transition-all cursor-pointer group"
          >
            <span>Website made by</span>
            <span className="font-mono text-white group-hover:text-stone-950 underline decoration-emerald-400 decoration-2 font-bold">@devwithnizam</span>
          </motion.div>
        </div>

        {/* Sub-Footer Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>© {new Date().getFullYear()} EcoDream Real Estate. Website made by <strong className="text-stone-300">@devwithnizam</strong>. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1 text-stone-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
            <span>for Sustainable Living</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
