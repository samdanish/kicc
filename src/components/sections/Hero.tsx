"use client";

import { motion, type Variants } from "framer-motion";
import { Button } from "../ui/button";
import { ShieldCheck, ArrowRight, Star, GraduationCap, Users, Award, Zap } from "lucide-react";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function Hero() {
  return (
    // MOBILE OPTIMIZATION: pt-28 pb-12 on mobile instead of pt-32 pb-20
    <section id="hero" className="relative pt-28 pb-12 md:pt-40 md:pb-32 overflow-hidden bg-[#e9f0e1]">
      
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[20%] w-[80%] h-[80%] rounded-full bg-green-200/5 blur-[140px] mix-blend-multiply" />
        <div className="absolute bottom-[0%] -right-[10%] w-[70%] h-[70%] rounded-full bg-brand-gold/10 blur-[130px] mix-blend-color-burn" />
        <div className="absolute inset-0 bg-[#e9f0e1]" />
      </div>
      
      <div className="container px-4 md:px-8 mx-auto relative z-10">
        
        {/* MOBILE OPTIMIZATION: Reduced margin mb-8 instead of mb-12 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-16 flex items-center gap-3 md:gap-4"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-md border border-black/5 flex items-center justify-center p-1.5 md:p-2 transform hover:scale-105 transition-transform">
            <img 
              src="/logo.png" 
              alt="KICC Logo" 
              className="w-full h-full object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-3xl font-black text-brand-dark tracking-tight leading-none">KICC</span>
            <span className="text-[10px] md:text-xs font-bold text-brand-primary uppercase tracking-widest mt-1">Consultancy</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center mb-12">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }} className="max-w-2xl">
            
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-green-300 bg-white shadow-md shadow-green-300/10 mb-4 md:mb-6">
              <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-brand-primary" />
              <span className="text-[10px] md:text-sm font-semibold text-brand-dark leading-tight">Trusted Education Consultancy in J&K</span>
            </motion.div>

            <motion.h1 variants={fadeUpVariant} className="text-3xl md:text-5xl lg:text-[54px] font-black tracking-tight text-brand-dark mb-4 md:mb-6 leading-[1.15]">
              Building Global Careers <br className="hidden md:block" />
              Through <span className="text-brand-primary">Trusted</span> <br className="hidden md:block" />
              Educational Guidance
            </motion.h1>

            <motion.p variants={fadeUpVariant} className="text-base md:text-lg text-brand-dark/80 mb-8 md:mb-10 leading-relaxed font-medium">
              Kashmir International Career Consultancy (KICC), founded in 2020 by Danish, has rapidly become one of the most trusted educational consultancies in Jammu & Kashmir. With guidance provided to 1500+ students, KICC is dedicated to helping students achieve their global education dreams.
            </motion.p>

            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-10 z-10 relative">
              <Button size="lg" className="bg-brand-primary hover:bg-brand-dark text-white rounded-full h-12 md:h-14 px-6 md:px-8 text-sm md:text-base font-bold group shadow-lg w-full sm:w-auto">
                Book Free Counselling 
                <div className="ml-2 bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </div>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-12 md:h-14 px-6 md:px-8 text-sm md:text-base font-bold border-black/10 bg-white/5 backdrop-blur-sm text-brand-dark hover:bg-brand-light1 group w-full sm:w-auto">
                Explore Universities
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white overflow-hidden bg-brand-light3">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Student" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-brand-gold mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs md:text-sm font-semibold text-brand-dark">Trusted by 1500+ Students & Parents</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative lg:ml-auto w-full max-w-[400px] md:max-w-[500px] mx-auto mt-6 lg:mt-0">
            <div className="absolute inset-0 bg-brand-primary rounded-[100px] rounded-br-[30px] transform translate-x-3 -translate-y-3 opacity-10 z-0" />
            
            <div className="relative rounded-t-[100px] rounded-b-[30px] md:rounded-t-[140px] md:rounded-b-[40px] overflow-hidden border-[4px] md:border-[6px] border-white shadow-xl z-10 bg-brand-dark aspect-[4/5]">
              <img src="https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779777535/founder_kxowrh.jpg" alt="Founder of KICC" className="w-full h-full object-cover object-top" />
            </div>
            
            {/* Floating Badges */}
            <div className="absolute -top-4 -right-4 lg:-right-12 z-20 bg-white/95 backdrop-blur-sm px-4 py-3 md:px-6 md:py-4 rounded-2xl shadow-xl hidden md:flex flex-col items-center gap-2 transform hover:-translate-y-1 transition-transform border border-black/5">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center text-brand-primary">
                <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="text-center">
                <p className="text-lg md:text-xl font-black text-brand-dark">1500+</p>
                <p className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">Students<br/>Counselled</p>
              </div>
            </div>

          </motion.div>
        </div>

        {/* MOBILE OPTIMIZATION: Grid layout for stats bar on mobile instead of flex-row causing squishing */}
        <div className="bg-white/90 border border-green-300 backdrop-blur-md rounded-2xl md:rounded-full shadow-lg p-5 md:p-6 w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 md:flex items-center justify-around gap-6 md:gap-4 mt-10 md:mt-16 relative z-10">
          
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center text-brand-primary shrink-0"><GraduationCap className="w-5 h-5 md:w-6 md:h-6" /></div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-brand-dark mb-0.5">1500+</h3>
              <p className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-wide leading-tight">Students counselled</p>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-12 bg-black/5" />

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 shrink-0"><Users className="w-5 h-5 md:w-6 md:h-6" /></div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-brand-dark mb-0.5">25+</h3>
              <p className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-wide leading-tight">Placements</p>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-12 bg-black/5" />

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center text-brand-primary shrink-0"><Award className="w-5 h-5 md:w-6 md:h-6" /></div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-brand-dark mb-0.5">2020</h3>
              <p className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-wide leading-tight">Founded in J&K</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}