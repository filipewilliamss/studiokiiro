import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isOverWhite, setIsOverWhite] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the main cursor - adjusted for more responsiveness
  const springConfig = { damping: 25, stiffness: 450, mass: 0.5 };
  const mainX = useSpring(mouseX, springConfig);
  const mainY = useSpring(mouseY, springConfig);

  // Configuration for the 6 trail circles with increasing delay
  const trailConfigs = [
    { damping: 25, stiffness: 350, mass: 0.5 },
    { damping: 28, stiffness: 280, mass: 0.55 },
    { damping: 31, stiffness: 220, mass: 0.6 },
    { damping: 34, stiffness: 170, mass: 0.65 },
    { damping: 37, stiffness: 130, mass: 0.7 },
    { damping: 40, stiffness: 100, mass: 0.75 },
  ];

  const trail1X = useSpring(mouseX, trailConfigs[0]);
  const trail1Y = useSpring(mouseY, trailConfigs[0]);
  const trail2X = useSpring(mouseX, trailConfigs[1]);
  const trail2Y = useSpring(mouseY, trailConfigs[1]);
  const trail3X = useSpring(mouseX, trailConfigs[2]);
  const trail3Y = useSpring(mouseY, trailConfigs[2]);
  const trail4X = useSpring(mouseX, trailConfigs[3]);
  const trail4Y = useSpring(mouseY, trailConfigs[3]);
  const trail5X = useSpring(mouseX, trailConfigs[4]);
  const trail5Y = useSpring(mouseY, trailConfigs[4]);
  const trail6X = useSpring(mouseX, trailConfigs[5]);
  const trail6Y = useSpring(mouseY, trailConfigs[5]);

  const [velocity, setVelocity] = useState(0);
  const lastPos = useRef({ x: 0, y: 0, time: Date.now() });

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

      // Calculate velocity for trail visibility
      const now = Date.now();
      const dt = now - lastPos.current.time;
      if (dt > 0) {
        const dx = clientX - lastPos.current.x;
        const dy = clientY - lastPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // Higher sensitivity for velocity
        const v = Math.min(dist / dt, 5); 
        setVelocity(v); 
      }
      lastPos.current = { x: clientX, y: clientY, time: now };

      // Set velocity to 0 if mouse hasn't moved for a bit
      clearTimeout((window as any).mouseMoveTimeout);
      (window as any).mouseMoveTimeout = setTimeout(() => {
        setVelocity(0);
      }, 50);

      // Check for elements under cursor
      const element = document.elementFromPoint(clientX, clientY);
      if (element) {
        const interactive = element.closest('a, button, [role="button"], input, select, textarea');
        setIsHovering(!!interactive);

        const style = window.getComputedStyle(element);
        const color = style.color;
        const bgColor = style.backgroundColor;
        
        const isWhite = (colorStr: string) => {
          if (!colorStr || colorStr === 'rgba(0, 0, 0, 0)' || colorStr === 'transparent') return false;
          const rgb = colorStr.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const [r, g, b] = rgb.map(Number);
            return r > 200 && g > 200 && b > 200;
          }
          return colorStr.includes('white') || colorStr.includes('#fff');
        };

        setIsOverWhite(isWhite(color) || isWhite(bgColor));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  // Trail opacity logic: 1 when moving (velocity > 0.05), 0 when stopped
  const trailOpacity = velocity > 0.1 ? 1 : 0;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Trails 6 to 1 (back to front order) */}
      <motion.div
        style={{ x: trail6X, y: trail6Y, opacity: trailOpacity }}
        className="absolute w-1.5 h-1.5 -ml-0.75 -mt-0.75 rounded-full bg-[#FFCA16] blur-[0.5px] transition-opacity duration-200"
      />
      <motion.div
        style={{ x: trail5X, y: trail5Y, opacity: trailOpacity }}
        className="absolute w-1.5 h-1.5 -ml-0.75 -mt-0.75 rounded-full bg-white blur-[0.5px] transition-opacity duration-200"
      />
      <motion.div
        style={{ x: trail4X, y: trail4Y, opacity: trailOpacity }}
        className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#FFCA16] blur-[0.5px] transition-opacity duration-200"
      />
      <motion.div
        style={{ x: trail3X, y: trail3Y, opacity: trailOpacity }}
        className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-white blur-[0.5px] transition-opacity duration-200"
      />
      <motion.div
        style={{ x: trail2X, y: trail2Y, opacity: trailOpacity }}
        className="absolute w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full bg-[#FFCA16] blur-[0.5px] transition-opacity duration-200"
      />
      <motion.div
        style={{ x: trail1X, y: trail1Y, opacity: trailOpacity }}
        className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-white blur-[0.5px] transition-opacity duration-200"
      />

      {/* Main Cursor */}
      <motion.div
        style={{ x: mainX, y: mainY }}
        className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 transition-all duration-300 ease-out ${
          isOverWhite 
            ? 'bg-[#FFCA16] border-[#FFCA16]' 
            : 'bg-white border-white'
        } ${isHovering ? 'scale-150 opacity-80' : 'scale-100 opacity-100'}`}
      />
    </div>
  );
};

export default CustomCursor;
