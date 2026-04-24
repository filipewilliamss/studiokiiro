import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectModal from "./ProjectModal";

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

const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activePreview = projects[activeIndex] ?? projects[0];

  return (
    <section
      id="portfolio"
      className="relative section-padding bg-[#070807] border-t border-white/[0.05] overflow-hidden"
    >
      {/* Subtle grid backdrop — coherent with hero */}
      <div className="absolute inset-0 grid-pattern opacity-[0.35] pointer-events-none" />

      {/* Soft radial highlight */}
      <div className="absolute left-1/2 top-[10%] -translate-x-1/2 w-[55%] aspect-square bg-[#FFCA16]/[0.025] rounded-full blur-[200px] pointer-events-none" />

      {/* Monumental backdrop word */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="absolute -left-8 top-[3%] font-display font-[800] text-white/[0.022] leading-none tracking-extratight pointer-events-none select-none"
        style={{ fontSize: "clamp(120px, 20vw, 280px)" }}
      >
        works
      </motion.span>

      <div className="container-editorial relative z-10">
        {/* ─────────────── HEADER EDITORIAL ─────────────── */}
        <div className="mb-24 md:mb-36 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="font-mono text-[11px] tracking-[0.4em] text-[#FFCA16]">
              04
            </span>
            <span className="w-10 h-[1px] bg-[#FFCA16]/60" />
            <span className="text-[#FFCA16] text-[11px] font-bold uppercase tracking-[0.4em]">
              Portfólio
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[44px] md:text-[72px] lg:text-[88px] font-[800] text-white leading-[0.9] tracking-[-0.045em] mb-10 text-balance"
          >
            Projetos que transformam <br className="hidden md:block" />
            marcas em{" "}
            <span className="text-[#FFCA16] italic font-light">presença</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/55 text-lg md:text-xl max-w-2xl leading-[1.7] font-light text-balance"
          >
            Uma seleção de identidades visuais criadas para gerar percepção,
            diferenciação e valor.
          </motion.p>
        </div>

        {/* ─────────────── SHOWCASE GRID ─────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-20 items-start">
          {/* ─── LISTA EDITORIAL ─── */}
          <div className="border-t border-white/[0.08] order-2 lg:order-1">
            {projects.map((project, i) => {
              const isActive = activeIndex === i;
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  onClick={() => setSelectedProject(project)}
                  tabIndex={0}
                  className="group relative block py-10 md:py-12 border-b border-white/[0.08] cursor-pointer outline-none focus-visible:bg-white/[0.015] transition-[transform,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-[6px]"
                >
                  {/* Active marker */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#FFCA16] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? "w-10 opacity-100" : "w-0 opacity-0"
                    }`}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-5 md:gap-10 items-start md:items-center">
                    {/* Index */}
                    <span
                      className={`font-mono text-[12px] tracking-[0.2em] transition-colors duration-500 ${
                        isActive ? "text-[#FFCA16]" : "text-white/35"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Content */}
                    <div className="max-w-[520px]">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                          {project.category}
                        </span>
                      </div>

                      <h3
                        className={`font-display text-[30px] md:text-[42px] leading-[1] tracking-[-0.035em] font-[700] mb-4 transition-colors duration-500 ${
                          isActive ? "text-[#FFCA16]" : "text-white"
                        }`}
                      >
                        {project.title}
                      </h3>

                      <p className="text-white/55 text-[14.5px] leading-[1.7] font-light mb-5 max-w-[480px]">
                        {project.intro}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] uppercase tracking-[0.18em] text-white/45 border border-white/10 px-2.5 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="md:self-center flex items-center gap-3 transition-colors duration-500 group-hover:text-[#FFCA16] text-white/70">
                      <span className="text-[11px] uppercase tracking-[0.28em] font-medium whitespace-nowrap">
                        Ver case
                      </span>
                      {/* Arrow swap animation */}
                      <span className="relative inline-block w-5 h-3 overflow-hidden">
                        <span
                          className="absolute inset-0 flex items-center transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-6"
                          aria-hidden
                        >
                          →
                        </span>
                        <span
                          className="absolute inset-0 flex items-center -translate-x-6 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0"
                          aria-hidden
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* ─── PREVIEW STICKY ─── */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-28 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Caption above */}
              <div className="flex items-center justify-between mb-4 text-[10px] uppercase tracking-[0.35em] text-white/35">
                <span>Preview · Live</span>
                <span className="font-mono">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}
                </span>
              </div>

              {/* Frame */}
              <div className="relative aspect-[4/5] overflow-hidden border border-white/[0.08] bg-[#0b0b0b]">
                {/* Corner brackets */}
                <span className="absolute top-3 left-3 w-3 h-3 border-l border-t border-[#FFCA16]/60 z-20" />
                <span className="absolute top-3 right-3 w-3 h-3 border-r border-t border-[#FFCA16]/60 z-20" />
                <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-[#FFCA16]/60 z-20" />
                <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-[#FFCA16]/60 z-20" />

                {/* Project number badge */}
                <div className="absolute top-5 right-5 z-20 text-[10px] uppercase tracking-[0.3em] font-mono text-[#FFCA16]/80">
                  N° {String(activePreview.id).padStart(3, "0")}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePreview.id}
                    initial={{ opacity: 0, scale: 1.04, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -12 }}
                    transition={{
                      duration: 0.85,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0 flex items-center justify-center p-14"
                    style={{ backgroundColor: activePreview.bgColor }}
                  >
                    <img
                      src={activePreview.logo}
                      alt={activePreview.title}
                      className="w-[72%] h-[72%] object-contain"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Subtle vignette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
              </div>

              {/* Caption below */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cap-${activePreview.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45 }}
                  className="flex items-center justify-between mt-5 text-[11px] uppercase tracking-[0.25em]"
                >
                  <span className="text-white/75 font-medium">
                    {activePreview.title}
                  </span>
                  <span className="text-white/35 font-mono">
                    {activePreview.category}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* CTA case */}
              <button
                onClick={() => setSelectedProject(activePreview)}
                className="mt-8 group flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] font-medium text-white/70 hover:text-[#FFCA16] transition-colors duration-500"
              >
                <span className="relative pb-1">
                  Abrir case completo
                  <span className="absolute left-0 bottom-0 h-[1px] w-full bg-current scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500" />
                </span>
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                  →
                </span>
              </button>
            </motion.div>
          </div>

          {/* ─── MOBILE PREVIEW (per project) ─── */}
          <div className="lg:hidden order-1 mb-4">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/[0.08] bg-[#0b0b0b]">
              <span className="absolute top-3 left-3 w-3 h-3 border-l border-t border-[#FFCA16]/60 z-20" />
              <span className="absolute top-3 right-3 w-3 h-3 border-r border-t border-[#FFCA16]/60 z-20" />
              <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-[#FFCA16]/60 z-20" />
              <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-[#FFCA16]/60 z-20" />
              <div
                className="absolute inset-0 flex items-center justify-center p-10"
                style={{ backgroundColor: projects[0].bgColor }}
              >
                <img
                  src={projects[0].logo}
                  alt={projects[0].title}
                  className="w-[70%] h-[70%] object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────── CTA FINAL ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-32 md:mt-48 pt-20 md:pt-28 border-t border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-10 items-end"
        >
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-[1px] bg-[#FFCA16]/60" />
              <span className="text-[#FFCA16] text-[11px] font-bold uppercase tracking-[0.4em]">
                Próximo case
              </span>
            </div>
            <h3 className="font-display text-[36px] md:text-[56px] lg:text-[64px] font-[800] text-white leading-[0.95] tracking-[-0.04em] mb-8 text-balance">
              Seu projeto pode ser o próximo{" "}
              <span className="text-[#FFCA16] italic font-light">
                case memorável
              </span>
              .
            </h3>
            <p className="text-white/55 text-lg max-w-xl leading-[1.7] font-light text-balance">
              Vamos construir uma presença visual que faça sua marca ser
              percebida com mais valor.
            </p>
          </div>

          <div className="lg:col-span-5 flex lg:justify-end">
            <a href="#contato" className="btn-premium">
              Começar um projeto
            </a>
          </div>
        </motion.div>
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
