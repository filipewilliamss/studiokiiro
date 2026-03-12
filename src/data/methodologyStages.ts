// Methodology stages per project type — auto-created when a project is created

export interface MethodologyStage {
  name: string;
  description: string;
  sort_order: number;
}

export const methodologyStages: Record<string, MethodologyStage[]> = {
  "Logotipo Essencial": [
    {
      name: "Fase 1 — Briefing e Direção Criativa",
      description: "Reunião de briefing, questionário de logotipo, pesquisa de concorrência visual, criação de 1-2 moodboards de direção e aprovação da direção criativa.",
      sort_order: 0,
    },
    {
      name: "Fase 2 — Criação e Desenvolvimento do Logotipo",
      description: "Esboços e exploração inicial, desenvolvimento digital de 2 propostas de logotipo com rationale, mockups de contextualização e apresentação ao cliente.",
      sort_order: 1,
    },
    {
      name: "Fase 3 — Refinamento e Ajustes",
      description: "Aplicação de feedback (1 rodada inclusa), refinamento técnico, criação de versões monocromáticas e validação de funcionalidade em diferentes tamanhos e fundos.",
      sort_order: 2,
    },
    {
      name: "Fase 4 — Finalização e Entrega",
      description: "Exportação completa dos arquivos (AI, EPS, SVG, PDF, PNG, JPG), criação do mini-guia de uso (1 página), organização da entrega e encerramento formal.",
      sort_order: 3,
    },
  ],
  "Identidade Visual": [
    {
      name: "Fase 1 — Imersão e Estratégia de Marca",
      description: "Reunião de kick-off estratégico, questionário de identidade visual, análise de concorrência visual, definição de persona e posicionamento.",
      sort_order: 0,
    },
    {
      name: "Fase 2 — Conceituação e Moodboards",
      description: "Pesquisa visual e coleta de referências, criação de 2-3 moodboards estratégicos com rationale e aprovação da direção visual.",
      sort_order: 1,
    },
    {
      name: "Fase 3 — Criação do Logotipo e Sistema Visual",
      description: "Esboços e exploração de conceitos, desenvolvimento de 2 propostas de logotipo, sistema de cores e tipografia preliminar e mockups de aplicação.",
      sort_order: 2,
    },
    {
      name: "Fase 4 — Refinamento e Expansão",
      description: "Refinamento do logotipo escolhido com todas as versões, sistema de cores completo documentado (HEX, RGB, CMYK, Pantone), sistema tipográfico e elementos gráficos de apoio.",
      sort_order: 3,
    },
    {
      name: "Fase 5 — Manual Enxuto e Entrega",
      description: "Diagramação do manual de identidade visual enxuto (15-25 páginas), exportação e organização dos arquivos, revisão técnica final e entrega formal.",
      sort_order: 4,
    },
  ],
  "Manual de Logotipo": [
    {
      name: "Fase 1 — Recebimento e Diagnóstico",
      description: "Reunião de briefing, recebimento e catalogação de materiais, diagnóstico técnico dos arquivos e definição das páginas do manual.",
      sort_order: 0,
    },
    {
      name: "Fase 2 — Reconstrução e Organização dos Arquivos",
      description: "Reconstrução/organização do logotipo, criação de variações e versões monocromáticas, documentação técnica de cores e tipografia.",
      sort_order: 1,
    },
    {
      name: "Fase 3 — Desenvolvimento do Manual",
      description: "Diagramação completa do manual (12-20 páginas): capa, apresentação do logotipo, versões, área de proteção, paleta de cores, tipografia e aplicações.",
      sort_order: 2,
    },
    {
      name: "Fase 4 — Revisão e Entrega",
      description: "Aplicação de feedback, revisão técnica final, organização do pacote de entrega com documento 'Leia-me' e entrega formal.",
      sort_order: 3,
    },
  ],
  "Design para Mídias Sociais": [
    {
      name: "Fase 1 — Briefing e Estratégia Visual",
      description: "Reunião de briefing visual, levantamento e análise da identidade visual, definição do guia de estilo para redes sociais e aprovação da lista de peças.",
      sort_order: 0,
    },
    {
      name: "Fase 2 — Criação de Templates e Layout de Feed",
      description: "Desenvolvimento dos templates base por tipo de peça, checklist de qualidade, criação do mockup de layout de feed (9-12 posts) e aprovação dos templates.",
      sort_order: 1,
    },
    {
      name: "Fase 3 — Produção das Peças",
      description: "Produção em blocos por tipo de peça (posts, carrosséis, stories), adaptação criativa dos templates, revisão interna de qualidade e organização para revisão do cliente.",
      sort_order: 2,
    },
    {
      name: "Fase 4 — Revisão e Entrega",
      description: "Aplicação de feedback (1 rodada inclusa), exportação nos formatos corretos por plataforma, organização da estrutura de entrega e encerramento formal.",
      sort_order: 3,
    },
  ],
  "Edição de Vídeo": [
    {
      name: "Fase 1 — Briefing e Roteiro Visual",
      description: "Reunião de briefing de vídeo, checklist do material bruto, estruturação do roteiro/script de edição e pesquisa de referências de trilha e estilo.",
      sort_order: 0,
    },
    {
      name: "Fase 2 — Edição Bruta e Montagem (Rough Cut)",
      description: "Organização do projeto no software de edição, montagem do rough cut com seleção de takes e trilha provisória, ajuste de pacing e apresentação ao cliente.",
      sort_order: 1,
    },
    {
      name: "Fase 3 — Refinamento e Efeitos (Fine Cut)",
      description: "Edição de detalhe e transições, color grading em duas etapas, mixagem de áudio profissional e inclusão de gráficos, legendas e elementos visuais da marca.",
      sort_order: 2,
    },
    {
      name: "Fase 4 — Revisão e Exportação Final",
      description: "Aplicação de feedback final (1 rodada inclusa), revisão técnica completa, exportação otimizada por plataforma e entrega organizada.",
      sort_order: 3,
    },
  ],
  "Sites e Landing Pages": [
    {
      name: "Fase 1 — Briefing e Estratégia Digital",
      description: "Reunião de briefing digital, análise de referências e concorrência, definição da arquitetura de informação (sitemap) e levantamento de conteúdos necessários.",
      sort_order: 0,
    },
    {
      name: "Fase 2 — Design e Prototipagem Visual",
      description: "Desenvolvimento do design de todas as seções, hierarquia visual e estratégia de conversão, adaptação para mobile/responsividade e aprovação do protótipo.",
      sort_order: 1,
    },
    {
      name: "Fase 3 — Desenvolvimento e Construção",
      description: "Construção das seções com fidelidade ao design, configuração de responsividade, integração de formulários e funcionalidades, otimização de performance e SEO básico.",
      sort_order: 2,
    },
    {
      name: "Fase 4 — Revisão e Ajustes",
      description: "Aplicação de feedback (1 rodada inclusa), testes cross-browser e cross-device, revisão final de conteúdo e qualidade, aprovação para publicação.",
      sort_order: 3,
    },
    {
      name: "Fase 5 — Publicação e Entrega",
      description: "Publicação no domínio do cliente, testes finais em produção, documento de acesso e orientações de gestão e entrega formal com encerramento.",
      sort_order: 4,
    },
  ],
};
