import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isOverYellow, setIsOverYellow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  // Main cursor follows mouse instantly to ensure it's always the leader
  const mainX = mouseX;
  const mainY = mouseY;

  // Configuration for the trail circles - balanced for smoothness and responsiveness
  const trailConfigs = [
    { damping: 35, stiffness: 1000, mass: 0.1 }, // Closer trail is faster
    { damping: 40, stiffness: 800, mass: 0.2 },
    { damping: 45, stiffness: 600, mass: 0.3 },
    { damping: 50, stiffness: 400, mass: 0.4 },
    { damping: 55, stiffness: 300, mass: 0.5 },
    { damping: 60, stiffness: 200, mass: 0.6 },
  ];

  const trail1X = useSpring(mainX, trailConfigs[0]);
  const trail1Y = useSpring(mainY, trailConfigs[0]);
  const trail2X = useSpring(trail1X, trailConfigs[1]);
  const trail2Y = useSpring(trail1Y, trailConfigs[1]);
  const trail3X = useSpring(trail2X, trailConfigs[2]);
  const trail3Y = useSpring(trail2Y, trailConfigs[2]);
  const trail4X = useSpring(trail3X, trailConfigs[3]);
  const trail4Y = useSpring(trail3Y, trailConfigs[3]);
  const trail5X = useSpring(trail4X, trailConfigs[4]);
  const trail5Y = useSpring(trail4Y, trailConfigs[4]);
  const trail6X = useSpring(trail5X, trailConfigs[5]);
  const trail6Y = useSpring(trail5Y, trailConfigs[5]);

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

      setLastPos({ x: clientX, y: clientY });

      const element = document.elementFromPoint(clientX, clientY);
      if (element) {
        const interactive = element.closest('a, button, [role="button"], input, select, textarea');
        setIsHovering(!!interactive);

        const style = window.getComputedStyle(element);
        const isYellow = (c: string) => c && (c.includes('255, 202, 22') || c.toLowerCase().includes('#ffca16'));
        
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

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX, mouseY, lastPos]);

  if (isMobile) return null;

  const cursorColor = isOverYellow ? 'bg-white' : 'bg-[#FFCA16]';
  const borderColor = isOverYellow ? 'border-white/20' : 'border-[#FFCA16]/20';

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Trails 6 to 1 (back to front order) */}
      <motion.div
        style={{ x: trail6X, y: trail6Y }}
        className={`absolute z-10 w-1 h-1 -ml-0.5 -mt-0.5 rounded-full transition-colors duration-300 ${cursorColor}`}
      />
      <motion.div
        style={{ x: trail5X, y: trail5Y }}
        className={`absolute z-20 w-2 h-2 -ml-1 -mt-1 rounded-full transition-colors duration-300 ${cursorColor}`}
      />
      <motion.div
        style={{ x: trail4X, y: trail4Y }}
        className={`absolute z-30 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full transition-colors duration-300 ${cursorColor}`}
      />
      <motion.div
        style={{ x: trail3X, y: trail3Y }}
        className={`absolute z-40 w-4 h-4 -ml-2 -mt-2 rounded-full transition-colors duration-300 ${cursorColor}`}
      />
      <motion.div
        style={{ x: trail2X, y: trail2Y }}
        className={`absolute z-50 w-5 h-5 -ml-2.5 -mt-2.5 rounded-full transition-colors duration-300 ${cursorColor}`}
      />
      <motion.div
        style={{ x: trail1X, y: trail1Y }}
        className={`absolute z-[60] w-6 h-6 -ml-3 -mt-3 rounded-full transition-colors duration-300 ${cursorColor}`}
      />

      {/* Main Cursor (the leader) */}
      <motion.div
        style={{ x: mainX, y: mainY }}
        className={`absolute z-[70] w-8 h-8 -ml-4 -mt-4 rounded-full ${cursorColor} border-2 ${borderColor} ${
          isHovering ? 'scale-125' : 'scale-100'
        } flex items-center justify-center transition-transform duration-200 ease-out`}
      />
    </div>
  );
};

export default CustomCursor;