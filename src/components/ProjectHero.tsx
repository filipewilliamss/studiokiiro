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
}

/**
 * Reusable branded hero for project detail pages.
 * The look is driven entirely by the `gradient` prop, so any project
 * can plug in its own brand colors without touching this component.
 */
const ProjectHero = ({ title, subtitle, gradient }: ProjectHeroProps) => {
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
        padding: "48px 32px",
        borderRadius: "16px",
        textAlign: "center",
      }}
    >
      <div className="max-w-3xl mx-auto w-full text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "32px",
            fontWeight: 600,
            color: gradient.titleColor,
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "16px",
              color: gradient.subtitleColor,
              lineHeight: 1.6,
              marginTop: "16px",
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default ProjectHero;
