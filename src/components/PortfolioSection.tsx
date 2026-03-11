import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import akedahLogo from "@/assets/akedah-logo.png";
import construmarLogo from "@/assets/construmar-logo.png";
import temploLogo from "@/assets/templo-logo.png";
import teamluisaLogo from "@/assets/teamluisa-logo.png";
import construmarPag1 from "@/assets/construmar-pagina-1.png";
import construmarPag2 from "@/assets/construmar-pagina-2.png";
import construmarPag3 from "@/assets/construmar-pagina-3.png";
import construmarPag4 from "@/assets/construmar-pagina-4.png";
import construmarPag5 from "@/assets/construmar-pagina-5.png";
import construmarPag6 from "@/assets/construmar-pagina-6.png";
import construmarPag7 from "@/assets/construmar-pagina-7.png";
import construmarPag8 from "@/assets/construmar-pagina-8.png";
import construmarPag9 from "@/assets/construmar-pagina-9.png";
import akedahPag1 from "@/assets/akedah-pagina-1.png";
import akedahPag2 from "@/assets/akedah-pagina-2.png";
import akedahPag3 from "@/assets/akedah-pagina-3.png";
import akedahPag4 from "@/assets/akedah-pagina-4.png";
import akedahPag5 from "@/assets/akedah-pagina-5.png";
import akedahPag6 from "@/assets/akedah-pagina-6.png";
import akedahPag7 from "@/assets/akedah-pagina-7.png";
import akedahPag8 from "@/assets/akedah-pagina-8.png";
import akedahPag9 from "@/assets/akedah-pagina-9.png";
import akedahPag10 from "@/assets/akedah-pagina-10.png";
import akedahPag11 from "@/assets/akedah-pagina-11.png";
import teamluisaPag1 from "@/assets/teamluisa-pagina-1.png";
import teamluisaPag2 from "@/assets/teamluisa-pagina-2.png";
import teamluisaPag3 from "@/assets/teamluisa-pagina-3.png";
import teamluisaPag4 from "@/assets/teamluisa-pagina-4.png";
import teamluisaPag5 from "@/assets/teamluisa-pagina-5.png";
import teamluisaPag6 from "@/assets/teamluisa-pagina-6.png";
import ProjectModal from "./ProjectModal";

export interface Project {
  id: number;
  title: string;
  category: string;
  bgColor: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
  logo: string;
  pages?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Akedah Podcast",
    category: "Identidade Visual",
    bgColor: "#2D1A11",
    challenge: "O podcast precisava de uma identidade visual profissional que transmitisse seriedade e credibilidade, se diferenciando no mercado de podcasts.",
    solution: "Criamos um manual completo com 11 páginas incluindo logo, variações, malha construtiva, paleta de cores, tipografia e aplicações.",
    result: "Identidade visual coesa e memorável que posicionou o podcast como referência no segmento, com reconhecimento imediato em todas as plataformas.",
    tags: ["Logo Design", "Manual de Marca", "Podcast"],
    logo: akedahLogo,
    pages: [
      akedahPag1, akedahPag2, akedahPag3, akedahPag4, akedahPag5,
      akedahPag6, akedahPag7, akedahPag8, akedahPag9, akedahPag10, akedahPag11,
    ],
  },
  {
    id: 2,
    title: "Construmar Marmoraria",
    category: "Identidade Visual",
    bgColor: "#f5f4ef",
    challenge: "A marmoraria precisava de um rebranding que comunicasse sofisticação e qualidade, alinhado ao mercado premium de pedras naturais.",
    solution: "Desenvolvemos uma identidade visual elegante com manual de 9 páginas, incluindo versões monocromáticas e aplicações específicas para o segmento.",
    result: "Nova marca que transmite confiança e profissionalismo, com aplicações consistentes em todos os pontos de contato da empresa.",
    tags: ["Logo Design", "Manual de Marca", "Marmoraria"],
    logo: construmarLogo,
    pages: [
      construmarPag1, construmarPag2, construmarPag3,
      construmarPag4, construmarPag5, construmarPag6,
      construmarPag7, construmarPag8, construmarPag9,
    ],
  },
  {
    id: 3,
    title: "Templo de Deus",
    category: "Identidade Visual",
    bgColor: "#191919",
    challenge: "A igreja buscava uma identidade visual moderna que mantivesse a reverência e espiritualidade, atraindo tanto o público tradicional quanto o jovem.",
    solution: "Manual de marca com 8 páginas, incluindo variações do logotipo, paleta de cores harmoniosa e guia completo de uso da marca.",
    result: "Marca que equilibra tradição e modernidade, com forte presença visual nas redes sociais e materiais impressos da igreja.",
    tags: ["Logo Design", "Manual de Marca", "Igreja"],
    logo: temploLogo,
  },
  {
    id: 4,
    title: "Team Luisa Cross Training",
    category: "Identidade Visual",
    bgColor: "#1d1e1b",
    challenge: "O box de cross training precisava de uma identidade forte e dinâmica que refletisse energia, força e comunidade.",
    solution: "Rebranding completo com manual de 6 páginas, incluindo variações do logo, paleta energética, tipografia bold e layout de posts para Instagram.",
    result: "Marca com personalidade marcante que se destaca nas redes sociais e fortalece o senso de comunidade entre os alunos.",
    tags: ["Rebranding", "Social Media", "Cross Training"],
    logo: teamluisaLogo,
  },
];

const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="section-padding border-t border-border bg-white">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Portfólio</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Projetos de Identidade Visual
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <div
                className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5"
                style={{ backgroundColor: project.bgColor }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <img
                    src={project.logo}
                    alt={`Logo ${project.title}`}
                    className="max-w-[80%] max-h-[80%] object-contain"
                  />
                </div>

                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <span className="text-sm uppercase tracking-widest text-primary font-display">
                    Ver projeto
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{project.category}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
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
