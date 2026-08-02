import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Layers, CheckCircle, Shield, Leaf } from 'lucide-react';
import { MATERIAL_ITEMS } from '../data';

interface MaterialsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MaterialsDrawer: React.FC<MaterialsDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
          className="relative w-full max-w-2xl bg-stone-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white"
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Sustainable Materials Catalog</h3>
                <p className="text-xs text-stone-400">Carbon-Negative & Ethically Sourced Components</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {MATERIAL_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:border-amber-400/40 transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full sm:w-28 h-24 rounded-xl object-cover border border-white/15 shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-white text-base">{item.name}</h4>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold px-2 py-0.5 rounded-full shrink-0">
                      {item.ecoRating}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 mt-1">{item.description}</p>
                  <div className="mt-2.5 flex flex-wrap gap-3 text-[11px] text-stone-400">
                    <span className="flex items-center gap-1">
                      <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                      Offset: <strong className="text-white">{item.carbonOffset}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                      Origin: <strong className="text-white">{item.origin}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-right">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white text-stone-900 font-semibold text-xs hover:bg-amber-200 transition-colors"
            >
              Close Catalog
            </button>
          </div>
        </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
