import { useRef, useEffect, useState } from "react";
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
  const [isBelowDesktop, setIsBelowDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsBelowDesktop(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  // Mouse parallax springs removed as they are not used in current layout


  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const dotsY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const akedahScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);
  const teamLuisaScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const bgOpacity = 1;

  return (
    <article 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden snap-start"
      style={{ backgroundColor: project.slug === 'construmar' ? '#f5f5f3' : (project.bgColor || "#000000") }}
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ 
            scale: project.slug === 'akedah-podcast' ? akedahScale : 
                   project.slug === 'team-luisa-crosstraining' ? teamLuisaScale : bgScale, 
            opacity: bgOpacity,
            backgroundImage: `url(${project.coverImage || project.pages[0]})`,
            backgroundSize: project.slug === 'construmar' ? (isBelowDesktop ? 'contain' : 'cover') : (isBelowDesktop ? 'contain' : 'cover'),
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'

          }}
          className="w-full h-full transition-opacity duration-700"
        />
        <div className={`absolute inset-0 ${project.slug === 'construmar' ? 'bg-transparent' : 'bg-black/20'}`} />
      </div>

      {/* Dynamic Dots removed as per request */}

      {/* Floating "K" Logo removed as per request */}


      {/* Content Container */}
      <div className="container-editorial absolute inset-0 z-20 w-full flex flex-col items-center justify-between py-[100px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-0"
        >
          <span className={`text-[10px] md:text-[12px] uppercase tracking-[0.6em] font-bold ${
            project.slug === 'akedah-podcast' ? 'text-white' : 
            project.slug === 'construmar' ? 'text-[#3e6884]' : 
            'text-[#FFCA16]'
          }`}>
            {project.category} · {project.year}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-0"
        >
          <Link 
            to={`/project/${project.slug}`}
            className={`group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden border transition-all duration-700 ${
              project.slug === 'construmar' 
                ? 'border-[#3e6884]/20 hover:border-[#3e6884]' 
                : 'border-white/20 hover:border-[#FFCA16]'
            }`}
          >
            {/* Filling Animation */}
            <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[0.22,1,0.36,1] ${
              project.slug === 'construmar' ? 'bg-[#3e6884]' : 'bg-[#FFCA16]'
            }`} />
            
            <span className={`relative z-10 text-[11px] md:text-[12px] uppercase tracking-[0.4em] font-bold transition-colors duration-500 ${
              project.slug === 'construmar' ? 'text-[#3e6884] group-hover:text-white' : 'text-white group-hover:text-black'
            }`}>
              Ver Projeto Completo
            </span>
            <svg 
              width="18" height="18" viewBox="0 0 20 20" fill="none" 
              className={`relative z-10 ml-6 translate-x-0 group-hover:translate-x-3 transition-transform duration-500 ${
                project.slug === 'construmar' ? 'text-[#3e6884] group-hover:text-white' : 'text-white group-hover:text-black'
              }`}
            >
              <path d="M4.16663 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Indicators */}
      <div className="absolute left-8 bottom-12 z-30 flex flex-col items-start gap-4">
        <span className={`text-[10px] uppercase tracking-[0.4em] font-mono ${project.slug === 'construmar' ? 'text-[#3e6884]/40' : 'text-white/30'}`}>
          Case {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <div className="flex gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <div 
              key={i} 
              className={`h-[2px] transition-all duration-700 ${
                i === index 
                  ? (project.slug === 'construmar' ? 'w-12 bg-[#3e6884]' : 'w-12 bg-[#FFCA16]') 
                  : (project.slug === 'construmar' ? 'w-4 bg-[#3e6884]/10' : 'w-4 bg-white/10')
              }`}
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
        <div className={`w-[1px] h-16 ${
          project.slug === 'construmar' 
            ? 'bg-gradient-to-b from-[#3e6884] to-transparent' 
            : 'bg-gradient-to-b from-[#FFCA16] to-transparent'
        }`} />
      </motion.div>
    </article>
  );
};

export default PortfolioSection;