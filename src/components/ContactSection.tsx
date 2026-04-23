import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section 
      id="contato" 
      className="relative bg-[#070807] overflow-hidden"
      style={{ padding: '160px 0 100px' }}
    >
      {/* High-Impact Visual Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFCA16]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="absolute top-[20%] left-[-10%] w-[50%] aspect-square bg-[#FFCA16]/[0.03] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] aspect-square bg-[#FFCA16]/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="container-editorial relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl"
          >
            <span className="inline-block text-[#FFCA16] text-[12px] font-bold uppercase tracking-[0.4em] mb-10">
              Pronto para o próximo nível?
            </span>
            
            <h2 className="font-display text-[60px] md:text-[110px] lg:text-[140px] font-[800] leading-[0.8] tracking-extratight text-white mb-16">
              Sua marca <br /> merece ser <br /> <span className="text-[#FFCA16]">lembrada.</span>
            </h2>

            <div className="flex flex-col items-center gap-10">
              <p className="font-display text-[18px] md:text-[24px] font-light text-white/50 max-w-2xl leading-relaxed text-balance">
                Não é sobre um logo bonito. É sobre criar uma marca que as pessoas reconhecem, confiam e escolhem — sempre.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <a 
                  href="https://wa.me/5511991076096" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-premium px-16"
                >
                  FALE NO WHATSAPP
                </a>
                <a 
                  href="mailto:contato@studiokiiro.com"
                  className="btn-premium-outline px-16"
                >
                  ENVIAR E-MAIL
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
