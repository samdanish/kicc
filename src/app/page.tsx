// Using relative paths to bypass the Turbopack alias bug
import dynamic from "next/dynamic";
import { Navbar } from "../components/shared/Navbar";
import { Hero } from "../components/sections/Hero";

// Cache this page for 24 hours
export const revalidate = 86400;

// ==========================================
// LAZY LOADING (BELOW-THE-FOLD COMPONENTS)
// ==========================================
const TopUniversities = dynamic(() => import("../components/sections/TopUniversities").then(mod => mod.TopUniversities));
const GlobalDestinations = dynamic(() => import("../components/sections/GlobalDestinations").then(mod => mod.GlobalDestinations));
const Scholarships = dynamic(() => import("../components/sections/Scholarships").then(mod => mod.Scholarships));
const StateUniversities = dynamic(() => import("../components/sections/StateUniversities").then(mod => mod.StateUniversities));
const About = dynamic(() => import("../components/sections/About").then(mod => mod.About));
const LeadForm = dynamic(() => import("../components/sections/LeadForm").then(mod => mod.LeadForm));
const Footer = dynamic(() => import("../components/shared/Footer").then(mod => mod.Footer));

export default function Home() {
  return (
    // HARDWARE ACCELERATION WRAPPER
    <main className="relative overflow-x-hidden transform-gpu will-change-transform">
      
      {/* ABOVE THE FOLD - Loaded instantly */}
      <Navbar />
      <Hero />
      
      {/* BELOW THE FOLD - Loaded on-demand as user scrolls */}
      <TopUniversities />
      <GlobalDestinations /> 
      <Scholarships />
      
      <StateUniversities />
      
      <About />
      <LeadForm />
      <Footer />
      
    </main>
  );
}