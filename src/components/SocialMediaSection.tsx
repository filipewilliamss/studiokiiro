import { motion } from "framer-motion";
import socialMedia1 from "@/assets/social-media-1.webp";
import carrosselMockup from "@/assets/carrossel-mockup.webp";
import destaquesMockup from "@/assets/destaques-mockup.webp";
import storyMockup from "@/assets/story-mockup.webp";

const placeholderItems = [
  {
    id: 1,
    title: "Feed Estratégico",
    description: "Posts que comunicam, engajam e convertem, com identidade visual consistente.",
    image: socialMedia1,
  },
  {
    id: 2,
    title: "Stories & Reels",
    description: "Conteúdos dinâmicos e criativos que aumentam o alcance e a conexão com o público.",
    image: storyMockup,
  },
  {
    id: 3,
    title: "Carrosséis Educativos",
    description: "Design informativo que entrega valor e posiciona a marca como autoridade.",
    image: carrosselMockup,
  },
  {
    id: 4,
    title: "Capas & Destaques",
    description: "Elementos visuais coesos que fortalecem a primeira impressão do perfil.",
    image: destaquesMockup,
  },
];

const SocialMediaSection = () => {
  return (
    <section id="social-media" className="section-padding border-t border-border bg-background">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-16 md:mb-24"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Portfólio</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold">
            Artes para Mídias Sociais
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg">
            Criamos artes que traduzem a essência da sua marca nas redes sociais, com design estratégico, identidade visual forte e conteúdos que geram resultados reais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
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
