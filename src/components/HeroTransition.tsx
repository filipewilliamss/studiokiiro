import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import ImmersiveBridgeSection from "@/components/ImmersiveBridgeSection";

export default function HeroTransition() {
  const sceneRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });

  const heroY = useTransform(scrollYProgress, [0, 0.8], ["0%", "-12%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0.12, 0.78], [1, 0.22]);
  const yellowY = useTransform(scrollYProgress, [0.06, 0.67], ["103%", "0%"]);
  const whiteY = useTransform(scrollYProgress, [0.13, 0.8], ["104%", "0%"]);
  const copyY = useTransform(scrollYProgress, [0.22, 0.82], ["11%", "0%"]);
  const copyOpacity = useTransform(scrollYProgress, [0.27, 0.76], [0.25, 1]);
  const copyFilter = useTransform(scrollYProgress, [0.32, 0.77], ["blur(9px)", "blur(0px)"]);

  if (reducedMotion) {
    return <>
      <HeroSection />
      <ImmersiveBridgeSection />
    </>;
  }

  return <section ref={sceneRef} className="kiiro-intro" aria-label="Introdução ao Studio Kiiro">
    <div className="kiiro-intro-stage">
      <motion.div className="kiiro-intro-hero" style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}>
        <HeroSection />
      </motion.div>
      <motion.div className="kiiro-intro-yellow" style={{ y: yellowY }} aria-hidden="true" />
      <motion.div className="kiiro-intro-white" style={{ y: whiteY }}>
        <motion.div className="kiiro-intro-copy" style={{ y: copyY, opacity: copyOpacity, filter: copyFilter }}>
          <ImmersiveBridgeSection />
        </motion.div>
      </motion.div>
    </div>
  </section>;
}
