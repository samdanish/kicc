"use client";

import { motion, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Trophy, ArrowRight } from "lucide-react";
import { University } from "../../types";

// Temporary Mock Data (This will come from Firebase later)
const topUniversities: University[] = [
  {
    id: "1",
    name: "University of Oxford",
    country: "United Kingdom",
    ranking: "World #1",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
    isTopUniversity: true,
    scholarshipsAvailable: true,
  },
  {
    id: "2",
    name: "Stanford University",
    country: "United States",
    ranking: "World #2",
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop",
    isTopUniversity: true,
    scholarshipsAvailable: true,
  },
  {
    id: "3",
    name: "University of Toronto",
    country: "Canada",
    ranking: "World #21",
    imageUrl: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?q=80&w=800&auto=format&fit=crop",
    isTopUniversity: true,
    scholarshipsAvailable: false,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export function TopUniversities() {
  return (
    <section id="universities" className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Study at <span className="text-brand-primary">Global</span> Top Tier Universities
            </h2>
            <p className="text-lg text-muted-foreground">
              We have partnered with the world&apos;s leading educational institutions to bring you the best academic opportunities.
            </p>
          </div>
          <button className="flex items-center gap-2 text-brand-primary font-semibold hover:text-brand-dark transition-colors group">
            View All Universities 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* University Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {topUniversities.map((uni) => (
            <motion.div key={uni.id} variants={cardVariants}>
              <Card className="overflow-hidden border-0 shadow-lg group cursor-pointer hover:shadow-xl transition-all duration-300 rounded-2xl">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-brand-light2">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={uni.imageUrl} 
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    {uni.ranking && (
                      <Badge className="bg-white text-brand-dark hover:bg-white/90 backdrop-blur-md shadow-sm border-0 font-semibold">
                        <Trophy className="w-3 h-3 mr-1 text-brand-gold" />
                        {uni.ranking}
                      </Badge>
                    )}
                  </div>
                  {uni.scholarshipsAvailable && (
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className="bg-brand-primary text-white border-0">
                        Scholarships
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <CardContent className="p-6 bg-white">
                  <div className="flex items-center gap-1 text-sm font-medium text-brand-primary mb-2">
                    <MapPin className="w-4 h-4" />
                    {uni.country}
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">
                    {uni.name}
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}