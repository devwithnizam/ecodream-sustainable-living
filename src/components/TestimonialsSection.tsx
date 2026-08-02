import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '../data';
import { Star, Quote, CheckCircle2, Building, Heart, Leaf } from 'lucide-react';
import { SplitTextHeading } from './SplitTextHeading';

gsap.registerPlugin(ScrollTrigger);

export const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [likedCard, setLikedCard] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedCard((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Codrops "Sticky Sections — Demo 3" pattern reworked:
      // each sticky panel smoothly collapses (scale + radius) as the next rises to fill the viewport
      cards.forEach((el, position) => {
        const isLast = position === cards.length - 1;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top top',
              end: '+=45%',
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          })
          .set(el, {
            transformOrigin: `50% ${isLast ? 100 : 0}%`,
          })
          .to(
            el,
            {
              ease: 'power2.inOut',
              scale: 0,
              borderRadius: '2.5rem',
              autoAlpha: isLast ? 1 : 0.15,
            },
            0
          );

        // Inner quote parallax for depth while the panel collapses
        const quote = el.querySelector<HTMLElement>('.t-quote');
        const card = el.querySelector<HTMLElement>('.t-card');
        if (quote && card) {
          gsap.fromTo(
            quote,
            { yPercent: 10 },
            {
              yPercent: -10,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAF7F2] text-stone-900 border-t border-stone-300/80 select-none"
    >
      {/* Background ambient lighting accents */}
      <div className="orb absolute top-[20%] left-[15%] w-[30rem] h-[30rem] bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="orb orb-delay absolute top-[60%] right-[10%] w-[30rem] h-[30rem] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Clean Top Header - No Indicators */}
      <div className="relative z-20 max-w-4xl w-full mx-auto px-4 sm:px-8 pt-20 sm:pt-28 pb-12 sm:pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-100/90 border border-emerald-300/60 px-3.5 py-1.5 rounded-full text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <Leaf className="w-3.5 h-3.5 text-emerald-700" />
          <span>Homeowner Endorsements</span>
        </div>
        <SplitTextHeading
          text="Endorsed by Visionary Homeowners"
          className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif leading-tight"
        />
      </div>

      {/* Sticky Scale-Down Stack */}
      <div className="relative">
        {TESTIMONIALS.map((item, idx) => {
          const isLiked = !!likedCard[item.id];

          return (
            <div
              key={item.id}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-8"
              style={{ zIndex: idx + 1 }}
            >
              <div className="relative w-full max-w-3xl t-card bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-2xl overflow-hidden group">
                {/* Background Decorative Quote Watermark */}
                <Quote className="absolute -right-4 -bottom-4 w-44 h-44 text-stone-100/90 -rotate-12 pointer-events-none group-hover:scale-110 group-hover:text-emerald-50/90 transition-transform duration-500" />

                {/* Top Accent Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-stone-800 to-amber-500" />

                {/* Card Header */}
                <div className="relative z-10 flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    {/* Star Rating Badge */}
                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80 shadow-sm">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-black text-amber-950 ml-1 font-sans">{item.rating}</span>
                    </div>

                    {/* Residence Tag */}
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300/60 shadow-sm flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{item.project}</span>
                    </span>
                  </div>

                  {/* Save Heart Action */}
                  <button
                    onClick={(e) => toggleLike(item.id, e)}
                    className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
                    title={isLiked ? 'Saved' : 'Save Testimonial'}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
                  </button>
                </div>

                {/* Main Quote Text */}
                <div className="relative z-10">
                  <p className="t-quote text-stone-900 text-lg sm:text-2xl font-serif leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Card Footer Profile */}
                <div className="relative z-10 flex items-center justify-between gap-4 pt-5 mt-6 border-t border-stone-200/80">
                  <div className="flex items-center gap-3.5">
                    <div className="relative shrink-0">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-md group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-0.5 rounded-full border border-white shadow-sm">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-stone-900 font-sans leading-snug">{item.name}</h4>
                      <p className="text-xs text-stone-500 font-semibold">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
