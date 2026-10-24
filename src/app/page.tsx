import { ClinicHours } from "@/components/ClinicsHours";
import { DoctorsSection } from "@/components/DoctorSection";
import { FaqSection } from "@/components/FAQSections";
import { Footer } from "@/components/Footers";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { PopularDoctors } from "@/components/PopularDoctors";
import { Specialties } from "@/components/Specilist";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-teal-500 selection:text-white">
      <Navbar/>
      <Hero/>
      <Specialties/>
      <PopularDoctors/>
      <HowItWorks/>
      <ClinicHours/>
      <FaqSection/>
      <Footer/>
    </div>
  );
}