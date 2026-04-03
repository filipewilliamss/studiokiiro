import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Spline Background only for Hero */}
      <div className="absolute top-[100px] left-0 right-0 bottom-[-100px] z-0 pointer-events-auto">
        <iframe 
          src="https://my.spline.design/untitled-Okn4OvV3B9lyrWP0c2qMReAx-2Hi/" 
          frameBorder="0" 
          width="100%" 
          height="100%"
          className="w-full h-full"
          style={{ border: 'none' }}
          title="Spline 3D Background"
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 container-editorial text-center py-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center pointer-events-auto mt-[60vh] sm:mt-[50vh] md:mt-[40vh]"
        >
          <a
            href="#portfolio"
            className="px-10 py-5 bg-primary/70 backdrop-blur-2xl border-t border-l border-white/80 border-r border-b border-white/20 text-[#070807] font-display font-bold rounded-full hover:bg-primary/90 hover:scale-105 transition-all duration-300 text-lg shadow-[0_20px_50px_rgba(255,230,0,0.08),inset_0_2px_20px_rgba(255,255,255,0.8)] ring-1 ring-white/30 flex items-center justify-center"
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            className="px-10 py-5 bg-white/10 backdrop-blur-2xl border-t border-l border-white/30 border-r border-b border-white/10 text-white font-display font-bold rounded-full hover:bg-white/20 hover:scale-105 transition-all duration-300 text-lg shadow-[0_20px_50px_rgba(128,128,128,0.08),inset_0_2px_10px_rgba(255,255,255,0.2)] ring-1 ring-white/10 flex items-center justify-center"
          >
            Solicitar Orçamento
          </a>
        </motion.div>

        {/* Animated arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex justify-center"
        >
          <motion.svg
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-10 h-10 text-primary drop-shadow-[0_0_15px_rgba(255,230,0,0.08)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.div>
      </div>

      {/* Watermark cover for Spline - only in Hero, below WhatsApp button */}
      <div className="absolute bottom-0 right-0 w-[170px] h-[70px] bg-[#070807] z-10 pointer-events-none" />
    </section>
  );
};

export default HeroSection;