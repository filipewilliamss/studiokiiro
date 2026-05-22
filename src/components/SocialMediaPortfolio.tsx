import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const SocialMediaPortfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const fanProgress = useTransform(smoothProgress, [0.1, 0.3], [0, 1]);

  // Phone 1 (Left far)
  const x1 = useTransform(fanProgress, [0, 1], ["0%", isMobile ? "-40%" : "-120%"]);
  const r1 = useTransform(fanProgress, [0, 1], [0, isMobile ? -5 : -15]);
  const y1 = useTransform(fanProgress, [0, 1], [0, isMobile ? 10 : 20]);
  const opacity1 = useTransform(fanProgress, [0, 0.5], [0, isMobile ? 0.3 : 1]);

  // Phone 2 (Left close)
  const x2 = useTransform(fanProgress, [0, 1], ["0%", isMobile ? "-25%" : "-60%"]);
  const r2 = useTransform(fanProgress, [0, 1], [0, isMobile ? -3 : -8]);
  const y2 = useTransform(fanProgress, [0, 1], [0, isMobile ? 5 : 10]);
  const opacity2 = useTransform(fanProgress, [0, 0.3], [0, 1]);

  // Phone 3 (Central)
  const scale3 = useTransform(fanProgress, [0, 1], [1, isMobile ? 1.02 : 1.05]);
  const y3 = useTransform(fanProgress, [0, 1], [0, -10]);

  // Phone 4 (Right close)
  const x4 = useTransform(fanProgress, [0, 1], ["0%", isMobile ? "25%" : "60%"]);
  const r4 = useTransform(fanProgress, [0, 1], [0, isMobile ? 3 : 8]);
  const y4 = useTransform(fanProgress, [0, 1], [0, isMobile ? 5 : 10]);
  const opacity4 = useTransform(fanProgress, [0, 0.3], [0, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[150vh] bg-black py-24 flex flex-col items-center overflow-hidden"
    >
      {/* Header */}
      <div className="container-editorial relative z-10 text-center mb-24 px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-tight"
        >
          Portfólio de <span className="text-[#FFCA16]">Artes para Redes Sociais</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium"
        >
          Uma seleção de layouts criados para fortalecer presença, consistência e posicionamento de marcas no ambiente digital.
        </motion.p>
      </div>

      {/* Visual Block - Smartphone Fan */}
      <div className="sticky top-[20vh] h-[60vh] w-full flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          
          {/* Smartphone 1 (Left Far) */}
          <motion.div 
            style={{ x: x1, rotate: r1, y: y1, opacity: opacity1, zIndex: 10 }}
            className="absolute"
          >
            <SmartphonePlaceholder image="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800" />
          </motion.div>

          {/* Smartphone 2 (Left Close) */}
          <motion.div 
            style={{ x: x2, rotate: r2, y: y2, opacity: opacity2, zIndex: 20 }}
            className="absolute"
          >
            <SmartphonePlaceholder image="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800" />
          </motion.div>

          {/* Smartphone 4 (Right Close) */}
          <motion.div 
            style={{ x: x4, rotate: r4, y: y4, opacity: opacity4, zIndex: 20 }}
            className="absolute"
          >
            <SmartphonePlaceholder image="https://images.unsplash.com/photo-1611926653458-09294b319dd7?auto=format&fit=crop&q=80&w=800" />
          </motion.div>

          {/* Smartphone 3 (Central - Front) */}
          <motion.div 
            style={{ scale: scale3, y: y3, zIndex: 30 }}
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SmartphonePlaceholder image="https://images.unsplash.com/photo-1491897554428-130a60dd4757?auto=format&fit=crop&q=80&w=800" />
          </motion.div>

        </div>
      </div>

      {/* Footer Content */}
      <div className="container-editorial relative z-10 mt-auto pb-24 text-center px-6">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-gray-300 max-w-xl mx-auto mb-10 text-lg"
        >
          Cada arte é pensada para manter a identidade da marca em evidência, em qualquer formato: posts, carrosséis, stories e campanhas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a 
            href="#portfolio"
            className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden border border-white/20 transition-all duration-700 hover:border-[#FFCA16]"
          >
            <div className="absolute inset-0 bg-[#FFCA16] translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[0.22,1,0.36,1]" />
            <span className="relative z-10 text-[11px] md:text-[12px] uppercase tracking-[0.4em] font-bold text-white group-hover:text-black transition-colors duration-500">
              Ver mais projetos de social media
            </span>
            <svg 
              width="18" height="18" viewBox="0 0 20 20" fill="none" 
              className="relative z-10 ml-6 translate-x-0 group-hover:translate-x-3 transition-transform duration-500 text-white group-hover:text-black"
            >
              <path d="M4.16663 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const SmartphonePlaceholder = ({ image }: { image: string }) => {
  return (
    <div className="w-[200px] h-[430px] md:w-[280px] md:h-[600px] bg-[#1a1a1a] rounded-[45px] p-3 shadow-2xl border-[6px] border-[#333] relative overflow-hidden group">
      {/* Speaker/Dynamic Island Area */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-3xl z-20 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-blue-500/20 rounded-full ml-auto mr-4" />
      </div>
      
      {/* Screen Content */}
      <div className="w-full h-full rounded-[35px] overflow-hidden bg-black relative">
        <img 
          src={image} 
          alt="Social Media Art" 
          className="w-full h-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
        />
        {/* Screen Shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Side Buttons */}
      <div className="absolute -left-[6px] top-32 w-[3px] h-12 bg-[#333] rounded-r-md" />
      <div className="absolute -left-[6px] top-48 w-[3px] h-20 bg-[#333] rounded-r-md" />
      <div className="absolute -left-[6px] top-72 w-[3px] h-20 bg-[#333] rounded-r-md" />
      <div className="absolute -right-[6px] top-48 w-[3px] h-24 bg-[#333] rounded-l-md" />
    </div>
  );
};

export default SocialMediaPortfolio;
