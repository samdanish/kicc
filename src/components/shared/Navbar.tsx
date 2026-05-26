"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const navItems = [
  { name: "Home", id: "hero" },
  { name: "Universities", id: "universities" },
  { name: "Scholarships", id: "scholarships" },
  { name: "About Us", id: "about" },
  { name: "Inquiry", id: "inquiry" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      const currentSection = sections.find((section) => {
        if (!section) return false;
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        return scrollPosition >= sectionTop && scrollPosition < sectionBottom;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      } else if (window.scrollY < 300) {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    
    if (element) {
      const navHeight = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setActiveSection(id);
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection("hero");
  };

  return (
    // Fixed Width Constraint: w-[95%] on mobile, w-auto on larger screens
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto max-w-7xl group transition-all duration-300">
      <div 
        className={`flex items-center justify-between gap-2 md:gap-6 rounded-full transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 border-b border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] shadow-[0_1px_1px_rgba(0,0,0,0.05)] py-2 px-2 md:px-4" 
            : "bg-white/95 border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.06)] py-2 px-2 md:py-3 md:px-5"
        }`}
      >
        
        {/* LOGO SECTION - NAVBAR */}
        <a 
          href="#hero" 
          onClick={scrollToTop}
          className="flex items-center justify-center shrink-0 ml-1 md:ml-0"
        >
          <div className="w-15 h-15 overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-105 shrink-0">
            <img 
              src="/logo.png" 
              alt="KICC Logo" 
              className="w-full h-full object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </a>

        {/* Desktop Nav - Links */}
        <nav className="hidden lg:flex items-center gap-1 shrink-0">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScrollTo(e, item.id)}
              className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                activeSection === item.id
                  ? "bg-brand-primary/10 text-brand-primary shadow-inner border border-brand-primary/5" 
                  : "text-brand-dark hover:text-brand-primary hover:bg-black/5"
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Menu (forced shrink-0 to prevent text splitting) */}
        <div className="flex items-center gap-2 shrink-0">
          <Button 
            onClick={(e) => handleScrollTo(e as any, 'inquiry')}
            className="bg-[#29bf12] hover:bg-brand-dark text-white rounded-full h-10 md:h-11 px-4 md:px-6 text-xs md:text-sm font-bold shadow-lg shadow-[#29bf12]/20 transition-all duration-300 hover:shadow-[#29bf12]/40 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
          >
            Book Free Counselling <ArrowRight className="hidden md:block ml-1.5 w-4 h-4" />
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden z-50 p-2.5 text-brand-dark rounded-full bg-slate-100 border border-black/5 shadow-sm transition-all shrink-0 mr-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[90vw] bg-white rounded-3xl shadow-2xl border border-black/5 flex flex-col p-4 lg:hidden">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScrollTo(e, item.id)}
              className={`px-6 py-4 rounded-xl text-center font-bold transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-brand-dark hover:bg-slate-50"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}