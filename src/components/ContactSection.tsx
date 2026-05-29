import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section 
      id="contato" 
      className="relative bg-[#070807] overflow-hidden py-24 md:py-32 lg:py-40"
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
            className="w-full max-w-6xl"
          >
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className="text-[#FFCA16] text-[11px] font-bold uppercase tracking-[0.4em]">
                Pronto para o próximo nível?
              </span>
            </div>

            <h2 className="font-display text-[64px] md:text-[120px] lg:text-[160px] font-[800] leading-[0.78] tracking-[-0.055em] text-white mb-20">
              Sua marca <br /> merece ser <br /> <span className="text-[#FFCA16] italic font-light">lembrada.</span>
            </h2>

            <div className="flex flex-col items-center gap-12">
              <p className="font-display text-[20px] md:text-[26px] font-light text-white/55 max-w-2xl leading-[1.5] text-balance">
                Não é sobre um logo, imagem ou vídeo bonito. É sobre criar uma marca ou projeto que as pessoas reconhecem, confiam e escolhem sempre.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <a
                  href="https://wa.me/5511991076096"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium px-16"
                >
                  Fale no WhatsApp
                </a>
                <a
                  href="mailto:contato@studiokiiro.com"
                  className="btn-premium-outline px-16"
                >
                  Enviar e-mail
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
