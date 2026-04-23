import { useState } from "react";
import { motion } from "framer-motion";
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
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroSection />
            </motion.div>
            
            <SectionDivider />
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <EditorialMarquee variant="compact" />
            </motion.div>
            
            <SectionDivider />
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <AboutSection />
            </motion.div>
            
            <SectionDivider />
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <EditorialQuote
                eyebrow="Direção Criativa"
                quote="Design não é decoração — é a forma como uma marca pensa, fala e existe no mundo."
                attribution="Filipe Williams · Studio Kiiro"
              />
            </motion.div>
            
            <SectionDivider />
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <ServicesSection />
            </motion.div>
            
            <SectionDivider />
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProcessSection />
            </motion.div>
            
            <SectionDivider />
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <PortfolioSection />
            </motion.div>
            
            <SectionDivider />
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <ContactSection />
            </motion.div>
            
            <Footer />
          </div>
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
    className="section-divider origin-center" 
  />
);

export default Index;
