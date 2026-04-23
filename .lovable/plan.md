
### Portfólio Editorial Premium — Estratégia de Implementação

Vou transformar a atual grade de portfólio em um **showcase editorial de alto impacto**, utilizando uma estrutura de lista vertical com preview visual dinâmico, inspirada em estúdios de design de luxo.

**1. Reestruturação do Componente `PortfolioSection.tsx`**
*   **Novo Layout:** Substituirei o grid atual por uma estrutura de duas colunas (Desktop):
    *   **Esquerda (Lista):** Uma lista vertical elegante com os projetos. Cada item terá número (01, 02...), título forte, categoria e uma breve descrição.
    *   **Direita (Preview):** Uma área `sticky` que exibe a imagem/mockup do projeto selecionado ou em hover, criando um efeito de "galeria dinâmica".
*   **Interações de Hover:**
    *   Ao passar o mouse sobre um projeto na lista, a imagem correspondente aparecerá na área de preview com uma transição suave.
    *   O título do projeto ganhará destaque (cor `#FFCA16`), e um indicador visual (seta) surgirá.
    *   A imagem no preview terá uma micro-animação de escala (`zoom-in` leve).

**2. Design & Estética Premium**
*   **Tipografia:** Uso de `Poppins` com pesos variados (Extra-Bold para títulos, Regular/Light para descrições) e `letter-spacing` negativo nos títulos para o visual editorial.
*   **Espaçamento:** Aumento do `padding` e respiro entre elementos para evitar a sensação de "template" e focar na direção de arte.
*   **Linhas Sutis:** Divisórias em `rgba(255, 255, 255, 0.08)` para organizar a lista sem pesar visualmente.
*   **Paleta:** Fundo preto profundo (`#070807`) com o amarelo (`#FFCA16`) usado apenas como acento de sofisticação.

**3. Conteúdo & Dados**
*   Atualizarei os dados em `src/data/projects.ts` para refletir os exemplos solicitados (Abdoni Podstore, Construmir, Terapia do DNA, Terra Linda Cross), garantindo que cada um tenha sua descrição refinada.

**4. Responsividade Adaptativa**
*   **Mobile/Tablet:** A lista deixará de ter preview lateral e cada projeto se tornará um bloco autônomo e bem organizado, mantendo a elegância mas adaptado ao toque e scroll vertical.

**5. Animações com Framer Motion**
*   Entradas suaves com `fade-up` e `stagger children` ao rolar a página.
*   Transições de estado (hover) rápidas porém fluidas (duration ~0.3s).

Vou iniciar a implementação agora para entregar esse visual autoral e sofisticado.
