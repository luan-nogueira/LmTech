import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import ServicesSection from '@/sections/ServicesSection';
import AboutSection from '@/sections/AboutSection';
import PortfolioSection from '@/sections/PortfolioSection';
import DifferentialsSection from '@/sections/DifferentialsSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import ContactSection from '@/sections/ContactSection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <PortfolioSection />
        <DifferentialsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
