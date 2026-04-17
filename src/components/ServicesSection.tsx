import { motion } from "framer-motion";

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="#FFCA16" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122l9.47-9.47m0 0l-9.47-9.47m9.47 9.47H2.25" />
      </svg>
    ),
    title: "Identidade Visual",
    description: "Criação de marcas memoráveis que transmitem a essência do seu negócio através de logos, cores e tipografia."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="#FFCA16" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Social Media Design",
    description: "Design estratégico para suas redes sociais, garantindo um feed harmônico e conteúdos que engajam seu público."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="#FFCA16" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Edição de Vídeo",
    description: "Edição dinâmica para Reels, Shorts e TikTok, elevando o nível visual dos seus vídeos com ritmo e profissionalismo."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="#FFCA16" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
      </svg>
    ),
    title: "Landing Pages",
    description: "Desenvolvimento de páginas de alta conversão, otimizadas para mobile e com design focado no seu produto ou serviço."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="#FFCA16" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h16.5M3.75 3l3.75 3.75M20.25 3v11.25A2.25 2.25 0 0118 16.5h-2.25M20.25 3l-3.75 3.75" />
      </svg>
    ),
    title: "Apresentações",
    description: "Design de apresentações profissionais e impactantes para propostas comerciais, reuniões e eventos corporativos."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="#FFCA16" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "Manual de Marca",
    description: "Documentação completa sobre o uso correto da sua identidade visual, garantindo consistência em todos os canais."
  }
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="relative section-padding bg-[#070807] grid-pattern border-t border-white/[0.05]">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="inline-block px-4 py-1.5 border border-[#FFCA16] text-[#FFCA16] text-[11px] font-bold uppercase tracking-[3px] rounded-none mb-6">
            O QUE FAZEMOS
          </span>
          <h2 className="font-display text-[40px] md:text-[56px] font-[800] text-white leading-none tracking-[-2px]">
            NOSSOS SERVIÇOS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-white/[0.02] border border-white/[0.08] p-10 hover:border-[#FFCA16]/40 hover:bg-[#FFCA16]/[0.05] transition-all duration-500 overflow-hidden"
            >
              <div className="mb-8">
                {service.icon}
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-4 group-hover:text-[#FFCA16] transition-colors">
                {service.title}
              </h3>
              <p className="font-display text-sm text-white/50 leading-relaxed mb-6">
                {service.description}
              </p>
              
              {/* Bottom line animation */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FFCA16] group-hover:w-full transition-all duration-400 ease-in-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;