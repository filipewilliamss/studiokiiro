import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleBackground from './ParticleBackground';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      const titleWords = titleRef.current?.querySelectorAll('.word');
      
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' }
      });

      tl.from(titleWords || [], {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
      })
      .from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, '-=0.8')
      .from(buttonsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, '-=0.6')
      .from(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 1,
      }, '-=0.4');

      // Scroll progress effect - Immersive scroll
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: false,
        },
        y: -150,
        scale: 0.95,
        opacity: 0.3,
      });

      // Fill effect on scroll (color shift)
      if (titleWords) {
        gsap.to(titleWords, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom 20%',
            scrub: 0.5,
          },
          color: (i, target) => {
            return target.classList.contains('text-[#FFCA16]') ? '#FFCA16' : '#ffffff';
          },
          opacity: 1,
          stagger: 0.1,
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleText = "Design que Move. Estratégia que Converte.";
  const words = titleText.split(' ');

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#070807] flex flex-col items-center justify-center overflow-hidden px-6 py-20"
    >
      <ParticleBackground />

      <div className="relative z-10 w-full max-w-[1600px] flex flex-col items-center">
        <h1 
          ref={titleRef}
          className="w-full text-white font-[800] leading-[1.05] text-center tracking-tighter"
          style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}
        >
          {words.map((word, i) => {
            const isYellow = word.includes('Move') || word.includes('Converte');
            return (
              <span key={i} className="inline-block overflow-hidden mr-[0.2em] mb-[0.1em]">
                <span className={`word inline-block ${isYellow ? 'text-[#FFCA16]' : 'text-white'}`}>
                  {word}
                </span>
              </span>
            );
          })}
        </h1>

        <div 
          ref={subtitleRef}
          className="mt-10 text-white/70 text-lg md:text-[1.2rem] max-w-[480px] text-center font-[400] leading-relaxed"
        >
          Transformamos visões em experiências digitais memoráveis que impulsionam resultados reais para o seu negócio.
        </div>

        <div 
          ref={buttonsRef}
          className="mt-14 flex flex-col sm:flex-row gap-6 items-center"
        >
          <a
            href="#portfolio"
            className="group relative px-10 py-5 bg-[#FFCA16] text-[#070807] font-bold rounded-[50px] transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-[1.05] flex items-center justify-center text-lg active:scale-95 shadow-[0_10px_30px_rgba(255,202,22,0.1)]"
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            className="group relative px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-[50px] transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-[1.05] flex items-center justify-center text-lg active:scale-95"
          >
            Solicitar Orçamento
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-10 right-10 flex flex-col items-center gap-4 select-none"
      >
        <span className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-semibold [writing-mode:vertical-rl]">
          scroll
        </span>
        <div className="w-[1px] h-24 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#FFCA16] animate-scroll-line" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(250%); }
        }
        .animate-scroll-line {
          animation: scroll-line 2.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}} />
    </section>
  );
};

export default HeroSection;
