
### Escultura Digital 3D: Evolução do Símbolo Kiiro

Vou substituir o elemento genérico de partículas por uma **escultura digital 3D autoral**, baseada no símbolo do Studio Kiiro, com profundidade real e interatividade refinada.

**1. Motor de Projeção 3D Customizado (`HeroSection.tsx`)**
*   **Transição para 3D:** Substituirei o sistema 2D atual por um motor de projeção matemática (`perspective projection`) que transforma coordenadas `(x, y, z)` em pontos no canvas, criando profundidade genuína sem a necessidade de bibliotecas pesadas.
*   **Volumetria do Símbolo:** As "faixas" do logo ganharão espessura no eixo Z, tornando-se prismas de luz compostos por uma matriz de pontos densa e precisa.

**2. Direção de Arte e Acabamento**
*   **Dot Matrix Premium:** Os pontos serão menores e mais nítidos, com variações sutis de opacidade baseadas na distância (profundidade), simulando um objeto físico flutuante.
*   **Paleta Coerente:** Foco total no amarelo dourado (`#FFCA16`) sobre o fundo preto profundo, com um efeito de "glow" sutil e elegante.

**3. Dinâmica e Interatividade**
*   **Rotação Cinemática:** O símbolo terá uma rotação suave e contínua (idle animation) e responderá ao movimento do mouse com uma rotação em X e Y, criando um efeito de paralaxe sofisticado.
*   **Física de Partículas:** Manterei a interação de "repulsão" ao mouse, mas adaptada para o espaço 3D, fazendo com que o objeto pareça reagir ao toque digital.
*   **Sensação de "Objeto Vivo":** Adição de uma oscilação senoidal (floating) para que o símbolo nunca pareça estático.

**4. Performance e Refinamento**
*   Otimização do loop de animação para garantir 60fps constantes.
*   Ajuste de escala responsiva para que o símbolo mantenha sua força visual em dispositivos móveis, adaptando a densidade de partículas.

O resultado será um **key visual proprietário**, que comunica tecnologia, precisão e design de alto nível logo na primeira dobra do site.
