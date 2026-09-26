import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

// Ícones vetorizados fiéis às ferramentas mais icônicas do Adobe Illustrator
const SelectionIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-white" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M4 2l12 11.5-5.5 1 3.5 7.5-3 1.5-3.5-7.5L4 18V2z" />
  </svg>
);

const DirectSelectionIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-[#FFCA16]" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <path d="M4 2l12 11.5-5.5 1 3.5 7.5-3 1.5-3.5-7.5L4 18V2z" />
  </svg>
);

// Traçado oficial da Caneta Tinteiro do Illustrator (exportada diretamente do AI)
const PenToolIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-[#FFCA16]" }) => (
  <svg viewBox="0 0 384 384" className={className} fill="currentColor">
    <path d="M110.01,232.12c-.05,2.35.76,3.72,2.54,5.05l60.92,41.44,109.77-54.77,3.44-73.12c.25-2.41-.44-4.09-2.43-5.6L119.43,21.24l68.52,137.4c17.38-5.73,34.96,2.85,41.79,19.53,5.54,13.52,2.76,28.78-8.48,38.37-14.97,13.38-37.67,11.18-49.82-4.31-11.98-15.27-8.86-37.71,7.16-48.91L109.67,25.19l.34,206.94Z" />
    <path d="M175.72,295.51c-1.52-3.04-.66-6,2.23-7.44l110.63-55.21c2.26-1.13,5.39.09,6.47,2.25l32.41,64.87c1.37,2.75-.31,5.76-2.91,7.06l-109.76,54.79c-2.82,1.41-5.88.19-7.23-2.51l-31.83-63.8Z" />
  </svg>
);

const CurvatureIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-white" }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M3 19C5 12 11 7 21 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="11.5" r="2.2" fill="#FFCA16" />
    <path d="M13 13l4 6-2 2-6-4 4-4z" fill="currentColor" />
  </svg>
);

const TypeToolIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-white" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M4 4h16v3.5h-2.5V6.5H13.5v11h2.2v2.5h-7.4V17.5h2.2v-11H6.5v1H4V4z" />
  </svg>
);

const RectangleToolIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-[#FFCA16]" }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <rect x="4.5" y="4.5" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <rect x="2.5" y="2.5" width="3.5" height="3.5" fill="currentColor" />
    <rect x="18" y="2.5" width="3.5" height="3.5" fill="currentColor" />
    <rect x="2.5" y="18" width="3.5" height="3.5" fill="currentColor" />
    <rect x="18" y="18" width="3.5" height="3.5" fill="currentColor" />
  </svg>
);

const MagicWandIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-[#FFCA16]" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M14.5 3.5l6 6-12 12-6-6 12-12zm-9 15l3 3 10.5-10.5-3-3L5.5 18.5z" />
    <path d="M8 2l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2zM19 14l.8 1.5 1.5.8-1.5.8-.8 1.5-.8-1.5-1.5-.8 1.5-.8.8-1.5z" />
  </svg>
);

const BrushToolIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-white" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.8 3.2a2.5 2.5 0 0 0-3.5 0l-7.7 7.7 3.5 3.5 7.7-7.7a2.5 2.5 0 0 0 0-3.5zM6.5 12l3.5 3.5-4 4c-1.5 1.5-4 1-5-.5s-.5-3.5 1-5l4.5-2z" />
  </svg>
);

// Lista balanceada das ferramentas: 4 brancas e 4 amarelas oficiais Kiiro (#FFCA16)
const ILLUSTRATOR_TOOLS = [
  { id: "v", name: "Selection Tool", key: "V", color: "white", Icon: SelectionIcon },
  { id: "a", name: "Direct Selection", key: "A", color: "yellow", Icon: DirectSelectionIcon },
  { id: "p", name: "Pen Tool", key: "P", color: "yellow", Icon: PenToolIcon },
  { id: "curv", name: "Curvature Tool", key: "Shift+~", color: "white", Icon: CurvatureIcon },
  { id: "t", name: "Type Tool", key: "T", color: "white", Icon: TypeToolIcon },
  { id: "m", name: "Rectangle Tool", key: "M", color: "yellow", Icon: RectangleToolIcon },
  { id: "y", name: "Magic Wand", key: "Y", color: "yellow", Icon: MagicWandIcon },
  { id: "b", name: "Paintbrush", key: "B", color: "white", Icon: BrushToolIcon },
];

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterTextRef = useRef<HTMLSpanElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const penCursorRef = useRef<SVGGElement>(null);
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    // Número de colunas para a saída em persiana (estilo cortina de prancheta)
    const count = window.innerWidth < 768 ? 6 : 10;
    setColumns(Array.from({ length: count }, (_, i) => i));
  }, []);

  useEffect(() => {
    if (columns.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Entrada fluida do dock de ferramentas e elementos da prancheta
      tl.fromTo(
        ".ai-dock-item",
        { opacity: 0, y: 14, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.04,
          ease: "back.out(1.8)",
        }
      );

      // 2. Traçado vetorial dinâmico (Pen Tool desenha o caminho na prancheta com nós/âncoras)
      if (pathRef.current) {
        const pathLen = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLen,
          strokeDashoffset: pathLen,
        });

        tl.to(
          pathRef.current,
          {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: "power2.inOut",
          },
          "-=0.25"
        );
      }

      // 3. Pen Tool acompanhando o traçado
      if (penCursorRef.current) {
        tl.to(
          penCursorRef.current,
          {
            x: 180,
            y: -20,
            duration: 1.1,
            ease: "power2.inOut",
          },
          "-=1.1"
        );
      }

      // 4. Surgimento dos pontos de ancoragem (âncoras [■] e manípulos bezier)
      tl.fromTo(
        ".ai-anchor-point",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          stagger: 0.08,
          ease: "back.out(2)",
        },
        "-=0.8"
      );

      // 5. Barra de progresso ágil (0 a 100%)
      tl.to(
        progressBarRef.current,
        {
          width: "100%",
          duration: 1.25,
          ease: "power2.inOut",
        },
        0.1
      );

      // Contador numérico em tempo real (0 a 100%)
      const counterObj = { val: 0 };
      tl.to(
        counterObj,
        {
          val: 100,
          duration: 1.25,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterTextRef.current) {
              counterTextRef.current.innerText = `${Math.round(counterObj.val)}%`;
            }
          },
        },
        0.1
      );

      // 6. Varredura de seleção nas ferramentas (simula troca de ferramenta no Illustrator)
      tl.to(
        ".ai-dock-active-glow",
        {
          x: 200,
          duration: 1.0,
          ease: "power1.inOut",
        },
        0.3
      );

      // 7. Saída elegante em persiana rápida (revela o site sem atrasar o usuário)
      tl.to(".ai-main-content", {
        opacity: 0,
        scale: 0.96,
        duration: 0.25,
        ease: "power2.in",
      });

      tl.to(
        ".ai-preloader-col",
        {
          y: "-100%",
          duration: 0.65,
          stagger: {
            amount: 0.28,
            from: "center",
          },
          ease: "power4.inOut",
          onComplete: () => {
            onComplete();
          },
        },
        "-=0.1"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [columns, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden select-none"
      role="status"
      aria-label="Carregando Studio Kiiro"
    >
      {/* ── COLUNAS DE FUNDO PRETO PARA TRANSIÇÃO DE REVELAÇÃO EM PERSIANA ── */}
      <div className="absolute inset-0 flex pointer-events-none z-0">
        {columns.map((i) => (
          <div
            key={i}
            className="ai-preloader-col flex-1 bg-[#050505] border-x border-white/[0.04]"
          />
        ))}
      </div>

      {/* ── GRID MINIMALISTA DE PRANCHETA (ILLUSTRATOR ARTBOARD GUIDES) ──── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] z-[1]"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── CABEÇALHO HUD DA PRANCHETA (ESTILO ADOBE ILLUSTRATOR) ─────────── */}
      <div className="ai-main-content relative z-10 w-full max-w-lg px-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-8 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFCA16] animate-pulse" />
          <span>KIIRO_WORKSPACE.ai @ 100% (CMYK/Preview)</span>
        </div>

        {/* ── PALCO VETORIAL: CANETA DESENHANDO CURVA BEZIER COM ÂNCORAS ───── */}
        <div className="relative w-64 h-24 mb-6 flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 240 90">
            {/* Linhas de apoio/manípulos do Illustrator */}
            <line x1="30" y1="65" x2="65" y2="25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="210" y1="65" x2="175" y2="25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />

            {/* Curva Bezier Principal Desenhada pela Caneta */}
            <path
              ref={pathRef}
              d="M 30 65 C 80 15, 160 15, 210 65"
              fill="none"
              stroke="#FFCA16"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Pontos de Ancoragem (Âncoras clássicas quadradas com puxadores) */}
            <g className="ai-anchor-point">
              <rect x="26" y="61" width="8" height="8" fill="#FFFFFF" stroke="#050505" strokeWidth="1.5" />
            </g>
            <g className="ai-anchor-point">
              <circle cx="65" cy="25" r="3" fill="#FFCA16" />
            </g>
            <g className="ai-anchor-point">
              <circle cx="175" cy="25" r="3" fill="#FFCA16" />
            </g>
            <g className="ai-anchor-point">
              <rect x="206" y="61" width="8" height="8" fill="#FFFFFF" stroke="#050505" strokeWidth="1.5" />
            </g>

            {/* Caneta Tinteiro animada no traçado */}
            <g ref={penCursorRef} transform="translate(25, 45)">
              <svg x="0" y="0" width="22" height="22" viewBox="0 0 384 384" className="drop-shadow-[0_4px_12px_rgba(255,202,22,0.6)]">
                <path
                  d="M110.01,232.12c-.05,2.35.76,3.72,2.54,5.05l60.92,41.44,109.77-54.77,3.44-73.12c.25-2.41-.44-4.09-2.43-5.6L119.43,21.24l68.52,137.4c17.38-5.73,34.96,2.85,41.79,19.53,5.54,13.52,2.76,28.78-8.48,38.37-14.97,13.38-37.67,11.18-49.82-4.31-11.98-15.27-8.86-37.71,7.16-48.91L109.67,25.19l.34,206.94Z"
                  fill="#FFCA16"
                />
                <path
                  d="M175.72,295.51c-1.52-3.04-.66-6,2.23-7.44l110.63-55.21c2.26-1.13,5.39.09,6.47,2.25l32.41,64.87c1.37,2.75-.31,5.76-2.91,7.06l-109.76,54.79c-2.82,1.41-5.88.19-7.23-2.51l-31.83-63.8Z"
                  fill="#FFFFFF"
                />
              </svg>
            </g>
          </svg>
        </div>

        {/* ── BARRA FLUTUANTE DE FERRAMENTAS DO ILLUSTRATOR (DOCK MINIMALISTA) ─── */}
        <div className="relative flex items-center gap-2 sm:gap-2.5 bg-[#0e0e0e]/90 border border-white/10 p-2 sm:p-2.5 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-8">
          {/* Brilho sutil de ferramenta ativa */}
          <div className="ai-dock-active-glow absolute top-2 bottom-2 left-2 w-10 bg-[#FFCA16]/10 rounded-xl border border-[#FFCA16]/30 pointer-events-none" />

          {ILLUSTRATOR_TOOLS.map((tool) => {
            const Icon = tool.Icon;
            const isYellow = tool.color === "yellow";
            return (
              <div
                key={tool.id}
                className="ai-dock-item relative group flex flex-col items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-colors hover:bg-white/5"
                title={`${tool.name} (${tool.key})`}
              >
                <Icon className={`w-5 h-5 ${isYellow ? "text-[#FFCA16]" : "text-white"} transition-transform group-hover:scale-110`} />
                <span className="sr-only">{tool.name}</span>
                {/* Marcador de canto característico do Illustrator (ferramenta com submenu) */}
                <span className="absolute bottom-1 right-1 w-0 h-0 border-solid border-b-[3px] border-r-[3px] border-l-transparent border-t-transparent border-r-white/30 border-b-white/30" />
              </div>
            );
          })}
        </div>

        {/* ── BARRA DE PROGRESSO & CONTADOR HUD ────────────────────────────── */}
        <div className="w-56 sm:w-64 flex flex-col items-center gap-2.5 font-mono">
          <div className="w-full flex justify-between items-center text-[11px] text-white/60">
            <span className="text-[#FFCA16] font-semibold tracking-wider">CARREGANDO</span>
            <span ref={counterTextRef} className="font-bold text-white tracking-widest">
              0%
            </span>
          </div>

          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#FFCA16] via-[#FFE279] to-[#FFCA16] w-0 shadow-[0_0_12px_rgba(255,202,22,0.8)]"
            />
          </div>

          <div className="flex items-center gap-3 text-[9px] text-white/30 tracking-widest uppercase pt-1">
            <span>STUDIO KIIRO</span>
            <span>•</span>
            <span>DESIGN & IDENTIDADE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
