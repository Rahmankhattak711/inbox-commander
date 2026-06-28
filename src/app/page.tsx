"use client";

import Navbar from "./components/landing/Navbar";
import HeroSection from "./components/landing/HeroSection";
import ControlRoom from "./components/landing/ControlRoom";
import Feature from "./components/landing/Feature";
import SpecsSection from "./components/landing/SpecsSection";
import TestimonialsSection from "./components/landing/TestimonialsSection";
import PricingSection from "./components/landing/PricingSection";
import FaqSection from "./components/landing/FaqSection";
import Footer from "./components/landing/Footer";
import CtaBanner from "./components/landing/CtaBanner";
import HowItWorksSection from "./components/landing/HowItWorksSection";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen flex flex-col antialiased select-none overflow-x-hidden"
      style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}
    >
      <Navbar />
      <HeroSection />
      <ControlRoom />
      <Feature />
      <SpecsSection />
      <TestimonialsSection />
      <PricingSection />
      <HowItWorksSection/>
      <FaqSection />
      <CtaBanner/>
      <Footer />
    </div>
  );
}
