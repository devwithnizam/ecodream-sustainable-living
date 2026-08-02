import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface ValuePropBlockProps {
  onOpenPhilosophy: () => void;
}

export const ValuePropBlock: React.FC<ValuePropBlockProps> = ({ onOpenPhilosophy }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-xs sm:max-w-sm flex flex-col items-start gap-2.5 z-20 text-left"
    >
      <p className="text-stone-200/90 text-xs sm:text-sm leading-relaxed font-normal drop-shadow">
        We work with you to create a home that meets your unique needs and preferences, blending luxury with sustainability.
      </p>

      <button
        onClick={onOpenPhilosophy}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white hover:text-emerald-300 transition-colors group cursor-pointer"
      >
        <span>Learn more</span>
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </motion.div>
  );
};
