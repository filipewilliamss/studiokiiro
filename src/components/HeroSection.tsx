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
      className="relative min-h-screen w-full bg-[#070807] overflow-hidden pt-[160px] pb-20"
    >
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-100" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row items-start px-6">
        <div className="w-full lg:w-[60%] flex flex-col items-start" ref={headlineRef}>
          <h1 
            className="text-white font-[800] leading-[0.9] text-left tracking-[-3px] font-display"
            style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
          >
            Identidade.<br />
            Estratégia.<br />
            <span className="text-[#FFCA16]">Resultado.</span>
          </h1>

          <p className="mt-8 text-white/50 text-[16px] max-w-[420px] text-left font-[400] leading-relaxed font-display">
            Design de alto padrão para marcas que querem ser lembradas, do branding completo ao conteúdo digital.
          </p>

          <div className="mt-12 flex flex-row gap-4 items-center w-full sm:w-auto">
            <a
              href="#portfolio"
              className="px-[40px] py-[16px] bg-[#FFCA16] text-[#070807] font-semibold transition-all duration-300 flex items-center justify-center text-[14px] uppercase tracking-[2px] font-display border-0 rounded-none hover:opacity-90 active:scale-95"
            >
              Ver Projetos
            </a>
            <a
              href="#contato"
              className="px-[40px] py-[16px] bg-transparent border border-white/30 text-white font-semibold transition-all duration-300 flex items-center justify-center text-[14px] uppercase tracking-[2px] font-display rounded-none hover:bg-white/5 active:scale-95"
            >
              Fale Conosco
            </a>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-[40%] h-[600px] relative items-center justify-center">
          <canvas 
            ref={canvasRef}
            id="hero-canvas"
            className="w-[380px] h-[440px]"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 pr-6 lg:pr-10">
        <div className="w-[1px] h-[60px] bg-[#FFCA16]/40" />
        <span className="text-white/30 text-[10px] uppercase tracking-[3px] font-medium rotate-90 translate-y-8 font-display">
          SCROLL
        </span>
      </div>
    </section>
  );
};

export default HeroSection;