import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { SplitTextHeading } from './SplitTextHeading';

export const ContactAndMapSection: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activePin, setActivePin] = useState(0);

  const mapPins = [
    {
      id: 0,
      name: 'Tranquil Vista Residences',
      address: '654 Prevail Hills, San Francisco',
      image: '/src/assets/images/luxury_estate_card_1785609677319.jpg',
      x: 55,
      y: 42
    },
    {
      id: 1,
      name: 'Malibu Ocean Glass Pavilion',
      address: '882 Vista Rim, Malibu',
      image: '/src/assets/images/luxury_villa_pool_1785609657531.jpg',
      x: 35,
      y: 65
    },
    {
      id: 2,
      name: 'Aspen Timber Sanctuary',
      address: '120 Pines Canyon, Aspen',
      image: '/src/assets/images/luxury_lounge_interior_1785606574390.jpg',
      x: 72,
      y: 30
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <section className="relative w-full bg-[#FAF7F2] text-stone-900 py-20 sm:py-28 px-4 sm:px-8 border-t border-stone-300/80 overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="orb absolute top-[12%] right-[4%] w-[28rem] h-[28rem] bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="orb orb-delay absolute bottom-[8%] left-[-4%] w-[30rem] h-[30rem] bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-xl"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 inline-block mb-3">
            Consultation & Advisory
          </span>
          <SplitTextHeading
            text="Let's Get In Touch"
            className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif leading-tight"
          />
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Ready to find your dream home, make a smart investment, or need real estate advice? We're here to assist you.
          </p>
        </motion.div>

        {/* Grid: Form (Left) & Interactive Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Form Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 bg-white rounded-3xl p-8 border border-stone-200/90 shadow-xl flex flex-col justify-between"
          >
            {submitted ? (
              <div className="my-auto text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-stone-900">Message Received</h3>
                <p className="text-stone-600 text-sm mt-2 max-w-md mx-auto">
                  Thank you for reaching out. An architectural specialist will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-stone-600 block mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-300/80 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-stone-600 block mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-300/80 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-stone-600 block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-300/80 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-stone-600 block mb-1">Phone</label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-300/80 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-stone-600 block mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your project vision, budget, or loan inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-300/80 text-sm focus:outline-none focus:border-stone-900 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="ripple-btn btn-shine w-full bg-stone-900 hover:bg-emerald-600 hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] text-white font-extrabold py-4 px-6 rounded-2xl transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <span className="text-xs uppercase tracking-wider">Submit Request</span>
                </button>
              </form>
            )}
          </motion.div>

          {/* Right Map Column (Stylized GIS Map with Property Pins) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 bg-stone-200 rounded-3xl border border-stone-300/90 shadow-xl overflow-hidden relative min-h-[420px] flex items-center justify-center"
          >
            {/* Map Topographic Canvas Texture */}
            <div className="absolute inset-0 bg-[#e3ddd1] opacity-90 pointer-events-none" />
            <div 
              className="absolute inset-0 pointer-events-none opacity-20" 
              style={{
                backgroundImage: 'radial-gradient(#8b8171 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Simulated Road Grid SVG Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" stroke="#6e6556" strokeWidth="2" fill="none">
              <path d="M 0,100 Q 200,180 400,120 T 800,200" />
              <path d="M 100,0 Q 180,300 120,600" />
              <path d="M 300,0 Q 320,250 500,600" strokeWidth="3" />
              <path d="M 0,350 Q 300,300 800,450" strokeWidth="3" />
            </svg>

            {/* Location Map Pins */}
            {mapPins.map((pin) => (
              <button
                key={pin.id}
                onClick={() => setActivePin(pin.id)}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer transition-transform duration-300 ${
                  activePin === pin.id ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                }`}
              >
                <div className={`p-2 rounded-full shadow-2xl flex items-center justify-center relative ${
                  activePin === pin.id ? 'bg-stone-900 text-emerald-400 border-2 border-white' : 'bg-stone-800 text-white'
                }`}>
                  {activePin === pin.id && (
                    <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping" />
                  )}
                  <MapPin className="w-5 h-5" />
                </div>
              </button>
            ))}

            {/* Active Pin Card Popup overlay on map */}
            <div className="absolute bottom-6 left-6 right-6 z-40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePin}
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-stone-300 shadow-2xl flex items-center gap-4"
                >
                  <img
                    src={mapPins[activePin].image}
                    alt={mapPins[activePin].name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-stone-200"
                  />
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                      Verified Location
                    </span>
                    <h4 className="text-sm font-bold font-serif text-stone-900 truncate">
                      {mapPins[activePin].name}
                    </h4>
                    <p className="text-xs text-stone-600 truncate mt-0.5">
                      {mapPins[activePin].address}
                    </p>

                    <button
                      onClick={() => alert(`Directions loaded for ${mapPins[activePin].name}`)}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-white text-[10px] font-bold hover:bg-emerald-600 transition-colors cursor-pointer"
                    >
                      <Navigation className="w-3 h-3 text-emerald-400" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
