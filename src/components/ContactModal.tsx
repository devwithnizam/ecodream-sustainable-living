import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle, Mail, Phone, User, Calendar, MessageSquare } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Architectural Design',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

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
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg bg-stone-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                  Get In Touch
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Start Your Eco Project
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm mt-1">
                  Connect with our lead architects to discuss custom sustainable design.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Interest Area
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-stone-800 border border-white/15 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Architectural Design">Architectural Design & Build</option>
                    <option value="Off-Grid Retrofit">Off-Grid Energy Retrofit</option>
                    <option value="Sustainable Materials">Sustainable Materials Sourcing</option>
                    <option value="Site Feasibility">Site Feasibility Assessment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Project Vision / Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your plot location, timeline, or preferred features..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-white text-stone-900 font-bold hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 shadow-lg mt-4 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-white">Inquiry Received!</h4>
              <p className="text-stone-300 text-sm max-w-xs">
                Thank you, {formData.name || 'there'}! An EcoDream lead architect will reach out to you within 24 hours.
              </p>
            </motion.div>
          )}
        </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
