
### Escultura Digital: Transposição Literal do Símbolo via Amostragem SVG

Vou substituir a lógica de construção manual de barras por um sistema de amostragem direta do arquivo SVG fornecido. Isso garante que a geometria seja 100% fiel à identidade visual da marca, eliminando qualquer interpretação errônea.

**1. Extração de Geometria via Offscreen Canvas**
*   **Carregamento do Asset:** Carregamento dinâmico do SVG oficial (`74vgf242gij-1776992209834.svg`).
*   **Rasterização Técnica:** Desenho do símbolo em um canvas oculto de alta precisão para mapear exatamente onde o "preenchimento" do logo existe.
*   **Amostragem de Partículas (Dot Matrix):** Varredura dos pixels do símbolo. Para cada ponto detectado na silhueta, criarei uma coluna de pontos na matriz 3D.

**2. Volumetria e Profundidade (Extrusão Digital)**
*   **Camadas de Profundidade:** Cada ponto da silhueta 2D será replicado em múltiplas camadas ao longo do eixo Z (profundidade), transformando o logo plano em uma "escultura de vidro" volumétrica composta por luz.
*   **Densidade Controlada:** Ajuste da densidade da matriz para que o símbolo seja nítido e reconhecível de frente, revelando sua profundidade apenas conforme o usuário interage com o mouse.

**3. Refinamento da Interação 3D**
*   **Centralização Automática:** Cálculo do "bounding box" do SVG para garantir que o objeto esteja perfeitamente centralizado no canvas do Hero, independentemente da escala original do arquivo.
*   **Interação Preservada:** Manutenção do efeito de parallax suave, retorno elástico e micro-oscilação "breathing" que já conferem a estética premium.

**4. Fidelidade Cromática**
*   Uso rigoroso do Amarelo Dourado Kiiro (#FFCA16) com o algoritmo de profundidade (Painter's Algorithm) para criar gradientes naturais de brilho baseados na distância da câmera.

O resultado será a assinatura visual definitiva: o símbolo real do Studio Kiiro, transposto para um ambiente 3D interativo com precisão matemática.
