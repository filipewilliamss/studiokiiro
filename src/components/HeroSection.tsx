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
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 202, 22, ${0.9 * globalOpacity})`;
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = 380;
      canvas.height = 420;
      
      const shapes = [
        // FAIXA ESQUERDA SUPERIOR (diagonal ↗ fina)
        [[0.05,0.52],[0.22,0.02],[0.36,0.02],[0.19,0.52]],
        // FAIXA ESQUERDA INFERIOR (diagonal ↗ grossa)
        [[0.05,0.98],[0.22,0.55],[0.38,0.55],[0.21,0.98]],
        // FAIXA DIREITA SUPERIOR (diagonal ↖ fina, espelho)
        [[0.64,0.52],[0.78,0.02],[0.92,0.02],[0.78,0.52]],
        // FAIXA DIREITA INFERIOR (diagonal ↖ grossa, espelho)
        [[0.62,0.98],[0.78,0.55],[0.95,0.55],[0.79,0.98]]
      ];

      particles = [];
      shapes.forEach(shape => {
        const p0 = { x: shape[0][0] * 380, y: shape[0][1] * 420 };
        const p1 = { x: shape[1][0] * 380, y: shape[1][1] * 420 };
        const p3 = { x: shape[3][0] * 380, y: shape[3][1] * 420 };

        for (let i = 0; i < 50; i++) {
          const u = Math.random();
          const v = Math.random();
          const x = p0.x + u * (p1.x - p0.x) + v * (p3.x - p0.x);
          const y = p0.y + u * (p1.y - p0.y) + v * (p3.y - p0.y);
          particles.push(new Particle(x, y));
        }
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
            Animação.<br />
            <span className="text-[#FFCA16]">Identidade.</span><br />
            Resultado.
          </h1>

          <p className="mt-8 text-white/50 text-[16px] max-w-[420px] text-left font-[400] leading-relaxed font-display">
            Criamos experiências em motion design e branding que transformam como marcas se comunicam.
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
            className="w-[380px] h-[420px]"
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