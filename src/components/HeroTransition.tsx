import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import HeroSection from "@/components/HeroSection";

export default function HeroTransition() {
  const sceneRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // Hero suavemente recua e desvanece
  const heroY       = useTransform(scrollYProgress, [0, 0.40], ["0%", "-10%"]);
  const heroScale   = useTransform(scrollYProgress, [0, 0.40], [1, 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0.08, 0.35], [1, 0.15]);

  // 1. Fundo amarelo sobe primeiro no scroll
  const yellowY = useTransform(scrollYProgress, [0.05, 0.38], ["103%", "0%"]);

  // 2. Fundo branco sobe depois com delay bem evidente em relação ao amarelo
  const whiteY  = useTransform(scrollYProgress, [0.25, 0.54], ["104%", "0%"]);

  // 3. Aparição escalonada com desfoque (blur → nitidez):
  // Linha 1 (h2): surge primeiro com blur e atinge 100% de nitidez antes do final da subida
  const h2Opacity = useTransform(scrollYProgress, [0.32, 0.48], [0, 1]);
  const h2Filter  = useTransform(scrollYProgress, [0.32, 0.48], ["blur(14px)", "blur(0px)"]);
  const h2Y       = useTransform(scrollYProgress, [0.32, 0.48], ["18px", "0px"]);

  // Linha 2 (p): surge logo em seguida (pequena diferença de tempo) e atinge 100% nítido
  // exatamente quando o fundo branco se completa na viewport (0.54)
  const pOpacity  = useTransform(scrollYProgress, [0.38, 0.54], [0, 1]);
  const pFilter   = useTransform(scrollYProgress, [0.38, 0.54], ["blur(14px)", "blur(0px)"]);
  const pY        = useTransform(scrollYProgress, [0.38, 0.54], ["18px", "0px"]);

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

        {/* Camada branca — sobe DEPOIS com delay real */}
        <motion.div className="kiiro-intro-white" style={{ y: whiteY }}>
          <div className="kiiro-intro-copy">
            {/*
              kiiro-bridge usa grid com 2 colunas (h2 | p).
              Animamos h2 e p diretamente como motion tags para
              preservar a semântica, responsividade e layout intactos.
            */}
            <section id="visao" className="kiiro-bridge">
              <motion.h2 style={{ opacity: h2Opacity, filter: h2Filter, y: h2Y }}>
                Uma ideia<br /><em>ganha forma.</em>
              </motion.h2>

              <motion.p style={{ opacity: pOpacity, filter: pFilter, y: pY }}>
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
