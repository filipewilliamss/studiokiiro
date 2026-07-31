import { motion } from "framer-motion";

export interface HeroGradient {
  /** Starting color of the diagonal (135deg) gradient */
  from: string;
  /** Ending color of the diagonal (135deg) gradient */
  to: string;
  /** Color applied to the h1 title (lighter tone of the primary brand color) */
  titleColor: string;
  /** Color applied to the subtitle paragraph */
  subtitleColor: string;
}

interface ProjectHeroProps {
  title: string;
  subtitle?: string;
  gradient: HeroGradient;
  /** Project logo displayed inside the gradient card */
  logo?: string;
  /** Full-bleed banner image that fills the hero card */
  banner?: string;
}

/**
 * Reusable branded hero for project detail pages.
 * The look is driven entirely by the `gradient` prop, so any project
 * can plug in its own brand colors without touching this component.
 */
const ProjectHero = ({ title, gradient, logo, banner }: ProjectHeroProps) => {
  if (banner) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full overflow-hidden rounded-[16px]"
      >
        <img
          src={banner}
          alt={`Banner ${title}`}
          className="w-full h-auto object-cover"
        />
      </motion.section>
    );
  }

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
        padding: "56px 32px",
        borderRadius: "16px",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center w-full"
      >
        {logo ? (
          <img
            src={logo}
            alt={`Logo ${title}`}
            className="h-16 md:h-24 w-auto max-w-[70%] object-contain"
            loading="lazy"
          />
        ) : (
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "32px",
              fontWeight: 600,
              color: gradient.titleColor,
              margin: 0,
            }}
          >
            {title}
          </h1>
        )}
      </motion.div>
    </section>
  );
};

export default ProjectHero;
