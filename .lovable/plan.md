
### Reconstrução Geométrica do Símbolo Kiiro

A geometria atual ainda forma uma silhueta triangular (4 barras inclinadas que se cruzam no topo, lembrando uma letra "A"). Vou abandonar essa estrutura e reconstruir o objeto seguindo a anatomia real do símbolo modular descrita: **haste vertical inclinada à esquerda + diagonal central ascendente + vetor lateral direito (seta)**.

**1. Nova Anatomia do Símbolo (3 módulos, não 4 barras)**
*   **Módulo A — Haste Esquerda:** Barra vertical com leve inclinação (`\`), ocupando o terço esquerdo do canvas. Altura cheia, largura compacta.
*   **Módulo B — Diagonal Central Ascendente:** Vetor angular partindo da base da haste e subindo em direção ao topo direito, criando o eixo de movimento do símbolo.
*   **Módulo C — Vetor de Avanço (Seta):** Bloco diagonal curto no canto inferior direito, formando a sensação de seta/progresso modular característica da identidade.
*   **Espaços vazios preservados:** Gaps internos entre os módulos mantêm a leitura arquitetônica do logo.

**2. Proporção Horizontal**
*   Reescala do bounding box para formato compacto e horizontal (largura > altura), eliminando definitivamente a silhueta de pirâmide/letra A.
*   Ajuste do FOCAL e dos parâmetros de matriz para compor um emblema, não uma forma alta.

**3. Volumetria em Camadas**
*   Mantém o sistema atual de `buildBar` com matriz volumétrica em Z (camadas paralelas), garantindo profundidade real.
*   Densidade ajustada para preservar legibilidade do símbolo mesmo em rotação.

**4. Interatividade Refinada (mantida)**
*   Rotação parallax suave em X/Y conforme o mouse, idle breathing senoidal, retorno elástico ao centro — sem distorção da forma.
*   Redução leve da amplitude de rotação para preservar reconhecibilidade do símbolo em todos os estados.

**5. Metadados Editoriais**
*   Atualização das labels para `KIIRO · MARK · 001` e `MODULAR GEOMETRY · VOL.01`, reforçando o caráter de assinatura de identidade.

O resultado será um emblema digital reconhecível como o símbolo modular do Studio Kiiro — não uma forma genérica, não um triângulo, não uma letra A.
