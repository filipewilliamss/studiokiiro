import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectModal from "./ProjectModal";
import socialMedia1 from "@/assets/social-media-1.webp";
import carrosselMockup from "@/assets/carrossel-mockup.webp";
import destaquesMockup from "@/assets/destaques-mockup.webp";
import storyMockup from "@/assets/story-mockup.webp";

export interface Project {
  id: number;
  title: string;
  category: string;
  bgColor: string;
  intro: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
  logo: string;
  pages: string[];
}

const socialMediaItems = [
  {
    id: 1,
    title: "Feed Estratégico",
    description: "Posts que comunicam, engajam e convertem — com identidade visual consistente.",
    image: socialMedia1,
  },
  {
    id: 2,
    title: "Stories & Reels",
    description: "Conteúdos dinâmicos e criativos que aumentam o alcance e a conexão com o público.",
    image: storyMockup,
  },
  {
    id: 3,
    title: "Carrosséis Educativos",
    description: "Design informativo que entrega valor e posiciona a marca como autoridade.",
    image: carrosselMockup,
  },
  {
    id: 4,
    title: "Capas & Destaques",
    description: "Elementos visuais coesos que fortalecem a primeira impressão do perfil.",
    image: destaquesMockup,
  },
];

const PortfolioSection = () => {
  const [activeTab, setActiveTab] = useState<"Identidade Visual" | "Redes Sociais">("Identidade Visual");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const tabs = [
    { id: "Identidade Visual", label: "Identidade Visual" },
    { id: "Redes Sociais", label: "Redes Sociais" },
  ];

  const activePreview = projects[hoveredIndex] ?? projects[0];

  return (
    <section id="portfolio" className="relative section-padding bg-[#070807] border-t border-white/[0.05]">
      {/* Grainy radial highlight */}
      <div className="absolute left-[50%] top-[20%] -translate-x-1/2 w-[60%] aspect-square bg-[#FFCA16]/[0.02] rounded-full blur-[180px] pointer-events-none" />

      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20 md:mb-32">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="inline-block text-[#FFCA16] text-[11px] font-bold uppercase tracking-[0.4em] mb-8">
                Portfolio Showcase
              </span>
              <h2 className="font-display text-[48px] md:text-[80px] font-[800] text-white leading-[0.85] tracking-extratight mb-10">
                {activeTab === "Identidade Visual"
                  ? "Marcas que deixam um legado visual."
                  : "Presença digital estratégica."}
              </h2>
              <p className="text-white/50 text-lg md:text-xl max-w-3xl leading-relaxed font-light text-balance">
                {activeTab === "Identidade Visual"
                  ? "Trabalhos selecionados de identidade visual desenvolvidos para gerar percepção, diferenciação e valor de marca."
                  : "Criamos artes que traduzem a essência da sua marca nas redes sociais com design estratégico e visual autoral."}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Tabs - Refined */}
        <div className="flex flex-wrap gap-8 mb-20 md:mb-32 border-b border-white/5 pb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`group relative text-[11px] font-bold uppercase tracking-[0.3em] py-2 transition-all duration-300 ${
                activeTab === tab.id ? "text-[#FFCA16]" : "text-white/30 hover:text-white/60"
              }`}
            >
              {tab.label}
              <span className={`absolute bottom-0 left-0 h-[1px] bg-[#FFCA16] transition-all duration-500 ${
                activeTab === tab.id ? "w-full" : "w-0 group-hover:w-8"
              }`} />
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "Identidade Visual" ? (
            <motion.div
              key="idv-showcase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start"
            >
              {/* ─── LISTA EDITORIAL ─── */}
              <div className="border-t border-white/[0.08] order-2 lg:order-1">
                {projects.map((project, i) => {
                  const isActive = hoveredIndex === i;
                  return (
                    <motion.article
                      key={project.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onClick={() => setSelectedProject(project)}
                      className="group relative grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-4 md:gap-8 items-start py-8 md:py-10 border-b border-white/[0.08] cursor-pointer transition-transform duration-500 ease-out hover:translate-x-2"
                    >
                      {/* Active indicator line on left */}
                      <span
                        className={`absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#FFCA16] transition-all duration-500 ease-out ${
                          isActive ? "w-8 opacity-100" : "w-0 opacity-0"
                        }`}
                        aria-hidden
                      />

                      {/* Meta */}
                      <div className="flex md:flex-col gap-3 md:gap-2 items-baseline md:items-start">
                        <span className="font-display text-[13px] font-bold tracking-[0.12em] text-white/35">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                          {project.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="max-w-[520px]">
                        <h3
                          className={`font-display text-[28px] md:text-[36px] leading-[1] tracking-[-0.03em] font-semibold mb-3 transition-colors duration-500 ${
                            isActive ? "text-[#FFCA16]" : "text-white"
                          }`}
                        >
                          {project.title}
                        </h3>
                        <p className="text-white/55 text-[15px] leading-[1.7] font-light">
                          {project.intro}
                        </p>
                      </div>

                      {/* CTA */}
                      <div className="md:self-center flex items-center gap-3 text-white/80 group-hover:text-[#FFCA16] transition-colors duration-500">
                        <span className="text-[12px] uppercase tracking-[0.2em] font-medium whitespace-nowrap">
                          Ver projeto
                        </span>
                        <span
                          className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-2"
                          aria-hidden
                        >
                          →
                        </span>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              {/* ─── PREVIEW STICKY ─── */}
              <div className="order-1 lg:order-2 lg:sticky lg:top-32">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  {/* Caption acima */}
                  <div className="hidden lg:flex items-center justify-between mb-5 text-[10px] uppercase tracking-[0.3em] text-white/35">
                    <span>Preview</span>
                    <span className="font-mono">
                      {String(hoveredIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative aspect-[4/5] lg:aspect-[4/5] overflow-hidden border border-white/[0.08] bg-[#0b0b0b]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activePreview.id}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-center justify-center p-12"
                        style={{ backgroundColor: activePreview.bgColor }}
                      >
                        <img
                          src={activePreview.logo}
                          alt={activePreview.title}
                          className="w-[75%] h-[75%] object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Sutil overlay para textura editorial */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                  </div>

                  {/* Caption abaixo */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`cap-${activePreview.id}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4 }}
                      className="hidden lg:flex items-center justify-between mt-5 text-[11px] uppercase tracking-[0.2em]"
                    >
                      <span className="text-white/70 font-medium">{activePreview.title}</span>
                      <span className="text-white/35">{activePreview.category}</span>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sm-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {socialMediaItems.map((item, i) => (
                <motion.div
                  key={`sm-${item.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-[#FFCA16]/[0.02] mb-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-[#070807]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#FFCA16] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
