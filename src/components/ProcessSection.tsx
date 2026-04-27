import { motion } from "framer-motion";

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

const ProcessSection = () => {
  return (
    <section id="processo" className="relative section-padding bg-[#070807] border-t border-white/[0.05] overflow-x-hidden">
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="container-editorial relative z-10">
        <div className="flex flex-col items-center text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block text-[#FFCA16] text-[11px] font-bold uppercase tracking-[0.4em] mb-8">
              Nossa Metodologia
            </span>
            <h2 className="font-display text-[48px] md:text-[80px] font-[800] text-white leading-[0.85] tracking-extratight mb-12">
              Como damos vida <br /> à sua <span className="text-[#FFCA16] italic font-light">visão.</span>
            </h2>
          </motion.div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line connecting steps */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#FFCA16]/40 via-[#FFCA16]/10 to-transparent" />

          <div className="space-y-40 md:space-y-64">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Connection dot */}
                <div className="absolute left-[16px] md:left-1/2 md:-translate-x-1/2 top-10 w-2 h-2 bg-[#FFCA16] rounded-full z-10 shadow-[0_0_20px_rgba(255,202,22,0.8)]" />
                
                {/* Number (Large Background) */}
                <span className={`absolute top-[-40px] md:top-[-100px] font-display text-[80px] sm:text-[120px] md:text-[220px] font-[800] text-[#FFCA16]/[0.03] md:text-[#FFCA16]/[0.05] leading-none pointer-events-none select-none ${idx % 2 === 0 ? 'left-6 md:left-auto md:right-1/2 md:translate-x-[60%]' : 'left-6 md:left-1/2 md:translate-x-[-60%]'}`}>
                  {step.number}
                </span>

                <div className={`w-full md:w-[42%] pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block mb-6"
                  >
                    <span className="text-[#FFCA16] text-[12px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 border border-[#FFCA16]/20 bg-[#FFCA16]/5">
                      Fase {step.number}
                    </span>
                  </motion.div>
                  <h3 className="font-display text-[32px] md:text-[42px] font-bold text-white mb-6 tracking-tight leading-tight group-hover:text-[#FFCA16] transition-colors">
                    {step.title}
                  </h3>
                  <p className={`text-white/50 text-[16px] md:text-[18px] leading-relaxed max-w-md ${idx % 2 === 0 ? '' : 'md:ml-auto'} font-light`}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;