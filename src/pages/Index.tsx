import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import BentoGrid from "@/components/BentoGrid";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
// CustomCursor is already in App.tsx

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-black selection:bg-mint selection:text-black">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-black z-[100] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />

      <CustomCursor />
      <Navbar />
      
      <main>
        <HeroSection />
        <PortfolioSection />
        <BentoGrid />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
