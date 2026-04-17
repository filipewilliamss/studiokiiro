import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="sobre" className="relative section-padding overflow-hidden bg-[#070807] grid-pattern">
      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <span className="inline-block px-4 py-1.5 border border-[#FFCA16] text-[#FFCA16] text-[11px] font-bold uppercase tracking-[3px] rounded-none mb-8">
              SOBRE NÓS
            </span>
            <h2 className="font-display text-[40px] md:text-[56px] font-[800] text-white leading-[0.95] tracking-[-2px] mb-8">
              A ARTE QUE <br />
              <span className="text-[#FFCA16]">CONECTA</span> SUA MARCA
            </h2>
            <p className="font-display text-base text-white/60 mb-10 max-w-lg">
              No Studio Kiiro, transformamos ideias em experiências visuais memoráveis. Nossa missão é elevar o posicionamento da sua marca através de um design estratégico, autêntico e focado em resultados reais para o seu negócio.
            </p>
            <a 
              href="#historia" 
              className="px-8 py-4 border border-white text-white text-[12px] font-bold uppercase tracking-[2px] hover:bg-white hover:text-black transition-all duration-300"
            >
              CONHEÇA NOSSA HISTÓRIA
            </a>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-[#FFCA16]/[0.03] border border-[#FFCA16]/20 p-10 md:p-12">
              <div className="space-y-12">
                <div className="flex flex-col">
                  <span className="font-display text-[48px] md:text-[56px] font-[800] text-[#FFCA16] leading-none mb-1">
                    5+
                  </span>
                  <span className="text-white/60 text-sm uppercase tracking-[2px] font-medium">
                    Anos de experiência
                  </span>
                </div>
                
                <div className="h-px bg-white/10 w-full" />
                
                <div className="flex flex-col">
                  <span className="font-display text-[48px] md:text-[56px] font-[800] text-[#FFCA16] leading-none mb-1">
                    80+
                  </span>
                  <span className="text-white/60 text-sm uppercase tracking-[2px] font-medium">
                    Projetos entregues
                  </span>
                </div>
                
                <div className="h-px bg-white/10 w-full" />
                
                <div className="flex flex-col">
                  <span className="font-display text-[48px] md:text-[56px] font-[800] text-[#FFCA16] leading-none mb-1">
                    40+
                  </span>
                  <span className="text-white/60 text-sm uppercase tracking-[2px] font-medium">
                    Clientes ativos
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;