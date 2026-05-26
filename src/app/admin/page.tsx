"use client";

import { useState, useEffect } from "react";
import { FileText, MousePointerClick, RefreshCw } from "lucide-react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [trafficStats, setTrafficStats] = useState<any>(null);
  const [yearlyData, setYearlyData] = useState<any[]>([]);

  // =========================================================================
  // DATA FETCHING ARCHITECTURE (Ready for Firebase / Google Analytics integration)
  // =========================================================================
  const fetchDashboardData = async () => {
    setLoading(true);
    
    try {
      // TODO: Replace this simulated delay with actual Firebase/API calls
      // Example: const traffic = await firebase.get('trafficStats');
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      // Simulated Response Data (Replace with real backend data)
      setTrafficStats([
        { label: "Daily", visitors: 342, forms: 18 },
        { label: "Weekly", visitors: 2150, forms: 95 },
        { label: "Monthly", visitors: 8900, forms: 412 },
      ]);

      setYearlyData([
        { month: "Jan", visits: 45, leads: 28 },
        { month: "Feb", visits: 35, leads: 15 },
        { month: "Mar", visits: 55, leads: 42 },
        { month: "Apr", visits: 85, leads: 58 },
        { month: "May", visits: 70, leads: 45 },
        { month: "Jun", visits: 95, leads: 65 },
        { month: "Jul", visits: 100, leads: 82 },
        { month: "Aug", visits: 90, leads: 60 },
        { month: "Sep", visits: 65, leads: 38 },
        { month: "Oct", visits: 50, leads: 22 },
        { month: "Nov", visits: 60, leads: 31 },
        { month: "Dec", visits: 75, leads: 48 },
      ]);
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
                    {((stat.forms / stat.visitors) * 100).toFixed(1)}%
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
              {yearlyData?.map((data: any, idx: number) => (
                <div key={idx} className="flex flex-col items-center flex-1 group">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -mt-16 bg-brand-dark text-white text-xs font-bold py-1.5 px-3 rounded-lg pointer-events-none whitespace-nowrap z-10">
                    {data.visits} Visits / {data.leads} Leads
                  </div>
                  <div className="w-full flex items-end justify-center gap-1 h-48 relative">
                    <div className="w-full max-w-[20px] bg-blue-100 rounded-t-md transition-all duration-500" style={{ height: `${data.visits}%` }}></div>
                    <div className="w-full max-w-[20px] bg-brand-primary rounded-t-md transition-all duration-500" style={{ height: `${data.leads}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 mt-4">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}