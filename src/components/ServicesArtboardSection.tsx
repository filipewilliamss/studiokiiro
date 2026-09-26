import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import {
  Layers,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { playSwitchClick } from "@/utils/soundEffects";

interface ServiceSubItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  deliverables: string[];
}

interface ServiceCategory {
  number: string;
  id: string;
  title: string;
  shortTitle: string;
  fileName: string;
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
    fileName: "identidadevisual.ai",
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
          "Arquivos Finais Vetoriais (.AI, .EPS, .SVG, .PDF, .PNG)",
        ],
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
          "Arquivos Prontos para Impressão e Meio Digital",
        ],
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
          "Brand Book Completo para Expansão da Marca",
        ],
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
          "Cartão de Visitas Digital Interativo",
        ],
      },
    ],
  },
  {
    number: "02",
    id: "social-media",
    title: "Design para Redes Sociais",
    shortTitle: "Redes Sociais",
    fileName: "redessociais.ai",
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
          "Organização de Grid e Coesão Visual Contínua",
        ],
      },
    ],
  },
  {
    number: "03",
    id: "video",
    title: "Edição de Vídeo",
    shortTitle: "Edição de Vídeo",
    fileName: "edicaodevideo.ai",
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
          "Exportação Otimizada para o Algoritmo do Instagram e TikTok",
        ],
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
          "Edição com Trilha Emocionante Licenciada para Uso Comercial",
        ],
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
          "Equalização de Voz com Remoção de Ruídos de Fundo",
        ],
      },
    ],
  },
  {
    number: "04",
    id: "web",
    title: "Sites e Landing Pages",
    shortTitle: "Sites & Landing Pages",
    fileName: "sites_landingpages.ai",
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
          "Preparação de Assets Otimizados para Desenvolvimento",
        ],
      },
    ],
  },
  {
    number: "05",
    id: "apresentacoes",
    title: "Apresentações",
    shortTitle: "Apresentações",
    fileName: "apresentacoes.ai",
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
          "Exportação em PDF Interativo e Arquivo Editável (.PPTX ou Keynote)",
        ],
      },
    ],
  },
];

/**
 * Componente individual de uma Prancheta do Illustrator com física de papel
 */
function ArtboardCard({
  category,
  index,
  scrollYProgress,
}: {
  category: ServiceCategory;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const [activeSubIndex, setActiveSubIndex] = useState(0);
  const activeSubItem = category.items[activeSubIndex] || category.items[0];

  /**
   * Cálculo das transformações para o efeito físico de "puxar a folha de trás e colocar na frente".
   * 
   * Timeline de 5 pranchetas em [0, 1]:
   * - index 0: já começa na frente. Recua para trás quando a prancheta 1 chega (0.12 -> 0.24).
   * - index 1: emerge de trás (0.10 -> 0.17 sobe, 0.17 -> 0.24 pousa na frente). Recua (0.34 -> 0.44).
   * - index 2: emerge de trás (0.30 -> 0.37 sobe, 0.37 -> 0.44 pousa na frente). Recua (0.54 -> 0.64).
   * - index 3: emerge de trás (0.50 -> 0.57 sobe, 0.57 -> 0.64 pousa na frente). Recua (0.74 -> 0.84).
   * - index 4: emerge de trás (0.70 -> 0.77 sobe, 0.77 -> 0.84 pousa na frente). Fica na frente até o fim.
   */

  // Intervalos de ativação específicos para cada prancheta
  let yTransform: MotionValue<number>;
  let scaleTransform: MotionValue<number>;
  let rotateTransform: MotionValue<number>;
  let opacityTransform: MotionValue<number>;
  let zIndexTransform: MotionValue<number>;
  let pointerEventsTransform: MotionValue<string>;

  if (index === 0) {
    yTransform = useTransform(scrollYProgress, [0, 0.12, 0.22, 1], [0, 0, 15, 15]);
    scaleTransform = useTransform(scrollYProgress, [0, 0.12, 0.22, 1], [1, 1, 0.94, 0.94]);
    rotateTransform = useTransform(scrollYProgress, [0, 0.12, 0.22, 1], [0, 0, -0.5, -0.5]);
    opacityTransform = useTransform(scrollYProgress, [0, 0.12, 0.20, 0.24, 1], [1, 1, 0.4, 0, 0]);
    zIndexTransform = useTransform(scrollYProgress, [0, 0.16, 0.22, 1], [15, 15, 2, 2]);
    pointerEventsTransform = useTransform(scrollYProgress, (p) => (p <= 0.18 ? "auto" : "none"));
  } else if (index === 1) {
    // Emerge de trás: sobe alto (-90px) com rotação física (-1.8deg) e pousa na frente (0px)
    yTransform = useTransform(
      scrollYProgress,
      [0, 0.08, 0.15, 0.22, 0.32, 0.42, 1],
      [24, 24, -90, 0, 0, 15, 15]
    );
    scaleTransform = useTransform(
      scrollYProgress,
      [0, 0.08, 0.15, 0.22, 0.32, 0.42, 1],
      [0.93, 0.93, 1.02, 1, 1, 0.94, 0.94]
    );
    rotateTransform = useTransform(
      scrollYProgress,
      [0, 0.08, 0.15, 0.22, 0.32, 0.42, 1],
      [0, 0, -1.8, 0, 0, 0.5, 0.5]
    );
    opacityTransform = useTransform(
      scrollYProgress,
      [0, 0.06, 0.10, 0.22, 0.32, 0.40, 0.44, 1],
      [0, 0, 0.9, 1, 1, 0.4, 0, 0]
    );
    zIndexTransform = useTransform(
      scrollYProgress,
      [0, 0.12, 0.13, 0.32, 0.42, 1],
      [2, 2, 25, 25, 3, 3]
    );
    pointerEventsTransform = useTransform(scrollYProgress, (p) =>
      p > 0.18 && p <= 0.38 ? "auto" : "none"
    );
  } else if (index === 2) {
    // Alterna rotação orgânica (+1.8deg)
    yTransform = useTransform(
      scrollYProgress,
      [0, 0.28, 0.35, 0.42, 0.52, 0.62, 1],
      [24, 24, -90, 0, 0, 15, 15]
    );
    scaleTransform = useTransform(
      scrollYProgress,
      [0, 0.28, 0.35, 0.42, 0.52, 0.62, 1],
      [0.93, 0.93, 1.02, 1, 1, 0.94, 0.94]
    );
    rotateTransform = useTransform(
      scrollYProgress,
      [0, 0.28, 0.35, 0.42, 0.52, 0.62, 1],
      [0, 0, 1.8, 0, 0, -0.5, -0.5]
    );
    opacityTransform = useTransform(
      scrollYProgress,
      [0, 0.26, 0.30, 0.42, 0.52, 0.60, 0.64, 1],
      [0, 0, 0.9, 1, 1, 0.4, 0, 0]
    );
    zIndexTransform = useTransform(
      scrollYProgress,
      [0, 0.32, 0.33, 0.52, 0.62, 1],
      [3, 3, 30, 30, 4, 4]
    );
    pointerEventsTransform = useTransform(scrollYProgress, (p) =>
      p > 0.38 && p <= 0.58 ? "auto" : "none"
    );
  } else if (index === 3) {
    // Emerge com rotação (-1.8deg)
    yTransform = useTransform(
      scrollYProgress,
      [0, 0.48, 0.55, 0.62, 0.72, 0.82, 1],
      [24, 24, -90, 0, 0, 15, 15]
    );
    scaleTransform = useTransform(
      scrollYProgress,
      [0, 0.48, 0.55, 0.62, 0.72, 0.82, 1],
      [0.93, 0.93, 1.02, 1, 1, 0.94, 0.94]
    );
    rotateTransform = useTransform(
      scrollYProgress,
      [0, 0.48, 0.55, 0.62, 0.72, 0.82, 1],
      [0, 0, -1.8, 0, 0, 0.5, 0.5]
    );
    opacityTransform = useTransform(
      scrollYProgress,
      [0, 0.46, 0.50, 0.62, 0.72, 0.80, 0.84, 1],
      [0, 0, 0.9, 1, 1, 0.4, 0, 0]
    );
    zIndexTransform = useTransform(
      scrollYProgress,
      [0, 0.52, 0.53, 0.72, 0.82, 1],
      [4, 4, 35, 35, 5, 5]
    );
    pointerEventsTransform = useTransform(scrollYProgress, (p) =>
      p > 0.58 && p <= 0.78 ? "auto" : "none"
    );
  } else {
    // index 4: Prancheta final (Apresentações)
    yTransform = useTransform(
      scrollYProgress,
      [0, 0.68, 0.75, 0.82, 1],
      [24, 24, -90, 0, 0]
    );
    scaleTransform = useTransform(
      scrollYProgress,
      [0, 0.68, 0.75, 0.82, 1],
      [0.93, 0.93, 1.02, 1, 1]
    );
    rotateTransform = useTransform(
      scrollYProgress,
      [0, 0.68, 0.75, 0.82, 1],
      [0, 0, 1.8, 0, 0]
    );
    opacityTransform = useTransform(
      scrollYProgress,
      [0, 0.66, 0.70, 0.82, 1],
      [0, 0, 0.9, 1, 1]
    );
    zIndexTransform = useTransform(
      scrollYProgress,
      [0, 0.72, 0.73, 1],
      [5, 5, 40, 40]
    );
    pointerEventsTransform = useTransform(scrollYProgress, (p) =>
      p > 0.78 ? "auto" : "none"
    );
  }

  return (
    <motion.div
      style={{
        y: yTransform,
        scale: scaleTransform,
        rotate: rotateTransform,
        opacity: opacityTransform,
        zIndex: zIndexTransform,
        pointerEvents: pointerEventsTransform as unknown as "auto" | "none",
      }}
      className="absolute inset-x-0 top-0 w-full"
    >
      <div className="relative">
        {/* Marcas de corte arquiteturais nos 4 cantos da prancheta */}
        <div className="absolute -top-2.5 -left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#FFCA16]/40 pointer-events-none hidden sm:block" />
        <div className="absolute -top-2.5 -right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#FFCA16]/40 pointer-events-none hidden sm:block" />
        <div className="absolute -bottom-2.5 -left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#FFCA16]/40 pointer-events-none hidden sm:block" />
        <div className="absolute -bottom-2.5 -right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#FFCA16]/40 pointer-events-none hidden sm:block" />

        {/* CONTAINER DA PRANCHETA (DESIGN CLEAN ILLUSTRATOR) */}
        <div className="relative rounded-2xl md:rounded-3xl bg-[#0e1110] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden">

          {/* BARRA SUPERIOR DA JANELA (CHROME DO ARQUIVO .AI) */}
          <div className="bg-[#131615] border-b border-white/[0.08] px-4 md:px-6 py-2.5 flex items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              {/* Semáforo macOS */}
              <div className="flex items-center gap-1.5 mr-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 inline-block" />
              </div>
              {/* Aba do Arquivo Específico (.ai) */}
              <div className="flex items-center gap-2 bg-white/[0.04] px-3 py-1 rounded-md text-white/90 border border-white/5">
                <Layers className="w-3.5 h-3.5 text-[#FFCA16]" />
                <span className="font-semibold tracking-wide text-[#FFCA16]">
                  {category.fileName}
                </span>
                <span className="text-[10px] text-white/40 hidden sm:inline">@ 100% (Preview)</span>
              </div>
            </div>

            {/* Informações da Prancheta */}
            <div className="flex items-center gap-3 text-[10px] text-white/40 font-mono">
              <span>
                PRANCHETA:{" "}
                <strong className="text-[#FFCA16]">
                  {category.number} / 05
                </strong>
              </span>
              <span className="hidden md:inline bg-black/40 px-2 py-0.5 rounded border border-white/5 text-white/50">
                1920 × 1080 PX
              </span>
            </div>
          </div>

          {/* SELEÇÃO DE MODALIDADES (quando o serviço possui variações internas) */}
          {category.items.length > 1 && (
            <div className="bg-[#101412] border-b border-white/[0.06] px-4 sm:px-8 py-2.5 flex flex-wrap items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mr-1">
                Modalidade:
              </span>
              {category.items.map((sub, sIdx) => {
                const isSubActive = sIdx === activeSubIndex;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      playSwitchClick(true);
                      setActiveSubIndex(sIdx);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-all duration-200 border flex items-center gap-2 cursor-pointer ${
                      isSubActive
                        ? "bg-[#FFCA16] text-black border-[#FFCA16] font-bold shadow-[0_2px_12px_rgba(255,202,22,0.3)]"
                        : "bg-white/[0.04] text-white/60 border-white/10 hover:border-white/30 hover:text-white hover:bg-white/[0.08]"
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
          )}

          {/* CONTEÚDO EDITORIAL DA PRANCHETA (TOTALMENTE DESPOLUÍDO) */}
          <div className="bg-[#141716] p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              
              {/* COLUNA ESQUERDA: TAG, TÍTULO, SUBTÍTULO E DESCRIÇÃO */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#FFCA16] font-semibold">
                    {category.tag}
                  </span>
                  <h3 className="font-display text-[26px] sm:text-[34px] md:text-[40px] font-[800] text-white leading-[1.08] tracking-tight mt-1">
                    {activeSubItem.title}
                  </h3>
                  {activeSubItem.subtitle && (
                    <p className="mt-1.5 text-[#FFCA16] text-xs sm:text-sm md:text-base font-light italic">
                      "{activeSubItem.subtitle}"
                    </p>
                  )}
                </div>

                <div className="text-white/75 text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed font-light whitespace-pre-line space-y-3 max-w-2xl">
                  {activeSubItem.description}
                </div>
              </div>

              {/* COLUNA DIREITA: ENTREGÁVEIS & ESCOPO */}
              <div className="lg:col-span-5 bg-[#0b0d0c] rounded-2xl p-5 sm:p-6 border border-white/10 relative overflow-hidden shadow-inner">
                <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FFCA16]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-white/90 font-bold">
                      Entregáveis & Escopo
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-white/40 uppercase">
                    {activeSubItem.deliverables.length} ITENS
                  </span>
                </div>

                <ul className="space-y-2.5 sm:space-y-3">
                  {activeSubItem.deliverables.map((item, dIdx) => (
                    <li
                      key={dIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-[13px] text-white/80 leading-snug"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFCA16] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesArtboardSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Indicador de prancheta ativa para o rodapé visual sutil
  const activeIndexTransform = useTransform(scrollYProgress, (p) => {
    if (p < 0.20) return 0;
    if (p < 0.42) return 1;
    if (p < 0.64) return 2;
    if (p < 0.84) return 3;
    return 4;
  });

  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Fallback para quem tem preferência de movimento reduzido
  if (reduceMotion) {
    return (
      <section
        id="servicos"
        className="w-full bg-[#080908] text-white py-20 px-4 sm:px-6 border-t border-white/[0.08]"
        aria-label="Soluções Estratégicas e Serviços Oferecidos"
      >
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="mb-10 text-center">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Elevando o <span className="text-[#FFCA16] italic font-light">padrão</span> visual da sua marca.
            </h2>
          </div>
          <div className="space-y-10">
            {SERVICES_DATA.map((cat) => (
              <div key={cat.id} className="rounded-2xl bg-[#0e1110] border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2 text-xs font-mono text-[#FFCA16]">
                  <span>{cat.fileName}</span>
                  <span>{cat.number} / 05</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                <p className="text-white/70 text-sm mb-4">{cat.items[0].description}</p>
                <ul className="space-y-2">
                  {cat.items[0].deliverables.map((d, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-white/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFCA16]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="servicos"
      ref={containerRef}
      className="relative w-full bg-[#080908] text-white"
      style={{ height: "460vh" }}
      aria-label="Soluções Estratégicas e Serviços Oferecidos"
    >
      {/* 1. FUNDO SUTIL E CLEAN */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255, 202, 22, 0.25) 1px, transparent 0),
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px, 120px 120px, 120px 120px",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_25%,rgba(255,202,22,0.05)_0%,transparent_60%)]"
        aria-hidden="true"
      />

      {/* 2. CONTAINER STICKY PINNED NA VIEWPORT (H-SCREEN) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-4 sm:py-6">
        <div className="relative z-10 w-full max-w-[95vw] xl:max-w-[92vw] 2xl:max-w-[1500px] mx-auto px-3 sm:px-6">

          {/* CABEÇALHO EDITORIAL COMPACTO DA SEÇÃO */}
          <div className="mb-4 sm:mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 items-end">
              <div className="lg:col-span-8">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#FFCA16] font-semibold block mb-1.5">
                  SOLUÇÕES ESTRATÉGICAS // 05 PRANCHETAS
                </span>
                <h2 className="font-display text-[28px] sm:text-[36px] md:text-[46px] font-[800] text-white leading-[0.95] tracking-[-0.035em]">
                  Elevando o{" "}
                  <span className="text-[#FFCA16] italic font-light">padrão</span>
                  {" "}visual da sua marca.
                </h2>
              </div>
              <div className="lg:col-span-4 hidden md:block">
                <p className="text-white/60 text-xs sm:text-[13px] leading-relaxed font-light font-display">
                  Fugimos de templates genéricos para criar sistemas proprietários, pensados sob medida para transformar negócios em referências memoráveis.
                </p>
              </div>
            </div>
          </div>

          {/* PILHA FÍSICA DAS 5 PRANCHETAS (SOMENTE UMA VISÍVEL POR VEZ) */}
          <div className="relative w-full min-h-[460px] sm:min-h-[480px] md:min-h-[500px]">
            {SERVICES_DATA.map((category, idx) => (
              <ArtboardCard
                key={category.id}
                category={category}
                index={idx}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* BARRA INFERIOR DE STATUS E PROGRESSO DAS PRANCHETAS */}
          <div className="mt-4 sm:mt-5 flex items-center justify-between text-xs font-mono text-white/40">
            {/* Indicador de rolagem suave inicial */}
            <motion.div
              style={{ opacity: scrollCueOpacity }}
              className="flex items-center gap-2 text-[10px] text-[#FFCA16]/80 font-mono tracking-wider uppercase"
            >
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              <span>Role para folhear as pranchetas</span>
            </motion.div>

            <div className="flex-1" />

            {/* Marcadores discretos das 5 pranchetas */}
            <div className="flex items-center gap-1.5">
              {SERVICES_DATA.map((cat, dIdx) => (
                <ActiveDot
                  key={cat.id}
                  dotIndex={dIdx}
                  activeIndexTransform={activeIndexTransform}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/**
 * Ponto indicador discreto com reatividade suave no scroll
 */
function ActiveDot({
  dotIndex,
  activeIndexTransform,
}: {
  dotIndex: number;
  activeIndexTransform: MotionValue<number>;
}) {
  const [isActive, setIsActive] = useState(dotIndex === 0);

  // Monitora a prancheta ativa sem re-renderizar o componente inteiro
  activeIndexTransform.on("change", (latest) => {
    setIsActive(latest === dotIndex);
  });

  return (
    <span
      className={`h-1.5 rounded-full transition-all duration-300 ${
        isActive
          ? "w-6 bg-[#FFCA16]"
          : "w-1.5 bg-white/20"
      }`}
      title={`Prancheta 0${dotIndex + 1}`}
    />
  );
}
