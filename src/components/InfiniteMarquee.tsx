import React from 'react';
import { Sun, Leaf, Building2, ShieldCheck, Award } from 'lucide-react';

export const InfiniteMarquee: React.FC = () => {
  const items = [
    { text: 'CARBON-NEGATIVE VILLAS', icon: Leaf },
    { text: 'AWWWARDS ARCHITECTURE 2026', icon: Award },
    { text: 'PASSIVE SOLAR DESIGN', icon: Sun },
    { text: '100% RECYCLED MATERIALS', icon: Building2 },
    { text: 'VERIFIED GREEN CERTIFICATION', icon: ShieldCheck },
  ];

  const fullItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-stone-900 text-stone-100 py-4 border-y border-stone-800 overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee marquee-mask">
        {fullItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center gap-3 mx-8 opacity-90 hover:opacity-100 transition-opacity group">
              <Icon className="w-4 h-4 text-emerald-400 shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
              <span className="text-xs font-bold uppercase tracking-widest font-mono text-stone-200">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
