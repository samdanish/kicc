"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, CheckCircle2, ShieldCheck, Send, Sparkles } from "lucide-react";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function ConsultationPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destinationCountry: "",
    message: "",
  });

  // Trigger popup when scrolling past 800px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800 && !hasDismissed && !isSuccess) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasDismissed, isSuccess]);

  const handleClose = () => {
    setIsVisible(false);
    setHasDismissed(true); 
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "inquiries"), {
        ...formData,
        createdAt: serverTimestamp(),
        source: "Glassmorphism Scroll Popup",
      });
      setIsSuccess(true);
      
      // Auto-hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        // OVERLAY: Full screen blur and dark tint
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md"
        >
          {/* MODAL: Centered Glassmorphism Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-white/85 backdrop-blur-2xl border border-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-[2rem] overflow-hidden flex flex-col relative"
          >
            
            {/* Background Decorative Blobs for Aesthetic Colors */}
            <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-brand-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
            
            {/* Header: Vibrant Gradient */}
            <div className="bg-gradient-to-r from-brand-primary via-blue-600 to-indigo-600 p-6 flex items-center justify-between relative shadow-sm">
              <div className="relative z-10 text-white">
                <h3 className="font-black text-xl tracking-tight flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-200" /> Free Consultation
                </h3>
                <p className="text-white/80 text-xs font-medium mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Secure & Confidential
                </p>
              </div>
              <button 
                onClick={handleClose} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 relative min-h-[280px] flex flex-col z-10">
              
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="flex flex-col items-center justify-center flex-1 text-center py-8"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black text-brand-dark mb-2">Request Received!</h4>
                  <p className="text-sm text-slate-600 font-medium">Our expert counselors will reach out to you within 24 hours.</p>
                </motion.div>
              ) : (
                <>
                  {/* Progress Indicator */}
                  <div className="flex gap-2 mb-6">
                    {[1, 2, 3].map((i) => (
                      <div 
                        key={i} 
                        className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                          step >= i ? "bg-gradient-to-r from-brand-primary to-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.4)]" : "bg-slate-200"
                        }`} 
                      />
                    ))}
                  </div>

                  <form className="flex-1 flex flex-col" onSubmit={handleSubmit}>
                    
                    {/* STEP 1: Basic Info */}
                    {step === 1 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 flex-1">
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Full Name</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Email Address</label>
                          <input 
                            type="email" 
                            required 
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all shadow-sm"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Phone & Destination */}
                    {step === 2 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 flex-1">
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Phone Number</label>
                          <input 
                            type="tel" 
                            required 
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Destination Country</label>
                          <select 
                            required
                            value={formData.destinationCountry}
                            onChange={(e) => setFormData({...formData, destinationCountry: e.target.value})}
                            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all shadow-sm text-slate-700"
                          >
                            <option value="" disabled>Select a country</option>
                            <option value="UK">United Kingdom</option>
                            <option value="USA">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="India">India (Domestic)</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Message & Submit */}
                    {step === 3 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 flex-1">
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">How can we help? <span className="text-slate-400 font-normal lowercase">(Optional)</span></label>
                          <textarea 
                            rows={4}
                            placeholder="I am looking for masters programs in Computer Science..."
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all shadow-sm resize-none"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Footer Actions */}
                    <div className="flex gap-3 mt-8">
                      {step > 1 && (
                        <button 
                          type="button" 
                          onClick={handlePrev}
                          className="px-4 py-3 rounded-xl border border-slate-200/50 bg-white/50 hover:bg-white text-slate-500 font-bold transition-all shadow-sm flex items-center justify-center shrink-0"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                      )}
                      
                      {step < 3 ? (
                        <button 
                          type="button" 
                          onClick={handleNext}
                          disabled={
                            (step === 1 && (!formData.name || !formData.email)) || 
                            (step === 2 && (!formData.phone || !formData.destinationCountry))
                          }
                          className="flex-1 bg-gradient-to-r from-brand-primary to-blue-600 hover:from-blue-600 hover:to-brand-dark text-white rounded-xl font-bold text-sm py-3 flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-primary/20 disabled:opacity-50 disabled:shadow-none"
                        >
                          Continue <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="flex-1 bg-gradient-to-r from-brand-primary to-blue-600 hover:from-blue-600 hover:to-brand-dark text-white rounded-xl font-bold text-sm py-3 flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-primary/20 disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <span className="animate-pulse">Submitting securely...</span>
                          ) : (
                            <>Submit Request <Send className="w-4 h-4" /></>
                          )}
                        </button>
                      )}
                    </div>

                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}