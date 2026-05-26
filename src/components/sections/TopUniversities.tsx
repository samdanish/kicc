"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { MapPin, ShieldCheck, Banknote, CalendarDays, Utensils, Info, ChevronDown } from "lucide-react";
import { University } from "../../types";

const topUniversities: University[] = [
    {
    id: "1",
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
    id: "2",
    name: "Tashkent Pharmaceutical Institute",
    country: "Uzbekistan",
    city: "Tashkent",
    imageUrl: "https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779783978/Tashkent_Pharmaceutical_Institute_gxni1u.png", 
    whoApproved: true,
    avgFees: "3,500 USD/yr",
    established: "1937",
    messIncluded: false,
    messCharges: "1,200 USD/yr",
    extraDetails: "Hostel & insurance separate."
  },
  {
    id: "3",
    name: "Dhaka National Medical College",
    country: "Bangladesh",
    city: "Dhaka",
    imageUrl: "https://res.cloudinary.com/drytpdpx3/image/upload/v1779458842/Dhaka_National_Medical_College_zmw6oa.webp", 
    whoApproved: true, // Explicitly recognized by WHO & NMC
    avgFees: "54000 USD Total",
    established: "1994",
    messIncluded: false,
    messCharges: "Approx. 30 USD per month (Includes Hostel)",
    extraDetails: "Dhaka National Medical College is one of the oldest and most respected private medical colleges in Bangladesh."
  },
  {
    id: "4",
    name: "Samarkand State Medical University",
    country: "Uzbekistan",
    city: "Samarkand",
    imageUrl: "https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779783939/Samarkand_State_Medical_University_mwtave.webp", 
    whoApproved: true,
    avgFees: "3,850 USD/yr",
    established: "1930",
    messIncluded: false,
    messCharges: "1,000 USD/yr",
  },
  {
    id: "5",
    name: "Cairo University (Kasr Al-Ainy)",
    country: "Egypt",
    city: "Cairo",
    imageUrl: "https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779783977/Cairo_University_Kasr_Al-Ainy_lnwvrj.webp", 
    whoApproved: true,
    avgFees: "8,000 USD/yr",
    established: "1908",
    messIncluded: false,
    messCharges: "Varies",
    extraDetails: "Highly prestigious."
  },

    {
    id: "6",
    name: "Tashkent State Dental / Medical Univ.",
    country: "Uzbekistan",
    city: "Tashkent",
    imageUrl: "https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779783948/Tashkent_State_Dental_laiueq.png", 
    whoApproved: true,
    avgFees: "3,500 USD/yr",
    established: "Oldest in region",
    messIncluded: true,
    extraDetails: "Premier dental institute."
  },

];

const UniversityCard = ({ uni }: { uni: University }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      // NO HORIZONTAL SCROLL: Uses flex-row (side-by-side) on mobile, flex-col on desktop
      className="bg-[#FCFDF9] rounded-xl md:rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-md transition-all flex flex-row md:flex-col w-full"
    >
      {/* IMAGE CONTAINER: 1/3 width on mobile, full width on desktop */}
      <div className="relative w-[110px] sm:w-[140px] md:w-full h-auto min-h-[140px] md:h-48 bg-slate-200 shrink-0 group overflow-hidden">
        {uni.imageUrl ? (
          <img src={uni.imageUrl} alt={uni.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium text-xs">No Image</div>
        )}
        
        {/* Tiny Badges */}
        <div className="absolute top-2 left-2 z-10 hidden md:block">
          <span className="bg-white/95 backdrop-blur-sm text-brand-dark px-2 py-1 rounded text-[10px] font-bold shadow-sm">
            {uni.country}
          </span>
        </div>
        
        {uni.whoApproved && (
          <div className="absolute bottom-2 left-2 z-10 md:top-2 md:bottom-auto md:right-2 md:left-auto">
            <span className="bg-[#11a953]/95 backdrop-blur-sm text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[8px] md:text-[10px] font-bold shadow-sm flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5 md:w-3 md:h-3" /> WHO
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 md:opacity-100" />
      </div>

      {/* CONTENT CONTAINER */}
      <div className="p-3 md:p-4 flex flex-col flex-grow justify-between w-full">
        <div>
          <div className="flex items-center gap-1 text-slate-500 mb-1 md:hidden">
            <MapPin className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{uni.city}, {uni.country}</span>
          </div>
          <h3 className="text-[13px] sm:text-sm md:text-lg font-bold text-[#2A3B4C] mb-2 md:mb-3 line-clamp-2 md:line-clamp-none leading-tight">
            {uni.name}
          </h3>

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 md:mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100 gap-1.5 md:gap-0">
            <div className="flex items-center gap-1.5">
              <Banknote className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span className="text-[11px] md:text-sm font-bold text-[#2A3B4C]">{uni.avgFees}</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-slate-200" />
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="text-[11px] md:text-sm font-bold text-[#2A3B4C] truncate">{uni.established}</span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-2 md:p-3 bg-brand-primary/5 border border-brand-primary/10 rounded-lg space-y-1.5 mb-3">
                <div className="flex items-start gap-1.5 text-[10px] md:text-xs">
                  <Utensils className="w-3 h-3 text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-dark">Food: </span>
                    <span className="text-brand-dark/80">{uni.messIncluded ? "Included" : uni.messCharges || "Not included"}</span>
                  </div>
                </div>
                {uni.extraDetails && (
                  <div className="flex items-start gap-1.5 text-[10px] md:text-xs">
                    <Info className="w-3 h-3 text-brand-primary shrink-0 mt-0.5" />
                    <p className="text-brand-dark/80">{uni.extraDetails}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto flex gap-2 pt-1">
          <Button 
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            className="w-8 h-8 md:w-10 md:h-10 p-0 shrink-0 bg-[#F3F6F9] text-[#3B5B85] border-0 rounded-lg md:rounded-xl"
          >
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}><ChevronDown className="w-4 h-4" /></motion.div>
          </Button>
          <Button className="flex-1 bg-[#3B5B85] hover:bg-[#2A4365] text-white text-[11px] md:text-xs font-bold h-8 md:h-10 rounded-lg md:rounded-xl transition-all shadow-sm">
            Apply Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export function TopUniversities() {
  return (
    <section id="universities" className="py-12 md:py-20 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="mb-6 md:mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-black mb-2 text-[#2A3B4C] leading-tight">
            Top Tier <span className="text-brand-primary">Universities</span>
          </h2>
          <p className="text-xs md:text-base text-slate-500 max-w-xl mx-auto md:mx-0">
            Partnered with the world's leading medical institutions.
          </p>
        </div>

        {/* CSS GRID Layout for mobile and desktop - NO horizontal scrolling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
          {topUniversities.map((uni) => (
            <UniversityCard key={uni.id} uni={uni} />
          ))}
        </div>

      </div>
    </section>
  );
} 