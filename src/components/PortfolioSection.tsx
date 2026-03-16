import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ProjectModal from "./ProjectModal";
import { projects } from "@/data/projects";

export interface Project {
  id: number;
  title: string;
  category: string;
  bgColor: string;
  intro?: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
  logo: string;
  pages?: string[];
}

const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-20 sm:py-32 md:py-48 border-t border-border overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-24 md:mb-40"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px flex-1 max-w-[60px] bg-primary" />
            <p className="text-xs uppercase tracking-[0.4em] text-primary font-display font-medium">
              Portfólio
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-foreground leading-[0.9] tracking-tight"
            >
              Projetos<br />
              <span className="text-gradient-kiiro">Selecionados</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground max-w-xs text-sm leading-relaxed md:text-right md:pb-2"
            >
              Cada projeto é uma jornada — do conceito à identidade que marca.
            </motion.p>
          </div>
        </motion.div>

        {/* All projects — uniform 2-column grid */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <UniformCard
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
              isHovered={hoveredId === project.id}
              onHover={() => setHoveredId(project.id)}
              onLeave={() => setHoveredId(null)}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="mt-24 md:mt-36 text-center"
        >
          <p className="text-muted-foreground text-sm mb-3">Quer ver sua marca aqui?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/40 text-primary font-display text-sm uppercase tracking-[0.2em] font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-500 group"
          >
            Começar meu projeto
            <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
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

/* ─── Uniform Card with cursor-tracking ─── */
const UniformCard = ({
  project,
  index,
  total,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: {
  project: Project;
  index: number;
  total: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const baseLogoScale = project.id === 3 ? 1.5 : 1;
  const rotateX = isHovered ? (mousePos.y - 0.5) * -8 : 0;
  const rotateY = isHovered ? (mousePos.x - 0.5) * 8 : 0;
  

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.9,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onMouseMove={handleMouseMove}
      className="group cursor-pointer"
      style={{ perspective: 800 }}
    >
      <motion.div
        className="relative aspect-[16/9] rounded-2xl overflow-hidden"
        style={{ backgroundColor: project.bgColor }}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        {/* Background logo layer (stays still for depth) */}
        <motion.div
          style={{ y: imgY }}
          className="absolute inset-0 flex items-center justify-center p-6 md:p-10"
        >
          <motion.img
            src={project.logo}
            alt=""
            className="w-[85%] h-[85%] object-contain opacity-15 blur-[2px] select-none"
            animate={{
              scale: isHovered ? baseLogoScale * 0.95 : baseLogoScale,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 25 }}
          />
        </motion.div>

        {/* Foreground logo layer (follows cursor, feels detached) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-6 md:p-10 z-10"
        >
          <motion.img
            src={project.logo}
            alt={`Logo ${project.title}`}
            className="w-[85%] h-[85%] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
            animate={{
              scale: isHovered ? baseLogoScale * 1.18 : baseLogoScale,
              x: isHovered ? (mousePos.x - 0.5) * 30 : 0,
              y: isHovered ? (mousePos.y - 0.5) * 30 : 0,
              rotateX: isHovered ? (mousePos.y - 0.5) * -6 : 0,
              rotateY: isHovered ? (mousePos.x - 0.5) * 6 : 0,
            }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            style={{ perspective: 600 }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            backgroundColor: isHovered ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0)",
            backdropFilter: isHovered ? "blur(8px)" : "blur(0px)",
          }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
              scale: isHovered ? 1 : 0.9,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-3 px-7 py-3 rounded-full border border-primary/60 text-primary text-xs uppercase tracking-[0.15em] font-display font-semibold backdrop-blur-md">
              Explorar Case
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <div className="flex items-end justify-between">
            <div>
              <motion.p
                initial={false}
                animate={{ x: isHovered ? 6 : 0 }}
                transition={{ duration: 0.4 }}
                className="text-[10px] uppercase tracking-[0.3em] text-primary font-display mb-1.5"
              >
                {project.category}
              </motion.p>
              <motion.h3
                initial={false}
                animate={{ x: isHovered ? 6 : 0 }}
                transition={{ duration: 0.5 }}
                className="font-display text-xl md:text-2xl font-bold text-foreground"
              >
                {project.title}
              </motion.h3>
            </div>
            <motion.div
              initial={false}
              animate={{
                x: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0,
                rotate: isHovered ? 0 : -45,
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-9 h-9 rounded-full border border-primary/40 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute top-5 right-5">
          <span className="font-display text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-medium">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </motion.div>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground border border-border/60 rounded-full px-3 py-1.5 group-hover:border-primary/30 group-hover:text-primary/70 transition-all duration-500"
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default PortfolioSection;
