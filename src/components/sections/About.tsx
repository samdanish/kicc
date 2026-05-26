"use client";

import { motion, type Variants } from "framer-motion";
import { Target, ShieldCheck, Heart, Users, Globe2, TrendingUp, CheckCircle2 } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export function About() {
  return (
    // MOBILE OPTIMIZATION: Reduced vertical padding (py-12 instead of py-24)
    <section id="about" className="py-12 md:py-24 bg-white relative overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-brand-primary/5 rounded-l-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        
        {/* TOP SECTION: Intro & Image (Tighter gap on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-12 md:mb-20">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 font-bold mb-4 md:mb-6 text-xs md:text-sm border border-slate-200/60 shadow-sm">
              <Users className="w-3.5 h-3.5 text-brand-primary" />
              About KICC
            </div>
            
            {/* Scaled down heading for mobile */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 tracking-tight md:tracking-tighter text-brand-dark leading-[1.15]">
              Empowering Students to <span className="text-brand-primary">Succeed Globally</span>
            </h2>
            <p className="text-sm md:text-xl text-slate-500 mb-6 md:mb-8 leading-relaxed font-medium">
              Based in the heart of Kashmir, KICC is built on a foundation of absolute integrity and a relentless commitment to student success. We don't just process applications; we mentor futures.
            </p>
          </motion.div>

          {/* Right Side: Imagery */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative px-2 md:px-0"
          >
            {/* MOBILE OPTIMIZATION: aspect-[16/9] is much shorter than 4/3, saving vertical height */}
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[16/10] shadow-xl md:shadow-2xl border-[6px] md:border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" 
                alt="Students collaborating" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-dark/10" />
            </div>
            
            {/* Floating Badge - Scaled down and tucked tighter on mobile */}
            <div className="absolute -bottom-4 -left-2 md:-bottom-8 md:-left-8 bg-white/95 backdrop-blur-sm p-3 md:p-6 rounded-2xl md:rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center gap-2 md:gap-4 z-10">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-brand-primary/10 rounded-xl md:rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 md:w-7 md:h-7 text-brand-primary" />
              </div>
              <div>
                <p className="text-xl md:text-3xl font-black text-brand-dark leading-none">100%</p>
                <p className="text-[9px] md:text-sm font-bold text-slate-500 uppercase tracking-widest mt-0.5 md:mt-1">Transparency</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM SECTION: The Bento Grid Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          // MOBILE OPTIMIZATION: gap-4 instead of gap-6 to squeeze cards closer
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8"
        >
          {/* Card 1: Our Mission */}
          <motion.div variants={itemVariants} className="bg-brand-dark rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 text-white shadow-lg flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
            
            <div className="relative z-10">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <Target className="w-5 h-5 md:w-7 md:h-7 text-brand-gold" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-2 md:mb-4 text-brand-gold">Our Mission</h3>
              <p className="text-sm md:text-base text-brand-light2 font-medium leading-relaxed mb-6 md:mb-6">
                To simplify international education by providing honest, expert career counseling. We bridge the gap between ambitious students and top global universities.
              </p>
            </div>
            <div className="mt-auto relative z-10">
              <div className="h-1 w-10 md:w-12 bg-brand-gold rounded-full" />
            </div>
          </motion.div>

          {/* Card 2: Core Values */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-slate-200/60 shadow-md hover:shadow-lg transition-shadow flex flex-col">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 border border-slate-100">
              <Heart className="w-5 h-5 md:w-7 md:h-7 text-rose-500" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-brand-dark mb-4 md:mb-6">Core Values</h3>
            
            <ul className="space-y-3 md:space-y-5 mt-auto">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <span className="block text-sm md:text-base font-bold text-brand-dark leading-none mb-1">Absolute Integrity</span>
                  <span className="text-xs md:text-sm text-slate-500 font-medium">No hidden fees or false promises.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <span className="block text-sm md:text-base font-bold text-brand-dark leading-none mb-1">Student First</span>
                  <span className="text-xs md:text-sm text-slate-500 font-medium">Mentorship tailored to your goals.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <span className="block text-sm md:text-base font-bold text-brand-dark leading-none mb-1">Empathy</span>
                  <span className="text-xs md:text-sm text-slate-500 font-medium">Understanding parent concerns.</span>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Card 3: Our Impact */}
          <motion.div variants={itemVariants} className="bg-brand-primary/5 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-brand-primary/10 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 md:w-14 md:h-14 bg-brand-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <TrendingUp className="w-5 h-5 md:w-7 md:h-7 text-brand-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-brand-dark mb-2 md:mb-4">Our Impact</h3>
              <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed mb-6">
                Building a legacy of trust and transforming the educational trajectories of thousands of students.
              </p>
            </div>
            
            {/* MOBILE OPTIMIZATION: Tighter internal gap for stats grid */}
            <div className="grid grid-cols-2 gap-2 md:gap-4 mt-auto">
              <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-brand-primary/10 text-center flex flex-col justify-center">
                <p className="text-xl md:text-2xl font-black text-brand-primary mb-0.5">1500+</p>
                <p className="text-[9px] md:text-[11px] font-bold text-slate-400 uppercase tracking-wide leading-tight">Students<br className="md:hidden"/> Counselled</p>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-brand-primary/10 text-center flex flex-col justify-center">
                <p className="text-xl md:text-2xl font-black text-brand-primary mb-0.5">100%</p>
                <p className="text-[9px] md:text-[11px] font-bold text-slate-400 uppercase tracking-wide leading-tight">Visa<br className="md:hidden"/> Success</p>
              </div>
              <div className="col-span-2 bg-brand-primary p-3 md:p-4 rounded-xl md:rounded-2xl text-center text-white flex items-center justify-center gap-2 md:gap-3">
                <Globe2 className="w-5 h-5 md:w-6 md:h-6 text-white/80 shrink-0" />
                <div className="text-left">
                  <p className="text-lg md:text-xl font-black leading-none mb-0.5 md:mb-1">25+</p>
                  <p className="text-[9px] md:text-[11px] font-bold text-white/80 uppercase tracking-wider">Global Partner Countries</p>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}