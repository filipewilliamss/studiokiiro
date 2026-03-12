import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <section id="portfolio" className="section-padding border-t border-border bg-background">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-28 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Portfólio</p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[0.95]">
              Projetos<br className="hidden md:block" /> selecionados
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-base leading-relaxed md:text-right">
            Cada projeto é uma história de transformação visual — do conceito à identidade completa.
          </p>
        </motion.div>

        {/* Featured first project - large */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            onClick={() => setSelectedProject(projects[0])}
            onMouseEnter={() => setHoveredId(projects[0].id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group cursor-pointer mb-8 md:mb-12"
          >
            <div
              className="relative aspect-[16/9] md:aspect-[2.2/1] rounded-2xl overflow-hidden transition-all duration-700"
              style={{ backgroundColor: projects[0].bgColor }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-16 md:p-24">
                <motion.img
                  src={projects[0].logo}
                  alt={`Logo ${projects[0].title}`}
                  className="max-w-[55%] max-h-[65%] object-contain"
                  animate={{
                    scale: hoveredId === projects[0].id ? 1.04 : 1,
                  }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    initial={false}
                    animate={{
                      y: hoveredId === projects[0].id ? 0 : 10,
                      opacity: hoveredId === projects[0].id ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="inline-block px-6 py-3 rounded-full border border-primary text-primary text-sm uppercase tracking-[0.2em] font-display font-semibold">
                      Ver case completo
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Bottom gradient info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-primary font-display mb-2">
                      {projects[0].category}
                    </p>
                    <h3 className="font-display text-2xl md:text-4xl font-bold text-foreground">
                      {projects[0].title}
                    </h3>
                  </div>
                  <svg
                    className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Tags under featured */}
            <div className="flex flex-wrap gap-2 mt-5">
              {projects[0].tags.map((tag) => (
                <span key={tag} className="text-xs uppercase tracking-wider text-muted-foreground border border-border rounded-full px-3 py-1 group-hover:border-primary/30 transition-colors duration-300">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Remaining projects - grid */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {projects.slice(1).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group cursor-pointer"
            >
              <div
                className="relative aspect-[4/5] rounded-xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_25px_60px_-15px_hsl(var(--primary)/0.12)]"
                style={{ backgroundColor: project.bgColor }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-10">
                  <motion.img
                    src={project.logo}
                    alt={`Logo ${project.title}`}
                    className="max-w-[75%] max-h-[60%] object-contain"
                    animate={{
                      scale: hoveredId === project.id ? 1.06 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <motion.span
                    initial={false}
                    animate={{
                      y: hoveredId === project.id ? 0 : 8,
                      opacity: hoveredId === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.35 }}
                    className="inline-block px-5 py-2.5 rounded-full border border-primary text-primary text-xs uppercase tracking-[0.2em] font-display font-semibold"
                  >
                    Ver case
                  </motion.span>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-transparent">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-display mb-1">
                    {project.category}
                  </p>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {project.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
