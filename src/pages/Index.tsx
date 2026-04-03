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
      {/* Fixed Spline Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <iframe 
          src="https://my.spline.design/untitled-Okn4OvV3B9lyrWP0c2qMReAx-2Hi/" 
          frameBorder="0" 
          width="100%" 
          height="100%"
          className="w-full h-full"
          style={{ border: 'none' }}
          title="Spline 3D Background"
        />
      </div>

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

      {/* Watermark cover for Spline/Hana */}
      <div className="fixed bottom-0 right-0 w-[170px] h-[70px] bg-[#070807] z-20 pointer-events-none" />
    </div>
  );
};

export default Index;
