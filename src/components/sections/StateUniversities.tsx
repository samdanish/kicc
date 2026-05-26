"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Stethoscope, Cpu, LibraryBig, CheckCircle2, Building, GraduationCap } from "lucide-react";

// --- DATA ARCHITECTURE ---
const statesData = [
  {
    id: "bangalore",
    name: "Bangalore (Karnataka)",
    tagline: "The IT Capital & Premier Education Hub",
    categories: [
      {
        id: "medical",
        title: "Top Medical Colleges",
        icon: Stethoscope,
        color: "text-rose-500",
        bgColor: "bg-rose-500/10",
        institutions: [
          { name: "St. John’s Medical College", programs: ["MBBS", "Allied Health", "Nursing"] },
          { name: "Kempegowda Institute of Medical Sciences", programs: ["MBBS", "MD/MS"] },
          { name: "Vydehi Institute of Medical Sciences", programs: ["MBBS", "BDS", "Nursing"] },
          { name: "M.S. Ramaiah Medical College", programs: ["MBBS", "Physiotherapy"] },
          { name: "BGS Global Institute of Medical Sciences", programs: ["MBBS", "Allied Health"] }
        ]
      },
      {
        id: "engineering",
        title: "Premier Engineering Institutes",
        icon: Cpu,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        institutions: [
          { name: "BMS College of Engineering", programs: ["Computer Science", "AI & ML", "Data Science"] },
          { name: "PES University", programs: ["CSE", "Electronics", "Mechanical"] },
          { name: "Ramaiah Institute of Technology", programs: ["Cyber Security", "Civil", "Electrical"] },
          { name: "RV College of Engineering", programs: ["Biotechnology", "Information Science"] },
          { name: "Dayananda Sagar College", programs: ["CSE", "AI & Data Science"] }
        ]
      },
      {
        id: "universities",
        title: "Leading Universities",
        icon: LibraryBig,
        color: "text-brand-primary",
        bgColor: "bg-brand-primary/10",
        institutions: [
          { name: "Christ University", programs: ["BBA / MBA", "Law", "BCA"] },
          { name: "JAIN (Deemed-to-be University)", programs: ["Commerce", "Design Courses", "Aviation"] },
          { name: "REVA University", programs: ["BCA / MCA", "Architecture"] },
          { name: "Alliance University", programs: ["MBA", "Law", "Commerce"] },
          { name: "Presidency University", programs: ["Management", "Engineering"] },
          { name: "Dayananda Sagar University", programs: ["Pharmacy", "Hotel Management"] }
        ]
      }
    ]
  },
  {
    id: "delhi",
    name: "Delhi NCR",
    tagline: "India's Capital Education Hub",
    categories: [
      {
        id: "universities-delhi",
        title: "Top Institutions & Universities",
        icon: LibraryBig,
        color: "text-brand-primary",
        bgColor: "bg-brand-primary/10",
        institutions: [
          { name: "Sharda University", programs: ["MBBS", "Allied Health", "Engineering", "Nursing", "Pharmacy", "Law"] },
          { name: "Amity University", programs: ["Engineering", "MBA", "Allied Health", "Biotechnology", "Journalism"] },
          { name: "Galgotias University", programs: ["Engineering", "Management", "Health Sciences", "Pharmacy"] },
          { name: "Bennett University", programs: ["Engineering", "Media", "MBA", "Computer Science"] },
          { name: "Shiv Nadar University", programs: ["Engineering", "Sciences", "Research Programs"] },
          { name: "Manav Rachna University", programs: ["Allied Health", "Engineering", "Management"] },
          { name: "Noida International University", programs: ["MBBS", "Nursing", "Allied Health", "Engineering"] },
          { name: "Jamia Millia Islamia", programs: ["Medical", "Engineering", "Arts", "Law", "Management"] }
        ]
      }
    ]
  },
  {
    id: "punjab",
    name: "Punjab & Chandigarh",
    tagline: "The Emerging Hub of Innovation & Healthcare",
    categories: [
      {
        id: "universities-punjab",
        title: "Featured Universities",
        icon: LibraryBig,
        color: "text-brand-primary",
        bgColor: "bg-brand-primary/10",
        institutions: [
          { name: "Chitkara University", programs: ["Engineering", "Allied Health", "Nursing", "AI & Emerging Tech"] },
          { name: "Lovely Professional University", programs: ["Engineering", "Management", "Design", "Pharmacy", "Agriculture"] },
          { name: "Adesh University", programs: ["Nursing", "Allied Health", "Paramedical", "Healthcare"] },
          { name: "CT University", programs: ["Engineering", "AI", "Management", "Allied Health"] }
        ]
      },
      {
        id: "colleges-punjab",
        title: "Colleges & Institutions",
        icon: Building,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        institutions: [
          { name: "Saraswati Group of Colleges", programs: ["Nursing", "Pharmacy", "Engineering", "Management"] },
          { name: "Swami Vivekanand Institute", programs: ["Engineering", "Polytechnic", "Management"] },
          { name: "Universal Group of Institutions", programs: ["Engineering", "Nursing", "Allied Health", "Management"] }
        ]
      }
    ]
  }
];

export function StateUniversities() {
  const [activeState, setActiveState] = useState("bangalore");
  const currentStateData = statesData.find(s => s.id === activeState);

  return (
    <section id="domestic-institutions" className="py-24 bg-slate-50 border-y border-slate-200/60 relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-brand-primary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-brand-dark mb-6">
            Explore Top Institutions by <span className="text-brand-primary italic font-serif tracking-normal">Region</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
            Discover premier medical, engineering, and management universities across India's biggest educational hubs. Detailed insights to help you make the right choice.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* LEFT COLUMN: Sticky State Selector */}
          <div className="lg:w-[300px] shrink-0">
            {/* We use sticky positioning here. 
              top-[140px] ensures it stays below your floating navbar!
            */}
            <div className="sticky top-[140px] flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
              <h3 className="hidden lg:block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 pl-2">Select State</h3>
              {statesData.map((state) => (
                <button
                  key={state.id}
                  onClick={() => setActiveState(state.id)}
                  className={`relative flex items-center justify-between px-5 py-4 rounded-2xl text-left transition-all duration-300 shrink-0 lg:shrink w-auto lg:w-full border ${
                    activeState === state.id 
                      ? "bg-white border-brand-primary/20 shadow-[0_8px_30px_rgba(25,166,152,0.12)] text-brand-dark" 
                      : "bg-slate-100/50 border-transparent text-slate-500 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      activeState === state.id ? "bg-brand-primary/10 text-brand-primary" : "bg-slate-200 text-slate-400"
                    }`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold whitespace-nowrap lg:whitespace-normal">{state.name}</h4>
                      <p className="text-xs font-medium text-slate-400 hidden lg:block mt-0.5">{state.tagline}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Extensive State Content */}
          <div className="lg:w-full min-h-[800px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeState}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-16"
              >
                {/* State Header Banner (Image Placeholder) */}
                <div className="w-full aspect-[21/9] md:aspect-[3/1] bg-slate-200 rounded-3xl overflow-hidden relative border border-black/5 shadow-sm flex items-center justify-center group">
                  {/* Replace this div with an <img src="..." /> later */}
                  <div className="absolute inset-0 bg-slate-300 animate-pulse" />
                  <div className="relative z-10 flex flex-col items-center justify-center text-slate-500">
                    <Building className="w-12 h-12 mb-2 opacity-50" />
                    <span className="font-semibold tracking-wide">Featured Image Placeholder for {currentStateData?.name}</span>
                  </div>
                </div>

                {/* Categories Content */}
                {currentStateData?.categories.length ? (
                  currentStateData.categories.map((category) => (
                    <div key={category.id} className="space-y-8">
                      
                      {/* Category Title */}
                      <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                        <div className={`w-14 h-14 rounded-2xl ${category.bgColor} flex items-center justify-center shrink-0`}>
                          <category.icon className={`w-7 h-7 ${category.color}`} />
                        </div>
                        <h3 className="text-3xl font-bold text-brand-dark tracking-tight">{category.title}</h3>
                      </div>

                      {/* Colleges Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {category.institutions.map((inst, idx) => (
                          <div key={idx} className="bg-white rounded-2xl p-1 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                            
                            {/* Individual College Image Placeholder */}
                            <div className="w-full h-40 bg-slate-100 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                               <div className="absolute inset-0 bg-slate-200 group-hover:scale-105 transition-transform duration-500" />
                               <span className="relative z-10 text-xs font-semibold text-slate-400">Image Placeholder</span>
                            </div>

                            <div className="px-5 pb-5">
                              <h4 className="text-lg font-bold text-brand-dark leading-tight mb-4">{inst.name}</h4>
                              
                              <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Programs Offered</p>
                                <div className="flex flex-wrap gap-2">
                                  {inst.programs.map((prog, pIdx) => (
                                    <span key={pIdx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
                                      <CheckCircle2 className="w-3 h-3 text-brand-primary" />
                                      {prog}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-32 text-center bg-white rounded-3xl border border-slate-200">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 mb-6 border border-slate-100">
                      <GraduationCap className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-3xl font-bold text-brand-dark mb-3">Curating Top Institutions</h3>
                    <p className="text-slate-500 text-lg max-w-md mx-auto">Our experts are currently verifying and adding the best colleges for this region. Check back soon.</p>
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