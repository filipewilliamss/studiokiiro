import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Maximize2,
  MousePointer,
  Compass,
  Sliders,
  FileCode,
  Eye
} from "lucide-react";
import { playPillHover, playSwitchClick } from "@/utils/soundEffects";

interface ServiceSubItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  deliverables: string[];
  specs: { label: string; value: string }[];
}

interface ServiceCategory {
  number: string;
  id: string;
  title: string;
  shortTitle: string;
  tag: string;
  badge: string;
  items: ServiceSubItem[];
}

const SERVICES_DATA: ServiceCategory[] = [
  {
    number: "01",
    id: "identidade-visual",
    title: "Identidade Visual",
    shortTitle: "Identidade Visual",
    tag: "Branding & Sistemas de Marca",
    badge: "VECTOR · SYSTEM",
    items: [
      {
        id: "identidade-completa",
        title: "Identidade Visual",
        subtitle: "Sistema de marca completo, coerente e memorável",
        description: `Serviço indicado para empresas, marcas e profissionais que precisam de uma identidade visual completa e consistente.

Pode incluir criação de logotipo, paleta de cores, tipografia, elementos gráficos, padrões visuais e orientações de uso da marca.

Ideal para quem está começando uma marca ou quer reposicionar a comunicação visual do negócio com solidez e diferenciação real.`,
        deliverables: [
          "Logotipo Principal e Variações Responsivas",
          "Paleta Cromática (CMYK, RGB, Pantone e HEX)",
          "Hierarquia Tipográfica Editorial & Digital",
          "Padrões Visuais, Grafismos & Texturas Exclusivas",
          "Brand Guidelines Completo em PDF de Alta Definição",
          "Arquivos Finais Vetoriais (.AI, .EPS, .SVG, .PDF, .PNG)"
        ],
        specs: [
          { label: "Cor", value: "CMYK + RGB" },
          { label: "Escala", value: "100% Vetorial" },
          { label: "Grid", value: "Sistema Modular" },
          { label: "Manual", value: "PDF Interativo" }
        ]
      },
      {
        id: "logotipo-essencial",
        title: "Logotipo Essencial",
        subtitle: "Objetividade e presença marcante para novos negócios",
        description: `Serviço indicado para quem precisa de um logotipo profissional de forma mais objetiva.

Inclui criação de um logotipo alinhado ao segmento, público e personalidade da marca. É ideal para negócios em fase inicial ou para quem precisa organizar melhor sua apresentação visual.

Antes do orçamento final, é necessário entender o nome da marca, segmento, estilo desejado e prazo.`,
        deliverables: [
          "Símbolo e Assinatura Tipográfica Exclusiva",
          "Versões Horizontal, Vertical e Redução para Avatar",
          "Guia de Aplicação e Áreas de Não Interferência",
          "Arquivos Prontos para Impressão e Meio Digital"
        ],
        specs: [
          { label: "Formato", value: "AI, SVG, PNG" },
          { label: "Foco", value: "Legibilidade & Força" },
          { label: "Entrega", value: "Pacote Digital" }
        ]
      },
      {
        id: "branding-completo",
        title: "Branding Completo",
        subtitle: "Construção profunda de valor e narrativa de marca",
        description: `Serviço mais estratégico, indicado para marcas que precisam construir ou reposicionar sua imagem.

Pode incluir identidade visual, posicionamento, direção criativa, tom de comunicação, aplicações visuais e orientações para manter a marca consistente.

É indicado para empresas que querem uma marca mais forte, memorável e profissional.`,
        deliverables: [
          "Imersão Estratégica, Benchmark e Diagnóstico",
          "Posicionamento, Tom de Voz e Pilares Narrativos",
          "Sistema de Identidade Visual Integral",
          "Aplicações em Embalagens, Papelaria e Ponto de Contato",
          "Brand Book Completo para Expansão da Marca"
        ],
        specs: [
          { label: "Escopo", value: "Estratégia + Design" },
          { label: "Brand Book", value: "60+ Páginas" },
          { label: "Profundidade", value: "Ecossistema Total" }
        ]
      },
      {
        id: "personal-brand-kit",
        title: "Personal Brand Kit",
        subtitle: "Autoridade e elegância para profissionais e especialistas",
        description: `Serviço voltado para profissionais, especialistas, criadores de conteúdo, consultores e prestadores de serviço que querem fortalecer sua marca pessoal.

Pode incluir identidade visual pessoal, foto de perfil profissional, capas, templates para redes sociais, apresentação pessoal e materiais de apoio.

Ideal para quem quer transmitir mais autoridade, profissionalismo e confiança.`,
        deliverables: [
          "Monograma ou Assinatura Pessoal de Alto Padrão",
          "Tratamento Cromático e Estilo para Retratos",
          "Kit de Redes Sociais: Capas de YouTube, LinkedIn e Destaques",
          "Templates Editáveis para Apresentações e Posts",
          "Cartão de Visitas Digital Interativo"
        ],
        specs: [
          { label: "Público", value: "Consultores & Médicos" },
          { label: "Canais", value: "IG, LinkedIn, YouTube" },
          { label: "Objetivo", value: "Máxima Autoridade" }
        ]
      }
    ]
  },
  {
    number: "02",
    id: "social-media",
    title: "Design para Redes Sociais",
    shortTitle: "Redes Sociais",
    tag: "Presença Digital & Engajamento",
    badge: "DIGITAL · FEED",
    items: [
      {
        id: "social-media-unico",
        title: "Design para Redes Sociais",
        subtitle: "Consistência visual que gera retenção e autoridade no feed",
        description: `Artes estratégicas para construir presença digital consistente: posts, carrosséis, stories e materiais de campanha alinhados à identidade da sua marca.

Desenvolvemos layouts refinados que fogem dos modelos genéricos e transmitem instantaneamente o padrão de qualidade do seu negócio a cada publicação.`,
        deliverables: [
          "Carrosséis Narrativos com Alta Taxa de Salvamento",
          "Posts Estáticos com Tipografia Editorial e Fotografia Tratada",
          "Sistemas de Stories Estruturados e Interativos",
          "Artes de Lançamento e Campanhas Especiais",
          "Organização de Grid e Coesão Visual Contínua"
        ],
        specs: [
          { label: "Formatos", value: "4:5, 1:1, 9:16" },
          { label: "Padrão", value: "Ultra HD (Web-ready)" },
          { label: "Alinhamento", value: "Identidade da Marca" }
        ]
      }
    ]
  },
  {
    number: "03",
    id: "video",
    title: "Edição de Vídeo",
    shortTitle: "Edição de Vídeo",
    tag: "Motion & Audiovisual",
    badge: "MOTION · 4K",
    items: [
      {
        id: "reels-shorts",
        title: "Edição de Vídeo — Reels / Shorts",
        subtitle: "Ritmo dinâmico e retenção máxima para redes sociais",
        description: `Edição dinâmica e viciante para vídeos curtos, focada em retenção, legendas animadas e trilhas que convertem.

Aplicamos ganchos visuais nos primeiros 3 segundos, cortes precisos de respiração e sound design imersivo para prender a atenção do espectador até a última frase.`,
        deliverables: [
          "Cortes de Ritmo Focados em Retenção e Gancho Inicial",
          "Legendas Dinâmicas Sincronizadas Palavra a Palavra",
          "Sound Design, Efeitos Sonoros (SFX) e Trilha Sonora",
          "Gráficos na Tela, Ícones e Efeitos de Zoom Subtis",
          "Exportação Otimizada para o Algoritmo do Instagram e TikTok"
        ],
        specs: [
          { label: "Proporção", value: "9:16 Vertical" },
          { label: "Frame Rate", value: "60 FPS Suave" },
          { label: "Áudio", value: "Masterização -14 LUFS" }
        ]
      },
      {
        id: "video-institucional",
        title: "Vídeo Institucional",
        subtitle: "A história e a imponência da sua empresa em movimento",
        description: `Produção de vídeos que contam a história da sua empresa, apresentando produtos ou serviços de forma elegante e profissional.

Ideal para a página inicial do site, apresentações para grandes clientes, feiras ou fechar contratos de alto ticket com credibilidade inquestionável.`,
        deliverables: [
          "Roteirização Visual e Seleção dos Melhores Ângulos",
          "Tratamento Cinematográfico de Cores (Color Grading)",
          "Animação da Identidade Visual e Assinatura da Marca",
          "Edição com Trilha Emocionante Licenciada para Uso Comercial"
        ],
        specs: [
          { label: "Resolução", value: "4K UHD Cinema" },
          { label: "Tom", value: "Corporativo Premium" },
          { label: "Uso", value: "Home Page & Eventos" }
        ]
      },
      {
        id: "video-tutorial",
        title: "Vídeo Tutorial / Educativo",
        subtitle: "Clareza didática com apelo visual moderno",
        description: `Edição focada em clareza pedagógica, com elementos gráficos, destaques de tela e ritmo ideal para aprendizado.

Perfeito para plataformas de cursos, demonstrações de softwares (SaaS) ou treinamentos corporativos onde o conteúdo precisa ser compreendido com facilidade e prazer.`,
        deliverables: [
          "Efeitos de Zoom nas Ações Importantes da Tela",
          "Cards Explicativos, Setas e Destaques Gráficos Vetoriais",
          "Separação Estruturada por Capítulos e Módulos",
          "Equalização de Voz com Remoção de Ruídos de Fundo"
        ],
        specs: [
          { label: "Didática", value: "UI Overlay Precision" },
          { label: "Áudio", value: "Voz Cristalina" },
          { label: "Export", value: "Capítulos Prontos" }
        ]
      }
    ]
  },
  {
    number: "04",
    id: "web",
    title: "Sites e Landing Pages",
    shortTitle: "Sites & Landing Pages",
    tag: "Design de Interface & Conversão",
    badge: "UI/UX · WEB",
    items: [
      {
        id: "sites-landing-pages",
        title: "Sites e Landing Pages",
        subtitle: "Interfaces velozes, persuasivas e com acabamento de boutique",
        description: `Criação de interfaces para sites institucionais e landing pages focadas em clareza, navegação simples e conversão, alinhadas à identidade visual da marca.

Combinamos arquitetura de informação estratégica, tipografia expressiva e micro-interações refinadas para que sua página não apenas informe, mas transforme visitantes casuais em clientes qualificados.`,
        deliverables: [
          "Wireframe e Arquitetura de Informação Estratégica",
          "Design UI/UX Exclusivo no Figma (Desktop e Mobile)",
          "Diretrizes de Micro-interações, Hover States e Animações",
          "Hierarquia de Tipografia e Blocos de Alto Contraste",
          "Preparação de Assets Otimizados para Desenvolvimento"
        ],
        specs: [
          { label: "Abordagem", value: "Mobile-First" },
          { label: "Performance", value: "Clean Architecture" },
          { label: "Foco", value: "Alta Conversão" }
        ]
      }
    ]
  },
  {
    number: "05",
    id: "apresentacoes",
    title: "Apresentações",
    shortTitle: "Apresentações",
    tag: "Pitch Decks & Comercial",
    badge: "DECK · KEYNOTE",
    items: [
      {
        id: "apresentacoes-comerciais",
        title: "Apresentações",
        subtitle: "Decks e propostas visuais que fecham negócios",
        description: `Desenvolvimento de apresentações profissionais para reuniões, propostas comerciais, pitches e eventos, com foco em clareza e impacto visual.

Adeus aos slides entediantes com blocos de texto: criamos narrativas visuais com gráficos legíveis, comparações diretas e diagramação que mantém a atenção da diretoria e investidores do início ao fim.`,
        deliverables: [
          "Diagramação Editorial de Slides e Capas",
          "Infográficos, Tabelas e Gráficos de Dados Reorganizados",
          "Templates Mestres com Estilos Pré-formatados",
          "Exportação em PDF Interativo e Arquivo Editável (.PPTX ou Keynote)"
        ],
        specs: [
          { label: "Proporção", value: "16:9 Widescreen" },
          { label: "Compatibilidade", value: "PowerPoint & Keynote" },
          { label: "Impacto", value: "Investor-Ready" }
        ]
      }
    ]
  }
];

export default function ServicesArtboardSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeSubIndex, setActiveSubIndex] = useState(0);
  const [showGuides, setShowGuides] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const activeCategory = SERVICES_DATA[activeCategoryIndex];
  const activeSubItem = activeCategory.items[activeSubIndex] || activeCategory.items[0];

  const handleCategorySelect = (index: number) => {
    if (index === activeCategoryIndex) return;
    playPillHover(index);
    setActiveCategoryIndex(index);
    setActiveSubIndex(0);
  };

  const handleSubItemSelect = (subIndex: number) => {
    if (subIndex === activeSubIndex) return;
    playSwitchClick(true);
    setActiveSubIndex(subIndex);
  };

  const getWhatsAppMessage = () => {
    const text = `Olá Studio Kiiro! Estive olhando a seção de serviços no site e gostaria de solicitar uma proposta sobre "${activeSubItem.title}". Podemos conversar?`;
    return `https://wa.me/5511991076096?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="relative w-full bg-[#060706] text-white overflow-hidden py-24 md:py-36 border-t border-white/[0.08]"
      aria-label="Soluções Estratégicas e Serviços Oferecidos"
    >
      {/* ========================================================================= */}
      {/* 1. FUNDO DO WORKSPACE: GRID TÉCNICO VETORIAL (ILLUSTRATOR CANVAS)          */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255, 202, 22, 0.3) 1px, transparent 0),
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px, 160px 160px, 160px 160px"
        }}
        aria-hidden="true"
      />

      {/* Gradiente sutil de atmosfera */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(255,202,22,0.06)_0%,transparent_60%)]"
        aria-hidden="true"
      />

      {/* Marca d'água técnica em baixa opacidade */}
      <span
        aria-hidden="true"
        className="absolute right-[-2%] top-[6%] font-display font-[900] text-white/[0.018] leading-none tracking-[-0.08em] pointer-events-none select-none text-[clamp(90px,18vw,260px)]"
      >
        artboard
      </span>

      {/* ========================================================================= */}
      {/* 2. RÉGUA TÉCNICA DO TOPO (TOP RULER — ILLUSTRATOR STYLE)                  */}
      {/* ========================================================================= */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-[#0b0d0c] border-b border-white/[0.08] hidden lg:flex items-center px-6 text-[9px] font-mono text-white/30 select-none z-20">
        <div className="flex items-center gap-2 border-r border-white/10 pr-4 mr-4 text-[#00e5ff]">
          <Compass className="w-3 h-3" />
          <span className="tracking-widest uppercase">KIIRO · RULER</span>
        </div>
        <div className="flex-1 flex justify-between tracking-widest">
          {[0, 150, 300, 450, 600, 750, 900, 1050, 1200, 1350, 1500, 1650, 1800, 1920].map((px) => (
            <div key={px} className="flex items-center gap-1">
              <span className="h-2 w-[1px] bg-white/20" />
              <span>{px}</span>
            </div>
          ))}
          <span className="text-[#FFCA16] font-bold">PX</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. GUIAS DE EXTREMIDADE INFINITAS (CYAN GUIDE LINES)                      */}
      {/* ========================================================================= */}
      {showGuides && (
        <div className="pointer-events-none select-none" aria-hidden="true">
          {/* Guia vertical esquerda */}
          <div className="absolute top-0 bottom-0 left-[3%] sm:left-[5%] md:left-[8%] lg:left-[calc(50%-600px)] w-[1px] bg-[#00e5ff]/35 shadow-[0_0_8px_rgba(0,229,255,0.4)] z-10">
            <span className="absolute top-10 -left-1 transform -translate-x-full text-[8px] font-mono text-[#00e5ff]/70 tracking-widest whitespace-nowrap bg-black/80 px-1 border border-[#00e5ff]/30 rounded">
              X: 0.00
            </span>
          </div>

          {/* Guia vertical direita */}
          <div className="absolute top-0 bottom-0 right-[3%] sm:right-[5%] md:right-[8%] lg:right-[calc(50%-600px)] w-[1px] bg-[#00e5ff]/35 shadow-[0_0_8px_rgba(0,229,255,0.4)] z-10">
            <span className="absolute top-10 -right-1 transform translate-x-full text-[8px] font-mono text-[#00e5ff]/70 tracking-widest whitespace-nowrap bg-black/80 px-1 border border-[#00e5ff]/30 rounded">
              X: 1920.00
            </span>
          </div>

          {/* Guia horizontal de topo (trim/bleed) */}
          <div className="absolute left-0 right-0 top-[110px] md:top-[140px] h-[1px] bg-[#00e5ff]/30 shadow-[0_0_8px_rgba(0,229,255,0.3)] z-10">
            <span className="absolute left-6 -top-4 text-[8px] font-mono text-[#00e5ff]/70 tracking-widest bg-black/80 px-1.5 py-0.5 border border-[#00e5ff]/30 rounded">
              Y: 0.00 · BLEED: 3.00mm
            </span>
          </div>

          {/* Guia horizontal de base */}
          <div className="absolute left-0 right-0 bottom-12 md:bottom-16 h-[1px] bg-[#00e5ff]/30 shadow-[0_0_8px_rgba(0,229,255,0.3)] z-10">
            <span className="absolute right-6 -bottom-4 text-[8px] font-mono text-[#00e5ff]/70 tracking-widest bg-black/80 px-1.5 py-0.5 border border-[#00e5ff]/30 rounded">
              Y: 1080.00 · BASELINE
            </span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. CONTEÚDO PRINCIPAL: PALCO DA PRANCHETA (ARTBOARD STAGE)                */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* CABEÇALHO EDITORIAL DA SEÇÃO */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#FFCA16] animate-pulse" />
              <span className="text-[#FFCA16] text-[11px] font-mono font-bold uppercase tracking-[0.35em]">
                Soluções Estratégicas
              </span>
            </div>

            {/* Toggle de Guias do Illustrator */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  playSwitchClick(!showGuides);
                  setShowGuides(!showGuides);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider text-white/60 bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/10 transition-colors"
                title="Alternar visibilidade das guias vetoriais"
              >
                <Sliders className="w-3 h-3 text-[#00e5ff]" />
                <span>Guias: {showGuides ? "ON" : "OFF"}</span>
              </button>

              <span className="hidden sm:inline-block text-[10px] font-mono text-white/30 uppercase tracking-widest">
                CMYK / PREVIEW · 100%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h2 className="font-display text-[40px] sm:text-[56px] md:text-[76px] lg:text-[88px] font-[800] text-white leading-[0.85] tracking-[-0.05em]">
                Elevando o{" "}
                <span className="text-[#FFCA16] italic font-light">padrão</span>
                <br />
                visual da sua marca.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-white/65 text-[15px] md:text-[17px] leading-relaxed font-light font-display">
                Fugimos de templates genéricos para criar sistemas proprietários, pensados sob medida para transformar negócios em referências memoráveis.
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 5. A PRANCHETA PRINCIPAL DO ILLUSTRATOR (THE ARTBOARD FRAME)             */}
        {/* ======================================================================= */}
        <div className="relative mt-8 group">

          {/* Marcas de Registro Técnicas nos 4 cantos externos */}
          {showGuides && (
            <>
              {/* Canto Superior Esquerdo */}
              <div className="absolute -top-6 -left-6 z-20 pointer-events-none select-none text-[#00e5ff] font-mono text-sm leading-none flex items-center">
                <span>+</span>
                <span className="text-[7px] text-[#00e5ff]/60 ml-1 tracking-tighter hidden md:inline">REG.TL</span>
              </div>
              {/* Canto Superior Direito */}
              <div className="absolute -top-6 -right-6 z-20 pointer-events-none select-none text-[#00e5ff] font-mono text-sm leading-none flex items-center">
                <span className="text-[7px] text-[#00e5ff]/60 mr-1 tracking-tighter hidden md:inline">TRIM.TR</span>
                <span>+</span>
              </div>
              {/* Canto Inferior Esquerdo */}
              <div className="absolute -bottom-6 -left-6 z-20 pointer-events-none select-none text-[#00e5ff] font-mono text-sm leading-none flex items-center">
                <span>+</span>
                <span className="text-[7px] text-[#00e5ff]/60 ml-1 tracking-tighter hidden md:inline">C:100 M:0 Y:100 K:0</span>
              </div>
              {/* Canto Inferior Direito */}
              <div className="absolute -bottom-6 -right-6 z-20 pointer-events-none select-none text-[#00e5ff] font-mono text-sm leading-none flex items-center">
                <span className="text-[7px] text-[#00e5ff]/60 mr-1 tracking-tighter hidden md:inline">KIIRO.STUDIO</span>
                <span>+</span>
              </div>
            </>
          )}

          {/* O CONTAINER DA PRANCHETA (ELEVATED ARTBOARD CONTAINER) */}
          <div className="relative rounded-2xl md:rounded-3xl bg-[#0d0f0e] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden">

            {/* Pontos de Ancoragem Vetoriais (Bounding Box Handles) */}
            {showGuides && (
              <>
                <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-white border border-[#00e5ff] z-30 pointer-events-none" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-white border border-[#00e5ff] z-30 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-white border border-[#00e5ff] z-30 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-white border border-[#00e5ff] z-30 pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border border-[#00e5ff] z-30 pointer-events-none" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border border-[#00e5ff] z-30 pointer-events-none" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2.5 h-2.5 bg-white border border-[#00e5ff] z-30 pointer-events-none" />
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2.5 h-2.5 bg-white border border-[#00e5ff] z-30 pointer-events-none" />
              </>
            )}

            {/* BARRA SUPERIOR DO DOCUMENTO (ILLUSTRATOR TAB & ARTBOARD BAR) */}
            <div className="bg-[#121514] border-b border-white/[0.08] px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-3">
                {/* Semáforo Mac/Illustrator */}
                <div className="flex items-center gap-1.5 mr-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/70 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/70 inline-block" />
                </div>
                {/* Aba ativa */}
                <div className="flex items-center gap-2 bg-[#1a1d1c] px-3 py-1 rounded text-white/90 border border-white/5">
                  <Layers className="w-3.5 h-3.5 text-[#FFCA16]" />
                  <span className="font-semibold tracking-wide">
                    studiokiiro_solucoes.ai*
                  </span>
                  <span className="text-[10px] text-white/40">@ 100% (Preview)</span>
                </div>
              </div>

              {/* Informações da Prancheta Ativa */}
              <div className="flex items-center gap-4 text-[10px] text-white/40">
                <span className="hidden sm:inline">
                  PRANCHETA:{" "}
                  <strong className="text-[#FFCA16]">
                    {activeCategory.number} / 05
                  </strong>
                </span>
                <span className="hidden md:inline bg-black/40 px-2 py-0.5 rounded border border-white/5 text-[#00e5ff]">
                  DIMENSÕES: 1920 × 1080 PX
                </span>
                <span className="text-white/30 hidden lg:inline">CORES: CMYK 300DPI</span>
              </div>
            </div>

            {/* SELETOR PRIMÁRIO DOS 5 SERVIÇOS (TABS DA PRANCHETA) */}
            <div className="bg-[#0f1110] border-b border-white/[0.08] px-2 sm:px-6 pt-3 overflow-x-auto scrollbar-none flex items-center gap-2">
              {SERVICES_DATA.map((cat, idx) => {
                const isSelected = idx === activeCategoryIndex;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(idx)}
                    className={`relative flex items-center gap-2.5 px-4 md:px-5 py-3 rounded-t-xl font-display text-[12px] md:text-[13px] font-semibold whitespace-nowrap transition-all duration-200 border-t border-x ${
                      isSelected
                        ? "bg-[#161a18] text-white border-white/15 shadow-[0_-4px_12px_rgba(0,0,0,0.5)] z-10"
                        : "bg-transparent text-white/45 border-transparent hover:text-white/80 hover:bg-white/[0.02]"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isSelected
                          ? "bg-[#FFCA16] text-black font-bold"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      {cat.number}
                    </span>
                    <span>{cat.shortTitle}</span>

                    {/* Tag técnica sutil */}
                    <span
                      className={`hidden lg:inline text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                        isSelected ? "text-[#00e5ff] bg-[#00e5ff]/10" : "text-white/20"
                      }`}
                    >
                      {cat.badge}
                    </span>

                    {/* Barra indicadora inferior */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeCategoryBar"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FFCA16]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* CORPO DA PRANCHETA: SUB-TABS + CONTEÚDO EDITORIAL */}
            <div className="p-6 sm:p-10 lg:p-14 bg-[#141716] relative">

              {/* Linha guia de medição interna */}
              {showGuides && (
                <div className="absolute top-4 left-6 right-6 flex items-center justify-between text-[8px] font-mono text-[#00e5ff]/40 pointer-events-none select-none">
                  <span>┌ W_OFFSET: 0.00</span>
                  <span className="w-full mx-4 border-b border-dashed border-[#00e5ff]/20" />
                  <span>SAFETY_MARGIN: 40px ┐</span>
                </div>
              )}

              {/* SUB-PILLS PARA SERVIÇOS COM MÚLTIPLOS ITENS (Ex: Identidade Visual e Edição de Vídeo) */}
              {activeCategory.items.length > 1 && (
                <div className="mb-8 pt-2">
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3 flex items-center gap-2">
                    <Sliders className="w-3 h-3 text-[#FFCA16]" />
                    <span>Selecione a modalidade:</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {activeCategory.items.map((sub, sIdx) => {
                      const isSubActive = sIdx === activeSubIndex;
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => handleSubItemSelect(sIdx)}
                          className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 border flex items-center gap-2 ${
                            isSubActive
                              ? "bg-[#FFCA16] text-black border-[#FFCA16] font-semibold shadow-[0_4px_16px_rgba(255,202,22,0.25)]"
                              : "bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/[0.08] hover:text-white"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSubActive ? "bg-black" : "bg-white/30"
                            }`}
                          />
                          <span>{sub.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CONTEÚDO DINÂMICO DO SERVIÇO SELECIONADO */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory.id}-${activeSubItem.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
                >
                  {/* COLUNA ESQUERDA: TÍTULOS E DESCRIÇÃO ESTRATÉGICA */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-[#FFCA16] bg-[#FFCA16]/10 px-2.5 py-0.5 rounded border border-[#FFCA16]/20">
                        {activeCategory.number}.{activeSubIndex + 1}
                      </span>
                      <span className="text-white/40 text-xs font-mono uppercase tracking-widest">
                        {activeCategory.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-[28px] sm:text-[38px] md:text-[46px] font-[800] text-white leading-[1.05] tracking-tight">
                        {activeSubItem.title}
                      </h3>
                      {activeSubItem.subtitle && (
                        <p className="mt-2 text-[#FFCA16] text-sm md:text-base font-light italic">
                          {activeSubItem.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="text-white/70 text-[15px] md:text-[16.5px] leading-relaxed font-light whitespace-pre-line space-y-4">
                      {activeSubItem.description}
                    </div>

                    {/* CTA DIRETO: PROPOSTA COMERCIAL */}
                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <a
                        href={getWhatsAppMessage()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-[#FFCA16] hover:bg-[#ffe169] text-black font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-300 shadow-[0_8px_25px_rgba(255,202,22,0.25)] hover:shadow-[0_12px_30px_rgba(255,202,22,0.4)] hover:-translate-y-0.5"
                      >
                        <span>Solicitar proposta deste serviço</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      <a
                        href="#portfolio"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs font-mono uppercase tracking-wider px-4 py-3 rounded-full hover:bg-white/5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#00e5ff]" />
                        <span>Ver projetos relacionados</span>
                      </a>
                    </div>
                  </div>

                  {/* COLUNA DIREITA: ESPECIFICAÇÕES DA PRANCHETA & ENTREGÁVEIS */}
                  <div className="lg:col-span-5 bg-[#0b0d0c] rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
                    {/* Borda técnica luminosa */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFCA16]/5 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-[#00e5ff]" />
                        <span className="font-mono text-xs uppercase tracking-widest text-white/80 font-bold">
                          Entregáveis & Escopo
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-white/30 uppercase">
                        SPEC_SHEET_V2
                      </span>
                    </div>

                    {/* Lista de Entregáveis */}
                    <ul className="space-y-3.5 mb-8">
                      {activeSubItem.deliverables.map((item, dIdx) => (
                        <li
                          key={dIdx}
                          className="flex items-start gap-3 text-xs md:text-sm text-white/80 leading-snug"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#FFCA16] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags de Especificações Técnicas (Illustrator Metadata) */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">
                        Parâmetros Vetoriais
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {activeSubItem.specs.map((spec, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5 flex flex-col"
                          >
                            <span className="text-[9px] font-mono text-white/35 uppercase">
                              {spec.label}
                            </span>
                            <span className="text-xs font-mono font-bold text-[#00e5ff] mt-0.5">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* BARRA INFERIOR DE STATUS DA PRANCHETA (STATUS BAR) */}
            <div className="bg-[#0d0f0e] border-t border-white/[0.08] px-4 md:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-white/40">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                  SELEÇÃO ATIVA: {activeSubItem.title.toUpperCase()}
                </span>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:inline">CANVAS: LOCKED</span>
              </div>

              <div className="flex items-center gap-4">
                <span>ZOOM: 100%</span>
                <span>•</span>
                <span className="text-[#FFCA16]">STUDIO KIIRO © SÃO PAULO</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
