import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sun, Heart, Check, Star } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { SplitTextHeading } from './SplitTextHeading';
import { ImageReveal } from './ImageReveal';

interface ProductItem {
  id: string;
  category: string;
  name: string;
  subtitle: string;
  price: string;
  rating: number;
  image: string;
  description: string;
  specs: string[];
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'lamp-cabinet',
    category: 'Lighting',
    name: 'Nordic Oak Nightstand & Lamp',
    subtitle: 'Handcrafted Solid Oak & Linen Shade',
    price: '$1,250',
    rating: 4.9,
    image: '/src/assets/images/luxury_lamp_cabinet_1785606543325.jpg',
    description: 'Precision-carved solid European white oak cabinet with integrated dimmable ambient lampshade.',
    specs: ['100% Certified Sustainable Oak', 'Touch Dimmable LED (2700K)', 'Hand-oiled VOC-free finish']
  },
  {
    id: 'luxe-armchair',
    category: 'Furniture',
    name: 'Soto Mid-Century Armchair',
    subtitle: 'Reclaimed Timber & Charcoal Leather',
    price: '$2,480',
    rating: 5.0,
    image: '/src/assets/images/luxury_chair_design_1785606529503.jpg',
    description: 'Ergonomically contoured armchair with FSC-certified teak frame and vegetable-tanned charcoal leather.',
    specs: ['Vegetable Tanned Top-Grain Leather', 'Mortise & Tenon Joinery', 'Lifetime Frame Warranty']
  },
  {
    id: 'organic-cushions',
    category: 'Textiles',
    name: 'Organic Linen Cushion Ensemble',
    subtitle: 'Natural Clay & Unbleached Flax',
    price: '$420',
    rating: 4.8,
    image: '/src/assets/images/luxury_decor_cushions_1785606558015.jpg',
    description: 'Set of three hand-woven Belgian linen cushions filled with eco-down alternative clusters.',
    specs: ['Organic GOTS Certified Linen', 'Hypoallergenic Recycled Fill', 'Removable Washable Covers']
  },
  {
    id: 'designer-lounge',
    category: 'Lounge',
    name: 'Velvet Pavilion Lounge & Rack',
    subtitle: 'Ambient Lighting & Coat Stand',
    price: '$3,150',
    rating: 4.9,
    image: '/src/assets/images/luxury_lounge_interior_1785606574390.jpg',
    description: 'Statement hallway ensemble featuring a brass-accented coat tree and organic curved bench.',
    specs: ['Solid Brass Details', 'Zero-Waste Wool Upholstery', 'Modular Assembly']
  }
];

export const InteriorsShowcaseSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);

  const filterCategories = ['All', 'Furniture', 'Lighting', 'Textiles', 'Lounge', 'Decor'];

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="relative w-full bg-[#FAF7F2] text-stone-900 py-16 sm:py-24 px-4 sm:px-8 border-t border-stone-300/60 overflow-hidden">
      {/* Subtle Background Aesthetic Patterns */}
      <div className="orb absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="orb orb-delay absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-900/5 border border-stone-900/10 text-stone-700 text-xs font-semibold tracking-wider uppercase mb-3"
            >
              <Sun className="w-3.5 h-3.5 text-amber-700" />
              <span>Curated Interior Craft</span>
            </motion.div>

            <SplitTextHeading
              text="Artisan Living & Timeless Aesthetics"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 font-serif leading-tight"
            />

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-stone-600 text-sm sm:text-base max-w-xl mt-3 leading-relaxed"
            >
              Pairing carbon-negative sustainable materials with refined Scandinavian and Japanese minimalist forms for modern luxury residences.
            </motion.p>
          </div>

          {/* Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-2 bg-stone-200/60 p-1.5 rounded-2xl border border-stone-300/80"
          >
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-stone-900 text-white shadow-lg'
                    : 'text-stone-700 hover:bg-stone-300/50 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Top 4 Showcase Cards Layout with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          
          {/* Card 1: Oak Lamp Cabinet (Col 7) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7"
          >
            <TiltCard
              onClick={() => setActiveModalProduct(PRODUCTS[0])}
              className="bg-stone-100 rounded-3xl p-5 border border-stone-300/80 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer relative flex flex-col justify-between h-full min-h-[380px]"
            >
              <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden mb-4 bg-stone-200">
                <ImageReveal
                  src={PRODUCTS[0].image}
                  alt={PRODUCTS[0].name}
                  direction="up"
                  className="w-full h-full"
                />
                <button
                  onClick={(e) => toggleLike(PRODUCTS[0].id, e)}
                  className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-stone-800 hover:text-rose-600 shadow-md transition-colors z-30"
                >
                  <Heart className={`w-4 h-4 ${likedItems[PRODUCTS[0].id] ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>
                <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 z-30">
                  {PRODUCTS[0].price}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 mt-auto">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                    {PRODUCTS[0].category}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 font-serif group-hover:text-amber-800 transition-colors">
                    {PRODUCTS[0].name}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0 group-hover:bg-amber-800 transition-colors">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 2: Mid-Century Armchair (Col 5) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-5"
          >
            <TiltCard
              onClick={() => setActiveModalProduct(PRODUCTS[1])}
              className="bg-stone-100 rounded-3xl p-5 border border-stone-300/80 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer relative flex flex-col justify-between h-full min-h-[380px]"
            >
              <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden mb-4 bg-stone-200">
                <ImageReveal
                  src={PRODUCTS[1].image}
                  alt={PRODUCTS[1].name}
                  direction="down"
                  className="w-full h-full"
                />
                <button
                  onClick={(e) => toggleLike(PRODUCTS[1].id, e)}
                  className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-stone-800 hover:text-rose-600 shadow-md transition-colors z-30"
                >
                  <Heart className={`w-4 h-4 ${likedItems[PRODUCTS[1].id] ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>
                <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 z-30">
                  {PRODUCTS[1].price}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 mt-auto">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                    {PRODUCTS[1].category}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 font-serif group-hover:text-amber-800 transition-colors">
                    {PRODUCTS[1].name}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0 group-hover:bg-amber-800 transition-colors">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 3: Organic Linen Cushion Set (Horizontal Banner Col 5) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-5"
          >
            <TiltCard
              onClick={() => setActiveModalProduct(PRODUCTS[2])}
              className="bg-amber-100/60 rounded-3xl p-5 border border-amber-300/60 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer relative flex flex-col justify-between h-full"
            >
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-4 bg-stone-200">
                <ImageReveal
                  src={PRODUCTS[2].image}
                  alt={PRODUCTS[2].name}
                  direction="left"
                  className="w-full h-full"
                />
                <button
                  onClick={(e) => toggleLike(PRODUCTS[2].id, e)}
                  className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-stone-800 hover:text-rose-600 shadow-md transition-colors z-30"
                >
                  <Heart className={`w-4 h-4 ${likedItems[PRODUCTS[2].id] ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>
                <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 z-30">
                  {PRODUCTS[2].price}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 mt-auto">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                    {PRODUCTS[2].category}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 font-serif group-hover:text-amber-800 transition-colors">
                    {PRODUCTS[2].name}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0 group-hover:bg-amber-800 transition-colors">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 4: Velvet Pavilion Lounge & Rack (Col 7) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:col-span-7"
          >
            <TiltCard
              onClick={() => setActiveModalProduct(PRODUCTS[3])}
              className="bg-stone-100 rounded-3xl p-5 border border-stone-300/80 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer relative flex flex-col justify-between h-full"
            >
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-4 bg-stone-200">
                <ImageReveal
                  src={PRODUCTS[3].image}
                  alt={PRODUCTS[3].name}
                  direction="right"
                  className="w-full h-full"
                />
                <button
                  onClick={(e) => toggleLike(PRODUCTS[3].id, e)}
                  className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-stone-800 hover:text-rose-600 shadow-md transition-colors z-30"
                >
                  <Heart className={`w-4 h-4 ${likedItems[PRODUCTS[3].id] ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>
                <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 z-30">
                  {PRODUCTS[3].price}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 mt-auto">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                    {PRODUCTS[3].category}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 font-serif group-hover:text-amber-800 transition-colors">
                    {PRODUCTS[3].name}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0 group-hover:bg-amber-800 transition-colors">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </TiltCard>
          </motion.div>

        </div>

        {/* Lower Story Banner & Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-stone-800"
        >
          {/* Background Glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Sustainable Philosophy
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mt-2 leading-tight">
              Crafted for Mindful Spaces & Generational Durability
            </h3>
            <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
              Every chair, lamp, and textile in our collection is created with non-toxic biopolymers, certified zero-VOC finishes, and ethically harvested timbers.
            </p>
            
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-stone-200">Zero Plastic Packaging</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-stone-200">10-Year Craft Warranty</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setActiveModalProduct(PRODUCTS[0])}
              className="px-8 py-4 rounded-full bg-white text-stone-900 font-bold text-sm hover:bg-emerald-300 transition-colors shadow-2xl cursor-pointer flex items-center gap-2 group"
            >
              <span>Explore Furniture Catalog</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.div>

      </div>

      {/* Product Quick View Modal */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProduct(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-stone-900 overflow-hidden"
            >
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="rounded-2xl overflow-hidden h-64 sm:h-80 bg-stone-100 border border-stone-200">
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    {activeModalProduct.category}
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-stone-900 mt-1">
                    {activeModalProduct.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-stone-600">
                      {activeModalProduct.rating} Rating
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                    {activeModalProduct.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-200 space-y-1.5">
                    {activeModalProduct.specs.map((sp, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{sp}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-2xl font-bold text-stone-900">
                      {activeModalProduct.price}
                    </span>
                    <button
                      onClick={() => {
                        alert(`Inquiry sent for ${activeModalProduct.name}. An interior consultant will contact you.`);
                        setActiveModalProduct(null);
                      }}
                      className="px-6 py-3 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-amber-800 transition-colors shadow-lg cursor-pointer"
                    >
                      Inquire Custom Order
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
