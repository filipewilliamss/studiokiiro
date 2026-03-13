import { motion } from "framer-motion";
import kiiroLogo from "@/assets/logo.png";
import patternBg from "@/assets/pattern.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated pattern background */}
      <div className="absolute inset-0 opacity-[0.014]">
        <motion.div
          animate={{ x: [0, -500, 0] }}
          transition={{ duration: 152, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${patternBg})`,
            backgroundRepeat: "repeat",
            backgroundSize: "2520px",
            width: "200%",
            height: "100%",
          }}
        />
      </div>

      {/* Subtle glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 container-editorial text-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-10"
        >
          <img
            src={kiiroLogo}
            alt="Studio Kiiro"
            className="h-28 sm:h-36 md:h-44 lg:h-52 mx-auto"
          />
        </motion.div>

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

        {/* Animated arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 flex justify-center"
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
    </section>
  );
};

export default HeroSection;
