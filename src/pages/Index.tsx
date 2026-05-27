import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import SEO from "@/components/SEO";
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
import SocialMediaPortfolio from "@/components/SocialMediaPortfolio";


const Index = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className={`relative z-10 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {!loading && (
          <main className="flex flex-col snap-y snap-proximity">
            <Navbar />
            
            <section className="snap-start">
              <HeroSection />
            </section>
            
            <SectionDivider />
            
            <section className="snap-start">
              <EditorialMarquee variant="compact" />
            </section>
            
            <SectionDivider />
            
            <section className="snap-start">
              <AboutSection />
            </section>
            
            <SectionDivider />
            
            <section className="snap-start">
              <EditorialQuote
                eyebrow="Direção Criativa"
                quote={<>Design inteligente para fugir do <span className="italic text-[#FFCA16]">genérico</span>.</>}
                attribution="Filipe Williams · Studio Kiiro"
              />
            </section>
            
            <SectionDivider />
            
            <section className="snap-start">
              <ServicesSection />
            </section>
            
            <SectionDivider />
            
            <section className="snap-start">
              <ProcessSection />
            </section>
            
            {/* Portfolio Section handles its own snapping per project */}
            <PortfolioSection />
            
            <SectionDivider />
            
            <section className="snap-start">
              <SocialMediaPortfolio />
            </section>
            
            <SectionDivider />

            
            <section className="snap-start">
              <ContactSection />
            </section>
            
            <Footer />
          </main>
        )}
      </div>
    </div>
  );
};

const SectionDivider = () => (
  <motion.div 
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    className="section-divider origin-center h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" 
  />
);

export default Index;