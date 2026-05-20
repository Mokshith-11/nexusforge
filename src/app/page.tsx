import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import ServicesGrid from "@/components/ServicesGrid";
import HowItWorks from "@/components/HowItWorks";
import CaseStudies from "@/components/CaseStudies";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nexus Forge — AI Automation Agency | Custom AI Solutions & Workflow Automation",
  description:
    "Nexus Forge builds custom AI automations, chatbots, and workflow systems that save time and scale your business. Book a free strategy call today.",
  alternates: {
    canonical: "https://nexusforge.ai",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <ServicesGrid />
        <HowItWorks />
        <CaseStudies />
        <TechStack />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
