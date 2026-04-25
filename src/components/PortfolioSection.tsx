import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projects } from "@/data/projects";

const KiiroLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M20 10V90H35V55L70 90H90L50 50L85 10H65L35 40V10H20Z" />
  </svg>
);

const PortfolioSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="portfolio" 
      className="bg-black text-white selection:bg-[#FFCA16] selection:text-black overflow-hidden"
    >
      <div 
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for the "K" and dots
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const kX = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const kY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const dotsY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  const springKX = useSpring(kX, { stiffness: 100, damping: 30 });
  const springKY = useSpring(kY, { stiffness: 100, damping: 30 });
  const springDotsY = useSpring(dotsY, { stiffness: 100, damping: 30 });

  return (
    <article 
      ref={cardRef}
      className="relative h-screen w-full snap-start flex items-center justify-center overflow-hidden border-b border-white/5"
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full bg-cover bg-center grayscale contrast-125"
          style={{ backgroundImage: `url(${project.pages[0]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      </div>

      {/* Dynamic Dots (Inverse Parallax) */}
      <motion.div 
        style={{ y: springDotsY }}
        className="absolute inset-0 z-10 pointer-events-none opacity-20"
      >
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FFCA16] rounded-full" />
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-[#FFCA16] rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-[#FFCA16] rounded-full" />
        <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-[#FFCA16] rounded-full" />
        <svg className="absolute top-1/3 right-1/2 w-20 h-20 text-[#FFCA16]/30" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" stroke="currentColor" fill="none" strokeWidth="0.5" strokeDasharray="4 4" />
        </svg>
      </motion.div>

      {/* Floating "K" Logo */}
      <motion.div 
        style={{ x: springKX, y: springKY }}
        className="absolute right-[10%] top-[20%] z-10 pointer-events-none opacity-[0.07] mix-blend-overlay"
      >
        <KiiroLogo className="w-[40vw] h-[40vw] text-white" />
      </motion.div>

      {/* Content Container */}
      <div className="container-editorial relative z-20 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-[#FFCA16] font-bold">
            {project.category} — {project.year}
          </span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-[12vw] md:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase mb-12 drop-shadow-2xl"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {project.title.split(" ").map((word: string, i: number) => (
            <span key={i} className="block">{word}</span>
          ))}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link 
            to={`/projeto/${project.slug}`}
            className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden border border-white/20 transition-all duration-500"
          >
            {/* Fill Animation */}
            <div className="absolute inset-0 bg-[#FFCA16] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
            
            <span className="relative z-10 text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-white group-hover:text-black transition-colors duration-500">
              Ver Projeto Completo
            </span>
            <svg 
              width="15" height="15" viewBox="0 0 20 20" fill="none" 
              className="relative z-10 ml-4 translate-x-0 group-hover:translate-x-2 transition-transform duration-500 text-white group-hover:text-black"
            >
              <path d="M4.16663 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4">
        {projects.map((_, i) => (
          <div 
            key={i} 
            className={`w-1 h-10 transition-all duration-700 ${i === index ? 'bg-[#FFCA16] h-16' : 'bg-white/20'}`}
          />
        ))}
      </div>
    </article>
  );
};

export default PortfolioSection;