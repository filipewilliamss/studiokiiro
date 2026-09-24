import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSwitchClick } from '@/utils/soundEffects';

const ContactSection: React.FC = () => {
  const [isPowerOn, setIsPowerOn] = useState(false);

  const handleTogglePower = () => {
    const nextState = !isPowerOn;
    setIsPowerOn(nextState);
    playSwitchClick(nextState);
  };

  return (
    <section 
      id="contato" 
      className={`relative overflow-hidden py-24 md:py-36 transition-colors duration-700 select-none ${
        isPowerOn ? 'bg-[#0a0904]' : 'bg-[#030303]'
      }`}
    >
      {/* Luz do Holofote / Foco Kiiro (Acende quando o switch é ligado) */}
      <AnimatePresence>
        {isPowerOn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,rgba(255,202,22,0.14)_0%,rgba(255,202,22,0.03)_50%,transparent_75%)] blur-[90px] pointer-events-none z-0"
          />
        )}
      </AnimatePresence>

      {/* Linhas de borda sutis */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-editorial relative z-10 flex flex-col items-center text-center">
        
        {/* DISPOSITIVO: O INTERRUPTOR INDUSTRIAL MASTER (POWER SWITCH) */}
        <div className="mb-14 flex flex-col items-center">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mb-4">
            {isPowerOn ? '● ENERGIA ATIVA' : '○ ACIONE O INTERRUPTOR PARA LIBERAR O CONTATO'}
          </span>

          {/* Placa Metálica do Interruptor */}
          <button
            onClick={handleTogglePower}
            className="group relative px-6 py-4 rounded-xl border border-white/15 bg-gradient-to-b from-[#1c1c1c] to-[#0d0d0d] shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-[#FFCA16]/60 transition-all duration-300 flex items-center gap-4 cursor-pointer"
          >
            {/* 4 parafusos técnicos nos cantos da placa */}
            <span className="absolute top-1.5 left-2 text-white/30 font-mono text-[9px] leading-none">✕</span>
            <span className="absolute top-1.5 right-2 text-white/30 font-mono text-[9px] leading-none">✕</span>
            <span className="absolute bottom-1.5 left-2 text-white/30 font-mono text-[9px] leading-none">✕</span>
            <span className="absolute bottom-1.5 right-2 text-white/30 font-mono text-[9px] leading-none">✕</span>

            {/* Indicador LED piloto */}
            <div className="flex flex-col items-center gap-1">
              <span 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isPowerOn 
                    ? 'bg-[#FFCA16] shadow-[0_0_12px_#FFCA16]' 
                    : 'bg-white/20'
                }`} 
              />
              <span className="text-[8px] font-mono text-white/40 uppercase">STATUS</span>
            </div>

            {/* Chave Alavanca Física */}
            <div className="relative w-12 h-6 bg-black/80 rounded-full border border-white/20 p-0.5 flex items-center">
              <motion.div
                animate={{ x: isPowerOn ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                className={`w-5 h-5 rounded-full shadow-md transition-colors duration-300 flex items-center justify-center ${
                  isPowerOn ? 'bg-[#FFCA16]' : 'bg-white/60'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isPowerOn ? 'bg-black' : 'bg-black/60'}`} />
              </motion.div>
            </div>

            {/* Label de texto */}
            <div className="text-left">
              <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-white/90">
                MASTER SWITCH
              </span>
              <span className="block font-mono text-[9px] text-[#FFCA16]">
                {isPowerOn ? 'ESTÚDIO ILUMINADO' : 'CLIQUE PARA LIGAR'}
              </span>
            </div>
          </button>
        </div>

        {/* Manifesto & Chamada para Ação */}
        <motion.div 
          animate={{ opacity: isPowerOn ? 1 : 0.45 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <span className="text-[#FFCA16] text-[11px] font-bold uppercase tracking-[0.4em] block mb-6">
            [ 04 · PRÓXIMO PASSO ]
          </span>

          <h2 
            className="font-display font-[900] leading-[0.84] tracking-[-0.055em] text-white mb-10"
            style={{ fontSize: 'clamp(36px, 7.5vw, 110px)' }}
          >
            Marcas comuns competem por preço. <br />
            <span className="text-[#FFCA16] italic font-light">Marcas Kiiro dominam.</span>
          </h2>

          <p className="font-display text-[18px] md:text-[22px] font-light text-white/70 max-w-2xl mx-auto leading-relaxed mb-12">
            Não criamos apenas logos bonitos. Criamos identidades visuais de alta relevância que posicionam seu negócio como líder de categoria.
          </p>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="https://wa.me/5511991076096?text=Ol%C3%A1!%20Gostaria%20de%20iniciar%20um%20projeto%20com%20o%20Studio%20Kiiro."
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-display font-bold text-xs uppercase tracking-[0.25em] transition-all duration-300 ${
                isPowerOn
                  ? 'bg-[#FFCA16] text-black shadow-[0_0_35px_rgba(255,202,22,0.6)] hover:shadow-[0_0_50px_rgba(255,202,22,0.85)] hover:scale-105 active:scale-95'
                  : 'bg-white/10 text-white/70 border border-white/20 hover:border-[#FFCA16] hover:text-white'
              }`}
            >
              <span>Conversar pelo WhatsApp</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href="mailto:contato@studiokiiro.com"
              className="inline-flex items-center gap-2 px-8 py-5 rounded-full bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-white/30 text-white/70 hover:text-white font-display text-xs uppercase tracking-widest transition-all duration-300"
            >
              <span>Enviar Briefing por E-mail</span>
            </a>
          </div>

          <div className="mt-12 text-[11px] font-mono text-white/30">
            RESPOSTA EM ATÉ 24 HORAS · SÃO PAULO, BRASIL
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;
