import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Briefing e Imersão",
    description: "Iniciamos com uma conversa profunda para entender sua essência, objetivos e o público que deseja alcançar."
  },
  {
    number: "02",
    title: "Pesquisa e Estratégia",
    description: "Analisamos o mercado e a concorrência para definir o caminho estratégico único para sua marca."
  },
  {
    number: "03",
    title: "Criação e Design",
    description: "Traduzimos a estratégia em formas, cores e tipografia, criando uma identidade visual marcante."
  },
  {
    number: "04",
    title: "Apresentação e Ajustes",
    description: "Apresentamos o conceito e refinamos cada detalhe com base no seu feedback até a perfeição."
  },
  {
    number: "05",
    title: "Entrega Final",
    description: "Entregamos todos os arquivos organizados e prontos para uso em todas as plataformas."
  }
];

const ProcessStep = ({ step, idx }: { step: typeof steps[0], idx: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax movement for the background number
  const numberTranslateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const smoothNumberY = useSpring(numberTranslateY, { stiffness: 50, damping: 20 });
  
  // Entrance/Exit fade and slight movement for the content
  const contentTranslateY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const smoothContentY = useSpring(contentTranslateY, { stiffness: 60, damping: 25 });

  return (
    <div ref={containerRef} className="relative py-20 md:py-32">
      <motion.div
        style={{ 
          opacity: contentOpacity,
          y: smoothContentY,
          x: idx % 2 === 0 ? 0 : 0 // We can add x movement if wanted, but y is cleaner for vertical scroll
        }}
        className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
      >
        {/* Connection dot */}
        <div className="absolute left-[16px] md:left-1/2 md:-translate-x-1/2 top-10 w-2.5 h-2.5 bg-[#FFCA16] rounded-full z-10 shadow-[0_0_25px_rgba(255,202,22,0.9)]" />
        
        {/* Number (Large Background with Parallax) */}
        <motion.span 
          style={{ y: smoothNumberY }}
          className={`absolute font-display text-[100px] sm:text-[150px] md:text-[280px] font-[800] text-[#FFCA16]/[0.04] md:text-[#FFCA16]/[0.07] leading-none pointer-events-none select-none z-0 ${idx % 2 === 0 ? 'left-6 md:left-auto md:right-[45%]' : 'left-6 md:left-[45%]'}`}
        >
          {step.number}
        </motion.span>

        <div className={`w-full md:w-[45%] relative z-10 px-8 md:px-0 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
          <h3 className="font-display text-[36px] md:text-[52px] font-[800] text-white mb-8 tracking-tighter leading-[0.9] group-hover:text-[#FFCA16] transition-colors">
            {step.title}
          </h3>
          <p className={`text-white/60 text-[17px] md:text-[19px] leading-relaxed max-w-md ${idx % 2 === 0 ? '' : 'md:ml-auto'} font-light tracking-wide`}>
            {step.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  return (
    <section id="processo" ref={sectionRef} className="relative section-padding bg-[#070807] border-t border-white/[0.05] overflow-hidden">
      {/* Monumental backdrop word with slight parallax */}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-6 md:-left-10 top-[5%] md:top-[8%] font-display font-[900] text-white/[0.015] leading-none tracking-extratight pointer-events-none select-none"
        style={{ fontSize: "clamp(120px, 25vw, 400px)" }}
      >
        processo
      </motion.span>

      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      <div className="container-editorial relative z-10">
        <div className="flex flex-col items-center text-center mb-40">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-[#FFCA16] text-[12px] font-bold uppercase tracking-[0.5em] mb-10">
              Nossa Metodologia
            </span>
            <h2 className="font-display text-[54px] md:text-[96px] font-[900] text-white leading-[0.8] tracking-extratighter mb-12">
              Como damos vida <br /> à sua <span className="text-[#FFCA16] italic font-light">visão.</span>
            </h2>
          </motion.div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Vertical line connecting steps */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#FFCA16]/60 via-[#FFCA16]/20 to-transparent" />

          <div className="space-y-20 md:space-y-0">
            {steps.map((step, idx) => (
              <ProcessStep key={idx} step={step} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
