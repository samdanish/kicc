"use client";

import { useState } from "react";
import { MapPin, Calendar, Building2, ShieldCheck, Sparkles } from "lucide-react";

// Pre-structured data from your list
const destinations = {
  Kazakhstan: [
    { name: "Kazakh National Medical University", year: "1930", detail: "Almaty" },
    { name: "Astana Medical University", year: "1964", detail: "Astana" },
    { name: "Karaganda Medical University", year: "1950", detail: "Karaganda" },
    { name: "Semey Medical University", year: "1953", detail: "Semey" },
    { name: "Al-Farabi Kazakh National University", year: "1934", detail: "Almaty" },
    { name: "South Kazakhstan Medical Academy", year: "1979", detail: "Shymkent" },
    { name: "West Kazakhstan Marat Ospanov Medical University", year: "1957", detail: "Aktobe" },
    { name: "International Kazakh-Turkish University", year: "1991", detail: "Turkistan" },
  ],
  Egypt: [
    { name: "Cairo University Faculty of Medicine", year: "1908", detail: "Cairo" },
    { name: "Alexandria University Faculty of Medicine", year: "1942", detail: "Alexandria" },
    { name: "Ain Shams University Faculty of Medicine", year: "1947", detail: "Cairo" },
  ],
  Kyrgyzstan: [
    { name: "Kyrgyz State Medical Academy (KSMA)", year: "1939", detail: "Bishkek" },
    { name: "Osh State University", year: "1951", detail: "Osh" },
    { name: "Jalal-Abad State University", year: "1993", detail: "Jalal-Abad" },
    { name: "Kyrgyz Russian Slavic University", year: "1993", detail: "Bishkek" },
    { name: "International School of Medicine (ISM)", year: "2003", detail: "Bishkek" },
    { name: "International Higher School of Medicine (IHSM)", year: "2003", detail: "Bishkek" },
    { name: "Asian Medical Institute", year: "2004", detail: "Kant" },
    { name: "Central Asian International Medical University", year: "2000", detail: "Bishkek" },
    { name: "Bishkek International Medical Institute", year: "2018", detail: "Bishkek" },
  ],
  Bangladesh: [
    { name: "Dhaka Medical College", year: "1946", detail: "Government" },
    { name: "Sir Salimullah Medical College", year: "1875", detail: "Government" },
    { name: "Bangladesh Medical College", year: "1986", detail: "Private" },
    { name: "Dhaka National Medical College", year: "1925", detail: "Private" },
    { name: "Jalalabad Ragib Rabeya Medical College", year: "1995", detail: "Private" },
    { name: "Holy Family Red Crescent Medical College", year: "1999", detail: "Private" },
    { name: "Khwaja Yunus Ali Medical College", year: "2005", detail: "Private (Budget-friendly)" },
    { name: "Green Life Medical College", year: "2009", detail: "Private (Modern infra)" },
    { name: "Anwer Khan Modern Medical College", year: "2008", detail: "Private" },
    { name: "East West Medical College", year: "2000", detail: "Private" },
  ],
};

const countries = Object.keys(destinations) as Array<keyof typeof destinations>;

export function GlobalDestinations() {
  const [activeTab, setActiveTab] = useState<keyof typeof destinations>("Kazakhstan");

  return (
    // UPDATED BACKGROUND CLASS HERE matching the Hero section
    <section className="py-24 bg-gradient-to-b from-[#e9f0e1] to-[#fbfbfc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-bold tracking-wide uppercase mb-4">
            <Sparkles className="w-4 h-4" /> Comprehensive Network
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight mb-4">
            Global Medical Destinations
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Explore our extensive network of MCI & WHO approved medical institutions across top international destinations.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => setActiveTab(country)}
              className={`relative px-6 py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-300 ${
                activeTab === country
                  ? "bg-brand-dark text-white shadow-lg scale-105"
                  : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {country}
              {activeTab === country && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 min-h-[400px] content-start">
          {destinations[activeTab].map((uni, index) => (
            <div
              key={`${uni.name}-${activeTab}`}
              className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-brand-primary/30 shadow-sm hover:shadow-md transition-all duration-300 animate-in fade-in zoom-in-95 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <Building2 className="w-5 h-5" />
                </div>
                <ShieldCheck className="w-5 h-5 text-green-500/50" />
              </div>
              
              <h3 className="font-bold text-brand-dark text-lg leading-tight mb-4 group-hover:text-brand-primary transition-colors">
                {uni.name}
              </h3>
              
              <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Established: {uni.year}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {uni.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}