import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor — Adobe Illustrator Pen Tool (caneta.svg & caneta_mais.svg)
 * 
 * - Hotspot calibrado na ponta afiada da caneta (X: 8px, Y: 2px para viewBox 384x384 escalado a 28x28)
 * - Rastreamento 1:1 instantâneo de hardware via direct DOM transform (ZERO lag, ZERO animações, ZERO molas)
 * - caneta.svg em áreas normais do site
 * - caneta_mais.svg (Caneta com "+") em elementos clicáveis/interativos (onde o navegador mostraria o ponteiro)
 * - Alternância de cor inteligente:
 *     • Fundo preto / escuro  -> Caneta BRANCA (#FFFFFF) com sombra de contraste
 *     • Fundo branco / amarelo -> Caneta PRETA (#000000) com sombra de contraste
 */

const CURSOR_SIZE = 28;
// Coordenadas da ponta da caneta em caneta.svg / caneta_mais.svg (viewBox 384x384): X ≈ 110.01, Y ≈ 21.24
const TIP_OFFSET_X = Math.round((110.01 / 384) * CURSOR_SIZE); // ≈ 8px
const TIP_OFFSET_Y = Math.round((21.24 / 384) * CURSOR_SIZE);  // ≈ 2px

// Seletor abrangente para detectar qualquer elemento clicável no site
const CLICKABLE_SELECTOR = [
  'a',
  'button',
  '[role="button"]',
  '[role="tab"]',
  '[role="link"]',
  '[role="menuitem"]',
  'input',
  'select',
  'textarea',
  'label',
  'summary',
  '[onclick]',
  '.cursor-pointer',
  '[data-state]',
  '[data-cursor-clickable]',
  '[aria-haspopup]',
  'nav a',
  'header a',
  'header button',
].join(', ');

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(true); // true = caneta branca; false = caneta preta
  const [isClickable, setIsClickable] = useState(false); // true = caneta_mais.svg (+); false = caneta.svg
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Desativa em telas touch / mobile onde não há cursor do mouse
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia('(max-width: 768px)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Função para identificar se o fundo ou elemento sob o cursor é branco, claro ou amarelo
    const isLightOrYellowBackground = (el: Element | null): boolean => {
      let curr: Element | null = el;
      while (curr && curr !== document.documentElement) {
        const className = typeof curr.className === 'string' ? curr.className : '';

        // 1. Verificação explícita das camadas e elementos do Studio Kiiro
        if (
          className.includes('kiiro-intro-yellow') ||
          className.includes('kiiro-intro-white') ||
          className.includes('kiiro-bridge') ||
          curr.id === 'visao' ||
          className.includes('bg-[#FFCA16]') ||
          className.includes('bg-[#ffca16]') ||
          className.includes('bg-[#ffe169]') ||
          className.includes('bg-white') ||
          className.includes('bg-[#faf9f4]')
        ) {
          return true;
        }

        // 2. Verificação via cor computada (background-color)
        const style = window.getComputedStyle(curr);
        const bg = style.backgroundColor;
        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (match) {
            const r = parseInt(match[1], 10);
            const g = parseInt(match[2], 10);
            const b = parseInt(match[3], 10);

            // Amarelo característico (vermelho alto, verde alto, azul baixo)
            const isYellow = r > 180 && g > 150 && b < 100;

            // Luminância percebida (claro/branco)
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
            const isLight = luminance > 130;

            if (isYellow || isLight) {
              return true;
            } else {
              // Fundo opaco escuro encontrado, pode interromper a busca ascendente
              return false;
            }
          }
        }

        curr = curr.parentElement;
      }
      return false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Atualiza posição diretamente no DOM com 0ms de latência (sem React re-render nem useSpring)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX - TIP_OFFSET_X}px, ${clientY - TIP_OFFSET_Y}px, 0)`;
      }

      if (!isVisible) {
        setIsVisible(true);
      }

      // Detecção do elemento sob o cursor
      const target = document.elementFromPoint(clientX, clientY);
      const isLightUnderneath = isLightOrYellowBackground(target);

      // Detecção de elemento clicável / interativo para ativar caneta_mais.svg
      const clickableEl = target ? target.closest(CLICKABLE_SELECTOR) : null;
      const clickable = Boolean(clickableEl);

      // Se o fundo for branco ou amarelo -> caneta deve ser preta (isDarkTheme = false)
      // Se o fundo for preto / escuro      -> caneta deve ser branca (isDarkTheme = true)
      const shouldBeWhite = !isLightUnderneath;
      setIsDarkTheme((prev) => (prev !== shouldBeWhite ? shouldBeWhite : prev));
      setIsClickable((prev) => (prev !== clickable ? clickable : prev));
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isVisible]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[999999] select-none will-change-transform"
      style={{
        width: `${CURSOR_SIZE}px`,
        height: `${CURSOR_SIZE}px`,
        opacity: isVisible ? 1 : 0,
        // Sem transição de posição para 100% de precisão de hardware
        transition: 'opacity 0.15s ease',
      }}
      aria-hidden="true"
    >
      {/* 
        Ícone fiel da Caneta do Adobe Illustrator (caneta.svg)
        + Símbolo "+" do caneta_mais.svg sobre elementos clicáveis
        Branco no fundo preto, Preto no fundo branco ou amarelo
      */}
      <svg
        id="caneta-cursor"
        viewBox="0 0 384 384"
        width={CURSOR_SIZE}
        height={CURSOR_SIZE}
        className="pointer-events-none transition-colors duration-150"
        style={{
          filter: isDarkTheme
            ? 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 1px rgba(0, 0, 0, 0.8))'
            : 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 1px rgba(255, 255, 255, 0.7))',
        }}
      >
        {/* Corpo principal e ponta da caneta (idêntico em caneta.svg e caneta_mais.svg) */}
        <path
          d="M110.01,232.12c-.05,2.35.76,3.72,2.54,5.05l60.92,41.44,109.77-54.77,3.44-73.12c.25-2.41-.44-4.09-2.43-5.6L119.43,21.24l68.52,137.4c17.38-5.73,34.96,2.85,41.79,19.53,5.54,13.52,2.76,28.78-8.48,38.37-14.97,13.38-37.67,11.18-49.82-4.31-11.98-15.27-8.86-37.71,7.16-48.91L109.67,25.19l.34,206.94Z"
          fill={isDarkTheme ? '#FFFFFF' : '#000000'}
          stroke={isDarkTheme ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.4)'}
          strokeWidth="4"
        />
        {/* Base e cabo da caneta (idêntico em caneta.svg e caneta_mais.svg) */}
        <path
          d="M175.72,295.51c-1.52-3.04-.66-6,2.23-7.44l110.63-55.21c2.26-1.13,5.39.09,6.47,2.25l32.41,64.87c1.37,2.75-.31,5.76-2.91,7.06l-109.76,54.79c-2.82,1.41-5.88.19-7.23-2.51l-31.83-63.8Z"
          fill={isDarkTheme ? '#FFFFFF' : '#000000'}
          stroke={isDarkTheme ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.4)'}
          strokeWidth="4"
        />
        {/* Símbolo "+" da Caneta+ (caneta_mais.svg) ativo em botões e informações clicáveis */}
        {isClickable && (
          <polygon
            points="336.19 50.71 291.76 50.71 291.76 6.28 269.76 6.28 269.76 50.71 225.33 50.71 225.33 72.71 269.76 72.71 269.76 117.14 291.76 117.14 291.76 72.71 336.19 72.71 336.19 50.71"
            fill={isDarkTheme ? '#FFFFFF' : '#000000'}
            stroke={isDarkTheme ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.4)'}
            strokeWidth="4"
          />
        )}
      </svg>
    </div>
  );
};

export default CustomCursor;