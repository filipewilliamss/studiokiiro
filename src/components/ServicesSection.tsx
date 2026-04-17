import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Identidade Visual",
    description: "Criação de marcas completas — logo, paleta, tipografia e guia de aplicação."
  },
  {
    number: "02",
    title: "Artes para Mídias Sociais",
    description: "Design estratégico para suas redes sociais, garantindo um feed harmônico e conteúdos que engajam seu público."
  },
  {
    number: "03",
    title: "Edição de Vídeos",
    description: "Edições dinâmicas para Reels, Shorts e TikTok que elevam o nível visual dos seus vídeos."
  },
  {
    number: "04",
    title: "Branding Estratégico",
    description: "Posicionamento de mercado e definição de propósito para criar conexões reais com seu público."
  },
  {
    number: "05",
    title: "Rebranding",
    description: "Evolução e modernização de marcas existentes para acompanhar o novo momento do seu negócio."
  },
  {
    number: "06",
    title: "Materiais Impressos",
    description: "Design de papelaria, embalagens e materiais promocionais com foco em qualidade e impacto visual."
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