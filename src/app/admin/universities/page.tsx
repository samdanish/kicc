"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, Save, CheckCircle2, Search, Filter } from "lucide-react";
import { db } from "../../../lib/firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

// Shared IDs with the frontend to ensure images map correctly
const masterInstitutions = [
  // --- BANGALORE ---
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
  { id: "bng-12", name: "JAIN (Deemed-to-be)", type: "University", state: "Bangalore" },
  { id: "bng-13", name: "REVA University", type: "University", state: "Bangalore" },
  { id: "bng-14", name: "Alliance University", type: "University", state: "Bangalore" },
  { id: "bng-15", name: "Presidency University", type: "University", state: "Bangalore" },
  { id: "bng-16", name: "Dayananda Sagar University", type: "University", state: "Bangalore" },

  // --- DELHI NCR ---
  { id: "del-1", name: "Sharda University", type: "University", state: "Delhi" },
  { id: "del-2", name: "Amity University", type: "University", state: "Delhi" },
  { id: "del-3", name: "Galgotias University", type: "University", state: "Delhi" },
  { id: "del-4", name: "Bennett University", type: "University", state: "Delhi" },
  { id: "del-5", name: "Shiv Nadar University", type: "University", state: "Delhi" },
  { id: "del-6", name: "Manav Rachna University", type: "University", state: "Delhi" },
  { id: "del-7", name: "Noida International University", type: "University", state: "Delhi" },
  { id: "del-8", name: "Jamia Millia Islamia", type: "University", state: "Delhi" },

  // --- PUNJAB ---
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
  
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [savedImages, setSavedImages] = useState<Record<string, string>>({});
  
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch from Firebase on Load
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "domesticImages"));
        const images: Record<string, string> = {};
        
        querySnapshot.forEach((doc) => {
          images[doc.id] = doc.data().imageUrl;
        });
        
        setSavedImages(images);
        setInputs(images); // Pre-fill inputs with DB URLs
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  // Save to Firebase
  const handleSave = async (id: string) => {
    setSavingId(id);
    try {
      const urlToSave = inputs[id] || "";
      // Save directly to the document with the institution's ID
      await setDoc(doc(db, "domesticImages", id), { 
        imageUrl: urlToSave 
      }, { merge: true });

      setSavedImages(prev => ({ ...prev, [id]: urlToSave }));
      setSavedId(id);
      setTimeout(() => setSavedId(null), 3000);
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save image. Check your Firebase permissions.");
    } finally {
      setSavingId(null);
    }
  };

  const filteredData = masterInstitutions.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || inst.type === filterType || inst.state === filterType;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <div className="p-8 text-slate-500 font-bold animate-pulse">Connecting to Firebase...</div>;
  }

  return (
    <div className="max-w-5xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-black text-brand-dark tracking-tight">University Image Manager</h1>
        <p className="text-slate-500 font-medium mt-1">Paste Cloudinary URLs to display images on the State Universities section.</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search universities..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredData.map((inst) => (
          <div key={inst.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row gap-6 items-center">
            
            {/* Live Image Preview */}
            <div className="w-full md:w-32 h-24 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
              {savedImages[inst.id] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={savedImages[inst.id]} alt={inst.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-slate-400">
                  <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                  <span className="text-[10px] font-bold uppercase">No Image</span>
                </div>
              )}
            </div>

            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-bold text-brand-dark">{inst.name}</h3>
                <span className="px-2 py-0.5 rounded-md bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-widest">{inst.state}</span>
              </div>
              
              <div className="flex flex-col md:flex-row gap-3">
                <input 
                  type="url" 
                  placeholder="Paste image URL..."
                  value={inputs[inst.id] || ""}
                  onChange={(e) => setInputs({ ...inputs, [inst.id]: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary"
                />
                <button 
                  onClick={() => handleSave(inst.id)}
                  disabled={savingId === inst.id || inputs[inst.id] === savedImages[inst.id]}
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-dark text-white px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 whitespace-nowrap"
                >
                  {savingId === inst.id ? "Saving..." : savedId === inst.id ? <><CheckCircle2 className="w-4 h-4" /> Saved</> : <><Save className="w-4 h-4" /> Save</>}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}