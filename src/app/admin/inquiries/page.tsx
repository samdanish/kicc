"use client";

import { useState, useEffect } from "react";
import { Search, Download, Trash2, Filter, Loader2 } from "lucide-react";
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function InquiriesPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedLeads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLeads(fetchedLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Unseen" ? "Seen" : "Unseen";
    try {
      await updateDoc(doc(db, "inquiries", id), { status: newStatus });
      setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await deleteDoc(doc(db, "inquiries", id));
        setLeads(leads.filter(lead => lead.id !== id));
      } catch (error) {
        console.error("Error deleting lead:", error);
      }
    }
  };

  const exportToExcel = () => {
    const headers = ["Date", "Name", "Phone", "Email", "NEET Score", "Preferred Country", "Status", "Message"];
    const csvContent = [
      headers.join(","),
      ...leads.map(lead => `"${lead.date || 'N/A'}","${lead.name}","${lead.phone}","${lead.email}","${lead.neetScore || ''}","${lead.preferredCountry}","${lead.status}","${lead.message || ''}"`)
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `KICC_Leads_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.preferredCountry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.phone?.includes(searchTerm);
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">Student Inquiries</h1>
          <p className="text-sm md:text-base text-slate-500 font-medium mt-1">Manage and track all profile evaluations.</p>
        </div>
        <button onClick={exportToExcel} className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-green-600/20 transition-all">
          <Download className="w-4 h-4" /> Export Excel
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search leads..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-sm font-bold text-slate-600 py-2.5 px-4 rounded-xl outline-none focus:border-brand-primary w-full md:w-auto"
        >
          <option value="All">All Statuses</option>
          <option value="Unseen">Unseen</option>
          <option value="Seen">Seen</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-brand-primary animate-spin mb-4" />
              <p className="text-slate-500 font-bold text-sm">Loading Database...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] md:text-xs uppercase tracking-widest text-slate-400">
                  <th className="p-4 md:p-5 font-bold">Student</th>
                  <th className="p-4 md:p-5 font-bold">Contact</th>
                  <th className="p-4 md:p-5 font-bold">Target</th>
                  <th className="p-4 md:p-5 font-bold">Status</th>
                  <th className="p-4 md:p-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 md:p-5">
                        <p className="font-bold text-brand-dark text-sm">{lead.name}</p>
                        <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">{lead.date}</p>
                      </td>
                      <td className="p-4 md:p-5">
                        <p className="font-semibold text-slate-700 text-xs md:text-sm">{lead.phone}</p>
                        <p className="text-[10px] md:text-xs text-slate-500 mt-0.5">{lead.email}</p>
                      </td>
                      <td className="p-4 md:p-5">
                        <p className="font-bold text-brand-primary text-xs md:text-sm">{lead.preferredCountry}</p>
                        <p className="text-[10px] md:text-xs text-slate-500 mt-0.5">NEET: {lead.neetScore || 'N/A'}</p>
                      </td>
                      <td className="p-4 md:p-5">
                        <button 
                          onClick={() => toggleStatus(lead.id, lead.status)}
                          className={`px-3 py-1 text-[10px] md:text-xs font-bold rounded-full border ${
                            lead.status === "Unseen" ? "bg-red-50 text-red-600 border-red-200" : "bg-green-50 text-green-600 border-green-200"
                          }`}
                        >
                          {lead.status || "Unseen"}
                        </button>
                      </td>
                      <td className="p-4 md:p-5 text-right">
                        <button onClick={() => handleDelete(lead.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-sm text-slate-500 font-medium">No inquiries found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}