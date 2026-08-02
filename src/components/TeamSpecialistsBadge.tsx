import React from 'react';
import { motion } from 'motion/react';
import { TEAM_SPECIALISTS } from '../data';
import { Users } from 'lucide-react';

interface TeamSpecialistsBadgeProps {
  onOpenTeam: () => void;
}

export const TeamSpecialistsBadge: React.FC<TeamSpecialistsBadgeProps> = ({ onOpenTeam }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      onClick={onOpenTeam}
      className="flex flex-col items-center sm:items-start text-center sm:text-left z-20 cursor-pointer group bg-black/20 hover:bg-black/40 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 transition-all duration-300 shadow-xl"
    >
      {/* Avatar Cluster */}
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2.5 overflow-hidden py-1">
          {TEAM_SPECIALISTS.slice(0, 3).map((member) => (
            <img
              key={member.id}
              src={member.avatar}
              alt={member.name}
              referrerPolicy="no-referrer"
              className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-stone-900 object-cover shadow-md transition-transform duration-300 group-hover:scale-110"
            />
          ))}
        </div>
        <span className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
          50+
        </span>
      </div>

      {/* Label */}
      <div className="mt-1 flex items-center gap-1.5 text-stone-200/90 text-xs sm:text-xs font-medium max-w-[200px] leading-snug">
        <span>Specialists dedicated to sustainable living</span>
      </div>
    </motion.div>
  );
};
