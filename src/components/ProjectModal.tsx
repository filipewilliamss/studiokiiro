import { motion } from "framer-motion";
import type { Project } from "./PortfolioSection";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const pages = project.pages || [];

  // Create varied layout: first image full-width, then pairs in grid, then full-width again, etc.
  const renderImageGallery = () => {
    if (pages.length === 0) return null;

    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < pages.length) {
      const position = elements.length;

      // Pattern: full → grid(2) → full → grid(2) → ...
      if (position % 2 === 0) {
        // Full-width image
        elements.push(
          <motion.div
            key={`img-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={pages[i]}
              alt={`${project.title} - Página ${i + 1}`}
              className="w-full rounded-xl"
            />
          </motion.div>
        );
        i++;
      } else {
        // Grid of 2 (if available)
        if (i + 1 < pages.length) {
          elements.push(
            <div key={`grid-${i}`} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={pages[i]}
                  alt={`${project.title} - Página ${i + 1}`}
                  className="w-full rounded-xl"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <img
                  src={pages[i + 1]}
                  alt={`${project.title} - Página ${i + 2}`}
                  className="w-full rounded-xl"
                />
              </motion.div>
            </div>
          );
          i += 2;
        } else {
          elements.push(
            <motion.div
              key={`img-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={pages[i]}
                alt={`${project.title} - Página ${i + 1}`}
                className="w-full rounded-xl"
              />
            </motion.div>
          );
          i++;
        }
      }
    }

    return <div className="space-y-4">{elements}</div>;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 py-20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="fixed top-6 right-6 w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors z-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
          {project.category}
        </p>
        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-[0.95]">
          {project.title}
        </h2>

        {/* Introduction tagline */}
        {project.intro && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary-foreground leading-relaxed mb-16 max-w-3xl border-l-2 border-primary pl-6"
          >
            {project.intro}
          </motion.p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-16">
          {project.tags.map((tag) => (
            <span key={tag} className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        {/* Case study sections */}
        <div className="space-y-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16"
          >
            <div>
              <h3 className="font-display text-xs uppercase tracking-[0.25em] text-primary mb-4">Desafio</h3>
              <p className="text-secondary-foreground leading-relaxed text-base">{project.challenge}</p>
            </div>
            <div>
              <h3 className="font-display text-xs uppercase tracking-[0.25em] text-primary mb-4">Solução</h3>
              <p className="text-secondary-foreground leading-relaxed text-base">{project.solution}</p>
            </div>
            <div>
              <h3 className="font-display text-xs uppercase tracking-[0.25em] text-primary mb-4">Resultado</h3>
              <p className="text-secondary-foreground leading-relaxed text-base">{project.result}</p>
            </div>
          </motion.div>
        </div>

        {/* Image gallery with rhythm */}
        {pages.length > 0 ? (
          <div className="mb-12">
            {renderImageGallery()}
          </div>
        ) : (
          <div
            className="aspect-[4/3] rounded-xl mb-8 flex items-center justify-center"
            style={{ backgroundColor: project.bgColor }}
          >
            <img
              src={project.logo}
              alt={`Logo ${project.title}`}
              className="max-w-[50%] max-h-[50%] object-contain"
            />
          </div>
        )}

        <div className="text-center py-20 border-t border-border">
          <h3 className="font-display text-2xl md:text-4xl font-bold mb-4">Gostou deste projeto?</h3>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-lg">
            Crie uma identidade visual completa e profissional assim para sua marca também.
          </p>
          <a
            href={`https://wa.me/5511991076096?text=Olá! Vi o projeto ${project.title} e gostaria de criar uma identidade visual assim!`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground font-display font-semibold rounded-full hover:bg-kiiro-dark transition-all duration-300 text-base"
          >
            Solicitar Orçamento
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
