import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, PanInfo } from "framer-motion";

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
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    mass: 0.5,
    restDelta: 0.001
  });

  const farX = isTablet ? "75%" : "130%";
  const closeX = isTablet ? "42%" : "70%";
  const farR = isTablet ? 18 : 32;
  const closeR = isTablet ? 10 : 15;
  const farY = isTablet ? 35 : 75;
  const closeY = isTablet ? 12 : 18;
  const centralScale = isTablet ? 1.04 : 1.08;

  const fanProgress1 = useTransform(smoothProgress, [0.1, 0.5], [0, 1]);
  const x1 = useTransform(fanProgress1, [0, 1], ["0%", `-${farX}`]);
  const r1 = useTransform(fanProgress1, [0, 1], [0, -farR]);
  const y1 = useTransform(fanProgress1, [0, 1], [0, farY]);
  const opacity1 = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  const fanProgress2 = useTransform(smoothProgress, [0.05, 0.45], [0, 1]);
  const x2 = useTransform(fanProgress2, [0, 1], ["0%", `-${closeX}`]);
  const r2 = useTransform(fanProgress2, [0, 1], [0, -closeR]);
  const y2 = useTransform(fanProgress2, [0, 1], [0, closeY]);
  const opacity2 = useTransform(smoothProgress, [0, 0.05], [0, 1]);

  const x4 = useTransform(fanProgress2, [0, 1], ["0%", closeX]);
  const r4 = useTransform(fanProgress2, [0, 1], [0, closeR]);
  const y4 = useTransform(fanProgress2, [0, 1], [0, closeY]);
  const opacity4 = useTransform(smoothProgress, [0, 0.05], [0, 1]);

  const x5 = useTransform(fanProgress1, [0, 1], ["0%", farX]);
  const r5 = useTransform(fanProgress1, [0, 1], [0, farR]);
  const y5 = useTransform(fanProgress1, [0, 1], [0, farY]);
  const opacity5 = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  const fanProgress3 = useTransform(smoothProgress, [0, 0.4], [0, 1]);
  const scale3 = useTransform(fanProgress3, [0, 1], [1, centralScale]);
  const y3 = useTransform(fanProgress3, [0, 1], [0, -15]);

  const images = [
    "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/hts4foeb1l8-1779490857580.png",
    "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/x0kq6od5on-1779491623931.jpg",
    "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/uzvbthz4ncc-1779730234426.jpg",
    "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/8gaktp9ln3-1779733239455.png",
    "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/97grnqq0tnv-1779733664436.png"
  ];

  // Mobile carousel state
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 5s on mobile
  useEffect(() => {
    if (!isMobile || isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile, isPaused, images.length]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      setActiveIndex((prev) => (prev + 1) % images.length);
    } else if (info.offset.x > threshold) {
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    }
    // Resume auto-rotation after a brief pause
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-black py-24 flex flex-col items-center overflow-visible min-h-[150vh]"
    >
      <div className="absolute inset-0 grid-pattern opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,202,22,0.03)_0%,transparent_70%)] pointer-events-none" />

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

      <motion.div
        className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full flex items-center justify-center pointer-events-auto z-10 mb-24"
      >
        {isMobile ? (
          <motion.div
            className="relative w-full h-full flex items-center justify-center overflow-visible touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={handleDragEnd}
          >
            {images.map((image, index) => {
              const len = images.length;
              let offset = index - activeIndex;
              if (offset > len / 2) offset -= len;
              if (offset < -len / 2) offset += len;

              const abs = Math.abs(offset);
              const isCenter = offset === 0;
              const isNear = abs === 1;

              const xPos = offset * 62;
              const scale = isCenter ? 1 : isNear ? 0.8 : 0.66;
              const opacity = isCenter ? 1 : isNear ? 0.6 : 0.15;
              const saturate = isCenter ? 1 : isNear ? 0.5 : 0;
              const zIndex = 30 - abs;

              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{ x: xPos, scale, opacity }}
                  transition={{ type: "spring", stiffness: 220, damping: 28 }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: -180,
                    marginLeft: -82,
                    filter: `saturate(${saturate})`,
                    zIndex,
                    pointerEvents: "none",
                  }}
                >
                  <SmartphonePlaceholder image={image} />
                </motion.div>
              );
            })}

            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 flex gap-2 z-40">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeIndex ? "bg-[#FFCA16]" : "bg-white/20"}`}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            <motion.div style={{ x: x1, rotate: r1, y: y1, opacity: opacity1, zIndex: 10 }} className="absolute">
              <SmartphonePlaceholder image={images[0]} />
            </motion.div>
            <motion.div style={{ x: x2, rotate: r2, y: y2, opacity: opacity2, zIndex: 20 }} className="absolute">
              <SmartphonePlaceholder image={images[1]} />
            </motion.div>
            <motion.div style={{ x: x4, rotate: r4, y: y4, opacity: opacity4, zIndex: 20 }} className="absolute">
              <SmartphonePlaceholder image={images[3]} />
            </motion.div>
            <motion.div style={{ x: x5, rotate: r5, y: y5, opacity: opacity5, zIndex: 10 }} className="absolute">
              <SmartphonePlaceholder image={images[4]} />
            </motion.div>
            <motion.div
              style={{ scale: scale3, y: y3, zIndex: 30 }}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <SmartphonePlaceholder image={images[2]} />
            </motion.div>
          </div>
        )}
      </motion.div>

      <div className="container-editorial relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-gray-300 max-w-xl mx-auto mb-10 text-lg"
        >
          Cada arte é pensada para manter a identidade da marca em evidência, em qualquer formato: posts, carrosséis, stories e campanhas.
        </motion.p>
      </div>
    </section>
  );
};

const SmartphonePlaceholder = ({ image, objectFit = "cover" }: { image: string, objectFit?: "cover" | "contain" }) => {
  return (
    <div className="w-[164px] h-[360px] md:w-[198px] md:h-[429px] lg:w-[280px] lg:h-[600px] relative group pointer-events-auto" style={{ perspective: "1000px" }}>
      {/* Outer glow */}
      <div className="absolute -inset-[2px] bg-gradient-to-tr from-white/15 via-white/5 to-transparent blur-md rounded-[40px] md:rounded-[44px] lg:rounded-[52px] opacity-60" />

      {/* Titanium frame */}
      <div
        className="w-full h-full rounded-[36px] md:rounded-[40px] lg:rounded-[48px] p-[3px] relative overflow-hidden ring-1 ring-white/15"
        style={{
          background:
            "linear-gradient(145deg, #6b6b6e 0%, #3a3a3c 18%, #1f1f21 50%, #3a3a3c 82%, #6b6b6e 100%)",
          boxShadow:
            "0 30px 60px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {/* Inner bezel (uniform thin black ring) */}
        <div className="w-full h-full bg-black rounded-[33px] md:rounded-[37px] lg:rounded-[45px] p-[3px] relative">
          {/* Screen — image fills 100% */}
          <div className="w-full h-full rounded-[30px] md:rounded-[34px] lg:rounded-[42px] overflow-hidden bg-[#050505] relative shadow-inner">
            <img
              src={image}
              alt="Social Media Art"
              className={`w-full h-full ${objectFit === "contain" ? "object-contain" : "object-cover"} object-center transition-opacity duration-700 group-hover:opacity-100`}
            />
            <div className="absolute inset-0 shadow-[inset_0_0_24px_rgba(0,0,0,0.55)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.09] opacity-70 pointer-events-none" />
            <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-white/[0.06] via-transparent to-transparent rotate-45 pointer-events-none group-hover:translate-x-1/4 group-hover:translate-y-1/4 transition-transform duration-1000" />

            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[34%] h-[22px] bg-black rounded-full z-20 flex items-center justify-end px-2 shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
              <div className="w-1.5 h-1.5 bg-[#0a0a0a] rounded-full shadow-[0_0_3px_rgba(59,130,246,0.4)] ring-1 ring-white/5" />
            </div>
          </div>
        </div>
      </div>

      {/* Side buttons (iPhone 17) */}
      <div className="absolute -left-[2px] top-[14%] w-[3px] h-[3%] bg-gradient-to-b from-[#5a5a5c] to-[#2a2a2c] rounded-l-sm border-l border-white/10" />
      <div className="absolute -left-[2px] top-[22%] w-[3px] h-[6%] bg-gradient-to-b from-[#5a5a5c] to-[#2a2a2c] rounded-l-sm border-l border-white/10" />
      <div className="absolute -left-[2px] top-[32%] w-[3px] h-[10%] bg-gradient-to-b from-[#5a5a5c] to-[#2a2a2c] rounded-l-sm border-l border-white/10" />
      <div className="absolute -left-[2px] top-[44%] w-[3px] h-[10%] bg-gradient-to-b from-[#5a5a5c] to-[#2a2a2c] rounded-l-sm border-l border-white/10" />
      <div className="absolute -right-[2px] top-[28%] w-[3px] h-[14%] bg-gradient-to-b from-[#5a5a5c] to-[#2a2a2c] rounded-r-sm border-r border-white/10" />

      {/* Drop shadow */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-black/50 blur-2xl rounded-[100%] -z-10" />
    </div>
  );
};

export default SocialMediaPortfolio;
