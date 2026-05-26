"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Send, Phone, Mail, MapPin, CheckCircle2, GraduationCap } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (countryError) return; 
    console.log("Submit to Firebase:", form);
  };

  return (
    <section id="inquiry" className="section-padding relative overflow-hidden">
      
      {/* Background Image & Smart Gradient Overlay */}
      <div className="absolute inset-0 -z-10">
        <img 
          src="https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779787686/Copilot_20260526_145739_sils9p.png" 
          alt="Consultation Background" 
          className="w-full h-full object-cover object-center"
        />
        {/* THE FIX: A gradient that is 80% dark on the left for text readability, 
          fading to completely transparent on the right to reveal the sky blue! 
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1727]/20 via-[#0B1727]/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
          
          {/* LEFT COLUMN: Trust & Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/20 text-brand-light1 font-semibold mb-6 border border-brand-primary/30 text-sm backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-brand-gold" />
              100% Honest & Unbiased Counselling
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 tracking-tighter text-white">
              Take the First Step Toward Your Global Career
            </h2>
            
            <p className="text-lg text-slate-200 mb-10 leading-relaxed max-w-xl font-medium drop-shadow-md">
              Fill out the form to request a <strong className="text-white">Free Profile Evaluation</strong>. Our expert counselors in Srinagar will review your details and contact you within 24 hours.
            </p>

            <div className="space-y-6 bg-white/10 p-8 rounded-3xl border border-white/20 max-w-md backdrop-blur-md shadow-xl">
              <div className="flex gap-4 items-center text-sm font-semibold">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0" />
                Srinagar, Jammu & Kashmir – 190005
              </div>
              <div className="flex gap-4 items-center text-sm font-semibold">
                <Phone className="w-5 h-5 text-brand-primary shrink-0" />
                <a href="tel:+919622618773" className="hover:text-white transition-colors">+91 9622618773</a>
              </div>
              <div className="flex gap-4 items-center text-sm font-semibold">
                <Mail className="w-5 h-5 text-brand-primary shrink-0" />
                <a href="mailto:info@kicc.co.in" className="hover:text-white transition-colors break-all">info@thecareeradvisors.in</a>
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
            <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-3xl p-8 md:p-12 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.6)] border border-white/40 space-y-7 relative overflow-hidden">
              
              <GraduationCap className="absolute -top-10 -right-10 w-40 h-40 text-brand-primary/5 -z-10" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-bold text-brand-dark">Full Name *</Label>
                  <Input id="name" value={form.name} onChange={handleInputChange} placeholder="John Doe" className="h-12 border-slate-200 focus:ring-brand-primary" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-bold text-brand-dark">Phone Number *</Label>
                  <Input id="phone" value={form.phone} onChange={handleInputChange} type="tel" placeholder="+91 XXXXX XXXXX" className="h-12 border-slate-200 focus:ring-brand-primary" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold text-brand-dark">Email Address *</Label>
                <Input id="email" value={form.email} onChange={handleInputChange} type="email" placeholder="john@example.com" className="h-12 border-slate-200 focus:ring-brand-primary" required />
              </div>

              <div className="space-y-3">
                <Label className="font-bold text-brand-dark">NEET Score Range (MBBS Aspirants)</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {neetRanges.map(range => (
                    <label key={range} className={`border rounded-xl p-3 flex items-center justify-center text-center cursor-pointer transition-all ${
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
                      <span className="text-xs font-bold whitespace-nowrap">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="preferredCountry" className="font-bold text-brand-dark">Preferred Country (e.g. UK, Canada, Uzbekistan) *</Label>
                <Input 
                  id="preferredCountry" 
                  value={form.preferredCountry} 
                  onChange={handleCountryChange} 
                  placeholder="List max 10 countries..." 
                  className={`h-12 focus:ring-brand-primary ${countryError ? "border-red-500 focus:ring-red-500" : "border-slate-200"}`}
                  required 
                />
                
                <div className="flex justify-between items-center text-xs pt-1 px-1">
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

              <div className="space-y-2">
                <Label htmlFor="message" className="font-bold text-brand-dark">Your Message (Optional)</Label>
                <Textarea id="message" value={form.message} onChange={handleInputChange} placeholder="Tell us about your educational background..." className="border-slate-200 focus:ring-brand-primary min-h-[100px]" />
              </div>

              <Button type="submit" className="w-full h-14 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white font-bold h-12 text-lg transition-all group shadow-xl shadow-brand-primary/20">
                Request Free Profile Evaluation <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-center text-xs text-slate-400 pt-2 font-medium">
                Your data is secure. We use it only for KICC admission guidance.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}