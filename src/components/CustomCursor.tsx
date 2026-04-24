import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isOverYellow, setIsOverYellow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the main cursor - making it very reactive
  const mainSpringConfig = { damping: 35, stiffness: 1000, mass: 0.1 };
  const mainX = useSpring(mouseX, mainSpringConfig);
  const mainY = useSpring(mouseY, mainSpringConfig);

  // Configuration for the trail circles - following the leader progressively slower
  // to ensure they stay behind and follow the path
  const trailConfigs = [
    { damping: 40, stiffness: 700, mass: 0.3 }, // Slower first link to avoid "atropelamento"
    { damping: 35, stiffness: 600, mass: 0.3 },
    { damping: 40, stiffness: 400, mass: 0.4 },
    { damping: 45, stiffness: 300, mass: 0.5 },
    { damping: 50, stiffness: 200, mass: 0.6 },
    { damping: 55, stiffness: 150, mass: 0.7 },
  ];

  // We make the first trail link follow the mouseX directly but with a different config 
  // than the main cursor to create separation and prevent "atropelamento"
  const trail1X = useSpring(mouseX, trailConfigs[0]);
  const trail1Y = useSpring(mouseY, trailConfigs[0]);
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

      // Check for elements under cursor for hover effect and color detection
      const element = document.elementFromPoint(clientX, clientY);
      if (element) {
        const interactive = element.closest('a, button, [role="button"], input, select, textarea');
        setIsHovering(!!interactive);

        // Detect yellow color (#FFCA16 = rgb(255, 202, 22))
        const style = window.getComputedStyle(element);
        const isYellow = (c: string) => c && (c.includes('255, 202, 22') || c.toLowerCase().includes('#ffca16'));
        
        // Also check parent elements as text color might be inherited
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
  }, [mouseX, mouseY]);

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

      {/* Main Cursor (on top) */}
      <motion.div
        style={{ x: mainX, y: mainY }}
        className={`absolute z-[70] w-8 h-8 -ml-4 -mt-4 rounded-full ${cursorColor} transition-all duration-300 ease-out border-2 ${borderColor} ${
          isHovering ? 'scale-125' : 'scale-100'
        }`}
      />
    </div>
  );
};

export default CustomCursor;