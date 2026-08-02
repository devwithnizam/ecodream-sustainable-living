import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hotspot } from '../types';
import { HOUSE_HOTSPOTS } from '../data';
import { Sun, Zap, Sprout, Wind, CheckCircle2 } from 'lucide-react';

interface InteractiveHotspotsProps {
  onSelectHotspot: (hotspot: Hotspot) => void;
}

export const InteractiveHotspots: React.FC<InteractiveHotspotsProps> = ({ onSelectHotspot }) => {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-4 h-4 text-amber-300" />;
      case 'Zap': return <Zap className="w-4 h-4 text-emerald-300" />;
      case 'Sprout': return <Sprout className="w-4 h-4 text-green-300" />;
      case 'Wind': return <Wind className="w-4 h-4 text-cyan-300" />;
      default: return <Zap className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {HOUSE_HOTSPOTS.map((hotspot) => {
        const isHovered = activeHoverId === hotspot.id;

        // Dynamic positioning class based on screen location to keep tooltips safely on-screen
        let tooltipPositionClass = "left-1/2 -translate-x-1/2 bottom-full mb-3";
        if (hotspot.x > 70) {
          tooltipPositionClass = "right-0 bottom-full mb-3";
        } else if (hotspot.x < 35) {
          tooltipPositionClass = "left-0 bottom-full mb-3";
        }

        return (
          <div
            key={hotspot.id}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          >
            {/* Hotspot Label Pin & Pulse */}
            <div className="relative group">
              <button
                onClick={() => onSelectHotspot(hotspot)}
                onMouseEnter={() => setActiveHoverId(hotspot.id)}
                onMouseLeave={() => setActiveHoverId(null)}
                className="relative flex items-center justify-center p-2 rounded-full cursor-pointer focus:outline-none"
                aria-label={hotspot.title}
              >
                <span className="absolute inline-flex h-8 w-8 rounded-full bg-emerald-400/30 animate-ping opacity-75" />
                <span className="relative inline-flex rounded-full h-6 w-6 bg-white/95 border-2 border-stone-900 shadow-2xl items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:bg-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-900 group-hover:bg-stone-950 transition-colors" />
                </span>
              </button>

              {/* Tag Pill next to hotspot */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden sm:block pointer-events-none">
                <span className="bg-stone-950/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity">
                  {hotspot.tag}
                </span>
              </div>
            </div>

            {/* Hover Tooltip Popup with Smooth Animation */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute ${tooltipPositionClass} w-64 bg-stone-950/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-4 shadow-2xl text-left pointer-events-none z-40`}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                      {getIcon(hotspot.iconName)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400 block">
                        {hotspot.tag}
                      </span>
                      <h5 className="text-xs font-bold text-white leading-tight">
                        {hotspot.title}
                      </h5>
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-300 mt-1.5 leading-relaxed">
                    {hotspot.description}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{hotspot.metric}</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-stone-400">Click to Inspect</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

