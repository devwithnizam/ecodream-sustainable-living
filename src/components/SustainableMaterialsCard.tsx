import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { MATERIAL_ITEMS } from '../data';

interface SustainableMaterialsCardProps {
  onOpenMaterials: () => void;
}

export const SustainableMaterialsCard: React.FC<SustainableMaterialsCardProps> = ({ onOpenMaterials }) => {
  const primaryMaterial = MATERIAL_ITEMS[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md bg-[#42372e]/80 backdrop-blur-xl border border-white/20 rounded-3xl p-4 sm:p-5 shadow-2xl z-20 group relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Left Material Image Container */}
        <div className="w-full sm:w-32 h-36 sm:h-36 rounded-2xl overflow-hidden border border-white/20 shrink-0 relative bg-stone-900">
          <img
            src={primaryMaterial.image}
            alt="Sustainable Materials"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-amber-200 border border-white/15 flex items-center gap-1 font-medium">
            <Layers className="w-3 h-3" />
            <span>Eco Timber</span>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col justify-between h-full py-0.5">
          <div>
            <h4 className="text-white font-semibold text-base sm:text-lg tracking-tight mb-1.5 flex items-center gap-1.5">
              Sustainable Materials
            </h4>
            <p className="text-stone-300/90 text-xs sm:text-xs leading-relaxed font-normal">
              {primaryMaterial.description}
            </p>
          </div>

          <button
            onClick={onOpenMaterials}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-amber-200 transition-colors group/btn self-start cursor-pointer"
          >
            <span>Learn more</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
