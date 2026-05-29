"use client";

import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../../lib/firebase"; 
import { Search, Loader2, Calendar, Mail, Phone, User, Globe } from "lucide-react";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const inquiriesRef = ref(database, "inquiries");
        const snapshot = await get(inquiriesRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Convert Realtime DB object to array and add the unique key as 'id'
          const formattedData = Object.entries(data).map(([key, value]: any) => ({
            id: key,
            ...value,
          }));
          
          // Sort by newest first
          formattedData.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          });

          setInquiries(formattedData);
        } else {
          setInquiries([]);
        }
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  // Filter inquiries based on search term
  const filteredInquiries = inquiries.filter((inq) => 
    inq.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.country?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inq.preferredCountry?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-dark tracking-tight">Student Inquiries</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and respond to consultation requests.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search name, email, or country..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-full md:w-72"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200">
          <Loader2 className="w-8 h-8 text-brand-primary animate-spin mb-4" />
          <p className="text-slate-500 font-bold">Loading inquiries...</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Student Name</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Info</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Preferred Destination</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInquiries.length > 0 ? (
                  filteredInquiries.map((inq) => {
                    const date = inq.createdAt ? new Date(inq.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    }) : 'Unknown Date';

                    // Fallback to check common variable names for the country field
                    const preferredDestination = inq.country || inq.preferredCountry || inq.destination || "Not specified";

                    return (
                      <tr key={inq.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Calendar className="w-4 h-4" /> {date}
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 font-bold text-brand-dark">
                            <User className="w-4 h-4 text-slate-400" /> {inq.name || "N/A"}
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap space-y-1">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Mail className="w-4 h-4 text-slate-400" /> 
                            <a href={`mailto:${inq.email}`} className="hover:text-brand-primary">{inq.email || "N/A"}</a>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Phone className="w-4 h-4 text-slate-400" /> 
                            <a href={`tel:${inq.phone}`} className="hover:text-brand-primary">{inq.phone || "N/A"}</a>
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                            <Globe className="w-4 h-4 text-slate-400" /> 
                            <span className={preferredDestination === "Not specified" ? "text-slate-400 italic" : ""}>
                              {preferredDestination}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            New Lead
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                      No inquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}