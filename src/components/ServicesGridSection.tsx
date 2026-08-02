import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Home, Key, TrendingUp, Sun } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { SplitTextHeading } from './SplitTextHeading';

export const ServicesGridSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('House');

  const filterCategories = ['Commercial', 'Property', 'House', 'Store', 'Apartments'];

  return (
    <section className="w-full bg-[#FAF7F2] text-stone-900 py-20 sm:py-28 px-4 sm:px-8 border-t border-stone-300/80 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300/60 shadow-sm inline-block mb-3">
              Complete Property Lifecycle
            </span>
            <SplitTextHeading
              text="Expert Services for Buyers, Sellers, and Investors"
              className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif leading-tight max-w-xl"
            />
          </motion.div>

          {/* Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-wrap items-center gap-2 bg-stone-200/80 p-1.5 rounded-2xl border border-stone-300/80 shadow-sm"
          >
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-stone-900 text-white shadow-lg'
                    : 'text-stone-700 hover:bg-stone-300/60 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* 3 Services Cards Layout with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Buy a home (Col 4) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="md:col-span-4"
          >
            <TiltCard className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full">
              <div>
                <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-6 bg-stone-100">
                  <img
                    src="/src/assets/images/luxury_estate_card_1785609677319.jpg"
                    alt="Buy a home"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    BUY
                  </div>
                </div>

                <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
                  <Home className="w-4 h-4" />
                  <span>Buyer Concierge</span>
                </div>
                <h3 className="text-2xl font-bold font-serif text-stone-900 mb-2">
                  Buy a Home
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
                  Find your place with an immersive photo experience and the most listings, including sustainable smart homes.
                </p>
              </div>

              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-900 font-bold text-xs transition-all border border-stone-300/80 w-fit cursor-pointer mt-auto">
                <span>View Details</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </TiltCard>
          </motion.div>

          {/* Card 2: Selling a home (Col 4) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-4"
          >
            <TiltCard className="bg-stone-100 rounded-3xl p-6 border border-stone-300/80 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full">
              <div>
                <div className="p-3 rounded-2xl bg-stone-900 text-white w-fit mb-6">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>

                <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
                  <Sun className="w-4 h-4" />
                  <span>Seller Strategy</span>
                </div>
                <h3 className="text-2xl font-bold font-serif text-stone-900 mb-2">
                  Selling a Home
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
                  No matter what path you take to sell your home, we can help you navigate a successful, high-value transaction.
                </p>

                <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-4 bg-stone-200 border border-stone-300">
                  <img
                    src="/src/assets/images/luxury_lounge_interior_1785606574390.jpg"
                    alt="Selling property"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-emerald-600 text-white font-bold text-xs transition-all w-fit cursor-pointer mt-auto">
                <span>View Details</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </TiltCard>
          </motion.div>

          {/* Card 3: Rent a home (Col 4) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:col-span-4"
          >
            <TiltCard className="bg-stone-900 text-white rounded-3xl p-6 border border-stone-800 shadow-2xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full">
              <div>
                <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-6 bg-stone-800">
                  <img
                    src="/src/assets/images/luxury_villa_pool_1785609657531.jpg"
                    alt="Rent a home"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Embedded Floating Tags */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-stone-950/80 backdrop-blur-md text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/10">
                      Smart Home
                    </span>
                    <span className="bg-stone-950/80 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/10">
                      Property
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Key className="w-4 h-4" />
                  <span>Luxury Rental Network</span>
                </div>
                <h3 className="text-2xl font-bold font-serif text-white mb-2">
                  Rent a Home
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
                  We're creating a seamless online experience – from browsing verified rentals to digital key handover.
                </p>
              </div>

              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-xs transition-all w-fit cursor-pointer shadow-lg mt-auto">
                <span>View Details</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </TiltCard>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

