import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { playPageFlip } from "@/utils/soundEffects";
import akedahLogo from "@/assets/akedah-logo.png";
import construmarLogo from "@/assets/construmar-logo.png";
import tabernaculoLogo from "@/assets/capa-tabernaculo.png";
import teamluisaLogo from "@/assets/teamluisa-logo.png";

const CASE_ITEMS = [
  {
    slug: "akedah-podcast",
    number: "01",
    tag: "IDENTIDADE VISUAL · 2025",
    logo: akedahLogo,
    alt: "Akedah Podcast",
    bgColor: "#1f140e",
    isLight: false,
    logoWidth: "max-w-[340px] sm:max-w-[440px] md:max-w-[560px]",
  },
  {
    slug: "construmar",
    number: "02",
    tag: "LOGOTIPO ESSENCIAL · 2025",
    logo: construmarLogo,
    alt: "Construmar Marmoraria",
    bgColor: "#f0efe9",
    isLight: true,
    logoWidth: "max-w-[320px] sm:max-w-[420px] md:max-w-[520px]",
  },
  {
    slug: "tabernaculo-da-trindade",
    number: "03",
    tag: "IDENTIDADE VISUAL · 2026",
    logo: tabernaculoLogo,
    alt: "Tabernáculo da Trindade",
    bgColor: "#05121c",
    isLight: false,
    logoWidth: "max-w-[440px] sm:max-w-[680px] md:max-w-[920px]",
  },
  {
    slug: "team-luisa-crosstraining",
    number: "04",
    tag: "LOGOTIPO ESSENCIAL · 2024",
    logo: teamluisaLogo,
    alt: "Team Luisa Cross Training",
    bgColor: "#141515",
    isLight: false,
    logoWidth: "max-w-[340px] sm:max-w-[460px] md:max-w-[620px]",
  },
];

const ImmersivePortfolioSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="portfolio" className="relative isolate overflow-hidden">
      {CASE_ITEMS.map((item, index) => (
        <article
          key={item.slug}
          className="relative flex min-h-[90svh] md:min-h-screen flex-col justify-between overflow-hidden px-6 py-10 sm:px-12 md:py-16 md:px-20 select-none border-t border-black/10"
          style={{ backgroundColor: item.bgColor }}
        >
          {/* TOPO: Categoria · Ano */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="z-10 flex w-full justify-center pt-2 sm:pt-4"
          >
            <span
              className={`font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.28em] ${
                item.isLight ? "text-[#1e3545]" : "text-[#FFCA16]"
              }`}
            >
              {item.tag}
            </span>
          </motion.div>

          {/* CENTRO: Logotipo do Projeto */}
          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="z-10 my-auto flex w-full items-center justify-center py-12"
          >
            <img
              src={item.logo}
              alt={item.alt}
              className={`w-full ${item.logoWidth} object-contain transition-transform duration-700 hover:scale-[1.03]`}
              loading="lazy"
            />
          </motion.div>

          {/* RODAPÉ: Case/Progresso + Botão Arredondado + Indicador */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="z-10 grid w-full grid-cols-1 items-end gap-6 sm:grid-cols-3 pb-2 sm:pb-4"
          >
            {/* Esquerda: Contador de Case e Barras de Progresso */}
            <div className="flex flex-col gap-2 order-2 sm:order-1 items-center sm:items-start">
              <span
                className={`font-mono text-[10px] font-semibold uppercase tracking-[0.28em] ${
                  item.isLight ? "text-[#1e3545]/60" : "text-white/50"
                }`}
              >
                CASE {item.number} / 04
              </span>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {CASE_ITEMS.map((_, stepIdx) => {
                  const isActive = stepIdx === index;
                  return (
                    <span
                      key={stepIdx}
                      className={`h-[2px] transition-all duration-300 ${
                        isActive
                          ? `w-7 ${item.isLight ? "bg-[#1e3545]" : "bg-[#FFCA16]"}`
                          : `w-4 ${item.isLight ? "bg-[#1e3545]/20" : "bg-white/20"}`
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Centro: Botão com 4 bordas arredondadas (rounded-full) igual ao Hero e Cabeçalho */}
            <div className="flex justify-center order-1 sm:order-2">
              <Link
                to={`/projeto/${item.slug}`}
                data-cursor-project="ABRIR CASE"
                onClick={() => playPageFlip()}
                className={`group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full overflow-hidden border ${
                  item.isLight
                    ? "border-[#1e3545]/25 text-[#1e3545] hover:border-[#1e3545]"
                    : "border-white/20 text-white hover:border-[#FFCA16]"
                } font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] font-bold transition-all duration-300 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.15)]`}
              >
                <span
                  className={`absolute inset-0 w-full h-full ${
                    item.isLight ? "bg-[#1e3545]" : "bg-[#FFCA16]"
                  } rounded-full -translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none`}
                  aria-hidden="true"
                />
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    item.isLight ? "group-hover:text-white" : "group-hover:text-black"
                  } flex items-center gap-2`}
                >
                  VER PROJETO COMPLETO
                  <span className="text-sm">→</span>
                </span>
              </Link>
            </div>

            {/* Direita: Linha vertical indicativa sutil */}
            <div className="hidden sm:flex justify-end items-end order-3" aria-hidden="true">
              <span
                className={`h-7 w-[2px] ${
                  item.isLight ? "bg-[#1e3545]/30" : "bg-[#FFCA16]/80"
                }`}
              />
            </div>
          </motion.div>
        </article>
      ))}
    </section>
  );
};

export default ImmersivePortfolioSection;
