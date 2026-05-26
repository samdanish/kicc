"use client";

import { motion, type Variants} from "framer-motion";
import { Target, ShieldCheck, Heart, Lightbulb, Users, Globe2, TrendingUp, CheckCircle2 } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 rounded-l-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        
        {/* TOP SECTION: Intro & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 font-bold mb-6 text-sm border border-slate-200">
              <Users className="w-4 h-4 text-brand-primary" />
              About KICC
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter text-brand-dark leading-[1.1]">
              Empowering Students to <span className="text-brand-primary">Succeed Globally</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 mb-8 leading-relaxed font-medium">
              Based in the heart of Kashmir, KICC is built on a foundation of absolute integrity and a relentless commitment to student success. We don't just process applications; we mentor futures, ensuring every deserving student finds their perfect global opportunity.
            </p>
          </motion.div>

          {/* Right Side: Imagery */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[16/10] shadow-2xl border-8 border-white">
              {/* Replace with your actual agency/office image */}
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" 
                alt="Students collaborating" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-dark/10" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-white p-6 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center gap-4">
              <div className="w-14 h-14 bg-brand-primary/10 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-brand-primary" />
              </div>
              <div>
                <p className="text-3xl font-black text-brand-dark leading-none">100%</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">Transparency</p>
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {/* Card 1: Our Mission (Dark Theme) */}
          <motion.div variants={itemVariants} className="bg-brand-dark rounded-3xl p-8 lg:p-10 text-white shadow-xl flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-brand-gold" />
              </div>
              <h3 className="text-2xl font-black mb-4">Our Mission</h3>
              <p className="text-brand-light2 font-medium leading-relaxed mb-6">
                To simplify international education by providing honest, expert career counseling. We aim to bridge the gap between ambitious students in Kashmir and top-tier global universities.
              </p>
            </div>
            <div className="mt-auto relative z-10">
              <div className="h-1 w-12 bg-brand-gold rounded-full" />
            </div>
          </motion.div>

          {/* Card 2: Core Values (White Theme) */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow flex flex-col">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
              <Heart className="w-7 h-7 text-rose-500" />
            </div>
            <h3 className="text-2xl font-black text-brand-dark mb-6">Core Values</h3>
            
            <ul className="space-y-5 mt-auto">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-brand-dark leading-none mb-1">Absolute Integrity</span>
                  <span className="text-sm text-slate-500 font-medium">No hidden fees, no false promises.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-brand-dark leading-none mb-1">Student First</span>
                  <span className="text-sm text-slate-500 font-medium">Mentorship tailored to your specific goals.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-brand-dark leading-none mb-1">Empathy</span>
                  <span className="text-sm text-slate-500 font-medium">Understanding parent and student concerns.</span>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Card 3: Our Impact (Brand Primary Theme) */}
          <motion.div variants={itemVariants} className="bg-brand-primary/5 rounded-3xl p-8 lg:p-10 border border-brand-primary/10 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-black text-brand-dark mb-4">Our Impact</h3>
              <p className="text-slate-600 font-medium leading-relaxed mb-8">
                Over the years, we have built a legacy of trust and transformed the educational trajectories of thousands of students.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <div className="bg-white p-4 rounded-2xl border border-brand-primary/10 text-center">
                <p className="text-2xl font-black text-brand-primary mb-1">1500+</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Students Counselled</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-brand-primary/10 text-center">
                <p className="text-2xl font-black text-brand-primary mb-1">100%</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Visa Success</p>
              </div>
              <div className="col-span-2 bg-brand-primary p-4 rounded-2xl text-center text-white flex items-center justify-center gap-3">
                <Globe2 className="w-6 h-6 text-white/70" />
                <div className="text-left">
                  <p className="text-xl font-black leading-none mb-1">25+</p>
                  <p className="text-[11px] font-bold text-white/70 uppercase tracking-wider">Global Partner Countries</p>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}