import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { playPillHover } from "@/utils/soundEffects";

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
  videoUrl: "/videos/fase1.mp4",
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
    videoUrl: "/videos/fase2.mp4",
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
    videoUrl: "/videos/fase3.mp4",
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

// Configuração exata das 7 formas geométricas unificadas no amarelo Kiiro (#FFCA16)
const KIIRO_YELLOW = "#FFCA16";

const MONOLITH_CONFIGS = [
  {
    id: 0,
    hLeftFrac: 0.22,
    hRightFrac: 0.28,
    color: KIIRO_YELLOW,
    idleDuration: 4.8,
    idleDelay: 0.0,
    idleAmp: 10,
    scrollStart: 0.08,
    scrollDuration: 0.65,
  },
  {
    id: 1,
    hLeftFrac: 0.46,
    hRightFrac: 0.50,
    color: KIIRO_YELLOW,
    idleDuration: 5.6,
    idleDelay: 0.6,
    idleAmp: 12,
    scrollStart: 0.02,
    scrollDuration: 0.64,
  },
  {
    id: 2,
    hLeftFrac: 0.35,
    hRightFrac: 0.42,
    color: KIIRO_YELLOW,
    idleDuration: 4.2,
    idleDelay: 1.1,
    idleAmp: 11,
    scrollStart: 0.05,
    scrollDuration: 0.66,
  },
  {
    id: 3,
    // Forma central
    hLeftFrac: 0.50,
    hRightFrac: 0.50,
    color: KIIRO_YELLOW,
    idleDuration: 5.2,
    idleDelay: 0.3,
    idleAmp: 14,
    scrollStart: 0.0,
    scrollDuration: 0.62,
  },
  {
    id: 4,
    hLeftFrac: 0.36,
    hRightFrac: 0.32,
    color: KIIRO_YELLOW,
    idleDuration: 4.5,
    idleDelay: 0.9,
    idleAmp: 12,
    scrollStart: 0.04,
    scrollDuration: 0.67,
  },
  {
    id: 5,
    hLeftFrac: 0.44,
    hRightFrac: 0.38,
    color: KIIRO_YELLOW,
    idleDuration: 5.0,
    idleDelay: 1.4,
    idleAmp: 12,
    scrollStart: 0.01,
    scrollDuration: 0.63,
  },
  {
    id: 6,
    hLeftFrac: 0.30,
    hRightFrac: 0.24,
    color: KIIRO_YELLOW,
    idleDuration: 4.6,
    idleDelay: 0.4,
    idleAmp: 10,
    scrollStart: 0.07,
    scrollDuration: 0.68,
  },
];

export default function KiiroMethodSection() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1440, height: 900 });

  // Rastreia o scroll da seção hero sticky
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // Atualiza dimensões da tela de forma estável
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

  // Progresso global de scroll [0 a 1]
  const [globalScrollP, setGlobalScrollP] = useState(0);

  useEffect(() => {
    const unsubscribe = heroScrollProgress.on("change", (p) => {
      setGlobalScrollP(p);
    });
    return () => unsubscribe();
  }, [heroScrollProgress]);

  // Transforma o título "PROCESSO": desaparece rapidamente logo no início do scroll (até 0.20)
  const titleY = useTransform(heroScrollProgress, [0, 0.20], ["0px", "-40px"]);
  const titleOpacity = useTransform(heroScrollProgress, [0, 0.20], [1, 0]);
  const titleScale = useTransform(heroScrollProgress, [0, 0.20], [1, 0.95]);

  // Revela o overlay editorial da Etapa 01 quando o vídeo atinge tela cheia
  const step1OverlayOpacity = useTransform(heroScrollProgress, [0.55, 0.72], [0, 1]);
  const step1OverlayY = useTransform(heroScrollProgress, [0.55, 0.72], ["25px", "0px"]);

  // Opacidade do vídeo no interior das formas
  const videoOpacity = useTransform(heroScrollProgress, [0, 0.72], [0.45, 1.0]);

  // Opacidade do preenchimento amarelo das formas
  const shapeYellowFillOpacity = Math.max(0, 0.85 * (1 - globalScrollP / 0.72));

  // Calcula os 7 polígonos: base fica 100% no rodapé (H), e apenas o topo sobe com o scroll
  const shapes = useMemo(() => {
    const W = dimensions.width;
    const H = dimensions.height;
    const isMobile = W < 768;

    const shapeCount = MONOLITH_CONFIGS.length;
    const marginX = isMobile ? 6 : 14;
    const totalW = W - marginX * 2;
    const baseGap = isMobile ? 6 : 10;

    const gapFactor = Math.max(0, 1 - Math.max(0, (globalScrollP - 0.5) / 0.22));
    const gap = baseGap * gapFactor;
    const shapeW = (totalW - (shapeCount - 1) * gap) / shapeCount;

    return MONOLITH_CONFIGS.map((cfg) => {
      const x1 = marginX + cfg.id * (shapeW + gap);
      const x2 = x1 + shapeW;

      // Subida individual no scroll (cada coluna com seu ritmo)
      const rawT = Math.min(
        Math.max((globalScrollP - cfg.scrollStart) / cfg.scrollDuration, 0),
        1
      );
      const easedT = rawT * rawT * (3 - 2 * rawT);

      // Posição inicial do topo (ancorada na parte inferior da tela)
      const initialTopLeft = H * (1 - cfg.hLeftFrac);
      const initialTopRight = H * (1 - cfg.hRightFrac);

      // Conforme easedT vai de 0 a 1, o topo sobe até 0 (topo da viewport)
      const yTopLeft = initialTopLeft * (1 - easedT);
      const yTopRight = initialTopRight * (1 - easedT);

      // A BASE PERMANECE FIXA NO RODAPÉ (NUNCA SOBE)
      const yBottom = H;

      return {
        id: cfg.id,
        points: `${x1},${yTopLeft} ${x2},${yTopRight} ${x2},${yBottom} ${x1},${yBottom}`,
        color: cfg.color,
        idleDuration: cfg.idleDuration,
        idleDelay: cfg.idleDelay,
        idleAmp: cfg.idleAmp,
      };
    });
  }, [dimensions, globalScrollP]);

  // Verifica se completou a subida para tela cheia
  const isFullyExpanded = globalScrollP >= 0.72;

  // Fallback para preferências de movimento reduzido
  if (reduceMotion) {
    return (
      <section id="processo" className="w-full bg-[#050505] text-white py-24 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold uppercase mt-2 text-[#FFCA16]">Processo</h2>
          </div>
          <div className="space-y-16">
            {[STEP_01, ...STEPS_DKTON_STYLE].map((step) => (
              <div key={step.id} className="grid md:grid-cols-2 gap-8 items-center border border-white/10 p-8 rounded-2xl bg-white/[0.02]">
                <div>
                  <span className="text-[#FFCA16] font-mono text-sm tracking-wider">{step.number} // {step.tag}</span>
                  <h3 className="text-3xl font-bold mt-2 text-[#FFCA16]">{step.title}</h3>
                  <p className="text-zinc-400 mt-4 leading-relaxed">{step.description}</p>
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
      {/* 1. SEÇÃO SHOWREEL HERO STICKY (PROCESSO 01 // IDÊNTICO À IMAGEM ENVIADA)  */}
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
              maskImage: isFullyExpanded ? "none" : "url(#kiiro-monoliths-mask)",
              WebkitMaskImage: isFullyExpanded ? "none" : "url(#kiiro-monoliths-mask)",
            }}
          >
            <video
              src={STEP_01.videoUrl}
              poster={STEP_01.fallbackImage}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
            {/* Fallback de imagem de alta fidelidade */}
            <img
              src={STEP_01.fallbackImage}
              alt={STEP_01.title}
              className="absolute inset-0 w-full h-full object-cover -z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 pointer-events-none" />
          </motion.div>

          {/* ── DEFINIÇÃO DA MÁSCARA SVG COM ANIMAÇÃO GPU (SEM RE-RENDERS) ──────── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            width={dimensions.width}
            height={dimensions.height}
            style={{ width: "100%", height: "100%" }}
          >
            <defs>
              <mask
                id="kiiro-monoliths-mask"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width={dimensions.width}
                height={dimensions.height}
              >
                <rect x="0" y="0" width={dimensions.width} height={dimensions.height} fill="black" />
                {shapes.map((s) => (
                  <motion.polygon
                    key={s.id}
                    points={s.points}
                    fill="white"
                    animate={
                      reduceMotion || globalScrollP > 0.25
                        ? { y: 0 }
                        : { y: [0, -s.idleAmp, 0] }
                    }
                    transition={{
                      duration: s.idleDuration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: s.idleDelay,
                    }}
                  />
                ))}
              </mask>
            </defs>
          </svg>

          {/* ── CAMADA DE CORES AMARELAS NAS FORMAS (ANIMAÇÃO GPU SINCRONIZADA) ─── */}
          {!isFullyExpanded && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              width={dimensions.width}
              height={dimensions.height}
            >
              {shapes.map((s) => (
                <motion.g
                  key={s.id}
                  animate={
                    reduceMotion || globalScrollP > 0.25
                      ? { y: 0 }
                      : { y: [0, -s.idleAmp, 0] }
                  }
                  transition={{
                    duration: s.idleDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: s.idleDelay,
                  }}
                >
                  <polygon
                    points={s.points}
                    fill={s.color}
                    fillOpacity={shapeYellowFillOpacity * 0.72}
                    style={{ mixBlendMode: "screen" }}
                  />
                </motion.g>
              ))}
            </svg>
          )}

          {/* ── TÍTULO "PROCESSO" VISÍVEL APENAS NA ABERTURA (POSICIONADO ACIMA DAS FORMAS) ─ */}
          {globalScrollP < 0.25 && (
            <motion.div
              style={{
                y: titleY,
                opacity: titleOpacity,
                scale: titleScale,
                pointerEvents: "none",
              }}
              className="absolute top-[13%] sm:top-[12%] md:top-[14%] inset-x-0 z-20 flex flex-col items-center justify-center text-center px-6"
            >
              <h2 className="font-display font-[900] text-[clamp(64px,14vw,170px)] leading-none tracking-[-0.04em] uppercase text-[#FFCA16] drop-shadow-[0_12px_45px_rgba(0,0,0,0.95)]">
                Processo
              </h2>
            </motion.div>
          )}

          {/* ── OVERLAY EDITORIAL DO PROCESSO 01 QUANDO O VÍDEO COMPLETA A TELA ──── */}
          <motion.div
            style={{
              opacity: step1OverlayOpacity,
              y: step1OverlayY,
              pointerEvents: globalScrollP < 0.55 ? "none" : "auto",
            }}
            className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 md:p-14 pointer-events-none"
          >
            {/* Caixa de Texto Estreita Justificada à Esquerda com Título e Descrição Branca */}
            <div className="max-w-md w-full pointer-events-auto mb-6 sm:mb-10 text-left">
              <h3 className="font-display font-[800] text-[clamp(28px,4.5vw,46px)] text-[#FFCA16] leading-[1.05] tracking-tight uppercase drop-shadow-md mb-3">
                01. {STEP_01.title}
              </h3>

              <p className="text-sm sm:text-base font-medium text-white italic drop-shadow-sm mb-3">
                "{STEP_01.subtitle}"
              </p>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed drop-shadow-sm">
                {STEP_01.description}
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SEÇÃO TELA PRETA COM ESTRUTURA DKTON (PROCESSOS 02 EM DIANTE)           */}
      {/* ========================================================================= */}
      <section
        className="relative w-full bg-[#050505] text-white py-24 sm:py-36 overflow-hidden"
        aria-label="Processos Subsequentes Studio Kiiro"
      >
        <div className="w-full pl-6 sm:pl-10 md:pl-14 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] pr-6 sm:pr-8 lg:pr-10 xl:pr-14 space-y-36 sm:space-y-48">

          {STEPS_DKTON_STYLE.map((step, index) => (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => playPillHover(index + 1)}
              className="grid grid-cols-1 lg:grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr] gap-10 lg:gap-14 items-start"
            >
              {/* ── COLUNA DA ESQUERDA: INFORMAÇÕES LIMPAS, DIRETAS, SEM ADEREÇOS ── */}
              <div className="w-full lg:pt-14 space-y-5">
                {step.metadataItems.map((field, fIdx) => (
                  <div key={fIdx} className="border-b border-white/10 pb-3">
                    <span className="inline-block px-1.5 py-0.5 rounded-[2px] bg-[#FFCA16]/10 border border-[#FFCA16]/30 text-[#FFCA16] font-mono text-[10px] uppercase tracking-wider mb-1.5">
                      {field.label}
                    </span>
                    <h5 className="font-sans text-sm sm:text-base font-bold text-white tracking-wide uppercase">
                      {field.value}
                    </h5>
                  </div>
                ))}

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed pt-2">
                  {step.description}
                </p>
              </div>

              {/* ── COLUNA DA DIREITA: TÍTULO GIGANTE EM CIMA DO VÍDEO + VÍDEO EXPANDIDO PROPORCIONAL À DIREITA ── */}
              <div className="w-full flex flex-col min-w-0">
                <h3 className="font-display font-[900] text-[clamp(36px,5.5vw,78px)] text-[#FFCA16] uppercase leading-[0.9] tracking-[-0.035em] mb-4 sm:mb-6">
                  {step.title}
                </h3>

                <div className="group relative w-full aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-black border-t-2 border-[#FFCA16] shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
                  <video
                    src={step.videoUrl}
                    poster={step.fallbackImage}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  <img
                    src={step.fallbackImage}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
                </div>
              </div>
            </motion.article>
          ))}

        </div>
      </section>

    </div>
  );
}
