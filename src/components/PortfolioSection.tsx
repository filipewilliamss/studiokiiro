import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const PortfolioSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const activeProject = projects[activeIndex];

  const contentVariants = {
    initial: { opacity: 0, y: 30, filter: "blur(8px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(8px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  const visualVariants = {
    initial: { opacity: 0, scale: 1.08, filter: "blur(20px)" },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      filter: "blur(16px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  return (
    <section
      id="portfolio"
      className="relative min-h-screen bg-[#070807] border-t border-white/[0.05] overflow-hidden py-24 md:py-36"
    >
      <div className="absolute inset-0 grid-pattern opacity-[0.22] pointer-events-none" />
      <div className="absolute left-1/2 top-[8%] -translate-x-1/2 w-[70%] aspect-square bg-[#FFCA16]/[0.025] rounded-full blur-[200px] pointer-events-none" />

      <div className="container-editorial relative z-10">
        {/* HEADER */}
        <div className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
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
              className="font-display text-[44px] md:text-[72px] font-[800] text-white leading-[0.95] tracking-tight"
            >
              Projetos <span className="text-[#FFCA16] italic font-light">Selecionados</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-sm font-light max-w-xs leading-relaxed"
          >
            Cada case é uma jornada de marca — do conceito ao sistema visual definitivo.
          </motion.p>
        </div>

        {isMobile ? (
          /* MOBILE: stacked editorial blocks */
          <div className="flex flex-col gap-32">
            {projects.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[10px] text-[#FFCA16]">
                    N°{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="w-8 h-[1px] bg-[#FFCA16]/30" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">{project.category}</span>
                </div>
                <h3 className="font-display text-5xl font-[800] text-white tracking-tight leading-[0.95] mb-6">
                  {project.title}
                </h3>
                <div
                  className="aspect-[4/5] relative overflow-hidden border border-white/5 mb-8"
                  style={{ background: `radial-gradient(circle at center, ${project.bgColor}33 0%, #0b0b0b 100%)` }}
                >
                  <div className="absolute inset-0 grid-pattern opacity-[0.1]" />
                  <div className="absolute inset-0 flex items-center justify-center p-16">
                    <img src={project.logo} alt={project.title} className="max-w-full max-h-full object-contain filter drop-shadow-2xl" />
                  </div>
                </div>
                <p className="text-white/55 font-light leading-relaxed mb-8 text-base">{project.intro}</p>
                <Link
                  to={`/projeto/${project.slug}`}
                  className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.35em] font-bold text-white border-b border-white/20 pb-2"
                >
                  Ver case completo
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M4.16663 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          /* DESKTOP: dynamic showcase */
          <div className="relative grid grid-cols-12 gap-10 items-center min-h-[680px]">
            {/* LEFT NAV */}
            <div className="col-span-2 flex flex-col gap-2 border-r border-white/[0.06] pr-6 py-4">
              <span className="text-[9px] uppercase tracking-[0.35em] text-white/30 mb-6">Cases</span>
              {projects.map((project, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={project.id}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => setActiveIndex(i)}
                    className="group text-left py-4 border-b border-white/[0.05] last:border-b-0 transition-all duration-500"
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className={`font-mono text-[10px] transition-colors duration-500 ${
                          isActive ? "text-[#FFCA16]" : "text-white/25 group-hover:text-white/50"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <motion.span
                        animate={{ x: isActive ? 4 : 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className={`text-[13px] font-display font-semibold tracking-tight transition-colors duration-500 ${
                          isActive ? "text-[#FFCA16]" : "text-white/60 group-hover:text-white"
                        }`}
                      >
                        {project.title}
                      </motion.span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CONTENT */}
            <div className="col-span-5 pr-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[10px] font-mono tracking-[0.35em] text-[#FFCA16] uppercase">
                      {activeProject.category}
                    </span>
                    <div className="h-[1px] w-10 bg-[#FFCA16]/30" />
                    <span className="font-mono text-[10px] text-white/30">
                      {activeProject.year}
                    </span>
                  </div>

                  <h3 className="font-display text-[72px] xl:text-[96px] leading-[0.88] font-[800] text-white tracking-[-0.045em] mb-10 text-balance">
                    {activeProject.title}
                  </h3>

                  <p className="text-white/55 text-lg font-light leading-relaxed mb-10 max-w-[480px]">
                    {activeProject.intro}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-12">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 border border-white/[0.08] text-[10px] uppercase tracking-[0.2em] text-white/45"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/projeto/${activeProject.slug}`}
                    className="group inline-flex items-center gap-6"
                  >
                    <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-white group-hover:text-[#FFCA16] transition-colors duration-500">
                      Ver case completo
                    </span>
                    <div className="relative w-14 h-14 rounded-full border border-white/15 flex items-center justify-center overflow-hidden group-hover:border-[#FFCA16] transition-all duration-500">
                      <div className="absolute inset-0 bg-[#FFCA16] scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full" />
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="relative z-10 text-white group-hover:text-black transition-colors duration-500 group-hover:translate-x-1 transition-transform">
                        <path d="M4.16663 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* VISUAL */}
            <div className="col-span-5 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  variants={visualVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="aspect-[4/5] relative overflow-hidden border border-white/[0.08] bg-[#080808]"
                >
                  <div className="absolute inset-0 grid-pattern opacity-[0.1]" />
                  <div
                    className="absolute inset-0"
                    style={{ background: `radial-gradient(circle at center, ${activeProject.bgColor}30 0%, transparent 70%)` }}
                  />

                  {/* corner brackets */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/15" />
                  <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/15" />
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/15" />
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/15" />

                  <div className="absolute inset-0 flex items-center justify-center p-24">
                    <motion.div
                      animate={{ y: [0, -12, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={activeProject.logo}
                        alt={activeProject.title}
                        className="max-w-full max-h-full object-contain filter drop-shadow-[0_32px_64px_rgba(0,0,0,0.6)]"
                      />
                    </motion.div>
                  </div>

                  <div className="absolute top-8 left-8 flex flex-col">
                    <span className="text-[9px] uppercase tracking-[0.4em] text-white/30">Case</span>
                    <span className="font-mono text-[13px] text-[#FFCA16] mt-1">N°{String(activeProject.id).padStart(3, "0")}</span>
                  </div>
                  <div className="absolute bottom-8 right-8 text-right">
                    <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 block">Cliente</span>
                    <span className="font-mono text-[11px] text-white/60 mt-1 block">{activeProject.client}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* index counter below */}
              <div className="mt-6 flex items-center justify-between text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">
                <span>{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                <span>Studio Kiiro · {activeProject.year}</span>
              </div>
            </div>
          </div>
        )}

        {/* CTA FINAL */}
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
    </section>
  );
};

export default PortfolioSection;
