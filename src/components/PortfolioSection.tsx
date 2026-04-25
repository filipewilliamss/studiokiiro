import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { projects } from "@/data/projects";

const KiiroLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M20 10V90H35V55L70 90H90L50 50L85 10H65L35 40V10H20Z" />
  </svg>
);

const PortfolioSection = () => {
  return (
    <div id="portfolio" className="bg-black">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} total={projects.length} />
      ))}
    </div>
  );
};

const ProjectCard = ({ project, index, total }: { project: any; index: number; total: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const kX = useSpring(useTransform(mouseX, [-0.5, 0.5], [30, -30]), { stiffness: 50, damping: 20 });
  const kY = useSpring(useTransform(mouseY, [-0.5, 0.5], [30, -30]), { stiffness: 50, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const dotsY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.4, 0.1]);

  return (
    <article 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden snap-start"
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ 
            scale: bgScale, 
            opacity: bgOpacity,
            backgroundImage: `url(${project.pages[0]})`
          }}
          className="w-full h-full bg-cover bg-center grayscale contrast-125 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      </div>

      {/* Dynamic Dots (Inverse Parallax) */}
      <motion.div 
        style={{ y: dotsY }}
        className="absolute inset-0 z-10 pointer-events-none opacity-20"
      >
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FFCA16] rounded-full" />
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-[#FFCA16] rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-[#FFCA16] rounded-full" />
        <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-[#FFCA16] rounded-full" />
      </motion.div>

      {/* Floating "K" Logo (Reacts to Mouse) */}
      <motion.div 
        style={{ x: kX, y: kY }}
        className="absolute right-[5%] top-[15%] z-10 pointer-events-none opacity-[0.05] mix-blend-overlay"
      >
        <KiiroLogo className="w-[45vw] h-[45vw] text-white" />
      </motion.div>

      {/* Content Container */}
      <div className="container-editorial relative z-20 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <span className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] text-[#FFCA16] font-bold">
            {project.category} · {project.year}
          </span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[14vw] md:text-[11vw] font-black leading-[0.8] tracking-tighter uppercase mb-16 drop-shadow-2xl flex flex-col items-center"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {project.title.split(" ").map((word: string, i: number) => (
            <span key={i} className="block last:text-[#FFCA16]">{word}</span>
          ))}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            to={`/projeto/${project.slug}`}
            className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden border border-white/20 transition-all duration-700 hover:border-[#FFCA16]"
          >
            {/* Filling Animation */}
            <div className="absolute inset-0 bg-[#FFCA16] translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[0.22,1,0.36,1]" />
            
            <span className="relative z-10 text-[11px] md:text-[12px] uppercase tracking-[0.4em] font-bold text-white group-hover:text-black transition-colors duration-500">
              Ver Projeto Completo
            </span>
            <svg 
              width="18" height="18" viewBox="0 0 20 20" fill="none" 
              className="relative z-10 ml-6 translate-x-0 group-hover:translate-x-3 transition-transform duration-500 text-white group-hover:text-black"
            >
              <path d="M4.16663 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Indicators */}
      <div className="absolute left-8 bottom-12 z-30 flex flex-col items-start gap-4">
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-mono">
          Case {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <div className="flex gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <div 
              key={i} 
              className={`h-[2px] transition-all duration-700 ${i === index ? 'w-12 bg-[#FFCA16]' : 'w-4 bg-white/10'}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 right-12 z-30 hidden md:block"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#FFCA16] to-transparent" />
      </motion.div>
    </article>
  );
};

export default PortfolioSection;