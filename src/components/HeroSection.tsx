import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let globalOpacity = 0;
    const startTime = Date.now();
    const fadeDuration = 1200;

    function stripe(x1: number, y1: number, x2: number, y2: number, halfW: number, n: number) {
      const pts = [];
      const dx = x2 - x1, dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = -dy / len, ny = dx / len;
      for (let i = 0; i < n; i++) {
        const t = Math.random();
        const s = (Math.random() - 0.5) * halfW * 2;
        pts.push({
          homeX: x1 + dx * t + nx * s,
          homeY: y1 + dy * t + ny * s
        });
      }
      return pts;
    }

    class Particle {
      x: number;
      y: number;
      homeX: number;
      homeY: number;
      vx: number;
      vy: number;

      constructor(homeX: number, homeY: number) {
        this.homeX = homeX;
        this.homeY = homeY;
        this.x = homeX;
        this.y = homeY;
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        const dx = this.x - mousePosition.current.x;
        const dy = this.y - mousePosition.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 90) {
          const force = (90 - dist) / 90;
          const angle = Math.atan2(dy, dx);
          this.vx += Math.cos(angle) * force * 6;
          this.vy += Math.sin(angle) * force * 6;
        }

        this.vx += (this.homeX - this.x) * 0.04;
        this.vy += (this.homeY - this.y) * 0.04;

        this.vx *= 0.86;
        this.vy *= 0.86;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#FFCA16";
        ctx.globalAlpha = 0.9 * globalOpacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const init = () => {
      canvas.width = 380;
      canvas.height = 440;
      
      particles = [];
      
      const allPoints = [
        ...stripe(10, 440, 110, 10, 28, 50),   // GRUPO ESQUERDO - faixa esquerda
        ...stripe(90, 440, 175, 10, 28, 50),   // GRUPO ESQUERDO - faixa direita
        ...stripe(205, 10, 290, 440, 28, 50),  // GRUPO DIREITO - faixa esquerda
        ...stripe(270, 10, 370, 440, 28, 50)   // GRUPO DIREITO - faixa direita
      ];

      allPoints.forEach(pt => {
        particles.push(new Particle(pt.homeX, pt.homeY));
      });
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      globalOpacity = Math.min(elapsed / fadeDuration, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    init();
    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    // Headline animation
    if (headlineRef.current) {
      gsap.from(headlineRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      });
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#070807] overflow-hidden flex items-center"
    >
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      
      {/* Radial Gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,202,22,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative z-10 container-editorial w-full flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-[65%] flex flex-col items-start" ref={headlineRef}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="text-[#FFCA16] text-[12px] font-bold uppercase tracking-[0.4em]">
              Creative Design Studio
            </span>
          </motion.div>

          <h1 
            className="text-white font-[800] leading-[0.85] text-left tracking-extratight font-display"
            style={{ fontSize: 'clamp(56px, 10vw, 110px)' }}
          >
            Design que <br />
            gera <span className="text-[#FFCA16] italic">valor.</span>
          </h1>

          <p className="mt-10 text-white/50 text-[18px] md:text-[20px] max-w-[540px] text-left font-light leading-relaxed font-display text-balance">
            Transformamos marcas através de design estratégico e visual autoral de alto impacto. Do branding completo ao digital.
          </p>

          <div className="mt-14 flex flex-col sm:flex-row gap-6 items-center w-full sm:w-auto">
            <a
              href="#portfolio"
              className="btn-premium w-full sm:w-auto"
            >
              Conheça o Portfólio
            </a>
            <a
              href="#contato"
              className="btn-premium-outline w-full sm:w-auto"
            >
              Vamos conversar
            </a>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-[35%] h-[600px] relative items-center justify-center">
          <div className="absolute inset-0 bg-[#FFCA16]/5 blur-[120px] rounded-full animate-pulse" />
          <canvas 
            ref={canvasRef}
            id="hero-canvas"
            className="relative z-10 w-[400px] h-[460px] filter brightness-110 drop-shadow-[0_0_30px_rgba(255,202,22,0.2)]"
          />
        </div>
      </div>

      {/* Side Label */}
      <div className="absolute left-6 bottom-12 hidden lg:flex items-center gap-4 rotate-[-90deg] origin-left">
        <span className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-bold">
          EST. 2018
        </span>
        <div className="w-12 h-[1px] bg-white/20" />
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 right-10 hidden lg:flex flex-col items-center gap-4"
      >
        <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-medium rotate-90 mb-8 font-display">
          SCROLL
        </span>
        <div className="w-[1px] h-[80px] bg-gradient-to-b from-[#FFCA16] to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;