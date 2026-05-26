"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Stethoscope, Cpu, LibraryBig, Building, GraduationCap } from "lucide-react";

// IMPORTANT: Added 'id' to match the admin panel database IDs
const statesData = [
  {
    id: "bangalore", name: "Bangalore (Karnataka)", tagline: "The IT Capital & Premier Education Hub",
    categories: [
      {
        id: "medical", title: "Top Medical Colleges", icon: Stethoscope, color: "text-rose-500", bgColor: "bg-rose-500/10",
        institutions: [
          { id: "bng-1", name: "St. John’s Medical College", programs: ["MBBS", "Allied Health", "Nursing"] },
          { id: "bng-2", name: "Kempegowda Institute of Medical Sciences", programs: ["MBBS", "MD/MS"] },
          { id: "bng-3", name: "Vydehi Institute of Medical Sciences", programs: ["MBBS", "BDS", "Nursing"] },
          { id: "bng-4", name: "M.S. Ramaiah Medical College", programs: ["MBBS", "Physiotherapy"] },
          { id: "bng-5", name: "BGS Global Institute of Medical Sciences", programs: ["MBBS", "Allied Health"] }
        ]
      },
      {
        id: "engineering", title: "Premier Engineering Institutes", icon: Cpu, color: "text-blue-500", bgColor: "bg-blue-500/10",
        institutions: [
          { id: "bng-6", name: "BMS College of Engineering", programs: ["Computer Science", "AI & ML", "Data Science"] },
          { id: "bng-7", name: "PES University", programs: ["CSE", "Electronics", "Mechanical"] },
          { id: "bng-8", name: "Ramaiah Institute of Technology", programs: ["Cyber Security", "Civil", "Electrical"] },
          { id: "bng-9", name: "RV College of Engineering", programs: ["Biotechnology", "Information Science"] },
          { id: "bng-10", name: "Dayananda Sagar College", programs: ["CSE", "AI & Data Science"] }
        ]
      },
      {
        id: "universities", title: "Leading Universities", icon: LibraryBig, color: "text-brand-primary", bgColor: "bg-brand-primary/10",
        institutions: [
          { id: "bng-11", name: "Christ University", programs: ["BBA / MBA", "Law", "BCA"] },
          { id: "bng-12", name: "JAIN (Deemed-to-be)", programs: ["Commerce", "Design Courses", "Aviation"] },
          { id: "bng-13", name: "REVA University", programs: ["BCA / MCA", "Architecture"] },
          { id: "bng-14", name: "Alliance University", programs: ["MBA", "Law", "Commerce"] },
          { id: "bng-15", name: "Presidency University", programs: ["Management", "Engineering"] },
          { id: "bng-16", name: "Dayananda Sagar University", programs: ["Pharmacy", "Hotel Mgt"] }
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
          { id: "del-1", name: "Sharda University", programs: ["MBBS", "Allied Health", "Engineering", "Nursing", "Pharmacy", "Law"] },
          { id: "del-2", name: "Amity University", programs: ["Engineering", "MBA", "Allied Health", "Biotech"] },
          { id: "del-3", name: "Galgotias University", programs: ["Engineering", "Management", "Health Sciences"] },
          { id: "del-4", name: "Bennett University", programs: ["Engineering", "Media", "MBA", "CS"] },
          { id: "del-5", name: "Shiv Nadar University", programs: ["Engineering", "Sciences", "Research"] },
          { id: "del-6", name: "Manav Rachna University", programs: ["Allied Health", "Engineering", "Management"] },
          { id: "del-7", name: "Noida International University", programs: ["MBBS", "Nursing", "Allied Health", "Engineering"] },
          { id: "del-8", name: "Jamia Millia Islamia", programs: ["Medical", "Engineering", "Arts", "Law"] }
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
          { id: "pun-1", name: "Chitkara University", programs: ["Engineering", "Allied Health", "Nursing", "AI"] },
          { id: "pun-2", name: "Lovely Professional University", programs: ["Engineering", "Management", "Design", "Pharmacy"] },
          { id: "pun-3", name: "Adesh University", programs: ["Nursing", "Allied Health", "Paramedical"] },
          { id: "pun-4", name: "CT University", programs: ["Engineering", "AI", "Management", "Allied Health"] }
        ]
      },
      {
        id: "colleges-punjab", title: "Colleges & Institutions", icon: Building, color: "text-blue-500", bgColor: "bg-blue-500/10",
        institutions: [
          { id: "pun-5", name: "Saraswati Group of Colleges", programs: ["Nursing", "Pharmacy", "Engineering", "Management"] },
          { id: "pun-6", name: "Swami Vivekanand Institute", programs: ["Engineering", "Polytechnic", "Management"] },
          { id: "pun-7", name: "Universal Group of Institutions", programs: ["Engineering", "Nursing", "Allied Health"] }
        ]
      }
    ]
  }
];

// ACCEPT THE PRE-FETCHED IMAGES AS A PROP
export function StateUniversities({ initialImages = {} }: { initialImages?: Record<string, string> }) {
  const [activeState, setActiveState] = useState("bangalore");
  const currentStateData = statesData.find(s => s.id === activeState);

  return (
    <section id="domestic-institutions" className="py-12 md:py-24 bg-slate-50 border-y border-slate-200/60 relative">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        <div className="max-w-4xl mb-6 md:mb-12 text-center md:text-left">
          <h2 className="text-2xl md:text-5xl font-black tracking-tight text-brand-dark mb-3 leading-tight">
            Top Institutions by <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-500 italic font-serif">Region</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          
          {/* Navigation Tabs */}
          <div className="lg:w-[280px] shrink-0 sticky top-[70px] md:top-[120px] z-30 bg-slate-50/90 backdrop-blur-md py-2 md:py-0 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 scrollbar-hide snap-x">
              {statesData.map((state) => (
                <button
                  key={state.id}
                  onClick={() => setActiveState(state.id)}
                  className={`flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-4 rounded-full md:rounded-2xl text-left transition-all shrink-0 snap-start border ${
                    activeState === state.id ? "bg-white border-brand-primary/30 shadow-md text-brand-dark" : "bg-white/50 border-transparent text-slate-500"
                  }`}
                >
                  <div className={`w-6 h-6 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 ${
                    activeState === state.id ? "bg-brand-primary/10 text-brand-primary" : "bg-slate-200 text-slate-400"
                  }`}>
                    <MapPin className="w-3 h-3 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] md:text-sm font-bold whitespace-nowrap">{state.name}</h4>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cards Content */}
          <div className="lg:w-full min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeState}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8 md:space-y-12"
              >
                {currentStateData?.categories.map((category) => (
                  <div key={category.id} className="space-y-4 md:space-y-6">
                    
                    <div className="flex items-center gap-3 border-b border-slate-200/60 pb-3">
                      <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl ${category.bgColor} flex items-center justify-center`}>
                        <category.icon className={`w-4 h-4 md:w-6 md:h-6 ${category.color}`} />
                      </div>
                      <h3 className="text-lg md:text-2xl font-black text-brand-dark tracking-tight">{category.title}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                      {category.institutions.map((inst, idx) => (
                        <motion.div 
                          key={inst.id} 
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-brand-primary/30 transition-all flex flex-row items-center gap-3 group"
                        >
                          {/* USE THE IMAGES PASSED DOWN FROM THE SERVER PROP */}
                          <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-50 rounded-lg border border-slate-100 overflow-hidden flex items-center justify-center shrink-0">
                            {initialImages[inst.id] ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img 
                                src={initialImages[inst.id]} 
                                alt={inst.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                              />
                            ) : (
                              <Building className="w-5 h-5 md:w-6 md:h-6 text-slate-300 group-hover:text-brand-primary transition-colors" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-[13px] md:text-sm font-bold text-brand-dark leading-snug mb-1.5 truncate group-hover:text-brand-primary transition-colors">{inst.name}</h4>
                            <div className="flex flex-wrap gap-1 md:gap-1.5">
                              {inst.programs.map((prog, pIdx) => (
                                <span key={pIdx} className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] md:text-[10px] font-bold bg-slate-100 text-slate-500 tracking-wide">
                                  {prog}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}