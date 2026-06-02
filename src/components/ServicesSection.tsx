import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    number: "01",
    id: "identidade-visual",
    title: "Identidade Visual",
    items: [
      {
        title: "Identidade Visual",
        description: "Serviço indicado para empresas, marcas e profissionais que precisam de uma identidade visual completa e consistente.\n\nPode incluir criação de logotipo, paleta de cores, tipografia, elementos gráficos, padrões visuais e orientações de uso da marca.\n\nIdeal para quem está começando uma marca ou quer reposicionar a comunicação visual do negócio"
      },
      {
        title: "Logotipo Essencial",
        description: "Serviço indicado para quem precisa de um logotipo profissional de forma mais objetiva.\n\nInclui criação de um logotipo alinhado ao segmento, público e personalidade da marca. É ideal para negócios em fase inicial ou para quem precisa organizar melhor sua apresentação visual.\n\nAntes do orçamento final, é necessário entender o nome da marca, segmento, estilo desejado e prazo."
      },
      {
        title: "Branding Completo",
        description: "Serviço mais estratégico, indicado para marcas que precisam construir ou reposicionar sua imagem.\n\nPode incluir identidade visual, posicionamento, direção criativa, tom de comunicação, aplicações visuais e orientações para manter a marca consistente.\n\nÉ indicado para empresas que querem uma marca mais forte, memorável e profissional."
      },
      {
        title: "Personal Brand Kit",
        description: "Serviço voltado para profissionais, especialistas, criadores de conteúdo, consultores e prestadores de serviço que querem fortalecer sua marca pessoal.\n\nPode incluir identidade visual pessoal, foto de perfil profissional, capas, templates para redes sociais, apresentação pessoal e materiais de apoio.\n\nIdeal para quem quer transmitir mais autoridade, profissionalismo e confiança."
      }
    ]
  },
  {
    number: "02",
    id: "social-media",
    title: "Design para Redes Sociais",
    items: [
      {
        title: "Design para Redes Sociais",
        description: "Artes estratégicas para construir presença digital consistente: posts, carrosséis, stories e materiais de campanha alinhados à identidade da sua marca."
      }
    ]
  },
  {
    number: "03",
    id: "video",
    title: "Edição de Vídeo",
    items: [
      {
        title: "Edição de video - Reels / Shorts",
        description: "Edição dinâmica e viciante para vídeos curtos, focada em retenção, legendas animadas e trilhas que convertem."
      },
      {
        title: "Video institucional",
        description: "Produção de vídeos que contam a história da sua empresa, apresentando produtos ou serviços de forma elegante e profissional."
      },
      {
        title: "Video Tutorial / Educativo",
        description: "Edição focada em clareza pedagógica, com elementos gráficos, destaques de tela e ritmo ideal para aprendizado."
      }
    ]
  },
  {
    number: "04",
    id: "web",
    title: "Sites e Landing Pages",
    items: [
      {
        title: "Sites e Landing Pages",
        description: "Criação de interfaces para sites institucionais e landing pages focadas em clareza, navegação simples e conversão, alinhadas à identidade visual da marca."
      }
    ]
  },
  {
    number: "05",
    id: "apresentacoes",
    title: "Apresentações",
    items: [
      {
        title: "Apresentações",
        description: "Desenvolvimento de apresentações profissionais para reuniões, propostas comerciais, pitches e eventos, com foco em clareza e impacto visual."
      }
    ]
  }
];

const ServiceCard = ({ service }: { service: typeof services[0] }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeItem = service.items[activeIdx];

  return (
    <div className="w-full transition-transform duration-500 hover:scale-[1.01]">
      {/* Tabs header */}
      <div className="flex flex-nowrap md:flex-nowrap lg:flex-wrap items-end gap-1 px-2 md:px-0 overflow-x-auto md:overflow-visible">
        {service.items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`relative px-4 md:px-3 lg:px-8 py-3 md:py-3 lg:py-4 rounded-t-xl font-display text-[12px] md:text-[11px] lg:text-[14px] font-bold tracking-tight transition-all duration-300 z-20 whitespace-nowrap flex-shrink-0
              ${activeIdx === idx 
                ? 'bg-[#FFCA16] text-black shadow-[0_-4px_10px_rgba(255,202,22,0.15)]' 
                : 'bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/50'
              }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Card Content */}
      <div className="bg-[#FFCA16] rounded-b-3xl rounded-tr-3xl overflow-hidden shadow-2xl relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-12 items-center p-8 md:p-14 lg:p-16 gap-8 md:gap-10"
          >
            <div className="md:col-span-6 flex flex-col gap-4">
              <span className="font-display text-[18px] md:text-[24px] font-bold text-black/30">
                {service.number}
              </span>
              <h3 className="font-display text-[32px] md:text-[52px] lg:text-[62px] font-[800] text-black leading-[0.9] tracking-tighter">
                {activeItem.title}
              </h3>
            </div>

            <div className="md:col-span-6 flex flex-col gap-6">
              <p className="text-black/80 text-[14.4px] md:text-[17.1px] lg:text-[18.9px] leading-relaxed font-medium whitespace-pre-line">
                {activeItem.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const ServicesSection = () => {
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
        style={{ fontSize: "clamp(100px, 18vw, 280px)" }}
      >
        services
      </motion.span>

      <div className="container-editorial relative z-10">
        <div className="mb-20 lg:mb-32">
          <div className="max-w-5xl">
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
        </div>

        {/* Individual Cards for each service */}
        <div className="flex flex-col gap-12 md:gap-24">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
