import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hotspot } from '../types';
import { X, Check, Sun, Zap, Sprout, Wind, ShieldCheck } from 'lucide-react';

interface HotspotModalProps {
  hotspot: Hotspot | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const HotspotModal: React.FC<HotspotModalProps> = ({ hotspot, onClose, onOpenContact }) => {
  if (!hotspot) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-6 h-6 text-amber-300" />;
      case 'Zap': return <Zap className="w-6 h-6 text-emerald-300" />;
      case 'Sprout': return <Sprout className="w-6 h-6 text-green-300" />;
      case 'Wind': return <Wind className="w-6 h-6 text-cyan-300" />;
      default: return <Zap className="w-6 h-6 text-white" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg bg-stone-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5 mb-4">
            <div className="p-3 rounded-2xl bg-white/10 border border-white/20">
              {getIcon(hotspot.iconName)}
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                {hotspot.tag}
              </span>
              <h3 className="text-xl font-bold text-white">{hotspot.title}</h3>
            </div>
          </div>

          <p className="text-sm text-stone-300 leading-relaxed my-4">
            {hotspot.description}
          </p>

          <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3 my-4">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="text-xs text-emerald-300/80 uppercase font-semibold">Verified Spec</span>
              <p className="text-sm font-bold text-white">{hotspot.metric}</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/10 text-stone-300 font-medium text-xs hover:bg-white/20 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-5 py-2.5 rounded-xl bg-white text-stone-900 font-bold text-xs hover:bg-emerald-300 transition-colors shadow-lg"
            >
              Request Custom Option
            </button>
          </div>
        </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
