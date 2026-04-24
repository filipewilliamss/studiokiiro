
### Redesign Editorial: Portfolio Showcase & Case Study Pages

Vou transformar o portfólio em uma experiência imersiva de "Showcase Interativo" na Home e criar páginas de "Case Study" editoriais completas, elevando a percepção de valor de cada projeto.

**1. Expansão do Modelo de Dados (`src/data/projects.ts`)**
*   Atualizar a interface `Project` para incluir campos de narrativa e ficha técnica: `slug`, `client`, `year`, `deliverables`, `role`, `narrative` (desafio, estratégia, solução, resultado).
*   Estruturar as galerias para suportar composições editoriais (imagens de largura total e spreads).

**2. Navegação & Roteamento (`src/App.tsx`)**
*   Implementar a rota `/projeto/:slug` para as páginas internas de detalhes.
*   Garantir que o `Navbar` e `Footer` funcionem corretamente em subpáginas, direcionando links de âncora de volta para a Home quando necessário.

**3. Home: Portfolio Showcase Interativo (`src/components/PortfolioSection.tsx`)**
*   **Layout Dominante:** Um único projeto em destaque por vez ocupando a maior parte da tela.
*   **Troca de Conteúdo Dinâmica:** Ao interagir com a navegação (números ou nomes), todo o painel (título monumental, categoria, descrição e visual) transiciona suavemente com efeitos de fade, scale e deslocamento.
*   **Visual Premium:** Fundo preto profundo com grid sutil, tipografia gigante e uso cirúrgico do Amarelo Kiiro apenas em pontos de foco e hover da seta.

**4. Páginas de Case Study Editorial (`src/pages/ProjectDetail.tsx`)**
*   **Hero de Impacto:** Abertura com título monumental, informações rápidas (ano/categoria) e a imagem principal em grande escala.
*   **Ficha Técnica & Narrativa:** Seções dedicadas ao contexto do projeto, apresentando o "Desafio", "Estratégia" e "Resultado" com tipografia refinada e muito respiro.
*   **Galeria Editorial:** Apresentação visual de alto nível usando mockups e imagens grandes que ocupam a tela, alternando ritmos de layout para evitar monotonia.
*   **Fechamento Estratégico:** Sugestão do próximo projeto para manter o fluxo e CTA magnético para conversão.

**5. Movimento & Refinamento Visual**
*   Implementar animações de entrada baseadas em scroll (reveal effects) usando `framer-motion`.
*   Assegurar que no mobile a experiência se transforme em um stack vertical de alta qualidade, mantendo o impacto visual sem depender de interações de hover.
