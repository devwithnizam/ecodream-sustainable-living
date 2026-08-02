import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, Menu, X, ArrowUpRight, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  onNavigateSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navItems = [
    { label: 'Buy', section: 'services' },
    { label: 'Rent', section: 'services' },
    { label: 'Sell', section: 'services' },
    { label: 'About', section: 'advisors' },
    { label: 'Services', section: 'services' },
    { label: 'Home Loans', section: 'loans' },
    { label: 'Interiors', section: 'interiors' }
  ];

  // Scroll-aware glassmorphism: transparent at top, floating glass pill after scrolling.
  // Hides while scrolling down (immersive), glides back on scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      setScrolled(y > 48);
      if (y > 320 && delta > 4) {
        setHidden(true);
      } else if (y <= 320 || delta < -4) {
        setHidden(false);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 transition-all duration-500 ${
        scrolled
          ? 'py-3 mt-3 rounded-2xl dark-glass-panel shadow-2xl mx-3 sm:mx-6 lg:mx-auto'
          : 'py-5 bg-transparent'
      } ${hidden ? '-translate-y-[150%] opacity-0' : 'translate-y-0 opacity-100'}`}
    >
      {/* Brand Logo */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2.5 cursor-pointer group"
        onClick={() => onNavigateSection('home')}
      >
        <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-stone-900 transition-all duration-300 shadow-lg">
          <Sprout className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 text-emerald-400 group-hover:text-stone-900" />
        </div>
        <div className="flex flex-col">
          <span className="text-white text-xl font-extrabold tracking-wider font-serif group-hover:text-emerald-300 transition-colors leading-none">
            ECODREAM
          </span>
          <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-sans font-semibold mt-0.5">
            Sustainable Real Estate
          </span>
        </div>
      </motion.div>

      {/* Desktop Navigation Links */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="hidden lg:flex items-center gap-7 bg-stone-950/70 backdrop-blur-md px-6 py-2 rounded-full border border-white/15 shadow-2xl"
      >
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigateSection(item.section)}
            className="text-stone-200 hover:text-white text-xs font-bold tracking-wider uppercase transition-colors relative py-1 group cursor-pointer"
          >
            {item.label}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full rounded-full" />
          </button>
        ))}
      </motion.div>

      {/* Action Button */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex items-center"
      >
        <button
          onClick={onOpenContact}
          className="ripple-btn btn-shine px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-stone-950 bg-white hover:bg-emerald-400 hover:shadow-[0_0_35px_rgba(52,211,153,0.5)] transition-all duration-300 shadow-xl flex items-center gap-2 group cursor-pointer"
        >
          <span>Contact Us</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </motion.div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white cursor-pointer"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 right-4 left-4 bg-stone-950/95 backdrop-blur-xl border border-white/15 rounded-2xl p-6 shadow-2xl flex flex-col gap-3 lg:hidden z-50"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + i * 0.05, ease: 'easeOut' }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateSection(item.section);
                }}
                className="text-left text-stone-200 hover:text-white py-2 text-sm font-bold uppercase tracking-wider border-b border-white/10 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </motion.button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="mt-2 w-full py-3 rounded-xl bg-white text-stone-950 font-extrabold uppercase text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Advisory</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

