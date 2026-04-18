import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectModal from "./ProjectModal";
import socialMedia1 from "@/assets/social-media-1.webp";
import carrosselMockup from "@/assets/carrossel-mockup.webp";
import destaquesMockup from "@/assets/destaques-mockup.webp";
import storyMockup from "@/assets/story-mockup.webp";

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

const socialMediaItems = [
  {
    id: 1,
    title: "Feed Estratégico",
    description: "Posts que comunicam, engajam e convertem — com identidade visual consistente.",
    image: socialMedia1,
  },
  {
    id: 2,
    title: "Stories & Reels",
    description: "Conteúdos dinâmicos e criativos que aumentam o alcance e a conexão com o público.",
    image: storyMockup,
  },
  {
    id: 3,
    title: "Carrosséis Educativos",
    description: "Design informativo que entrega valor e posiciona a marca como autoridade.",
    image: carrosselMockup,
  },
  {
    id: 4,
    title: "Capas & Destaques",
    description: "Elementos visuais coesos que fortalecem a primeira impressão do perfil.",
    image: destaquesMockup,
  },
];

const PortfolioSection = () => {
  const [activeTab, setActiveTab] = useState<"Identidade Visual" | "Redes Sociais">("Identidade Visual");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const tabs = [
    { id: "Identidade Visual", label: "Identidade Visual" },
    { id: "Redes Sociais", label: "Redes Sociais" },
  ];

  return (
    <section id="portfolio" className="relative section-padding bg-[#070807] grid-pattern border-t border-white/[0.05]">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 border border-[#FFCA16] text-[#FFCA16] text-[11px] font-bold uppercase tracking-[3px] rounded-none mb-6">
            PORTFÓLIO
          </span>
          <h2 className="font-display text-[40px] md:text-[56px] font-[800] text-white leading-tight tracking-[-2px] mb-6">
            {activeTab === "Identidade Visual" ? "Identidade Visual" : "Artes para Mídias Sociais"}
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-3xl leading-relaxed">
            {activeTab === "Identidade Visual" 
              ? "Transformamos a essência do seu negócio em uma identidade visual estratégica, memorável e de alto impacto."
              : "Criamos artes que traduzem a essência da sua marca nas redes sociais — com design estratégico, identidade visual forte e conteúdos que geram resultados reais."}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 md:mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-3 text-xs font-bold uppercase tracking-[2px] transition-all duration-300 border ${
                activeTab === tab.id
                  ? "bg-[#FFCA16] text-black border-[#FFCA16]"
                  : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {activeTab === "Identidade Visual" ? (
              projects.map((project, i) => (
                <motion.div
                  key={`idv-${project.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group cursor-pointer bg-white/[0.03] border border-white/[0.08] rounded-[2px] overflow-hidden transition-all duration-300 hover:border-[#FFCA16]/30 hover:bg-[#FFCA16]/[0.04] hover:-translate-y-1"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative aspect-[4/3] flex items-center justify-center p-6 bg-[#111111] overflow-hidden">
                    <img
                      src={project.logo}
                      alt={project.title}
                      className="w-[85%] h-full object-contain block"
                    />
                  </div>

                  <div className="p-[20px_24px] border-t border-white/[0.06]">
                    <h3 className="font-display text-base font-semibold text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-[#FFCA16]/60 text-[12px] font-normal uppercase tracking-[1.5px]">
                      {project.category}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              socialMediaItems.map((item, i) => (
                <motion.div
                  key={`sm-${item.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-[#FFCA16]/[0.02] mb-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-[#070807]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#FFCA16] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))
            )}
          </AnimatePresence>
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