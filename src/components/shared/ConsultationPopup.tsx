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

  // 1. Trigger popup when scrolling past 800px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800 && !hasDismissed && !isSuccess) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasDismissed, isSuccess]);

  // 2. Lock background scrolling when popup is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    // Cleanup function in case component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

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
        // OVERLAY: Deepened to black/60 for max contrast against the bright popup
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
        >
          {/* WRAPPER: Holds both the blurred background blobs and the glass modal */}
          <div className="relative w-full max-w-md">
            
            {/* VIBRANT BACKGROUND BLOBS: Added slight saturation for more pop */}
            <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-[70px] opacity-80 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[70px] opacity-80 animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[20%] left-[20%] w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-[70px] opacity-70 animate-pulse" style={{ animationDelay: '4s' }} />

            {/* MODAL: Brightened to white/85 with a crisp white border and deep shadow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full relative bg-white/85 backdrop-blur-2xl border-2 border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] rounded-[2rem] overflow-hidden flex flex-col"
            >
              
              {/* Header */}
              <div className="p-6 pb-4 border-b border-black/10 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-2xl text-black tracking-tighter flex items-center gap-2 drop-shadow-sm">
                    <Sparkles className="w-5 h-5 text-black" /> Free Consultation
                  </h3>
                  <p className="text-black/70 text-xs font-bold mt-1 flex items-center gap-1.5 uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4" /> Secure & Confidential
                  </p>
                </div>
                <button 
                  onClick={handleClose} 
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 text-black hover:bg-black/15 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 relative min-h-[300px] flex flex-col">
                
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="flex flex-col items-center justify-center flex-1 text-center py-8"
                  >
                    <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mb-5 shadow-xl shadow-black/20">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-3xl font-black text-black mb-2 tracking-tighter">Request Received</h4>
                    <p className="text-sm text-black/70 font-bold">Our expert counselors will reach out to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <>
                    {/* Progress Indicator */}
                    <div className="flex gap-2 mb-8">
                      {[1, 2, 3].map((i) => (
                        <div 
                          key={i} 
                          className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                            step >= i ? "bg-black shadow-[0_0_10px_rgba(0,0,0,0.3)]" : "bg-black/10"
                          }`} 
                        />
                      ))}
                    </div>

                    <form className="flex-1 flex flex-col" onSubmit={handleSubmit}>
                      
                      {/* STEP 1: Basic Info */}
                      {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5 flex-1">
                          <div>
                            <label className="text-[11px] font-black text-black uppercase tracking-widest mb-2 block drop-shadow-sm">Full Name</label>
                            <input 
                              type="text" 
                              required 
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="w-full px-5 py-3.5 bg-white/90 backdrop-blur-md border border-black/10 rounded-xl text-black font-bold placeholder:text-black/40 focus:outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-black/10 transition-all shadow-sm"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-black text-black uppercase tracking-widest mb-2 block drop-shadow-sm">Email Address</label>
                            <input 
                              type="email" 
                              required 
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full px-5 py-3.5 bg-white/90 backdrop-blur-md border border-black/10 rounded-xl text-black font-bold placeholder:text-black/40 focus:outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-black/10 transition-all shadow-sm"
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2: Phone & Destination */}
                      {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5 flex-1">
                          <div>
                            <label className="text-[11px] font-black text-black uppercase tracking-widest mb-2 block drop-shadow-sm">Phone Number</label>
                            <input 
                              type="tel" 
                              required 
                              placeholder="+91 98765 43210"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className="w-full px-5 py-3.5 bg-white/90 backdrop-blur-md border border-black/10 rounded-xl text-black font-bold placeholder:text-black/40 focus:outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-black/10 transition-all shadow-sm"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-black text-black uppercase tracking-widest mb-2 block drop-shadow-sm">Destination Country</label>
                            <select 
                              required
                              value={formData.destinationCountry}
                              onChange={(e) => setFormData({...formData, destinationCountry: e.target.value})}
                              className="w-full px-5 py-3.5 bg-white/90 backdrop-blur-md border border-black/10 rounded-xl text-black font-bold focus:outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-black/10 transition-all shadow-sm appearance-none"
                            >
                              <option value="" disabled className="text-black/50">Select a country</option>
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
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5 flex-1">
                          <div>
                            <label className="text-[11px] font-black text-black uppercase tracking-widest mb-2 block drop-shadow-sm">How can we help? <span className="opacity-60">(Optional)</span></label>
                            <textarea 
                              rows={4}
                              placeholder="I am looking for masters programs in Computer Science..."
                              value={formData.message}
                              onChange={(e) => setFormData({...formData, message: e.target.value})}
                              className="w-full px-5 py-3.5 bg-white/90 backdrop-blur-md border border-black/10 rounded-xl text-black font-bold placeholder:text-black/40 focus:outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-black/10 transition-all shadow-sm resize-none"
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
                            className="px-5 py-3.5 rounded-xl border border-black/10 bg-white/60 hover:bg-white text-black font-black transition-all shadow-sm flex items-center justify-center shrink-0"
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
                            className="flex-1 bg-black hover:bg-neutral-800 text-white rounded-xl font-black text-[15px] py-3.5 flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/20 disabled:opacity-50 disabled:shadow-none"
                          >
                            Continue <ChevronRight className="w-5 h-5" />
                          </button>
                        ) : (
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="flex-1 bg-black hover:bg-neutral-800 text-white rounded-xl font-black text-[15px] py-3.5 flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/20 disabled:opacity-70"
                          >
                            {isSubmitting ? (
                              <span className="animate-pulse">Submitting...</span>
                            ) : (
                              <>Submit Request <Send className="w-4 h-4 ml-1" /></>
                            )}
                          </button>
                        )}
                      </div>

                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}