import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollAnimatedImageProps {
  src: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
}

const ScrollAnimatedImage = ({ 
  src, 
  alt = "", 
  className = "", 
  containerClassName = "" 
}: ScrollAnimatedImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Smooth scroll zoom: scale up as we scroll down
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className={`overflow-hidden rounded-sm ${containerClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
        whileInView={{ 
          opacity: 1, 
          scale: 1, 
          filter: "blur(0px)",
          transition: { 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1] 
          } 
        }}
        viewport={{ once: true, margin: "-10% 0px" }}
        style={{ scale: smoothScale }}
        className={`w-full h-auto object-cover ${className}`}
      />
    </div>
  );
};

export default ScrollAnimatedImage;
