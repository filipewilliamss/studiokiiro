
### Escultura Digital 3D: Redirecionamento Autoral do Símbolo Kiiro

Vou reconstruir o elemento visual do Hero, transformando o símbolo da marca em uma escultura digital 3D interativa, baseada em uma matriz de pontos (dot matrix) com profundidade real e comportamento orgânico.

**1. Motor de Projeção 3D em Canvas (`HeroSection.tsx`)**
*   **Geometria Proprietária:** Mapeamento exato das 4 hastes do logotipo Kiiro em coordenadas 3D (X, Y, Z), criando uma estrutura volumétrica em vez de faixas 2D planas.
*   **Projeção de Perspectiva:** Implementação de cálculo de câmera (focal length) para que as partículas ganhem profundidade real, diminuindo de tamanho e opacidade conforme se afastam no eixo Z.

**2. Sistema de Partículas "Dot Matrix"**
*   **Distribuição Estruturada:** As partículas serão organizadas em uma grade ordenada que segue a geometria do símbolo, reforçando a estética de "escultura digital" e precisão técnica.
*   **Dinâmica de Profundidade:** Cada ponto terá sua escala e transparência vinculadas à sua posição no espaço 3D, criando um efeito de "foco" e volume premium.

**3. Interatividade e Coreografia Visual**
*   **Parallax 3D Sensível:** O símbolo reagirá aos movimentos do mouse com rotações suaves nos eixos X e Y, permitindo ao usuário "ver" a profundidade da marca.
*   **Animação de Respiração (Idle):** Movimento senoidal sutil e flutuação contínua para manter o elemento "vivo" sem ser distrativo.
*   **Física de Atração/Repulsão:** Refinamento da interação onde as partículas se deslocam levemente com a proximidade do mouse, retornando à sua posição na matriz original com suavidade.

**4. Estética de Luxo**
*   **Paleta:** Uso exclusivo do Amarelo Dourado Kiiro (#FFCA16) com gradientes de brilho baseados na profundidade.
*   **Minimalismo:** Remoção de excessos visuais (glows genéricos) em favor de um acabamento nítido e tipográfico.

O resultado será um elemento de marca memorável que posiciona o Studio Kiiro como um estúdio de design tecnológico, autoral e sofisticado.