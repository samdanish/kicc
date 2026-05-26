"use client";

import { motion, type Variants} from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award } from "lucide-react";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-brand-light1">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-brand-primary/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-gold/10 blur-[120px]" />
      </div>

      <div className="container px-4 md:px-8 mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Trust Badge */}
          <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-light3 shadow-sm mb-8">
            <Award className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-semibold text-brand-dark">Kashmir&apos;s #1 International Education Consultant</span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUpVariant}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-brand-dark mb-6 leading-[1.1]">
              Your Journey to a <br className="hidden md:block" />
              <span className="text-brand-primary">Global Top University</span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
            We provide expert guidance, secure high-value scholarships, and ensure a seamless visa process for students aiming to study abroad.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="bg-brand-primary hover:bg-brand-dark text-white rounded-full h-14 px-8 text-lg w-full sm:w-auto">
              Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg border-brand-light3 hover:bg-brand-light2 w-full sm:w-auto">
              Explore Scholarships
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={fadeUpVariant} className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-20 pt-10 border-t border-brand-light3 w-full">
            <div className="flex flex-col items-center">
              <h3 className="text-3xl font-bold text-brand-dark">500+</h3>
              <p className="text-sm text-muted-foreground mt-1">Students Placed</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-3xl font-bold text-brand-dark">98%</h3>
              <p className="text-sm text-muted-foreground mt-1">Visa Success Rate</p>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col items-center">
              <h3 className="text-3xl font-bold text-brand-dark">30+</h3>
              <p className="text-sm text-muted-foreground mt-1">Partner Countries</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}