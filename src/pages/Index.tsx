import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ClientAreaSection from "@/components/ClientAreaSection";
import PortfolioSection from "@/components/PortfolioSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#070807]">
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <ClientAreaSection />
        <PortfolioSection />
        <SocialMediaSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
};

export default Index;
