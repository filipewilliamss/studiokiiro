import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 container-editorial text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Studio name */}
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground mb-8">
            Estúdio de Design
          </p>

          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight mb-8">
            Studio
            <br />
            <span className="text-gradient-kiiro">Kiiro</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="font-display text-xl md:text-2xl lg:text-3xl text-foreground/80 max-w-3xl mx-auto mb-4 leading-relaxed">
            Transformamos marcas em
            <br className="hidden sm:block" /> referência visual.
          </p>

          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-12">
            Identidade Visual · Social Media · Edição de Vídeo
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#portfolio"
            className="px-8 py-4 bg-primary text-primary-foreground font-display font-semibold rounded-full hover:bg-kiiro-dark transition-all duration-300 text-base"
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            className="px-8 py-4 border border-border text-foreground font-display font-semibold rounded-full hover:border-primary hover:text-primary transition-all duration-300 text-base"
          >
            Solicitar Orçamento
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-primary/60 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
