import { motion } from "framer-motion";

const placeholderItems = [
  {
    id: 1,
    title: "Feed Estratégico",
    description: "Posts que comunicam, engajam e convertem — com identidade visual consistente.",
  },
  {
    id: 2,
    title: "Stories & Reels",
    description: "Conteúdos dinâmicos e criativos que aumentam o alcance e a conexão com o público.",
  },
  {
    id: 3,
    title: "Carrosséis Educativos",
    description: "Design informativo que entrega valor e posiciona a marca como autoridade.",
  },
  {
    id: 4,
    title: "Capas & Destaques",
    description: "Elementos visuais coesos que fortalecem a primeira impressão do perfil.",
  },
];

const SocialMediaSection = () => {
  return (
    <section id="social-media" className="section-padding border-t border-border bg-white">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Portfólio</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Artes para Mídias Sociais
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg">
            Criamos artes que traduzem a essência da sua marca nas redes sociais — com design estratégico, identidade visual forte e conteúdos que geram resultados reais.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {placeholderItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-secondary mb-4">
                {/* Placeholder — imagens serão adicionadas depois */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                      <svg className="w-7 h-7 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-xs text-muted-foreground/50 uppercase tracking-wider">Em breve</p>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>

              <h3 className="font-display text-base font-bold group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SocialMediaSection;
