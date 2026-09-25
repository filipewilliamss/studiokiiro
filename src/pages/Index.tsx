import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import HeroTransition from "@/components/HeroTransition";
import ServicesArtboardSection from "@/components/ServicesArtboardSection";
import Preloader from "@/components/Preloader";
import SocialMediaPortfolio from "@/components/SocialMediaPortfolio";
import ImmersivePortfolioSection from "@/components/ImmersivePortfolioSection";
import KiiroMethodSection from "@/components/KiiroMethodSection";
import CloseAndFooterTransition from "@/components/CloseAndFooterTransition";


const Index = () => {
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    return !window.sessionStorage.getItem("kiiro-intro-seen") && !window.location.hash;
  });
  const location = useLocation();

  const finishLoading = () => {
    window.sessionStorage.setItem("kiiro-intro-seen", "true");
    setLoading(false);
  };

  // Timeout de segurança: caso a animação do preloader seja interrompida ou demore, libera a página
  useEffect(() => {
    if (!loading) return;
    const safetyTimer = setTimeout(() => {
      finishLoading();
    }, 3200);
    return () => clearTimeout(safetyTimer);
  }, [loading]);

  useEffect(() => {
    if (!loading && location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [loading, location.hash]);


  const studioSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Studio Kiiro",
    "image": "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d267e9c4-5caf-40ac-a058-3159ed1fe30c/id-preview-1aaaf73e--329d2406-9190-4896-bf7a-d98ea9a495ee.lovable.app-1773278607521.png",
    "@id": "https://studiokiiro.com",
    "url": "https://studiokiiro.com",
    "telephone": "+5511991076096",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.561414,
      "longitude": -46.655881
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.instagram.com/studiokiiro"
    ]
  };

  return (
    <div className="min-h-screen bg-black">
      <SEO schema={studioSchema} />
      
      <AnimatePresence>
        {loading && <Preloader onComplete={finishLoading} />}
      </AnimatePresence>

      <div className={`relative z-10 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {!loading && (
          <main className="flex flex-col">
            <Navbar />

            <HeroTransition />
            <ServicesArtboardSection />
            <KiiroMethodSection />
            <ImmersivePortfolioSection />
            <SocialMediaPortfolio />
            <CloseAndFooterTransition />
          </main>
        )}
      </div>
    </div>
  );
};

export default Index;
