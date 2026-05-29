import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#070807] text-white p-6 overflow-hidden relative">
      {/* Background elements to match brand style */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[50%] aspect-square bg-[#FFCA16]/[0.03] rounded-full blur-[180px] pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#FFCA16] text-[12px] font-bold uppercase tracking-[0.4em] mb-8 inline-block"
        >
          Erro 404
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[12vw] md:text-[8vw] font-black leading-none tracking-tighter uppercase mb-8 font-display"
        >
          Página não <br /> <span className="text-[#FFCA16] italic font-light">encontrada.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/50 text-lg md:text-xl font-light leading-relaxed mb-12 text-balance"
        >
          O conteúdo que você está procurando não existe ou foi movido para outro endereço.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link to="/" className="btn-premium">
            Voltar para o início
          </Link>
        </motion.div>
      </div>
      
      {/* Editorial detail */}
      <div className="absolute bottom-12 left-12 hidden md:block">
        <span className="text-white/10 text-[10px] uppercase tracking-[0.6em] font-mono">
          STUDIO KIIRO · SYSTEM RECOVERY
        </span>
      </div>
    </div>
  );
};

export default NotFound;
