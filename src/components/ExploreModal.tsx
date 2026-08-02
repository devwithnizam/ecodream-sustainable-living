import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ChevronRight, Sun, ShieldCheck, Home } from 'lucide-react';

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTour: () => void;
}

export const ExploreModal: React.FC<ExploreModalProps> = ({ isOpen, onClose, onBookTour }) => {
  const [activeTab, setActiveTab] = useState<'tour' | 'specs' | 'sustainability'>('tour');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-stone-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-300">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  EcoDream House Tour
                </h3>
                <p className="text-xs sm:text-sm text-stone-400">
                  Next-Generation Sustainable Luxury Living
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 my-6">
            {[
              { id: 'tour', label: 'Overview' },
              { id: 'specs', label: 'Technical Specs' },
              { id: 'sustainability', label: 'Eco Metrics' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === t.id
                    ? 'bg-white text-stone-900 shadow-md'
                    : 'bg-white/5 text-stone-300 hover:bg-white/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'tour' && (
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden h-64 border border-white/15 bg-stone-800">
                <img
                  src="/src/assets/images/ecodream_hero_house_1785606186489.jpg"
                  alt="EcoDream Pavilion"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                      Architectural Masterpiece
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1">
                      Desert Pavilion Model 01
                    </h4>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <Home className="w-5 h-5 text-amber-300 mb-2" />
                  <span className="text-xs text-stone-400">Total Footprint</span>
                  <p className="text-base font-bold text-white">4,200 sq. ft</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <Sun className="w-5 h-5 text-emerald-300 mb-2" />
                  <span className="text-xs text-stone-400">Solar Autonomy</span>
                  <p className="text-base font-bold text-white">100% Off-Grid</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <ShieldCheck className="w-5 h-5 text-cyan-300 mb-2" />
                  <span className="text-xs text-stone-400">Warranty</span>
                  <p className="text-base font-bold text-white">50 Year Structural</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-3 text-sm">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                <span className="text-stone-300">Foundation</span>
                <span className="font-semibold text-white">Low-Carbon Geothermal Concrete</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                <span className="text-stone-300">Glass Façade</span>
                <span className="font-semibold text-white">Smart Electrochromic Triple Vacuum</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                <span className="text-stone-300">HVAC System</span>
                <span className="font-semibold text-white">Passive Thermal Siphon & Heat Recovery</span>
              </div>
            </div>
          )}

          {activeTab === 'sustainability' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-emerald-200">Carbon Negative Construction</h5>
                  <p className="text-xs text-emerald-300/80 mt-1">
                    Every cubic meter of cross-laminated timber sequestered more atmospheric CO2 during growth than was emitted during fabrication.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer CTA */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-stone-400">
              Ready to build your sustainable dream home?
            </span>
            <button
              onClick={() => {
                onClose();
                onBookTour();
              }}
              className="px-6 py-3 rounded-xl bg-white text-stone-900 font-bold hover:bg-stone-200 transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Schedule Private Consultation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
