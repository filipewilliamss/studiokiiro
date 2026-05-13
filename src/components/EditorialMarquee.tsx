import { motion } from "framer-motion";

interface EditorialMarqueeProps {
  words?: string[];
  variant?: "default" | "compact";
}

const defaultWords = [
  "Identidade Visual",
  "Logotipo Essencial",
  "Branding Completo",
  "Personal Brand Kit",
  "Design para Redes Sociais",
  "Edição de vídeo (reels/ shorts)",
  "Vídeo institucional",
  "Video tutorial/ educativo",
  "Sites",
  "Landing Pages",
  "Apresentação comercial",
  "Apresentação Institucional",
];

const EditorialMarquee = ({ words = defaultWords, variant = "default" }: EditorialMarqueeProps) => {
  const items = [...words, ...words];

  return (
    <section
      aria-hidden
      className={`relative bg-[#070807] overflow-hidden border-y border-white/[0.05] ${
        variant === "compact" ? "py-10 md:py-14" : "py-16 md:py-24"
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="marquee-track"
      >
        {items.map((word, i) => (
          <span
            key={i}
            className="font-display font-[800] text-white/[0.08] hover:text-[#FFCA16]/30 transition-colors duration-700 px-10 whitespace-nowrap leading-none tracking-extratight"
            style={{ fontSize: variant === "compact" ? "clamp(40px, 6vw, 80px)" : "clamp(64px, 10vw, 140px)" }}
          >
            {word}
            <span className="inline-block w-3 h-3 bg-[#FFCA16] mx-10 align-middle rounded-full" />
          </span>
        ))}
      </motion.div>
    </section>
  );
};

export default EditorialMarquee;
