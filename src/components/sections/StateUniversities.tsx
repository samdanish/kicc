"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Stethoscope, Cpu, LibraryBig, Building, CheckCircle2, GraduationCap } from "lucide-react";

// --- DATA ARCHITECTURE (Unchanged) ---
const statesData = [
  {
    id: "bangalore", name: "Bangalore (Karnataka)", tagline: "The IT Capital & Premier Education Hub",
    categories: [
      {
        id: "medical", title: "Top Medical Colleges", icon: Stethoscope, color: "text-rose-500", bgColor: "bg-rose-500/10",
        institutions: [
          { name: "St. John’s Medical College", programs: ["MBBS", "Allied Health", "Nursing"] },
          { name: "Kempegowda Institute of Medical Sciences", programs: ["MBBS", "MD/MS"] },
          { name: "Vydehi Institute of Medical Sciences", programs: ["MBBS", "BDS", "Nursing"] },
          { name: "M.S. Ramaiah Medical College", programs: ["MBBS", "Physiotherapy"] },
          { name: "BGS Global Institute of Medical Sciences", programs: ["MBBS", "Allied Health"] }
        ]
      },
      {
        id: "engineering", title: "Premier Engineering Institutes", icon: Cpu, color: "text-blue-500", bgColor: "bg-blue-500/10",
        institutions: [
          { name: "BMS College of Engineering", programs: ["Computer Science", "AI & ML", "Data Science"] },
          { name: "PES University", programs: ["CSE", "Electronics", "Mechanical"] },
          { name: "Ramaiah Institute of Technology", programs: ["Cyber Security", "Civil", "Electrical"] },
          { name: "RV College of Engineering", programs: ["Biotechnology", "Information Science"] },
          { name: "Dayananda Sagar College", programs: ["CSE", "AI & Data Science"] }
        ]
      },
      {
        id: "universities", title: "Leading Universities", icon: LibraryBig, color: "text-brand-primary", bgColor: "bg-brand-primary/10",
        institutions: [
          { name: "Christ University", programs: ["BBA / MBA", "Law", "BCA"] },
          { name: "JAIN (Deemed-to-be)", programs: ["Commerce", "Design Courses", "Aviation"] },
          { name: "REVA University", programs: ["BCA / MCA", "Architecture"] },
          { name: "Alliance University", programs: ["MBA", "Law", "Commerce"] },
          { name: "Presidency University", programs: ["Management", "Engineering"] },
          { name: "Dayananda Sagar University", programs: ["Pharmacy", "Hotel Mgt"] }
        ]
      }
    ]
  },
  {
    id: "delhi", name: "Delhi NCR", tagline: "India's Capital Education Hub",
    categories: [
      {
        id: "universities-delhi", title: "Top Institutions & Universities", icon: LibraryBig, color: "text-brand-primary", bgColor: "bg-brand-primary/10",
        institutions: [
          { name: "Sharda University", programs: ["MBBS", "Allied Health", "Engineering", "Nursing", "Pharmacy", "Law"] },
          { name: "Amity University", programs: ["Engineering", "MBA", "Allied Health", "Biotech"] },
          { name: "Galgotias University", programs: ["Engineering", "Management", "Health Sciences"] },
          { name: "Bennett University", programs: ["Engineering", "Media", "MBA", "CS"] },
          { name: "Shiv Nadar University", programs: ["Engineering", "Sciences", "Research"] },
          { name: "Manav Rachna University", programs: ["Allied Health", "Engineering", "Management"] },
          { name: "Noida International University", programs: ["MBBS", "Nursing", "Allied Health", "Engineering"] },
          { name: "Jamia Millia Islamia", programs: ["Medical", "Engineering", "Arts", "Law"] }
        ]
      }
    ]
  },
  {
    id: "punjab", name: "Punjab & Chandigarh", tagline: "The Emerging Hub of Innovation & Healthcare",
    categories: [
      {
        id: "universities-punjab", title: "Featured Universities", icon: LibraryBig, color: "text-brand-primary", bgColor: "bg-brand-primary/10",
        institutions: [
          { name: "Chitkara University", programs: ["Engineering", "Allied Health", "Nursing", "AI"] },
          { name: "Lovely Professional University", programs: ["Engineering", "Management", "Design", "Pharmacy"] },
          { name: "Adesh University", programs: ["Nursing", "Allied Health", "Paramedical"] },
          { name: "CT University", programs: ["Engineering", "AI", "Management", "Allied Health"] }
        ]
      },
      {
        id: "colleges-punjab", title: "Colleges & Institutions", icon: Building, color: "text-blue-500", bgColor: "bg-blue-500/10",
        institutions: [
          { name: "Saraswati Group of Colleges", programs: ["Nursing", "Pharmacy", "Engineering", "Management"] },
          { name: "Swami Vivekanand Institute", programs: ["Engineering", "Polytechnic", "Management"] },
          { name: "Universal Group of Institutions", programs: ["Engineering", "Nursing", "Allied Health"] }
        ]
      }
    ]
  }
];

export function StateUniversities() {
  const [activeState, setActiveState] = useState("bangalore");
  const currentStateData = statesData.find(s => s.id === activeState);

  return (
    // MOBILE OPTIMIZATION: Reduced vertical padding
    <section id="domestic-institutions" className="py-12 md:py-24 bg-slate-50 border-y border-slate-200/60 relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-blue-100/50 blur-[80px]" 
        />
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-brand-primary/5 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* COMPACT HEADER */}
        <div className="max-w-4xl mb-6 md:mb-12 text-center md:text-left">
          <h2 className="text-2xl md:text-5xl font-black tracking-tight text-brand-dark mb-3 leading-tight">
            Top Institutions by <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-500 italic font-serif">Region</span>
          </h2>
          <p className="text-xs md:text-lg text-slate-500 font-medium max-w-2xl mx-auto md:mx-0">
            Discover premier universities across India's biggest educational hubs.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          
          {/* MOBILE OPTIMIZED: STICKY PILL NAV */}
          <div className="lg:w-[280px] shrink-0 sticky top-[70px] md:top-[120px] z-30 bg-slate-50/90 backdrop-blur-md py-2 md:py-0 -mx-4 px-4 md:mx-0 md:px-0">
            <h3 className="hidden lg:block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pl-2">Select Region</h3>
            
            {/* Horizontal scroll on mobile, vertical on desktop */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide snap-x">
              {statesData.map((state) => (
                <button
                  key={state.id}
                  onClick={() => setActiveState(state.id)}
                  className={`flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-4 rounded-full md:rounded-2xl text-left transition-all shrink-0 snap-start border ${
                    activeState === state.id 
                      ? "bg-white border-brand-primary/30 shadow-md text-brand-dark" 
                      : "bg-white/50 border-transparent text-slate-500 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  <div className={`w-6 h-6 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    activeState === state.id ? "bg-brand-primary/10 text-brand-primary" : "bg-slate-200 text-slate-400"
                  }`}>
                    <MapPin className="w-3 h-3 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] md:text-sm font-bold whitespace-nowrap">{state.name}</h4>
                    <p className="text-[10px] font-medium text-slate-400 hidden lg:block mt-0.5">{state.tagline}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC CONTENT AREA */}
          <div className="lg:w-full min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeState}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 md:space-y-12"
              >
                {/* BIG BANNER IS HIDDEN ON MOBILE to save space! */}
                <div className="hidden md:flex w-full aspect-[4/1] bg-gradient-to-r from-slate-200 to-slate-100 rounded-3xl overflow-hidden relative border border-black/5 shadow-inner items-center justify-center">
                  <div className="text-center">
                    <Building className="w-10 h-10 mb-2 opacity-40 mx-auto text-slate-500" />
                    <span className="font-bold text-slate-500 tracking-wide">{currentStateData?.name} Hub</span>
                  </div>
                </div>

                {/* Categories Content */}
                {currentStateData?.categories.length ? (
                  currentStateData.categories.map((category) => (
                    <div key={category.id} className="space-y-4 md:space-y-6">
                      
                      {/* COMPACT Category Title */}
                      <div className="flex items-center gap-3 border-b border-slate-200/60 pb-3">
                        <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl ${category.bgColor} flex items-center justify-center shrink-0`}>
                          <category.icon className={`w-4 h-4 md:w-6 md:h-6 ${category.color}`} />
                        </div>
                        <h3 className="text-lg md:text-2xl font-black text-brand-dark tracking-tight">{category.title}</h3>
                      </div>

                      {/* MICRO-CARDS for Institutions */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                        {category.institutions.map((inst, idx) => (
                          <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-20px" }}
                            transition={{ delay: idx * 0.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-brand-primary/20 transition-all flex flex-row items-start gap-3 group"
                          >
                            {/* Tiny Icon replaces Giant Image Placeholder */}
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/5 transition-colors">
                              <Building className="w-4 h-4 md:w-5 md:h-5 text-slate-300 group-hover:text-brand-primary transition-colors" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4 className="text-[13px] md:text-sm font-bold text-brand-dark leading-snug mb-1.5 truncate group-hover:text-brand-primary transition-colors">{inst.name}</h4>
                              
                              {/* Extremely compact inline programs */}
                              <div className="flex flex-wrap gap-1 md:gap-1.5">
                                {inst.programs.map((prog, pIdx) => (
                                  <span 
                                    key={pIdx} 
                                    className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] md:text-[10px] font-bold bg-slate-100 text-slate-500 tracking-wide"
                                  >
                                    {prog}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-16 md:py-24 text-center bg-white rounded-2xl border border-slate-200">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-50 mb-4 border border-slate-100">
                      <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-slate-300" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-2">Curating Institutions</h3>
                    <p className="text-xs md:text-sm text-slate-500 max-w-xs mx-auto">We are verifying the best colleges for this region. Check back soon.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
}