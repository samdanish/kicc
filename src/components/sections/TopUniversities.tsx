"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { MapPin, ShieldCheck, Banknote, CalendarDays, Utensils, Info, ArrowRight } from "lucide-react";
import { University } from "../../types";

// Hardcoded data based on your exact screenshots
const topUniversities: University[] = [
  {
    id: "1",
    name: "Tashkent Pharmaceutical Institute",
    country: "Uzbekistan",
    city: "Tashkent",
    imageUrl: "https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779783978/Tashkent_Pharmaceutical_Institute_gxni1u.png", // Placeholder for your image
    whoApproved: true,
    avgFees: "3,500 USD per year",
    established: "1937",
    messIncluded: false,
    messCharges: "1,200 USD per year (Optional)",
    extraDetails: "Hostel and medical insurance charges are separate."
  },
  {
    id: "2",
    name: "Tashkent State Dental / Medical Univ.",
    country: "Uzbekistan",
    city: "Tashkent",
    imageUrl: "https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779783948/Tashkent_State_Dental_laiueq.png", 
    whoApproved: true,
    avgFees: "3,500 USD per year",
    established: "Originally established...",
    messIncluded: true,
    extraDetails: "One of the premier dental institutes in Central Asia."
  },
  {
    id: "3",
    name: "Samarkand State Medical University",
    country: "Uzbekistan",
    city: "Samarkand",
    imageUrl: "https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779783939/Samarkand_State_Medical_University_mwtave.webp", 
    whoApproved: true,
    avgFees: "3,850 USD per year",
    established: "1930",
    messIncluded: false,
    messCharges: "1,000 USD per year",
  },
  {
    id: "4",
    name: "Cairo University (Kasr Al-Ainy)",
    country: "Egypt",
    city: "Cairo",
    imageUrl: "https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779783977/Cairo_University_Kasr_Al-Ainy_lnwvrj.webp", 
    whoApproved: true,
    avgFees: "8,000 USD per year",
    established: "1908",
    messIncluded: false,
    messCharges: "Depends on accommodation choice",
    extraDetails: "Highly prestigious medical faculty in the Middle East."
  },
  {
    id: "5",
    name: "Namangan State University | Faculty of Medicine",
    country: "Uzbekistan",
    city: "Namangan",
    imageUrl: "https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779783938/Namangan_hzy65e.jpg", 
    whoApproved: true,
    avgFees: "3,390 USD per year",
    established: "1942",
    messIncluded: false,
    messCharges: "1,500 - 1,800 USD per year (Includes Hostel)",
    extraDetails: "Features direct flight connectivity from Delhi, Indian faculty support, and FMGE-oriented guidance."
  },
  {
    id: "6",
    name: "Avicenna Tajik State Medical University",
    country: "Tajikistan",
    city: "Dushanbe",
    imageUrl: "https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779783977/Avicenna_Tajik_State_Medical_University_eobut4.webp", 
    whoApproved: true, // Explicitly recognized by WHO & NMC
    avgFees: "4,000 USD per year",
    established: "1939",
    messIncluded: false,
    messCharges: "Approx. 180 USD per month (Includes Hostel)",
    extraDetails: "The leading medical institution in Tajikistan, named after the famous Persian physician Avicenna."
  },
];

// Reusable Sub-component for individual cards to manage their own expand state
const UniversityCard = ({ uni }: { uni: University }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="bg-[#FCFDF9] rounded-2xl overflow-hidden border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-56 bg-slate-200 w-full shrink-0">
        {uni.imageUrl ? (
          <img src={uni.imageUrl} alt={uni.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">
            Image Placeholder
          </div>
        )}
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/95 backdrop-blur-sm text-brand-dark px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
            {uni.country}
          </span>
        </div>
        
        {uni.whoApproved && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-[#11a953] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> WHO APPROVED
            </span>
          </div>
        )}

        {/* Bottom Badge */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide">{uni.city}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-[#2A3B4C] mb-6 line-clamp-2 leading-tight">
          {uni.name}
        </h3>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-1.5">Avg Fees</p>
            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-[#2A3B4C]">{uni.avgFees}</span>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-1.5">Established</p>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-[#2A3B4C] truncate" title={uni.established}>{uni.established}</span>
            </div>
          </div>
        </div>

        {/* Expanded Hidden Details via Framer Motion */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-brand-primary/5 border border-brand-primary/10 rounded-xl space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <Utensils className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-brand-dark">Mess/Food: </span>
                    <span className="text-sm text-brand-dark/80">
                      {uni.messIncluded ? "Included in fees" : "Not included"}
                    </span>
                    {!uni.messIncluded && uni.messCharges && (
                      <p className="text-xs font-semibold text-orange-600 mt-1">Extra: {uni.messCharges}</p>
                    )}
                  </div>
                </div>
                {uni.extraDetails && (
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-brand-dark/80">{uni.extraDetails}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons (Pushed to bottom) */}
        <div className="mt-auto space-y-3 pt-4">
          <Button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full bg-[#3B5B85] hover:bg-[#2A4365] text-white font-semibold h-12 rounded-xl transition-all"
          >
            {isExpanded ? "Hide Details" : "Explore University"}
          </Button>
          <Button 
            variant="outline"
            className="w-full bg-[#F3F6F9] hover:bg-[#E2E8F0] text-[#3B5B85] border-0 font-semibold h-12 rounded-xl transition-all"
          >
            Check Eligibility & Know More
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export function TopUniversities() {
  return (
    <section id="universities" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#2A3B4C]">
              Study at <span className="text-brand-primary">Global</span> Top Tier Universities
            </h2>
            <p className="text-lg text-slate-500">
              We have partnered with the world's leading medical and technical educational institutions.
            </p>
          </div>
        </div>

        {/* University Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topUniversities.map((uni) => (
            <UniversityCard key={uni.id} uni={uni} />
          ))}
        </div>

      </div>
    </section>
  );
}