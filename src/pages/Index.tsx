import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="min-h-screen bg-black">
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
            
            
            <section className="snap-start">
              <EditorialMarquee variant="compact" />
            </section>
            
            <section className="snap-start">
              <AboutSection />
            </section>
            
            <section className="snap-start">
              <EditorialQuote
                eyebrow="Direção Criativa"
                quote="Design com método e estratégia para marcas que não aceitam o genérico."
                attribution="Filipe Williams · Studio Kiiro"
              />
            </section>
            
            <section className="snap-start">
              <ServicesSection />
            </section>
            
            <section className="snap-start">
              <ProcessSection />
            </section>
            
            {/* Portfolio Section handles its own snapping per project */}
            <PortfolioSection />
            
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


export default Index;