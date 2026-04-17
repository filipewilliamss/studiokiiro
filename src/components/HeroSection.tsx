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
    // Canvas animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 120;
    const connectionDistance = 120;
    const mouseRadius = 80;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = 2;
        this.opacity = Math.random() * (0.6 - 0.1) + 0.1;
      }

      update(w: number, h: number) {
        // Mouse interaction
        const dx = this.x - mousePosition.current.x;
        const dy = this.y - mousePosition.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          this.vx += dx / dist * force * 0.2;
          this.vy += dy / dist * force * 0.2;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Friction
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Boundary check
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 202, 22, ${this.opacity})`;
        ctx.fill();
      }
    }

    const init = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update(canvas.width, canvas.height);
        p.draw();
      });

      // Draw connections
      let connections = 0;
      for (let i = 0; i < particles.length && connections < 40; i++) {
        for (let j = i + 1; j < particles.length && connections < 40; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 202, 22, ${opacity})`;
            ctx.stroke();
            connections++;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('resize', init);
    canvas.addEventListener('mousemove', handleMouseMove);
    
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
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

        <div className="hidden lg:block lg:w-[40%] h-[600px] relative">
          <canvas 
            ref={canvasRef}
            id="hero-canvas"
            className="w-full h-full"
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