import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowLeft, ExternalLink, Sparkles, Check, Copy } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimatedImage from "@/components/ScrollAnimatedImage";
import ProjectHero from "@/components/ProjectHero";
import { getAllCases, getCaseBySlug } from "@/services/caseService";
import { toast } from "sonner";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const allProjects = getAllCases();
  const project = slug ? getCaseBySlug(slug) || allProjects.find((p) => p.slug === slug) : undefined;
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!project) return <Navigate to="/cases" replace />;

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const isLightBg = project.bgColor?.toLowerCase() === "#ffffff" || project.bgColor?.toLowerCase() === "white";
  const textColorClass = isLightBg ? "text-black/80" : "text-white/80";
  const mutedTextColorClass = isLightBg ? "text-black/60" : "text-white/60";
  const borderColorClass = isLightBg ? "border-black/10" : "border-white/10";

  const darkInteriorSlugs = ["akedah-podcast", "construmar", "tabernaculo-da-trindade", "team-luisa-crosstraining"];
  const pageBgColor = darkInteriorSlugs.includes(project.slug) ? "#030304" : (project.bgColor || "#000000");

  const handleCopyColor = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      toast.success(`Cor ${hex} copiada!`);
      setTimeout(() => setCopiedHex(null), 2500);
    } catch {
      toast.error("Erro ao copiar cor.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen ${isLightBg ? "text-[#1A1A1A]" : "text-white"} selection:bg-[#FFCA16] selection:text-black overflow-x-hidden`}
      style={{ backgroundColor: pageBgColor }}
    >
      <SEO
        title={`${project.title} — Studio Kiiro`}
        description={project.subtitle || project.intro || `Case de ${project.category} desenvolvido pelo Studio Kiiro.`}
        image={project.pages[0]}
        url={`https://studiokiiro.com/projeto/${project.slug}`}
        type="article"
      />
      <Navbar forceBlack={!isLightBg} />

      {/* Hero Section */}
      <div className="container-editorial pt-32 md:pt-40 pb-8">
        {/* Back Link to Cases */}
        <div className="mb-6">
          <Link
            to="/cases"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-[#FFCA16] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para todos os cases
          </Link>
        </div>

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

      {/* Seção O Cliente / Contexto (se houver) */}
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
              <h2 className="text-[24px] font-medium mb-5 text-white">
                O Cliente
              </h2>
              <div className="bg-white/5 rounded-[12px] p-6 border border-white/10">
                <p className="text-base font-bold mb-3 text-white">
                  {project.clientContext.label}
                </p>
                <p className="text-base leading-[1.6] text-white/70">
                  {project.clientContext.description}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Seção Sobre o Projeto (se houver) */}
      {project.about && (
        <section className={`py-20 md:py-32 relative z-10 border-t ${borderColorClass}`}>
          <div className="container-editorial max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-8 flex items-center gap-4">
                Sobre o projeto
              </h2>
              <p className={`text-xl md:text-2xl font-light leading-relaxed ${textColorClass}`}>
                {project.about}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Desafio e Solução */}
      {(project.challenge || project.solution || project.objective) && (
        <section className={`py-20 md:py-32 relative z-10 border-t ${borderColorClass}`}>
          <div className="container-editorial">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
              {project.challenge && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-8 flex items-center gap-4">
                    O Desafio
                  </h2>
                  <p className={`text-lg md:text-xl font-light leading-relaxed ${textColorClass}`}>
                    {project.challenge}
                  </p>
                </motion.div>
              )}

              {(project.objective || project.solution) && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-8 flex items-center gap-4">
                    {project.objective ? "O Objetivo" : "A Solução"}
                  </h2>
                  <p className={`text-lg md:text-xl font-light leading-relaxed ${textColorClass}`}>
                    {project.objective || project.solution}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Seção de Conceito Visual / Variações */}
      {project.concept && (
        <section className={`py-20 md:py-32 relative z-10 border-t ${borderColorClass}`}>
          <div className="container-editorial max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-8 flex items-center gap-4">
                Conceito & Sistema de Marca
              </h2>
              <p className={`text-lg md:text-xl font-light leading-relaxed whitespace-pre-line ${textColorClass}`}>
                {project.concept}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Seções Específicas de Identidade Visual (Renderizadas condicionalmente) */}
      <section className="pb-16 relative z-10">
        <div className="container-editorial space-y-28 md:space-y-36">
          {/* Variações do Logotipo */}
          {project.variations && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-6 flex items-center gap-4">
                Variações do Logotipo
              </h2>
              <p className={`text-lg font-light leading-relaxed ${textColorClass} max-w-4xl mb-12 whitespace-pre-line`}>
                {project.variations}
              </p>
              {project.secondaryVariationsImage && (
                <div className="w-full flex justify-center py-6">
                  <ScrollAnimatedImage src={project.secondaryVariationsImage} alt="Variações do Logotipo" className="w-full h-auto rounded-xl" />
                </div>
              )}
            </motion.div>
          )}

          {/* Grid de Construção */}
          {project.construction && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-6 flex items-center gap-4">
                Grid de Construção & Proporções
              </h2>
              <p className={`text-lg font-light leading-relaxed ${textColorClass} max-w-4xl mb-12 whitespace-pre-line`}>
                {project.construction}
              </p>
            </motion.div>
          )}

          {/* Símbolo ou Monograma */}
          {(project.symbol || project.monogram) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-6 flex items-center gap-4">
                {project.monogram ? "Monograma & Símbolo" : "Símbolo de Apoio"}
              </h2>
              <p className={`text-lg font-light leading-relaxed ${textColorClass} max-w-4xl mb-12 whitespace-pre-line`}>
                {project.monogram || project.symbol}
              </p>
              {project.monogramImage && (
                <div className="w-full flex justify-center py-6">
                  <ScrollAnimatedImage src={project.monogramImage} alt="Monograma" className="w-full h-auto rounded-xl" />
                </div>
              )}
            </motion.div>
          )}

          {/* Cores e Tipografia */}
          {(project.colors || project.typography) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {project.colors && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-6 flex items-center gap-4">
                    Paleta de Cores
                  </h2>
                  <p className={`text-base font-light leading-relaxed ${textColorClass} whitespace-pre-line`}>
                    {project.colors}
                  </p>
                </motion.div>
              )}

              {project.typography && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-6 flex items-center gap-4">
                    Tipografia Oficial
                  </h2>
                  <p className={`text-base font-light leading-relaxed ${textColorClass} whitespace-pre-line`}>
                    {project.typography}
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {/* Bloco de Vídeo / Motion / Vinheta (se houver) */}
          {project.videoBlock && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="py-12 border-t border-white/10"
            >
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-6 flex items-center gap-4">
                {project.videoBlock.title || "Motion & Vinheta"}
              </h2>
              {project.videoBlock.description && (
                <p className={`text-base font-light leading-relaxed ${textColorClass} max-w-4xl mb-8`}>
                  {project.videoBlock.description}
                </p>
              )}
              <div className="w-full flex justify-center rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={project.videoBlock.url}
                  alt={project.videoBlock.title}
                  className="w-full h-auto max-h-[700px] object-cover"
                />
              </div>
            </motion.div>
          )}

          {/* Métricas / Antes e Depois / Resultados (SOMENTE RENDERIZA SE EXISTIR!) */}
          {(project.finalResult || project.result) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="py-16 border-t border-white/10"
            >
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold mb-8 flex items-center gap-4">
                Impacto & Resultado
              </h2>
              <p className={`text-xl md:text-2xl font-light leading-relaxed ${textColorClass} max-w-4xl`}>
                {project.finalResult || project.result}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Galeria de Entregáveis / Páginas */}
      {project.pages && project.pages.length > 0 && (
        <section className="pb-32 md:pb-48 relative z-10">
          <div className="container-editorial mb-12">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold flex items-center gap-4">
              Galeria de Aplicações & Entregáveis
            </h2>
          </div>

          <div className="flex flex-col gap-12 md:gap-24">
            {project.pages.map((img: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1 }}
                className="w-full px-4 md:px-0 container-editorial"
              >
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                  <ScrollAnimatedImage
                    src={img}
                    alt={`${project.title} - Aplicação ${i + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Back to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-10 right-10 z-[100]"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-12 h-12 bg-[#FFCA16] text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Próximo Projeto — Navegação Infinita */}
      {nextProject && (
        <section
          className="py-32 md:py-60 border-t border-white/10 relative overflow-hidden group"
          style={{ backgroundColor: nextProject.bgColor || "#0B0C0B" }}
        >
          <Link to={`/projeto/${nextProject.slug}`} className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-no-repeat bg-center opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              style={{
                backgroundImage: `url(${nextProject.coverImage || nextProject.pages[0]})`,
                backgroundSize: "cover",
              }}
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
          </Link>

          <div className="container-editorial relative z-10 pointer-events-none flex flex-col items-center text-center">
            <span className="text-[11px] uppercase tracking-[0.6em] font-bold text-[#FFCA16] mb-4">
              Próximo Case
            </span>
            <h3 className="text-3xl md:text-5xl font-bold text-white font-display mb-8">
              {nextProject.title}
            </h3>
            <Link
              to={`/projeto/${nextProject.slug}`}
              className="pointer-events-auto px-10 py-4 rounded-full bg-[#FFCA16] text-black hover:bg-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl"
            >
              Explorar Projeto
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </motion.div>
  );
};

export default ProjectDetail;
