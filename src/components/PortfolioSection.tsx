import { useState, useRef } from "react";
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
      className="relative py-32 md:py-48 border-t border-border overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header with parallax */}
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
              Histórias que<br />
              <span className="text-gradient-kiiro">transformam</span> marcas
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground max-w-xs text-sm leading-relaxed md:text-right md:pb-2"
            >
              Cada projeto é uma jornada — do conceito cru à identidade que marca.
            </motion.p>
          </div>
        </motion.div>

        {/* All projects — uniform grid */}
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

        {/* Bottom storytelling CTA */}
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
            <svg
              className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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

/* ─── Uniform Card ─── */
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [25, -25]);

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
      className="group cursor-pointer"
    >
      <div
        className="relative aspect-[16/9] rounded-2xl overflow-hidden"
        style={{ backgroundColor: project.bgColor }}
      >
        <motion.div
          style={{ y: imgY }}
          className="absolute inset-0 flex items-center justify-center p-14 md:p-20"
        >
          <motion.img
            src={project.logo}
            alt={`Logo ${project.title}`}
            className="max-w-[55%] max-h-[60%] object-contain"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
            <p className="text-xs uppercase tracking-[0.4em] text-primary/80 mb-3 font-display">
              Explorar case
            </p>
            <span className="inline-flex items-center gap-3 px-7 py-3 rounded-full border border-primary/60 text-primary text-xs uppercase tracking-[0.15em] font-display font-semibold backdrop-blur-md">
              Abrir história completa
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
                className="font-display text-xl md:text-2xl font-bold text-white"
              >
                {project.title}
              </motion.h3>
            </div>
            <motion.div
              initial={false}
              animate={{
                x: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0,
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
          <span className="font-display text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

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
const FeaturedCard = ({
  project,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: {
  project: Project;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group cursor-pointer relative"
    >
      <div
        className="relative aspect-[16/9] md:aspect-[2.4/1] rounded-2xl overflow-hidden"
        style={{ backgroundColor: project.bgColor }}
      >
        {/* Parallax logo */}
        <motion.div
          style={{ y: imgY }}
          className="absolute inset-0 flex items-center justify-center p-16 md:p-24"
        >
          <motion.img
            src={project.logo}
            alt={`Logo ${project.title}`}
            className="max-w-[50%] max-h-[60%] object-contain"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Cinematic overlay on hover */}
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
            <p className="text-xs uppercase tracking-[0.4em] text-primary/80 mb-3 font-display">
              Explorar case
            </p>
            <span className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-primary/60 text-primary text-sm uppercase tracking-[0.15em] font-display font-semibold backdrop-blur-md">
              Abrir história completa
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </motion.div>
        </motion.div>

        {/* Bottom gradient info bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <div className="flex items-end justify-between">
            <div>
              <motion.p
                initial={false}
                animate={{ x: isHovered ? 8 : 0 }}
                transition={{ duration: 0.4 }}
                className="text-[10px] uppercase tracking-[0.3em] text-primary font-display mb-2"
              >
                {project.category}
              </motion.p>
              <motion.h3
                initial={false}
                animate={{ x: isHovered ? 8 : 0 }}
                transition={{ duration: 0.5 }}
                className="font-display text-2xl md:text-4xl font-bold text-white"
              >
                {project.title}
              </motion.h3>
            </div>
            <motion.div
              initial={false}
              animate={{
                x: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Counter badge */}
        <div className="absolute top-6 right-6">
          <span className="font-display text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">
            01 / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Tags ribbon */}
      <div className="flex flex-wrap gap-2 mt-5">
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

/* ─── Project Card ─── */
const ProjectCard = ({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group cursor-pointer"
    >
      <div
        className="relative aspect-[4/5] rounded-xl overflow-hidden"
        style={{ backgroundColor: project.bgColor }}
      >
        {/* Parallax logo */}
        <motion.div
          style={{ y: imgY }}
          className="absolute inset-0 flex items-center justify-center p-10"
        >
          <motion.img
            src={project.logo}
            alt={`Logo ${project.title}`}
            className="max-w-[70%] max-h-[55%] object-contain"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            backgroundColor: isHovered ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0)",
            backdropFilter: isHovered ? "blur(6px)" : "blur(0px)",
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 15,
              scale: isHovered ? 1 : 0.9,
            }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <span className="inline-block px-5 py-2.5 rounded-full border border-primary/60 text-primary text-xs uppercase tracking-[0.2em] font-display font-semibold">
              Ver case
            </span>
          </motion.div>
        </motion.div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-[9px] uppercase tracking-[0.3em] text-primary font-display mb-1">
            {project.category}
          </p>
          <h3 className="font-display text-lg font-bold text-white">
            {project.title}
          </h3>
        </div>

        {/* Counter */}
        <div className="absolute top-4 right-4">
          <span className="font-display text-[10px] text-white/30 font-medium tracking-wider">
            {String(index + 2).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioSection;
