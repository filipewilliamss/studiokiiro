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
    <section id="servicos" className="relative section-padding bg-[#070807] grid-pattern border-t border-white/[0.05] overflow-hidden">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-left mb-16"
        >
          <span className="inline-block px-4 py-1.5 border border-[#FFCA16] text-[#FFCA16] text-[11px] font-bold uppercase tracking-[3px] rounded-none mb-8">
            O QUE FAZEMOS
          </span>
          <h2 className="font-display text-[48px] md:text-[64px] font-[800] leading-[0.9] tracking-[-2px] mb-6">
            <span className="text-white block">Nossos</span>
            <span className="text-[#FFCA16] block">Serviços.</span>
          </h2>
          <p className="font-display text-base text-white/50 max-w-[480px]">
            Soluções criativas e estratégicas para destacar sua marca no mercado digital e físico.
          </p>
        </motion.div>

        <div className="w-full h-px bg-white/10 mb-0" />

        <div className="flex flex-col">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 py-8 cursor-pointer border-b border-white/10 transition-all duration-300 hover:bg-[#FFCA16]/[0.03] hover:px-10 hover:-mx-10"
            >
              <span className="font-display text-[13px] text-[#FFCA16]/50 w-10 flex-shrink-0">
                {service.number}
              </span>
              <h3 className="font-display text-[24px] md:text-[28px] font-bold text-white w-full md:w-[280px] flex-shrink-0 transition-colors duration-300 group-hover:text-[#FFCA16]">
                {service.title}
              </h3>
              <p className="font-display text-sm text-white/40 flex-1 transition-colors duration-300 group-hover:text-white/70">
                {service.description}
                <span className="block mt-[6px] text-[12px] text-[#FFCA16]/50 font-['Poppins'] font-normal tracking-[0.5px]">
                  {service.detail}
                </span>
              </p>
              <span className="hidden md:block font-display text-2xl text-[#FFCA16] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2">
                →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;