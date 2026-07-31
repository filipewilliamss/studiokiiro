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
    // Geometry is sampled DIRECTLY from the official brand SVG file.
    // The SVG silhouette is rasterized to an offscreen canvas, then
    // every filled pixel becomes a column of dots extruded along Z,
    // creating a volumetric "digital sculpture" of the actual logo.
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

    type Dot = {
      ox: number; oy: number; oz: number; // origin (home)
      dx: number; dy: number;             // current 2D offset (interaction)
      vx: number; vy: number;             // velocity
      seed: number;                       // for idle phase
    };

    const dots: Dot[] = [];

    // Camera / interaction state
    const target = { rx: 0, ry: 0 };
    const current = { rx: 0, ry: 0 };
    const mouse = { x: CX, y: CY, inside: false };

    let animationFrameId: number;
    let globalOpacity = 0;
    const startTime = performance.now();
    const fadeDuration = 1400;

    // ---- Sample the official Kiiro SVG into a volumetric dot matrix
    // The SVG path lives inside viewBox 0 0 1080 1080. We rasterize
    // it to a small offscreen canvas, then scan pixels at a fixed
    // step. Each filled pixel produces a stack of dots along Z.
    const SVG_MARKUP = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080">
  <path fill="#ffca16" d="M693.69,386.46h-114.79l114.78,111.28v-111.28ZM501.1,386.46h-114.79v111.28s114.79-111.28,114.79-111.28ZM576.63,580.07l117.06,113.47v-102.25l-117.06-113.47v102.25ZM386.31,693.54l117.06-113.47v-102.25l-117.06,113.47v102.25Z"/>
</svg>`;

    const SAMPLE_SIZE = 140;          // offscreen rasterization resolution
    const STEP_PX = 3;                // pixel scan step (density of dots)
    const TARGET_HEIGHT = 320;        // displayed height of the symbol
    const DEPTH = 60;                 // total Z extrusion
    const Z_LAYERS = 5;               // number of Z layers
    const STEP_Z = DEPTH / (Z_LAYERS - 1);

    const buildFromSVG = () => {
      const off = document.createElement('canvas');
      off.width = SAMPLE_SIZE;
      off.height = SAMPLE_SIZE;
      const octx = off.getContext('2d');
      if (!octx) return;

      const blob = new Blob([SVG_MARKUP], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        octx.clearRect(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        octx.drawImage(img, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        const data = octx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data;

        // Find the symbol's bounding box in pixel space (alpha > 0)
        let minX = SAMPLE_SIZE, minY = SAMPLE_SIZE, maxX = 0, maxY = 0;
        for (let y = 0; y < SAMPLE_SIZE; y++) {
          for (let x = 0; x < SAMPLE_SIZE; x++) {
            if (data[(y * SAMPLE_SIZE + x) * 4 + 3] > 40) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        const bbW = maxX - minX;
        const bbH = maxY - minY;
        if (bbW <= 0 || bbH <= 0) return;

        // Scale so the symbol's height matches TARGET_HEIGHT, preserving aspect
        const scale = TARGET_HEIGHT / bbH;
        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;

        const halfZ = DEPTH / 2;

        for (let y = minY; y <= maxY; y += STEP_PX) {
          for (let x = minX; x <= maxX; x += STEP_PX) {
            const alpha = data[(y * SAMPLE_SIZE + x) * 4 + 3];
            if (alpha > 80) {
              const lx = (x - cx) * scale;
              const ly = (y - cy) * scale;
              for (let k = 0; k < Z_LAYERS; k++) {
                const lz = -halfZ + k * STEP_Z;
                dots.push({
                  ox: lx,
                  oy: ly,
                  oz: lz,
                  dx: 0, dy: 0,
                  vx: 0, vy: 0,
                  seed: Math.random() * Math.PI * 2,
                });
              }
            }
          }
        }
        URL.revokeObjectURL(url);
      };
      img.src = url;
    };

    buildFromSVG();

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

      // Easing toward target rotation (slow, elegant easing)
      current.rx += (target.rx - current.rx) * 0.045;
      current.ry += (target.ry - current.ry) * 0.045;

      // Idle floating rotation (micro-oscillation)
      const idleRy = Math.sin(t * 0.4) * 0.05;
      const idleRx = Math.cos(t * 0.3) * 0.03;
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
        // Use a deeper focal range for better volumetric perception
        const scale = 0.95 + persp * 0.7;
        const alpha = (0.2 + 0.8 * (persp * persp)) * globalOpacity;

        projected.push({ sx, sy, scale, alpha, z: z2 });
      }

      projected.sort((a, b) => b.z - a.z);

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const r = Math.max(0.5, p.scale * 1.25);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        
        // Use a subtle gradient or solid depending on depth
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

      <div className="relative z-10 container-editorial w-full flex flex-col lg:flex-row items-center gap-12 pt-24 lg:pt-16 pb-20 md:pb-32 lg:pb-0">
        <div className="w-full lg:w-[65%] flex flex-col items-start" ref={headlineRef}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-10 flex items-center gap-4"
          >
            <span className="text-[#FFCA16] text-[11px] font-bold uppercase tracking-[0.4em]">
              Creative Design Studio
            </span>
          </motion.div>

          <h1
            className="text-white font-[800] leading-[0.82] text-left tracking-[-0.05em] font-display"
            style={{ fontSize: 'clamp(40px, 10vw, 122px)' }}
          >
            Sua marca precisa ser <br />
            <span className="text-[#FFCA16] italic font-light">lembrada.</span>
          </h1>

          <p className="mt-12 text-white/55 text-[17px] md:text-[19px] max-w-none text-left font-light leading-[1.6] font-display tracking-tight">
            Design para marcas que buscam reconhecimento e diferenciação real,
            <br />
            por meio de identidades visuais, sites e presença digital consistentes.
          </p>
        </div>

        <div className="hidden lg:flex lg:w-[35%] h-[600px] relative items-center justify-center">
          {/* Subtle ambient glow — refined and integrated */}
          <div className="absolute w-[380px] h-[380px] bg-[#FFCA16]/[0.03] blur-[120px] rounded-full" />
          
          {/* Technical frame markers */}
          <div className="absolute top-10 left-10 w-2 h-2 border-l border-t border-[#FFCA16]/20" />
          <div className="absolute top-10 right-10 w-2 h-2 border-r border-t border-[#FFCA16]/20" />
          <div className="absolute bottom-10 left-10 w-2 h-2 border-l border-b border-[#FFCA16]/20" />
          <div className="absolute bottom-10 right-10 w-2 h-2 border-r border-b border-[#FFCA16]/20" />
          
          {/* Branding metadata */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[#FFCA16]/30 text-[8px] uppercase tracking-[0.6em] font-mono whitespace-nowrap">
            KIIRO · MARK · 001
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/15 text-[8px] uppercase tracking-[0.6em] font-mono whitespace-nowrap">
            MODULAR GEOMETRY · VOL.01
          </div>
          <canvas 
            ref={canvasRef}
            id="hero-canvas"
            className="relative z-10 cursor-none"
          />
        </div>
      </div>

    </section>
  );
};

export default HeroSection;