import { useEffect, useRef, useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimatedImage from "@/components/ScrollAnimatedImage";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const dotsY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const springDotsY = useSpring(dotsY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className="min-h-screen text-white selection:bg-[#FFCA16] selection:text-black overflow-x-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      <SEO 
        title={project.title}
        description={project.subtitle || `Projeto de ${project.category} desenvolvido pelo Studio Kiiro em ${project.year}.`}
        image={project.pages[0]}
        url={`https://studiokiiro.com/projeto/${project.slug}`}
        type="article"
      />
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

      {/* HERO SECTION */}
      <section 
        className="relative h-[90vh] flex items-end pb-20 overflow-hidden"
        style={{ backgroundColor: project.bgColor || "#000000" }}
      >
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full opacity-40"
            style={{ 
              backgroundImage: `url(${project.pages[0]})`,
              backgroundSize: project.slug === 'tabernaculo-da-trindade' ? 'contain' : 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06121C] via-[#06121C]/40 to-transparent" 
               style={{ 
                 backgroundImage: `linear-gradient(to top, ${project.bgColor || '#000000'}, ${project.bgColor || '#000000'}66, transparent)` 
               }} 
          />
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

      {/* SEÇÃO SOBRE O PROJETO */}
      {project.about && (
        <section className="py-24 md:py-48 relative z-10 border-t border-white/5">
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
      <section className="py-24 md:py-48 relative z-10">
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
      {project.concept ? (
        <section className="pb-32 relative z-10">
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
                {project.videoBlock ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-8 w-full"
                  >
                    <div className="flex flex-col gap-4">
                      <h3 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold">
                        {project.videoBlock.title}
                      </h3>
                      <div className="w-full aspect-video relative overflow-hidden bg-black/20 rounded-sm">
                        <img 
                          src={project.videoBlock.url} 
                          alt={project.videoBlock.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl">
                      {project.videoBlock.description}
                    </p>
                  </motion.div>
                ) : (
                  <div className="w-full flex justify-center py-12 md:py-16">
                    <ScrollAnimatedImage 
                      src={project.pages[0]} 
                      className="w-full h-auto object-contain" 
                      alt={`${project.title} Logo`}
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Variations */}
            {project.variations && project.pages[2] && (
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
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src={project.pages[2]} 
                    alt={`Variações do logotipo ${project.title}`}
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* Construction */}
            {project.construction && (project.pages[3] || project.pages[4]) && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  {project.slug === 'team-luisa-crosstraining' ? 'Grid de construção do logo' : 'Construção, área de proteção e legibilidade'}
                </h2>
                <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl mb-16 whitespace-pre-line">
                  {project.construction}
                </p>
                <div className={`grid grid-cols-1 ${project.pages[4] && project.slug !== 'team-luisa-crosstraining' ? 'md:grid-cols-2' : ''} gap-8`}>
                  <div className={project.slug === 'team-luisa-crosstraining' ? 'max-w-5xl mx-auto w-full' : ''}>
                    <ScrollAnimatedImage src={project.pages[3]} alt={`Malha construtiva ${project.title}`} className="w-full h-auto" />
                  </div>
                  {project.pages[4] && project.slug !== 'team-luisa-crosstraining' && (
                    <ScrollAnimatedImage src={project.pages[4]} alt={`Área de proteção ${project.title}`} className="w-full h-auto" />
                  )}
                </div>
              </motion.div>
            )}

            {/* Secondary Variations (New Block) */}
            {project.secondaryVariations && project.secondaryVariationsImage && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Variações do logotipo
                </h2>
                <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl mb-16 whitespace-pre-line">
                  {project.secondaryVariations}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src={project.secondaryVariationsImage} 
                    alt={`Variações do logotipo secundárias ${project.title}`}
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}


            {/* Colors */}
            {project.colors && project.pages[5] && (
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
                <ScrollAnimatedImage src={project.pages[5]} alt={`Paleta de cores ${project.title}`} className="w-full h-auto" />
              </motion.div>
            )}

            {/* Typography */}
            {project.typography && project.pages[6] && (
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
                <ScrollAnimatedImage src={project.pages[6]} alt={`Tipografia do projeto ${project.title}`} className="w-full h-auto" />
              </motion.div>
            )}
            
            {/* Instagram Posts */}
            {project.instagramPosts && project.instagramPostsImage && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Posts Instagram
                </h2>
                <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl mb-16 whitespace-pre-line">
                  {project.instagramPosts}
                </p>
                <ScrollAnimatedImage src={project.instagramPostsImage} alt={`Posts Instagram ${project.title}`} className="w-full h-auto" />
              </motion.div>
            )}

            {/* Symbols */}
            {project.symbols && project.pages[7] && (
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
                <ScrollAnimatedImage src={project.pages[7]} alt={`Símbolos e elementos de apoio ${project.title}`} className="w-full h-auto" />
              </motion.div>
            )}

            {/* Non Recommended */}
            {project.nonRecommended && project.pages[8] && (
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
                <ScrollAnimatedImage src={project.pages[8]} alt={`Usos não recomendados do logotipo ${project.title}`} className="w-full h-auto" />
              </motion.div>
            )}

            {/* Applications */}
            {project.applications && (project.pages[9] || project.pages[10]) && (
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
                <div className={`grid grid-cols-1 ${project.pages[10] ? 'md:grid-cols-2' : ''} gap-8`}>
                  {project.pages[9] && (
                    <ScrollAnimatedImage src={project.pages[9]} alt={`Aplicação do projeto ${project.title}`} className="w-full h-auto" />
                  )}
                  {project.pages[10] && (
                    <ScrollAnimatedImage src={project.pages[10]} alt={`Aplicação do projeto ${project.title}`} className="w-full h-auto" />
                  )}
                </div>
              </motion.div>
            )}

            {/* Result */}
            {project.finalResult && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="py-24 border-t border-white/5"
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
      ) : (
        /* Fallback Gallery */
        <section className="pb-32 md:pb-64 relative z-10">
          <div className="flex flex-col gap-12 md:gap-32">
            {project.pages.map((img: string, i: number) => (
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
                    alt={`Galeria ${project.title} - Imagem ${i + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* BACK TO TOP & PORTFOLIO NAVIGATION */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-10 right-10 z-[100] flex flex-col gap-4"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-12 h-12 bg-[#FFCA16] text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRÓXIMO PROJETO */}
      <section className="py-40 md:py-80 border-t border-white/5 relative overflow-hidden group">
        <Link to={`/project/${nextProject.slug}`} className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center opacity-100 group-hover:scale-110 transition-all duration-[2s]"
            style={{ backgroundImage: `url(${nextProject.pages[0]})` }}
          />
        </Link>
        
        <div className="container-editorial relative z-10 pointer-events-none">
          <div className="flex flex-col items-center text-center">
            <span className={`text-[11.5px] uppercase tracking-[0.6em] font-bold -translate-y-[200px] ${project.slug === 'akedah-podcast' ? 'text-black' : 'text-[#FFCA16]'}`}>
              Próximo Projeto
            </span>
            
            <Link 
              to={`/project/${nextProject.slug}`}
              className={`pointer-events-auto group/btn relative inline-flex items-center justify-center px-16 py-8 overflow-hidden border transition-all duration-700 hover:border-[#FFCA16] translate-y-[250px] ${project.slug === 'akedah-podcast' ? 'border-black/20' : 'border-white/10'}`}
            >
              <div className="absolute inset-0 bg-[#FFCA16] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-600 ease-[0.22,1,0.36,1]" />
              <span className={`relative z-10 text-[12px] uppercase tracking-[0.4em] font-bold group-hover/btn:text-black transition-colors duration-500 ${project.slug === 'akedah-podcast' ? 'text-black' : 'text-white'}`}>
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
