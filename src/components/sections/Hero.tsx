"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Star, GraduationCap, Users, Award, Sparkles } from "lucide-react";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Smooth scroll handler with offset for the sticky navbar
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80; // 80px offset
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="relative pt-24 pb-12 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-[#e9f0e1] to-[#fbfbfc]"
    >
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }} 
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      >
        <motion.div 
          animate={{ scale: [1, 1.1, 1], x: [0, 15, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] rounded-full bg-brand-primary/10 blur-[100px] mix-blend-multiply" 
        />
        <motion.div 
          animate={{ scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-gold/15 blur-[90px] mix-blend-color-burn" 
        />
      </motion.div>
      
      <div className="container px-4 md:px-8 mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center mb-10 text-center lg:text-left mt-4 md:mt-8">
          
          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            animate="visible" 
            className="max-w-2xl mx-auto lg:mx-0"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-green-300/50 bg-white/80 backdrop-blur-md shadow-lg shadow-brand-primary/5 mb-6 md:mb-8">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-brand-gold animate-pulse" />
              <span className="text-[11px] md:text-sm font-bold text-brand-dark leading-tight uppercase tracking-wide">Trusted Education Consultancy in J&K</span>
            </motion.div>

            <motion.h1 variants={fadeUpVariant} className="text-[38px] sm:text-5xl lg:text-[56px] font-black tracking-tighter text-brand-dark mb-5 md:mb-6 leading-[1.1]">
              Building Global Careers <br className="hidden sm:block" />
              Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary relative inline-block">Trusted
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-gold/40 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span> <br className="hidden sm:block" />
              Educational Guidance
            </motion.h1>

            <motion.p variants={fadeUpVariant} className="text-[14px] sm:text-base md:text-lg text-brand-dark/75 mb-8 md:mb-10 leading-relaxed font-medium max-w-lg mx-auto lg:mx-0">
              Founded in 2020 by Danish, we have rapidly become one of the most trusted educational consultancies in Jammu & Kashmir.
            </motion.p>

            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 z-10 relative items-center justify-center lg:justify-start">
              <motion.div whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection("lead-form")}
                  className="w-full bg-brand-primary hover:bg-brand-dark text-white rounded-full h-12 md:h-14 px-6 md:px-8 text-sm md:text-base font-bold group shadow-xl shadow-brand-primary/25 transition-all"
                >
                  Book Free Counselling 
                  <div className="ml-2 bg-white/20 rounded-full p-1 group-hover:translate-x-1.5 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Button>
              </motion.div>
              <motion.div whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => scrollToSection("top-universities")}
                  className="w-full rounded-full h-12 md:h-14 px-6 md:px-8 text-sm md:text-base font-bold border-black/10 bg-white/50 backdrop-blur-md text-brand-dark hover:bg-white group shadow-sm transition-all"
                >
                  Explore Universities
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-brand-light3"
                  >
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Student" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-1 text-brand-gold mb-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] md:text-sm font-semibold text-brand-dark/80">Trusted by 1500+ Students</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }} 
            animate={{ opacity: 1, scale: 1, rotate: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} 
            style={{ y: yImage }}
            className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[450px] mx-auto mt-8 lg:mt-0"
          >
            <motion.div 
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-brand-primary rounded-[80px] rounded-bl-[30px] transform translate-x-4 -translate-y-4 opacity-15 z-0" 
            />
            
            <div className="relative rounded-[60px] rounded-br-[20px] md:rounded-[80px] md:rounded-br-[30px] overflow-hidden border-[6px] border-white shadow-2xl z-10 bg-brand-dark aspect-[4/5] transform transition-transform hover:scale-[1.02] duration-500">
              <img src="https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779777535/founder_kxowrh.jpg" alt="Founder of KICC" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </div>
            
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-6 sm:-left-8 z-20 bg-white/95 backdrop-blur-md px-3 py-2.5 md:px-5 md:py-4 rounded-2xl shadow-xl flex items-center gap-2 md:gap-3 border border-black/5"
            >
              <div className="w-8 h-8 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center text-brand-primary shadow-inner">
                <GraduationCap className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <div className="text-left">
                <p className="text-sm md:text-xl font-black text-brand-dark leading-none">1500+</p>
                <p className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Counselled</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 md:mt-20 w-full max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-between gap-3 md:gap-0 bg-transparent md:bg-white/80 md:border md:border-green-200 md:backdrop-blur-xl rounded-3xl md:rounded-full md:shadow-xl p-0 md:p-6 md:px-10">
            
            <div className="bg-white/90 md:bg-transparent border border-black/5 md:border-none backdrop-blur-md rounded-2xl p-3 md:p-0 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-center md:text-left shadow-sm md:shadow-none">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100/80 rounded-full flex items-center justify-center text-brand-primary"><GraduationCap className="w-5 h-5 md:w-6 md:h-6" /></div>
              <div>
                <h3 className="text-xl md:text-3xl font-black text-brand-dark mb-0.5">1500+</h3>
                <p className="text-[9px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest">Students</p>
              </div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-black/10" />

            <div className="bg-white/90 md:bg-transparent border border-black/5 md:border-none backdrop-blur-md rounded-2xl p-3 md:p-0 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-center md:text-left shadow-sm md:shadow-none">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100/80 rounded-full flex items-center justify-center text-yellow-600"><Users className="w-5 h-5 md:w-6 md:h-6" /></div>
              <div>
                <h3 className="text-xl md:text-3xl font-black text-brand-dark mb-0.5">25+</h3>
                <p className="text-[9px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest">Placements</p>
              </div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-black/10" />

            <div className="col-span-2 md:col-span-1 bg-white/90 md:bg-transparent border border-black/5 md:border-none backdrop-blur-md rounded-2xl p-3 md:p-0 flex flex-row items-center justify-center gap-3 md:gap-4 shadow-sm md:shadow-none">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100/80 rounded-full flex items-center justify-center text-brand-primary"><Award className="w-5 h-5 md:w-6 md:h-6" /></div>
              <div className="text-left">
                <h3 className="text-xl md:text-3xl font-black text-brand-dark mb-0.5">2020</h3>
                <p className="text-[9px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest">Founded in J&K</p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}