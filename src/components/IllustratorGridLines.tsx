import React from 'react';

/**
 * Linhas Guias e Marcas de Registro Estilo Adobe Illustrator
 * Estrutura a prancheta do viewport com elegância sutil e precisão técnica.
 */
const IllustratorGridLines: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] select-none overflow-hidden">
      {/* Container alinhado com a largura máxima editorial */}
      <div className="container-editorial h-full relative">
        {/* Linha vertical esquerda */}
        <div className="absolute top-0 bottom-0 left-4 sm:left-8 md:left-12 w-[1px] bg-white/[0.03]">
          {/* Marcas de registro '+' (corte/prancheta) */}
          <span className="absolute top-24 -left-[5px] text-white/20 font-mono text-[10px] leading-none select-none">+</span>
          <span className="absolute top-1/2 -left-[5px] text-[#FFCA16]/30 font-mono text-[10px] leading-none select-none">+</span>
          <span className="absolute bottom-24 -left-[5px] text-white/20 font-mono text-[10px] leading-none select-none">+</span>
        </div>

        {/* Linha vertical central (guia de equilíbrio) */}
        <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/[0.015]">
          <span className="absolute top-32 -left-[5px] text-white/15 font-mono text-[10px] leading-none select-none">+</span>
          <span className="absolute bottom-32 -left-[5px] text-white/15 font-mono text-[10px] leading-none select-none">+</span>
        </div>

        {/* Linha vertical direita */}
        <div className="absolute top-0 bottom-0 right-4 sm:right-8 md:right-12 w-[1px] bg-white/[0.03]">
          <span className="absolute top-24 -right-[5px] text-white/20 font-mono text-[10px] leading-none select-none">+</span>
          <span className="absolute top-1/2 -right-[5px] text-[#FFCA16]/30 font-mono text-[10px] leading-none select-none">+</span>
          <span className="absolute bottom-24 -right-[5px] text-white/20 font-mono text-[10px] leading-none select-none">+</span>
        </div>
      </div>
    </div>
  );
};

export default IllustratorGridLines;
