import { useEffect, useRef, useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimatedImage from "@/components/ScrollAnimatedImage";
import { projects } from "@/data/projects";
import ProjectHero from "@/components/ProjectHero";

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

  // Scroll is now handled globally by ScrollToTop component in App.tsx


  if (!project) return <Navigate to="/" replace />;

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const isLightBg = project.bgColor?.toLowerCase() === '#ffffff' || project.bgColor?.toLowerCase() === 'white';
  const textColorClass = isLightBg ? 'text-black/80' : 'text-white/80';
  const mutedTextColorClass = isLightBg ? 'text-black/60' : 'text-white/60';
  const borderColorClass = isLightBg ? 'border-black/10' : 'border-white/10';
  const borderMutedClass = isLightBg ? 'border-black/5' : 'border-white/5';

  const darkInteriorSlugs = ['akedah-podcast', 'construmar', 'tabernaculo-da-trindade', 'team-luisa-crosstraining'];
  const pageBgColor = darkInteriorSlugs.includes(project.slug) ? '#030304' : (project.bgColor || '#000000');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen ${isLightBg ? 'text-[#1A1A1A]' : 'text-white'} selection:bg-[#FFCA16] selection:text-black overflow-x-hidden`}
      style={{ backgroundColor: pageBgColor }}
    >
      <SEO 
        title={project.title}
        description={project.subtitle || `Projeto de ${project.category} desenvolvido pelo Studio Kiiro em ${project.year}.`}
        image={project.pages[0]}
        url={`https://studiokiiro.com/projeto/${project.slug}`}
        type="article"
      />
      <Navbar forceBlack={!isLightBg} />

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

      {/* HERO SECTION — reusable branded hero (colors driven by project.heroGradient) */}
      <div className="container-editorial pt-32 md:pt-40 pb-8">
        <ProjectHero
          title={project.title}
          subtitle={project.subtitle}
          logo={project.logo}
          banner={project.heroBanner}
          gradient={
            project.heroGradient ?? {
              from: "#D4A574",
              to: "#E8963D",
              titleColor: "#E8C8A0",
              subtitleColor: "#D4A574",
            }
          }
        />

        <div className="mt-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {project.subtitle && (
            <p className={`text-base leading-[1.6] max-w-xl ${mutedTextColorClass}`}>
              {project.subtitle}
            </p>
          )}

          <div className="flex items-center gap-6 md:justify-end shrink-0">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-[0.5em] text-[#FFCA16] font-bold mb-1">Categoria</span>
              <span className={`text-[11px] uppercase tracking-[0.3em] ${mutedTextColorClass}`}>{project.category}</span>
            </div>
            <div className={`w-[1px] h-10 ${borderColorClass}`} />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-[0.5em] text-[#FFCA16] font-bold mb-1">Ano</span>
              <span className={`text-[11px] uppercase tracking-[0.3em] ${mutedTextColorClass}`}>{project.year}</span>
            </div>
          </div>
        </div>

      </div>

      {/* SEÇÃO O CLIENTE */}
      {project.clientContext && (
        <section className="py-16 md:py-24 relative z-10">
          <div className="container-editorial max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span
                className="block text-[11px] uppercase tracking-[2px] font-bold mb-5"
                style={{ color: project.heroGradient?.from ?? "#FFCA16" }}
              >
                CONTEXTO
              </span>
              <h2 className="text-[24px] font-medium mb-5" style={{ color: project.heroGradient?.titleColor ?? "#FFFFFF" }}>
                O Cliente
              </h2>
              <div
                className="bg-white/5 rounded-[12px] p-5"
                style={{ border: "0.5px solid rgba(255,255,255,0.1)" }}
              >
                <p
                  className="text-base font-bold mb-3"
                  style={{ color: project.heroGradient?.titleColor ?? "#FFFFFF" }}
                >
                  {project.clientContext.label}
                </p>
                <p className="text-base leading-[1.6]" style={{ color: project.heroGradient?.subtitleColor ?? "#D4A574" }}>
                  {project.clientContext.description}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* SEÇÃO SOBRE O PROJETO */}
      {project.about && (
        <section className={`py-24 md:py-48 relative z-10 border-t ${borderColorClass}`}>
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
                <p className={`text-xl md:text-3xl font-light leading-relaxed ${textColorClass}`}>
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
              <p className={`text-xl md:text-3xl font-light leading-relaxed ${textColorClass}`}>
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
              <p className={`text-xl md:text-3xl font-light leading-relaxed ${textColorClass}`}>
                {project.objective || project.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DETAILED PROJECT CONTENT */}
      {project.slug === 'tabernaculo-da-trindade' ? (
        <section className="pb-32 relative z-10">
          <div className="container-editorial">
            {/* 1. Apresentação is handled by aboutSection if exists, but we can also use concept if about is already used */}
            
            {/* 2. Logotipo */}
            {project.variations && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Logotipo
                </h2>
                <p className={`text-xl font-light leading-relaxed ${textColorClass} max-w-4xl mb-16 whitespace-pre-line`}>
                  {project.variations}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src="https://wqxuprmlsapiucjxleih.supabase.co/storage/v1/object/public/files/821942c8-3535-4657-b648-1098db1d9a97-logos.png" 
                    alt="Logotipo" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 3. Monograma */}
            {project.monogram && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Monograma
                </h2>
                <p className={`text-xl font-light leading-relaxed ${textColorClass} max-w-4xl mb-16 whitespace-pre-line`}>
                  {project.monogram}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src="https://wqxuprmlsapiucjxleih.supabase.co/storage/v1/object/public/files/bc8bf15b-5e55-4292-b9e7-caaef09d5f26-monogr.png" 
                    alt="Monograma" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 4. Grid de Construção */}
            {project.construction && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Grid de Construção
                </h2>
                <p className={`text-xl font-light leading-relaxed ${textColorClass} max-w-4xl mb-16 whitespace-pre-line`}>
                  {project.construction}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src="https://wqxuprmlsapiucjxleih.supabase.co/storage/v1/object/public/files/bbf4a01b-15bd-4ea7-b5e0-8c10704aa2a0-grid.png" 
                    alt="Grid de Construção" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 5. Símbolo */}
            {project.symbol && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Símbolo
                </h2>
                <p className={`text-xl font-light leading-relaxed ${textColorClass} max-w-4xl mb-16 whitespace-pre-line`}>
                  {project.symbol}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src="https://wqxuprmlsapiucjxleih.supabase.co/storage/v1/object/public/files/f0a96053-23a5-46e2-9784-8c2af917a020-simbol.png" 
                    alt="Símbolo" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 6. Simbologia Bíblica */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-48"
            >
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                Simbologia Bíblica
              </h2>
              <div className="w-full flex justify-center py-8 md:py-12">
                <ScrollAnimatedImage 
                  src="https://wqxuprmlsapiucjxleih.supabase.co/storage/v1/object/public/files/7110538a-fc67-4427-9d44-b56b510b7dd5-simbol-bibl.png" 
                  alt="Simbologia Bíblica" 
                  className="w-full h-auto" 
                />
              </div>
            </motion.div>

            {/* 7. Identidade em Inglês */}
            {project.englishIdentity && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Identidade em Inglês
                </h2>
                <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl mb-16 whitespace-pre-line">
                  {project.englishIdentity}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src="https://wqxuprmlsapiucjxleih.supabase.co/storage/v1/object/public/files/1426db45-be6c-46ab-8a8b-72f9ffdb3423-ingles.png" 
                    alt="Identidade em Inglês" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 8. Logotipo para Missões */}
            {project.missionsLogo && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Logotipo para Missões
                </h2>
                <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl mb-16 whitespace-pre-line">
                  {project.missionsLogo}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12 bg-white/5 border border-dashed border-white/20 rounded-lg min-h-[400px] items-center">
                  <span className="text-white/40 uppercase tracking-widest text-xs font-medium">Imagem Missões em breve</span>
                </div>
              </motion.div>
            )}

            {/* 9. Variações do Logotipo */}
            {project.secondaryVariations && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Variações do Logotipo
                </h2>
                <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl mb-16 whitespace-pre-line">
                  {project.secondaryVariations}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src="https://wqxuprmlsapiucjxleih.supabase.co/storage/v1/object/public/files/87f0bd43-2888-414f-a38d-be82824962de-variation.png" 
                    alt="Variações do Logotipo" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 10. Logotipo Animado */}
            {project.animatedLogoVideo && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Logotipo Animado
                </h2>
                <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl mb-16 whitespace-pre-line">
                  {project.animatedLogoDescription}
                </p>
                <div className="w-full aspect-video bg-white/5 border border-white/10 rounded-lg overflow-hidden relative">
                  <video 
                    src={project.animatedLogoVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}

            {/* 11. Paleta de Cores */}
            {project.colors && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Paleta de Cores
                </h2>
                <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl mb-16 whitespace-pre-line">
                  {project.colors}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src="https://wqxuprmlsapiucjxleih.supabase.co/storage/v1/object/public/files/25a708fa-393f-40c1-b0a8-660771ab3bdd-paleta.png" 
                    alt="Paleta de Cores" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 12. Tipografia */}
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
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src="https://wqxuprmlsapiucjxleih.supabase.co/storage/v1/object/public/files/daff8522-e34f-446a-85fc-4be8aa1642f9-tipo.png" 
                    alt="Tipografia" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 13. Aplicações Proibidas */}
            {project.nonRecommended && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4">
                  Aplicações Proibidas
                </h2>
                <p className="text-xl font-light leading-relaxed text-white/80 max-w-4xl mb-16 whitespace-pre-line">
                  {project.nonRecommended}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src="https://wqxuprmlsapiucjxleih.supabase.co/storage/v1/object/public/files/baf7dc22-53b8-4644-a4c9-7d77023d9d5c-proib.png" 
                    alt="Aplicações Proibidas" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 14. Resultado */}
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
      ) : project.slug === 'construmar' ? (
        <section className="pb-32 relative z-10">
          <div className="container-editorial">
            {/* 1. Logotipo */}
            {project.concept && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className={`text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4`}>
                  Logotipo
                </h2>
                <p className={`text-xl font-light leading-relaxed ${textColorClass} max-w-4xl mb-16 whitespace-pre-line`}>
                  {project.concept}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src={project.pages[0]} 
                    alt="Logotipo" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 2. Versões do Logotipo */}
            {project.variations && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className={`text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4`}>
                  Versões do Logotipo
                </h2>
                <p className={`text-xl font-light leading-relaxed ${textColorClass} max-w-4xl mb-16 whitespace-pre-line`}>
                  {project.variations}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src={project.pages[1]} 
                    alt="Versões do Logotipo" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 3. Paleta de Cores */}
            {project.colors && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className={`text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4`}>
                  Paleta de Cores
                </h2>
                <p className={`text-xl font-light leading-relaxed ${textColorClass} max-w-4xl mb-16 whitespace-pre-line`}>
                  {project.colors}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src={project.pages[2]} 
                    alt="Paleta de Cores" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 4. Versões monocromáticas */}
            {project.secondaryVariations && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className={`text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4`}>
                  Versões monocromáticas
                </h2>
                <p className={`text-xl font-light leading-relaxed ${textColorClass} max-w-4xl mb-16 whitespace-pre-line`}>
                  {project.secondaryVariations}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src={project.secondaryVariationsImage} 
                    alt="Versões monocromáticas" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 5. Grid de construção */}
            {project.construction && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className={`text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4`}>
                  Grid de construção
                </h2>
                <p className={`text-xl font-light leading-relaxed ${textColorClass} max-w-4xl mb-16 whitespace-pre-line`}>
                  {project.construction}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src={project.pages[4]} 
                    alt="Grid de construção" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 6. Redução mínima */}
            {project.minimumReduction && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className={`text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4`}>
                  Redução mínima
                </h2>
                <p className={`text-xl font-light leading-relaxed ${textColorClass} max-w-4xl mb-16 whitespace-pre-line`}>
                  {project.minimumReduction}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src={project.minimumReductionImage} 
                    alt="Redução mínima" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 7. Tipografia */}
            {project.typography && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className={`text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4`}>
                  Tipografia
                </h2>
                <p className={`text-xl font-light leading-relaxed ${textColorClass} max-w-4xl mb-16 whitespace-pre-line`}>
                  {project.typography}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src={project.pages[6]} 
                    alt="Tipografia" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 8. Aplicações permitidas */}
            {project.applications && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className={`text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4`}>
                  Aplicações permitidas
                </h2>
                <p className={`text-xl font-light leading-relaxed ${textColorClass} max-w-4xl mb-16 whitespace-pre-line`}>
                  {project.applications}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src={project.pages[7]} 
                    alt="Aplicações permitidas" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 9. Aplicações Proíbidas */}
            {project.nonRecommended && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-48"
              >
                <h2 className={`text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4`}>
                  Aplicações Proíbidas
                </h2>
                <p className={`text-xl font-light leading-relaxed ${textColorClass} max-w-4xl mb-16 whitespace-pre-line`}>
                  {project.nonRecommended}
                </p>
                <div className="w-full flex justify-center py-8 md:py-12">
                  <ScrollAnimatedImage 
                    src={project.pages[8]} 
                    alt="Aplicações Proíbidas" 
                    className="w-full h-auto" 
                  />
                </div>
              </motion.div>
            )}

            {/* 10. Resultado */}
            {project.finalResult && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`py-24 border-t ${borderColorClass}`}
              >
                <h2 className={`text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-12 flex items-center gap-4`}>
                  Resultado
                </h2>
                <p className={`text-xl md:text-3xl font-light leading-relaxed ${textColorClass} max-w-4xl`}>
                  {project.finalResult}
                </p>
              </motion.div>
            )}
          </div>
        </section>
      ) : project.concept ? (
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
      {(() => {
        const nextBgMap: Record<string, string> = {
          "akedah-podcast": "#2C1A0F",
          "tabernaculo-da-trindade": "#05121C",
          "team-luisa-crosstraining": "#030304",
        };
        const nextBg = nextBgMap[nextProject.slug] || "#F5F4EF";
        const isDarkNext = nextBg !== "#F5F4EF";

        return (
      <section className="py-40 md:py-80 border-t border-white/5 relative overflow-hidden group" style={{ backgroundColor: nextBg }}>
        <Link to={`/project/${nextProject.slug}`} className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-no-repeat bg-center opacity-100 group-hover:scale-110 transition-all duration-[2s]"
            style={{ 
              backgroundImage: `url(${nextProject.nextProjectLogo || nextProject.pages[0]})`,
              backgroundColor: nextBg,
              backgroundSize: "60% auto",
            }}
          />
        </Link>
        
        <div className="container-editorial relative z-10 pointer-events-none">
          <div className="flex flex-col items-center text-center">
            <span className={`text-[11.5px] uppercase tracking-[0.6em] font-bold -translate-y-[200px] ${isDarkNext ? "text-white/80" : "text-black"}`}>
              Próximo Projeto
            </span>
            
            <Link 
              to={`/project/${nextProject.slug}`}
              className={`pointer-events-auto group/btn relative inline-flex items-center justify-center px-16 py-8 overflow-hidden border transition-all duration-700 hover:border-[#FFCA16] translate-y-[250px] ${isDarkNext ? "border-white/40" : "border-black/20"}`}
            >
              <div className="absolute inset-0 bg-[#FFCA16] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-600 ease-[0.22,1,0.36,1]" />
              <span className={`relative z-10 text-[12px] uppercase tracking-[0.4em] font-bold transition-colors duration-500 ${isDarkNext ? "text-white group-hover/btn:text-black" : "text-black"}`}>
                Continuar Jornada
              </span>
            </Link>
          </div>
        </div>
      </section>
        );
      })()}


      <Footer />
    </motion.div>
  );
};

export default ProjectDetail;
