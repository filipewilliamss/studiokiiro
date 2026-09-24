import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedCases } from "@/services/caseService";
import { playPageFlip } from "@/utils/soundEffects";
import akedahCover from "@/assets/akedah-pagina-1.webp";
import construmarCover from "@/assets/construmar-pagina-1.webp";
import tabernaculoCover from "@/assets/tabernaculo-pagina-1.webp";
import teamLuisaCover from "@/assets/teamluisa-pagina-1.webp";

const localCovers: Record<string, string> = {
  "akedah-podcast": akedahCover,
  construmar: construmarCover,
  "tabernaculo-da-trindade": tabernaculoCover,
  "team-luisa-crosstraining": teamLuisaCover,
};

const ImmersivePortfolioSection = () => {
  const projects = getFeaturedCases();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section id="portfolio" className="relative isolate overflow-hidden bg-[#070807] text-white">
      <header className="sticky top-0 z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[#FFCA16]" aria-hidden="true" />
          <h2 className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">Portfólio</h2>
        </div>
        <p className="font-mono text-[10px] tabular-nums tracking-[0.2em] text-white/50" aria-live="polite">
          {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
      </header>

      {projects.map((project, index) => {
        const preferredImage = project.heroBanner || project.coverImage || project.pages.find(Boolean);
        const fallbackImage = localCovers[project.slug];

        return (
          <article
            key={project.slug}
            className="group relative flex min-h-[88svh] items-end overflow-hidden border-t border-white/12 md:min-h-[92svh]"
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <div className="absolute inset-0 bg-[#161715]" aria-hidden="true">
              {preferredImage && (
                <img
                  src={preferredImage}
                  alt=""
                  className="h-full w-full object-cover opacity-70 transition duration-[1400ms] ease-out group-hover:scale-[1.035] group-hover:opacity-80"
                  onError={(event) => {
                    if (fallbackImage && event.currentTarget.src !== new URL(fallbackImage, window.location.href).href) {
                      event.currentTarget.src = fallbackImage;
                    }
                  }}
                />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,7,0.08)_18%,rgba(7,8,7,0.9)_92%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(255,202,22,0.13),transparent_36%)]" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reduceMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-6 pb-14 pt-32 sm:px-10 md:pb-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:px-16"
            >
              <div className="max-w-4xl">
                <div className="mb-5 flex flex-wrap items-baseline gap-x-5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/62">
                  <span className="text-[#FFCA16]">{project.category}</span>
                  <span>{project.client}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="max-w-4xl text-[clamp(3.5rem,10vw,10rem)] font-black uppercase leading-[0.78] tracking-[-0.085em] text-balance">
                  {project.title}
                </h3>
                <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                  {project.subtitle || project.intro}
                </p>
              </div>

              <Link
                to={`/projeto/${project.slug}`}
                data-cursor-project="ABRIR CASE"
                onClick={() => playPageFlip()}
                className="group/link inline-flex w-fit items-center gap-3 border-b border-white/45 pb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:border-[#FFCA16] hover:text-[#FFCA16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCA16] focus-visible:ring-offset-4 focus-visible:ring-offset-[#070807]"
              >
                Ver projeto
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1" strokeWidth={1.5} />
              </Link>
            </motion.div>

            <div className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 font-mono text-[10px] tracking-[0.24em] text-white/45 sm:flex lg:right-16">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px w-14 bg-white/30" aria-hidden="true" />
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default ImmersivePortfolioSection;

