import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Build varied gallery composition
  const gallery = project.pages;

  return (
    <div className="min-h-screen bg-[#070807] text-white overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-40 md:pt-48 pb-24 md:pb-32 border-b border-white/[0.05]">
        <div className="absolute inset-0 grid-pattern opacity-[0.2] pointer-events-none" />
        <div
          className="absolute left-1/2 top-[20%] -translate-x-1/2 w-[60%] aspect-square rounded-full blur-[180px] pointer-events-none opacity-40"
          style={{ background: project.bgColor }}
        />

        <div className="container-editorial relative z-10">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <Link
              to="/#portfolio"
              className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-[#FFCA16] transition-colors duration-500"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="group-hover:-translate-x-1 transition-transform duration-500">
                <path d="M15.8334 10H4.16669M4.16669 10L9.16669 15M4.16669 10L9.16669 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Voltar ao portfólio
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[11px] tracking-[0.4em] text-[#FFCA16]">
                CASE N°{String(project.id).padStart(3, "0")}
              </span>
              <span className="w-10 h-[1px] bg-[#FFCA16]/40" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">{project.category}</span>
            </div>

            <h1 className="font-display text-[56px] md:text-[120px] xl:text-[160px] font-[800] leading-[0.85] tracking-[-0.045em] text-balance">
              {project.title}
            </h1>

            <p className="mt-12 text-xl md:text-2xl font-light text-white/55 leading-relaxed max-w-3xl">
              {project.intro}
            </p>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-24 relative aspect-[16/10] overflow-hidden border border-white/[0.08] bg-[#080808]"
          >
            <div className="absolute inset-0 grid-pattern opacity-[0.08]" />
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(circle at center, ${project.bgColor}40 0%, transparent 70%)` }}
            />
            <div className="absolute inset-0 flex items-center justify-center p-16 md:p-32">
              <img
                src={project.logo}
                alt={project.title}
                className="max-w-full max-h-full object-contain filter drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
              />
            </div>
            <div className="absolute top-8 left-8 w-10 h-10 border-t border-l border-white/15" />
            <div className="absolute top-8 right-8 w-10 h-10 border-t border-r border-white/15" />
            <div className="absolute bottom-8 left-8 w-10 h-10 border-b border-l border-white/15" />
            <div className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-white/15" />
          </motion.div>
        </div>
      </section>

      {/* FICHA TÉCNICA */}
      <section className="py-24 md:py-32 border-b border-white/[0.05]">
        <div className="container-editorial">
          <motion.div {...fadeUp} className="mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#FFCA16]">Ficha técnica</span>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 md:gap-8"
          >
            {[
              { label: "Cliente", value: project.client },
              { label: "Ano", value: project.year },
              { label: "Serviço", value: project.service },
              { label: "Categoria", value: project.category },
              { label: "Papel", value: project.role },
              { label: "Páginas", value: `${project.pages.length} composições` },
            ].map((item) => (
              <div key={item.label} className="border-t border-white/[0.08] pt-6">
                <span className="block text-[9px] uppercase tracking-[0.4em] text-white/30 mb-3">
                  {item.label}
                </span>
                <span className="block text-base font-light text-white/85 leading-snug">
                  {item.value}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} className="mt-12 border-t border-white/[0.08] pt-6">
            <span className="block text-[9px] uppercase tracking-[0.4em] text-white/30 mb-4">Entregáveis</span>
            <div className="flex flex-wrap gap-2">
              {project.deliverables.map((d) => (
                <span
                  key={d}
                  className="px-4 py-2 border border-white/[0.08] text-[11px] uppercase tracking-[0.2em] text-white/60"
                >
                  {d}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* NARRATIVA */}
      <section className="py-24 md:py-40 border-b border-white/[0.05]">
        <div className="container-editorial">
          {[
            { label: "Desafio", title: "O ponto de partida", body: project.challenge },
            { label: "Estratégia", title: "Como pensamos", body: project.strategy },
            { label: "Solução", title: "O sistema visual", body: project.solution },
            { label: "Resultado", title: "Impacto entregue", body: project.result },
          ].map((block, i) => (
            <motion.div
              key={block.label}
              {...fadeUp}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-16 md:py-24 border-t border-white/[0.06] first:border-t-0"
            >
              <div className="md:col-span-3 flex md:flex-col gap-4 md:gap-2">
                <span className="font-mono text-[10px] text-[#FFCA16] tracking-[0.35em]">
                  0{i + 1}
                </span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                  {block.label}
                </span>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-display text-[36px] md:text-[56px] font-[800] leading-[0.95] tracking-tight mb-8 text-balance">
                  {block.title}
                </h3>
                <p className="text-lg md:text-xl font-light text-white/55 leading-relaxed max-w-3xl">
                  {block.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALERIA EDITORIAL */}
      <section className="py-24 md:py-32 border-b border-white/[0.05]">
        <div className="container-editorial">
          <motion.div {...fadeUp} className="mb-20 flex items-end justify-between gap-8 flex-wrap">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#FFCA16] block mb-4">
                Apresentação visual
              </span>
              <h2 className="font-display text-[40px] md:text-[64px] font-[800] leading-[0.95] tracking-tight">
                Sistema em <span className="text-[#FFCA16] italic font-light">aplicação</span>
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              {gallery.length} composições
            </span>
          </motion.div>

          {/* Editorial varied grid */}
          <div className="space-y-12 md:space-y-24">
            {gallery.map((src, i) => {
              // alternate composition: full-width, two-col, offset
              const layout = i % 5;
              if (layout === 0) {
                return (
                  <motion.div key={i} {...fadeUp} className="relative">
                    <div className="aspect-[16/10] overflow-hidden border border-white/[0.06] bg-[#0a0a0a]">
                      <motion.img
                        initial={{ scale: 1.08 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                        src={src}
                        alt={`${project.title} — composição ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-4 flex justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-white/25">
                      <span>{String(i + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span>
                      <span>Full spread</span>
                    </div>
                  </motion.div>
                );
              }
              if (layout === 1 && gallery[i + 1]) {
                return (
                  <motion.div key={i} {...fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <div className="aspect-[4/5] overflow-hidden border border-white/[0.06] bg-[#0a0a0a]">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-[4/5] overflow-hidden border border-white/[0.06] bg-[#0a0a0a] md:mt-24">
                      <img src={gallery[i + 1]} alt="" className="w-full h-full object-cover" />
                    </div>
                  </motion.div>
                );
              }
              if (layout === 1) return null; // handled above
              if (layout === 2) return null; // skip — used as pair partner above
              if (layout === 3) {
                return (
                  <motion.div key={i} {...fadeUp} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
                    <div className="md:col-span-8 aspect-[16/10] overflow-hidden border border-white/[0.06] bg-[#0a0a0a]">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="md:col-span-4">
                      <span className="text-[10px] uppercase tracking-[0.4em] text-[#FFCA16] block mb-4">
                        Detalhe
                      </span>
                      <p className="text-base font-light text-white/55 leading-relaxed">
                        Composição editorial cuidadosamente diagramada para preservar a hierarquia, o ritmo e a respiração do sistema visual.
                      </p>
                    </div>
                  </motion.div>
                );
              }
              return (
                <motion.div key={i} {...fadeUp} className="md:px-16">
                  <div className="aspect-[3/2] overflow-hidden border border-white/[0.06] bg-[#0a0a0a]">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRÓXIMO PROJETO */}
      <section className="py-32 md:py-48 border-b border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.15] pointer-events-none" />
        <div className="container-editorial relative z-10">
          <motion.div {...fadeUp} className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Próximo case</span>
          </motion.div>

          <Link to={`/projeto/${nextProject.slug}`} className="group block">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7">
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#FFCA16] block mb-6">
                  {nextProject.category} · {nextProject.year}
                </span>
                <motion.h2
                  whileHover={{ x: 12 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-[56px] md:text-[120px] font-[800] leading-[0.88] tracking-[-0.045em] text-white group-hover:text-[#FFCA16] transition-colors duration-700 text-balance"
                >
                  {nextProject.title}
                </motion.h2>
                <div className="mt-10 inline-flex items-center gap-6">
                  <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/60 group-hover:text-white transition-colors duration-500">
                    Continuar a jornada
                  </span>
                  <div className="relative w-14 h-14 rounded-full border border-white/15 flex items-center justify-center overflow-hidden group-hover:border-[#FFCA16] transition-colors duration-500">
                    <div className="absolute inset-0 bg-[#FFCA16] scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="relative z-10 text-white group-hover:text-black transition-colors duration-500">
                      <path d="M4.16663 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="md:col-span-5">
                <div
                  className="aspect-[4/5] relative overflow-hidden border border-white/[0.08] bg-[#080808]"
                  style={{ background: `radial-gradient(circle at center, ${nextProject.bgColor}30 0%, #080808 70%)` }}
                >
                  <div className="absolute inset-0 grid-pattern opacity-[0.08]" />
                  <div className="absolute inset-0 flex items-center justify-center p-20">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      src={nextProject.logo}
                      alt={nextProject.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA FECHAMENTO */}
      <section className="py-32 md:py-40">
        <div className="container-editorial">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center md:text-left">
              <h3 className="font-display text-[36px] md:text-[64px] font-[800] leading-[0.95] tracking-tight mb-6">
                Vamos criar o seu <span className="text-[#FFCA16] italic font-light">próximo case</span>?
              </h3>
              <p className="text-white/50 text-lg font-light max-w-xl">
                Construímos marcas memoráveis com método, estratégia e direção visual de estúdio.
              </p>
            </div>
            <Link to="/#contato" className="btn-premium whitespace-nowrap">
              Iniciar projeto
            </Link>
          </motion.div>

          <motion.div {...fadeUp} className="mt-16 pt-12 border-t border-white/[0.06] flex justify-between items-center">
            <Link
              to="/#portfolio"
              className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-[#FFCA16] transition-colors duration-500"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="group-hover:-translate-x-1 transition-transform duration-500">
                <path d="M15.8334 10H4.16669M4.16669 10L9.16669 15M4.16669 10L9.16669 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Voltar ao portfólio
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
              N°{String(project.id).padStart(3, "0")} · Studio Kiiro
            </span>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
