import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

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
            <AboutSection />
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