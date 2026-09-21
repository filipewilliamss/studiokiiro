import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SubService {
  title: string;
  tagline?: string;
  description: string;
  deliverables: string[];
}

interface ServiceCategory {
  number: string;
  id: string;
  title: string;
  shortDesc: string;
  items: SubService[];
}

const servicesData: ServiceCategory[] = [
  {
    number: "01",
    id: "identidade-visual",
    title: "Identidade Visual & Branding",
    shortDesc: "Sistemas visuais completos para marcas que desejam autoridade, diferenciação e consistência.",
    items: [
      {
        title: "Identidade Visual Completa",
        tagline: "Para marcas e empresas que buscam reposicionamento ou lançamento de alto padrão",
        description:
          "Desenvolvimento integral do universo visual da marca. Mergulhamos no segmento, público e posicionamento estratégico para conceber uma identidade coerente, memorável e pronta para aplicação em qualquer mídia.",
        deliverables: [
          "Logotipo em variações (Horizontal, Vertical, Ícone)",
          "Arquivos vetoriais em alta (SVG, EPS, PDF, PNG transparente)",
          "Manual completo de identidade e diretrizes de uso",
          "Paleta cromática detalhada (CMYK, RGB, HEX, Pantone)",
          "Família tipográfica primária e secundária",
          "Padrões gráficos, texturas e assets auxiliares",
          "Mockups e aplicações práticas no mercado real"
        ]
      },
      {
        title: "Logotipo Essencial",
        tagline: "Objetividade e precisão para novos negócios e profissionais",
        description:
          "Criação focada de um logotipo profissional, inteligente e marcante, perfeitamente alinhado à essência da sua marca e ao seu público-alvo, sem burocracia.",
        deliverables: [
          "Símbolo e tipografia personalizada",
          "Exportação vetorial completa para impressão e digital",
          "Guia rápido de aplicação e paleta de cores primárias",
          "Favicon e versões para avatares de redes sociais"
        ]
      },
      {
        title: "Branding Estratégico",
        tagline: "Estratégia de marca, tom de voz e direção criativa",
        description:
          "Construção da alma e personalidade da marca. Conectamos proposta de valor, território de marca, posicionamento competitivo e tom de voz com o universo estético para criar marcas difíceis de ignorar.",
        deliverables: [
          "Plataforma de marca e manifesto",
          "Direção criativa e território visual",
          "Tom de voz e pilares de comunicação",
          "Arquitetura de marca e brand equity guidelines"
        ]
      },
      {
        title: "Personal Brand Kit",
        tagline: "Autoridade e valor para especialistas, consultores e executivos",
        description:
          "Construção e refinamento da sua marca pessoal. O kit ideal para médicos, advogados, consultores e criadores de conteúdo que querem transmitir credibilidade máxima e cobrar o que realmente valem.",
        deliverables: [
          "Identidade visual pessoal e monograma exclusivo",
          "Direção para ensaio fotográfico profissional",
          "Templates premium para LinkedIn e Instagram",
          "Assinatura de e-mail e papelaria executiva digital"
        ]
      }
    ]
  },
  {
    number: "02",
    id: "social-media",
    title: "Design para Redes Sociais",
    shortDesc: "Direção de arte e layouts estratégicos para presença digital marcante.",
    items: [
      {
        title: "Presença Digital & Social Media",
        tagline: "Fim dos posts genéricos. Design autoral com alta retenção e estética de ponta",
        description:
          "Desenvolvimento de peças visuais estratégicas que transformam o perfil da sua empresa em uma vitrine de alto valor. Posts em carrossel informativos, capas de reels, stories interativos e layouts de campanha focados em engajamento e percepção de marca.",
        deliverables: [
          "Templates exclusivos e autorais (não usamos modelos prontos)",
          "Carrosséis educativos e de alta retenção",
          "Design de capas para Reels e destaques",
          "Criativos para tráfego pago (Meta Ads / TikTok Ads)",
          "Diretrizes visuais para consistência do feed"
        ]
      }
    ]
  },
  {
    number: "03",
    id: "video",
    title: "Edição de Vídeo & Motion",
    shortDesc: "Narrativas dinâmicas que prendem a atenção e valorizam a sua história.",
    items: [
      {
        title: "Vídeos Curtos (Reels / Shorts / TikTok)",
        tagline: "Edição viciante com foco em retenção, sound design e ritmo",
        description:
          "Edição dinâmica para vídeos verticais com legendas animadas de alto padrão, cortes cirúrgicos, efeitos sonoros imersivos e elementos gráficos que mantêm o espectador até o final.",
        deliverables: [
          "Cortes dinâmicos sem momentos mortos",
          "Legendas animadas e destacadas estilizadas",
          "Sound design profissional com efeitos e mixagem",
          "B-rolls contextuais e motion graphics de apoio"
        ]
      },
      {
        title: "Vídeo Institucional & Manifesto",
        tagline: "Apresentação cinematográfica da sua empresa e cultura",
        description:
          "Produções que traduzem a grandeza, história e soluções da sua marca com estética sofisticada, trilha sonora emocionante e narrativa envolvente.",
        deliverables: [
          "Tratamento de cor cinematográfico (Color Grading)",
          "Montagem narrativa e ritmo institucional",
          "Trilha sonora licenciada e mixagem de áudio",
          "Aberturas e encerramentos em motion branding"
        ]
      },
      {
        title: "Vídeos Educativos & Tutoriais",
        tagline: "Clareza visual para cursos, webinars e treinamentos",
        description:
          "Edição focada em didática e retenção de aprendizado, integrando destaques na tela, infográficos em motion e transições suaves.",
        deliverables: [
          "Limpeza de ruído e tratamento de voz",
          "Destaques gráficos e zoom inteligente",
          "Vinhetas e divisórias de capítulos"
        ]
      }
    ]
  },
  {
    number: "04",
    id: "web",
    title: "Sites & Landing Pages",
    shortDesc: "Interfaces modernas, responsivas e pensadas para conversão e autoridade.",
    items: [
      {
        title: "Landing Pages & Sites Institucionais",
        tagline: "Design digital que impressiona no primeiro segundo e converte visitantes em clientes",
        description:
          "Criação de páginas institucionais e landing pages de alta conversão. Alinhamos a narrativa persuasiva com design exclusivo, tipografia precisa, microinterações elegantes e arquitetura mobile-first impecável.",
        deliverables: [
          "Estrutura focada em conversão e experiência do usuário (UX/UI)",
          "Design 100% responsivo para smartphone, tablet e desktop",
          "Integração com WhatsApp, formulários e analytics",
          "Velocidade otimizada e código limpo",
          "Diretrizes para SEO e carregamento veloz"
        ]
      }
    ]
  },
  {
    number: "05",
    id: "apresentacoes",
    title: "Apresentações & Materiais Comerciais",
    shortDesc: "Decks e apresentações que valorizam sua proposta e fecham negócios.",
    items: [
      {
        title: "Apresentações Corporativas & Pitch Decks",
        tagline: "O design certo para reuniões decisivas, propostas comerciais e eventos",
        description:
          "Transformamos ideias densas e números complexos em apresentações visuais claras, elegantes e persuasivas. Essencial para atrair investidores, apresentar soluções a grandes clientes ou palestrar com autoridade.",
        deliverables: [
          "Layout sob medida alinhado à identidade da marca",
          "Infográficos, tabelas e gráficos simplificados e atraentes",
          "Versões editáveis e arquivos prontos em PDF de alta qualidade",
          "Formatação pensada para projeção presencial ou envio digital"
        ]
      }
    ]
  }
];

const ServicesSection = () => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [selectedSubIdx, setSelectedSubIdx] = useState(0);

  const currentCategory = servicesData[selectedCategoryIdx];
  const currentItem = currentCategory.items[selectedSubIdx] || currentCategory.items[0];

  const handleSelectCategory = (idx: number) => {
    setSelectedCategoryIdx(idx);
    setSelectedSubIdx(0);
  };

  const createWhatsAppLink = (serviceName: string) => {
    const text = encodeURIComponent(
      `Olá! Tenho interesse no serviço de ${serviceName} do Studio Kiiro. Gostaria de entender prazos e como iniciar o projeto.`
    );
    return `https://wa.me/5511991076096?text=${text}`;
  };

  return (
    <section id="servicos" className="relative section-padding bg-[#070807] border-t border-white/[0.05] overflow-hidden">
      {/* Monumental backdrop word */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="absolute right-[-4%] top-[2%] md:top-[6%] font-display font-[800] text-white/[0.015] md:text-white/[0.025] leading-none tracking-extratight pointer-events-none select-none"
        style={{ fontSize: "clamp(100px, 18vw, 280px)" }}
      >
        services
      </motion.span>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#FFCA16]" />
                <span className="text-[#FFCA16] text-[11px] font-bold uppercase tracking-[0.4em]">
                  Soluções Especializadas
                </span>
              </div>
              <h2 className="font-display text-[42px] sm:text-[56px] md:text-[80px] font-[800] text-white leading-[0.88] tracking-[-0.04em]">
                Elevando o <span className="text-[#FFCA16] italic font-light">padrão visual</span> da sua marca.
              </h2>
              <p className="mt-6 text-white/55 text-base md:text-lg max-w-2xl font-light leading-relaxed">
                Cada serviço é executado com método proprietário, rigor técnico e acompanhamento em tempo real pelo nosso portal exclusivo.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {servicesData.map((category, idx) => {
            const isSelected = selectedCategoryIdx === idx;
            return (
              <button
                key={category.id}
                onClick={() => handleSelectCategory(idx)}
                className={`group relative flex items-center gap-3 px-5 py-3.5 rounded-full text-xs font-display font-bold uppercase tracking-[0.16em] whitespace-nowrap transition-all duration-300 border ${
                  isSelected
                    ? "bg-[#FFCA16] text-black border-[#FFCA16] shadow-[0_0_20px_rgba(255,202,22,0.3)]"
                    : "bg-white/[0.03] text-white/60 hover:text-white border-white/10 hover:border-white/20"
                }`}
              >
                <span className={`font-mono text-[10px] ${isSelected ? "text-black/70" : "text-[#FFCA16]"}`}>
                  {category.number}
                </span>
                <span>{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display Container */}
        <div className="rounded-3xl border border-white/10 bg-[#0d0e0d]/90 backdrop-blur-xl p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FFCA16]/[0.03] rounded-full blur-[120px] pointer-events-none" />

          {/* Sub-services Tabs if category has more than 1 item */}
          {currentCategory.items.length > 1 && (
            <div className="mb-10 pb-6 border-b border-white/[0.08] flex gap-3 overflow-x-auto">
              {currentCategory.items.map((sub, sIdx) => {
                const isSubActive = selectedSubIdx === sIdx;
                return (
                  <button
                    key={sIdx}
                    onClick={() => setSelectedSubIdx(sIdx)}
                    className={`px-4 py-2 rounded-lg text-xs font-display transition-all duration-300 whitespace-nowrap ${
                      isSubActive
                        ? "bg-white/10 text-[#FFCA16] font-bold border border-[#FFCA16]/30"
                        : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                    }`}
                  >
                    {sub.title}
                  </button>
                );
              })}
            </div>
          )}

          {/* Service Details Body */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategoryIdx}-${selectedSubIdx}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
            >
              {/* Left Column: Heading, Description & Action */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs text-[#FFCA16] tracking-widest uppercase">
                      {currentCategory.number} · {currentCategory.title}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-[800] text-white tracking-tight leading-[1.05] mb-4">
                    {currentItem.title}
                  </h3>

                  {currentItem.tagline && (
                    <p className="text-[#FFCA16]/90 text-sm sm:text-base font-medium mb-6">
                      {currentItem.tagline}
                    </p>
                  )}

                  <p className="text-white/65 text-base sm:text-[17px] leading-relaxed font-light mb-8 whitespace-pre-line">
                    {currentItem.description}
                  </p>
                </div>

                {/* Direct Action Link */}
                <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-4">
                  <a
                    href={createWhatsAppLink(currentItem.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FFCA16] text-black font-display font-bold text-xs uppercase tracking-[0.2em] shadow-[0_4px_20px_rgba(255,202,22,0.25)] hover:shadow-[0_4px_30px_rgba(255,202,22,0.45)] hover:scale-[1.02] transition-all duration-300"
                  >
                    <span>Solicitar Proposta</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                  <a
                    href="#processo"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("processo")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white/70 hover:text-white font-display text-xs uppercase tracking-[0.16em] transition-all duration-300"
                  >
                    <span>Ver Metodologia</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Deliverables Card */}
              <div className="lg:col-span-5 bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                  <span className="text-xs uppercase font-mono tracking-wider text-white/50">
                    O que está incluso
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#FFCA16] bg-[#FFCA16]/10 px-2.5 py-1 rounded">
                    Entregáveis
                  </span>
                </div>

                <ul className="space-y-3.5">
                  {currentItem.deliverables.map((deliverable, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#FFCA16]/15 border border-[#FFCA16]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-2.5 h-2.5 text-[#FFCA16]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/75 text-sm font-light leading-snug">
                        {deliverable}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/40 font-mono">
                  <span>Portal do Cliente</span>
                  <span className="text-[#FFCA16]/80 font-bold">Briefing & Arquivos 100% Online</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
