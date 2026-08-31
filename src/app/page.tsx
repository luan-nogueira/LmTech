'use client';

import { Navbar } from '@/components/home/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { PortfolioSection } from '@/components/home/PortfolioSection';
import { BudgetCalculator } from '@/components/home/BudgetCalculator';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { MethodologySection } from '@/components/home/MethodologySection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FAQSection } from '@/components/home/FAQSection';
import { ContactSection } from '@/components/home/ContactSection';
import { Footer } from '@/components/home/Footer';
import { WhatsAppFloatingButton } from '@/components/home/WhatsAppFloatingButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07090e] text-[#f8fafc] relative">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <PortfolioSection />
      <BudgetCalculator />
      <ServicesGrid />
      <MethodologySection />
      <WhyChooseUs />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloatingButton />
    </main>
  );
}
