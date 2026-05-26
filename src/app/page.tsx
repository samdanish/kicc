// Using relative paths to bypass the Turbopack alias bug
import { Navbar } from "../components/shared/Navbar";
import { Hero } from "../components/sections/Hero";
import { TopUniversities } from "../components/sections/TopUniversities";
import { Scholarships } from "../components/sections/Scholarships";
import { StateUniversities } from "../components/sections/StateUniversities";
import { About } from "../components/sections/About";
import { LeadForm } from "../components/sections/LeadForm";
import { Footer } from "../components/shared/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TopUniversities />
      <Scholarships />
      
      {/* New Interactive Domestic Explorer Section */}
      <StateUniversities />
      
      <About />
      <LeadForm />
      <Footer />
    </>
  );
}