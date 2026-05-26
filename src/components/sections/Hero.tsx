"use client";

import { motion, type Variants} from "framer-motion";
import { Button } from "../ui/button";
import { ShieldCheck, ArrowRight, Star, GraduationCap, Users, Award, Zap } from "lucide-react";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function Hero() {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#e9f0e1]">
      {/* Soft Sprayed-on Gradient Background Effect (Layered, highly blurred divs) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[20%] w-[80%] h-[80%] rounded-full bg-green-200/5 blur-[140px] mix-blend-multiply" />
        <div className="absolute bottom-[0%] -right-[10%] w-[70%] h-[70%] rounded-full bg-brand-gold/10 blur-[130px]mix-blend-color-burn" />
        <div className="absolute inset-0 bg-[#e9f0e1]" />
      </div>
      
      <div className="container px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-12">
          
          {/* Left Column: Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="max-w-2xl"
          >
            {/* Trust Badge */}
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-300 bg-white shadow-md shadow-green-300/10 mb-6">
              <ShieldCheck className="w-5 h-5 text-brand-primary" />
              <span className="text-sm font-semibold text-brand-dark">Trusted International Education Consultancy in Jammu & Kashmir</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-brand-dark mb-6 leading-[1.15]">
              Building Global Careers <br className="hidden md:block" />
              Through <span className="text-brand-primary">Trusted</span> <br className="hidden md:block" />
              Educational Guidance
            </motion.h1>

            {/* Paragraph */}
            <motion.p variants={fadeUpVariant} className="text-lg text-brand-dark/80 mb-10 leading-relaxed">
              Kashmir International Career Consultancy (KICC), founded in 2020 by Danish, has rapidly become one of the most trusted educational consultancies in Jammu & Kashmir. With guidance provided to 1500+ students and 25+ successful international placements, KICC is dedicated to helping students achieve their global education dreams.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4 mb-10 z-10 relative">
              <Button size="lg" className="bg-brand-primary hover:bg-brand-dark text-white rounded-full h-14 px-8 text-base font-semibold group transition-all shadow-lg shadow-brand-primary/25 w-full sm:w-auto">
                Book Free Counselling 
                <div className="ml-3 bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base font-semibold border-black/10 bg-white/5 backdrop-blur-sm text-brand-dark hover:bg-brand-light1 group w-full sm:w-auto">
                Explore Universities
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-brand-light3">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Student" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-brand-gold mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-brand-dark">Trusted by 1500+ Students & Parents</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Imagery & Badges */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative lg:ml-auto w-full max-w-[500px] mx-auto mt-12 lg:mt-0"
          >
            {/* Design Element Backgrounds */}
            <div className="absolute inset-0 bg-brand-primary rounded-[120px] rounded-br-[40px] transform translate-x-4 -translate-y-4 opacity-10 z-0" />
            
            {/* Main Image Container (Arch Style) */}
            <div className="relative rounded-t-[140px] rounded-b-[40px] overflow-hidden border-[6px] border-white shadow-2xl z-10 bg-brand-dark aspect-[4/5]">
              <img 
                src="https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779777535/founder_kxowrh.jpg" 
                alt="Danish - Founder of KICC"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-6 -right-6 lg:-right-12 z-20 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl hidden md:flex flex-col items-center gap-2 transform hover:-translate-y-1 transition-transform border border-black/5">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-brand-primary">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-xl font-black text-brand-dark">1500+</p>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Students<br/>Counselled</p>
              </div>
            </div>

            <div className="absolute bottom-16 -right-4 lg:-right-10 z-20 bg-brand-primary px-5 py-4 rounded-2xl shadow-xl hidden md:flex items-center gap-3 border border-white/20 transform hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-white/80">Expert Visa Status</p>
                <p className="text-base font-bold text-white">100% Secure</p>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Bottom Statistics Bar */}
        <div className="bg-white/90 border border-green-300 backdrop-blur-md rounded-full shadow-lg p-6 w-full max-w-6xl mx-auto flex items-center justify-around gap-4 text-center mt-12 md:mt-16 relative z-10">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-brand-primary shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-brand-dark mb-0.5">1500+</h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide leading-tight">Students counselled</p>
            </div>
          </div>
          
          <div className="w-px h-12 bg-black/5" />

          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center text-brand-gold shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-brand-dark mb-0.5">25+</h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide leading-tight">International placements</p>
            </div>
          </div>
          
          <div className="w-px h-12 bg-black/5" />

          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-brand-primary shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-brand-dark mb-0.5">2020</h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide leading-tight">Founded in J&K</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}