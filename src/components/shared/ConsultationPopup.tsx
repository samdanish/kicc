"use client";

import { useState, useEffect, useRef } from "react";
import { X, ArrowRight, ArrowLeft, Send, Loader2, CheckCircle2 } from "lucide-react";
import { ref, push, serverTimestamp } from "firebase/database";
import { database } from "../../lib/firebase";

// Pre-defined list of common study destinations to keep the autocomplete lightning fast
const STUDY_DESTINATIONS = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", 
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", 
  "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", 
  "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", 
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", 
  "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", 
  "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", 
  "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", 
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", 
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", 
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", 
  "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", 
  "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", 
  "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", 
  "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
  "Macau", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", 
  "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", 
  "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", 
  "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", 
  "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", 
  "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", 
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", 
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", 
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", 
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
  "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", 
  "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", 
  "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", 
  "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", 
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay", 
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", 
  "Zambia", "Zimbabwe", "Other"
];

export default function ConsultationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", country: "" });
  
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Shows up in exactly 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // 2. CRITICAL FIX: Freeze the background scrolling when open
  useEffect(() => {
    if (isOpen) {
      // Locks the scroll at the exact current position
      document.body.style.overflow = "hidden";
    } else {
      // Unlocks the scroll when closed
      document.body.style.overflow = "";
    }

    // Cleanup function in case the component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

useEffect(() => {
    if (isOpen && inputRef.current && !isLoading && !isSuccess) {
      // The preventScroll flag absolutely stops the page from jumping down!
      inputRef.current.focus({ preventScroll: true });
    }
  }, [step, isOpen, isLoading, isSuccess]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData({ ...formData, country: val });
    
    if (val.length > 0) {
      const filtered = STUDY_DESTINATIONS.filter(country => 
        country.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredCountries(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const selectCountry = (country: string) => {
    setFormData({ ...formData, country });
    setShowDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const inquiriesRef = ref(database, "inquiries");
      await push(inquiriesRef, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        preferredCountry: formData.country, 
        source: "Popup Multi-Step",
        createdAt: serverTimestamp(),
      });

      setIsSuccess(true);
      
      setTimeout(() => {
        setIsOpen(false);
      }, 3500);
    } catch (error) {
      console.error("Error submitting consultation:", error);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 transition-opacity">
      <div 
        className="relative w-full max-w-md animate-in fade-in zoom-in-95 rounded-2xl bg-white shadow-2xl duration-200 overflow-visible"
        role="dialog"
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <h3 className="text-xl font-black text-brand-dark tracking-tight">
            {isSuccess ? "Complete!" : "Free Consultation"}
          </h3>
          <button
            onClick={handleClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!isLoading && !isSuccess && (
          <div className="px-6 pb-6">
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-primary transition-all duration-300 ease-out"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
            <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-wider">
              Step {step} of 4
            </p>
          </div>
        )}

        <div className="px-6 pb-8">
          
          {isSuccess ? (
            <div className="py-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-2xl font-black text-slate-900">Request Received!</h3>
              <p className="text-slate-500 font-medium">Our expert counselors will contact you shortly.</p>
            </div>
          ) : isLoading ? (
            <div className="py-10 text-center animate-in fade-in zoom-in-95 duration-300">
              <Loader2 className="mx-auto h-10 w-10 text-brand-primary animate-spin mb-4" />
              <h3 className="text-lg font-bold text-brand-dark mb-1">Finalizing your request...</h3>
              <p className="text-sm text-slate-500">Securely routing to our counselors.</p>
            </div>
          ) : (
            <form onSubmit={step === 4 ? handleSubmit : handleNext} className="space-y-6 relative">
              
              {step === 1 && (
                <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                  <label htmlFor="popup-name" className="block text-sm font-bold text-slate-700 mb-2">
                    Let's start with your name
                  </label>
                  <input
                    ref={inputRef}
                    id="popup-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base font-medium focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors"
                  />
                </div>
              )}

              {step === 2 && (
                <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                  <label htmlFor="popup-phone" className="block text-sm font-bold text-slate-700 mb-2">
                    What's the best number to reach you?
                  </label>
                  <input
                    ref={inputRef}
                    id="popup-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="Mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base font-medium focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors"
                  />
                </div>
              )}

              {step === 3 && (
                <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                  <label htmlFor="popup-email" className="block text-sm font-bold text-slate-700 mb-2">
                    Your email address (Optional)
                  </label>
                  <input
                    ref={inputRef}
                    id="popup-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base font-medium focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors"
                  />
                </div>
              )}

              {step === 4 && (
                <div className="animate-in slide-in-from-right-4 fade-in duration-300 relative">
                  <label htmlFor="popup-country" className="block text-sm font-bold text-slate-700 mb-2">
                    Where do you want to study?
                  </label>
                  <input
                    ref={inputRef}
                    id="popup-country"
                    name="country"
                    type="text"
                    autoComplete="off" 
                    placeholder="Start typing a country..."
                    value={formData.country}
                    onChange={handleCountryChange}
                    onFocus={handleCountryChange}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)} 
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base font-medium focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors"
                  />
                  
                  {showDropdown && filteredCountries.length > 0 && (
                    <ul className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg custom-scrollbar">
                      {filteredCountries.map((country) => (
                        <li
                          key={country}
                          onMouseDown={() => selectCountry(country)} 
                          className="cursor-pointer px-4 py-3 text-sm font-medium text-slate-700 hover:bg-brand-primary/5 hover:text-brand-primary transition-colors border-b border-slate-50 last:border-none"
                        >
                          {country}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
                    aria-label="Go back"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}
                
                <button
                  type="submit"
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 text-sm font-bold text-white hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
                >
                  {step < 4 ? (
                    <>Next <ArrowRight className="h-4 w-4" /></>
                  ) : (
                    <>Submit Request <Send className="h-4 w-4" /></>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}