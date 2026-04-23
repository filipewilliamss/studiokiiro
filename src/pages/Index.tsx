import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import EditorialMarquee from "@/components/EditorialMarquee";
import EditorialQuote from "@/components/EditorialQuote";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#070807]">
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div className={`relative z-10 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {!loading && (
          <div className="flex flex-col">
            <Navbar />
            <div className="relative">
              <HeroSection />
            </div>
            
            <div className="section-divider" />
            
            <div className="relative">
              <EditorialMarquee variant="compact" />
            </div>
            
            <div className="section-divider" />
            
            <div className="relative">
              <AboutSection />
            </div>
            
            <div className="section-divider" />
            
            <div className="relative">
              <EditorialQuote
                eyebrow="Direção Criativa"
                quote="Design não é decoração — é a forma como uma marca pensa, fala e existe no mundo."
                attribution="Filipe Williams · Studio Kiiro"
              />
            </div>
            
            <div className="section-divider" />
            
            <div className="relative">
              <ServicesSection />
            </div>
            
            <div className="section-divider" />
            
            <div className="relative">
              <ProcessSection />
            </div>
            
            <div className="section-divider" />
            
            <div className="relative">
              <PortfolioSection />
            </div>
            
            <div className="section-divider" />
            
            <div className="relative">
              <ContactSection />
            </div>
            
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
