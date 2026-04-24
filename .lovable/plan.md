
### Redesign Editorial do Portfólio (Premium Showcase)

Vou reconstruir a seção de portfólio para transformá-la em um showcase editorial de alto nível, abandonando o sistema de abas e cards em favor de uma experiência imersiva com preview dinâmico e tipografia monumental.

**1. Arquitetura Editorial & Layout**
*   **Fundo & Atmosfera:** Implementação de um fundo "Pure Deep Black" com grid sutil de 60px (coerente com o Hero) e generoso respiro visual (padding de 64px vertical).
*   **Cabeçalho de Impacto:** Criação de um topo com label numerado "04 PORTFÓLIO", título monumental em `clamp` para escala perfeita e subtítulo estratégico.
*   **Estrutura Dual Column (Desktop):**
    *   **Coluna Esquerda:** Lista vertical de projetos estilizada como uma publicação de design.
    *   **Coluna Direita (Sticky):** Área de preview fixa que atua como o "palco" principal, exibindo o projeto ativo em grande escala.

**2. Lista de Projetos & Microinterações**
*   **Design de Linha:** Cada projeto será apresentado em um bloco horizontal com tipografia refinada, números de índice (01, 02...), categorias em uppercase e tags discretas.
*   **Interação Magnética:** 
    *   Hover no título aciona transição para o Amarelo Dourado (#FFCA16).
    *   Seta animada com efeito de "entrada/saída" (GSAP/Framer Motion).
    *   Deslocamento sutil de 6px no hover para reforçar o estado ativo.
*   **Preview Dinâmico:** O preview à direita reagirá instantaneamente ao hover da lista com um efeito de fade + scale elegante e moldura técnica.

**3. Adaptação Mobile (Showcase Vertical)**
*   Remoção do comportamento sticky para uma rolagem vertical fluida.
*   Cada projeto vira um case individual com imagem integrada, garantindo que o impacto visual não seja perdido em telas menores.

**4. Fechamento Estratégico (CTA Final)**
*   Adição de uma seção de conclusão dentro do portfólio com convite direto: "Seu projeto pode ser o próximo case memorável", mantendo a estética premium e botões com transição de preenchimento magnético.

**5. Refinamento de Movimento**
*   Uso de `stagger` nas animações de entrada (ScrollTrigger) para revelar a lista de forma cadenciada e suave.
*   Easing customizado `[0.22, 1, 0.36, 1]` para todas as transições, garantindo a sensação de sofisticação solicitada.
