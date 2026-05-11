import { useEffect, useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimatedImage from "@/components/ScrollAnimatedImage";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  const { scrollYProgress } = useScroll();
  const dotsY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const springDotsY = useSpring(dotsY, { stiffness: 50, damping: 20 });

  const conceptRef = useRef(null);
  const { scrollYProgress: conceptScroll } = useScroll({
    target: conceptRef,
    offset: ["start end", "end start"]
  });
  const conceptScale = useTransform(conceptScroll, [0, 0.5, 1], [0.95, 1, 1.05]);
  const conceptOpacity = useTransform(conceptScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const variationsRef = useRef(null);
  const { scrollYProgress: variationsScroll } = useScroll({
    target: variationsRef,
    offset: ["start end", "end start"]
  });
  const variationsScale = useTransform(variationsScroll, [0, 0.5, 1], [0.95, 1, 1.05]);
  const variationsOpacity = useTransform(variationsScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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
              <div className="w-[1px] h-10 bg-white/10 hidden" />
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

      {/* SEÇÃO SOBRE O PROJETO */}
      {project.about && (
        <section className="py-24 md:py-48 bg-black relative z-10">
          <div className="container-editorial">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Sobre o projeto
                </h2>
                <p className="text-xl md:text-3xl font-light leading-relaxed text-white/80">
                  {project.about}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

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
                {project.objective ? "O Objetivo" : "A Solução"}
              </h2>
              <p className="text-xl md:text-3xl font-light leading-relaxed text-white/80">
                {project.objective || project.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DETAILED PROJECT CONTENT */}
      {project.concept && (
        <section className="pb-32 bg-black relative z-10">
          <div className="container-editorial">
            {/* Concept section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-32"
            >
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                Conceito e solução de design
              </h2>
              <div className="max-w-4xl">
                <p className="text-xl font-light leading-relaxed text-white/80 whitespace-pre-line mb-16">
                  {project.concept}
                </p>
              </div>
              <div className="flex flex-col gap-12">
                {project.slug === 'akedah-podcast' ? (
                  <div className="w-full flex justify-center py-12 md:py-16">
                    <ScrollAnimatedImage 
                      src={project.pages[0]} 
                      className="max-w-[360px] md:max-w-[600px] object-contain" 
                      alt="Akedah Logo"
                    />
                  </div>
                ) : (
                  <>
                    <div className="w-full aspect-video md:aspect-[21/9]">
                      <ScrollAnimatedImage src={project.pages[0]} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s]" />
                    </div>
                    <div className="w-full aspect-video md:aspect-[21/9]">
                      <ScrollAnimatedImage src={project.pages[1]} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s]" />
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Variations */}
            {project.variations && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Logotipo e variações
                </h2>
                <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl mb-16 whitespace-pre-line">
                  {project.variations}
                </p>
                <div className={`w-full flex justify-center ${project.slug === 'akedah-podcast' ? 'py-8 md:py-12' : ''}`}>
                  <ScrollAnimatedImage 
                    src={project.pages[2]} 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* Construction */}
            {project.construction && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Construção, área de proteção e legibilidade
                </h2>
                <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl mb-16 whitespace-pre-line">
                  {project.construction}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ScrollAnimatedImage src={project.pages[3]} className="w-full h-auto" />
                  <ScrollAnimatedImage src={project.pages[4]} className="w-full h-auto" />
                </div>
              </motion.div>
            )}

            {/* Colors */}
            {project.colors && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Paleta de cores
                </h2>
                <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl mb-16 whitespace-pre-line">
                  {project.colors}
                </p>
                <ScrollAnimatedImage src={project.pages[5]} className="w-full h-auto" />
              </motion.div>
            )}

            {/* Typography */}
            {project.typography && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Tipografia
                </h2>
                <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl mb-16 whitespace-pre-line">
                  {project.typography}
                </p>
                <ScrollAnimatedImage src={project.pages[6]} className="w-full h-auto" />
              </motion.div>
            )}

            {/* Symbols */}
            {project.symbols && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Símbolos e elementos de apoio
                </h2>
                <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl mb-16 whitespace-pre-line">
                  {project.symbols}
                </p>
                <ScrollAnimatedImage src={project.pages[7]} className="w-full h-auto" />
              </motion.div>
            )}

            {/* Non Recommended */}
            {project.nonRecommended && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Usos não recomendados
                </h2>
                <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl mb-16 whitespace-pre-line">
                  {project.nonRecommended}
                </p>
                <ScrollAnimatedImage src={project.pages[8]} className="w-full h-auto" />
              </motion.div>
            )}

            {/* Applications */}
            {project.applications && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Aplicações
                </h2>
                <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl mb-16 whitespace-pre-line">
                  {project.applications}
                </p>
                {project.slug === 'akedah-podcast' ? (
                  <ScrollAnimatedImage src={project.pages[9]} className="w-full h-auto" />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ScrollAnimatedImage src={project.pages[9]} className="w-full h-auto" />
                    <ScrollAnimatedImage src={project.pages[10]} className="w-full h-auto" />
                  </div>
                )}
              </motion.div>
            )}

            {/* Result */}
            {project.finalResult && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="py-24"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Resultado
                </h2>
                <p className="text-xl md:text-3xl font-light leading-relaxed text-white/80 max-w-4xl">
                  {project.finalResult}
                </p>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* EDITORIAL GALLERY (Fallback for other projects) */}
      {!project.concept && (
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
                      <ScrollAnimatedImage 
                        src={img} 
                        alt="" 
                        className="w-full h-full object-cover"
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
                        <ScrollAnimatedImage src={img} alt="" className="w-full h-full object-cover" />
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="aspect-square md:aspect-[4/5] overflow-hidden md:mt-32"
                      >
                        <ScrollAnimatedImage src={project.pages[i+1]} alt="" className="w-full h-full object-cover" />
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
      )}

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