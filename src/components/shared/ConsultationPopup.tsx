"use client";

import { useState, useEffect, useRef } from "react";
import { X, ArrowRight, ArrowLeft, Send, Loader2, CheckCircle2 } from "lucide-react";
import { ref, push, serverTimestamp } from "firebase/database";
import { database } from "../../lib/firebase";

// Pre-defined list of common study destinations to keep the autocomplete lightning fast
const STUDY_DESTINATIONS = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "North Korea",
  "North Macedonia",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Barthelemy",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Virgin Islands, British",
  "Virgin Islands, U.S.",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Abkhazia",
  "Aland Islands",
  "Artsakh",
  "Bonaire",
  "Curacao",
  "French West Indies",
  "Kosrae",
  "Nevis",
  "Northern Cyprus",
  "Rapa Nui",
  "Saba",
  "Saint Eustatius",
  "Tahiti",
  "Transnistria",
  "Zanzibar",
  "Catalonia",
  "Scotland",
  "Wales",
  "England",
  "Basque Country",
  "Galicia",
  "Quebec",
  "Tibet",
  "Green Cape",
  "Azores",
  "Canary Islands",
  "Madeira",
  "Bali",
  "Sicily",
  "Sardinia",
  "Corsica",
  "Guernica",
  "Andaman and Nicobar Islands",
  "Lakshadweep",
  "Jeju",
  "Hokkaido",
  "Okinawa",
  "Tasmania",
  "Borneo",
  "Java",
  "Sumatra",
  "Sulawesi",
  "Lombok",
  "Fiji Islands",
  "Galapagos Islands",
  "Far East Russia",
  "Patagonia",
  "Amazon Region",
  "Caribbean Netherlands",
  "Other"
];

export default function ConsultationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Added country to form state
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", country: "" });
  
  // Autocomplete Dropdown State
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Shows up in exactly 3 seconds, every single time the page loads/refreshes.
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current && !isLoading && !isSuccess) {
      inputRef.current.focus();
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

  // Autocomplete Filtering Logic
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
        preferredCountry: formData.country, // Pushed to match your new dashboard column
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

        {/* Dynamic Progress Bar (Now out of 4 steps) */}
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

              {/* NEW STEP 4: PREFERRED COUNTRY WITH AUTOCOMPLETE */}
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
                    autoComplete="off" // Disable browser default so our custom one shows clearly
                    placeholder="Start typing a country..."
                    value={formData.country}
                    onChange={handleCountryChange}
                    onFocus={handleCountryChange}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay allows click to register
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base font-medium focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors"
                  />
                  
                  {/* Floating Autocomplete Dropdown List */}
                  {showDropdown && filteredCountries.length > 0 && (
                    <ul className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg custom-scrollbar">
                      {filteredCountries.map((country) => (
                        <li
                          key={country}
                          onMouseDown={() => selectCountry(country)} // onMouseDown fires before input's onBlur
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