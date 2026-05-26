"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  // URL Encoded string for the pre-filled email
  const developerEmailBody = "Asalamulalikum%20Haadi%2C%0A%0AI%20need%20a%20website%20with%20the%20following%20requirements%3A%0A";

  return (
    <footer className="relative border-t border-black/10 overflow-hidden">
      
      {/* Background Image - Pure image, Top aligned, No vignette, No overlays */}
      <div className="absolute inset-0 -z-10">
        <img 
          src="https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779792540/Copilot_20260526_160153_tarxyr.png" 
          alt="Footer Background" 
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6 group inline-flex">
              
              {/* LOGO SECTION */}
              <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl p-1.5 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden shrink-0 shadow-sm border border-black/10">
                <img 
                  src="/logo.png" 
                  alt="KICC Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              {/* Chocolate Text with Shadow */}
              <span className="text-3xl font-black tracking-tight text-[#4a2e1b] drop-shadow-md">
                KICC
              </span>
            </Link>
            {/* Bold Black Text */}
            <p className="text-black font-bold text-sm leading-relaxed mb-6 max-w-sm">
              Kashmir International Career Consultancy. Empowering students with trusted guidance, seamless admissions, and global opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[#4a2e1b] font-black mb-6 tracking-wide uppercase text-sm drop-shadow-sm">Explore</h4>
            <ul className="space-y-3 text-sm font-bold text-black">
              <li><Link href="/#universities" className="hover:text-[#4a2e1b] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4a2e1b] drop-shadow-sm" /> Global Universities</Link></li>
              <li><Link href="/#domestic-institutions" className="hover:text-[#4a2e1b] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4a2e1b] drop-shadow-sm" /> Indian Institutions</Link></li>
              <li><Link href="/#scholarships" className="hover:text-[#4a2e1b] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4a2e1b] drop-shadow-sm" /> Scholarships</Link></li>
              <li><Link href="/#about" className="hover:text-[#4a2e1b] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4a2e1b] drop-shadow-sm" /> About KICC</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-[#4a2e1b] font-black mb-6 tracking-wide uppercase text-sm drop-shadow-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm font-bold text-black">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#4a2e1b] shrink-0 mt-0.5 drop-shadow-sm" />
                <a href="tel:+919622618773" className="hover:text-[#4a2e1b] transition-colors">+91 9622618773</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#4a2e1b] shrink-0 mt-0.5 drop-shadow-sm" />
                <div className="flex flex-col space-y-1.5">
                  <a href="mailto:Kashmirinternational@kicc.co.in" className="hover:text-[#4a2e1b] transition-colors break-all">Kashmirinternational@kicc.co.in</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div className="lg:col-span-3">
            <h4 className="text-[#4a2e1b] font-black mb-6 tracking-wide uppercase text-sm drop-shadow-sm">Head Office</h4>
            <div className="flex items-start gap-3 text-sm font-bold text-black leading-relaxed mb-4">
              <MapPin className="w-5 h-5 text-[#4a2e1b] shrink-0 mt-0.5 drop-shadow-sm" />
              <p>
                2nd Floor, Baghat Chowk,<br />
                Al Harim Complex, Near Old Cottage Inn,<br />
                Baghat, Srinagar, J&K – 190005
              </p>
            </div>
            <a 
              href="https://maps.google.com/?q=Baghat+Chowk,Srinagar,Jammu+and+Kashmir+190005" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-black text-[#4a2e1b] hover:text-black transition-colors ml-8 drop-shadow-sm"
            >
              View on Google Maps <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-black">
          <p>© {currentYear} Kashmir International Career Consultancy. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-[#4a2e1b] transition-colors">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-[#4a2e1b] transition-colors">Privacy Policy</Link>
          </div>
        </div>

        {/* Developer Tag */}
        <div className="mt-6 text-center text-xs font-bold text-black">
          Designed and Developed by{" "}
          <a 
            href={`mailto:officialhaadi81@gmail.com?subject=Website%20Development%20Inquiry&body=${developerEmailBody}`}
            className="text-[#4a2e1b] hover:text-black font-black transition-colors drop-shadow-sm"
          >
            Team Haadi
          </a>
        </div>

      </div>
    </footer>
  );
}