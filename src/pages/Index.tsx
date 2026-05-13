import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
// ... keep existing code
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
                quote="Design com método e estratégia para marcas que não aceitam o genérico."
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