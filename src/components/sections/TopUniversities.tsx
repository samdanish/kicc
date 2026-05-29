"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { 
  MapPin, ShieldCheck, Banknote, CalendarDays, 
  Utensils, Info, ChevronDown, X, Maximize2 
} from "lucide-react";
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
    whoApproved: true, 
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

// --- CLOUDINARY OPTIMIZATION ENGINE ---
// Forces Cloudinary to deliver tiny, highly compressed thumbnails or full-res images
const getOptimizedUrl = (url: string | undefined, isThumbnail: boolean) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  
  const baseUrl = url.split("/upload/")[0];
  // Strip out existing manual transformations in the raw data
  const rawPath = url.split("/upload/")[1]?.replace(/q_auto\/f_auto\//g, "");
  
  if (isThumbnail) {
    // Ultra-fast thumbnail: 400px wide, Eco quality, Auto format
    return `${baseUrl}/upload/w_400,h_300,c_fill,q_auto:eco,f_auto/${rawPath}`;
  } else {
    // Full screen view: High quality, original dimensions
    return `${baseUrl}/upload/q_auto:good,f_auto/${rawPath}`;
  }
};

// Memoized to prevent re-renders when interacting with other parts of the page
const UniversityCard = React.memo(({ 
  uni, 
  onImageClick 
}: { 
  uni: University; 
  onImageClick: (url: string) => void 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const thumbUrl = getOptimizedUrl(uni.imageUrl, true);

  return (
    <motion.div 
      layout="position" // "position" is cheaper than full layout for 144fps
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }} // Pre-loads just before scrolling into view
      style={{ willChange: "transform, opacity" }} // Force GPU Acceleration
      className="bg-[#FCFDF9] rounded-xl md:rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-row md:flex-col w-full"
    >
      {/* IMAGE CONTAINER */}
      <div 
        className="relative w-[110px] sm:w-[140px] md:w-full h-auto min-h-[140px] md:h-48 bg-slate-200 shrink-0 group overflow-hidden cursor-pointer isolate"
        onClick={() => uni.imageUrl && onImageClick(uni.imageUrl)}
      >
        {thumbUrl ? (
          <img 
            src={thumbUrl} 
            alt={uni.name} 
            loading="lazy"
            decoding="async" // Stops image decoding from blocking the main UI thread
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium text-xs">No Image</div>
        )}
        
        {/* Click to Expand Overlay - Only shows on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20">
          <Maximize2 className="w-6 h-6 text-white drop-shadow-md" />
        </div>

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 md:opacity-100 z-0 pointer-events-none" />
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

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ willChange: "height, opacity" }}
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
            aria-label="Expand details"
            className="w-8 h-8 md:w-10 md:h-10 p-0 shrink-0 bg-[#F3F6F9] text-[#3B5B85] border-0 rounded-lg md:rounded-xl transition-colors hover:bg-slate-200"
          >
            <motion.div 
              animate={{ rotate: isExpanded ? 180 : 0 }} 
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </Button>
          <Button 
            onClick={() => scrollToSection("inquiry")}
            className="flex-1 bg-[#3B5B85] hover:bg-[#2A4365] text-white text-[11px] md:text-xs font-bold h-8 md:h-10 rounded-lg md:rounded-xl transition-all shadow-sm"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
});
UniversityCard.displayName = "UniversityCard";

export function TopUniversities() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedImage) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImage]);

  const handleImageClick = useCallback((url: string) => {
    setSelectedImage(getOptimizedUrl(url, false) ?? null); // Load full quality on click
  }, []);

  return (
    <>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
            {topUniversities.map((uni) => (
              <UniversityCard key={uni.id} uni={uni} onImageClick={handleImageClick} />
            ))}
          </div>

        </div>
      </section>

      {/* FULL SCREEN IMAGE LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 p-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              src={selectedImage} 
              alt="Full view" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing modal
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}