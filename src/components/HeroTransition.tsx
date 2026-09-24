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
  const heroY       = useTransform(scrollYProgress, [0, 0.45], ["0%", "-10%"], { clamp: true });
  const heroScale   = useTransform(scrollYProgress, [0, 0.45], [1, 0.95], { clamp: true });
  const heroOpacity = useTransform(scrollYProgress, [0.08, 0.40], [1, 0.15], { clamp: true });

  // 1. Fundo amarelo sobe primeiro no scroll
  const yellowY = useTransform(scrollYProgress, [0.05, 0.48], ["103%", "0%"], { clamp: true });

  // 2. Fundo branco sobe depois com delay perceptível (começa só em 0.22)
  const whiteY  = useTransform(scrollYProgress, [0.22, 0.65], ["104%", "0%"], { clamp: true });

  // 3. Aparição escalonada com desfoque (blur → nitidez):
  // Linha 1 (h2): surge primeiro com blur e atinge 100% de nitidez em 0.52
  const h2Opacity = useTransform(scrollYProgress, [0.26, 0.52], [0.15, 1], { clamp: true });
  const h2Filter  = useTransform(scrollYProgress, [0.26, 0.52], ["blur(12px)", "blur(0px)"], { clamp: true });
  const h2Y       = useTransform(scrollYProgress, [0.26, 0.52], ["16px", "0px"], { clamp: true });

  // Linha 2 (p): surge logo em seguida (pequena diferença de tempo) e atinge 100% nítido
  // exatamente quando o fundo branco se completa na viewport (0.65)
  const pOpacity  = useTransform(scrollYProgress, [0.38, 0.65], [0.15, 1], { clamp: true });
  const pFilter   = useTransform(scrollYProgress, [0.38, 0.65], ["blur(12px)", "blur(0px)"], { clamp: true });
  const pY        = useTransform(scrollYProgress, [0.38, 0.65], ["16px", "0px"], { clamp: true });

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
            <section id="visao" className="kiiro-bridge">
              <motion.h2
                style={{
                  opacity: h2Opacity,
                  filter: h2Filter,
                  y: h2Y,
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
