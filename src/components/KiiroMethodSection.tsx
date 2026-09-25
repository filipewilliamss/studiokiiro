import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Check, ArrowDown, ArrowUpRight } from "lucide-react";
import { playPillHover } from "@/utils/soundEffects";
import kiiroLogoMark from "@/assets/kiiro-mark.svg";

// Imagens locais de alta fidelidade como fallback imediato para cada etapa
import step1Fallback from "@/assets/tabernaculo-pagina-2.webp";
import step2Fallback from "@/assets/akedah-pagina-2.webp";
import step3Fallback from "@/assets/construmar-pagina-2.webp";
import step4Fallback from "@/assets/teamluisa-pagina-2.webp";
import step5Fallback from "@/assets/templo-pagina-2.webp";

export interface MetadataField {
  label: string;
  value: string;
}

export interface ProcessStepData {
  id: string;
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  metadataItems: MetadataField[];
  deliverables: string[];
  videoUrl: string;
  fallbackImage: string;
  buttonLabel: string;
}

const STEP_01: ProcessStepData = {
  id: "briefing",
  number: "01",
  tag: "IMERSÃO & DIAGNÓSTICO",
  title: "Briefing e Imersão",
  subtitle: "Ouvir antes de desenhar. Compreender antes de projetar.",
  description:
    "Iniciamos com uma imersão profunda para dissecar o DNA da sua marca, desafios de negócio, público-alvo e visão de futuro. Aqui definimos a verdade que a marca precisa comunicar ao mundo com precisão cirúrgica.",
  metadataItems: [
    { label: "Fase", value: "01 // IMERSÃO" },
    { label: "Escopo", value: "DIAGNÓSTICO DE POSICIONAMENTO" },
    { label: "Metodologia", value: "MAPEAMENTO DE DNA DE MARCA" },
    { label: "Entregáveis", value: "PERSONAS, TOM DE VOZ & METAS" },
  ],
  deliverables: [
    "Diagnóstico de Posicionamento",
    "Mapeamento de DNA de Marca",
    "Definição de Personas e Tom de Voz",
    "Alinhamento de Metas e Escopo",
  ],
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-gold-and-black-lines-41315-large.mp4",
  fallbackImage: step1Fallback,
  buttonLabel: "ETAPA 01 // BRIEFING",
};

/**
 * Processos 02 a 05: exibidos com título monumental amarelo em cima do vídeo,
 * todos os vídeos no lado direito e informações limpas/clean no lado esquerdo
 * exatamente como nas imagens de referência do Dkton (VISIT AUSTRIA / TGW WERX).
 */
const STEPS_DKTON_STYLE: ProcessStepData[] = [
  {
    id: "pesquisa",
    number: "02",
    tag: "ANÁLISE & BENCHMARKING",
    title: "Pesquisa e Estratégia",
    subtitle: "Encontrar os espaços em branco que a concorrência ignora.",
    description:
      "Mapeamos o mercado e referências globais de vanguarda para encontrar os espaços em branco que a concorrência ignora. Criamos a estratégia única que garantirá diferenciação duradoura e relevante.",
    metadataItems: [
      { label: "Fase", value: "02 // ANÁLISE" },
      { label: "Escopo", value: "BENCHMARKING GLOBAL & SETORIAL" },
      { label: "Metodologia", value: "MAPEAMENTO DE TERRITÓRIO VISUAL" },
      { label: "Entregáveis", value: "PAINEL SEMÂNTICO & MOODBOARD" },
      { label: "Diretriz", value: "ENCONTRAR O DIFERENCIAL REAL" },
    ],
    deliverables: [
      "Benchmarking Competitivo Global",
      "Painel Semântico & Moodboard",
      "Definição dos Pilares Visuais",
      "Arquitetura Estratégica da Marca",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-above-in-a-dark-atmosphere-41484-large.mp4",
    fallbackImage: step2Fallback,
    buttonLabel: "VER PROCESSO",
  },
  {
    id: "criacao",
    number: "03",
    tag: "DIREÇÃO DE ARTE & SISTEMA",
    title: "Criação e Design",
    subtitle: "Onde o conceito ganha corpo, forma e presença inconfundível.",
    description:
      "Traduzimos a estratégia em sistemas visuais potentes: tipografia proprietária, paleta de cores magnética, símbolo, iconografia e grids matemáticos. Construímos o universo visual completo.",
    metadataItems: [
      { label: "Fase", value: "03 // SISTEMA DE MARCA" },
      { label: "Escopo", value: "SÍMBOLO, TIPOGRAFIA & CORES" },
      { label: "Metodologia", value: "GRID MODULAR & GEOMETRIA" },
      { label: "Entregáveis", value: "UNIVERSO VISUAL & PADRÕES" },
      { label: "Diretriz", value: "PRESENÇA INCONFUNDÍVEL" },
    ],
    deliverables: [
      "Design do Símbolo e Logotipo",
      "Paleta Cromática com Racional de Contraste",
      "Tipografia e Hierarquia Editorial",
      "Linguagem Gráfica, Texturas e Padrões",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-liquid-gold-and-black-swirling-waves-41316-large.mp4",
    fallbackImage: step3Fallback,
    buttonLabel: "VER PROCESSO",
  },
  {
    id: "apresentacao",
    number: "04",
    tag: "EXPERIÊNCIA & REFINAMENTO",
    title: "Apresentação e Ajustes",
    subtitle: "Conectar você ao impacto real da nova marca no mundo.",
    description:
      "Apresentamos a nova marca aplicada em pontos de contato reais — interfaces digitais, embalagens, papelaria e ambientes. Refinamos cada detalhe com rigor cirúrgico até a aprovação plena.",
    metadataItems: [
      { label: "Fase", value: "04 // REFINAMENTO" },
      { label: "Escopo", value: "SIMULAÇÕES EM PONTOS DE CONTATO" },
      { label: "Metodologia", value: "VALIDAÇÃO DE IMPACTO REAL" },
      { label: "Entregáveis", value: "MOCKUPS 3D & CALIBRAÇÃO" },
      { label: "Diretriz", value: "RIGOR CIRÚRGICO ATÉ A APROVAÇÃO" },
    ],
    deliverables: [
      "Apresentação Estruturada em Alta Fidelidade",
      "Simulações em Aplicações Reais e Mockups 3D",
      "Rodada de Refinamento e Calibração",
      "Aprovação e Validação do Conceito",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-black-and-gold-geometric-shapes-moving-41483-large.mp4",
    fallbackImage: step4Fallback,
    buttonLabel: "VER PROCESSO",
  },
  {
    id: "entrega",
    number: "05",
    tag: "LANÇAMENTO & BRAND GUIDELINES",
    title: "Entrega Final",
    subtitle: "Autonomia completa e documentação para o seu crescimento.",
    description:
      "Autonomia total para o crescimento da sua marca. Entregamos o Brand Guidelines completo e todos os arquivos em extensões finais para produção gráfica profissional e ambiente digital.",
    metadataItems: [
      { label: "Fase", value: "05 // BRAND GUIDELINES" },
      { label: "Escopo", value: "MANUAL COMPLETO & ASSETS" },
      { label: "Metodologia", value: "EXPORTAÇÃO MULTIFORMATO" },
      { label: "Entregáveis", value: "ARQUIVOS VETORIAIS (.AI, .EPS, .SVG, .PDF)" },
      { label: "Diretriz", value: "AUTONOMIA & CONSISTÊNCIA TOTAL" },
    ],
    deliverables: [
      "Manual de Identidade Visual (Brand Guidelines)",
      "Arquivos Vetoriais (.AI, .EPS, .SVG, .PDF)",
      "Assets Digitais Otimizados (PNG, WebP, Favicons)",
      "Tipografias, Grid e Suporte Pós-Lançamento",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-gold-particles-rising-in-the-dark-41317-large.mp4",
    fallbackImage: step5Fallback,
    buttonLabel: "VER PROCESSO",
  },
];

// 7 tonalidades de amarelo correspondentes às formas geométricas da referência
const YELLOW_TONES = [
  "#FFD84D", // Amarelo vibrante claro
  "#FFCA16", // Amarelo oficial Studio Kiiro
  "#F59E0B", // Âmbar dourado
  "#FEF08A", // Amarelo limão suave
  "#EAB308", // Ouro médio
  "#FBBF24", // Amarelo quente
  "#FCD34D", // Amarelo solar
];

export default function KiiroMethodSection() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1440, height: 900 });

  // Rastreia o scroll da seção hero sticky (onde o Showreel e a máscara se expandem)
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // Atualiza as dimensões de tela para a máscara SVG
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth || 1440,
        height: window.innerHeight || 900,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Progresso do morphing da máscara (0 a 1)
  const [morphT, setMorphT] = useState(0);

  useEffect(() => {
    const unsubscribe = heroScrollProgress.on("change", (p) => {
      const t = Math.min(Math.max(p / 0.75, 0), 1);
      setMorphT(t);
    });
    return () => unsubscribe();
  }, [heroScrollProgress]);

  // Transforma o título "PROCESSO": sobe e esmaece conforme o scroll expande as formas
  const titleY = useTransform(heroScrollProgress, [0, 0.45], ["0px", "-50px"]);
  const titleOpacity = useTransform(heroScrollProgress, [0, 0.45], [1, 0]);
  const titleScale = useTransform(heroScrollProgress, [0, 0.45], [1, 0.92]);

  // Revela o overlay editorial da Etapa 01 quando o vídeo atinge tela cheia
  const step1OverlayOpacity = useTransform(heroScrollProgress, [0.65, 0.88], [0, 1]);
  const step1OverlayY = useTransform(heroScrollProgress, [0.65, 0.88], ["30px", "0px"]);

  // Opacidade do vídeo no interior das formas: 0.4 na prévia até 1.0 em tela cheia
  const videoOpacity = useTransform(heroScrollProgress, [0, 0.75], [0.4, 1.0]);

  // Opacidade do preenchimento amarelo das formas (diminui para revelar o vídeo límpido)
  const shapeYellowFillOpacity = 0.85 * (1 - morphT);

  // Calcula a geometria das 7 formas triangulares/geométricas do Studio Kiiro
  const shapes = useMemo(() => {
    const W = dimensions.width;
    const H = dimensions.height;
    const isMobile = W < 768;

    const shapeCount = 7;
    const initialTotalW = Math.min(W * (isMobile ? 0.94 : 0.84), isMobile ? 420 : 1080);
    const initialHeight = Math.min(H * (isMobile ? 0.34 : 0.42), isMobile ? 220 : 320);
    const initialGap = isMobile ? 6 : 14;
    const initialYStart = (H - initialHeight) / 2 + (isMobile ? 60 : 85);
    const initialSlope = isMobile ? 14 : 28;

    const gap = initialGap * (1 - morphT);
    const totalW = initialTotalW + (W - initialTotalW) * morphT;
    const shapeW = (totalW - (shapeCount - 1) * gap) / shapeCount;
    const startX = (W - totalW) / 2;
    const shapeH = initialHeight + (H - initialHeight) * morphT;
    const startY = initialYStart * (1 - morphT);
    const slope = initialSlope * (1 - morphT);

    return Array.from({ length: shapeCount }).map((_, i) => {
      const x1 = startX + i * (shapeW + gap);
      const x2 = x1 + shapeW;

      const isAlt = i % 2 === 0;
      const isCenter = i === 3;

      let yTopLeft = startY;
      let yTopRight = startY;
      let yBottomLeft = startY + shapeH;
      let yBottomRight = startY + shapeH;

      if (isCenter) {
        yTopLeft = startY + slope * 0.5;
        yTopRight = startY + slope * 0.5;
        yBottomLeft = startY + shapeH;
        yBottomRight = startY + shapeH;
      } else if (isAlt) {
        yTopLeft = startY + slope;
        yTopRight = startY;
        yBottomLeft = startY + shapeH;
        yBottomRight = startY + shapeH - slope * 0.5;
      } else {
        yTopLeft = startY;
        yTopRight = startY + slope;
        yBottomLeft = startY + shapeH - slope * 0.5;
        yBottomRight = startY + shapeH;
      }

      return {
        id: i,
        points: `${x1},${yTopLeft} ${x2},${yTopRight} ${x2},${yBottomRight} ${x1},${yBottomLeft}`,
        color: YELLOW_TONES[i % YELLOW_TONES.length],
        x: x1,
        y: startY,
        width: shapeW,
        height: shapeH,
      };
    });
  }, [dimensions, morphT]);

  const isFullyExpanded = morphT >= 0.98;

  // Fallback para preferências de movimento reduzido
  if (reduceMotion) {
    return (
      <section id="processo" className="w-full bg-[#050505] text-white py-24 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center">
            <span className="font-mono text-xs text-[#FFCA16] uppercase tracking-[0.3em]">Metodologia</span>
            <h2 className="text-5xl md:text-7xl font-bold uppercase mt-2 text-[#FFCA16]">Processo</h2>
          </div>
          <div className="space-y-16">
            {[STEP_01, ...STEPS_DKTON_STYLE].map((step) => (
              <div key={step.id} className="grid md:grid-cols-2 gap-8 items-center border border-white/10 p-8 rounded-2xl bg-white/[0.02]">
                <div>
                  <span className="text-[#FFCA16] font-mono text-sm tracking-wider">{step.number} // {step.tag}</span>
                  <h3 className="text-3xl font-bold mt-2 text-[#FFCA16]">{step.title}</h3>
                  <p className="text-zinc-400 mt-4 leading-relaxed">{step.description}</p>
                  <ul className="mt-6 space-y-2">
                    {step.deliverables.map((d) => (
                      <li key={d} className="text-sm text-zinc-300 flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FFCA16]" /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-[#FFCA16]/30">
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
    <div id="processo" className="relative w-full bg-[#050505] text-white select-none">

      {/* ========================================================================= */}
      {/* 1. SEÇÃO SHOWREEL HERO STICKY (PROCESSO 01 // FRAMES 128 A 138 DO DKTON)   */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        className="relative w-full"
        style={{ height: "230svh" }}
        aria-label="Processo 01 — Showreel e Imersão Studio Kiiro"
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center bg-[#050505]">

          {/* ── CAMADA DE VÍDEO DO PROCESSO 01 COM MÁSCARA SVG MORPHING ──────────── */}
          <motion.div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{
              opacity: videoOpacity,
              maskImage: isFullyExpanded ? "none" : "url(#kiiro-triangles-mask)",
              WebkitMaskImage: isFullyExpanded ? "none" : "url(#kiiro-triangles-mask)",
            }}
          >
            <video
              src={STEP_01.videoUrl}
              poster={STEP_01.fallbackImage}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
            {/* Fallback de imagem de alta fidelidade */}
            <img
              src={STEP_01.fallbackImage}
              alt={STEP_01.title}
              className="absolute inset-0 w-full h-full object-cover -z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60 pointer-events-none" />
          </motion.div>

          {/* ── DEFINIÇÃO DA MÁSCARA SVG (7 FORMAS TRIANGULARES KIIRO) ──────────── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            width={dimensions.width}
            height={dimensions.height}
            style={{ width: "100%", height: "100%" }}
          >
            <defs>
              <mask
                id="kiiro-triangles-mask"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width={dimensions.width}
                height={dimensions.height}
              >
                <rect x="0" y="0" width={dimensions.width} height={dimensions.height} fill="black" />
                {shapes.map((s) => (
                  <polygon key={s.id} points={s.points} fill="white" />
                ))}
              </mask>
            </defs>
          </svg>

          {/* ── CAMADA DE CORES AMARELAS NAS FORMAS (VARIAÇÕES DE TONALIDADE) ───── */}
          {!isFullyExpanded && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              width={dimensions.width}
              height={dimensions.height}
            >
              {shapes.map((s) => (
                <g key={s.id}>
                  <polygon
                    points={s.points}
                    fill={s.color}
                    fillOpacity={shapeYellowFillOpacity * 0.72}
                    style={{ mixBlendMode: "screen" }}
                  />
                  <polygon
                    points={s.points}
                    fill="none"
                    stroke="#FFCA16"
                    strokeWidth={1.5}
                    strokeOpacity={0.6 * (1 - morphT)}
                  />
                </g>
              ))}
            </svg>
          )}

          {/* ── TÍTULO "PROCESSO" NO TOPO/CENTRO (INSPIRADO NO "SHOWREEL" DO DKTON) ── */}
          <motion.div
            style={{
              y: titleY,
              opacity: titleOpacity,
              scale: titleScale,
              pointerEvents: morphT > 0.4 ? "none" : "auto",
            }}
            className="absolute top-[12%] sm:top-[15%] md:top-[16%] z-20 flex flex-col items-center justify-center text-center px-6"
          >
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#FFCA16] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFCA16] animate-pulse" />
              Metodologia Studio Kiiro
            </span>

            <h2 className="font-display font-[900] text-[clamp(54px,12.5vw,150px)] leading-[0.88] tracking-[-0.04em] uppercase text-[#FFCA16] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
              Processo
            </h2>

            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFCA16] text-black font-mono text-[10px] uppercase font-bold tracking-wider shadow-lg">
              <span>Etapa 01: Briefing & Imersão</span>
              <span className="animate-bounce">↓</span>
            </div>
          </motion.div>

          {/* ── OVERLAY EDITORIAL DO PROCESSO 01 QUANDO O VÍDEO FICA EM TELA CHEIA ─── */}
          <motion.div
            style={{
              opacity: step1OverlayOpacity,
              y: step1OverlayY,
              pointerEvents: morphT < 0.65 ? "none" : "auto",
            }}
            className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 md:p-14 pointer-events-none"
          >
            <div className="w-full flex justify-between items-center pointer-events-auto">
              <div className="flex items-center gap-2.5 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                <img src={kiiroLogoMark} alt="Studio Kiiro" className="w-4 h-4 object-contain" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FFCA16]">
                  PROCESSO // STUDIO KIIRO
                </span>
              </div>
              <div className="bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 font-mono text-xs text-white">
                <span className="text-[#FFCA16] font-bold">ETAPA 01</span> / 05
              </div>
            </div>

            <div className="max-w-2xl pointer-events-auto mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFCA16]/15 border border-[#FFCA16]/30 text-[#FFCA16] font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFCA16]" />
                {STEP_01.tag}
              </div>

              <h3 className="font-display font-[800] text-[clamp(32px,5.5vw,56px)] text-[#FFCA16] leading-[1.05] tracking-tight uppercase drop-shadow-md">
                01. {STEP_01.title}
              </h3>

              <p className="mt-2 text-base md:text-lg font-medium text-white/95 italic drop-shadow-sm">
                "{STEP_01.subtitle}"
              </p>

              <p className="mt-2 text-xs md:text-sm text-zinc-300 leading-relaxed max-w-xl">
                {STEP_01.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {STEP_01.deliverables.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-zinc-200"
                  >
                    <Check className="w-3.5 h-3.5 text-[#FFCA16]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full flex items-center justify-between pointer-events-auto pt-3 border-t border-white/10 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              <span className="text-[#FFCA16] flex items-center gap-2">
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                Continue rolando para os próximos processos
              </span>
              <span className="hidden sm:inline text-white/50">ETAPAS 02 A 05 ABAIXO</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SEÇÃO TELA PRETA COM ESTRUTURA DKTON (PROCESSOS 02 EM DIANTE)           */}
      {/*    Título bem grande em cima do vídeo, vídeos todos na direita e           */}
      {/*    informações limpas e diretas na esquerda (VISIT AUSTRIA / TGW WERX)     */}
      {/* ========================================================================= */}
      <section
        className="relative w-full bg-[#050505] text-white py-24 sm:py-36 px-6 sm:px-10 md:px-14 lg:px-20 overflow-hidden"
        aria-label="Processos Subsequentes Studio Kiiro"
      >
        <div className="max-w-7xl mx-auto space-y-36 sm:space-y-48">

          {STEPS_DKTON_STYLE.map((step, index) => (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => playPillHover(index + 1)}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
            >
              {/* ── COLUNA DA ESQUERDA: INFORMAÇÕES LIMPAS, DIRETAS, SEM ADEREÇOS ── */}
              <div className="lg:col-span-4 lg:pt-14 space-y-5">
                {step.metadataItems.map((field, fIdx) => (
                  <div key={fIdx} className="border-b border-white/10 pb-3">
                    {/* Badge do rótulo estilo Dkton */}
                    <span className="inline-block px-1.5 py-0.5 rounded-[2px] bg-[#FFCA16]/10 border border-[#FFCA16]/30 text-[#FFCA16] font-mono text-[10px] uppercase tracking-wider mb-1.5">
                      {field.label}
                    </span>
                    {/* Texto limpo e direto em caixa alta */}
                    <h5 className="font-sans text-sm sm:text-base font-bold text-white tracking-wide uppercase">
                      {field.value}
                    </h5>
                  </div>
                ))}

                {/* Descrição limpa e objetiva */}
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed pt-2">
                  {step.description}
                </p>
              </div>

              {/* ── COLUNA DA DIREITA: TÍTULO GIGANTE EM CIMA DO VÍDEO + VÍDEO ─────── */}
              <div className="lg:col-span-8 flex flex-col">
                {/* Título do processo destacado bem grande em cima do vídeo */}
                <h3 className="font-display font-[900] text-[clamp(36px,6vw,78px)] text-[#FFCA16] uppercase leading-[0.9] tracking-[-0.035em] mb-4 sm:mb-6">
                  {step.title}
                </h3>

                {/* Quadro de vídeo à direita ocupando o espaço da referência */}
                <div className="group relative w-full aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-black border-t-2 border-[#FFCA16] shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
                  {/* Vídeo HTML5 em loop contínuo */}
                  <video
                    src={step.videoUrl}
                    poster={step.fallbackImage}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Fallback de imagem local estática */}
                  <img
                    src={step.fallbackImage}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                  />

                  {/* Gradiente sutil nas extremidades */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                  {/* Botão amarelo no rodapé do vídeo exatamente como o PROJEKT ANSEHEN de Dkton */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFCA16] text-black font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-lg group-hover:scale-105 transition-transform cursor-pointer">
                      <span>{step.buttonLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}

        </div>
      </section>

    </div>
  );
}
