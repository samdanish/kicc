// Using relative paths to bypass the Turbopack alias bug
import { Navbar } from "../components/shared/Navbar";
import { Hero } from "../components/sections/Hero";
import { TopUniversities } from "../components/sections/TopUniversities";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TopUniversities />
    </>
  );
}