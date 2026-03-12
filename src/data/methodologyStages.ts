// Methodology stages per project type — auto-created when a project is created

export interface MethodologyStage {
  name: string;
  description: string;
  sort_order: number;
}

export const methodologyStages: Record<string, MethodologyStage[]> = {
  "Identidade Visual": [
    {
      name: "Fase 1 — Imersão Estratégica",
      description: "Reunião de Kick-off, questionário de identidade visual, análise de mercado/concorrência e definição de persona.",
      sort_order: 0,
    },
    {
      name: "Fase 2 — Conceituação e Direção Criativa",
      description: "Pesquisa de referências visuais, criação de 3-5 moodboards estratégicos e apresentação ao cliente.",
      sort_order: 1,
    },
    {
      name: "Fase 3 — Design e Desenvolvimento de Conceitos",
      description: "Esboços e iterações, desenvolvimento de 2-3 conceitos de identidade visual com mockups e apresentação.",
      sort_order: 2,
    },
    {
      name: "Fase 4 — Refinamento e Expansão do Sistema Visual",
      description: "Revisões estruturadas, sistema de cores completo, tipografia, elementos gráficos e diretrizes de uso.",
      sort_order: 3,
    },
    {
      name: "Fase 5 — Finalização e Entrega",
      description: "Manual de identidade visual, organização de arquivos-fonte e entrega final com reunião de fechamento.",
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
};
