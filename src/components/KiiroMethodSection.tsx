import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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

const KiiroMethodSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="processo" className="relative overflow-hidden bg-[#0a0c0b] text-white border-t border-white/[0.08]" aria-label="Processo e Metodologia">
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

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-6 py-28 sm:px-10 md:py-36 lg:grid-cols-[0.8fr_1.2fr] lg:px-16">
        {/* COLUNA ESQUERDA: CABEÇALHO STICKY */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#FFCA16]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFCA16] font-bold">
              Nossa Metodologia
            </span>
          </div>

          <h2 className="max-w-xl text-[clamp(3.5rem,6.5vw,6.5rem)] font-black leading-[0.85] tracking-[-0.06em] text-balance">
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

        {/* COLUNA DIREITA: AS 5 ETAPAS DA METODOLOGIA */}
        <div className="border-t border-white/10">
          {method.map((item, index) => (
            <motion.article
              key={item.number}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : index * 0.08 }}
              className="group border-b border-white/10 py-8 md:py-12 relative transition-colors duration-300 hover:border-white/25"
            >
              <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-8">
                {/* Badge do número da etapa */}
                <span className="font-mono text-xs md:text-sm font-bold text-[#FFCA16] bg-[#FFCA16]/10 px-2.5 py-1 rounded border border-[#FFCA16]/20 self-start mt-1">
                  {item.number}
                </span>

                {/* Conteúdo textual da etapa */}
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#FFCA16]">
                    {item.title}
                  </h3>
                  <p className="max-w-xl text-sm md:text-base leading-relaxed text-white/60 font-light font-display">
                    {item.copy}
                  </p>
                </div>

                {/* Ícone de seta indicativa */}
                <ArrowUpRight
                  className="mt-1 hidden h-5 w-5 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FFCA16] md:block"
                  strokeWidth={1.5}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KiiroMethodSection;
