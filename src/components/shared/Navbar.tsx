"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <div className="bg-brand-primary p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-brand-dark">
            KICC
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-brand-dark/80">
          <Link href="#universities" className="hover:text-brand-primary transition-colors">Universities</Link>
          <Link href="#scholarships" className="hover:text-brand-primary transition-colors">Scholarships</Link>
          <Link href="#about" className="hover:text-brand-primary transition-colors">About Us</Link>
          <Link href="#faq" className="hover:text-brand-primary transition-colors">FAQ</Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button className="bg-brand-primary hover:bg-brand-dark text-white rounded-full px-6">
            Get Free Consultation
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 p-2 text-brand-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 text-xl font-semibold md:hidden">
            <Link href="#universities" onClick={() => setIsMobileMenuOpen(false)}>Universities</Link>
            <Link href="#scholarships" onClick={() => setIsMobileMenuOpen(false)}>Scholarships</Link>
            <Link href="#about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Button className="bg-brand-primary w-[80%] rounded-full mt-4">
              Get Free Consultation
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}