import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spline Background */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src="https://my.spline.design/untitled-Okn4OvV3B9lyrWP0c2qMReAx-2Hi/" 
          frameBorder="0" 
          width="100%" 
          height="100%"
          className="w-full h-full"
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 container-editorial text-center py-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-12 px-4">
            Identidade Visual · Social Media · Edição de Vídeo
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
        >
          <a
            href="#portfolio"
            className="px-8 py-4 bg-primary text-primary-foreground font-display font-semibold rounded-full hover:bg-kiiro-dark transition-all duration-300 text-base shadow-lg backdrop-blur-sm"
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            className="px-8 py-4 border border-border text-foreground font-display font-semibold rounded-full hover:border-primary hover:text-primary transition-all duration-300 text-base shadow-lg backdrop-blur-sm bg-background/10"
          >
            Solicitar Orçamento
          </a>
        </motion.div>

        {/* Animated arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex justify-center"
        >
          <motion.svg
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;