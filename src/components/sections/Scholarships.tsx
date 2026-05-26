"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, CheckCircle2, Landmark, BriefcaseMedical } from "lucide-react";

// --- UPDATED DATA ARCHITECTURE ---
const scholarshipData = [
  {
    id: "bangladesh", 
    country: "BANGLADESH", 
    flag: "🇧🇩", 
    title: "SAARC QUOTA SCHOLARSHIP",
    description: "Guidance for SAARC Quota admissions in Bangladesh, which can significantly reduce MBBS costs for eligible students from SAARC countries, including India. In some cases, government seats and subsidized tuition structures are available. Eligibility depends on merit and official criteria.",
    support: [
      "SAARC quota eligibility guidance", 
      "Documentation support", 
      "Government medical college application guidance",
      "Admission process counselling"
    ]
  },
  {
    id: "egypt", 
    country: "EGYPT", 
    flag: "🇪🇬", 
    title: "MERIT-BASED DISCOUNTS & UNIVERSITY SCHOLARSHIPS",
    description: "Some Egyptian medical universities may provide merit-based tuition discounts or fee concessions for eligible international students.",
    support: [
      "Scholarship eligibility guidance", 
      "University selection assistance", 
      "Documentation support"
    ]
  },
  {
    id: "italy", 
    country: "ITALY", 
    flag: "🇮🇹", 
    title: "REGIONAL SCHOLARSHIPS (DSU) & FINANCIAL AID",
    description: "Italy is known for regional scholarships (DSU scholarships) that may support tuition, accommodation, or living expenses for eligible international students.",
    support: [
      "Scholarship documentation guidance", 
      "Admission support", 
      "Financial aid counselling"
    ]
  },
  {
    id: "kazakhstan", 
    country: "KAZAKHSTAN", 
    flag: "🇰🇿", 
    title: "UNIVERSITY SCHOLARSHIPS & FEE WAIVERS",
    description: "Certain universities may offer merit scholarships, tuition discounts, or early admission benefits to international students.",
    support: [
      "Scholarship guidance", 
      "University-specific financial aid information", 
      "Admission counselling"
    ]
  },
  {
    id: "china", 
    country: "CHINA", 
    flag: "🇨🇳", 
    title: "GOVERNMENT & UNIVERSITY SCHOLARSHIPS",
    description: "Some Chinese universities provide international student scholarships, tuition waivers, and university-funded support depending on eligibility.",
    support: [
      "Scholarship information", 
      "University selection guidance", 
      "Application assistance"
    ]
  }
];

const generalSupport = [
  "SCHOLARSHIP ELIGIBILITY ASSESSMENT",
  "MERIT-BASED SCHOLARSHIP GUIDANCE",
  "TUITION FEE WAIVER INFORMATION",
  "DOCUMENTATION SUPPORT",
  "UNIVERSITY SCHOLARSHIP APPLICATION ASSISTANCE",
  "MBBS ADMISSION & FINANCIAL PLANNING SUPPORT"
];

export function Scholarships() {
  const [activeCountry, setActiveCountry] = useState(scholarshipData[0]);

  return (
    <section id="scholarships" className="pt-12 pb-12 bg-[#0a192f] relative overflow-hidden">
      
      {/* ANIMATED BACKGROUND SHAPES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[350px] h-[350px] rounded-full bg-yellow-500/20 blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-brand-primary/20 blur-[90px]" 
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="mb-8 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-yellow-500/10 text-yellow-400 font-black mb-4 text-[10px] uppercase tracking-[0.2em] border border-yellow-500/20"
          >
            <Award className="w-3.5 h-3.5" /> GLOBAL AID PROGRAMS
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase"
          >
            UNLOCK <span className="text-yellow-400">SCHOLARSHIPS</span>
          </motion.h2>
        </div>

        {/* WRAPPED PILL MENU */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center md:justify-start gap-2 mb-8"
        >
          {scholarshipData.map((data) => (
            <motion.button
              key={data.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCountry(data)}
              className={`flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-sm text-[11px] md:text-xs font-black uppercase tracking-widest transition-all border ${
                activeCountry.id === data.id
                  ? "bg-yellow-400/20 border-yellow-400/50 text-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.2)]"
                  : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-lg drop-shadow-md">{data.flag}</span>
              <span>{data.country}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* DYNAMIC CONTENT CARD */}
        <div className="min-h-[280px] md:min-h-[320px] mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCountry.id}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-sm p-6 md:p-8 shadow-2xl flex flex-col relative overflow-hidden"
            >
              {/* Internal Card Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[60px] transform translate-x-1/2 -translate-y-1/2" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl md:text-3xl font-black text-white flex items-center gap-3 tracking-widest uppercase">
                      {activeCountry.country} <span className="text-2xl md:text-4xl">{activeCountry.flag}</span>
                    </h3>
                    <h4 className="text-yellow-400 font-bold text-[10px] md:text-xs uppercase mt-2 tracking-[0.15em] border-l-2 border-yellow-400 pl-2">
                      {activeCountry.title}
                    </h4>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-sm bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 shadow-inner hidden sm:flex">
                    <Landmark className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                  </div>
                </div>

                <p className="text-slate-300 text-xs md:text-sm leading-loose mb-6 font-light tracking-wide max-w-3xl">
                  {activeCountry.description}
                </p>

                <div className="bg-black/40 rounded-sm p-4 md:p-5 border border-white/5">
                  <h5 className="text-white font-black text-[10px] md:text-xs mb-4 flex items-center gap-2 uppercase tracking-[0.2em]">
                    <BriefcaseMedical className="w-4 h-4 text-yellow-400" /> SUPPORT OFFERED
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                    {activeCountry.support.map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (idx * 0.1) }}
                        className="flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                        <span className="text-[10px] md:text-xs text-slate-300 font-medium tracking-wide uppercase leading-snug">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* GENERAL SUPPORT TICKER/GRID */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <h5 className="text-center text-white/50 font-black text-[10px] uppercase tracking-[0.3em] mb-6">
            OUR SCHOLARSHIP GUIDANCE INCLUDES
          </h5>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {generalSupport.map((support, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-2 bg-white/5 px-3 py-2 md:px-4 md:py-2.5 rounded-sm border border-white/10 backdrop-blur-sm"
              >
                <span className="text-yellow-400 font-black text-xs">✓</span>
                <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-widest">{support}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DISCLAIMER */}
        <div className="text-center bg-black/30 rounded-sm p-4 border border-white/5">
          <p className="text-[9px] md:text-[10px] text-slate-500 font-black uppercase tracking-[0.15em] leading-relaxed max-w-4xl mx-auto">
            <strong className="text-slate-400">IMPORTANT DISCLAIMER:</strong> KASHMIR INTERNATIONAL CAREER CONSULTANCY DOES NOT GUARANTEE SCHOLARSHIPS OR FINANCIAL AID. FINAL SCHOLARSHIP APPROVAL DEPENDS SOLELY ON UNIVERSITIES, GOVERNMENT AUTHORITIES, AND SCHOLARSHIP PROVIDERS.
          </p>
        </div>

      </div>
    </section>
  );
}