import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    number: "01",
    title: "IDV",
    fullTitle: "Identidade Visual",
    items: [
      { 
        name: "Logotipo Essencial", 
        description: "Criação de logotipo principal, secundário, símbolo e paleta de cores estratégica para seu negócio.",
        indicatedFor: "Novos negócios e empreendedores que precisam de uma base visual sólida e profissional."
      },
      { 
        name: "Branding Completo", 
        description: "Desenvolvimento de todo o universo visual da marca, incluindo estratégia, tipografia, texturas e manual.",
        indicatedFor: "Marcas que buscam um posicionamento premium e diferenciação clara no mercado."
      },
      { 
        name: "Personal Brand Kit", 
        description: "Identidade visual personalizada para profissionais liberais, focada em autoridade e conexão pessoal.",
        indicatedFor: "Palestrantes, consultores, médicos e profissionais que são a cara do próprio negócio."
      }
    ]
  },
  {
    number: "02",
    title: "Social Media",
    fullTitle: "Design para Redes Sociais",
    items: [
      { 
        name: "Pacote Mensal", 
        description: "Gestão visual completa das redes sociais com artes estratégicas e alinhadas ao branding.",
        indicatedFor: "Empresas que precisam de constância e qualidade visual diária em seus canais digitais."
      },
      { 
        name: "Carrosséis", 
        description: "Criação de posts em formato carrossel focados em retenção, educação e conversão de público.",
        indicatedFor: "Criadores de conteúdo e marcas que desejam aumentar o engajamento e autoridade."
      }
    ]
  },
  {
    number: "03",
    title: "Vídeo",
    fullTitle: "Edição de Vídeo",
    items: [
      { 
        name: "Reels / Shorts", 
        description: "Edição dinâmica de vídeos curtos com legendas, trilhas e cortes que retêm a atenção.",
        indicatedFor: "Marcas que desejam crescer organicamente através de conteúdos em vídeo de alto impacto."
      },
      { 
        name: "Vídeo Institucional", 
        description: "Produção e edição de vídeos que contam a história e os valores da sua empresa com elegância.",
        indicatedFor: "Empresas que precisam de um material de apresentação profissional para sites e eventos."
      }
    ]
  },
  {
    number: "04",
    title: "Digital",
    fullTitle: "Sites e Landing Pages",
    items: [
      { 
        name: "Landing Pages", 
        description: "Criação de páginas de alta conversão focadas em um único produto, serviço ou captura de leads.",
        indicatedFor: "Lançamentos, venda de infoprodutos e campanhas de tráfego pago."
      },
      { 
        name: "Site Institucional", 
        description: "Desenvolvimento de sites completos e responsivos que servem como vitrine oficial do seu negócio.",
        indicatedFor: "Empresas que buscam credibilidade e uma presença online robusta e organizada."
      }
    ]
  },
  {
    number: "05",
    title: "Pitch Decks",
    fullTitle: "Apresentações",
    items: [
      { 
        name: "Comercial", 
        description: "Design de apresentações de vendas que facilitam o fechamento de negócios e encantam clientes.",
        indicatedFor: "Equipes comerciais e prestadores de serviços que buscam elevar o nível de suas propostas."
      },
      { 
        name: "Institucional", 
        description: "Apresentações corporativas para reuniões, eventos ou parcerias estratégicas.",
        indicatedFor: "Empresas que precisam comunicar sua visão e resultados de forma clara e profissional."
      }
    ]
  }
];

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-28 lg:mb-40">
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

        <div className="flex flex-col border-t border-white/10">
          {services.map((service, idx) => {
            const isActive = activeIndex === idx;
            
            return (
              <div 
                key={idx}
                className="relative group border-b border-white/10"
                onMouseEnter={() => {
                  setActiveIndex(idx);
                  setActiveTab(0);
                }}
              >
                <div className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center py-10 md:py-16 cursor-pointer">
                  <div className="relative z-10 md:col-span-1">
                    <span className="font-display text-[14px] font-bold text-[#FFCA16]/40 group-hover:text-[#FFCA16] transition-colors duration-500">
                      {service.number}
                    </span>
                  </div>
                  
                  <div className="relative z-10 md:col-span-4 mt-2 md:mt-0">
                    <h3 className="font-display text-[28px] md:text-[48px] font-bold text-white group-hover:text-[#FFCA16] transition-colors duration-500 tracking-tight leading-none">
                      {service.fullTitle}
                    </h3>
                  </div>

                  <div className="relative z-10 md:col-span-7 mt-4 md:mt-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-white text-[15px] md:text-[18px] font-light italic">
                      {service.items[0].description.split('.')[0]}.
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-16 px-4 md:px-0">
                        {/* Folder Container */}
                        <div className="relative bg-[#FFCA16] rounded-tr-[40px] rounded-br-[20px] rounded-bl-[20px] pt-12 md:pt-0">
                          
                          {/* Tabs */}
                          <div className="absolute top-0 left-0 -translate-y-[calc(100%-1px)] flex flex-wrap gap-1 z-20">
                            {service.items.map((item, tabIdx) => (
                              <button
                                key={tabIdx}
                                onClick={() => setActiveTab(tabIdx)}
                                onMouseEnter={() => setActiveTab(tabIdx)}
                                className={`
                                  px-6 py-3 text-[12px] font-bold uppercase tracking-wider transition-all duration-300
                                  ${activeTab === tabIdx 
                                    ? "bg-[#FFCA16] text-black rounded-t-xl" 
                                    : "bg-white/5 text-white/40 hover:bg-white/10 rounded-t-lg"}
                                `}
                              >
                                {item.name}
                              </button>
                            ))}
                          </div>

                          {/* Folder Content */}
                          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[300px] p-8 md:p-16 gap-12 items-center">
                            <div className="md:col-span-4">
                              <div className="flex flex-col">
                                <span className="text-black/30 font-display text-[24px] font-bold leading-none mb-2">
                                  {service.number}
                                </span>
                                <h4 className="text-black font-display text-[42px] md:text-[64px] font-black leading-[0.9] tracking-tight">
                                  {service.title.split(' ').map((word, i) => (
                                    <span key={i} className="block">{word}</span>
                                  ))}
                                </h4>
                              </div>
                            </div>

                            <div className="md:col-span-8 flex flex-col gap-8 md:border-l border-black/10 md:pl-16">
                              <div>
                                <h5 className="text-black/40 text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                                  O que é
                                </h5>
                                <p className="text-black text-[18px] md:text-[24px] font-medium leading-tight tracking-tight">
                                  {service.items[activeTab].description}
                                </p>
                              </div>

                              <div>
                                <h5 className="text-black/40 text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                                  Indicado para
                                </h5>
                                <p className="text-black/70 text-[15px] md:text-[16px] leading-relaxed">
                                  {service.items[activeTab].indicatedFor}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;