import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white selection:bg-[#FFCA16] selection:text-black overflow-x-hidden"
    >
      <Navbar />

      {/* Gold to Black Bleed Transition */}
      <motion.div
        initial={{ height: "100vh", backgroundColor: "#FFCA16" }}
        animate={{ height: "0vh" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-[100] pointer-events-none origin-top"
      />

      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-end pb-20 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full bg-cover bg-center grayscale opacity-30"
            style={{ backgroundImage: `url(${project.pages[0]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="container-editorial relative z-10 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#FFCA16] font-bold">
                {project.category}
              </span>
              <span className="w-12 h-[1px] bg-white/20" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                {project.year}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase mb-12"
            >
              {project.title}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* DESAFIO E SOLUÇÃO GRID */}
      <section className="py-24 md:py-40 bg-black">
        <div className="container-editorial">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#FFCA16] font-bold mb-10">
                O Desafio
              </h2>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-white/70">
                {project.challenge}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#FFCA16] font-bold mb-10">
                A Solução
              </h2>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-white/70">
                {project.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EDITORIAL GALLERY */}
      <section className="pb-32 md:pb-56 bg-black">
        <div className="flex flex-col gap-10 md:gap-20">
          {project.pages.map((img: string, i: number) => {
            // Varied layouts: 100%, 50/50
            const isFullWidth = i % 3 === 0;
            const isPair = i % 3 === 1 && project.pages[i+1];
            
            if (isFullWidth) {
              return (
                <div key={i} className="w-full px-4 md:px-10">
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2 }}
                    className="relative aspect-video md:aspect-[21/9] overflow-hidden group"
                  >
                    <img 
                      src={img} 
                      alt={`${project.title} layout ${i}`} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </motion.div>
                </div>
              );
            }

            if (isPair) {
              return (
                <div key={i} className="container-editorial">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <motion.div 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.2 }}
                      className="aspect-square md:aspect-[4/5] overflow-hidden"
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.2, delay: 0.2 }}
                      className="aspect-square md:aspect-[4/5] overflow-hidden md:mt-24"
                    >
                      <img src={project.pages[i+1]} alt="" className="w-full h-full object-cover" />
                    </motion.div>
                  </div>
                </div>
              );
            }

            // Skip the next one if it was part of a pair
            if (i % 3 === 2) return null;

            return null;
          })}
        </div>
      </section>

      {/* FOOTER: NEXT PROJECT */}
      <section className="py-32 md:py-64 border-t border-white/10 relative overflow-hidden group">
        <Link to={`/projeto/${nextProject.slug}`} className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center grayscale opacity-10 group-hover:opacity-30 group-hover:scale-105 transition-all duration-1000"
            style={{ backgroundImage: `url(${nextProject.pages[0]})` }}
          />
        </Link>
        
        <div className="container-editorial relative z-10 pointer-events-none">
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#FFCA16] font-bold mb-8">
              Próximo Projeto
            </span>
            <Link 
              to={`/projeto/${nextProject.slug}`} 
              className="pointer-events-auto"
            >
              <h2 className="text-[8vw] md:text-[6vw] font-black uppercase leading-none mb-12 group-hover:text-[#FFCA16] transition-colors duration-500">
                {nextProject.title}
              </h2>
            </Link>
            
            <Link 
              to={`/projeto/${nextProject.slug}`}
              className="pointer-events-auto group/btn relative inline-flex items-center justify-center px-12 py-6 overflow-hidden border border-white/20 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
              <span className="relative z-10 text-[11px] uppercase tracking-[0.3em] font-bold text-white group-hover/btn:text-black transition-colors duration-500">
                Ver próximo case
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default ProjectDetail;