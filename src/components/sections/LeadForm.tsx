"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Send, Phone, Mail, MapPin, CheckCircle2, GraduationCap, Loader2 } from "lucide-react";
import { ref, push, serverTimestamp } from "firebase/database";
import { database } from "../../lib/firebase"; // Note we are importing 'database' now

interface FormState {
  name: string;
  phone: string;
  email: string;
  neetScore: string;
  preferredCountry: string;
  message: string;
}

const neetRanges = [
  "Below 100",
  "100 - 200",
  "200 - 300",
  "300 - 400",
  "400 - 500",
  "500 - 600",
  "Above 600"
];

export function LeadForm() {
  const [form, setForm] = useState<FormState>({
    name: "", phone: "", email: "", neetScore: "", preferredCountry: "", message: ""
  });
  
  const [countryError, setCountryError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value.length > 120) return;

    const words = value.trim().split(/\s+/).filter(Boolean);
    
    if (words.length > 10) {
      setCountryError("Maximum 10 words allowed.");
    } else {
      setCountryError("");
      setForm(prev => ({ ...prev, preferredCountry: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (countryError) return; 
    setIsSubmitting(true);

    try {
      // Pushing to Firebase Realtime Database
      const inquiriesRef = ref(database, "inquiries");
      await push(inquiriesRef, {
        ...form,
        status: "Unseen",
        date: new Date().toLocaleDateString(),
        createdAt: serverTimestamp()
      });
      setIsSuccess(true);
      setForm({ name: "", phone: "", email: "", neetScore: "", preferredCountry: "", message: "" });
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // MOBILE OPTIMIZATION: Reduced vertical padding on mobile (py-16 instead of py-24)
    <section id="inquiry" className="py-16 md:py-24 relative overflow-hidden">
      
      {/* Background Image & Smart Gradient Overlay */}
      <div className="absolute inset-0 -z-10">
        <img 
          src="https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779787686/Copilot_20260526_145739_sils9p.png" 
          alt="Consultation Background" 
          className="w-full h-full object-cover object-center"
        />
        {/* MOBILE OPTIMIZATION: Responsive gradient (darker on mobile for readability, fades out on desktop) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1727]/90 via-[#0B1727]/80 md:via-[#0B1727]/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 xl:gap-16 items-center">
          
          {/* LEFT COLUMN: Trust & Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 text-white"
          >
            {/* MOBILE OPTIMIZATION: Smaller badge padding and text */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-brand-primary/20 text-brand-light1 font-semibold mb-4 md:mb-6 border border-brand-primary/30 text-xs md:text-sm backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-gold" />
              100% Honest & Unbiased Counselling
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 md:mb-6 tracking-tighter text-white">
              Take the First Step Toward Your <br className="hidden md:block" />Global Career
            </h2>
            
            <p className="text-sm md:text-lg text-slate-200 mb-8 md:mb-10 leading-relaxed max-w-xl font-medium drop-shadow-md">
              Fill out the form to request a <strong className="text-white">Free Profile Evaluation</strong>. Our expert counselors in Srinagar will review your details and contact you within 24 hours.
            </p>

            <div className="space-y-4 md:space-y-6 bg-white/10 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-white/20 max-w-md backdrop-blur-md shadow-xl">
              <div className="flex gap-3 md:gap-4 items-center text-xs md:text-sm font-semibold">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-brand-primary shrink-0" />
                Srinagar, Jammu & Kashmir – 190005
              </div>
              <div className="flex gap-3 md:gap-4 items-center text-xs md:text-sm font-semibold">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-brand-primary shrink-0" />
                <a href="tel:+919622618773" className="hover:text-white transition-colors">+91 9622618773</a>
              </div>
              <div className="flex gap-3 md:gap-4 items-center text-xs md:text-sm font-semibold">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-brand-primary shrink-0" />
                <a href="mailto:Kashmirinternational@kicc.co.in" className="hover:text-white transition-colors break-all">Kashmirinternational@kicc.co.in</a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: The High-Contrast Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            {isSuccess ? (
              <div className="bg-white/95 backdrop-blur-3xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/40 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-brand-dark mb-2">Request Received!</h3>
                <p className="text-slate-500 font-medium max-w-sm">Thank you. Our expert counselors will analyze your profile and contact you within 24 hours.</p>
                <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-8 rounded-full">Submit Another Inquiry</Button>
              </div>
            ) : (
              // MOBILE OPTIMIZATION: Reduced padding (p-6) on mobile
              <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-3xl p-6 md:p-12 rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.6)] border border-white/40 space-y-5 md:space-y-7 relative overflow-hidden">
                
                <GraduationCap className="absolute -top-10 -right-10 w-40 h-40 text-brand-primary/5 -z-10" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="name" className="text-xs md:text-sm font-bold text-brand-dark">Full Name *</Label>
                    <Input id="name" value={form.name} onChange={handleInputChange} placeholder="John Doe" className="h-11 md:h-12 border-slate-200 text-sm focus:ring-brand-primary" required />
                  </div>
                  
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="phone" className="text-xs md:text-sm font-bold text-brand-dark">Phone Number *</Label>
                    <Input id="phone" value={form.phone} onChange={handleInputChange} type="tel" placeholder="+91 XXXXX XXXXX" className="h-11 md:h-12 border-slate-200 text-sm focus:ring-brand-primary" required />
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="email" className="text-xs md:text-sm font-bold text-brand-dark">Email Address *</Label>
                  <Input id="email" value={form.email} onChange={handleInputChange} type="email" placeholder="john@example.com" className="h-11 md:h-12 border-slate-200 text-sm focus:ring-brand-primary" required />
                </div>

                <div className="space-y-2 md:space-y-3">
                  <Label className="text-xs md:text-sm font-bold text-brand-dark">NEET Score Range (MBBS Aspirants)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
                    {neetRanges.map(range => (
                      <label key={range} className={`border rounded-xl p-2.5 md:p-3 flex items-center justify-center text-center cursor-pointer transition-all ${
                        form.neetScore === range 
                          ? "bg-brand-primary text-white border-brand-primary shadow-md" 
                          : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                      }`}>
                        <input 
                          type="radio" 
                          name="neetScore" 
                          value={range} 
                          checked={form.neetScore === range}
                          onChange={(e) => setForm(prev => ({...prev, neetScore: e.target.value}))}
                          className="sr-only" 
                        />
                        <span className="text-[10px] md:text-xs font-bold whitespace-nowrap">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2 relative">
                  <Label htmlFor="preferredCountry" className="text-xs md:text-sm font-bold text-brand-dark">Preferred Country (e.g. UK, Canada) *</Label>
                  <Input 
                    id="preferredCountry" 
                    value={form.preferredCountry} 
                    onChange={handleCountryChange} 
                    placeholder="List max 10 countries..." 
                    className={`h-11 md:h-12 text-sm focus:ring-brand-primary ${countryError ? "border-red-500 focus:ring-red-500" : "border-slate-200"}`}
                    required 
                  />
                  
                  <div className="flex justify-between items-center text-[10px] md:text-xs pt-1 px-1">
                    {countryError ? (
                      <span className="text-red-600 font-semibold">{countryError}</span>
                    ) : (
                      <span className="text-slate-400 font-medium">Max 10 words</span>
                    )}
                    <span className={`${form.preferredCountry.length > 110 ? "text-orange-600 font-bold" : "text-slate-400 font-medium"}`}>
                      {form.preferredCountry.length} / 120
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="message" className="text-xs md:text-sm font-bold text-brand-dark">Additional Message (Optional)</Label>
                  <Textarea 
                    id="message" 
                    value={form.message} 
                    onChange={handleInputChange} 
                    placeholder="Tell us about your academic background or specific queries..." 
                    className="min-h-[100px] border-slate-200 text-sm focus:ring-brand-primary resize-none" 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting || !!countryError}
                  className="w-full h-12 md:h-14 bg-[#29bf12] hover:bg-brand-dark text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-base shadow-lg transition-all flex items-center justify-center gap-2 group mt-2"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                  ) : (
                    <>Submit Inquiry <Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}