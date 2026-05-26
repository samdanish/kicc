"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ExternalLink, Sparkles } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  // URL Encoded string for the pre-filled email
  const developerEmailBody = "Asalamulalikum%20Haadi%2C%0A%0AI%20need%20a%20website%20with%20the%20following%20requirements%3A%0A";

  return (
    // MOBILE OPTIMIZATION: Reduced padding (pt-10 instead of pt-16)
    <footer className="relative border-t border-black/10 overflow-hidden">
      
      {/* Background Image - Pure image, Top aligned, No vignette, No overlays */}
      <div className="absolute inset-0 -z-10">
        <img 
          src="https://res.cloudinary.com/dwwzpcnkx/image/upload/q_auto/f_auto/v1779792540/Copilot_20260526_160153_tarxyr.png" 
          alt="Footer Background" 
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-10 pb-6 md:pt-16 md:pb-8 relative z-10">
        
        {/* MOBILE OPTIMIZATION: Reduced gap from gap-12 to gap-6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 md:mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group inline-flex">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-xl p-1.5 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden shrink-0 shadow-sm border border-black/10">
                <img 
                  src="/logo.png" 
                  alt="KICC Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tight text-[#4a2e1b] drop-shadow-md">
                KICC
              </span>
            </Link>
            <p className="text-black font-bold text-xs md:text-sm leading-relaxed mb-4 max-w-sm">
              Kashmir International Career Consultancy. Empowering students with trusted guidance, seamless admissions, and global opportunities.
            </p>
          </div>

          {/* MOBILE OPTIMIZATION: Placed Links & Contact in a 2-col grid on phones to save massive vertical space! */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-5">
            {/* Quick Links */}
            <div>
              <h4 className="text-[#4a2e1b] font-black mb-3 md:mb-5 tracking-wide uppercase text-[11px] md:text-sm drop-shadow-sm">Explore</h4>
              <ul className="space-y-2 md:space-y-3 text-[11px] md:text-sm font-bold text-black">
                <li><Link href="/#universities" className="hover:text-[#4a2e1b] transition-colors flex items-center gap-1.5"><span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#4a2e1b] drop-shadow-sm" /> Global Unis</Link></li>
                <li><Link href="/#domestic-institutions" className="hover:text-[#4a2e1b] transition-colors flex items-center gap-1.5"><span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#4a2e1b] drop-shadow-sm" /> Indian Inst.</Link></li>
                <li><Link href="/#scholarships" className="hover:text-[#4a2e1b] transition-colors flex items-center gap-1.5"><span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#4a2e1b] drop-shadow-sm" /> Scholarships</Link></li>
                <li><Link href="/#about" className="hover:text-[#4a2e1b] transition-colors flex items-center gap-1.5"><span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#4a2e1b] drop-shadow-sm" /> About KICC</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-[#4a2e1b] font-black mb-3 md:mb-5 tracking-wide uppercase text-[11px] md:text-sm drop-shadow-sm">Contact</h4>
              <ul className="space-y-3 md:space-y-4 text-[11px] md:text-sm font-bold text-black">
                <li className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#4a2e1b] shrink-0 mt-0.5 drop-shadow-sm" />
                  <a href="tel:+919622618773" className="hover:text-[#4a2e1b] transition-colors">+91 9622618773</a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#4a2e1b] shrink-0 mt-0.5 drop-shadow-sm" />
                  <div className="flex flex-col space-y-1">
                    <a href="mailto:Kashmirinternational@kicc.co.in" className="hover:text-[#4a2e1b] transition-colors break-all leading-tight">Kashmirinternational<br className="md:hidden"/>@kicc.co.in</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Location & Integrated Google Map */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h4 className="text-[#4a2e1b] font-black tracking-wide uppercase text-[11px] md:text-sm drop-shadow-sm">Head Office</h4>
              <a 
                href="https://maps.google.com/?q=Baghat+Chowk,Srinagar,Jammu+and+Kashmir+190005" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-black text-[#4a2e1b] hover:text-black transition-colors bg-white/50 px-2 py-1 rounded-md border border-black/5"
              >
                Open App <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            
            <div className="flex items-start gap-2 text-[11px] md:text-xs font-bold text-black leading-tight mb-3">
              <MapPin className="w-4 h-4 text-[#4a2e1b] shrink-0 mt-0.5 drop-shadow-sm" />
              <p>
                2nd Floor, Al Harim Complex,<br />
                Near Old Cottage Inn, Baghat,<br />
                Srinagar, J&K – 190005
              </p>
            </div>

            {/* EMBEDDED GOOGLE MAP IFRAME */}
            <div className="w-full h-24 md:h-32 rounded-xl overflow-hidden shadow-inner border-[3px] border-white/60 bg-slate-200">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src="https://maps.google.com/maps?q=34.043703,74.802793&t=&z=16&ie=UTF8&iwloc=&output=embed"
                title="KICC Office Map"
                className="opacity-90 hover:opacity-100 transition-opacity"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Bottom Bar - Ultra Compact */}
        <div className="pt-5 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] md:text-xs font-bold text-black text-center md:text-left">
          <p>© {currentYear} Kashmir International Career Consultancy. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-[#4a2e1b] transition-colors">Terms & Conditions</Link>
            <span className="w-1 h-1 rounded-full bg-black/30" />
            <Link href="/privacy" className="hover:text-[#4a2e1b] transition-colors">Privacy Policy</Link>
          </div>
        </div>

        {/* "ULTRA BEST" DEVELOPER TAG 
          A glowing, sleek, dark-mode pill that stands out beautifully 
        */}
        <div className="mt-8 flex justify-center pb-2">
          <a 
            href={`mailto:officialhaadi81@gmail.com?subject=Website%20Development%20Inquiry&body=${developerEmailBody}`}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-900 via-[#2a170c] to-slate-900 rounded-full shadow-[0_8px_20px_rgba(74,46,27,0.25)] hover:shadow-[0_8px_25px_rgba(74,46,27,0.4)] transition-all duration-300 transform hover:-translate-y-1 border border-[#4a2e1b]/40 overflow-hidden"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            
            <span className="text-[10px] md:text-xs font-semibold text-slate-300 tracking-wide z-10">
              Designed & Developed by
            </span>
            
            <div className="flex items-center gap-1.5 z-10">
              <span className="text-[11px] md:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-200 to-yellow-400 drop-shadow-sm tracking-wide">
                Team Haadi
              </span>
              <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
            </div>
          </a>
        </div>

      </div>
    </footer>
  );
}