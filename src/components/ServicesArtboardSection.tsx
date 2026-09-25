import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  CheckCircle2,
  PenTool,
  LayoutGrid,
  Film,
  Globe,
  Presentation,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { playPillHover, playSwitchClick } from "@/utils/soundEffects";

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
        ]
      }
    ]
  }
];

const CATEGORY_ICONS = [
  PenTool,
  LayoutGrid,
  Film,
  Globe,
  Presentation,
];

export default function ServicesArtboardSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeSubIndex, setActiveSubIndex] = useState(0);

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

  const handlePrev = () => {
    playSwitchClick(true);
    const newIdx = activeCategoryIndex === 0 ? SERVICES_DATA.length - 1 : activeCategoryIndex - 1;
    setActiveCategoryIndex(newIdx);
    setActiveSubIndex(0);
  };

  const handleNext = () => {
    playSwitchClick(true);
    const newIdx = activeCategoryIndex === SERVICES_DATA.length - 1 ? 0 : activeCategoryIndex + 1;
    setActiveCategoryIndex(newIdx);
    setActiveSubIndex(0);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá Studio Kiiro! Gostaria de conversar sobre o serviço de ${activeSubItem.title}.`
  );
  const whatsappUrl = `https://wa.me/5511991076096?text=${whatsappMessage}`;

  return (
    <section
      id="servicos"
      className="relative w-full bg-[#080908] text-white overflow-hidden py-20 md:py-28 border-t border-white/[0.08]"
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
          backgroundSize: "40px 40px, 120px 120px, 120px 120px"
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_25%,rgba(255,202,22,0.05)_0%,transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[95vw] xl:max-w-[92vw] 2xl:max-w-[1600px] mx-auto px-3 sm:px-6">

        {/* CABEÇALHO EDITORIAL DA SEÇÃO */}
        <div className="mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FFCA16] animate-pulse" />
            <span className="text-[#FFCA16] text-[11px] font-mono font-bold uppercase tracking-[0.3em]">
              Soluções Estratégicas
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
            <div className="lg:col-span-8">
              <h2 className="font-display text-[38px] sm:text-[52px] md:text-[68px] lg:text-[78px] font-[800] text-white leading-[0.9] tracking-[-0.04em]">
                Elevando o{" "}
                <span className="text-[#FFCA16] italic font-light">padrão</span>
                <br />
                visual da sua marca.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-white/65 text-[15px] md:text-[16px] leading-relaxed font-light font-display">
                Fugimos de templates genéricos para criar sistemas proprietários, pensados sob medida para transformar negócios em referências memoráveis.
              </p>
            </div>
          </div>
        </div>

        {/* PRANCHETA DE DESIGN (CLEAN ILLUSTRATOR ARTBOARD) */}
        <div className="relative">

          {/* Marcas de corte arquiteturais e minimalistas nos 4 cantos da prancheta */}
          <div className="absolute -top-2.5 -left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#FFCA16]/40 pointer-events-none hidden sm:block" />
          <div className="absolute -top-2.5 -right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#FFCA16]/40 pointer-events-none hidden sm:block" />
          <div className="absolute -bottom-2.5 -left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#FFCA16]/40 pointer-events-none hidden sm:block" />
          <div className="absolute -bottom-2.5 -right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#FFCA16]/40 pointer-events-none hidden sm:block" />

          {/* CONTAINER DA PRANCHETA */}
          <div className="relative rounded-2xl md:rounded-3xl bg-[#0e1110] border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.7)] overflow-hidden">

            {/* BARRA SUPERIOR DA JANELA (CLEAN ARTBOARD CHROME) */}
            <div className="bg-[#131615] border-b border-white/[0.08] px-4 md:px-6 py-3 flex items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                {/* Semáforo macOS */}
                <div className="flex items-center gap-1.5 mr-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 inline-block" />
                </div>
                {/* Aba do Arquivo */}
                <div className="flex items-center gap-2 bg-white/[0.04] px-3 py-1 rounded-md text-white/90 border border-white/5">
                  <Layers className="w-3.5 h-3.5 text-[#FFCA16]" />
                  <span className="font-semibold tracking-wide">
                    studiokiiro_solucoes.ai
                  </span>
                  <span className="text-[10px] text-white/40 hidden sm:inline">@ 100% (Preview)</span>
                </div>
              </div>

              {/* Informações da Prancheta */}
              <div className="flex items-center gap-3 text-[10px] text-white/40">
                <span>
                  PRANCHETA:{" "}
                  <strong className="text-[#FFCA16]">
                    0{activeCategoryIndex + 1} / 05
                  </strong>
                </span>
                <span className="hidden md:inline bg-black/40 px-2 py-0.5 rounded border border-white/5 text-white/50">
                  1920 × 1080 PX
                </span>
              </div>
            </div>

            {/* SELETOR INTERATIVO DE SERVIÇOS (DOCK COM ALTA SUGESTIVIDADE) */}
            <div className="bg-[#111413] border-b border-white/[0.08]">
              {/* Sugestão de Interação */}
              <div className="px-4 sm:px-6 pt-4 pb-2.5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2 text-[#FFCA16]">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Selecione uma especialidade para ver o escopo:</span>
                </div>
                <div className="hidden md:flex items-center gap-2 text-white/40">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FFCA16]" />
                  <span>5 Especialidades</span>
                </div>
              </div>

              {/* 5 Botões de Serviços em Grid Dock */}
              <div className="p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {SERVICES_DATA.map((cat, idx) => {
                  const isSelected = idx === activeCategoryIndex;
                  const Icon = CATEGORY_ICONS[idx];
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(idx)}
                      onMouseEnter={() => playPillHover(idx)}
                      className={`group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 cursor-pointer overflow-hidden border ${
                        isSelected
                          ? "bg-[#FFCA16] text-black border-[#FFCA16] shadow-[0_6px_24px_rgba(255,202,22,0.3)] scale-[1.02] z-10"
                          : "bg-white/[0.03] text-white/70 border-white/10 hover:border-[#FFCA16]/60 hover:bg-white/[0.06] hover:text-white hover:-translate-y-0.5"
                      }`}
                    >
                      {/* Topo do Card: Número + Ícone */}
                      <div className="flex items-center justify-between w-full mb-3">
                        <span
                          className={`font-mono text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                            isSelected
                              ? "bg-black/15 text-black"
                              : "bg-white/10 text-white/60 group-hover:bg-[#FFCA16]/20 group-hover:text-[#FFCA16]"
                          }`}
                        >
                          {cat.number}
                        </span>
                        <Icon
                          className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                            isSelected ? "text-black" : "text-white/40 group-hover:text-[#FFCA16]"
                          }`}
                        />
                      </div>

                      {/* Nome do Serviço */}
                      <span className="font-display font-bold text-xs sm:text-sm leading-snug tracking-tight mb-2">
                        {cat.shortTitle}
                      </span>

                      {/* Micro-affordance de clique */}
                      <div className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider opacity-80 pt-1">
                        <span>{isSelected ? "Ativo" : "Ver Escopo"}</span>
                        <ArrowRight
                          className={`w-3 h-3 transition-transform duration-300 ${
                            isSelected ? "translate-x-0.5" : "group-hover:translate-x-1"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SELEÇÃO DE MODALIDADES (quando o serviço possui variações) */}
            {activeCategory.items.length > 1 && (
              <div className="bg-[#141816]/70 border-b border-white/[0.06] px-4 sm:px-8 py-3.5 flex flex-wrap items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mr-1">
                  Modalidade:
                </span>
                {activeCategory.items.map((sub, sIdx) => {
                  const isSubActive = sIdx === activeSubIndex;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => handleSubItemSelect(sIdx)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 border flex items-center gap-2 cursor-pointer ${
                        isSubActive
                          ? "bg-white text-black border-white font-bold shadow-[0_2px_12px_rgba(255,255,255,0.2)]"
                          : "bg-white/[0.04] text-white/60 border-white/10 hover:border-white/30 hover:text-white hover:bg-white/[0.08]"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSubActive ? "bg-[#FFCA16]" : "bg-white/30"
                        }`}
                      />
                      <span>{sub.title}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* CONTEÚDO EDITORIAL DO SERVIÇO SELECIONADO */}
            <div className="bg-[#141716] p-6 sm:p-10 lg:p-12 relative min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory.id}-${activeSubItem.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                >
                  {/* COLUNA ESQUERDA: TÍTULOS, DESCRIÇÃO E BOTÃO DE CONTATO */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#FFCA16] font-semibold">
                        {activeCategory.tag}
                      </span>
                      <h3 className="font-display text-[28px] sm:text-[36px] md:text-[42px] font-[800] text-white leading-[1.08] tracking-tight mt-1">
                        {activeSubItem.title}
                      </h3>
                      {activeSubItem.subtitle && (
                        <p className="mt-2 text-[#FFCA16] text-sm md:text-base font-light italic">
                          {activeSubItem.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="text-white/70 text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed font-light whitespace-pre-line space-y-4 max-w-3xl">
                      {activeSubItem.description}
                    </div>

                    {/* BOTÃO CTA DIRETO NO WHATSAPP */}
                    <div className="pt-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full overflow-hidden border border-white/20 text-white font-mono text-[11px] md:text-xs uppercase tracking-[0.22em] font-bold transition-all duration-300 hover:border-[#FFCA16] shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
                      >
                        <span
                          className="absolute inset-0 w-full h-full bg-[#FFCA16] rounded-full -translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none"
                          aria-hidden="true"
                        />
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-black flex items-center gap-2">
                          Solicitar Proposta Desse Serviço
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* COLUNA DIREITA: ENTREGÁVEIS & ESCOPO */}
                  <div className="lg:col-span-5 bg-[#0b0d0c] rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden shadow-inner">
                    <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
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

                    <ul className="space-y-3.5">
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
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* BARRA INFERIOR DE NAVEGAÇÃO E STATUS (PREV / NEXT + INDICADORES) */}
            <div className="bg-[#111413] border-t border-white/[0.08] px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
              {/* Botão Anterior */}
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/[0.06] border border-white/10 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-[#FFCA16]" />
                <span className="hidden sm:inline">Serviço Anterior</span>
                <span className="sm:hidden">Anterior</span>
              </button>

              {/* Indicadores de Paginação */}
              <div className="flex items-center gap-2">
                {SERVICES_DATA.map((_, dotIdx) => {
                  const isActive = dotIdx === activeCategoryIndex;
                  return (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => handleCategorySelect(dotIdx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive ? "w-7 bg-[#FFCA16]" : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                      title={`Ir para ${SERVICES_DATA[dotIdx].title}`}
                    />
                  );
                })}
              </div>

              {/* Botão Próximo */}
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/[0.06] border border-white/10 transition-all cursor-pointer"
              >
                <span className="hidden sm:inline">Próximo Serviço</span>
                <span className="sm:hidden">Próximo</span>
                <ChevronRight className="w-4 h-4 text-[#FFCA16]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
