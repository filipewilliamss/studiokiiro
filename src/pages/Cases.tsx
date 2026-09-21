import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Filter, ExternalLink, ArrowUpRight } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllCases } from "@/services/caseService";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "Todos",
  "Identidade Visual",
  "Branding",
  "Social Media",
  "Sites / Landing Pages",
  "Vídeo & Motion",
];

const Cases = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const allCases = getAllCases();

  const filteredCases = useMemo(() => {
    if (selectedCategory === "Todos") return allCases;
    const cat = selectedCategory.toLowerCase();
    return allCases.filter((p) => {
      const projectCat = p.category.toLowerCase();
      if (cat.includes("identidade") && projectCat.includes("identidade")) return true;
      if (cat.includes("branding") && projectCat.includes("branding")) return true;
      if (cat.includes("social") && (projectCat.includes("social") || projectCat.includes("conteúdo"))) return true;
      if (cat.includes("site") && (projectCat.includes("site") || projectCat.includes("landing"))) return true;
      if (cat.includes("vídeo") && (projectCat.includes("vídeo") || projectCat.includes("video") || projectCat.includes("motion"))) return true;
      return projectCat.includes(cat);
    });
  }, [allCases, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#070807] text-white selection:bg-[#FFCA16] selection:text-black overflow-x-hidden">
      <SEO
        title="Cases & Portfólio — Studio Kiiro"
        description="Explore nossos projetos selecionados em identidade visual, branding, design de conteúdo e desenvolvimento web de alta performance."
        url="https://studiokiiro.com/cases"
      />
      <Navbar forceBlack />

      {/* Hero Editorial */}
      <section className="pt-40 md:pt-48 pb-16 relative overflow-hidden">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFCA16]/10 border border-[#FFCA16]/30 text-[#FFCA16] text-[11px] font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Portfólio de Marcas
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight text-white leading-[1.05] mb-6">
              Projetos que definem presença e autoridade.
            </h1>
            <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed">
              Do conceito à aplicação: uma seleção criteriosa de identidades visuais, marcas e plataformas desenvolvidas pelo Studio Kiiro.
            </p>
          </motion.div>

          {/* Filtros de Categoria */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 flex flex-wrap gap-2.5 pb-2"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? "bg-[#FFCA16] text-black shadow-lg shadow-[#FFCA16]/20 font-bold"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Grid de Cases */}
      <section className="pb-32 relative">
        <div className="container-editorial">
          {filteredCases.length === 0 ? (
            <div className="py-24 text-center rounded-3xl border border-white/10 bg-black/40">
              <p className="text-white/40 text-sm">
                Nenhum case encontrado nesta categoria no momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {filteredCases.map((project, index) => {
                const cover = project.coverImage || project.pages[0];
                return (
                  <motion.article
                    key={project.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: (index % 2) * 0.15 }}
                    data-cursor="view-case"
                    className="group flex flex-col bg-[#0B0C0B] border border-white/10 hover:border-[#FFCA16]/40 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 shadow-xl"
                  >
                    <Link to={`/projeto/${project.slug}`} data-cursor="view-case" className="relative aspect-[16/10] overflow-hidden bg-zinc-950 block">
                      <img
                        src={cover}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                      {/* Tag de Categoria flutuante */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-[#FFCA16] border border-[#FFCA16]/30">
                          {project.category}
                        </span>
                      </div>

                      <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FFCA16] group-hover:text-black">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </Link>

                    <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between gap-6">
                      <div>
                        <div className="flex items-center justify-between text-xs text-white/40 mb-2">
                          <span>{project.client || "Studio Kiiro"}</span>
                          <span>{project.year}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white group-hover:text-[#FFCA16] transition-colors">
                          <Link to={`/projeto/${project.slug}`} data-cursor="view-case">{project.title}</Link>
                        </h2>
                        <p className="text-sm text-white/60 mt-3 line-clamp-2 leading-relaxed">
                          {project.subtitle || project.intro || project.about}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <Link
                          to={`/projeto/${project.slug}`}
                          data-cursor="view-case"
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFCA16] hover:text-white transition-colors"
                        >
                          Ver Estudo Completo <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-24 border-t border-white/10 relative bg-black">
        <div className="container-editorial text-center max-w-3xl">
          <span className="text-xs uppercase tracking-[0.4em] font-bold text-[#FFCA16] block mb-4">
            Transforme seu Posicionamento
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-white mb-6">
            Pronto para ter uma marca inconfundível?
          </h2>
          <p className="text-white/60 text-base mb-8 max-w-xl mx-auto">
            Vamos conversar sobre os objetivos da sua empresa e planejar a próxima fase de crescimento com autoridade visual.
          </p>
          <a
            href="https://wa.me/5511991076096?text=Olá!%20Vi%20os%20cases%20do%20Studio%20Kiiro%20e%20gostaria%20de%20um%20orçamento%20para%20o%20meu%20projeto."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-[#FFCA16] text-black hover:bg-white font-bold text-xs uppercase tracking-widest px-8 h-12 rounded-full shadow-2xl transition-all">
              Iniciar Meu Projeto
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cases;
