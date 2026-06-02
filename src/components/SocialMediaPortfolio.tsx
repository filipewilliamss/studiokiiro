import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const SocialMediaPortfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
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

  // Staggered fan progress points

  const farX = isMobile ? "45%" : isTablet ? "75%" : "130%";
  const closeX = isMobile ? "28%" : isTablet ? "42%" : "70%";
  const farR = isMobile ? 6 : isTablet ? 18 : 32;
  const closeR = isMobile ? 3 : isTablet ? 10 : 15;
  const farY = isMobile ? 12 : isTablet ? 35 : 75;
  const closeY = isMobile ? 6 : isTablet ? 12 : 18;
  const centralScale = isMobile ? 1.02 : isTablet ? 1.04 : 1.08;

  // Phone 1 (Left far)
  const fanProgress1 = useTransform(smoothProgress, [0.18, 0.35], [0, 1]);
  const x1 = useTransform(fanProgress1, [0, 1], ["0%", `-${farX}`]);
  const r1 = useTransform(fanProgress1, [0, 1], [0, -farR]);
  const y1 = useTransform(fanProgress1, [0, 1], [0, farY]);
  const opacity1 = useTransform(fanProgress1, [0, 0.4], [0, 1]);

  // Phone 2 (Left close)
  const fanProgress2 = useTransform(smoothProgress, [0.12, 0.28], [0, 1]);
  const x2 = useTransform(fanProgress2, [0, 1], ["0%", `-${closeX}`]);
  const r2 = useTransform(fanProgress2, [0, 1], [0, -closeR]);
  const y2 = useTransform(fanProgress2, [0, 1], [0, closeY]);
  const opacity2 = useTransform(fanProgress2, [0, 0.3], [0, 1]);

  // Phone 4 (Right close)
  const x4 = useTransform(fanProgress2, [0, 1], ["0%", closeX]);
  const r4 = useTransform(fanProgress2, [0, 1], [0, closeR]);
  const y4 = useTransform(fanProgress2, [0, 1], [0, closeY]);
  const opacity4 = useTransform(fanProgress2, [0, 0.3], [0, 1]);

  // Phone 5 (Right far)
  const x5 = useTransform(fanProgress1, [0, 1], ["0%", farX]);
  const r5 = useTransform(fanProgress1, [0, 1], [0, farR]);
  const y5 = useTransform(fanProgress1, [0, 1], [0, farY]);
  const opacity5 = useTransform(fanProgress1, [0, 0.4], [0, 1]);

  // Phone 3 (Central)
  const fanProgress3 = useTransform(smoothProgress, [0.1, 0.25], [0, 1]);
  const scale3 = useTransform(fanProgress3, [0, 1], [1, centralScale]);
  const y3 = useTransform(fanProgress3, [0, 1], [0, -15]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[150vh] bg-black py-24 flex flex-col items-center overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-90 pointer-events-none" />
      
      {/* Subtle Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,202,22,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Header */}
      <div className="container-editorial relative z-10 text-center mb-24 px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[34.5px] md:text-[55.2px] lg:text-[69px] text-white mb-8 tracking-tight leading-[0.825]"
        >
          <span className="font-black">Portifólio de artes</span><br />
          <span className="font-black">para </span><span className="text-[#FFCA16] font-normal italic">Redes Sociais</span>
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
            <SmartphonePlaceholder image="https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/hts4foeb1l8-1779490857580.png" />
          </motion.div>

          {/* Smartphone 2 (Left Close) */}
          <motion.div 
            style={{ x: x2, rotate: r2, y: y2, opacity: opacity2, zIndex: 20 }}
            className="absolute"
          >
            <SmartphonePlaceholder image="https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/x0kq6od5on-1779491623931.jpg" />
          </motion.div>

          {/* Smartphone 4 (Right Close) */}
          <motion.div 
            style={{ x: x4, rotate: r4, y: y4, opacity: opacity4, zIndex: 20 }}
            className="absolute"
          >
          <SmartphonePlaceholder 
            image="https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/8gaktp9ln3-1779733239455.png" 
          />
          </motion.div>

          {/* Smartphone 5 (Right Far) */}
          <motion.div 
            style={{ x: x5, rotate: r5, y: y5, opacity: opacity5, zIndex: 10 }}
            className="absolute"
          >
            <SmartphonePlaceholder image="https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/97grnqq0tnv-1779733664436.png" />
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
            <SmartphonePlaceholder image="https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/uzvbthz4ncc-1779730234426.jpg" />
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
          className="text-gray-300 max-w-xl mx-auto mb-10 text-lg mt-[50px]"
        >
          Cada arte é pensada para manter a identidade da marca em evidência, em qualquer formato: posts, carrosséis, stories e campanhas.
        </motion.p>
      </div>
    </section>
  );
};

const SmartphonePlaceholder = ({ image, objectFit = "cover" }: { image: string, objectFit?: "cover" | "contain" }) => {
  return (
    <div className="w-[190px] h-[410px] md:w-[280px] md:h-[600px] relative group" style={{ perspective: "1000px" }}>
      {/* Outer Glow/Reflection */}
      <div className="absolute -inset-1 bg-gradient-to-tr from-white/10 to-transparent blur-sm rounded-[50px] opacity-50" />
      
      {/* Main Frame (Metallic Look) */}
      <div className="w-full h-full bg-gradient-to-b from-[#2a2a2a] via-[#404040] to-[#1a1a1a] rounded-[48px] p-[2px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden ring-1 ring-white/10">
        
        {/* Inner Frame Edge */}
        <div className="w-full h-full bg-black rounded-[46px] p-[10px] relative">
          
          {/* Screen Container */}
          <div className="w-full h-full rounded-[38px] overflow-hidden bg-[#050505] relative shadow-inner">
            
            {/* Real Image Placeholder */}
            <img 
              src={image} 
              alt="Social Media Art" 
              className={`w-full h-full ${objectFit === "contain" ? "object-contain" : "object-cover"} opacity-90 transition-opacity duration-700 group-hover:opacity-100`}
            />
            
            {/* Screen Depth/Shadow */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] pointer-events-none" />
            
            {/* Screen Shine/Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-60 pointer-events-none" />
            <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-white/5 via-transparent to-transparent rotate-45 pointer-events-none group-hover:translate-x-1/4 group-hover:translate-y-1/4 transition-transform duration-1000" />
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-3xl z-20 flex items-center justify-end px-4 border border-white/5 shadow-lg">
            <div className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full border border-blue-500/10 shadow-[0_0_2px_#3b82f6]" />
          </div>

          {/* Bottom Bar Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/20 rounded-full z-20" />
        </div>
      </div>

      {/* Realistic Side Buttons */}
      <div className="absolute -left-[1px] top-28 w-[3px] h-8 bg-gradient-to-b from-[#444] to-[#222] rounded-l-sm border-l border-white/10" />
      <div className="absolute -left-[1px] top-44 w-[3px] h-14 bg-gradient-to-b from-[#444] to-[#222] rounded-l-sm border-l border-white/10 shadow-sm" />
      <div className="absolute -left-[1px] top-64 w-[3px] h-14 bg-gradient-to-b from-[#444] to-[#222] rounded-l-sm border-l border-white/10 shadow-sm" />
      <div className="absolute -right-[1px] top-44 w-[3px] h-20 bg-gradient-to-b from-[#444] to-[#222] rounded-r-sm border-r border-white/10 shadow-sm" />

      {/* Ambient Shadow on floor */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-black/40 blur-2xl rounded-[100%] -z-10" />
    </div>
  );
};

export default SocialMediaPortfolio;
