import { useRef, useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import HeroSection from "@/components/HeroSection";

function getBlurString(v: number, start: number, end: number, maxBlur = 14): string {
  if (v >= end) return "none";
  if (v <= start) return `blur(${maxBlur}px)`;
  const progress = (v - start) / (end - start);
  const blurVal = Number((maxBlur * (1 - progress)).toFixed(1));
  return blurVal <= 0.3 ? "none" : `blur(${blurVal}px)`;
}

export default function HeroTransition() {
  const sceneRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  // Mede a distância real de rolagem local da seção (altura total - 1 viewport)
  // Isso desvincula 100% a seção do tamanho global da página!
  const [scrollDistance, setScrollDistance] = useState(() => 
    typeof window !== "undefined" ? window.innerHeight * 0.9 : 800
  );

  useEffect(() => {
    const updateDistance = () => {
      if (sceneRef.current) {
        const dist = sceneRef.current.offsetHeight - window.innerHeight;
        if (dist > 20) setScrollDistance(dist);
      }
    };
    updateDistance();
    window.addEventListener("resize", updateDistance);
    return () => window.removeEventListener("resize", updateDistance);
  }, []);

  // Usa window.scrollY calibrado exatamente no range de rolagem da seção [0, scrollDistance] -> [0, 1]
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, [0, scrollDistance], [0, 1], { clamp: true });

  // Hero suavemente recua e desvanece no início da rolagem (0 a 0.30)
  const heroY       = useTransform(scrollYProgress, [0, 0.30], ["0%", "-6%"], { clamp: true });
  const heroScale   = useTransform(scrollYProgress, [0, 0.30], [1, 0.96], { clamp: true });
  const heroOpacity = useTransform(scrollYProgress, [0.02, 0.25], [1, 0.15], { clamp: true });

  // 1. Fundo amarelo sobe primeiro no scroll com clareza perceptível (0.05 a 0.48)
  const yellowY = useTransform(scrollYProgress, [0.05, 0.48], ["102%", "0%"], { clamp: true });

  // 2. Fundo branco sobe logo após com delay nítido (inicia em 0.22 e assenta em 0.72)
  const whiteY  = useTransform(scrollYProgress, [0.22, 0.72], ["102%", "0%"], { clamp: true });

  // 3. Linha 1 (h2: "Uma ideia ganha forma."):
  // Surge suavemente aos 0.38 e fica 100% nítida e sólida em preto puro aos 0.80
  const h2Opacity = useTransform(scrollYProgress, [0.38, 0.80], [0, 1], { clamp: true });
  const h2Y       = useTransform(scrollYProgress, [0.38, 0.80], ["28px", "0px"], { clamp: true });
  const h2Filter  = useTransform(scrollYProgress, (v) => getBlurString(v, 0.38, 0.80, 10));

  // 4. Linha 2 (p: "Design para transformar..."):
  // Surge aos 0.48 e fica 100% nítida e sólida aos 0.85
  const pOpacity  = useTransform(scrollYProgress, [0.48, 0.85], [0, 1], { clamp: true });
  const pY        = useTransform(scrollYProgress, [0.48, 0.85], ["28px", "0px"], { clamp: true });
  const pFilter   = useTransform(scrollYProgress, (v) => getBlurString(v, 0.48, 0.85, 10));

  // ── Fallback sem animações complexas ──────────────────────────────────────
  if (reducedMotion) {
    return (
      <>
        <HeroSection />
        <section id="visao" className="kiiro-bridge" style={{ background: "#faf9f4", borderTop: "10px solid #ffca16" }}>
          <h2>Uma ideia<br /><em>ganha forma.</em></h2>
          <p>Design para transformar o que sua marca é<br className="hidden md:block" /> naquilo que as pessoas lembram.</p>
        </section>
      </>
    );
  }

  return (
    <section ref={sceneRef} className="kiiro-intro" aria-label="Introdução ao Studio Kiiro">
      <div className="kiiro-intro-stage">

        {/* Hero com parallax */}
        <motion.div
          className="kiiro-intro-hero"
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        >
          <HeroSection />
        </motion.div>

        {/* Camada amarela — sobe PRIMEIRO */}
        <motion.div
          className="kiiro-intro-yellow"
          style={{ y: yellowY }}
          aria-hidden="true"
        />

        {/* Camada branca — sobe DEPOIS com delay perceptível */}
        <motion.div className="kiiro-intro-white" style={{ y: whiteY }}>
          <div className="kiiro-intro-copy">
            <section id="visao" className="kiiro-bridge">
              <motion.h2
                style={{
                  opacity: h2Opacity,
                  filter: h2Filter,
                  y: h2Y,
                  color: "#000000",
                  willChange: "transform, opacity, filter",
                }}
              >
                Uma ideia<br /><em>ganha forma.</em>
              </motion.h2>

              <motion.p
                style={{
                  opacity: pOpacity,
                  filter: pFilter,
                  y: pY,
                  color: "#000000",
                  willChange: "transform, opacity, filter",
                }}
              >
                Design para transformar o que sua marca é
                <br className="hidden md:block" />
                {" "}naquilo que as pessoas lembram.
              </motion.p>
            </section>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
