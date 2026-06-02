"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, Loader2, MapPin, KeyRound } from "lucide-react";
import emailjs from '@emailjs/browser';

// Haversine formula to calculate distance between two coordinates in meters
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // Earth radius in meters
  const toRad = (val: number) => (val * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

export default function AdminLogin() {
  const [email, setEmail] = useState("placeholder@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Geolocation & Security States
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [geoError, setGeoError] = useState("Checking location access...");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isZoneLocked, setIsZoneLocked] = useState(false);
  const [activeLockId, setActiveLockId] = useState("");
  
  // OTP States
  const [showOtpFlow, setShowOtpFlow] = useState(false);
  const [userOtp, setUserOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [sparks, setSparks] = useState<any[]>([]);

  const router = useRouter();

  // 1. Check Geolocation on Mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        setGeoError("");
        await checkActiveLocks(latitude, longitude);
      },
      (err) => {
        setGeoError("Location access denied. Admin panel requires location access.");
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // 2. Check Firestore for active zone locks
  const checkActiveLocks = async (lat: number, lng: number) => {
    try {
      const locksRef = collection(db, "admin_locks");
      const q = query(locksRef, where("expiresAt", ">", Date.now()));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const lockData = doc.data();
        const distance = getDistance(lat, lng, lockData.lat, lockData.lng);
        if (distance <= 500) {
          setIsZoneLocked(true);
          setActiveLockId(doc.id);
          setGeoError("Admin panel is currently locked in this 500m radius due to suspicious activity.");
        }
      });
    } catch (err) {
      console.error("Failed to check locks", err);
    }
  };

  // 3. Handle Standard Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isZoneLocked && !showOtpFlow) return;
    
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err: any) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      
      if (newAttempts >= 3 && coords) {
        await lockLocationZone(coords.lat, coords.lng);
      } else {
        setError(`Unauthorised access. Attempts remaining: ${3 - newAttempts}`);
      }
      setLoading(false);
    }
  };

  // 4. Lock the 500m zone & Trigger EmailJS OTP
  const lockLocationZone = async (lat: number, lng: number) => {
    try {
      // 24 hours from now
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000; 
      const locksRef = collection(db, "admin_locks");
      const newLock = await addDoc(locksRef, { lat, lng, expiresAt });
      
      setActiveLockId(newLock.id);
      setIsZoneLocked(true);
      setGeoError("Maximum attempts reached. Admin access locked in this area.");
      
      // Generate & Send OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { otp: otp, to_email: process.env.NEXT_PUBLIC_ADMIN_EMAIL },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setShowOtpFlow(true);
    } catch (err) {
      console.error("Error applying lock:", err);
    }
  };

  // 5. Verify OTP to clear the lock
  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (userOtp === generatedOtp) {
      try {
        // Delete the lock from Firestore
        await deleteDoc(doc(db, "admin_locks", activeLockId));
        setIsZoneLocked(false);
        setShowOtpFlow(false);
        setFailedAttempts(0);
        setError("Lock cleared. You may try logging in again.");
        setGeoError("");
      } catch (err) {
        setError("Error clearing lock.");
      }
    } else {
      setError("Invalid OTP.");
    }
    setLoading(false);
  };

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

  // Block rendering if location is missing or strictly locked (and not in OTP mode)
  if (geoError && !showOtpFlow) {
    return (
      <div className="min-h-screen bg-[#0B1727] flex flex-col items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl max-w-md text-center">
          <MapPin className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-white font-bold text-lg mb-2">Access Restricted</h2>
          <p className="text-red-400 text-sm">{geoError}</p>
        </div>
      </div>
    );
  }

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

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-black text-white tracking-tight">System Secured</h1>
          <p className="text-sm text-slate-400 font-medium mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-orange-500" /> Location Monitored
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        {showOtpFlow ? (
          <form onSubmit={handleOtpVerify} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest pl-1">Override OTP</label>
              <p className="text-xs text-orange-400 mb-2">An OTP was sent to the admin email to unlock this location.</p>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={userOtp}
                  onChange={(e) => setUserOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-primary"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Unlock"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest pl-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}