"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, CheckCircle2, Landmark, BriefcaseMedical } from "lucide-react";

// --- DATA ARCHITECTURE ---
const scholarshipData = [
  {
    id: "bangladesh",
    country: "Bangladesh",
    flag: "🇧🇩",
    title: "SAARC Quota Scholarship",
    description: "Guidance for SAARC Quota admissions in Bangladesh, significantly reducing MBBS costs for eligible students. In some cases, government seats and subsidized tuition structures are available. Eligibility depends on merit.",
    support: [
      "SAARC quota eligibility guidance",
      "Documentation support",
      "Government medical college application",
      "Admission process counselling"
    ]
  },
  {
    id: "egypt",
    country: "Egypt",
    flag: "🇪🇬",
    title: "Merit-Based Discounts",
    description: "Egyptian medical universities may provide merit-based tuition discounts or fee concessions for eligible international students looking to pursue high-quality medical education.",
    support: [
      "Scholarship eligibility guidance",
      "University selection assistance",
      "Documentation support"
    ]
  },
  {
    id: "italy",
    country: "Italy",
    flag: "🇮🇹",
    title: "Regional Scholarships (DSU)",
    description: "Italy is globally renowned for its regional DSU scholarships that may heavily subsidize or fully cover tuition, accommodation, or living expenses for eligible international students.",
    support: [
      "Scholarship documentation guidance",
      "Admission support",
      "Financial aid counselling"
    ]
  },
  {
    id: "kazakhstan",
    country: "Kazakhstan",
    flag: "🇰🇿",
    title: "University Fee Waivers",
    description: "Top-tier medical universities in Kazakhstan offer generous merit scholarships, tuition discounts, or early admission benefits to attract bright international students.",
    support: [
      "Scholarship guidance",
      "University-specific financial aid",
      "Admission counselling"
    ]
  },
  {
    id: "china",
    country: "China",
    flag: "🇨🇳",
    title: "Gov. & University Scholarships",
    description: "Chinese universities provide highly lucrative international student scholarships, tuition waivers, and university-funded support packages depending on your academic profile.",
    support: [
      "Scholarship information",
      "University selection guidance",
      "Application assistance"
    ]
  }
];

const generalSupport = [
  "Eligibility Assessment",
  "Merit Guidance",
  "Fee Waiver Info",
  "Documentation",
  "Application Support",
  "Financial Planning"
];

export function Scholarships() {
  const [activeCountry, setActiveCountry] = useState(scholarshipData[0]);

  return (
    // bg-brand-dark aligns perfectly with the "Our Mission" card
    <section id="scholarships" className="pt-16 pb-8 bg-brand-dark relative overflow-hidden">
      
      {/* MAGNIFICENT BACKGROUND SHAPES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Glowing Orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-yellow-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-primary/10 blur-[100px]" />
        
        {/* Geometric Outlines */}
        <div className="absolute top-[20%] left-[5%] w-72 h-72 border border-white/5 rounded-full transform -rotate-12" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 border border-yellow-500/10 rounded-3xl transform rotate-45" />
        <div className="absolute top-[50%] left-[50%] w-[800px] h-[800px] border border-white/5 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* COMPACT HEADER (Top Most Part) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-white/10 pb-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 font-bold mb-4 text-xs tracking-wider uppercase border border-yellow-500/20">
              <Award className="w-3.5 h-3.5" />
              Global Financial Aid
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              Unlock High-Value <span className="text-yellow-400 italic">Scholarships</span>
            </h2>
          </div>
          <p className="text-sm text-slate-400 font-medium max-w-sm md:text-right">
            Explore exclusive quotas, government grants, and university fee waivers across our top partner destinations.
          </p>
        </div>

        {/* INTERACTIVE EXPLORER (Compact Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          
          {/* Left Column: Country Selector */}
          <div className="lg:col-span-4">
            <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide snap-x">
              {scholarshipData.map((data) => (
                <button
                  key={data.id}
                  onClick={() => setActiveCountry(data)}
                  className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-300 shrink-0 lg:shrink w-[260px] lg:w-full snap-start border ${
                    activeCountry.id === data.id
                      ? "bg-white/10 border-yellow-400/30 shadow-[0_0_30px_rgba(250,204,21,0.1)] backdrop-blur-md"
                      : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10"
                  }`}
                >
                  <span className="text-3xl drop-shadow-md">{data.flag}</span>
                  <div>
                    <h4 className={`font-bold text-base ${activeCountry.id === data.id ? "text-yellow-400" : "text-slate-300"}`}>
                      {data.country}
                    </h4>
                    <p className={`text-xs font-medium truncate max-w-[180px] lg:max-w-none ${activeCountry.id === data.id ? "text-white" : "opacity-70"}`}>
                      {data.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Data Display */}
          <div className="lg:col-span-8 min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCountry.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl h-full flex flex-col relative overflow-hidden"
              >
                {/* Decorative internal glass shape */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500/5 rounded-full blur-[50px]" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 mb-1">
                        {activeCountry.country} {activeCountry.flag}
                      </h3>
                      <h4 className="text-yellow-400 font-bold text-sm tracking-wide uppercase">
                        {activeCountry.title}
                      </h4>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0 border border-yellow-500/20">
                      <Landmark className="w-6 h-6 text-yellow-400" />
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-medium">
                    {activeCountry.description}
                  </p>

                  <div className="bg-black/20 rounded-2xl p-5 border border-white/5 mt-auto">
                    <h5 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                      <BriefcaseMedical className="w-4 h-4 text-yellow-400" />
                      KICC Support Provided:
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeCountry.support.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-300 font-medium leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* COMPACT GLOBAL SUPPORT ROW */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
          {generalSupport.map((support, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs font-bold text-white">{support}</span>
            </div>
          ))}
        </div>

        {/* TINY, MUTED DISCLAIMER AT THE LOWEST POINT */}
        <div className="text-center pt-6 border-t border-white/5">
          <p className="text-[10px] text-slate-600 font-semibold uppercase tracking-widest leading-relaxed max-w-4xl mx-auto">
            Disclaimer: KICC acts in an advisory capacity. We do not guarantee scholarships or financial aid. Final approval depends solely on universities, government authorities, and scholarship providers.
          </p>
        </div>

      </div>
    </section>
  );
}