import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import HeroSection from "@/components/HeroSection";

function getBlurString(v: number, start: number, end: number, maxBlur = 16): string {
  if (v >= end) return "none";
  if (v <= start) return `blur(${maxBlur}px)`;
  const progress = (v - start) / (end - start);
  const blurVal = Number((maxBlur * (1 - progress)).toFixed(1));
  return blurVal <= 0.3 ? "none" : `blur(${blurVal}px)`;
}

export default function HeroTransition() {
  const sceneRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // Hero suavemente recua e desvanece no início da rolagem
  const heroY       = useTransform(scrollYProgress, [0, 0.25], ["0%", "-10%"], { clamp: true });
  const heroScale   = useTransform(scrollYProgress, [0, 0.25], [1, 0.95], { clamp: true });
  const heroOpacity = useTransform(scrollYProgress, [0.03, 0.22], [1, 0.15], { clamp: true });

  // 1. Fundo amarelo sobe primeiro no scroll (0.02 a 0.22)
  const yellowY = useTransform(scrollYProgress, [0.02, 0.22], ["103%", "0%"], { clamp: true });

  // 2. Fundo branco sobe logo após com delay perceptível (inicia em 0.10 e assenta em 0.30)
  const whiteY  = useTransform(scrollYProgress, [0.10, 0.30], ["104%", "0%"], { clamp: true });

  // 3. Linha 1 (h2: "Uma ideia ganha forma."):
  // Surge no início da seção branca (0.22) com desfoque de 16px,
  // e fica 100% nítida e sólida em preto puro aos 0.38
  const h2Opacity = useTransform(scrollYProgress, [0.22, 0.38], [0, 1], { clamp: true });
  const h2Y       = useTransform(scrollYProgress, [0.22, 0.38], ["32px", "0px"], { clamp: true });
  const h2Filter  = useTransform(scrollYProgress, (v) => getBlurString(v, 0.22, 0.38, 16));

  // 4. Linha 2 (p: "Design para transformar..."):
  // Surge de forma BEM SEPARADA aos 0.36 (quando a Linha 1 já está quase 100% formada)
  // com desfoque de 16px, e fica 100% nítida e sólida em preto puro aos 0.52
  // Bem antes de terminar a seção, todo o conteúdo já está 100% estável e legível!
  const pOpacity  = useTransform(scrollYProgress, [0.36, 0.52], [0, 1], { clamp: true });
  const pY        = useTransform(scrollYProgress, [0.36, 0.52], ["32px", "0px"], { clamp: true });
  const pFilter   = useTransform(scrollYProgress, (v) => getBlurString(v, 0.36, 0.52, 16));

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
