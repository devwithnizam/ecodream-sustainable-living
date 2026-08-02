import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollPercent(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-stone-900/20">
      <div
        className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(16,185,129,0.8)]"
        style={{ width: `${scrollPercent}%` }}
      />
    </div>
  );
};
