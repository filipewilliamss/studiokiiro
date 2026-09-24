import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const PROCESS_STEPS = [
  {
    number: "01",
    phase: "DIAGNÓSTICO ESTRATÉGICO",
    title: "Imersão & Posicionamento",
    description: "Mergulhamos na essência do negócio, estudamos a concorrência e identificamos o território proprietário onde sua marca pode liderar sem competir por preço.",
    deliverables: ["Entrevistas de Alinhamento", "Mapeamento Competitivo", "Proposta Única de Valor"],
    accentColor: "#FFCA16",
    tag: "FASE 01 · FUNDAÇÃO",
  },
  {
    number: "02",
    phase: "DIREÇÃO DE ARTE & CONCEITO",
    title: "Território Visual",
    description: "Traduzimos estratégia em linguagem visual pura: experimentos tipográficos, moodboards sensoriais e exploração de materiais que definem o tom inconfundível da marca.",
    deliverables: ["Moodboards de Atmosfera", "Arquitetura Tipográfica", "Paleta Cromática Calibrada"],
    accentColor: "#FF7B60",
    tag: "FASE 02 · CRIAÇÃO",
  },
  {
    number: "03",
    phase: "SISTEMA VISUAL COMPLETO",
    title: "Identidade & Guidelines",
    description: "Construção do símbolo gráfico, padrões visuais, grids de diagramação, packaging e o manual técnico de aplicação que garante consistência em qualquer escala.",
    deliverables: ["Símbolo e Logotipia", "Mockups de Alta Densidade", "Brandbook & Assets Finais"],
    accentColor: "#9D85FF",
    tag: "FASE 03 · IDENTIDADE",
  },
  {
    number: "04",
    phase: "EXPERIÊNCIA DIGITAL & ATIVAÇÃO",
    title: "Sites de Alta Conversão",
    description: "Desenvolvimento de presença digital de vanguarda: interfaces interativas com física fluida, storytelling cinematográfico e arquitetura pensada para fechar contratos.",
    deliverables: ["Design UI/UX Exclusivo", "Frontend Interativo 60fps", "Otimização SEO & Performance"],
    accentColor: "#6EE7B7",
    tag: "FASE 04 · ATIVAÇÃO",
  },
];

const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Translação horizontal com física elástica (Scroll-Craft)
  // 4 cards largos: movemos de 0% para aprox -75%
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.2 });
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section 
      id="processo"
      ref={containerRef}
      className="relative h-[380vh] bg-[#050505] border-t border-white/[0.06]"
    >
      {/* Sticky Stage que fixa no viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between py-12 md:py-16">
        
        {/* Top Header do Processo */}
        <div className="container-editorial relative z-10 flex items-end justify-between border-b border-white/10 pb-5">
          <div>
            <span className="text-[#FFCA16] font-mono text-[11px] uppercase tracking-[0.35em] block mb-1">
              [ 03 · METODOLOGIA KIIRO ]
            </span>
            <h2 className="font-display font-[800] text-2xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
              Como construímos marcas <span className="text-[#FFCA16] italic font-light">memoráveis</span>
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-white/40 font-mono text-xs uppercase tracking-widest">
            <span>SCROLL HORIZONTAL</span>
            <div className="w-8 h-[1px] bg-[#FFCA16]" />
            <span className="text-[#FFCA16]">01 ➔ 04</span>
          </div>
        </div>

        {/* Trilho Horizontal com os 4 Cards de Processo */}
        <div className="relative z-10 w-full overflow-hidden pl-4 sm:pl-8 md:pl-16">
          <motion.div 
            style={{ x }}
            className="flex items-center gap-8 md:gap-14 w-max"
          >
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="w-[85vw] sm:w-[540px] md:w-[620px] rounded-2xl border border-white/10 bg-white/[0.015] p-8 md:p-12 relative flex flex-col justify-between backdrop-blur-md transition-all duration-500 hover:border-white/20 group select-none shadow-2xl"
              >
                {/* Marcas de corte Illustrator '+' */}
                <span className="absolute -top-[5px] -left-[5px] text-white/30 font-mono text-[10px]">+</span>
                <span className="absolute -top-[5px] -right-[5px] text-white/30 font-mono text-[10px]">+</span>
                <span className="absolute -bottom-[5px] -left-[5px] text-white/30 font-mono text-[10px]">+</span>
                <span className="absolute -bottom-[5px] -right-[5px] text-white/30 font-mono text-[10px]">+</span>

                {/* Topo do Card */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span 
                      style={{ color: step.accentColor }}
                      className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.25em] bg-white/[0.03] border border-white/10"
                    >
                      {step.tag}
                    </span>
                    <span 
                      style={{ color: step.accentColor }}
                      className="font-display font-[900] text-4xl sm:text-5xl md:text-6xl tracking-tighter opacity-80"
                    >
                      {step.number}
                    </span>
                  </div>

                  <span className="text-white/40 font-mono text-xs uppercase tracking-widest block mb-2">
                    {step.phase}
                  </span>

                  <h3 className="font-display font-[800] text-3xl sm:text-4xl text-white tracking-tight leading-[1.05] mb-6">
                    {step.title}
                  </h3>

                  <p className="text-white/65 text-base md:text-lg font-light leading-relaxed font-display max-w-lg">
                    {step.description}
                  </p>
                </div>

                {/* Entregáveis Técnicos */}
                <div className="mt-10 pt-6 border-t border-white/[0.08]">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-3">
                    ENTREGÁVEIS PRINCIPAIS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {step.deliverables.map((item) => (
                      <span 
                        key={item}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/80 font-mono text-[11px] tracking-wide"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Barra de Progresso Horizontal no Rodapé */}
        <div className="container-editorial relative z-10">
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              style={{ scaleX: smoothProgress }}
              className="h-full bg-[#FFCA16] origin-left"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
