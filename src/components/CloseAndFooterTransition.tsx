import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import WhatsAppCloseSection from "@/components/WhatsAppCloseSection";
import Footer from "@/components/Footer";

export default function CloseAndFooterTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Rastreia o progresso exatamente do topo da seção amarela até o final do rodapé
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // O rodapé inicia recuado para cima (escondido atrás da camada amarela)
  // e se move para baixo em direção à sua posição de repouso à medida que o scroll desce.
  const footerY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0px", "0px"] : ["-130px", "0px"]
  );

  const footerScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [0.96, 1]
  );

  const footerOpacity = useTransform(
    scrollYProgress,
    [0, 0.45],
    reduceMotion ? [1, 1] : [0.5, 1]
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ========================================================================= */}
      {/* CAMADA 1 (FRENTE): Seção Amarela do WhatsApp                              */}
      {/* Fica no topo da pilha visual (z-20) e projeta sombra sobre o rodapé        */}
      {/* ========================================================================= */}
      <div className="relative z-20 bg-[#ffca16] shadow-[0_35px_90px_rgba(0,0,0,0.9)] border-b border-black/10">
        <WhatsAppCloseSection />
      </div>

      {/* ========================================================================= */}
      {/* CAMADA 2 (TRÁS): Rodapé saindo de trás do fundo amarelo                  */}
      {/* Posição sticky bottom-0: fica ancorado no fundo enquanto a seção amarela   */}
      {/* sobe no scroll, revelando o rodapé que se move para baixo suavemente       */}
      {/* ========================================================================= */}
      <div className="sticky bottom-0 z-10 w-full overflow-hidden bg-[#070807]">
        <motion.div
          style={{
            y: footerY,
            scale: footerScale,
            opacity: footerOpacity,
          }}
          className="w-full"
        >
          <Footer />
        </motion.div>
      </div>
    </div>
  );
}
