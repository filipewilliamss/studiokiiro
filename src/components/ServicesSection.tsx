import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Identidade Visual",
    description: "Desenvolvimento completo da identidade visual da sua marca: conceito, logotipo, paleta de cores, tipografia, aplicações e guia de uso.",
    recommended: "empresas e projetos que precisam sair do genérico e construir uma presença profissional e consistente em todos os pontos de contato."
  },
  {
    number: "02",
    title: "Design para Redes Sociais",
    description: "Artes estratégicas para construir presença digital consistente: posts, carrosséis, stories e materiais de campanha alinhados à identidade da sua marca.",
    recommended: "negócios que desejam fortalecer posicionamento e reconhecimento nas redes sociais com comunicação visual profissional."
  },
  {
    number: "03",
    title: "Edição de Vídeo",
    description: "Edição de vídeos para redes sociais, anúncios, lançamentos e conteúdos institucionais, com foco em ritmo, narrativa e identidade visual.",
    recommended: "marcas e criadores que já produzem conteúdo em vídeo e precisam de um padrão de edição coerente com o restante da comunicação."
  },
  {
    number: "04",
    title: "Sites e Landing Pages",
    description: "Criação de interfaces para sites institucionais e landing pages focadas em clareza, navegação simples e conversão, alinhadas à identidade visual da marca.",
    recommended: "empresas e projetos que precisam de presença digital estruturada e coerente com seu posicionamento."
  },
  {
    number: "05",
    title: "Apresentações",
    description: "Desenvolvimento de apresentações profissionais para reuniões, propostas comerciais, pitches e eventos, com foco em clareza e impacto visual.",
    recommended: "empresas e profissionais que desejam comunicar valor, dados e histórias com credibilidade e alinhamento à identidade da marca."
  }
];

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="servicos" className="relative section-padding bg-[#070807] border-t border-white/[0.05] overflow-hidden">
      {/* Monumental backdrop word */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="absolute right-[-4%] top-[2%] md:top-[6%] font-display font-[800] text-white/[0.015] md:text-white/[0.025] leading-none tracking-extratight pointer-events-none select-none"
        style={{ fontSize: "clamp(80px, 15vw, 280px)" }}
      >
        services
      </motion.span>

      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20 lg:mb-32">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[#FFCA16] text-[11px] font-bold uppercase tracking-[0.4em]">
                  Soluções Estratégicas
                </span>
              </div>
              <h2 className="font-display text-[52px] md:text-[88px] font-[800] text-white leading-[0.82] tracking-[-0.05em]">
                Elevando o <span className="text-[#FFCA16] italic font-light">padrão</span> visual da sua marca.
              </h2>
            </motion.div>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white/50 text-[16px] md:text-[18px] leading-[1.7] max-w-[400px] font-light"
            >
              Oferecemos um ecossistema completo de design para posicionar seu negócio com autoridade no mercado digital.
            </motion.p>
          </div>
        </div>

        {/* Tab System */}
        <div className="w-full">
          {/* Tabs header */}
          <div className="flex flex-wrap items-end gap-1 px-2 md:px-0">
            {services.map((service, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`
                  relative px-4 md:px-8 py-3 md:py-4 rounded-t-xl font-display text-[12px] md:text-[14px] font-bold tracking-tight transition-all duration-300
                  ${activeTab === idx 
                    ? "bg-[#FFCA16] text-black z-20" 
                    : "bg-[#FFCA16]/5 text-[#FFCA16]/60 hover:bg-[#FFCA16]/20 hover:text-[#FFCA16] z-10"
                  }
                `}
              >
                {service.title}
              </button>
            ))}
          </div>

          {/* Card Content */}
          <div className="bg-[#FFCA16] rounded-b-3xl rounded-tr-3xl md:rounded-tl-none overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-12 items-center p-10 md:p-20 gap-10"
              >
                <div className="md:col-span-5 flex flex-col gap-4">
                  <span className="font-display text-[18px] md:text-[24px] font-bold text-black/30">
                    {services[activeTab].number}
                  </span>
                  <h3 className="font-display text-[42px] md:text-[68px] font-[800] text-black leading-[0.9] tracking-tighter">
                    {services[activeTab].title}
                  </h3>
                </div>

                <div className="md:col-span-7 flex flex-col gap-8">
                  <p className="text-black/80 text-[18px] md:text-[22px] leading-relaxed font-medium">
                    {services[activeTab].description}
                  </p>
                  <div className="pt-8 border-t border-black/10">
                    <p className="text-black/40 text-[12px] md:text-[14px] uppercase font-bold tracking-widest mb-2">
                      Indicado para:
                    </p>
                    <p className="text-black/70 text-[16px] md:text-[18px] leading-relaxed italic">
                      {services[activeTab].recommended}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

// Removed the extra list as requested.
        </div>
      </section>
    );
  };

export default ServicesSection;
