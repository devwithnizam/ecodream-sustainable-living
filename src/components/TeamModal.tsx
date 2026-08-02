import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Award, CheckCircle } from 'lucide-react';
import { TEAM_SPECIALISTS } from '../data';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose }) => {
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
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">50+ Sustainable Specialists</h3>
                <p className="text-xs text-stone-400">Architects, Energy Engineers & Material Scientists</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
            {TEAM_SPECIALISTS.map((member) => (
              <div
                key={member.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 hover:border-cyan-400/40 transition-colors"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-white/20 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{member.name}</h4>
                  <p className="text-xs font-semibold text-emerald-400 mt-0.5">{member.role}</p>
                  <span className="text-[10px] text-stone-400 mt-1 block flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-300" />
                    {member.expertise}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-right">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white text-stone-900 font-semibold text-xs hover:bg-cyan-200 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
