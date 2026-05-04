import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  const { scrollYProgress } = useScroll();
  const dotsY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const springDotsY = useSpring(dotsY, { stiffness: 50, damping: 20 });

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
      className="min-h-screen bg-black text-white selection:bg-[#FFCA16] selection:text-black overflow-x-hidden"
    >
      <Navbar />

      {/* Gold to Black Bleed Transition */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, times: [0, 0.4, 1], ease: "easeInOut" }}
        className="fixed inset-0 bg-[#FFCA16]/20 mix-blend-overlay z-[100] pointer-events-none"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 1, 0] }}
        transition={{ duration: 1.2, times: [0, 0.5, 1], ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 bg-[#0A0A0A] z-[99] pointer-events-none origin-top"
      />

      {/* Dynamic Dots (Inverse Parallax) */}
      <motion.div 
        style={{ y: springDotsY }}
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
      >
        <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-[#FFCA16] rounded-full" />
        <div className="absolute top-[40%] right-[10%] w-1 h-1 bg-[#FFCA16] rounded-full" />
        <div className="absolute top-[70%] left-[15%] w-3 h-3 bg-[#FFCA16] rounded-full" />
        <div className="absolute top-[90%] right-[20%] w-1.5 h-1.5 bg-[#FFCA16] rounded-full" />
      </motion.div>

      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full bg-cover bg-center grayscale opacity-40"
            style={{ backgroundImage: `url(${project.pages[0]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="container-editorial relative z-10 w-full">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-6 mb-10"
            >
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.5em] text-[#FFCA16] font-bold mb-1">Categoria</span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">{project.category}</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.5em] text-[#FFCA16] font-bold mb-1">Ano</span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">{project.year}</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[14vw] md:text-[9vw] font-black leading-[0.8] tracking-tighter uppercase mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {project.title}
            </motion.h1>
            {project.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-lg md:text-2xl font-light text-white/60 max-w-2xl leading-relaxed"
              >
                {project.subtitle}
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {/* DESAFIO E SOLUÇÃO GRID */}
      <section className="py-24 md:py-48 bg-black relative z-10">
        <div className="container-editorial">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-40">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#FFCA16]" />
                O Desafio
              </h2>
              <p className="text-xl md:text-3xl font-light leading-relaxed text-white/80">
                {project.challenge}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#FFCA16]" />
                A Solução
              </h2>
              <p className="text-xl md:text-3xl font-light leading-relaxed text-white/80">
                {project.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EDITORIAL GALLERY */}
      <section className="pb-32 md:pb-64 bg-black relative z-10">
        <div className="flex flex-col gap-12 md:gap-32">
          {project.pages.map((img: string, i: number) => {
            const isFullWidth = i % 3 === 0;
            const isPair = i % 3 === 1 && project.pages[i+1];
            
            if (isFullWidth) {
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2 }}
                  className="w-full px-4 md:px-0"
                >
                  <div className="relative aspect-video md:aspect-[21/9] overflow-hidden group">
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                    />
                  </div>
                </motion.div>
              );
            }

            if (isPair) {
              return (
                <div key={i} className="container-editorial">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="aspect-square md:aspect-[4/5] overflow-hidden"
                    >
                      <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]" />
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="aspect-square md:aspect-[4/5] overflow-hidden md:mt-32"
                    >
                      <img src={project.pages[i+1]} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]" />
                    </motion.div>
                  </div>
                </div>
              );
            }

            if (i % 3 === 2) return null;
            return null;
          })}
        </div>
      </section>

      {/* PRÓXIMO PROJETO */}
      <section className="py-40 md:py-80 border-t border-white/5 relative overflow-hidden group">
        <Link to={`/projeto/${nextProject.slug}`} className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center grayscale opacity-10 group-hover:opacity-40 group-hover:scale-110 transition-all duration-[2s]"
            style={{ backgroundImage: `url(${nextProject.pages[0]})` }}
          />
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-1000" />
        </Link>
        
        <div className="container-editorial relative z-10 pointer-events-none">
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12">
              Próximo Projeto
            </span>
            <Link 
              to={`/projeto/${nextProject.slug}`} 
              className="pointer-events-auto"
            >
              <h2 className="text-[12vw] md:text-[8vw] font-black uppercase leading-none mb-16 transition-all duration-700 group-hover:tracking-tighter group-hover:text-[#FFCA16]">
                {nextProject.title}
              </h2>
            </Link>
            
            <Link 
              to={`/projeto/${nextProject.slug}`}
              className="pointer-events-auto group/btn relative inline-flex items-center justify-center px-16 py-8 overflow-hidden border border-white/10 transition-all duration-700 hover:border-[#FFCA16]"
            >
              <div className="absolute inset-0 bg-[#FFCA16] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-600 ease-[0.22,1,0.36,1]" />
              <span className="relative z-10 text-[12px] uppercase tracking-[0.4em] font-bold text-white group-hover/btn:text-black transition-colors duration-500">
                Continuar Jornada
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