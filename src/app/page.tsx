// Using relative paths to bypass the Turbopack alias bug
import { Navbar } from "../components/shared/Navbar";
import { Hero } from "../components/sections/Hero";
import { TopUniversities } from "../components/sections/TopUniversities";
import { Scholarships } from "../components/sections/Scholarships";
import { StateUniversities } from "../components/sections/StateUniversities";
import { About } from "../components/sections/About";
import { LeadForm } from "../components/sections/LeadForm";
import { Footer } from "../components/shared/Footer";
import { ConsultationPopup } from "../components/shared/ConsultationPopup"; // <-- ADD THIS

// Firebase imports for SERVER-SIDE fetching
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

// Cache this page for 24 hours
export const revalidate = 86400;

export default async function Home() {
  let initialImages: Record<string, string> = {};
  
  try {
    const querySnapshot = await getDocs(collection(db, "domesticImages"));
    querySnapshot.forEach((doc) => {
      initialImages[doc.id] = doc.data().imageUrl;
    });
  } catch (error) {
    console.error("Failed to fetch images on server:", error);
  }

  return (
    <>
      <Navbar />
      <Hero />
      <TopUniversities />
      <Scholarships />
      
      <StateUniversities initialImages={initialImages} />
      
      <About />
      <LeadForm />
      
      {/* Scroll-triggered interactive popup */}
      <ConsultationPopup />
      
      <Footer />
    </>
  );
}