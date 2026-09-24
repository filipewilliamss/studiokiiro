import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import { getAllCases, getCaseBySlug } from "@/services/caseService";
import { playPageFlip } from "@/utils/soundEffects";
import studioLogo from "@/assets/logo.webp";
import type { Project } from "@/data/projects";
import "@/styles/project-detail.css";

type SpreadKind = "cover" | "story" | "visual" | "details" | "gallery" | "end";

interface BookSpread {
  kind: SpreadKind;
  title?: string;
  image?: string;
  images?: string[];
  text?: string;
  detail?: string;
  label?: string;
  next?: Project;
}

const shorten = (value: string | undefined, length = 260) => {
  if (!value) return "";
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= length) return clean;
  return `${clean.slice(0, length).replace(/[\s,;:.!?]+$/, "")}…`;
};

interface CaseImageProps {
  src?: string;
  fallback?: string;
  alt: string;
  className?: string;
}

const CaseImage = ({ src, fallback, alt, className = "" }: CaseImageProps) => {
  const [source, setSource] = useState(src || fallback || "");

  useEffect(() => {
    setSource(src || fallback || "");
  }, [src, fallback]);

  if (!source) {
    return (
      <div className={`kiiro-case-image-fallback ${className}`} aria-label={alt} role="img">
        <img src={studioLogo} alt="" aria-hidden="true" />
        <span>{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={source}
      alt={alt}
      className={className}
      loading="eager"
      onError={() => {
        if (fallback && source !== fallback) setSource(fallback);
        else setSource("");
      }}
    />
  );
};

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const allProjects = getAllCases();
  const project = slug ? getCaseBySlug(slug) || allProjects.find((item) => item.slug === slug) : undefined;
  const [currentSpread, setCurrentSpread] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [locked, setLocked] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const currentIndex = project ? Math.max(0, allProjects.findIndex((item) => item.slug === project.slug)) : 0;
  const nextProject = allProjects[(currentIndex + 1) % Math.max(allProjects.length, 1)];

  const spreads = useMemo<BookSpread[]>(() => {
    if (!project) return [];
    const images = project.pages.filter(Boolean);
    const coverImage = project.heroBanner || project.coverImage || images[0];
    const result: BookSpread[] = [
      { kind: "cover", title: project.title, image: coverImage, label: project.category },
      {
        kind: "story",
        title: "A intenção encontra forma",
        text: shorten(project.challenge || project.intro, 330),
        detail: shorten(project.solution || project.strategy, 230),
        image: images[1] || coverImage,
        label: "O ponto de partida",
      },
    ];

    if (images[2] || images[3]) {
      result.push({
        kind: "visual",
        title: "Um sistema para continuar",
        images: [images[2] || coverImage || "", images[3] || images[2] || coverImage || ""],
        label: "Identidade em movimento",
      });
    }

    if (project.colors || project.typography || project.concept) {
      result.push({
        kind: "details",
        title: "Decisões que sustentam a marca",
        text: shorten(project.concept || project.colors || project.typography, 330),
        detail: shorten(project.typography || project.colors, 220),
        image: images[4] || images[2] || coverImage,
        label: "O que permanece",
      });
    }

    images.slice(5, 10).forEach((image, index) => {
      result.push({ kind: "gallery", image, label: `Aplicação ${String(index + 1).padStart(2, "0")}` });
    });

    result.push({ kind: "end", next: nextProject, label: "Próximo projeto" });
    return result;
  }, [nextProject, project]);

  const totalSpreads = spreads.length;

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 900);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSpreads || index === currentSpread || locked) return;
      setDirection(index > currentSpread ? 1 : -1);
      setCurrentSpread(index);
      setLocked(true);
      playPageFlip();
      window.setTimeout(() => setLocked(false), 600);
    },
    [currentSpread, locked, totalSpreads],
  );

  const goNext = useCallback(() => goTo(currentSpread + 1), [currentSpread, goTo]);
  const goPrev = useCallback(() => goTo(currentSpread - 1), [currentSpread, goTo]);

  useEffect(() => {
    if (isMobile) return undefined;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 24 && Math.abs(event.deltaX) < 24) return;
      event.preventDefault();
      if (event.deltaY > 0 || event.deltaX > 0) goNext();
      else goPrev();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName || "")) return;
      if (["ArrowRight", "PageDown", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        goNext();
      } else if (["ArrowLeft", "PageUp", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [goNext, goPrev, isMobile]);

  if (!project) return <Navigate to="/cases" replace />;

  const active = spreads[currentSpread];
  const projectFallback = project.logo || project.pages.find(Boolean) || studioLogo;

  const renderSpread = (spread: BookSpread) => {
    switch (spread.kind) {
      case "cover":
        return (
          <div className="kiiro-spread kiiro-spread-cover">
            <div className="kiiro-spread-copy">
              <p className="kiiro-case-kicker">{spread.label} <span>·</span> {project.year}</p>
              <h1>{spread.title}</h1>
              <p className="kiiro-case-lede">{project.subtitle || project.intro}</p>
              <p className="kiiro-case-meta"><span>{project.client}</span><span>{project.service}</span></p>
            </div>
            <figure className="kiiro-spread-media kiiro-cover-media">
              <CaseImage src={spread.image} fallback={projectFallback} alt={project.title} className="kiiro-spread-image" />
            </figure>
          </div>
        );
      case "story":
        return (
          <div className="kiiro-spread kiiro-spread-story">
            <div className="kiiro-spread-copy">
              <p className="kiiro-case-kicker">{spread.label}</p>
              <h2>{spread.title}</h2>
              <p className="kiiro-case-body">{spread.text}</p>
              {spread.detail && <p className="kiiro-case-detail">{spread.detail}</p>}
            </div>
            <figure className="kiiro-spread-media">
              <CaseImage src={spread.image} fallback={projectFallback} alt={`${project.title} — ponto de partida`} className="kiiro-spread-image" />
            </figure>
          </div>
        );
      case "visual":
        return (
          <div className="kiiro-spread kiiro-spread-visual">
            <div className="kiiro-visual-heading">
              <p className="kiiro-case-kicker">{spread.label}</p>
              <h2>{spread.title}</h2>
            </div>
            <div className="kiiro-visual-images">
              {spread.images?.map((image, index) => (
                <figure key={`${image}-${index}`} className="kiiro-visual-image">
                  <CaseImage src={image} fallback={projectFallback} alt={`${project.title} — aplicação ${index + 1}`} className="kiiro-spread-image" />
                </figure>
              ))}
            </div>
          </div>
        );
      case "details":
        return (
          <div className="kiiro-spread kiiro-spread-story kiiro-spread-details">
            <div className="kiiro-spread-copy">
              <p className="kiiro-case-kicker">{spread.label}</p>
              <h2>{spread.title}</h2>
              <p className="kiiro-case-body">{spread.text}</p>
              {spread.detail && <p className="kiiro-case-detail">{spread.detail}</p>}
            </div>
            <figure className="kiiro-spread-media">
              <CaseImage src={spread.image} fallback={projectFallback} alt={`${project.title} — detalhes da identidade`} className="kiiro-spread-image" />
            </figure>
          </div>
        );
      case "gallery":
        return (
          <div className="kiiro-spread kiiro-spread-gallery">
            <figure className="kiiro-gallery-media">
              <CaseImage src={spread.image} fallback={projectFallback} alt={`${project.title} — ${spread.label}`} className="kiiro-spread-image" />
            </figure>
            <p className="kiiro-gallery-caption"><span>{spread.label}</span><span>{project.title}</span></p>
          </div>
        );
      case "end":
        return (
          <div className="kiiro-spread kiiro-spread-end">
            <p className="kiiro-case-kicker">{spread.label}</p>
            <h2>{spread.next?.title || "Vamos criar o próximo."}</h2>
            <p className="kiiro-case-body">{shorten(spread.next?.subtitle || spread.next?.intro, 180)}</p>
            {spread.next && (
              <Link className="kiiro-case-next" to={`/projeto/${spread.next.slug}`}>
                Abrir projeto <ArrowUpRight size={17} />
              </Link>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="kiiro-case-book" onTouchStart={(event) => { touchStart.current = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }; }} onTouchEnd={(event) => {
      if (!touchStart.current) return;
      const dx = event.changedTouches[0].clientX - touchStart.current.x;
      const dy = event.changedTouches[0].clientY - touchStart.current.y;
      touchStart.current = null;
      if (Math.abs(dx) < 42 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) goNext(); else goPrev();
    }}>
      <SEO
        title={`${project.title} — Studio Kiiro`}
        description={project.subtitle || project.intro || `Case study de ${project.category}.`}
        image={project.heroBanner || project.coverImage || project.pages[0]}
        url={`https://studiokiiro.com/projeto/${project.slug}`}
      />

      <Navbar forceBlack />

      <header className="kiiro-case-top">
        <Link className="kiiro-case-back" to="/#portfolio"><ArrowLeft size={16} /><span>Voltar aos projetos</span></Link>
        <p className="kiiro-case-current">{project.title}</p>
        <div className="kiiro-case-controls">
          <button type="button" onClick={goPrev} disabled={currentSpread === 0} aria-label="Página anterior"><ArrowLeft size={17} /></button>
          <button type="button" onClick={goNext} disabled={currentSpread === totalSpreads - 1} aria-label="Próxima página"><ArrowRight size={17} /></button>
        </div>
      </header>

      <main className="kiiro-case-main" tabIndex={0} aria-label={`Case study de ${project.title}`}>
        <div className="kiiro-case-stage">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={currentSpread}
              className="kiiro-spread-shell"
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -80 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderSpread(active)}
            </motion.article>
          </AnimatePresence>
        </div>
      </main>

      <footer className="kiiro-case-progress">
        <span className="kiiro-case-progress-count">{String(currentSpread + 1).padStart(2, "0")} / {String(totalSpreads).padStart(2, "0")}</span>
        <div className="kiiro-case-progress-segments" aria-label="Navegação do case">
          {spreads.map((spread, index) => (
            <button key={`${spread.kind}-${index}`} type="button" className={index === currentSpread ? "is-active" : ""} onClick={() => goTo(index)} aria-label={`Ir para página ${index + 1}`} aria-current={index === currentSpread ? "step" : undefined} />
          ))}
        </div>
        <span className="kiiro-case-progress-hint">{isMobile ? "deslize para folhear" : "role para folhear"}</span>
      </footer>
    </div>
  );
};

export default ProjectDetail;
