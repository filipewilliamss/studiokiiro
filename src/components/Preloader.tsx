import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [blocks, setBlocks] = useState<number[]>([]);

  useEffect(() => {
    const cols = window.innerWidth < 768 ? 6 : 10;
    setBlocks(Array.from({ length: cols }, (_, i) => i));
  }, []);

  useEffect(() => {
    if (blocks.length === 0) return;

    const ctx = gsap.context(() => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const targetText = "KIIRO";
      const textElement = textRef.current;
      
      if (!textElement) return;

      const tl = gsap.timeline();

      // Pulse animation for logo
      gsap.to(textElement, {
        scale: 1.05,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Progress bar animation
      tl.to(progressBarRef.current, {
        width: "100%",
        duration: 2.5,
        ease: "power2.inOut"
      });

      // Scramble text effect
      tl.to({}, {
        duration: 1.5,
        onUpdate: function() {
          const progress = this.progress();
          let currentText = "";
          for (let i = 0; i < targetText.length; i++) {
            if (progress > (i + 0.5) / targetText.length) {
              currentText += targetText[i];
            } else {
              currentText += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          textElement.innerText = currentText;
        }
      }, 0);

      tl.to(textElement, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "power2.in"
      });

      // Columns animation
      tl.to(".preloader-block", {
        y: "-100%",
        duration: 1,
        stagger: {
          amount: 0.6,
          from: "random"
        },
        ease: "power4.inOut",
        onComplete: onComplete
      });

    }, containerRef);

    return () => ctx.revert();
  }, [blocks, onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#070807] overflow-hidden">
      <div className="absolute inset-0 flex">
        {blocks.map((i) => (
          <div 
            key={i} 
            className="preloader-block flex-1 bg-[#070807] border-x border-white/10" 
          />
        ))}
      </div>

      <div className="absolute inset-0 hidden md:grid grid-cols-10 grid-rows-10 pointer-events-none opacity-20">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="border-[1px] border-white/15" />
        ))}
      </div>

      {/* Mobile grid — adds horizontal lines on top of the vertical column borders */}
      <div className="absolute inset-0 grid md:hidden grid-cols-6 grid-rows-12 pointer-events-none opacity-20">
        {[...Array(72)].map((_, i) => (
          <div key={i} className="border-[1px] border-white/15" />
        ))}
      </div>
      
      <div 
        ref={textRef} 
        className="relative z-10 text-[#FFCA16] text-6xl md:text-8xl font-[800] tracking-tighter font-display"
      >
        KIIRO
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 z-20">
        <div 
          ref={progressBarRef}
          className="h-full bg-[#FFCA16] w-0"
        />
      </div>
    </div>
  );
};

export default Preloader;
