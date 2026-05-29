"use client";

import { useState, useEffect } from "react";
import { FileText, MousePointerClick, RefreshCw } from "lucide-react";
import { ref, get } from "firebase/database";
import { database } from "../../lib/firebase"; 

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [trafficStats, setTrafficStats] = useState<any[]>([]);
  const [yearlyData, setYearlyData] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    setLoading(true);
    
    try {
      // 1. Fetch Inquiries AND Visits at the same time
      const inquiriesRef = ref(database, "inquiries");
      const visitsRef = ref(database, "visits");
      
      const [inquiriesSnapshot, visitsSnapshot] = await Promise.all([
        get(inquiriesRef),
        get(visitsRef)
      ]);
      
      let inquiries: any[] = [];
      let visits: any[] = [];
      
      if (inquiriesSnapshot.exists()) inquiries = Object.values(inquiriesSnapshot.val());
      if (visitsSnapshot.exists()) visits = Object.values(visitsSnapshot.val());

      // 2. Setup date boundaries
      const now = new Date();
      const oneDayMs = 24 * 60 * 60 * 1000;
      
      let dailyForms = 0, weeklyForms = 0, monthlyForms = 0;
      let dailyVisits = 0, weeklyVisits = 0, monthlyVisits = 0;
      
      const monthlyLeadsCount = Array(12).fill(0); 
      const monthlyVisitsCount = Array(12).fill(0); 

      // 3. Process Inquiries
      inquiries.forEach((inq) => {
        let date = inq.createdAt ? new Date(inq.createdAt) : new Date();
        if (isNaN(date.getTime())) date = new Date();
        const timeDiff = now.getTime() - date.getTime();

        if (timeDiff <= oneDayMs) dailyForms++;
        if (timeDiff <= 7 * oneDayMs) weeklyForms++;
        if (timeDiff <= 30 * oneDayMs) monthlyForms++;
        if (date.getFullYear() === now.getFullYear()) monthlyLeadsCount[date.getMonth()]++;
      });

      // 4. Process Visits
      visits.forEach((visit) => {
        let date = visit.createdAt ? new Date(visit.createdAt) : new Date();
        if (isNaN(date.getTime())) date = new Date();
        const timeDiff = now.getTime() - date.getTime();

        if (timeDiff <= oneDayMs) dailyVisits++;
        if (timeDiff <= 7 * oneDayMs) weeklyVisits++;
        if (timeDiff <= 30 * oneDayMs) monthlyVisits++;
        if (date.getFullYear() === now.getFullYear()) monthlyVisitsCount[date.getMonth()]++;
      });

      // 5. Update the UI with exactly tracked Database Data
      setTrafficStats([
        { label: "Daily", visitors: dailyVisits, forms: dailyForms },
        { label: "Weekly", visitors: weeklyVisits, forms: weeklyForms },
        { label: "Monthly", visitors: monthlyVisits, forms: monthlyForms },
      ]);

      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      setYearlyData(monthNames.map((month, idx) => ({
        month,
        leads: monthlyLeadsCount[idx], 
        visits: monthlyVisitsCount[idx], 
      })));

    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-dark tracking-tight">Traffic & Conversions</h1>
          <p className="text-slate-500 font-medium mt-1">Live overview of website visitors and lead generation performance.</p>
        </div>
        <button 
          onClick={fetchDashboardData}
          disabled={loading}
          className="flex items-center gap-2 bg-white border border-slate-200 text-brand-dark hover:bg-slate-50 px-4 py-2 rounded-xl font-bold shadow-sm transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> 
          {loading ? "Syncing..." : "Refresh Data"}
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin mb-4" />
          <p className="text-slate-500 font-bold animate-pulse">Fetching live analytics...</p>
        </div>
      ) : (
        <>
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trafficStats?.map((stat: any, idx: number) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">{stat.label} Snapshot</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <MousePointerClick className="w-4 h-4 text-blue-500" /> <span className="text-xs font-bold">Visitors</span>
                    </div>
                    <p className="text-2xl font-black text-brand-dark">{stat.visitors}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <FileText className="w-4 h-4 text-brand-primary" /> <span className="text-xs font-bold">Inquiries</span>
                    </div>
                    <p className="text-2xl font-black text-brand-dark">{stat.forms}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400">Conversion Rate</span>
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md">
                    {stat.visitors > 0 ? ((stat.forms / stat.visitors) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Yearly Graph */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-brand-dark">Yearly Performance Overview</h3>
                <p className="text-sm text-slate-500">Website visits vs. Form submissions (Current Year)</p>
              </div>
              <div className="flex items-center gap-4 text-sm font-bold">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-100"></span> Visitors</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-brand-primary"></span> Inquiries</div>
              </div>
            </div>

            <div className="h-72 flex items-end justify-between gap-2 md:gap-4 pt-10">
              {yearlyData?.map((data: any, idx: number) => {
                const maxVisits = Math.max(...yearlyData.map(d => d.visits), 100);
                const visitHeight = Math.min((data.visits / maxVisits) * 100, 100);
                const leadHeight = Math.min((data.leads / maxVisits) * 100, 100);

                return (
                  <div key={idx} className="flex flex-col items-center flex-1 group">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -mt-16 bg-brand-dark text-white text-xs font-bold py-1.5 px-3 rounded-lg pointer-events-none whitespace-nowrap z-10">
                      {data.visits} Visits / {data.leads} Leads
                    </div>
                    <div className="w-full flex items-end justify-center gap-1 h-48 relative">
                      <div className="w-full max-w-[20px] bg-blue-100 rounded-t-md transition-all duration-500" style={{ height: `${visitHeight}%` }}></div>
                      <div className="w-full max-w-[20px] bg-brand-primary rounded-t-md transition-all duration-500" style={{ height: `${leadHeight}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-slate-400 mt-4">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}