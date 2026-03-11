import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Obrigado = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-xl"
      >
        <h1 className="font-display text-5xl md:text-6xl font-bold text-gradient-kiiro mb-6">
          Obrigado!
        </h1>
        <p className="text-xl text-foreground mb-3">
          Sua mensagem foi enviada com sucesso.
        </p>
        <p className="text-muted-foreground text-lg mb-10">
          Entraremos em contato em breve para discutir seu projeto.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-4 bg-primary text-primary-foreground font-display font-semibold rounded-full hover:bg-kiiro-dark transition-all duration-300"
        >
          Voltar para a Página Inicial
        </Link>
      </motion.div>
    </div>
  );
};

export default Obrigado;
