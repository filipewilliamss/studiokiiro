import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ---------------------------------------------------------------
    // KIIRO SYMBOL — DOT MATRIX 3D SCULPTURE
    // Geometry: 4 angled bars (two leaning right, two leaning left)
    // forming the Kiiro mark, organized as a regular dot grid in 3D
    // and projected through perspective camera.
    // ---------------------------------------------------------------

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const W = 420;
    const H = 480;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(DPR, DPR);

    const CX = W / 2;
    const CY = H / 2;
    const FOCAL = 620; // perspective focal length

    // Build dot matrix points in local 3D space (centered at origin)
    type Dot = {
      ox: number; oy: number; oz: number; // origin (home)
      dx: number; dy: number;             // current 2D offset (interaction)
      vx: number; vy: number;             // velocity
      seed: number;                       // for idle phase
    };

    const dots: Dot[] = [];

    // Build a single inclined bar as a regular dot grid
    // Bar goes from (x1,y1) to (x2,y2) in local 2D, with width W (perpendicular)
    // depth: z thickness (volumetric); rows along length, cols across width, layers in z
    const buildBar = (
      x1: number, y1: number,
      x2: number, y2: number,
      width: number,
      depth: number,
      stepLen: number,
      stepW: number,
      stepZ: number,
    ) => {
      const dxL = x2 - x1;
      const dyL = y2 - y1;
      const len = Math.hypot(dxL, dyL);
      const ux = dxL / len; // unit along length
      const uy = dyL / len;
      const nx = -uy;       // unit perpendicular (in 2D plane)
      const ny = ux;

      const rowsLen = Math.floor(len / stepLen) + 1;
      const colsW = Math.floor(width / stepW) + 1;
      const layersZ = Math.floor(depth / stepZ) + 1;

      const halfW = (colsW - 1) * stepW / 2;
      const halfZ = (layersZ - 1) * stepZ / 2;

      for (let i = 0; i < rowsLen; i++) {
        const t = i / (rowsLen - 1 || 1);
        const baseX = x1 + dxL * t;
        const baseY = y1 + dyL * t;
        for (let j = 0; j < colsW; j++) {
          const offW = -halfW + j * stepW;
          const px = baseX + nx * offW;
          const py = baseY + ny * offW;
          for (let k = 0; k < layersZ; k++) {
            const pz = -halfZ + k * stepZ;
            dots.push({
              ox: px,
              oy: py,
              oz: pz,
              dx: 0, dy: 0,
              vx: 0, vy: 0,
              seed: Math.random() * Math.PI * 2,
            });
          }
        }
      }
    };

    // Symbol geometry — local coords centered around (0,0)
    // Structure: 4 vertical-ish bars with specific offsets to form the Kiiro mark.
    // Each bar is built as a volumetric 3D grid.
    const HALF_H = 160;          // height of bars
    const BAR_W = 24;            // width of each bar
    const BAR_DEPTH = 32;        // depth of the sculpture
    const STEP_LEN = 10;         // dot spacing (density)
    const STEP_W = 10;           // dot spacing (density)
    const STEP_Z = 12;           // dot spacing (density)
    
    // The mark has 4 vertical bars.
    // Offsets: -90, -30, 30, 90 (approximate relative centers)
    const xOffsets = [-85, -35, 35, 85];
    
    xOffsets.forEach((xPos, idx) => {
      // Alternate slant slightly or keep parallel for precise geometry
      // Bar 1 & 2: / / (leaning right)
      // Bar 3 & 4: \ \ (leaning left)
      const isLeft = idx < 2;
      const slant = isLeft ? 55 : -55;
      
      buildBar(
        xPos - slant, HALF_H,
        xPos + slant, -HALF_H,
        BAR_W,
        BAR_DEPTH,
        STEP_LEN,
        STEP_W,
        STEP_Z
      );
    });

    // Camera / interaction state
    const target = { rx: 0, ry: 0 };
    const current = { rx: 0, ry: 0 };
    const mouse = { x: CX, y: CY, inside: false };

    let animationFrameId: number;
    let globalOpacity = 0;
    const startTime = performance.now();
    const fadeDuration = 1400;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouse.x = mx;
      mouse.y = my;
      mouse.inside = true;
      // Map to small rotation angles (max ~14deg)
      const nx = (mx / W) * 2 - 1;
      const ny = (my / H) * 2 - 1;
      target.ry = nx * 0.24;
      target.rx = -ny * 0.18;
    };
    const handleMouseLeave = () => {
      mouse.inside = false;
      target.rx = 0;
      target.ry = 0;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = (now: number) => {
      const t = (now - startTime) / 1000;
      globalOpacity = Math.min((now - startTime) / fadeDuration, 1);

      // Easing toward target rotation
      current.rx += (target.rx - current.rx) * 0.06;
      current.ry += (target.ry - current.ry) * 0.06;

      // Idle floating rotation
      const idleRy = Math.sin(t * 0.45) * 0.06;
      const idleRx = Math.cos(t * 0.35) * 0.04;
      const rx = current.rx + idleRx;
      const ry = current.ry + idleRy;

      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cosY = Math.cos(ry), sinY = Math.sin(ry);

      ctx.clearRect(0, 0, W, H);

      // Sort by depth (painters algorithm) — back to front
      const projected: Array<{
        sx: number; sy: number; scale: number; alpha: number; z: number;
      }> = [];

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        // Idle breathing on Z
        const breathe = Math.sin(t * 0.9 + d.seed) * 1.2;

        // Rotate around Y then X
        let x = d.ox;
        let y = d.oy;
        let z = d.oz + breathe;

        // Y rotation
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        // X rotation
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Perspective projection
        const persp = FOCAL / (FOCAL + z2);
        let sx = CX + x1 * persp;
        let sy = CY + y2 * persp;

        // Mouse interaction in screen space (subtle displacement)
        if (mouse.inside) {
          const mdx = sx - mouse.x;
          const mdy = sy - mouse.y;
          const mdist = Math.hypot(mdx, mdy);
          const R = 75;
          if (mdist < R && mdist > 0.001) {
            const force = (1 - mdist / R) * 10;
            d.vx += (mdx / mdist) * force * 0.18;
            d.vy += (mdy / mdist) * force * 0.18;
          }
        }
        // Spring back
        d.vx += -d.dx * 0.08;
        d.vy += -d.dy * 0.08;
        d.vx *= 0.84;
        d.vy *= 0.84;
        d.dx += d.vx;
        d.dy += d.vy;

        sx += d.dx;
        sy += d.dy;

        // Depth-based scale & alpha
        const depthN = (z2 + 60) / 120; // ~0..1
        const scale = 1.05 + persp * 0.6;
        const alpha = (0.35 + 0.65 * persp) * globalOpacity;

        projected.push({ sx, sy, scale, alpha, z: z2 });
      }

      projected.sort((a, b) => b.z - a.z);

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const r = Math.max(0.6, p.scale * 1.35);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = '#FFCA16';
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
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

      {/* Top meta bar — editorial detail */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute top-28 md:top-32 left-0 right-0 z-10 hidden md:block"
      >
        <div className="container-editorial flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">
          <span>(01) — São Paulo · BR</span>
          <span className="hidden lg:inline">Branding · Editorial · Digital</span>
          <span className="font-mono">N°2026</span>
        </div>
      </motion.div>

      <div className="relative z-10 container-editorial w-full flex flex-col lg:flex-row items-center gap-12 pt-24 lg:pt-16">
        <div className="w-full lg:w-[65%] flex flex-col items-start" ref={headlineRef}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-10 flex items-center gap-4"
          >
            <span className="w-12 h-[1px] bg-[#FFCA16]" />
            <span className="text-[#FFCA16] text-[11px] font-bold uppercase tracking-[0.4em]">
              Creative Design Studio
            </span>
          </motion.div>

          <h1
            className="text-white font-[800] leading-[0.82] text-left tracking-[-0.05em] font-display"
            style={{ fontSize: 'clamp(64px, 11vw, 132px)' }}
          >
            Design que <br />
            gera <span className="text-[#FFCA16] italic font-light">valor.</span>
          </h1>

          <p className="mt-12 text-white/55 text-[18px] md:text-[20px] max-w-[520px] text-left font-light leading-[1.7] font-display text-balance">
            Transformamos marcas através de design estratégico e visual autoral de alto impacto. Do branding completo ao digital.
          </p>

          <div className="mt-16 flex flex-col sm:flex-row gap-5 items-stretch sm:items-center w-full sm:w-auto">
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
          {/* Subtle ambient glow — restrained, not gamer */}
          <div className="absolute w-[340px] h-[340px] bg-[#FFCA16]/[0.04] blur-[100px] rounded-full" />
          {/* Editorial frame markers */}
          <div className="absolute top-6 left-6 w-3 h-3 border-l border-t border-[#FFCA16]/40" />
          <div className="absolute top-6 right-6 w-3 h-3 border-r border-t border-[#FFCA16]/40" />
          <div className="absolute bottom-6 left-6 w-3 h-3 border-l border-b border-[#FFCA16]/40" />
          <div className="absolute bottom-6 right-6 w-3 h-3 border-r border-b border-[#FFCA16]/40" />
          {/* Tiny meta label */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[#FFCA16]/40 text-[9px] uppercase tracking-[0.4em] font-mono">
            K — 001
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/25 text-[9px] uppercase tracking-[0.4em] font-mono">
            Symbol · 3D Matrix
          </div>
          <canvas 
            ref={canvasRef}
            id="hero-canvas"
            className="relative z-10 cursor-crosshair"
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