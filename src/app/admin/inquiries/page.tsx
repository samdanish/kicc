"use client";

import { useState } from "react";
import { Search, Download, Trash2, Filter } from "lucide-react";

// Mock Data representing Firebase pulls
const initialLeads = [
  { id: "1", name: "Ayaan Bhat", phone: "+91 9906012345", email: "ayaan@example.com", neet: "400 - 500", country: "Egypt", status: "Unseen", date: "2024-05-26" },
  { id: "2", name: "Mehwish Tariq", phone: "+91 7006890123", email: "mehwish@example.com", neet: "Above 600", country: "UK, Canada", status: "Seen", date: "2024-05-25" },
  { id: "3", name: "Faizan Ahmed", phone: "+91 9419045678", email: "faizan@example.com", neet: "300 - 400", country: "Uzbekistan", status: "Unseen", date: "2024-05-25" },
  { id: "4", name: "Sadiya Khan", phone: "+91 9797098765", email: "sadiya@example.com", neet: "200 - 300", country: "Bangladesh", status: "Seen", date: "2024-05-24" },
];

export default function InquiriesPage() {
  const [leads, setLeads] = useState(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Toggle Seen/Unseen Status
  const toggleStatus = (id: string) => {
    setLeads(leads.map(lead => 
      lead.id === id ? { ...lead, status: lead.status === "Unseen" ? "Seen" : "Unseen" } : lead
    ));
  };

  // Delete Lead
  const deleteLead = (id: string) => {
    if(confirm("Are you sure you want to delete this inquiry?")) {
      setLeads(leads.filter(lead => lead.id !== id));
    }
  };

  // 1-Click Export to CSV (Excel)
  const exportToExcel = () => {
    const headers = ["Date", "Name", "Phone", "Email", "NEET Score", "Preferred Country", "Status"];
    const csvContent = [
      headers.join(","),
      ...leads.map(lead => `"${lead.date}","${lead.name}","${lead.phone}","${lead.email}","${lead.neet}","${lead.country}","${lead.status}"`)
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

  // Filter Logic
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-dark tracking-tight">Student Inquiries</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and track all profile evaluations submitted via the website.</p>
        </div>
        <button onClick={exportToExcel} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-green-600/20 transition-all">
          <Download className="w-4 h-4" /> Export to Excel
        </button>
      </div>

      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, phone, or country..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 hidden md:block" />
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
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-widest text-slate-400">
                <th className="p-5 font-bold">Student Details</th>
                <th className="p-5 font-bold">Contact</th>
                <th className="p-5 font-bold">Academics & Target</th>
                <th className="p-5 font-bold">Status</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-5">
                      <p className="font-bold text-brand-dark">{lead.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{lead.date}</p>
                    </td>
                    <td className="p-5">
                      <p className="font-semibold text-slate-700 text-sm">{lead.phone}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{lead.email}</p>
                    </td>
                    <td className="p-5">
                      <p className="font-bold text-brand-primary text-sm">{lead.country}</p>
                      <p className="text-xs text-slate-500 mt-0.5">NEET: {lead.neet}</p>
                    </td>
                    <td className="p-5">
                      <button 
                        onClick={() => toggleStatus(lead.id)}
                        className={`px-3 py-1 text-xs font-bold rounded-full border ${
                          lead.status === "Unseen" 
                            ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100" 
                            : "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                        } transition-colors`}
                      >
                        {lead.status}
                      </button>
                    </td>
                    <td className="p-5 text-right">
                      <button onClick={() => deleteLead(lead.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-500 font-medium">
                    No inquiries match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}