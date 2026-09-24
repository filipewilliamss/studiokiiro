import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { getFeaturedCases } from '@/services/caseService';
import { playPillHover } from '@/utils/soundEffects';

const ShowreelSection: React.FC = () => {
  const cases = getFeaturedCases();
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = cases[selectedCaseIdx] || cases[0];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Movimento de elevação das pílulas conforme o scroll (DKTON style)
  const pillsY = useTransform(scrollYProgress, [0, 0.4, 0.8], [40, 0, -20]);

  return (
    <section 
      ref={containerRef}
      id="showreel"
      className="relative min-h-[100dvh] w-full bg-[#050505] flex flex-col justify-between py-20 md:py-28 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Background Media Stage com Transição Fluida */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.slug}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${activeProject.heroBanner || activeProject.coverImage || activeProject.pages[0]})`,
            }}
          >
            {/* Vinheta escura & gradiente cinematográfico para legibilidade de texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/85 backdrop-blur-[2px]" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Conteúdo Superior: Título Monumental & Pílulas de Revelação */}
      <div className="container-editorial relative z-10 w-full">
        
        {/* Header do Showreel */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-[#FFCA16] font-mono text-[11px] uppercase tracking-[0.35em] block mb-2">
              [ 02 · SELEÇÃO DE PROJETOS ]
            </span>
            <h2 
              className="font-display font-[900] text-white tracking-[-0.05em] uppercase leading-[0.85]"
              style={{ fontSize: 'clamp(40px, 7vw, 92px)' }}
            >
              SHOWREEL
            </h2>
          </div>

          <div className="text-right">
            <span className="font-mono text-white/40 text-[11px] uppercase tracking-wider block">
              CASES EM DESTAQUE
            </span>
            <span className="text-white font-mono text-sm font-bold">
              0{selectedCaseIdx + 1} / 0{cases.length}
            </span>
          </div>
        </div>

        {/* Pílulas que sobem revelando o projeto (DKTON signature) */}
        <motion.div 
          style={{ y: pillsY }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          {cases.map((project, idx) => {
            const isSelected = selectedCaseIdx === idx;
            return (
              <button
                key={project.id}
                onClick={() => {
                  setSelectedCaseIdx(idx);
                  playPillHover(idx);
                }}
                onMouseEnter={() => {
                  setSelectedCaseIdx(idx);
                  playPillHover(idx);
                }}
                className={`group relative px-5 py-3 rounded-full border text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-md flex items-center gap-2.5 ${
                  isSelected 
                    ? 'bg-[#FFCA16] border-[#FFCA16] text-black font-bold shadow-[0_0_20px_rgba(255,202,22,0.4)] scale-105' 
                    : 'bg-black/60 border-white/15 text-white/70 hover:border-[#FFCA16]/60 hover:text-white'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-black' : 'bg-[#FFCA16]'}`} />
                <span>{project.title}</span>
                <span className="text-[10px] opacity-60">[{project.year || '2024'}]</span>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Cartão Central Ativo com Atributo de Cursor 'VER CASE' */}
      <div className="container-editorial relative z-10 w-full my-auto py-12">
        <Link
          to={`/projeto/${activeProject.slug}`}
          data-cursor-project="VER PROJETO"
          className="group block relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40 hover:border-[#FFCA16]/60 transition-all duration-500 shadow-2xl p-6 sm:p-10 md:p-14 backdrop-blur-md"
        >
          {/* Marcas de corte estilo Illustrator nos cantos do card */}
          <span className="absolute top-2 left-2 text-[#FFCA16]/40 font-mono text-[10px]">+</span>
          <span className="absolute top-2 right-2 text-[#FFCA16]/40 font-mono text-[10px]">+</span>
          <span className="absolute bottom-2 left-2 text-[#FFCA16]/40 font-mono text-[10px]">+</span>
          <span className="absolute bottom-2 right-2 text-[#FFCA16]/40 font-mono text-[10px]">+</span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Infos do Projeto */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[#FFCA16] text-[10px] font-mono tracking-widest uppercase">
                {activeProject.category || 'Identidade Visual & Estratégia'}
              </div>

              <h3 
                className="font-display font-[800] text-white tracking-tight uppercase leading-[0.95] group-hover:text-[#FFCA16] transition-colors duration-300"
                style={{ fontSize: 'clamp(32px, 5vw, 68px)' }}
              >
                {activeProject.title}
              </h3>

              <p className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-xl font-display">
                {activeProject.subtitle || activeProject.intro || 'Transformação completa de marca com posicionamento de alto valor.'}
              </p>

              <div className="pt-2 flex items-center gap-3 text-white font-mono text-xs uppercase tracking-widest group-hover:text-[#FFCA16] transition-colors">
                <span>Entrar no Case Study</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            {/* Preview Visual em Destaque */}
            <div className="lg:col-span-5 relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <img 
                src={activeProject.coverImage || activeProject.pages[0]} 
                alt={activeProject.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-[10px] font-mono uppercase tracking-widest text-white/80">
                CLIQUE PARA ABRIR O BOOK
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Barra Inferior com Indicadores */}
      <div className="container-editorial relative z-10 w-full flex items-center justify-between text-[11px] font-mono text-white/40 border-t border-white/10 pt-4">
        <span>KIIRO SHOWREEL ARCHIVE</span>
        <span className="hidden sm:inline text-[#FFCA16]/60">USE O SCROLL OU NAVEGUE PELAS PÍLULAS</span>
        <Link to="/cases" className="text-white/70 hover:text-[#FFCA16] transition-colors uppercase tracking-wider">
          Ver Todos os Cases →
        </Link>
      </div>
    </section>
  );
};

export default ShowreelSection;
