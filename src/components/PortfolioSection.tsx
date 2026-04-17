import { motion } from "framer-motion";
import socialMedia1 from "@/assets/social-media-1.webp";
import carrosselMockup from "@/assets/carrossel-mockup.webp";
import destaquesMockup from "@/assets/destaques-mockup.webp";
import storyMockup from "@/assets/story-mockup.webp";

const portfolioItems = [
  {
    id: 1,
    title: "Feed Estratégico",
    description: "Posts que comunicam, engajam e convertem — com identidade visual consistente.",
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

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="relative section-padding bg-[#070807] grid-pattern border-t border-white/[0.05]">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <span className="inline-block px-4 py-1.5 border border-[#FFCA16] text-[#FFCA16] text-[11px] font-bold uppercase tracking-[3px] rounded-none mb-6">
            PORTFÓLIO
          </span>
          <h2 className="font-display text-[40px] md:text-[56px] font-[800] text-white leading-tight tracking-[-2px] mb-6">
            Artes para Mídias Sociais
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-3xl leading-relaxed">
            Criamos artes que traduzem a essência da sua marca nas redes sociais — com design estratégico, identidade visual forte e conteúdos que geram resultados reais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-[#FFCA16]/[0.02] mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-[#070807]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#FFCA16] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;