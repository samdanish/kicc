"use client";

import { useState } from "react";
import { Image as ImageIcon, Save, CheckCircle2, Search, Filter } from "lucide-react";

// Master Database strictly for Domestic Institutions & Region Banners
const masterInstitutions = [
  // --- REGION BANNERS ---
  { id: "reg-1", name: "Bangalore (Karnataka) Banner", type: "Region Banner", state: "Bangalore" },
  { id: "reg-2", name: "Delhi NCR Banner", type: "Region Banner", state: "Delhi" },
  { id: "reg-3", name: "Punjab & Chandigarh Banner", type: "Region Banner", state: "Punjab" },
  
  // --- BANGALORE INSTITUTIONS ---
  { id: "bng-1", name: "St. John’s Medical College", type: "Medical", state: "Bangalore" },
  { id: "bng-2", name: "Kempegowda Institute of Medical Sciences", type: "Medical", state: "Bangalore" },
  { id: "bng-3", name: "Vydehi Institute of Medical Sciences", type: "Medical", state: "Bangalore" },
  { id: "bng-4", name: "M.S. Ramaiah Medical College", type: "Medical", state: "Bangalore" },
  { id: "bng-5", name: "BGS Global Institute of Medical Sciences", type: "Medical", state: "Bangalore" },
  { id: "bng-6", name: "BMS College of Engineering", type: "Engineering", state: "Bangalore" },
  { id: "bng-7", name: "PES University", type: "Engineering", state: "Bangalore" },
  { id: "bng-8", name: "Ramaiah Institute of Technology", type: "Engineering", state: "Bangalore" },
  { id: "bng-9", name: "RV College of Engineering", type: "Engineering", state: "Bangalore" },
  { id: "bng-10", name: "Dayananda Sagar College", type: "Engineering", state: "Bangalore" },
  { id: "bng-11", name: "Christ University", type: "University", state: "Bangalore" },
  { id: "bng-12", name: "JAIN (Deemed-to-be University)", type: "University", state: "Bangalore" },
  { id: "bng-13", name: "REVA University", type: "University", state: "Bangalore" },
  { id: "bng-14", name: "Alliance University", type: "University", state: "Bangalore" },
  { id: "bng-15", name: "Presidency University", type: "University", state: "Bangalore" },
  { id: "bng-16", name: "Dayananda Sagar University", type: "University", state: "Bangalore" },

  // --- DELHI NCR INSTITUTIONS ---
  { id: "del-1", name: "Sharda University", type: "University", state: "Delhi" },
  { id: "del-2", name: "Amity University", type: "University", state: "Delhi" },
  { id: "del-3", name: "Galgotias University", type: "University", state: "Delhi" },
  { id: "del-4", name: "Bennett University", type: "University", state: "Delhi" },
  { id: "del-5", name: "Shiv Nadar University", type: "University", state: "Delhi" },
  { id: "del-6", name: "Manav Rachna University", type: "University", state: "Delhi" },
  { id: "del-7", name: "Noida International University", type: "University", state: "Delhi" },
  { id: "del-8", name: "Jamia Millia Islamia", type: "University", state: "Delhi" },

  // --- PUNJAB INSTITUTIONS ---
  { id: "pun-1", name: "Chitkara University", type: "University", state: "Punjab" },
  { id: "pun-2", name: "Lovely Professional University", type: "University", state: "Punjab" },
  { id: "pun-3", name: "Adesh University", type: "University", state: "Punjab" },
  { id: "pun-4", name: "CT University", type: "University", state: "Punjab" },
  { id: "pun-5", name: "Saraswati Group of Colleges", type: "College", state: "Punjab" },
  { id: "pun-6", name: "Swami Vivekanand Institute", type: "College", state: "Punjab" },
  { id: "pun-7", name: "Universal Group of Institutions", type: "College", state: "Punjab" },
];

export default function UniversitiesAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const handleSave = (id: string) => {
    setSavingId(id);
    // Simulate database update
    setTimeout(() => {
      setSavingId(null);
      setSavedId(id);
      setTimeout(() => setSavedId(null), 3000);
    }, 800);
  };

  const filteredData = masterInstitutions.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || inst.type === filterType || inst.state === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-5xl space-y-8">
      
      <div>
        <h1 className="text-3xl font-black text-brand-dark tracking-tight">Domestic Image Manager</h1>
        <p className="text-slate-500 font-medium mt-1">Assign Cloudinary image URLs to individual domestic institution cards and region banners.</p>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search domestic institutions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 hidden md:block" />
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-sm font-bold text-slate-600 py-2.5 px-4 rounded-xl outline-none focus:border-brand-primary w-full md:w-auto"
          >
            <option value="All">All Categories</option>
            <option value="Region Banner">Region Banners Only</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Delhi">Delhi NCR</option>
            <option value="Punjab">Punjab & Chandigarh</option>
          </select>
        </div>
      </div>

      {/* Institution List */}
      <div className="space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((inst) => (
            <div key={inst.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row gap-6 items-center">
              
              {/* Image Preview */}
              <div className="w-full md:w-32 h-24 bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-slate-400 shrink-0">
                <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Preview</span>
              </div>

              {/* Data & Input */}
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-brand-dark">{inst.name}</h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-widest">
                      {inst.state}
                    </span>
                    {inst.type === "Region Banner" && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        Banner
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-3 items-center">
                  <input 
                    type="url" 
                    placeholder="Paste Cloudinary image URL here..." 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary transition-all"
                  />
                  <button 
                    onClick={() => handleSave(inst.id)}
                    disabled={savingId === inst.id}
                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-dark text-white px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-70 whitespace-nowrap"
                  >
                    {savingId === inst.id ? (
                      <span className="animate-pulse">Saving...</span>
                    ) : savedId === inst.id ? (
                      <><CheckCircle2 className="w-4 h-4" /> Saved</>
                    ) : (
                      <><Save className="w-4 h-4" /> Update Image</>
                    )}
                  </button>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-500 font-bold">No institutions found matching your search.</p>
          </div>
        )}
      </div>

    </div>
  );
}