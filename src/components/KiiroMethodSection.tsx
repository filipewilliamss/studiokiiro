import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { playPillHover } from "@/utils/soundEffects";

const method = [
  {
    number: "01",
    title: "Briefing e Imersão",
    copy: "Iniciamos com uma conversa profunda para entender sua essência, objetivos e o público que deseja alcançar.",
  },
  {
    number: "02",
    title: "Pesquisa e Estratégia",
    copy: "Analisamos o mercado e a concorrência para definir o caminho estratégico único para sua marca.",
  },
  {
    number: "03",
    title: "Criação e Design",
    copy: "Traduzimos a estratégia em formas, cores e tipografia, criando uma identidade visual marcante.",
  },
  {
    number: "04",
    title: "Apresentação e Ajustes",
    copy: "Apresentamos o conceito e refinamos cada detalhe com base no seu feedback até a perfeição.",
  },
  {
    number: "05",
    title: "Entrega Final",
    copy: "Entregamos todos os arquivos organizados e prontos para uso em todas as plataformas.",
  },
];

interface MagneticParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  radius: number;
  offsetNorm: number;
  lateralOffset: number;
  seed: number;
}

const KiiroMethodSection = () => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const lastActiveStepRef = useRef(0);
  const stepYPositions = useRef<number[]>([]);

  // Rastreia o progresso da rolagem pela seção da metodologia
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 75%"],
  });

  // Atualiza as posições exatas Y de cada etapa no canvas
  const updateStepPositions = () => {
    if (!stepsContainerRef.current) return;
    const articles = stepsContainerRef.current.querySelectorAll<HTMLElement>("[data-method-step]");
    const containerRect = stepsContainerRef.current.getBoundingClientRect();
    const positions: number[] = [];
    articles.forEach((art) => {
      const rect = art.getBoundingClientRect();
      const centerY = rect.top - containerRect.top + rect.height / 2;
      positions.push(centerY);
    });
    if (positions.length > 0) {
      stepYPositions.current = positions;
    }
  };

  useEffect(() => {
    updateStepPositions();
    window.addEventListener("resize", updateStepPositions);
    return () => window.removeEventListener("resize", updateStepPositions);
  }, []);

  // Monitora o progresso para atualizar a etapa ativa e tocar som tátil
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (p) => {
      // 5 etapas distribuídas ao longo de [0, 1]
      const step = Math.min(Math.floor(p * 5), 4);
      if (step !== lastActiveStepRef.current) {
        lastActiveStepRef.current = step;
        setActiveStep(step);
        playPillHover(step);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Canvas de Partículas Magnéticas (Estilo Escultura Kiiro do Hero)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      if (!stepsContainerRef.current) return;
      const rect = stepsContainerRef.current.getBoundingClientRect();
      width = 56; // largura do canal magnético
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      updateStepPositions();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Cria as 36 partículas magnéticas que compõem o fluxo
    const PARTICLE_COUNT = 36;
    const particles: MagneticParticle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: width / 2,
        y: 0,
        z: (Math.random() - 0.5) * 30,
        vx: 0,
        vy: 0,
        radius: 2.8 + Math.random() * 3.4,
        offsetNorm: (i - PARTICLE_COUNT / 2) * 5.5,
        lateralOffset: (Math.random() - 0.5) * 16,
        seed: Math.random() * Math.PI * 2,
      });
    }

    const mouse = { x: -1000, y: -1000, inside: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.inside =
        mouse.x >= -60 &&
        mouse.x <= width + 280 &&
        mouse.y >= 0 &&
        mouse.y <= height;
    };

    const handleMouseLeave = () => {
      mouse.inside = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const startTime = performance.now();

    const render = (now: number) => {
      const t = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      const positions = stepYPositions.current;
      const spineX = width / 2;

      if (positions.length >= 5) {
        const p = scrollYProgress.get();
        // Interpola a posição Y alvo do fluxo de partículas ao longo dos nós
        const segment = p * (positions.length - 1);
        const segIdx = Math.min(Math.floor(segment), positions.length - 2);
        const segFrac = segment - segIdx;
        const currentHeadY = positions[segIdx] + (positions[segIdx + 1] - positions[segIdx]) * segFrac;

        // 1. Trilha guia de fundo (Spine inativo)
        ctx.beginPath();
        ctx.moveTo(spineX, positions[0]);
        ctx.lineTo(spineX, positions[positions.length - 1]);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // 2. Trilha ativa iluminada pelo progresso
        if (currentHeadY > positions[0]) {
          ctx.beginPath();
          ctx.moveTo(spineX, positions[0]);
          ctx.lineTo(spineX, currentHeadY);
          const trackGrad = ctx.createLinearGradient(spineX, positions[0], spineX, currentHeadY);
          trackGrad.addColorStop(0, "rgba(255, 202, 22, 0.25)");
          trackGrad.addColorStop(1, "rgba(255, 202, 22, 0.85)");
          ctx.strokeStyle = trackGrad;
          ctx.lineWidth = 2;
          ctx.shadowColor = "#FFCA16";
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0; // reset
        }

        // 3. Nós dos 5 passos na espinha
        positions.forEach((posY, idx) => {
          const isPassed = idx <= activeStep;
          const isCurrent = idx === activeStep;

          ctx.beginPath();
          ctx.arc(spineX, posY, isCurrent ? 5.5 : 3.5, 0, Math.PI * 2);

          if (isCurrent) {
            // Anel pulsante no nó ativo
            const pulseR = 5.5 + Math.sin(t * 4) * 2;
            ctx.beginPath();
            ctx.arc(spineX, posY, pulseR, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(255, 202, 22, 0.4)";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Ponto central
            ctx.beginPath();
            ctx.arc(spineX, posY, 4, 0, Math.PI * 2);
            ctx.fillStyle = "#FFCA16";
            ctx.shadowColor = "#FFCA16";
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else if (isPassed) {
            ctx.fillStyle = "#FFCA16";
            ctx.fill();
          } else {
            ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
            ctx.fill();
          }
        });

        // 4. Atualização e renderização das partículas magnéticas
        // Ordena por Z para profundidade 3D
        particles.sort((a, b) => a.z - b.z);

        particles.forEach((pt) => {
          // Movimento orgânico ondulatório suave
          const breatheY = Math.sin(t * 2.2 + pt.seed) * 9;
          const breatheX = Math.cos(t * 1.8 + pt.seed) * 6;

          const targetY = currentHeadY + pt.offsetNorm + breatheY;
          const targetX = spineX + pt.lateralOffset + breatheX;

          // Repulsão magnética quando o cursor se aproxima
          if (mouse.inside) {
            const mdx = pt.x - mouse.x;
            const mdy = pt.y - mouse.y;
            const dist = Math.hypot(mdx, mdy);
            const maxDist = 95;
            if (dist < maxDist && dist > 0.001) {
              const force = (1 - dist / maxDist) * 14;
              pt.vx += (mdx / dist) * force * 0.28;
              pt.vy += (mdy / dist) * force * 0.28;
            }
          }

          // Retorno elástico à trilha
          pt.vx += (targetX - pt.x) * 0.085;
          pt.vy += (targetY - pt.y) * 0.085;
          pt.vx *= 0.82;
          pt.vy *= 0.82;
          pt.x += pt.vx;
          pt.y += pt.vy;

          const r = Math.max(1.8, pt.radius + pt.z * 0.05);

          // Halo âmbar suave ao redor de cada partícula
          const auraGrad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r * 2.8);
          auraGrad.addColorStop(0, "rgba(255, 202, 22, 0.45)");
          auraGrad.addColorStop(1, "rgba(255, 202, 22, 0)");
          ctx.fillStyle = auraGrad;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, r * 2.8, 0, Math.PI * 2);
          ctx.fill();

          // Corpo esférico de vidro obsidiano escuro
          const sphereGrad = ctx.createRadialGradient(
            pt.x - r * 0.35,
            pt.y - r * 0.35,
            0,
            pt.x,
            pt.y,
            r
          );
          sphereGrad.addColorStop(0, "#2c312e");
          sphereGrad.addColorStop(0.45, "#121514");
          sphereGrad.addColorStop(1, "#070807");
          ctx.fillStyle = sphereGrad;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
          ctx.fill();

          // Borda de refração canário dourada (#FFCA16)
          ctx.strokeStyle = "rgba(255, 202, 22, 0.75)";
          ctx.lineWidth = 1;
          ctx.stroke();

          // Ponto de brilho especular branco no topo da esfera
          ctx.beginPath();
          ctx.arc(pt.x - r * 0.35, pt.y - r * 0.35, r * 0.28, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.fill();
        });
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reduceMotion, scrollYProgress, activeStep]);

  return (
    <section
      id="processo"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0c0b] text-white border-t border-white/[0.08]"
      aria-label="Processo e Metodologia"
    >
      {/* Luz de fundo atmosférica */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,202,22,0.08),transparent_35%),radial-gradient(circle_at_90%_80%,rgba(255,255,255,0.03),transparent_28%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Marca d'água técnica de fundo */}
      <span
        aria-hidden="true"
        className="absolute -left-6 md:-left-10 top-[5%] font-display font-[900] text-white/[0.015] leading-none tracking-[-0.08em] pointer-events-none select-none text-[clamp(100px,20vw,320px)]"
      >
        processo
      </span>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:gap-16 px-6 py-28 sm:px-10 md:py-36 lg:grid-cols-[0.8fr_1.2fr] lg:px-16">
        {/* COLUNA ESQUERDA: CABEÇALHO STICKY */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#FFCA16] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFCA16] font-bold">
              Nossa Metodologia
            </span>
          </div>

          <h2 className="max-w-xl text-[clamp(3.2rem,6vw,6rem)] font-black leading-[0.86] tracking-[-0.06em] text-balance">
            Como damos vida <br />
            <em className="font-light italic text-[#FFCA16]">à sua visão.</em>
          </h2>

          <p className="mt-8 max-w-md text-base leading-relaxed text-white/60 md:text-lg font-light font-display">
            Um caminho claro, estratégico e transparente para transformar uma ideia em uma presença que permanece e gera reconhecimento.
          </p>

          <a
            href="https://wa.me/5511991076096?text=Ol%C3%A1%20Studio%20Kiiro%2C%20gostaria%20de%20conversar%20sobre%20o%20processo%20e%20metodologia%20de%20um%20projeto."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 border-b border-white/35 pb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white transition-colors hover:border-[#FFCA16] hover:text-[#FFCA16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCA16]"
          >
            Conversar sobre um projeto
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>

        {/* COLUNA DIREITA: TRILHA MAGNÉTICA + AS 5 ETAPAS DA METODOLOGIA */}
        <div ref={stepsContainerRef} className="relative pl-12 sm:pl-16 border-t border-white/10">
          {/* Canvas da Trilha e Partículas Magnéticas */}
          <canvas
            ref={canvasRef}
            className="absolute left-0 top-0 pointer-events-auto z-10"
            aria-hidden="true"
          />

          {method.map((item, index) => {
            const isCurrent = index === activeStep;
            const isPassed = index <= activeStep;

            return (
              <motion.article
                key={item.number}
                data-method-step
                initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion ? 0 : index * 0.08,
                }}
                className={`group border-b border-white/10 py-8 md:py-12 relative transition-all duration-500 ${
                  isCurrent
                    ? "opacity-100"
                    : isPassed
                    ? "opacity-80"
                    : "opacity-45 hover:opacity-75"
                }`}
              >
                <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-8">
                  {/* Badge do número da etapa — Ilumina dinamicamente quando as partículas chegam */}
                  <span
                    className={`font-mono text-xs md:text-sm font-bold px-3 py-1 rounded-full border self-start mt-1 transition-all duration-500 ${
                      isCurrent
                        ? "text-black bg-[#FFCA16] border-[#FFCA16] shadow-[0_0_24px_rgba(255,202,22,0.45)] scale-105"
                        : isPassed
                        ? "text-[#FFCA16] bg-[#FFCA16]/15 border-[#FFCA16]/30"
                        : "text-white/40 bg-white/5 border-white/10"
                    }`}
                  >
                    {item.number}
                  </span>

                  {/* Conteúdo textual da etapa */}
                  <div className="space-y-3">
                    <h3
                      className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-300 ${
                        isCurrent
                          ? "text-[#FFCA16]"
                          : "text-white group-hover:text-[#FFCA16]"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="max-w-xl text-sm md:text-base leading-relaxed text-white/60 font-light font-display">
                      {item.copy}
                    </p>
                  </div>

                  {/* Ícone de seta indicativa */}
                  <ArrowUpRight
                    className={`mt-1 hidden h-5 w-5 transition-all duration-300 md:block ${
                      isCurrent
                        ? "text-[#FFCA16] -translate-y-1 translate-x-1"
                        : "text-white/30 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FFCA16]"
                    }`}
                    strokeWidth={1.5}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KiiroMethodSection;
