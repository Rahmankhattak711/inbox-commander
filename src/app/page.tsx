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
import ScrollReveal from "./components/landing/ScrollReveal";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen flex flex-col antialiased select-none overflow-x-hidden"
      style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}
    >
      <Navbar />
      <HeroSection />
      <ScrollReveal delay={0}>
        <ControlRoom />
      </ScrollReveal>
      <ScrollReveal delay={0.05} direction="up">
        <Feature />
      </ScrollReveal>
      <ScrollReveal delay={0.05} direction="up">
        <SpecsSection />
      </ScrollReveal>
      <ScrollReveal delay={0.05} direction="up">
        <TestimonialsSection />
      </ScrollReveal>
      <ScrollReveal delay={0.05} direction="up">
        <PricingSection />
      </ScrollReveal>
      <ScrollReveal delay={0.05} direction="up">
        <HowItWorksSection />
      </ScrollReveal>
      <ScrollReveal delay={0.05} direction="up">
        <FaqSection />
      </ScrollReveal>
      <ScrollReveal delay={0.05} direction="up">
        <CtaBanner />
      </ScrollReveal>
      <Footer />
    </div>
  );
}
