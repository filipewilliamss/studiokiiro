import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const blocksContainerRef = useRef<HTMLDivElement>(null);
  const [blocks, setBlocks] = useState<number[]>([]);

  useEffect(() => {
    // Create a grid of blocks
    const cols = 10;
    const rows = 1; // Keeping it simple with vertical columns as requested "colunas verticais que sobem"
    setBlocks(Array.from({ length: cols * rows }, (_, i) => i));

    const ctx = gsap.context(() => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const targetText = "KIIRO";
      const textElement = textRef.current;
      
      if (!textElement) return;

      const tl = gsap.timeline();

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
      });

      tl.to(textElement, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.in"
      });

      // Columns animation - "colunas verticais que sobem e revelam o conteúdo"
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
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#070807] overflow-hidden">
      <div ref={blocksContainerRef} className="absolute inset-0 flex">
        {blocks.map((i) => (
          <div 
            key={i} 
            className="preloader-block flex-1 bg-[#070807] border-x border-white/5" 
          />
        ))}
      </div>
      
      <div 
        ref={textRef} 
        className="relative z-10 text-[#FFCA16] text-6xl md:text-8xl font-[800] tracking-tighter"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        KIIRO
      </div>
    </div>
  );
};

export default Preloader;
