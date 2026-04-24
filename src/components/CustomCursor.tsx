import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the main cursor
  const springConfig = { damping: 25, stiffness: 450, mass: 0.5 };
  const mainX = useSpring(mouseX, springConfig);
  const mainY = useSpring(mouseY, springConfig);

  // Configuration for the trail circles - following the leader to prevent overtaking
  const trailConfigs = [
    { damping: 30, stiffness: 500, mass: 0.4 },
    { damping: 35, stiffness: 400, mass: 0.45 },
    { damping: 40, stiffness: 300, mass: 0.5 },
    { damping: 45, stiffness: 200, mass: 0.55 },
    { damping: 50, stiffness: 150, mass: 0.6 },
    { damping: 55, stiffness: 100, mass: 0.65 },
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

      // Check for elements under cursor for hover effect
      const element = document.elementFromPoint(clientX, clientY);
      if (element) {
        const interactive = element.closest('a, button, [role="button"], input, select, textarea');
        setIsHovering(!!interactive);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Trails 6 to 1 (back to front order) */}
      <motion.div
        style={{ x: trail6X, y: trail6Y }}
        className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#FFCA16]"
      />
      <motion.div
        style={{ x: trail5X, y: trail5Y }}
        className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-[#FFCA16]"
      />
      <motion.div
        style={{ x: trail4X, y: trail4Y }}
        className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full bg-[#FFCA16]"
      />
      <motion.div
        style={{ x: trail3X, y: trail3Y }}
        className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full bg-[#FFCA16]"
      />
      <motion.div
        style={{ x: trail2X, y: trail2Y }}
        className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full bg-[#FFCA16]"
      />
      <motion.div
        style={{ x: trail1X, y: trail1Y }}
        className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full bg-[#FFCA16]"
      />

      {/* Main Cursor (on top) */}
      <motion.div
        style={{ x: mainX, y: mainY }}
        className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full bg-[#FFCA16] transition-all duration-300 ease-out border-2 border-[#FFCA16]/20 ${
          isHovering ? 'scale-125' : 'scale-100'
        }`}
      />
    </div>
  );
};

export default CustomCursor;