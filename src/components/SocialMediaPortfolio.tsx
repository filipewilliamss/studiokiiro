import { useEffect, useRef, useState } from "react";
import { motion, PanInfo, useScroll, useSpring, useTransform } from "framer-motion";
import phoneVencendo from "@/assets/social-phone-1-vencendo.png";
import phoneConferencia from "@/assets/social-phone-2-conferencia.jpg";
import phoneBurger from "@/assets/social-phone-3-burger.jpg";
import phoneApp from "@/assets/social-phone-4-app.png";
import phoneOxigenada from "@/assets/social-phone-5-oxigenada.png";

const SocialMediaPortfolio = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const images = [phoneVencendo, phoneConferencia, phoneBurger, phoneApp, phoneOxigenada];

  useEffect(() => {
    const check = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isMobile || isPaused) return;
    const interval = window.setInterval(() => setActiveIndex((current) => (current + 1) % images.length), 5000);
    return () => window.clearInterval(interval);
  }, [images.length, isMobile, isPaused]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25, mass: 0.5, restDelta: 0.001 });
  const farX = isTablet ? "72%" : "112%";
  const closeX = isTablet ? "40%" : "68%";
  const farR = isTablet ? 16 : 25;
  const closeR = isTablet ? 9 : 14;
  const farY = isTablet ? 30 : 66;
  const closeY = isTablet ? 10 : 17;
  const centralScale = isTablet ? 1.03 : 1.07;

  const farProgress = useTransform(smoothProgress, [0.08, 0.52], [0, 1]);
  const closeProgress = useTransform(smoothProgress, [0.04, 0.46], [0, 1]);
  const centerProgress = useTransform(smoothProgress, [0, 0.4], [0, 1]);

  const leftFarX = useTransform(farProgress, [0, 1], ["0%", `-${farX}`]);
  const leftFarR = useTransform(farProgress, [0, 1], [0, -farR]);
  const leftFarY = useTransform(farProgress, [0, 1], [0, farY]);
  const rightFarX = useTransform(farProgress, [0, 1], ["0%", farX]);
  const rightFarR = useTransform(farProgress, [0, 1], [0, farR]);
  const rightFarY = useTransform(farProgress, [0, 1], [0, farY]);
  const leftCloseX = useTransform(closeProgress, [0, 1], ["0%", `-${closeX}`]);
  const leftCloseR = useTransform(closeProgress, [0, 1], [0, -closeR]);
  const leftCloseY = useTransform(closeProgress, [0, 1], [0, closeY]);
  const rightCloseX = useTransform(closeProgress, [0, 1], ["0%", closeX]);
  const rightCloseR = useTransform(closeProgress, [0, 1], [0, closeR]);
  const rightCloseY = useTransform(closeProgress, [0, 1], [0, closeY]);
  const centerScale = useTransform(centerProgress, [0, 1], [1, centralScale]);
  const centerY = useTransform(centerProgress, [0, 1], [0, -15]);
  const farOpacity = useTransform(smoothProgress, [0, 0.08], [0, 1]);
  const closeOpacity = useTransform(smoothProgress, [0, 0.04], [0, 1]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50) setActiveIndex((current) => (current + 1) % images.length);
    if (info.offset.x > 50) setActiveIndex((current) => (current - 1 + images.length) % images.length);
    setIsPaused(true);
    window.setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <section ref={containerRef} className="relative min-h-[145svh] overflow-hidden bg-[#070807] text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-8 pt-28 sm:px-10 lg:px-16">
        <h2 className="max-w-3xl text-[clamp(3.2rem,7vw,7rem)] font-black leading-[0.82] tracking-[-0.075em] text-balance">
          A identidade continua em cada tela.
        </h2>
        <p className="mt-7 max-w-md text-base leading-relaxed text-white/58 md:text-lg">
          Peças que mantêm a marca viva quando a conversa acontece no digital.
        </p>
      </div>

      <div className="relative z-10 flex h-[92svh] items-center justify-center">
        {isMobile ? (
          <motion.div
            className="relative flex h-full w-full items-center justify-center touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={handleDragEnd}
            aria-label="Galeria de artes para redes sociais"
          >
            {images.map((image, index) => {
              const offset = ((index - activeIndex + images.length + Math.floor(images.length / 2)) % images.length) - Math.floor(images.length / 2);
              const distance = Math.abs(offset);
              const isCenter = offset === 0;
              const isNear = distance === 1;

              return (
                <motion.div
                  key={`${image}-${index}`}
                  initial={false}
                  animate={{ x: offset * 62, scale: isCenter ? 1 : isNear ? 0.8 : 0.66, opacity: isCenter ? 1 : isNear ? 0.6 : 0.15 }}
                  transition={{ type: "spring", stiffness: 220, damping: 28 }}
                  className="absolute left-1/2 top-1/2 -ml-[82px] -mt-[180px]"
                  style={{ zIndex: 30 - distance, filter: `saturate(${isCenter ? 1 : isNear ? 0.5 : 0})` }}
                >
                  <SmartphonePlaceholder image={image} isCenter={isCenter} />
                </motion.div>
              );
            })}
            <div className="absolute bottom-3 left-1/2 z-40 flex -translate-x-1/2 gap-2" aria-hidden="true">
              {images.map((image, index) => <span key={`${image}-dot-${index}`} className={`h-1.5 w-1.5 rounded-full ${index === activeIndex ? "bg-[#FFCA16]" : "bg-white/25"}`} />)}
            </div>
          </motion.div>
        ) : (
          <div className="relative flex h-full w-full max-w-5xl items-center justify-center">
            <motion.div style={{ x: leftFarX, rotate: leftFarR, y: leftFarY, opacity: farOpacity, zIndex: 10 }} className="absolute"><SmartphonePlaceholder image={images[0]} /></motion.div>
            <motion.div style={{ x: leftCloseX, rotate: leftCloseR, y: leftCloseY, opacity: closeOpacity, zIndex: 20 }} className="absolute"><SmartphonePlaceholder image={images[1]} /></motion.div>
            <motion.div style={{ x: rightCloseX, rotate: rightCloseR, y: rightCloseY, opacity: closeOpacity, zIndex: 20 }} className="absolute"><SmartphonePlaceholder image={images[3]} /></motion.div>
            <motion.div style={{ x: rightFarX, rotate: rightFarR, y: rightFarY, opacity: farOpacity, zIndex: 10 }} className="absolute"><SmartphonePlaceholder image={images[4]} /></motion.div>
            <motion.div style={{ scale: centerScale, y: centerY, zIndex: 30 }} className="relative"><SmartphonePlaceholder image={images[2]} isCenter /></motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

const SmartphonePlaceholder = ({ image, isCenter }: { image: string; isCenter?: boolean }) => (
  <div className="group relative h-[360px] w-[164px] pointer-events-auto md:h-[429px] md:w-[198px] lg:h-[600px] lg:w-[280px]" style={{ perspective: "1000px" }}>
    <div className={`absolute -inset-[2px] rounded-[40px] ${isCenter ? "bg-gradient-to-tr from-white/30 via-white/10 to-transparent opacity-80" : "bg-gradient-to-tr from-white/15 via-white/5 to-transparent opacity-60"} blur-md md:rounded-[44px] lg:rounded-[52px]`} />
    <div
      className={`relative h-full w-full overflow-hidden rounded-[36px] ${isCenter ? "bg-gradient-to-br from-[#f2f2f7] via-[#aeaeb2] to-[#d1d1d6] p-[3.5px] ring-1 ring-white/40" : "bg-gradient-to-br from-[#6b6b6e] via-[#1f1f21] to-[#3a3a3c] p-[3px] ring-1 ring-white/15"} md:rounded-[40px] lg:rounded-[48px]`}
      style={{
        boxShadow: isCenter
          ? "0 35px 70px -15px rgba(0,0,0,0.95), 0 0 30px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.4)"
          : "0 30px 60px -20px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[33px] bg-black p-[2.5px] md:rounded-[37px] lg:rounded-[45px]">
        <div className="relative h-full w-full overflow-hidden rounded-[30px] bg-[#050505] shadow-inner md:rounded-[34px] lg:rounded-[42px]">
          <img src={image} alt="Arte para redes sociais" className="h-full w-full object-cover object-top" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08]" />
          <div className="absolute left-1/2 top-2 z-20 h-[18px] w-[30%] md:h-[22px] md:w-[32%] -translate-x-1/2 rounded-full bg-black shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
        </div>
      </div>
    </div>
    <div className="absolute -bottom-10 left-1/2 -z-10 h-10 w-4/5 -translate-x-1/2 rounded-full bg-black/50 blur-2xl" />
  </div>
);

export default SocialMediaPortfolio;
