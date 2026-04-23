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
          <>
            <Navbar />
            <HeroSection />
            <EditorialMarquee variant="compact" />
            <AboutSection />
            <EditorialQuote
              eyebrow="Direção Criativa"
              quote="Design não é decoração — é a forma como uma marca pensa, fala e existe no mundo."
              attribution="Filipe Williams · Studio Kiiro"
            />
            <ServicesSection />
            <ProcessSection />
            <PortfolioSection />
            <ContactSection />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
