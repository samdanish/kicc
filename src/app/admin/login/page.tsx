// Admin security relies on Firebase Auth (signup disabled) + Firestore/RTDB rules checking the master admin email. Client-side locks and OTP were removed — they were bypassable.
"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sparks, setSparks] = useState<any[]>([]);

  const router = useRouter();

  // Background sparks effect
  useEffect(() => {
    setSparks(Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 3 + Math.random() * 6,
      delay: Math.random() * 5,
      size: 2 + Math.random() * 4,
      drift: (Math.random() - 0.5) * 100,
    })));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err: any) {
      setError("Unauthorised access or incorrect credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1727] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @keyframes floatUp {
          0% { transform: translate(0, 10vh) scale(1); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(var(--drift), -100vh) scale(0.1); opacity: 0; }
        }
      `}</style>

      {/* Fire Sparks Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {sparks.map((spark) => (
          <div
            key={spark.id}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${spark.left}%`,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              backgroundColor: spark.size > 4 ? '#f97316' : '#facc15',
              animation: `floatUp ${spark.duration}s linear ${spark.delay}s infinite`,
              opacity: 0,
              boxShadow: spark.size > 4 ? "0 0 12px 3px rgba(249, 115, 22, 0.8)" : "0 0 8px 2px rgba(250, 204, 21, 0.8)",
              "--drift": `${spark.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 mb-12">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-black text-white tracking-tight">System Secured</h1>
          <p className="text-sm text-slate-400 font-medium mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> End-to-End Encrypted
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest pl-1">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="master@admin.com"
                className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-primary transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest pl-1">Passcode</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your master password"
                className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-primary transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-400 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Secure Login"}
          </button>
        </form>
      </div>

      {/* Cinematic H Studio Branding */}
      <div className="absolute bottom-8 z-20 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity duration-700 cursor-default">
        <p className="text-[9px] tracking-[0.3em] text-slate-500 uppercase font-medium mb-1">
          Powered By
        </p>
        <h3 className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-white to-slate-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          H<span className="text-orange-500 mx-1 inline-block drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">·</span>STUDIO
        </h3>
      </div>
    </div>
  );
}