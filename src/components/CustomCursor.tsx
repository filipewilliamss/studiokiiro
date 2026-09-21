import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const CustomCursor = () => {
  const [cursorMode, setCursorMode] = useState<"default" | "hover" | "view-case">("default");
  const [isOverYellow, setIsOverYellow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Mola suave para o anel externo
  const ringX = useSpring(mouseX, { damping: 26, stiffness: 350, mass: 0.15 });
  const ringY = useSpring(mouseY, { damping: 26, stiffness: 350, mass: 0.15 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);

      const element = document.elementFromPoint(clientX, clientY);
      if (element) {
        // Detecta se está sobre um card de projeto marcado com data-cursor="view-case"
        const caseTarget = element.closest('[data-cursor="view-case"]');
        if (caseTarget) {
          setCursorMode("view-case");
          return;
        }

        // Detecta botões e links normais
        const interactive = element.closest('a, button, [role="button"], input, select, textarea');
        if (interactive) {
          setCursorMode("hover");
        } else {
          setCursorMode("default");
        }

        // Checagem de contraste se estiver sobre amarelo
        const style = window.getComputedStyle(element);
        const isYellow = (c: string) =>
          c && (c.includes("255, 202, 22") || c.toLowerCase().includes("#ffca16"));

        let currentEl: Element | null = element;
        let overYellow = false;
        while (currentEl && currentEl !== document.body) {
          const s = window.getComputedStyle(currentEl);
          if (isYellow(s.color) || isYellow(s.backgroundColor) || isYellow(s.fill)) {
            overYellow = true;
            break;
          }
          currentEl = currentEl.parentElement;
        }
        setIsOverYellow(overYellow);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  const dotColor = isOverYellow ? "bg-black" : "bg-[#FFCA16]";
  const ringBorderColor = isOverYellow ? "border-black/60" : "border-[#FFCA16]/40";

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Ponto central imediato */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="fixed top-0 left-0 -ml-1 -mt-1 pointer-events-none"
      >
        <div
          className={`w-2 h-2 rounded-full transition-transform duration-200 ${dotColor} ${
            cursorMode === "view-case" ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        />
      </motion.div>

      {/* Anel externo com física de mola suave */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
      >
        {cursorMode === "view-case" ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="-translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-black/90 text-[#FFCA16] border border-[#FFCA16]/50 shadow-2xl backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap"
          >
            <span className="text-[10px] font-display font-bold uppercase tracking-widest text-[#FFCA16]">
              Ver Case
            </span>
            <ArrowUpRight className="w-3 h-3 text-[#FFCA16]" />
          </motion.div>
        ) : (
          <div
            className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
              cursorMode === "hover"
                ? `w-12 h-12 border-2 ${isOverYellow ? "border-black" : "border-[#FFCA16] bg-[#FFCA16]/10"} scale-110`
                : `w-9 h-9 border ${ringBorderColor} scale-100`
            }`}
          />
        )}
      </motion.div>
    </div>
  );
};

export default CustomCursor;