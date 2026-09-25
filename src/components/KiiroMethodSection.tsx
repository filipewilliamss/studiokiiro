import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Check, ArrowDown, Sparkles, Layers, ArrowUpRight } from "lucide-react";
import { playPillHover } from "@/utils/soundEffects";
import kiiroLogoMark from "@/assets/kiiro-mark.svg";

// Imagens locais de alta fidelidade como fallback imediato para cada etapa
import step1Fallback from "@/assets/tabernaculo-pagina-2.webp";
import step2Fallback from "@/assets/akedah-pagina-2.webp";
import step3Fallback from "@/assets/construmar-pagina-2.webp";
import step4Fallback from "@/assets/teamluisa-pagina-2.webp";
import step5Fallback from "@/assets/templo-pagina-2.webp";

/**
 * 💡 DADOS DAS ETAPAS DA METODOLOGIA (PROCESSO)
 * Etapa 01: Apresentada através do Showreel com formas geométricas triangulares amarelas
 * Etapas 02 a 05: Apresentadas nos quadros de vídeo e textos intercalados no estilo editorial Dkton
 */
export interface ProcessStepData {
  id: string;
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  metadata: {
    fase: string;
    escopo: string;
    foco: string;
    metodologia: string;
  };
  deliverables: string[];
  videoUrl: string;
  fallbackImage: string;
  badgeLabel: string;
}

const STEP_01: ProcessStepData = {
  id: "briefing",
  number: "01",
  tag: "IMERSÃO & DIAGNÓSTICO",
  title: "Briefing e Imersão",
  subtitle: "Ouvir antes de desenhar. Compreender antes de projetar.",
  description:
    "Iniciamos com uma imersão profunda para dissecar o DNA da sua marca, desafios de negócio, público-alvo e visão de futuro. Aqui definimos a verdade que a marca precisa comunicar ao mundo com precisão cirúrgica.",
  metadata: {
    fase: "01 DE 05",
    escopo: "Diagnóstico de Posicionamento & DNA",
    foco: "Compreensão Holística do Negócio",
    metodologia: "Entrevista Estruturada & Mapeamento de Público",
  },
  deliverables: [
    "Diagnóstico de Posicionamento",
    "Mapeamento de DNA de Marca",
    "Definição de Personas e Tom de Voz",
    "Alinhamento de Metas e Escopo",
  ],
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-gold-and-black-lines-41315-large.mp4",
  fallbackImage: step1Fallback,
  badgeLabel: "SHOWREEL // ETAPA 01",
};

const STEPS_INTERCALATED: ProcessStepData[] = [
  {
    id: "pesquisa",
    number: "02",
    tag: "ANÁLISE & BENCHMARKING",
    title: "Pesquisa e Estratégia",
    subtitle: "Encontrar os espaços em branco que a concorrência ignora.",
    description:
      "Analisamos o mercado, concorrentes diretos e referências globais de vanguarda. Criamos o mapa de território visual e a estratégia única que garantirá diferenciação imediata, duradoura e relevante no mercado.",
    metadata: {
      fase: "02 DE 05",
      escopo: "Benchmarking Global & Análise Setorial",
      foco: "Mapeamento de Território Visual & Posicionamento",
      metodologia: "Imersão Semiótica & Painéis Moodboard",
    },
    deliverables: [
      "Benchmarking Competitivo Global",
      "Painel Semântico & Moodboard",
      "Definição dos Pilares Visuais",
      "Arquitetura Estratégica da Marca",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-above-in-a-dark-atmosphere-41484-large.mp4",
    fallbackImage: step2Fallback,
    badgeLabel: "ETAPA 02 // PESQUISA",
  },
  {
    id: "criacao",
    number: "03",
    tag: "DIREÇÃO DE ARTE & SISTEMA",
    title: "Criação e Design",
    subtitle: "Onde o conceito ganha corpo, forma e presença inconfundível.",
    description:
      "Traduzimos a estratégia em sistemas visuais potentes: tipografia proprietária, paleta de cores magnética, símbolo, iconografia e grids matemáticos. Não desenhamos apenas logos; construímos universos visuais completos.",
    metadata: {
      fase: "03 DE 05",
      escopo: "Direção de Arte, Símbolo & Sistema Gráfico",
      foco: "Identidade Visual Proprietária & Inconfundível",
      metodologia: "Grid Modular, Tipografia & Contraste Racional",
    },
    deliverables: [
      "Design do Símbolo e Logotipo",
      "Paleta Cromática com Racional de Contraste",
      "Tipografia e Hierarquia Editorial",
      "Linguagem Gráfica, Texturas e Padrões",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-liquid-gold-and-black-swirling-waves-41316-large.mp4",
    fallbackImage: step3Fallback,
    badgeLabel: "ETAPA 03 // DESIGN",
  },
  {
    id: "apresentacao",
    number: "04",
    tag: "EXPERIÊNCIA & REFINAMENTO",
    title: "Apresentação e Ajustes",
    subtitle: "Conectar você ao impacto real da nova marca no mundo.",
    description:
      "Apresentamos o projeto aplicado em pontos de contato reais — interfaces digitais, embalagens, papelaria, frotas e ambientes físicos. Coletamos feedbacks pontuais e refinamos cada detalhe com rigor cirúrgico até a aprovação plena.",
    metadata: {
      fase: "04 DE 05",
      escopo: "Simulações em Pontos de Contato Reais & 3D",
      foco: "Validação Cirúrgica de Escala e Legibilidade",
      metodologia: "Apresentação Estruturada & Rodada de Calibração",
    },
    deliverables: [
      "Apresentação Estruturada em Alta Fidelidade",
      "Simulações em Aplicações Reais e Mockups 3D",
      "Rodada de Refinamento e Calibração",
      "Aprovação e Validação do Conceito",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-black-and-gold-geometric-shapes-moving-41483-large.mp4",
    fallbackImage: step4Fallback,
    badgeLabel: "ETAPA 04 // REFINAMENTO",
  },
  {
    id: "entrega",
    number: "05",
    tag: "LANÇAMENTO & BRAND GUIDELINES",
    title: "Entrega Final",
    subtitle: "Autonomia completa e documentação para o seu crescimento.",
    description:
      "Exportamos todos os arquivos finais em todas as extensões necessárias para produção gráfica profissional e ambiente digital. Entregamos o Brand Guidelines completo com regras de aplicação para preservar o valor da marca no longo prazo.",
    metadata: {
      fase: "05 DE 05",
      escopo: "Brand Guidelines Completo & Pacote Vetorial",
      foco: "Autonomia Operacional & Consistência de Aplicação",
      metodologia: "Exportação Multiformato (.AI, .EPS, .SVG, .PDF, WebP)",
    },
    deliverables: [
      "Manual de Identidade Visual (Brand Guidelines)",
      "Arquivos Vetoriais (.AI, .EPS, .SVG, .PDF)",
      "Assets Digitais Otimizados (PNG, WebP, Favicons)",
      "Tipografias, Grid e Suporte Pós-Lançamento",
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-gold-particles-rising-in-the-dark-41317-large.mp4",
    fallbackImage: step5Fallback,
    badgeLabel: "ETAPA 05 // ENTREGA",
  },
];

// 7 tonalidades de amarelo correspondentes às formas geométricas da referência Dkton
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
      // Expande completamente no intervalo [0, 0.75]
      const t = Math.min(Math.max(p / 0.75, 0), 1);
      setMorphT(t);
    });
    return () => unsubscribe();
  }, [heroScrollProgress]);

  // Transforma o título "PROCESSO": sobe e esmaece conforme o scroll expande as formas
  const titleY = useTransform(heroScrollProgress, [0, 0.45], ["0px", "-50px"]);
  const titleOpacity = useTransform(heroScrollProgress, [0, 0.45], [1, 0]);
  const titleScale = useTransform(heroScrollProgress, [0, 0.45], [1, 0.92]);

  // Revela o badge/conteúdo da Etapa 01 quando o vídeo atinge tela cheia
  const step1OverlayOpacity = useTransform(heroScrollProgress, [0.65, 0.88], [0, 1]);
  const step1OverlayY = useTransform(heroScrollProgress, [0.65, 0.88], ["30px", "0px"]);

  // Opacidade do vídeo no interior das formas: 0.4 na prévia até 1.0 em tela cheia
  const videoOpacity = useTransform(heroScrollProgress, [0, 0.75], [0.4, 1.0]);

  // Opacidade do preenchimento amarelo das formas (diminui para revelar o vídeo límpido em tela cheia)
  const shapeYellowFillOpacity = 0.85 * (1 - morphT);

  // Calcula a geometria das 7 formas triangulares/geométricas do Studio Kiiro
  const shapes = useMemo(() => {
    const W = dimensions.width;
    const H = dimensions.height;
    const isMobile = W < 768;

    const shapeCount = 7;
    // Dimensões iniciais compactas (abaixo do título PROCESSO)
    const initialTotalW = Math.min(W * (isMobile ? 0.94 : 0.84), isMobile ? 420 : 1080);
    const initialHeight = Math.min(H * (isMobile ? 0.34 : 0.42), isMobile ? 220 : 320);
    const initialGap = isMobile ? 6 : 14;
    const initialYStart = (H - initialHeight) / 2 + (isMobile ? 60 : 85);
    const initialSlope = isMobile ? 14 : 28;

    // Interpolação conforme morphT (0 -> 1)
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

      // Cortes geométricos e triangulares alternados a 45° inspirados no símbolo Studio Kiiro
      const isAlt = i % 2 === 0;
      const isCenter = i === 3;

      let yTopLeft = startY;
      let yTopRight = startY;
      let yBottomLeft = startY + shapeH;
      let yBottomRight = startY + shapeH;

      if (isCenter) {
        // Forma central com ponta triangular superior mais pronunciada (chevron)
        yTopLeft = startY + slope * 0.5;
        yTopRight = startY + slope * 0.5;
        yBottomLeft = startY + shapeH;
        yBottomRight = startY + shapeH;
      } else if (isAlt) {
        // Corte chanfrado triangular direito
        yTopLeft = startY + slope;
        yTopRight = startY;
        yBottomLeft = startY + shapeH;
        yBottomRight = startY + shapeH - slope * 0.5;
      } else {
        // Corte chanfrado triangular esquerdo
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
            {[STEP_01, ...STEPS_INTERCALATED].map((step) => (
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
            {/* Gradiente de contraste editorial suave */}
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
          {/* Mostra as formas amarelas preenchidas com opacidade sutil sobre o vídeo */}
          {!isFullyExpanded && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              width={dimensions.width}
              height={dimensions.height}
            >
              {shapes.map((s) => (
                <g key={s.id}>
                  {/* Preenchimento em tons de amarelo que desvanece suavemente para revelar o vídeo */}
                  <polygon
                    points={s.points}
                    fill={s.color}
                    fillOpacity={shapeYellowFillOpacity * 0.72}
                    style={{ mixBlendMode: "screen" }}
                  />
                  {/* Linha de contorno dourada sutil */}
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

            {/* A palavra PROCESSO em amarelo imponente, idêntica ao SHOWREEL de Dkton */}
            <h2 className="font-display font-[900] text-[clamp(54px,12.5vw,150px)] leading-[0.88] tracking-[-0.04em] uppercase text-[#FFCA16] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
              Processo
            </h2>

            {/* Tag amarela inspirada na etiqueta "SHOWREEL ANSEHEN" de Dkton */}
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
            {/* Topo: Identificador de Marca e Etapa */}
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

            {/* Centro-Baixo: Informações da Etapa 01 */}
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

            {/* Rodapé: Indicador de continuação para os próximos processos */}
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
      {/* 2. SEÇÃO TELA PRETA COM QUADROS DE VÍDEO INTERCALADOS (FRAMES 139 A 165)  */}
      {/* ========================================================================= */}
      <section
        className="relative w-full bg-[#050505] text-white py-28 sm:py-36 px-6 sm:px-10 md:px-14 lg:px-20 overflow-hidden"
        aria-label="Etapas Subsequentes da Metodologia Studio Kiiro"
      >
        {/* Linha guia de fundo sutil */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="max-w-7xl mx-auto h-full border-x border-white/5" />
        </div>

        <div className="max-w-7xl mx-auto space-y-36 sm:space-y-48 relative z-10">

          {/* CABEÇALHO DE ENTRADA NA TELA PRETA (ESTILO PROJEKTE DO DKTON) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-white/10 pb-10"
          >
            <div className="flex items-center gap-2 text-[#FFCA16] font-mono text-[11px] uppercase tracking-[0.3em] mb-3">
              <Layers className="w-4 h-4" />
              <span>Metodologia em Ação // Fluxo Cirúrgico</span>
            </div>

            <h3 className="font-display font-[900] text-4xl sm:text-6xl lg:text-7xl uppercase tracking-[-0.03em] text-[#FFCA16]">
              Etapas do Processo
            </h3>

            <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
              Cada projeto no Studio Kiiro percorre um fluxo rigoroso de inteligência estratégica, direção de arte e entrega de alta fidelidade para garantir diferenciação inconfundível.
            </p>
          </motion.div>

          {/* LISTA INTERCALADA DOS PROCESSOS (ETAPAS 02 A 05) */}
          {STEPS_INTERCALATED.map((step, index) => {
            // Alternância exata solicitada pelo usuário:
            // Processo 02 (index 0): Texto na esquerda, Quadro de Vídeo na direita
            // Processo 03 (index 1): Quadro de Vídeo na esquerda, Texto na direita
            // Processo 04 (index 2): Texto na esquerda, Quadro de Vídeo na direita
            // Processo 05 (index 3): Quadro de Vídeo na esquerda, Texto na direita
            const isVideoLeft = index % 2 === 1;

            return (
              <motion.article
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => playPillHover(index + 1)}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* ── COLUNA 1: TEXTO (QUANDO O VÍDEO NÃO ESTÁ NA ESQUERDA) OU VÍDEO (QUANDO ESTÁ NA ESQUERDA) ── */}
                {isVideoLeft ? (
                  // VÍDEO NA ESQUERDA (ETAPAS 03 E 05)
                  <>
                    <div className="lg:col-span-6 order-2 lg:order-1">
                      <VideoCard step={step} />
                    </div>
                    <div className="lg:col-span-6 order-1 lg:order-2">
                      <TextContent step={step} />
                    </div>
                  </>
                ) : (
                  // TEXTO NA ESQUERDA, VÍDEO NA DIREITA (ETAPAS 02 E 04)
                  <>
                    <div className="lg:col-span-6 order-1">
                      <TextContent step={step} />
                    </div>
                    <div className="lg:col-span-6 order-2">
                      <VideoCard step={step} />
                    </div>
                  </>
                )}
              </motion.article>
            );
          })}

        </div>
      </section>

    </div>
  );
}

/**
 * 📝 COMPONENTE DE TEXTO EDITORIAL ESTILO DKTON
 */
function TextContent({ step }: { step: ProcessStepData }) {
  return (
    <div className="space-y-6">
      {/* Badge de Fase */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFCA16]/15 border border-[#FFCA16]/30 text-[#FFCA16] font-mono text-[10px] uppercase tracking-[0.2em]">
        <Sparkles className="w-3 h-3 text-[#FFCA16]" />
        <span>{step.tag}</span>
      </div>

      {/* Título Monumental Amarelo */}
      <h4 className="font-display font-[900] text-3xl sm:text-5xl lg:text-6xl text-[#FFCA16] uppercase leading-[0.95] tracking-tight">
        <span className="opacity-40 mr-3 font-mono">{step.number}.</span>
        {step.title}
      </h4>

      {/* Racional Conceitual */}
      <p className="text-base sm:text-lg font-medium text-white/95 italic">
        "{step.subtitle}"
      </p>

      {/* Tabela de Metadados Inspirada no Dkton (Produktion, Regie, etc. -> Fase, Escopo, Foco, Metodologia) */}
      <div className="border-t border-b border-white/10 py-4 my-6 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <span className="block text-[#FFCA16]/70 font-mono text-[10px] uppercase tracking-wider">
              Fase
            </span>
            <span className="font-mono text-xs sm:text-sm font-semibold text-white">
              {step.metadata.fase}
            </span>
          </div>

          <div>
            <span className="block text-[#FFCA16]/70 font-mono text-[10px] uppercase tracking-wider">
              Escopo
            </span>
            <span className="font-mono text-xs sm:text-sm font-semibold text-white">
              {step.metadata.escopo}
            </span>
          </div>

          <div>
            <span className="block text-[#FFCA16]/70 font-mono text-[10px] uppercase tracking-wider">
              Objetivo
            </span>
            <span className="font-mono text-xs sm:text-sm font-semibold text-white">
              {step.metadata.foco}
            </span>
          </div>

          <div>
            <span className="block text-[#FFCA16]/70 font-mono text-[10px] uppercase tracking-wider">
              Metodologia
            </span>
            <span className="font-mono text-xs sm:text-sm font-semibold text-white">
              {step.metadata.metodologia}
            </span>
          </div>
        </div>
      </div>

      {/* Descrição Detalhada */}
      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
        {step.description}
      </p>

      {/* Chips de Entregáveis */}
      <div className="pt-2 flex flex-wrap gap-2">
        {step.deliverables.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-zinc-200 hover:border-[#FFCA16]/40 transition-colors"
          >
            <Check className="w-3.5 h-3.5 text-[#FFCA16]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * 🎬 COMPONENTE DE QUADRO DE VÍDEO ESTILO DKTON COM MOLDURA DOURADA E BADGE
 */
function VideoCard({ step }: { step: ProcessStepData }) {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="group relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black/60 border border-[#FFCA16]/30 hover:border-[#FFCA16]/80 transition-all duration-500 shadow-2xl">
      {/* Vídeo HTML5 em loop */}
      <video
        src={step.videoUrl}
        poster={step.fallbackImage}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Imagem de fallback estática de contingência */}
      <img
        src={step.fallbackImage}
        alt={step.title}
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* Gradiente sutil para manter contraste */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

      {/* Selo no Topo do Quadro */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
        <span className="w-2 h-2 rounded-full bg-[#FFCA16] animate-pulse" />
        <span className="font-mono text-[10px] uppercase font-bold text-white tracking-widest">
          {step.badgeLabel}
        </span>
      </div>

      {/* Etiqueta Amarela de Ação no Rodapé (Exatamente como "PROJEKT ANSEHEN" no Dkton) */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFCA16] text-black font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg group-hover:scale-105 transition-transform">
          <span>Ver Processo</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
