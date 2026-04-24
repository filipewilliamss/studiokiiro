import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isOverWhite, setIsOverWhite] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the main cursor and trails
  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const mainX = useSpring(mouseX, springConfig);
  const mainY = useSpring(mouseY, springConfig);

  // Springs for trailers with increasing delay/damping
  const trail1X = useSpring(mouseX, { damping: 25, stiffness: 180, mass: 0.6 });
  const trail1Y = useSpring(mouseY, { damping: 25, stiffness: 180, mass: 0.6 });
  
  const trail2X = useSpring(mouseX, { damping: 30, stiffness: 120, mass: 0.7 });
  const trail2Y = useSpring(mouseY, { damping: 30, stiffness: 120, mass: 0.7 });

  const trail3X = useSpring(mouseX, { damping: 35, stiffness: 80, mass: 0.8 });
  const trail3Y = useSpring(mouseY, { damping: 35, stiffness: 80, mass: 0.8 });

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
        const v = Math.min(dist / dt, 5); 
        setVelocity(prev => prev * 0.9 + v * 0.1); 
      }
      lastPos.current = { x: clientX, y: clientY, time: now };

      // Check for elements under cursor
      const element = document.elementFromPoint(clientX, clientY);
      if (element) {
        // Check if hovering interactive elements
        const interactive = element.closest('a, button, [role="button"], input, select, textarea');
        setIsHovering(!!interactive);

        // Check for white background/text
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

  const trailOpacity = Math.max(0.05, Math.min((velocity - 0.1) * 0.6, 0.8));

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Trail 3 (Smallest - White) */}
      <motion.div
        style={{ x: trail3X, y: trail3Y, opacity: trailOpacity }}
        className="absolute w-1.5 h-1.5 -ml-0.75 -mt-0.75 rounded-full bg-white blur-[1px]"
      />
      {/* Trail 2 (Middle - Yellow) */}
      <motion.div
        style={{ x: trail2X, y: trail2Y, opacity: trailOpacity }}
        className="absolute w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full bg-[#FFCA16] blur-[0.5px]"
      />
      {/* Trail 1 (Largest - White) */}
      <motion.div
        style={{ x: trail1X, y: trail1Y, opacity: trailOpacity }}
        className="absolute w-3.5 h-3.5 -ml-1.75 -mt-1.75 rounded-full bg-white blur-[0.5px]"
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


