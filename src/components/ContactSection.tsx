import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section id="contato" className="relative section-padding bg-[#FFCA16]/[0.03] grid-pattern border-t border-white/[0.05]">
      <div className="container-editorial py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="font-display text-[48px] md:text-[72px] font-[800] leading-[1.1] tracking-[-3px] mb-8">
            <span className="text-white block">VAMOS CRIAR ALGO</span>
            <span className="text-[#FFCA16] block">MEMORÁVEL JUNTOS?</span>
          </h2>
          
          <p className="font-display text-[18px] md:text-[20px] text-white/50 mb-16 max-w-2xl mx-auto leading-relaxed">
            Seja para um novo projeto ou para elevar o que você já tem, estamos prontos para transformar sua visão em design de impacto.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#iniciar-projeto" 
              className="w-full sm:w-auto px-10 py-5 bg-[#FFCA16] text-black text-[14px] font-[800] uppercase tracking-[2px] hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(255,202,22,0.2)]"
            >
              INICIAR PROJETO
            </a>
            <a 
              href="https://wa.me/5511991076096" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 border border-white text-white text-[14px] font-[800] uppercase tracking-[2px] hover:bg-white hover:text-black transition-all duration-300"
            >
              FALE NO WHATSAPP
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;