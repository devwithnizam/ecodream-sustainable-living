import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURED_PROPERTIES } from '../data';
import { PropertyItem } from '../types';
import { SplitTextHeading } from './SplitTextHeading';
import {
  ArrowUpRight,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Leaf,
  Heart,
  SlidersHorizontal,
  Check,
  Calendar,
  ShieldCheck,
  X,
  Star,
  Zap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedResidencesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePropertyModal, setActivePropertyModal] = useState<PropertyItem | null>(null);
  const [likedProperties, setLikedProperties] = useState<Record<string, boolean>>({});
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLElement>(null);

  const categories = ['All', ...Array.from(new Set(FEATURED_PROPERTIES.map((p) => p.category)))];

  const filteredProperties = selectedCategory === 'All'
    ? FEATURED_PROPERTIES
    : FEATURED_PROPERTIES.filter((p) => p.category === selectedCategory);

  const total = filteredProperties.length;

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedProperties((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Awwwards-style scroll animations: staggered card reveal + cinematic image zoom
  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.feat-card', containerRef.current);

      cards.forEach((card, i) => {
        const media = card.querySelector<HTMLElement>('.feat-media');
        const img = card.querySelector<HTMLElement>('.feat-img');
        const ghost = card.querySelector<HTMLElement>('.feat-ghost');

        // Staggered card reveal on scroll
        gsap.from(card, {
          y: 64,
          opacity: 0,
          scale: 0.95,
          duration: 0.9,
          ease: 'power3.out',
          delay: (i % 3) * 0.12,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            once: true,
          },
        });

        // Cinematic image zoom while scrolling through the card
        if (media && img) {
          gsap.fromTo(
            img,
            { scale: 1.28 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: media,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }

        // Ghost index counter-drift
        if (ghost) {
          gsap.fromTo(
            ghost,
            { yPercent: 40, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 1,
              ease: 'power3.out',
              delay: 0.15 + (i % 3) * 0.12,
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                once: true,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selectedCategory, filteredProperties.length]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#FAF7F2] text-stone-900 border-t border-stone-300/80 overflow-hidden">
      {/* Background ambient accents */}
      <div className="orb absolute top-[10%] left-[-10%] w-[34rem] h-[34rem] bg-emerald-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="orb orb-delay absolute bottom-[5%] right-[-5%] w-[38rem] h-[38rem] bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-10 lg:px-16 pt-10 sm:pt-14 pb-16 sm:pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100/90 border border-emerald-300/60 px-3 py-1 rounded-full text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2 shadow-sm">
              <Leaf className="w-3.5 h-3.5 text-emerald-700" />
              <span>The Collection — {total} Residences</span>
            </div>
            <SplitTextHeading
              text="Featured Eco-Residences"
              className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif leading-tight"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto bg-stone-200/60 p-1 rounded-full border border-stone-300/80 self-start md:self-auto">
            <span className="pl-2.5 text-stone-500 text-[11px] font-bold flex items-center gap-1 shrink-0">
              <SlidersHorizontal className="w-3 h-3 text-emerald-700" />
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {filteredProperties.map((prop, idx) => {
            const isLiked = !!likedProperties[prop.id];
            const isLoaded = !!loadedImages[prop.id];

            return (
              <article key={prop.id} className="feat-card group relative will-change-transform">
                <div className="relative h-full flex flex-col bg-white rounded-2xl border border-stone-200/80 overflow-hidden transition-all duration-500 hover:border-emerald-300/70 hover:shadow-[0_20px_50px_-18px_rgba(16,185,129,0.28)] hover:-translate-y-1">
                  {/* Image */}
                  <div className="feat-media relative aspect-[4/3] overflow-hidden bg-stone-200 transition-transform duration-700 group-hover:scale-[1.015]">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      referrerPolicy="no-referrer"
                      loading="eager"
                      decoding="async"
                      onLoad={() => setLoadedImages((prev) => ({ ...prev, [prop.id]: true }))}
                      className={`feat-img w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                    {/* Cinematic gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/55 via-stone-950/5 to-stone-950/20 pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />

                    {/* Shine sweep glare on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none" />

                    {/* Category badge */}
                    <span className="absolute top-3 left-3 bg-white/85 backdrop-blur-md text-stone-900 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm border border-white/40">
                      {prop.category}
                    </span>

                    {/* Like heart */}
                    <button
                      onClick={(e) => toggleLike(prop.id, e)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-colors z-10 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                        isLiked
                          ? 'bg-rose-50 text-rose-600'
                          : 'bg-white/85 text-stone-800 hover:text-rose-600'
                      }`}
                      title={isLiked ? 'Saved' : 'Save'}
                      aria-label={isLiked ? 'Saved' : 'Save'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
                    </button>

                    {/* Price chip */}
                    <div className="absolute bottom-3 left-3 bg-emerald-500 text-stone-950 text-xs font-black px-3 py-1 rounded-full shadow-lg">
                      {prop.price}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="feat-ghost text-[10px] font-mono font-bold tracking-widest text-stone-400">
                        0{idx + 1} / 0{total}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-black text-amber-600">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {prop.rating}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-extrabold leading-snug tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors duration-300">
                      {prop.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium min-w-0 mt-1.5">
                      <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{prop.location}</span>
                    </div>

                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-1 mt-1.5">
                      {prop.description}
                    </p>

                    {/* Compact spec strip */}
                    <div className="mt-3 grid grid-cols-3 gap-2 border-y border-stone-100 py-2.5">
                      <span className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-stone-700">
                        <Bed className="w-3.5 h-3.5 text-emerald-600" />
                        {prop.beds}
                      </span>
                      <span className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-stone-700 border-x border-stone-100">
                        <Bath className="w-3.5 h-3.5 text-emerald-600" />
                        {prop.baths}
                      </span>
                      <span className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-stone-700">
                        <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
                        {(prop.sqft / 1000).toFixed(1)}k
                      </span>
                    </div>

                    {/* Sustainable highlights (max 2) */}
                    {prop.tags && prop.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-2.5">
                        {prop.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
                          >
                            <Zap className="w-2.5 h-2.5 text-emerald-600" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA row */}
                    <div className="mt-auto pt-3 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setActivePropertyModal(prop)}
                        className="ripple-btn btn-shine group/btn inline-flex items-center gap-1.5 text-xs font-extrabold text-stone-900 hover:text-emerald-700 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                      >
                        <span>View Residence</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </button>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                        <ShieldCheck className="w-3 h-3" />
                        LEED
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Property Details Modal */}
      <AnimatePresence>
        {activePropertyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full text-stone-900 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-stone-200"
            >
              <button
                onClick={() => {
                  setActivePropertyModal(null);
                  setScheduleSuccess(false);
                }}
                className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-6 bg-stone-100">
                <img
                  src={activePropertyModal.image}
                  alt={activePropertyModal.title}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-white/20">
                  {activePropertyModal.category}
                </div>
                <div className="absolute bottom-4 left-4 bg-emerald-500 text-stone-950 text-sm font-black px-4 py-1.5 rounded-full shadow-lg">
                  {activePropertyModal.price}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-stone-500 text-xs">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">{activePropertyModal.location}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
                  {activePropertyModal.title}
                </h3>

                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {activePropertyModal.description}
                </p>

                {/* Specs Row */}
                <div className="grid grid-cols-3 gap-3 my-4 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-center">
                  <div>
                    <span className="text-[11px] font-bold text-stone-400 uppercase block">Bedrooms</span>
                    <span className="text-lg font-bold text-stone-900 flex items-center justify-center gap-1 mt-0.5">
                      <Bed className="w-4 h-4 text-emerald-600" />
                      {activePropertyModal.beds}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-stone-400 uppercase block">Bathrooms</span>
                    <span className="text-lg font-bold text-stone-900 flex items-center justify-center gap-1 mt-0.5">
                      <Bath className="w-4 h-4 text-emerald-600" />
                      {activePropertyModal.baths}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-stone-400 uppercase block">Living Area</span>
                    <span className="text-lg font-bold text-stone-900 flex items-center justify-center gap-1 mt-0.5">
                      <Maximize2 className="w-4 h-4 text-emerald-600" />
                      {activePropertyModal.sqft} sqft
                    </span>
                  </div>
                </div>

                {/* Tags / Features */}
                {activePropertyModal.tags && (
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <span className="text-xs font-bold text-stone-500 mr-1">Sustainable Highlights:</span>
                    {activePropertyModal.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1"
                      >
                        <Zap className="w-3 h-3 text-emerald-600" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Section */}
                <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Verified LEED Platinum Sustainable Residence</span>
                  </div>

                  {scheduleSuccess ? (
                    <div className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md">
                      <Check className="w-4 h-4" />
                      <span>Viewing Request Sent! Architect Assigned.</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setScheduleSuccess(true)}
                      className="w-full sm:w-auto px-6 py-3.5 bg-stone-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Schedule Private Architectural Tour</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
