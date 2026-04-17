import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section 
      id="contato" 
      className="relative bg-[#070807] border-t border-white/[0.08] overflow-hidden"
      style={{
        padding: '140px 0',
        backgroundImage: `
          radial-gradient(ellipse at top left, rgba(255,202,22,0.06) 0%, transparent 60%),
          linear-gradient(to right, rgba(255, 202, 22, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 202, 22, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 60px 60px, 60px 60px'
      }}
    >
      <div className="container-editorial">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12 lg:gap-0">
          
          {/* COLUNA ESQUERDA (55%) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-[55%]"
          >
            {/* Tag Pill */}
            <div className="inline-block px-3 py-1 bg-[#FFCA16]/10 border border-[#FFCA16]/20 mb-8">
              <span className="text-[#FFCA16] text-[10px] font-display font-bold uppercase tracking-[2px]">
                PRÓXIMO PASSO
              </span>
            </div>
            
            {/* Linha Decorativa */}
            <div className="w-[60px] h-[1px] bg-[#FFCA16] mb-6" />

            {/* Título */}
            <h2 className="font-display text-[52px] md:text-[72px] font-[800] leading-[0.9] tracking-[-3px] text-left">
              <span className="text-white block">Sua marca</span>
              <span className="text-white block">merece ser</span>
              <span className="text-[#FFCA16] block">lembrada.</span>
            </h2>
          </motion.div>

          {/* COLUNA DIREITA (45%) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-[45%] flex flex-col justify-center items-end"
          >
            <div className="max-w-[360px] w-full text-left">
              <p className="font-display text-[16px] font-[400] text-white/50 mb-10 leading-relaxed">
                Não é sobre um logo bonito.<br />
                É sobre criar uma marca que as pessoas <br />
                reconhecem, confiam e escolhem — sempre.
              </p>
              
              <div className="flex flex-col gap-3 w-full">
                <a 
                  href="#iniciar-projeto" 
                  className="w-full px-9 py-[18px] bg-[#FFCA16] text-[#070807] text-[13px] font-[700] uppercase tracking-[2px] hover:bg-white transition-all duration-300 rounded-none text-center"
                >
                  INICIAR PROJETO →
                </a>
                <a 
                  href="https://wa.me/5511991076096" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full px-9 py-[18px] border border-white/30 text-white/70 text-[13px] font-[700] uppercase tracking-[2px] hover:border-white hover:text-white transition-all duration-300 rounded-none text-center"
                >
                  FALE NO WHATSAPP
                </a>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
