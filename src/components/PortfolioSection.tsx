import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const activeProject = projects[activeIndex];

  // Animation variants for the content swap
  const contentVariants = {
    initial: { opacity: 0, x: -20, filter: "blur(10px)" },
    animate: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
    exit: { 
      opacity: 0, 
      x: 20, 
      filter: "blur(10px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    }
  } as any;

  const visualVariants = {
    initial: { opacity: 0, scale: 1.1, rotateY: 10, filter: "blur(20px)" },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      filter: "blur(20px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  } as any;

  return (
    <section
      id="portfolio"
      className="relative min-h-screen bg-[#070807] border-t border-white/[0.05] overflow-hidden py-24 md:py-32"
    >
      {/* Subtle grid backdrop — coherent with hero */}
      <div className="absolute inset-0 grid-pattern opacity-[0.25] pointer-events-none" />

      {/* Soft radial highlight */}
      <div className="absolute left-1/2 top-[10%] -translate-x-1/2 w-[70%] aspect-square bg-[#FFCA16]/[0.02] rounded-full blur-[200px] pointer-events-none" />

      <div className="container-editorial relative z-10">
        {/* ─────────────── HEADER ─────────────── */}
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="font-mono text-[11px] tracking-[0.4em] text-[#FFCA16]">04</span>
            <span className="w-10 h-[1px] bg-[#FFCA16]/40" />
            <span className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold">Showcase</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-[40px] md:text-[64px] font-[800] text-white leading-none tracking-tight"
          >
            Projetos <span className="text-[#FFCA16] italic font-light">Selecionados</span>
          </motion.h2>
        </div>

        {isMobile ? (
          /* ─────────────── MOBILE LAYOUT (STACKED) ─────────────── */
          <div className="flex flex-col gap-24">
            {projects.map((project) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group"
              >
                <div 
                  className="aspect-[4/5] bg-[#0b0b0b] border border-white/5 flex items-center justify-center p-12 mb-8"
                  style={{ background: `radial-gradient(circle at center, ${project.bgColor}33 0%, #0b0b0b 100%)` }}
                >
                  <img src={project.logo} alt={project.title} className="w-full h-full object-contain filter drop-shadow-2xl" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#FFCA16] mb-3 block">{project.category}</span>
                <h3 className="font-display text-4xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-white/50 font-light leading-relaxed mb-6">{project.intro}</p>
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-4 border border-white/10 text-[11px] uppercase tracking-[0.3em] font-bold text-white hover:bg-white hover:text-black transition-all"
                >
                  Ver projeto completo
                </button>
              </motion.article>
            ))}
          </div>
        ) : (
          /* ─────────────── DESKTOP SHOWCASE (DYNAMIC SWAP) ─────────────── */
          <div className="relative grid grid-cols-12 gap-12 items-center min-h-[650px]">
            
            {/* LEFT: PROJECT CONTENT */}
            <div className="col-span-6 pr-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative"
                >
                  {/* Category with line */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[11px] font-mono tracking-[0.3em] text-[#FFCA16] uppercase">
                      {activeProject.category}
                    </span>
                    <div className="h-[1px] w-12 bg-[#FFCA16]/30" />
                  </div>

                  {/* Monumental Title */}
                  <h3 className="font-display text-[80px] lg:text-[100px] leading-[0.9] font-[800] text-white tracking-[-0.04em] mb-10 text-balance">
                    {activeProject.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-xl font-light leading-relaxed mb-12 max-w-[520px]">
                    {activeProject.intro}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-12">
                    {activeProject.tags.map((tag) => (
                      <span key={tag} className="px-4 py-2 border border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] text-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ x: 10 }}
                    onClick={() => setSelectedProject(activeProject)}
                    className="group flex items-center gap-6"
                  >
                    <span className="text-[12px] uppercase tracking-[0.4em] font-bold text-white group-hover:text-[#FFCA16] transition-colors">
                      Explorar Case Study
                    </span>
                    <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#FFCA16] group-hover:bg-[#FFCA16]/5 transition-all">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:text-[#FFCA16] transition-colors">
                        <path d="M4.16663 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT: VISUAL PREVIEW */}
            <div className="col-span-5 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  variants={visualVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="aspect-[4/5] relative rounded-sm overflow-hidden border border-white/5 shadow-2xl bg-[#080808]"
                >
                  {/* Technical background decoration */}
                  <div className="absolute inset-0 grid-pattern opacity-[0.1] pointer-events-none" />
                  <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, ${activeProject.bgColor}22 0%, transparent 70%)` }} />
                  
                  {/* Corner brackets */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/10" />
                  <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/10" />
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/10" />
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/10" />

                  {/* Logo Centerpiece */}
                  <div className="absolute inset-0 flex items-center justify-center p-24">
                    <motion.div
                      animate={{ 
                        y: [0, -12, 0],
                        rotateY: [0, 5, 0]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={activeProject.logo}
                        alt={activeProject.title}
                        className="max-w-full max-h-full object-contain filter drop-shadow-[0_32px_64px_rgba(0,0,0,0.6)]"
                      />
                    </motion.div>
                  </div>

                  {/* Ref Index Overlay */}
                  <div className="absolute bottom-10 right-10 flex flex-col items-end">
                    <span className="text-[9px] uppercase tracking-[0.5em] text-white/20 mb-1">REFERENCE</span>
                    <span className="font-mono text-[14px] text-[#FFCA16]">#{String(activeProject.id).padStart(4, '0')}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* FAR RIGHT: NAVIGATION INDICATORS */}
            <div className="col-span-1 flex flex-col items-center gap-8 border-l border-white/5 py-12 ml-auto">
              {projects.map((project, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={project.id}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => setActiveIndex(i)}
                    className="relative group flex items-center"
                  >
                    <div className="flex flex-col items-center">
                      <span className={`text-[11px] font-mono transition-colors duration-500 ${
                        isActive ? "text-[#FFCA16]" : "text-white/20 group-hover:text-white/50"
                      }`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <motion.div 
                        animate={{ 
                          height: isActive ? 40 : 12,
                          backgroundColor: isActive ? "#FFCA16" : "rgba(255,255,255,0.1)"
                        }}
                        className="w-[2px] my-2 transition-colors duration-500"
                      />
                    </div>
                    
                    {/* Hover Tooltip (Project Title) */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 20 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="absolute left-0 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-[#FFCA16] font-bold"
                        >
                          {project.title}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>

          </div>
        )}

        {/* ─────────────── CTA FINAL ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-40 pt-28 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="font-display text-[32px] md:text-[56px] font-[800] text-white leading-tight mb-6">
              Seu projeto pode ser o próximo <span className="text-[#FFCA16] italic font-light">case memorável</span>.
            </h3>
            <p className="text-white/50 text-lg font-light">
              Vamos construir uma presença visual que faça sua marca ser percebida com mais valor.
            </p>
          </div>
          <a href="#contato" className="btn-premium whitespace-nowrap">
            Começar um projeto
          </a>
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