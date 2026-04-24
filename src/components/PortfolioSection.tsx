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
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-24 items-start">
          {/* ─── LISTA EDITORIAL ─── */}
          <div className="order-2 lg:order-1">
            {projects.map((project, i) => {
              const isActive = activeIndex === i;
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  onClick={() => setSelectedProject(project)}
                  tabIndex={0}
                  className="group relative block py-14 md:py-20 border-b border-white/[0.06] cursor-pointer outline-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-3"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
                    <div className="flex-1">
                      {/* Meta info */}
                      <div className="flex items-center gap-4 mb-6">
                        <span className={`font-mono text-[11px] tracking-[0.2em] transition-colors duration-500 ${
                          isActive ? "text-[#FFCA16]" : "text-white/20"
                        }`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className={`h-[1px] bg-white/10 transition-all duration-700 ${isActive ? "w-12 bg-[#FFCA16]/40" : "w-8"}`} />
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                          {project.category}
                        </span>
                      </div>

                      {/* Title with monumental presence */}
                      <h3
                        className={`font-display text-[38px] md:text-[56px] lg:text-[64px] leading-[0.95] tracking-[-0.04em] font-[700] mb-8 transition-colors duration-700 ${
                          isActive ? "text-[#FFCA16]" : "text-white"
                        }`}
                      >
                        {project.title}
                      </h3>

                      {/* Decription & Tags — only visible when active/hovered on large screens for cleaner editorial look, or always on mobile */}
                      <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive ? "max-h-[300px] opacity-100 mt-0" : "max-h-0 opacity-0 lg:max-h-0 lg:opacity-0"
                      }`}>
                        <p className="text-white/50 text-[16px] leading-[1.6] font-light mb-8 max-w-[480px]">
                          {project.intro}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1.5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CTA with refined interaction */}
                    <div className="flex items-center gap-4 group/cta">
                      <div className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${
                        isActive ? "border-[#FFCA16] bg-[#FFCA16]/5 scale-110" : "group-hover:border-white/30"
                      }`}>
                        <span className="relative w-6 h-6 overflow-hidden">
                          <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                            isActive ? "translate-x-8" : "group-hover:translate-x-8"
                          }`}>
                            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                          <span className={`absolute inset-0 flex items-center justify-center -translate-x-8 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                            isActive ? "translate-x-0" : "group-hover:translate-x-0"
                          }`}>
                            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FFCA16]">
                              <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* ─── PREVIEW STICKY (O palco principal) ─── */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-32 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Technical meta overlay */}
              <div className="absolute -top-12 left-0 w-full flex items-end justify-between px-2">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">Case File</span>
                  <span className="text-[11px] font-mono text-white/40">REF: {activePreview.id.toString().padStart(4, '0')}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">Selection</span>
                  <span className="text-[11px] font-mono text-white/40">{(activeIndex + 1).toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')}</span>
                </div>
              </div>

              {/* The "Stage" — Large and impactul */}
              <div className="relative aspect-[4/5] overflow-hidden border border-white/[0.05] bg-[#080808] shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                {/* Abstract graphic accents */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePreview.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0 flex items-center justify-center p-20"
                    style={{ 
                      background: `radial-gradient(circle at center, ${activePreview.bgColor}22 0%, #080808 100%)`
                    }}
                  >
                    {/* Floating Logo - Shadow creates depth */}
                    <div className="relative w-[75%] h-[75%] flex items-center justify-center">
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="relative z-10 w-full h-full flex items-center justify-center"
                      >
                        <img
                          src={activePreview.logo}
                          alt={activePreview.title}
                          className="max-w-full max-h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                        />
                      </motion.div>
                      
                      {/* Abstract depth ring */}
                      <div className="absolute inset-0 rounded-full border border-white/5 scale-150 opacity-20" />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Film grain texture specific to preview for premium feel */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                
                {/* Interactive cursor follow hint or small corner info */}
                <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                  <div className="h-[1px] flex-1 bg-white/10" />
                  <span className="px-6 text-[9px] uppercase tracking-[0.5em] text-[#FFCA16]/60 font-medium">Verified Case</span>
                  <div className="h-[1px] flex-1 bg-white/10" />
                </div>
              </div>

              {/* Bottom detail for context */}
              <div className="mt-8 flex items-start justify-between">
                <div>
                  <h4 className="text-white text-[13px] font-bold tracking-[0.1em] uppercase mb-1">{activePreview.title}</h4>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em]">{activePreview.category}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(activePreview)}
                  className="px-6 py-2.5 bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] font-bold text-white hover:bg-[#FFCA16] hover:text-black hover:border-[#FFCA16] transition-all duration-500"
                >
                  Explore Details
                </button>
              </div>
            </motion.div>
          </div>

          {/* ─── MOBILE PREVIEW ─── */}
          <div className="lg:hidden order-1 mb-8">
            <div className="relative aspect-[16/10] overflow-hidden border border-white/5 bg-[#0b0b0b]">
              <div
                className="absolute inset-0 flex items-center justify-center p-12"
                style={{ backgroundColor: projects[0].bgColor }}
              >
                <img
                  src={projects[0].logo}
                  alt={projects[0].title}
                  className="w-[60%] h-[60%] object-contain"
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
