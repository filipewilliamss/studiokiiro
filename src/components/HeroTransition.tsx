import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import HeroSection from "@/components/HeroSection";
import ImmersiveBridgeSection from "@/components/ImmersiveBridgeSection";

// ─── Linha animada individualmente ──────────────────────────────────────────
function BridgeLine({
  children,
  scrollYProgress,
  startIn,
  endIn,
  delay,
}: {
  children: React.ReactNode;
  scrollYProgress: MotionValue<number>;
  startIn: number;
  endIn: number;
  delay?: number;
}) {
  // Cada linha aparece com blur → nítida, de baixo para cima ligeiramente
  const opacity = useTransform(scrollYProgress, [startIn, endIn], [0, 1]);
  const filter = useTransform(
    scrollYProgress,
    [startIn, endIn],
    ["blur(12px)", "blur(0px)"]
  );
  const y = useTransform(scrollYProgress, [startIn, endIn], ["8px", "0px"]);

  return (
    <motion.div
      style={{ opacity, filter, y }}
      // transition com delay via CSS não funciona direto aqui — usamos o
      // offset ligeiramente deslocado por startIn/endIn (passado pelo pai)
    >
      {children}
    </motion.div>
  );
}

// ─── Componente principal ────────────────────────────────────────────────────
export default function HeroTransition() {
  const sceneRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // Hero recua e some
  const heroY       = useTransform(scrollYProgress, [0, 0.8], ["0%", "-12%"]);
  const heroScale   = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0.12, 0.78], [1, 0.22]);

  // Amarelo sobe primeiro — começa mais cedo, termina mais cedo
  const yellowY = useTransform(scrollYProgress, [0.05, 0.58], ["103%", "0%"]);

  // Branco sobe depois — começa muito mais tarde para criar o "delay" visual
  // O gap entre yellowY e whiteY cria a sensação de layers independentes
  const whiteY = useTransform(scrollYProgress, [0.38, 0.82], ["104%", "0%"]);

  // ── Conteúdo: cada linha aparece sequencialmente com blur ─────────────────
  // h2 linha 1 → começa quando o branco está ~70% na tela
  const line1Start = 0.64;
  const line1End   = 0.76;
  // p linha 2 → começa um tick depois do h2
  const line2Start = 0.70;
  const line2End   = 0.82;

  // ── Fallback sem animação ─────────────────────────────────────────────────
  if (reducedMotion) {
    return (
      <>
        <HeroSection />
        <ImmersiveBridgeSection />
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

        {/* Camada branca — sobe DEPOIS do amarelo (delay real pela diferença de offset) */}
        <motion.div className="kiiro-intro-white" style={{ y: whiteY }}>

          {/* Conteúdo: h2 e p surgem linha por linha com blur */}
          <section id="visao" className="kiiro-bridge">

            <BridgeLine
              scrollYProgress={scrollYProgress}
              startIn={line1Start}
              endIn={line1End}
            >
              <h2>Uma ideia<br /><em>ganha forma.</em></h2>
            </BridgeLine>

            <BridgeLine
              scrollYProgress={scrollYProgress}
              startIn={line2Start}
              endIn={line2End}
            >
              <p>
                Design para transformar o que sua marca é
                <br className="hidden md:block" />
                {" "}naquilo que as pessoas lembram.
              </p>
            </BridgeLine>

          </section>

        </motion.div>
      </div>
    </section>
  );
}
