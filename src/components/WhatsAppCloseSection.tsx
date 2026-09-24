import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { playSwitchClick } from "@/utils/soundEffects";
import "@/styles/kiiro-close.css";

const WHATSAPP_URL =
  "https://wa.me/5511991076096?text=Ol%C3%A1%20Studio%20Kiiro%2C%20quero%20conversar%20sobre%20um%20projeto.";

// As quatro partes são os mesmos vetores do símbolo no manual da marca.
const symbolPieces = [
  {
    path: "M693.69,386.46h-114.79l114.78,111.28v-111.28Z",
    scattered: { x: 70, y: -70, rotate: 22 },
  },
  {
    path: "M501.1,386.46h-114.79v111.28s114.79-111.28,114.79-111.28Z",
    scattered: { x: -80, y: -58, rotate: -24 },
  },
  {
    path: "M576.63,580.07l117.06,113.47v-102.25l-117.06-113.47v102.25Z",
    scattered: { x: 78, y: 68, rotate: -18 },
  },
  {
    path: "M386.31,693.54l117.06-113.47v-102.25l-117.06,113.47v102.25Z",
    scattered: { x: -72, y: 74, rotate: 17 },
  },
] as const;

const WhatsAppCloseSection = () => {
  const [formed, setFormed] = useState(false);
  const reduceMotion = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothX = useSpring(tiltX, { stiffness: 120, damping: 18 });
  const smoothY = useSpring(tiltY, { stiffness: 120, damping: 18 });

  const moveSymbol = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    tiltX.set(((event.clientY - rect.top) / rect.height - 0.5) * -10);
    tiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * 10);
  };

  const resetSymbol = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const toggleSymbol = () => {
    setFormed((previous) => {
      playSwitchClick(!previous);
      return !previous;
    });
  };

  return (
    <section id="contato" className="kiiro-close" aria-labelledby="kiiro-close-title">
      <div className="kiiro-close-inner">
        <div className="kiiro-close-copy">
          <h2 id="kiiro-close-title">
            Dê forma
            <br />
            ao que <em>vem.</em>
          </h2>
          <p className="kiiro-close-lead">
            Toda grande marca começa com uma conversa.
          </p>
          <a
            className="kiiro-close-link"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSwitchClick(true)}
          >
            <span>Vamos conversar no WhatsApp</span>
            <ArrowUpRight aria-hidden="true" strokeWidth={1.6} />
          </a>
        </div>

        <div className="kiiro-close-art">
          <motion.button
            type="button"
            className="kiiro-close-symbol-button"
            aria-label={formed ? "Separar as formas do símbolo Kiiro" : "Unir as formas do símbolo Kiiro"}
            aria-pressed={formed}
            onClick={toggleSymbol}
            onPointerMove={moveSymbol}
            onPointerLeave={resetSymbol}
            whileTap={reduceMotion ? undefined : { scale: 0.975 }}
          >
            <motion.svg
              className="kiiro-close-symbol"
              viewBox="280 280 520 520"
              role="img"
              aria-label="Símbolo geométrico Studio Kiiro"
              style={reduceMotion ? undefined : { rotateX: smoothX, rotateY: smoothY }}
            >
              {symbolPieces.map((piece, index) => (
                <motion.path
                  key={piece.path}
                  d={piece.path}
                  fill="currentColor"
                  initial={false}
                  animate={formed ? { x: 0, y: 0, rotate: 0 } : piece.scattered}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: formed ? 170 : 130,
                          damping: formed ? 17 : 19,
                          mass: 0.85,
                          delay: formed ? index * 0.045 : 0,
                        }
                  }
                />
              ))}
            </motion.svg>
          </motion.button>
          <p className="kiiro-close-prompt" aria-live="polite">
            {formed ? "Uma ideia ganha forma." : "Toque para dar forma à ideia."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppCloseSection;
