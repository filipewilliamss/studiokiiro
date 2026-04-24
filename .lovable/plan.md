
### Escultura Digital: Reconstrução da Assinatura Visual Kiiro

Vou reconstruir o elemento interativo do Hero, abandonando a geometria anterior (que remetia a uma letra "A") em favor de uma representação volumétrica fiel ao símbolo original da marca, focando em precisão geométrica e sofisticação técnica.

**1. Reengenharia Geométrica do Símbolo (`HeroSection.tsx`)**
*   **Identidade Modular:** Implementação do símbolo em três blocos independentes e organizados:
    *   **Haste (Stem):** Barra vertical com inclinação técnica à esquerda (`\`).
    *   **Diagonal Superior:** Vetor central ascendente, criando a base da estrutura modular.
    *   **Vetor de Avanço (Seta):** Elemento lateral direito com ângulo agudo, reforçando a sensação de progresso e direção característica da marca.
*   **Proporção Horizontal:** Ajuste da escala para um formato mais compacto e expandido lateralmente, eliminando o aspecto de "pirâmide" ou "triângulo".

**2. Escultura de Matriz Volumétrica (Dot Matrix 3D)**
*   **Construção por Camadas:** O símbolo será esculpido em múltiplas camadas paralelas no eixo Z (profundidade), criando uma sensação de objeto físico digital com volume real.
*   **Grade de Precisão:** Os pontos serão organizados em uma malha ortogonal rigorosa, preservando os espaços vazios (gaps) que conferem o visual modular e arquitetônico ao logo.

**3. Interatividade e Comportamento Orgânico**
*   **Parallax Dinâmico:** Implementação de rotação suave em 3D sincronizada com o movimento do mouse, com micro-deslocamentos entre as camadas para acentuar a profundidade.
*   **Respiração de Marca (Idle):** Adição de uma oscilação senoidal sutil que mantém o elemento "vivo" no espaço, sem comprometer a legibilidade do símbolo.
*   **Retorno Elástico:** Sistema de amortecimento (spring) que faz a escultura retornar suavemente à sua posição de repouso (front-facing) ao remover o mouse.

**4. Acabamento Premium e Contexto Editorial**
*   **Paleta:** Amarelo Dourado (#FFCA16) sobre fundo preto absoluto, com gradientes de opacidade baseados na profundidade (Painter's Algorithm).
*   **Labels Técnicas:** Atualização dos metadados laterais com rótulos como "KIIRO · IDENTITY" e "MODULAR CONSTRUCTION", integrando o objeto como uma assinatura de design de luxo.

O resultado será um elemento proprietário, claramente reconhecível como o logo do Studio Kiiro, comunicando tecnologia, precisão e branding de alto nível.