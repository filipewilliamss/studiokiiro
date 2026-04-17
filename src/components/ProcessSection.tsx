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
    <section id="processo" className="relative section-padding bg-[#070807] grid-pattern border-t border-white/[0.05]">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <span className="inline-block px-4 py-1.5 border border-[#FFCA16] text-[#FFCA16] text-[11px] font-bold uppercase tracking-[3px] rounded-none mb-6">
            NOSSO PROCESSO
          </span>
          <h2 className="font-display text-[40px] md:text-[56px] font-[800] text-white leading-none tracking-[-2px]">
            COMO TRABALHAMOS
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line connecting steps */}
          <div className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-[#FFCA16]/20" />

          <div className="space-y-32">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`relative flex flex-col md:flex-row items-start ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Connection dot */}
                <div className="absolute left-[3px] md:left-1/2 md:-translate-x-1/2 top-4 w-3 h-3 bg-[#FFCA16] rounded-full z-10 shadow-[0_0_15px_rgba(255,202,22,0.5)]" />
                
                {/* Number (Large Background) */}
                <span className="absolute left-10 md:left-auto md:right-1/2 top-[-40px] font-display text-[100px] md:text-[140px] font-[800] text-[#FFCA16]/[0.08] leading-none pointer-events-none select-none md:translate-x-[-20%]">
                  {step.number}
                </span>

                <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <h3 className="font-display text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="font-display text-base text-white/50 leading-relaxed max-w-sm ml-0 ${idx % 2 === 0 ? '' : 'md:ml-auto'}">
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