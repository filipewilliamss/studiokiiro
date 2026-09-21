import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getFeaturedCases } from "@/services/caseService";

const PortfolioSection = () => {
  const featuredProjects = getFeaturedCases();

  return (
    <section id="portfolio" className="relative bg-[#070807] py-28 md:py-40 overflow-hidden border-t border-white/[0.05]">
      {/* Background ambient lighting */}
      <div className="absolute top-[10%] left-[-15%] w-[45%] aspect-square bg-[#FFCA16]/[0.02] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[40%] aspect-square bg-[#FFCA16]/[0.02] rounded-full blur-[160px] pointer-events-none" />

      {/* Monumental backdrop word */}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute -left-6 md:-left-12 top-[4%] font-display font-[800] text-white/[0.015] md:text-white/[0.025] leading-none tracking-extratight pointer-events-none select-none"
        style={{ fontSize: "clamp(100px, 20vw, 320px)" }}
      >
        cases
      </motion.span>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FFCA16]" />
              <span className="text-[#FFCA16] text-[11px] font-bold uppercase tracking-[0.4em]">
                Portfólio Autoral
              </span>
            </div>
            <h2 className="font-display text-[44px] sm:text-[60px] md:text-[84px] font-[800] text-white leading-[0.88] tracking-[-0.04em]">
              Cases <span className="text-[#FFCA16] italic font-light">Selecionados.</span>
            </h2>
            <p className="mt-6 text-white/60 text-base md:text-xl font-light leading-relaxed max-w-2xl">
              Identidades visuais completas e plataformas concebidas com método, pesquisa e foco cirúrgico em diferenciação mercadológica.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <Link
              to="/cases"
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-[#FFCA16] hover:text-black border border-white/10 hover:border-[#FFCA16] text-white font-display text-xs uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-md"
            >
              <span>Ver Acervo Completo</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Editorial Grid of Featured Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {featuredProjects.map((project, index) => {
            const cover = project.heroBanner || project.coverImage || project.pages[0];
            const isWide = index === 0;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: (index % 2) * 0.15 }}
                data-cursor="view-case"
                className={`group relative rounded-3xl bg-[#0B0C0B] border border-white/[0.08] hover:border-[#FFCA16]/40 transition-all duration-700 overflow-hidden flex flex-col shadow-2xl ${
                  isWide ? "md:col-span-2" : "md:col-span-1"
                }`}
              >
                {/* Visual Image Container */}
                <Link
                  to={`/projeto/${project.slug}`}
                  data-cursor="view-case"
                  className={`relative w-full overflow-hidden bg-zinc-950 block ${
                    isWide ? "aspect-[16/9] lg:aspect-[21/9]" : "aspect-[16/10]"
                  }`}
                >
                  <img
                    src={cover}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />

                  {/* Dark gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                  {/* Top floating metadata badges */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-widest text-[#FFCA16] border border-[#FFCA16]/30 shadow-lg">
                      {project.category}
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/70 border border-white/10">
                      {project.year}
                    </span>
                  </div>

                  {/* Hover Floating Arrow Pill */}
                  <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-black/80 border border-white/20 backdrop-blur-md flex items-center justify-center text-[#FFCA16] opacity-0 group-hover:opacity-100 group-hover:scale-110 group-hover:bg-[#FFCA16] group-hover:text-black transition-all duration-300 z-10 shadow-2xl">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </Link>

                {/* Content Details */}
                <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-1 bg-[#0c0d0c]/80 backdrop-blur-sm">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-white/40 mb-3">
                      <span className="text-[#FFCA16]/80 font-bold">CASE 0{index + 1}</span>
                      <span>·</span>
                      <span>{project.client || "Studio Kiiro"}</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-[800] text-white tracking-tight leading-tight group-hover:text-[#FFCA16] transition-colors duration-300">
                      <Link to={`/projeto/${project.slug}`} data-cursor="view-case">
                        {project.title}
                      </Link>
                    </h3>

                    <p className="text-white/60 text-sm sm:text-base font-light mt-3 leading-relaxed line-clamp-2 max-w-3xl">
                      {project.subtitle || project.intro || project.about}
                    </p>
                  </div>

                  {/* Bottom Action Line */}
                  <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {project.tags?.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono uppercase tracking-wider text-white/40 bg-white/[0.03] px-2.5 py-1 rounded border border-white/[0.05]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/projeto/${project.slug}`}
                      data-cursor="view-case"
                      className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-[#FFCA16] hover:text-white transition-colors"
                    >
                      <span>Ver Estudo</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Explore All Cases Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 md:mt-24 p-8 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-b from-[#111211] to-[#070807] text-center flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-[#FFCA16]/10 blur-[90px] rounded-full pointer-events-none" />

          <span className="text-[11px] uppercase tracking-[0.5em] text-[#FFCA16] font-bold block mb-4">
            Acervo Completo Studio Kiiro
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-[800] font-display text-white max-w-xl mb-4 leading-tight">
            Mais projetos, marcas e plataformas.
          </h3>
          <p className="text-white/60 text-sm sm:text-base font-light max-w-lg mx-auto mb-8">
            Explore nossa galeria completa com filtros por serviço, estudos aprofundados e materiais entregues.
          </p>
          <Link
            to="/cases"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FFCA16] text-black hover:bg-white font-display font-bold text-xs uppercase tracking-[0.25em] transition-all duration-300 shadow-[0_4px_25px_rgba(255,202,22,0.3)] hover:shadow-[0_4px_35px_rgba(255,255,255,0.3)] hover:scale-[1.02]"
          >
            <span>Explorar Todos os Cases</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;