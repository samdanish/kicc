"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, ImageIcon, LogOut, Bell } from "lucide-react";
import { AuthProvider, useAuth } from "../../context/authcontext";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Inquiries", href: "/admin/inquiries", icon: Users },
];

// We separate the shell so we can wrap it in the AuthProvider
function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  // If we are on the login page, don't show the sidebar/topbar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // If not logged in, the AuthContext will handle the redirect, but we return null here to prevent flashing UI
  if (!user) return null;

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0B1727] text-slate-300 flex flex-col fixed h-full z-20">
        <div className="h-20 flex items-center px-8 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 bg-white rounded-lg p-1 flex items-center justify-center mr-3">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl font-black text-white tracking-tight">KICC <span className="text-brand-primary text-sm font-bold uppercase tracking-widest ml-1">Admin</span></span>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Command Center</p>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive 
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors font-medium">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-72 flex flex-col min-h-screen">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="font-bold text-brand-dark tracking-wide">Secure Admin Portal</div>
          <div className="flex items-center gap-6 ml-auto">
            <button className="relative p-2 text-slate-400 hover:text-brand-dark transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-brand-dark leading-none">Danish</p>
                <p className="text-xs text-slate-500 font-medium mt-1">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}