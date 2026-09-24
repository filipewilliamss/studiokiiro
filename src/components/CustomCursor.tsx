import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

type CursorMode = 'default' | 'pointer' | 'project' | 'text';

const CustomCursor: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [projectTitle, setProjectTitle] = useState('VER PROJETO');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for magnetic feel
  const springConfig = { damping: 28, stiffness: 450, mass: 0.15 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);

      const target = document.elementFromPoint(clientX, clientY);
      if (!target) {
        setCursorMode('default');
        return;
      }

      // Check if inside a project card/showreel element
      const projectEl = target.closest('[data-cursor-project]') as HTMLElement | null;
      if (projectEl) {
        setCursorMode('project');
        const customTitle = projectEl.getAttribute('data-cursor-project');
        setProjectTitle(customTitle || 'VER PROJETO');
        return;
      }

      // Check if inside standard interactive element
      const clickableEl = target.closest('a, button, [role="button"], input, select, textarea');
      if (clickableEl) {
        setCursorMode('pointer');
        return;
      }

      setCursorMode('default');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      {/* Central Cursor Container */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
      >
        {/* MODE: PROJECT (Pill 'VER PROJETO') */}
        {cursorMode === 'project' && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="px-4 py-2 rounded-full bg-[#FFCA16] text-black font-display font-bold text-[11px] uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(255,202,22,0.5)] flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>{projectTitle}</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.div>
        )}

        {/* MODE: POINTER (Mira Técnica Illustrator) */}
        {cursorMode === 'pointer' && (
          <motion.div
            initial={{ scale: 0.6, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="relative w-8 h-8 flex items-center justify-center"
          >
            {/* Anel exterior */}
            <div className="absolute inset-0 rounded-full border border-[#FFCA16]/80" />
            {/* Cruzeta de precisão */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFCA16]" />
            <div className="absolute -top-1 w-[1px] h-2 bg-[#FFCA16]/60" />
            <div className="absolute -bottom-1 w-[1px] h-2 bg-[#FFCA16]/60" />
            <div className="absolute -left-1 h-[1px] w-2 bg-[#FFCA16]/60" />
            <div className="absolute -right-1 h-[1px] w-2 bg-[#FFCA16]/60" />
          </motion.div>
        )}

        {/* MODE: DEFAULT (Ponto de precisão mínimo) */}
        {cursorMode === 'default' && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative flex items-center justify-center"
          >
            <div className="w-2 h-2 rounded-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <div className="absolute w-6 h-6 rounded-full border border-white/20" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CustomCursor;