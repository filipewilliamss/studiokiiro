import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Identidade Visual",
    description: "Do logotipo essencial ao branding completo — criamos a identidade que representa sua marca com autenticidade e estratégia.",
    detail: "Logotipo Essencial · Identidade Visual · Branding Completo · Personal Brand Kit"
  },
  {
    number: "02",
    title: "Design para Redes Sociais",
    description: "Artes estratégicas que constroem presença digital — posts, carrosséis e stories com identidade visual consistente.",
    detail: "Pacote Pontual · Retainer Mensal · Carrossel Avulso"
  },
  {
    number: "03",
    title: "Edição de Vídeo",
    description: "Reels, Shorts e vídeos institucionais editados com ritmo, identidade e intenção para gerar resultado nas redes.",
    detail: "Reels/Shorts · Pacote Mensal · Vídeo Institucional · Tutorial/Educativo"
  },
  {
    number: "04",
    title: "Sites e Landing Pages",
    description: "Páginas que convertem — desde landing pages objetivas até sites institucionais completos, com design e estratégia integrados.",
    detail: "Landing Page Simples · Landing Page Completa · Site Institucional · Site Completo"
  },
  {
    number: "05",
    title: "Apresentações",
    description: "Apresentações comerciais e institucionais com design profissional que comunica valor e gera credibilidade.",
    detail: "Apresentação Comercial · Apresentação Institucional"
  }
];

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-28 lg:mb-40">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-[#FFCA16]" />
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
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col md:grid md:grid-cols-12 items-start md:items-center py-10 md:py-16 border-b border-white/10 cursor-pointer overflow-hidden"
            >
              {/* Hover background slide */}
              <div className="absolute inset-0 bg-[#FFCA16] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22,1,0.36,1] pointer-events-none" />

              <div className="relative z-10 md:col-span-1">
                <span className="font-display text-[14px] font-bold text-[#FFCA16]/40 group-hover:text-black/40 transition-colors duration-500">
                  {service.number}
                </span>
              </div>
              
              <div className="relative z-10 md:col-span-4 mt-2 md:mt-0">
                <h3 className="font-display text-[28px] md:text-[36px] font-bold text-white group-hover:text-black transition-colors duration-500 tracking-tight">
                  {service.title}
                </h3>
              </div>

              <div className="relative z-10 md:col-span-5 mt-4 md:mt-0">
                <p className="text-white/40 group-hover:text-black/70 text-[15px] md:text-[16px] leading-relaxed transition-colors duration-500">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {service.detail.split(' · ').map((tag, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-[0.1em] px-2 py-1 border border-white/10 text-white/30 group-hover:border-black/10 group-hover:text-black/50 transition-all duration-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 md:col-span-2 hidden md:flex justify-end">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-black/20 transition-all duration-500 group-hover:rotate-45">
                  <span className="text-2xl text-[#FFCA16] group-hover:text-black transition-colors duration-500">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;