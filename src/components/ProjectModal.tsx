import { motion } from "framer-motion";
import type { Project } from "./PortfolioSection";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
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
        className="max-w-4xl mx-auto px-6 py-20"
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

        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
          {project.category}
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-12">
          {project.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-primary mb-3">Desafio</h3>
            <p className="text-secondary-foreground leading-relaxed">{project.challenge}</p>
          </div>
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-primary mb-3">Solução</h3>
            <p className="text-secondary-foreground leading-relaxed">{project.solution}</p>
          </div>
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-primary mb-3">Resultado</h3>
            <p className="text-secondary-foreground leading-relaxed">{project.result}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-16">
          {project.tags.map((tag) => (
            <span key={tag} className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        {project.pages && project.pages.length > 0 ? (
          <div className="space-y-4 mb-8">
            {project.pages.map((page, index) => (
              <img
                key={index}
                src={page}
                alt={`${project.title} - Página ${index + 1}`}
                className="w-full rounded-xl"
              />
            ))}
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

        <div className="text-center py-16 border-t border-border">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">Gostou deste projeto?</h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Crie uma identidade visual completa e profissional assim para sua marca também.
          </p>
          <a
            href={`https://wa.me/5511991076096?text=Olá! Vi o projeto ${project.title} e gostaria de criar uma identidade visual assim!`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-display font-semibold rounded-full hover:bg-kiiro-dark transition-all duration-300"
          >
            Solicitar Orçamento
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
