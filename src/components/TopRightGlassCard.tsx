import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FeatureCategory } from '../types';
import { CATEGORY_DATA } from '../data';
import { Zap } from 'lucide-react';

interface TopRightGlassCardProps {
  onOpenDetails?: (category: FeatureCategory) => void;
}

export const TopRightGlassCard: React.FC<TopRightGlassCardProps> = ({ onOpenDetails }) => {
  const [selectedCategory, setSelectedCategory] = useState<FeatureCategory>('Energy Efficiency');
  const categories: FeatureCategory[] = ['Sustainable Living', 'Modern Architecture', 'Energy Efficiency'];

  const currentData = CATEGORY_DATA[selectedCategory];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full lg:max-w-xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl z-20 overflow-hidden relative group"
    >
      {/* Background Glow Effect */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      {/* Category Pills Header */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
                isActive
                  ? 'bg-white/25 border-white text-white shadow-md backdrop-blur-md'
                  : 'bg-white/5 border-white/15 text-stone-300 hover:bg-white/15 hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Content Layout with Right Thumbnail */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        {/* Text Area (Left 7 Cols) */}
        <div className="sm:col-span-7 flex flex-col justify-between h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-white font-semibold text-lg sm:text-xl tracking-tight mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-300" />
                {currentData.title}
              </h3>
              <p className="text-stone-200/90 text-xs sm:text-sm leading-relaxed font-normal">
                {currentData.description}
              </p>

              {/* Key Metrics */}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/10">
                {currentData.stats.map((st, idx) => (
                  <div key={idx}>
                    <span className="block text-xs text-stone-300/80 uppercase tracking-wider font-medium">{st.label}</span>
                    <span className="text-sm font-bold text-white">{st.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail Image (Right 5 Cols) */}
        <div className="sm:col-span-5 relative group/img cursor-pointer" onClick={() => onOpenDetails?.(selectedCategory)}>
          <div className="w-full h-36 sm:h-40 rounded-2xl overflow-hidden border border-white/25 shadow-lg relative bg-stone-800">
            <img
              src={currentData.image}
              alt={currentData.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-2.5 right-2.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] text-white font-medium flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-300" />
              <span>Inspect</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
