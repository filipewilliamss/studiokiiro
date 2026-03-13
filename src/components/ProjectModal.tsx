import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import type { Project } from "./PortfolioSection";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const pages = project.pages || [];
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Keyboard close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const { scrollYProgress } = useScroll({ container: containerRef });
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const caseStudySections = [
    { label: "O Desafio", content: project.challenge, icon: "⚡" },
    { label: "A Solução", content: project.solution, icon: "💡" },
    { label: "O Resultado", content: project.result, icon: "🏆" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-background"
    >
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-primary z-[60]"
        style={{ width: progressWidth }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-[60] w-11 h-11 rounded-full bg-card/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-all duration-300 group"
      >
        <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="fixed top-5 left-5 z-[60]">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs font-display uppercase tracking-[0.2em]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </button>
      </div>

      {/* Scrollable content */}
      <div ref={containerRef} className="h-full overflow-y-auto scroll-smooth">
        {/* ═══ HERO ═══ */}
        <motion.div
          ref={heroRef}
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background with project color */}
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              background: `radial-gradient(ellipse at center, ${project.bgColor}40 0%, transparent 70%)`,
            }}
          />

          {/* Floating logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: imageLoaded ? 0.08 : 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={project.logo}
              alt=""
              className="max-w-[60%] max-h-[60%] object-contain"
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>

          {/* Hero text */}
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-xs uppercase tracking-[0.5em] text-primary font-display mb-6"
            >
              {project.category}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl sm:text-6xl md:text-8xl font-bold text-foreground leading-[0.9] tracking-tight mb-8"
            >
              {project.title}
            </motion.h1>

            {project.intro && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
              >
                {project.intro}
              </motion.p>
            )}

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-2 mt-10"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full border border-border/50 text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-display"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-display">
              Role para explorar
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <svg className="w-5 h-5 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ═══ CASE STUDY CHAPTERS ═══ */}
        <div className="relative">
          {/* Decorative line */}
          <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-primary/20 via-border/30 to-transparent hidden md:block" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24 md:py-32 space-y-32 md:space-y-48">
            {caseStudySections.map((section, i) => (
              <motion.div
                key={section.label}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`flex flex-col ${i % 2 === 0 ? "md:items-start md:text-left" : "md:items-end md:text-right"}`}
              >
                <div className="max-w-lg">
                  {/* Chapter number */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6"
                  >
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-primary/30 text-xl">
                      {section.icon}
                    </span>
                  </motion.div>

                  <h3 className="font-display text-xs uppercase tracking-[0.3em] text-primary mb-4 font-semibold">
                    {section.label}
                  </h3>
                  <p className="text-secondary-foreground text-lg md:text-xl leading-relaxed">
                    {section.content}
                  </p>

                  {/* Accent line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "60px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className={`h-px bg-primary/40 mt-8 ${i % 2 !== 0 ? "md:ml-auto" : ""}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══ IMAGE GALLERY — Cinematic reveal ═══ */}
        {pages.length > 0 && (
          <div className="pb-16">
            {/* Section divider */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="text-center py-20 md:py-28"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-primary font-display mb-3">
                O Projeto
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
                Visual Completo
              </h2>
            </motion.div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
              {pages.map((page, i) => {
                const isFullWidth = i === 0 || i % 3 === 0;
                const isGridStart = !isFullWidth && i + 1 < pages.length && (i - 1) % 3 === 0;

                if (!isFullWidth && !isGridStart) return null;

                if (isGridStart) {
                  return (
                    <div key={`grid-${i}`} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <GalleryImage src={pages[i]} alt={`${project.title} - ${i + 1}`} index={i} />
                      {pages[i + 1] && (
                        <GalleryImage src={pages[i + 1]} alt={`${project.title} - ${i + 2}`} index={i + 1} />
                      )}
                    </div>
                  );
                }

                return (
                  <GalleryImage
                    key={`full-${i}`}
                    src={page}
                    alt={`${project.title} - ${i + 1}`}
                    index={i}
                    fullWidth
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Fallback if no pages */}
        {pages.length === 0 && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
            <div
              className="aspect-[4/3] rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: project.bgColor }}
            >
              <img
                src={project.logo}
                alt={`Logo ${project.title}`}
                className="max-w-[50%] max-h-[50%] object-contain"
              />
            </div>
          </div>
        )}

        {/* ═══ CTA FOOTER ═══ */}
        <div className="border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center py-24 md:py-32 px-6"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary font-display mb-4">
              Próximo passo
            </p>
            <h3 className="font-display text-3xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              Quer uma identidade<br />assim para sua marca?
            </h3>
            <p className="text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
              Vamos criar algo memorável juntos — do conceito à identidade completa.
            </p>
            <a
              href={`https://wa.me/5511991076096?text=Olá! Vi o projeto ${project.title} e gostaria de criar uma identidade visual assim!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-display font-semibold rounded-full hover:bg-kiiro-dark transition-all duration-500 text-sm uppercase tracking-[0.1em] group"
            >
              Solicitar Orçamento
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
      </div>
    </motion.div>
  );
};

/* ─── Gallery Image with scroll-reveal ─── */
const GalleryImage = ({
  src,
  alt,
  index,
  fullWidth,
}: {
  src: string;
  alt: string;
  index: number;
  fullWidth?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, opacity }}
      className={fullWidth ? "" : ""}
    >
      <div className="rounded-xl overflow-hidden bg-card/30">
        <img
          src={src}
          alt={alt}
          className="w-full block"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export default ProjectModal;
