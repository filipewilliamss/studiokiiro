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
        description: "Desenvolvimento completo da identidade visual da sua marca: conceito, logotipo, paleta de cores, tipografia, aplicações e guia de uso.",
        recommended: "empresas e projetos que precisam sair do genérico e construir uma presença profissional e consistente em todos os pontos de contato."
      },
      {
        title: "Logotipo Essencial",
        description: "Criação de logotipo profissional e memorável, com variações de cores e arquivos prontos para uso em qualquer plataforma.",
        recommended: "pequenos negócios e profissionais liberais que buscam um símbolo forte e marcante para iniciar sua jornada."
      },
      {
        title: "Branding Completo",
        description: "Estratégia de marca profunda aliada ao design, definindo voz, tom, valores e toda a atmosfera visual do negócio.",
        recommended: "marcas que desejam se tornar referência no mercado através de um posicionamento sólido e design estratégico."
      },
      {
        title: "Personal Brand Kit",
        description: "Design focado em marcas pessoais: logotipo, assinatura de e-mail, templates de apresentação e social media kit.",
        recommended: "especialistas, mentores e palestrantes que precisam elevar sua imagem pessoal para o próximo nível."
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
        description: "Artes estratégicas para construir presença digital consistente: posts, carrosséis, stories e materiais de campanha alinhados à identidade da sua marca.",
        recommended: "negócios que desejam fortalecer posicionamento e reconhecimento nas redes sociais com comunicação visual profissional."
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
        description: "Edição dinâmica e viciante para vídeos curtos, focada em retenção, legendas animadas e trilhas que convertem.",
        recommended: "criadores e marcas que buscam viralizar e engajar sua audiência nas plataformas de vídeos verticais."
      },
      {
        title: "Video institucional",
        description: "Produção de vídeos que contam a história da sua empresa, apresentando produtos ou serviços de forma elegante e profissional.",
        recommended: "empresas que precisam transmitir credibilidade e apresentar sua estrutura ou visão para clientes e investidores."
      },
      {
        title: "Video Tutorial / Educativo",
        description: "Edição focada em clareza pedagógica, com elementos gráficos, destaques de tela e ritmo ideal para aprendizado.",
        recommended: "infoprodutores e empresas que possuem cursos online ou treinamentos corporativos."
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
        description: "Criação de interfaces para sites institucionais e landing pages focadas em clareza, navegação simples e conversão, alinhadas à identidade visual da marca.",
        recommended: "empresas e projetos que precisam de presença digital estruturada e coerente com seu posicionamento."
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
        description: "Desenvolvimento de apresentações profissionais para reuniões, propostas comerciais, pitches e eventos, com foco em clareza e impacto visual.",
        recommended: "empresas e profissionais que desejam comunicar valor, dados e histórias com credibilidade e alinhamento à identidade da marca."
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
      <div className="flex flex-wrap items-end gap-1 px-2 md:px-0">
        {service.items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`relative px-4 md:px-8 py-3 md:py-4 rounded-t-xl font-display text-[12px] md:text-[14px] font-bold tracking-tight transition-all duration-300 z-20 
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
            <div className="md:col-span-5 flex flex-col gap-4">
              <span className="font-display text-[18px] md:text-[24px] font-bold text-black/30">
                {service.number}
              </span>
              <h3 className="font-display text-[32px] md:text-[52px] lg:text-[62px] font-[800] text-black leading-[0.9] tracking-tighter">
                {activeItem.title}
              </h3>
            </div>

            <div className="md:col-span-7 flex flex-col gap-6">
              <p className="text-black/80 text-[16px] md:text-[19px] lg:text-[21px] leading-relaxed font-medium">
                {activeItem.description}
              </p>
              <div className="pt-6 border-t border-black/10">
                <p className="text-black/40 text-[11px] md:text-[12px] uppercase font-bold tracking-widest mb-2">
                  Indicado para:
                </p>
                <p className="text-black/70 text-[14px] md:text-[16px] lg:text-[17px] leading-relaxed italic">
                  {activeItem.recommended}
                </p>
              </div>
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

// Removed the extra list as requested.
        </div>
      </section>
    );
  };

export default ServicesSection;
