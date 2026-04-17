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

  return (
    <section id="portfolio" className="relative section-padding bg-[#070807] grid-pattern border-t border-white/[0.05]">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-24"
        >
          <div>
            <span className="inline-block px-4 py-1.5 border border-[#FFCA16] text-[#FFCA16] text-[11px] font-bold uppercase tracking-[3px] rounded-none mb-6">
              PORTFÓLIO
            </span>
            <h2 className="font-display text-[40px] md:text-[56px] font-[800] text-white leading-none tracking-[-2px]">
              PROJETOS SELECIONADOS
            </h2>
          </div>
          <a 
            href="#todos-projetos" 
            className="px-8 py-4 border border-white text-white text-[12px] font-bold uppercase tracking-[2px] hover:bg-white hover:text-black transition-all duration-300"
          >
            VER TODOS OS PROJETOS
          </a>
        </motion.div>

        {/* Masonry-like grid using CSS columns for simplicity or flex/grid */}
        <div className="columns-1 md:columns-2 gap-8 space-y-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-none break-inside-avoid"
              onClick={() => setSelectedProject(project)}
            >
              {/* Card Container */}
              <div 
                className={`relative w-full overflow-hidden border border-[#FFCA16]/10 bg-[#FFCA16]/[0.05] transition-transform duration-500 ease-out group-hover:scale-[1.02] ${i % 3 === 0 ? 'aspect-square' : 'aspect-video'}`}
              >
                {/* Project Logo Placeholder (Centered) */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <img 
                    src={project.logo} 
                    alt="" 
                    className="w-full h-full object-contain opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                  />
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-[#070807]/[0.85] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-10">
                  <span className="font-display text-[12px] text-[#FFCA16] uppercase tracking-[3px] font-medium mb-3">
                    {project.category}
                  </span>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-[22px] md:text-[28px] font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <span className="text-[#FFCA16] text-3xl">→</span>
                  </div>
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