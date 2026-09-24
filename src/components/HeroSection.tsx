import React, { useEffect, useRef } from 'react';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------------------------------------------------------------
    // KIIRO SCULPTURE — LIQUID DARK GLASS COM REFRAÇÃO ÓPTICA & BORDA CANÁRIO
    // Amostrado diretamente do SVG do símbolo oficial da Kiiro.
    // Camadas ópticas de vidro escuro obsidiana, fresnel e bordas canário.
    // ---------------------------------------------------------------

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const W = 460;
    const H = 520;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(DPR, DPR);

    const CX = W / 2;
    const CY = H / 2;
    const FOCAL = 640;

    type GlassNode = {
      ox: number; oy: number; oz: number;
      dx: number; dy: number;
      vx: number; vy: number;
      seed: number;
      isEdge: boolean;
      facetNormalZ: number;
    };

    const nodes: GlassNode[] = [];

    const target = { rx: 0, ry: 0 };
    const current = { rx: 0, ry: 0 };
    const mouse = { x: CX, y: CY, inside: false };

    let animationFrameId: number | undefined;
    let hasRenderedNodes = false;
    let globalOpacity = 0;
    const startTime = performance.now();
    const fadeDuration = 1200;

    const SVG_MARKUP = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080">
  <path fill="#ffca16" d="M693.69,386.46h-114.79l114.78,111.28v-111.28ZM501.1,386.46h-114.79v111.28s114.79-111.28,114.79-111.28ZM576.63,580.07l117.06,113.47v-102.25l-117.06-113.47v102.25ZM386.31,693.54l117.06-113.47v-102.25l-117.06,113.47v102.25Z"/>
</svg>`;

    const SAMPLE_SIZE = 150;
    const STEP_PX = 3;
    const TARGET_HEIGHT = 340;
    const DEPTH = 70;
    const Z_LAYERS = 6;
    const STEP_Z = DEPTH / (Z_LAYERS - 1);

    const buildGlassSculpture = () => {
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

        const bbH = maxY - minY;
        if (bbH <= 0) return;

        const scale = TARGET_HEIGHT / bbH;
        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;
        const halfZ = DEPTH / 2;

        for (let y = minY; y <= maxY; y += STEP_PX) {
          for (let x = minX; x <= maxX; x += STEP_PX) {
            const idx = (y * SAMPLE_SIZE + x) * 4 + 3;
            const alpha = data[idx];
            if (alpha > 80) {
              // Detecta borda para receber refração dourada canário
              const isEdge =
                x <= minX + 2 || x >= maxX - 2 ||
                y <= minY + 2 || y >= maxY - 2 ||
                (data[((y - 1) * SAMPLE_SIZE + x) * 4 + 3] || 0) < 50 ||
                (data[((y + 1) * SAMPLE_SIZE + x) * 4 + 3] || 0) < 50 ||
                (data[(y * SAMPLE_SIZE + (x - 1)) * 4 + 3] || 0) < 50 ||
                (data[(y * SAMPLE_SIZE + (x + 1)) * 4 + 3] || 0) < 50;

              const lx = (x - cx) * scale;
              const ly = (y - cy) * scale;

              for (let k = 0; k < Z_LAYERS; k++) {
                const lz = -halfZ + k * STEP_Z;
                const isOuterLayer = k === 0 || k === Z_LAYERS - 1;
                nodes.push({
                  ox: lx,
                  oy: ly,
                  oz: lz,
                  dx: 0, dy: 0,
                  vx: 0, vy: 0,
                  seed: Math.random() * Math.PI * 2,
                  isEdge: isEdge || isOuterLayer,
                  facetNormalZ: isOuterLayer ? (k === 0 ? -1 : 1) : 0,
                });
              }
            }
          }
        }
        hasRenderedNodes = true;
        URL.revokeObjectURL(url);
      };
      img.src = url;
    };

    buildGlassSculpture();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (W / rect.width);
      const my = (e.clientY - rect.top) * (H / rect.height);
      mouse.x = mx;
      mouse.y = my;
      mouse.inside = true;

      const nx = (mx / W) * 2 - 1;
      const ny = (my / H) * 2 - 1;
      target.ry = nx * 0.32;
      target.rx = -ny * 0.24;
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
      globalOpacity = reduceMotion ? 1 : Math.min((now - startTime) / fadeDuration, 1);

      current.rx += (target.rx - current.rx) * 0.05;
      current.ry += (target.ry - current.ry) * 0.05;

      const idleRy = reduceMotion ? 0 : Math.sin(t * 0.45) * 0.06;
      const idleRx = reduceMotion ? 0 : Math.cos(t * 0.35) * 0.04;
      const rx = current.rx + idleRx;
      const ry = current.ry + idleRy;

      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cosY = Math.cos(ry), sinY = Math.sin(ry);

      ctx.clearRect(0, 0, W, H);

      // Render specular light glint in background
      const glintX = CX + Math.sin(t * 0.7) * 40;
      const glintY = CY + Math.cos(t * 0.5) * 40;
      const glintGrad = ctx.createRadialGradient(glintX, glintY, 0, glintX, glintY, 180);
      glintGrad.addColorStop(0, 'rgba(255, 202, 22, 0.05)');
      glintGrad.addColorStop(1, 'rgba(255, 202, 22, 0)');
      ctx.fillStyle = glintGrad;
      ctx.fillRect(0, 0, W, H);

      const projected: Array<{
        sx: number; sy: number; scale: number; alpha: number; z: number; isEdge: boolean;
      }> = [];

      for (let i = 0; i < nodes.length; i++) {
        const d = nodes[i];
        const breathe = Math.sin(t * 1.1 + d.seed) * 1.4;

        const x = d.ox;
        const y = d.oy;
        const z = d.oz + breathe;

        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const persp = FOCAL / (FOCAL + z2);
        let sx = CX + x1 * persp;
        let sy = CY + y2 * persp;

        if (mouse.inside) {
          const mdx = sx - mouse.x;
          const mdy = sy - mouse.y;
          const mdist = Math.hypot(mdx, mdy);
          const R = 85;
          if (mdist < R && mdist > 0.001) {
            const force = (1 - mdist / R) * 12;
            d.vx += (mdx / mdist) * force * 0.2;
            d.vy += (mdy / mdist) * force * 0.2;
          }
        }

        d.vx += -d.dx * 0.08;
        d.vy += -d.dy * 0.08;
        d.vx *= 0.85;
        d.vy *= 0.85;
        d.dx += d.vx;
        d.dy += d.vy;

        sx += d.dx;
        sy += d.dy;

        const scale = 0.95 + persp * 0.8;
        const alpha = (0.25 + 0.75 * (persp * persp)) * globalOpacity;

        projected.push({ sx, sy, scale, alpha, z: z2, isEdge: d.isEdge });
      }

      projected.sort((a, b) => b.z - a.z);

      // Render Dark Liquid Glass with Canary Yellow Refraction
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const r = Math.max(0.6, p.scale * 1.3);

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);

        if (p.isEdge) {
          // Borda exterior: Refração dourada/canário com brilho nítido
          ctx.fillStyle = `rgba(255, 202, 22, ${Math.min(1, p.alpha * 1.1)})`;
          ctx.shadowColor = '#FFCA16';
          ctx.shadowBlur = 4;
        } else {
          // Corpo interno: Vidro escuro óptico fumê (smoky glass com reflexo especular)
          const depthShade = Math.floor(18 + (p.z + DEPTH / 2) * 0.4);
          ctx.fillStyle = `rgba(${depthShade}, ${depthShade + 2}, ${depthShade + 6}, ${p.alpha * 0.85})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      // A single settled frame is enough when the visitor asks for reduced
      // motion. Keep polling only until the SVG sample has finished loading
      // so the static mark is still painted when the image arrives.
      if (!reduceMotion || !hasRenderedNodes) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId !== undefined) cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="kiiro-hero-stage relative flex flex-col justify-center overflow-hidden bg-[#050505]">
      {/* Luz ambiente de estúdio Kiiro */}
      <div className="absolute top-1/4 right-[10%] w-[550px] h-[550px] bg-[#FFCA16]/[0.035] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-[-5%] w-[400px] h-[400px] bg-white/[0.015] blur-[140px] rounded-full pointer-events-none" />

      <div className="kiiro-hero-layout container-editorial relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">

        <div className="w-full lg:w-[59%] flex flex-col items-start text-left">

          {/* Headline Monumental */}
          <h1
            className="text-white font-[800] leading-[0.84] text-left tracking-[-0.055em] font-display"
            style={{ fontSize: 'clamp(44px, 8.5vw, 115px)' }}
          >
            Sua marca <br />
            precisa ser <br />
            <span className="text-[#FFCA16] italic font-light">lembrada.</span>
          </h1>

          <p className="mt-6 text-white/60 text-[16px] md:text-[19px] max-w-lg text-left font-light leading-[1.45] font-display tracking-tight">
            Estratégia, identidade e presença digital para marcas que querem ser lembradas.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#FFCA16] text-black font-display font-bold text-[11px] uppercase tracking-[0.2em] shadow-[0_4px_25px_rgba(255,202,22,0.3)] hover:shadow-[0_4px_35px_rgba(255,202,22,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <span>Explorar Cases</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href="https://wa.me/5511991076096?text=Ol%C3%A1%20Studio%20Kiiro%2C%20quero%20conversar%20sobre%20um%20projeto."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#FFCA16]/40 text-white/80 hover:text-white font-display text-[11px] uppercase tracking-[0.16em] transition-all duration-300 backdrop-blur-md"
            >
              <span>Falar no WhatsApp</span>
            </a>
          </div>

          <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">Studio Kiiro · São Paulo</p>
        </div>

        <div className="kiiro-hero-art w-full lg:w-[41%] flex justify-center items-center relative">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-[360px] w-[360px] rounded-full bg-[#FFCA16]/[0.07] blur-[90px]" aria-hidden="true" />

            <canvas ref={canvasRef} id="hero-canvas" className="relative z-10 cursor-grab active:cursor-grabbing" />
            <span className="absolute bottom-1 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.24em] text-white/35">mova para explorar</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
