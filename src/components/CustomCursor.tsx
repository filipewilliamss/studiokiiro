import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isOverWhite, setIsOverWhite] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the main cursor and trails
  const springConfig = { damping: 25, stiffness: 200 };
  const mainX = useSpring(mouseX, springConfig);
  const mainY = useSpring(mouseY, springConfig);

  // Springs for trailers with increasing delay/damping
  const trail1X = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const trail1Y = useSpring(mouseY, { damping: 30, stiffness: 150 });
  
  const trail2X = useSpring(mouseX, { damping: 35, stiffness: 100 });
  const trail2Y = useSpring(mouseY, { damping: 35, stiffness: 100 });

  const trail3X = useSpring(mouseX, { damping: 40, stiffness: 50 });
  const trail3Y = useSpring(mouseY, { damping: 40, stiffness: 50 });

  const [velocity, setVelocity] = useState(0);
  const lastPos = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
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
        const v = dist / dt;
        setVelocity(v);
      }
      lastPos.current = { x: clientX, y: clientY, time: now };

      // Check for white background/text
      const element = document.elementFromPoint(clientX, clientY);
      if (element) {
        const style = window.getComputedStyle(element);
        const color = style.color;
        const bgColor = style.backgroundColor;
        
        // Simple check for "white-ish" (rgb(255, 255, 255) or similar)
        const isWhite = (color: string) => {
          const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (match) {
            const [_, r, g, b] = match.map(Number);
            return r > 220 && g > 220 && b > 220;
          }
          return color === 'white' || color === '#fff' || color === '#ffffff';
        };

        setIsOverWhite(isWhite(color) || isWhite(bgColor));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const trailOpacity = Math.min(velocity * 0.5, 1);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Trail 3 (Smallest) */}
      <motion.div
        style={{ x: trail3X, y: trail3Y, opacity: trailOpacity }}
        className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-white"
      />
      {/* Trail 2 */}
      <motion.div
        style={{ x: trail2X, y: trail2Y, opacity: trailOpacity }}
        className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-yellow-400"
      />
      {/* Trail 1 */}
      <motion.div
        style={{ x: trail1X, y: trail1Y, opacity: trailOpacity }}
        className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full bg-white"
      />
      {/* Main Cursor */}
      <motion.div
        style={{ x: mainX, y: mainY }}
        className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-white transition-colors duration-200 ${
          isOverWhite ? 'bg-yellow-400 border-yellow-400' : 'bg-white'
        }`}
      />
    </div>
  );
};

export default CustomCursor;
