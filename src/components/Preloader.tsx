import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const targetText = "KIIRO";
      const textElement = textRef.current;
      
      if (!textElement) return;

      // Scramble text effect
      const tl = gsap.timeline({
        onComplete: () => {
          // Columns animation after text
          gsap.to(".preloader-column", {
            y: "-100%",
            duration: 1,
            stagger: {
              amount: 0.5,
              from: "random"
            },
            ease: "power4.inOut",
            onComplete: onComplete
          });
        }
      });

      // Initial scramble
      tl.to({}, {
        duration: 1.5,
        onUpdate: function() {
          const progress = this.progress();
          let currentText = "";
          for (let i = 0; i < targetText.length; i++) {
            if (progress > (i + 1) / targetText.length) {
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
        duration: 0.5,
        delay: 0.5
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#070807] overflow-hidden">
      <div ref={columnsRef} className="absolute inset-0 flex">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="preloader-column flex-1 bg-[#070807] border-x border-white/5" />
        ))}
      </div>
      <div 
        ref={textRef} 
        className="relative z-10 text-[#FFCA16] text-6xl md:text-8xl font-bold tracking-tighter"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        
      </div>
    </div>
  );
};

export default Preloader;
