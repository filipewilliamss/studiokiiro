import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Play, Volume2, VolumeX } from "lucide-react";
import { playPillHover } from "@/utils/soundEffects";
import kiiroLogoMark from "@/assets/kiiro-mark.svg";

// Imagens locais de alta fidelidade como fallback imediato para cada etapa
import step1Fallback from "@/assets/tabernaculo-pagina-2.webp";
import step2Fallback from "@/assets/akedah-pagina-2.webp";
import step3Fallback from "@/assets/construmar-pagina-2.webp";
import step4Fallback from "@/assets/teamluisa-pagina-2.webp";
import step5Fallback from "@/assets/templo-pagina-2.webp";

/**
 * 💡 DADOS DAS 5 ETAPAS DA METODOLOGIA
 * Você pode substituir as URLs de vídeo abaixo pelos seus próprios arquivos de vídeo (MP4 ou WebM).
 */
export interface ProcessStep {
  id: string;
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  videoUrl: string;
  fallbackImage: string;
  accentColor: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: "briefing",
    number: "01",
    tag: "IMERSÃO & DIAGNÓSTICO",
    title: "Briefing e Imersão",
    subtitle: "Ouvir antes de desenhar. Compreender antes de projetar.",
    description:
      "Iniciamos com uma imersão profunda para dissecar o DNA da sua marca, desafios de negócio, público-alvo e visão de futuro. Aqui definimos a verdade que a marca precisa comunicar ao mundo.",
    deliverables: [
      "Diagnóstico de Posicionamento",
      "Mapeamento de DNA de Marca",
      "Definição de Personas e Tom de Voz",
      "Alinhamento de Metas e Escopo",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-gold-and-black-lines-41315-large.mp4",
    fallbackImage: step1Fallback,
    accentColor: "#FFCA16",
  },
  {
    id: "pesquisa",
    number: "02",
    tag: "ANÁLISE & BENCHMARKING",
    title: "Pesquisa e Estratégia",
    subtitle: "Encontrar os espaços em branco que a concorrência ignora.",
    description:
      "Analisamos o mercado, concorrentes diretos e referências globais de vanguarda. Criamos o mapa de território visual e a estratégia única que garantirá diferenciação imediata e sustentável.",
    deliverables: [
      "Benchmarking Competitivo Global",
      "Painel Semântico & Moodboard",
      "Definição dos Pilares Visuais",
      "Arquitetura Estratégica da Marca",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-above-in-a-dark-atmosphere-41484-large.mp4",
    fallbackImage: step2Fallback,
    accentColor: "#FFCA16",
  },
  {
    id: "criacao",
    number: "03",
    tag: "DIREÇÃO DE ARTE & SISTEMA",
    title: "Criação e Design",
    subtitle: "Onde o conceito ganha corpo, forma e presença inconfundível.",
    description:
      "Traduzimos a estratégia em sistemas visuais potentes: tipografia proprietária, paleta de cores magnética, símbolo, iconografia e grids. Não criamos apenas logos; construímos universos visuais completos.",
    deliverables: [
      "Design do Símbolo e Logotipo",
      "Paleta Cromática com Racional de Contraste",
      "Tipografia e Hierarquia Editorial",
      "Linguagem Gráfica, Texturas e Padrões",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-liquid-gold-and-black-swirling-waves-41316-large.mp4",
    fallbackImage: step3Fallback,
    accentColor: "#FFCA16",
  },
  {
    id: "apresentacao",
    number: "04",
    tag: "EXPERIÊNCIA & REFINAMENTO",
    title: "Apresentação e Ajustes",
    subtitle: "Conectar você ao impacto real da nova marca no mundo.",
    description:
      "Apresentamos o projeto aplicado em pontos de contato reais — interfaces digitais, embalagens, papelaria e ambientes. Coletamos feedbacks pontuais e refinamos cada detalhe com rigor cirúrgico até a aprovação plena.",
    deliverables: [
      "Apresentação Estruturada em Alta Fidelidade",
      "Simulações em Aplicações Reais e Mockups 3D",
      "Rodada de Refinamento e Calibração",
      "Aprovação e Validação do Conceito",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-black-and-gold-geometric-shapes-moving-41483-large.mp4",
    fallbackImage: step4Fallback,
    accentColor: "#FFCA16",
  },
  {
    id: "entrega",
    number: "05",
    tag: "LANÇAMENTO & BRAND GUIDELINES",
    title: "Entrega Final",
    subtitle: "Autonomia completa e documentação para o seu crescimento.",
    description:
      "Exportamos todos os arquivos em todas as extensões necessárias para impressão gráfica e ambiente digital. Entregamos o Brand Guidelines completo com regras de aplicação para preservar o valor da marca no longo prazo.",
    deliverables: [
      "Manual de Identidade Visual (Brand Guidelines)",
      "Arquivos Vetoriais (.AI, .EPS, .SVG, .PDF)",
      "Assets Digitais Otimizados (PNG, WebP, Favicons)",
      "Tipografias, Grid e Suporte Pós-Lançamento",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-gold-particles-rising-in-the-dark-41317-large.mp4",
    fallbackImage: step5Fallback,
    accentColor: "#FFCA16",
  },
];

export default function KiiroMethodSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1440, height: 900 });

  // Rastreia o progresso do scroll por toda a extensão da seção (520svh)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Atualiza as dimensões da janela para recalcular a geometria da máscara SVG
  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth || 1440,
        height: window.innerHeight || 900,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Progresso do morphing da máscara (0.00 a 0.18 do scroll total)
  const [morphT, setMorphT] = useState(0);
  // Etapa ativa (0 a 4) entre 0.18 e 1.00
  const [activeStep, setActiveStep] = useState(0);
  const lastActiveStepRef = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (p) => {
      // 1. Morph da máscara Kiiro: expande de 0 a 1 no intervalo [0, 0.18]
      const t = Math.min(Math.max(p / 0.18, 0), 1);
      setMorphT(t);

      // 2. Transição entre as 5 etapas no intervalo [0.18, 0.98]
      if (p >= 0.18) {
        const stepProgress = Math.min(Math.max((p - 0.18) / 0.78, 0), 0.999);
        const step = Math.floor(stepProgress * 5);
        if (step !== lastActiveStepRef.current) {
          lastActiveStepRef.current = step;
          setActiveStep(step);
          playPillHover(step);
        }
      } else {
        if (lastActiveStepRef.current !== 0) {
          lastActiveStepRef.current = 0;
          setActiveStep(0);
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Animação de opacidade e escala para o título central "PROCESSO"
  const titleOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.9]);
  const titleY = useTransform(scrollYProgress, [0, 0.12], ["0px", "-45px"]);

  // Animação de entrada do HUD editorial em tela cheia
  const hudOpacity = useTransform(scrollYProgress, [0.15, 0.22], [0, 1]);
  const hudY = useTransform(scrollYProgress, [0.15, 0.22], ["30px", "0px"]);

  // Opacidade do vídeo: começa em 0.35 (mistério na prévia) e atinge 1.0 em tela cheia
  const videoBrightness = useTransform(scrollYProgress, [0, 0.18], [0.35, 1.0]);

  // Calcula os 5 polígonos geométricos dos monólitos Kiiro baseados no progresso do morph
  const isFullyExpanded = morphT >= 0.98;

  const pillars = useMemo(() => {
    const W = dimensions.width;
    const H = dimensions.height;
    const isMobile = W < 768;

    // Dimensões iniciais compactas
    const initialTotalW = Math.min(W * (isMobile ? 0.92 : 0.8), isMobile ? 380 : 860);
    const initialHeight = Math.min(H * (isMobile ? 0.32 : 0.44), isMobile ? 220 : 340);
    const initialGap = isMobile ? 8 : 16;
    const initialYStart = (H - initialHeight) / 2 + (isMobile ? 40 : 60);
    const initialSlope = isMobile ? 12 : 24;

    // Interpolação conforme morphT (0 -> 1)
    const gap = initialGap * (1 - morphT);
    const totalW = initialTotalW + (W - initialTotalW) * morphT;
    const pillarW = (totalW - 4 * gap) / 5;
    const startX = (W - totalW) / 2;
    const pillarHeight = initialHeight + (H - initialHeight) * morphT;
    const startY = initialYStart * (1 - morphT);
    const slope = initialSlope * (1 - morphT);

    return Array.from({ length: 5 }).map((_, i) => {
      const x1 = startX + i * (pillarW + gap);
      const x2 = x1 + pillarW;

      // Chanfro angular de topo inspirado no chevron do Studio Kiiro
      const isAlt = i % 2 === 0;
      const yTopLeft = startY + (isAlt ? slope : 0);
      const yTopRight = startY + (isAlt ? 0 : slope);
      const yBottomRight = startY + pillarHeight;
      const yBottomLeft = startY + pillarHeight;

      return {
        points: `${x1},${yTopLeft} ${x2},${yTopRight} ${x2},${yBottomRight} ${x1},${yBottomLeft}`,
        x: x1,
        y: startY,
        width: pillarW,
        height: pillarHeight,
      };
    });
  }, [dimensions, morphT]);

  // Função para navegar suavemente até uma etapa específica ao clicar no scrubber
  const handleJumpToStep = (index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalScroll = sectionRef.current.offsetHeight - window.innerHeight;
    // O range das etapas vai de 0.18 a 0.96
    const targetProgress = 0.18 + (index / 5) * 0.78 + 0.04;
    window.scrollTo({
      top: scrollTop + targetProgress * totalScroll,
      behavior: "smooth",
    });
  };

  const currentStep = processSteps[activeStep];

  // Fallback acessível para preferências de redução de movimento
  if (reduceMotion) {
    return (
      <section id="processo" className="relative w-full bg-[#050505] text-white py-32 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#FFCA16]">Metodologia</span>
            <h2 className="text-5xl md:text-7xl font-bold uppercase mt-2">Processo</h2>
          </div>
          <div className="space-y-16">
            {processSteps.map((step) => (
              <div key={step.id} className="grid md:grid-cols-2 gap-8 items-center border border-white/10 p-8 rounded-2xl bg-white/[0.02]">
                <div>
                  <span className="text-[#FFCA16] font-mono text-sm tracking-wider">{step.number} // {step.tag}</span>
                  <h3 className="text-3xl font-bold mt-2">{step.title}</h3>
                  <p className="text-zinc-400 mt-4 leading-relaxed">{step.description}</p>
                  <ul className="mt-6 space-y-2">
                    {step.deliverables.map((d) => (
                      <li key={d} className="text-sm text-zinc-300 flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FFCA16]" /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                  <img src={step.fallbackImage} alt={step.title} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="processo"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white select-none"
      style={{ height: "520svh" }}
      aria-label="Metodologia e Processo do Studio Kiiro"
    >
      {/* ========================================================================= */}
      {/* VIEWPORT FIXA (STICKY 100svh): Toda a experiência roda dentro deste palco */}
      {/* ========================================================================= */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center">

        {/* ── CAMADA 1: VÍDEOS EM TELA CHEIA (COM MÁSCARA SVG MORPHING) ─────────── */}
        <motion.div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{
            opacity: videoBrightness,
            maskImage: isFullyExpanded ? "none" : "url(#kiiro-process-mask)",
            WebkitMaskImage: isFullyExpanded ? "none" : "url(#kiiro-process-mask)",
          }}
        >
          {processSteps.map((step, idx) => {
            const isActive = idx === activeStep;
            return (
              <div
                key={step.id}
                className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-out"
                style={{
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 2 : 1,
                  transform: `scale(${isActive ? 1 : 1.05})`,
                  transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* Vídeo HTML5 em looping */}
                <video
                  src={step.videoUrl}
                  poster={step.fallbackImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />

                {/* Imagem de fallback estática de segurança caso o vídeo falhe ou demore a carregar */}
                <img
                  src={step.fallbackImage}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover -z-10"
                />

                {/* Gradiente de contraste editorial suave para garantir máxima legibilidade dos textos */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 pointer-events-none" />
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/80 pointer-events-none" />
              </div>
            );
          })}
        </motion.div>

        {/* ── DEFINIÇÃO DA MÁSCARA SVG KIIRO (5 MONÓLITOS GEOMÉTRICOS) ──────────── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          width={dimensions.width}
          height={dimensions.height}
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <mask
              id="kiiro-process-mask"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width={dimensions.width}
              height={dimensions.height}
            >
              {/* O fundo preto oculta o vídeo fora das formas */}
              <rect x="0" y="0" width={dimensions.width} height={dimensions.height} fill="black" />
              {/* Os 5 monólitos brancos revelam o vídeo interno */}
              {pillars.map((p, idx) => (
                <polygon key={idx} points={p.points} fill="white" />
              ))}
            </mask>
          </defs>
        </svg>

        {/* ── BORDAS DOURADAS DOS MONÓLITOS (VISÍVEIS NA FASE DE PREVIEW) ────────── */}
        {!isFullyExpanded && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            width={dimensions.width}
            height={dimensions.height}
          >
            {pillars.map((p, idx) => (
              <g key={idx}>
                {/* Linha de contorno dourada sutil com fade-out na expansão */}
                <polygon
                  points={p.points}
                  fill="none"
                  stroke="#FFCA16"
                  strokeWidth={1.5}
                  strokeOpacity={0.45 * (1 - morphT)}
                />
              </g>
            ))}
          </svg>
        )}

        {/* ── CAMADA 2: TÍTULO INICIAL "PROCESSO" NO CENTRO DA VIEWPORT ─────────── */}
        <motion.div
          style={{
            opacity: titleOpacity,
            scale: titleScale,
            y: titleY,
            pointerEvents: morphT > 0.3 ? "none" : "auto",
          }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#FFCA16] mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFCA16] animate-pulse" />
            Metodologia Studio Kiiro
          </span>

          <h2 className="font-display font-[900] text-[clamp(58px,12vw,150px)] leading-[0.88] tracking-[-0.05em] uppercase text-white drop-shadow-[0_12px_45px_rgba(0,0,0,0.9)]">
            Processo
          </h2>

          <p className="mt-4 font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-md leading-relaxed drop-shadow-md">
            Como transformamos estratégia, inteligência e direção de arte em referências visuais definitivas.
          </p>

          <div className="mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#FFCA16] bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
            <span>Role para desvendar as 5 etapas</span>
            <span className="animate-bounce">↓</span>
          </div>
        </motion.div>

        {/* ── CAMADA 3: HUD EDITORIAL EM TELA CHEIA (REVELADO APÓS A EXPANSÃO) ──── */}
        <motion.div
          style={{
            opacity: hudOpacity,
            y: hudY,
            pointerEvents: morphT < 0.2 ? "none" : "auto",
          }}
          className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 md:p-14 pointer-events-none"
        >
          {/* TOPO DO HUD */}
          <div className="w-full flex justify-between items-center pointer-events-auto">
            {/* Identificador da marca */}
            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <img src={kiiroLogoMark} alt="Studio Kiiro" className="w-4 h-4 object-contain" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/90">
                PROCESSO // STUDIO KIIRO
              </span>
            </div>

            {/* Contador da etapa atual */}
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 font-mono text-xs">
              <span className="text-[#FFCA16] font-bold tracking-widest">ETAPA {currentStep.number}</span>
              <span className="text-white/30">/</span>
              <span className="text-white/50 tracking-wider">05</span>
            </div>
          </div>

          {/* CENTRO-ESQUERDA: CONTEÚDO EDITORIAL DA ETAPA ATIVA */}
          <div className="max-w-2xl pointer-events-auto mt-auto mb-16 md:mb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                {/* Badge da Categoria */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFCA16]/15 border border-[#FFCA16]/30 text-[#FFCA16] font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFCA16]" />
                  {currentStep.tag}
                </div>

                {/* Título Principal */}
                <h3 className="font-display font-[800] text-[clamp(28px,5vw,56px)] text-white leading-[1.05] tracking-tight drop-shadow-md">
                  <span className="text-[#FFCA16] mr-3 font-mono">{currentStep.number}.</span>
                  {currentStep.title}
                </h3>

                {/* Subtítulo / Racional Conceitual */}
                <p className="text-sm md:text-base font-medium text-white/90 italic drop-shadow-sm">
                  "{currentStep.subtitle}"
                </p>

                {/* Descrição Detalhada */}
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed max-w-xl drop-shadow-sm">
                  {currentStep.description}
                </p>

                {/* Entregáveis Chave (Chips) */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {currentStep.deliverables.map((del) => (
                    <span
                      key={del}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-[11px] text-zinc-200"
                    >
                      <Check className="w-3 h-3 text-[#FFCA16]" />
                      {del}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RODAPÉ DO HUD: TIMELINE SCRUBBER INTERATIVA DAS 5 ETAPAS */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto pt-4 border-t border-white/10">
            {/* Lista dos 5 marcadores interativos com barra de progresso */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3 w-full max-w-2xl">
              {processSteps.map((step, idx) => {
                const isActive = idx === activeStep;
                const isPassed = idx < activeStep;

                return (
                  <button
                    key={step.id}
                    onClick={() => handleJumpToStep(idx)}
                    className="group flex flex-col gap-1.5 text-left transition-all duration-300 focus:outline-none"
                    aria-label={`Pular para etapa ${step.number}: ${step.title}`}
                  >
                    {/* Barra de progresso do passo */}
                    <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-[#FFCA16] transition-all duration-300"
                        style={{
                          width: isActive ? "100%" : isPassed ? "100%" : "0%",
                          boxShadow: isActive ? "0 0 10px #FFCA16" : "none",
                        }}
                      />
                    </div>

                    {/* Rótulo do passo */}
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`font-mono text-[10px] font-bold transition-colors ${
                          isActive
                            ? "text-[#FFCA16]"
                            : isPassed
                            ? "text-white/80"
                            : "text-white/40 group-hover:text-white/70"
                        }`}
                      >
                        {step.number}
                      </span>
                      <span
                        className={`hidden sm:inline font-sans text-[11px] truncate transition-colors ${
                          isActive
                            ? "text-white font-semibold"
                            : isPassed
                            ? "text-white/70"
                            : "text-white/30 group-hover:text-white/60"
                        }`}
                      >
                        {step.title.split(" ")[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dica de avanço no scroll */}
            <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/50">
              {activeStep < 4 ? (
                <>
                  <span>Role para avançar</span>
                  <ArrowRight className="w-3 h-3 text-[#FFCA16] animate-pulse" />
                </>
              ) : (
                <span className="text-[#FFCA16]">Última etapa concluída ↓</span>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
