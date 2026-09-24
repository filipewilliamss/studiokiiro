import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import HeroSection from "@/components/HeroSection";

function getBlurString(v: number, start: number, end: number, maxBlur = 18): string {
  if (v >= end) return "none";
  if (v <= start) return `blur(${maxBlur}px)`;
  const progress = (v - start) / (end - start);
  const blurVal = Number((maxBlur * (1 - progress)).toFixed(1));
  return blurVal <= 0.4 ? "none" : `blur(${blurVal}px)`;
}

export default function HeroTransition() {
  const sceneRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // Hero suavemente recua e desvanece
  const heroY       = useTransform(scrollYProgress, [0, 0.38], ["0%", "-10%"], { clamp: true });
  const heroScale   = useTransform(scrollYProgress, [0, 0.38], [1, 0.95], { clamp: true });
  const heroOpacity = useTransform(scrollYProgress, [0.06, 0.32], [1, 0.15], { clamp: true });

  // 1. Fundo amarelo sobe primeiro no scroll (0.04 a 0.36)
  const yellowY = useTransform(scrollYProgress, [0.04, 0.36], ["103%", "0%"], { clamp: true });

  // 2. Fundo branco sobe depois com delay bem evidente (inicia em 0.14 e fecha em 0.54)
  const whiteY  = useTransform(scrollYProgress, [0.14, 0.54], ["104%", "0%"], { clamp: true });

  // 3. Linha 1 (h2: "Uma ideia ganha forma."):
  // Começa a surgir aos 0.18 com desfoque profundo (18px) e opacidade 0,
  // focando progressivamente até ficar 100% nítida e opaca preta aos 0.38
  const h2Opacity = useTransform(scrollYProgress, [0.18, 0.38], [0, 1], { clamp: true });
  const h2Y       = useTransform(scrollYProgress, [0.18, 0.38], ["36px", "0px"], { clamp: true });
  const h2Filter  = useTransform(scrollYProgress, (v) => getBlurString(v, 0.18, 0.38, 18));

  // 4. Linha 2 (p: "Design para transformar..."):
  // Surge de forma BEM SEPARADA aos 0.36 (quando a Linha 1 já está quase totalmente formada)
  // com desfoque de 18px e opacidade 0, focando progressivamente até ficar 100% nítida aos 0.54
  const pOpacity  = useTransform(scrollYProgress, [0.36, 0.54], [0, 1], { clamp: true });
  const pY        = useTransform(scrollYProgress, [0.36, 0.54], ["36px", "0px"], { clamp: true });
  const pFilter   = useTransform(scrollYProgress, (v) => getBlurString(v, 0.36, 0.54, 18));

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

        {/* Camada branca — sobe DEPOIS com delay visível */}
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
