// Full methodology content for each service, structured to match the PDF document layout

export interface MethodologyPhase {
  title: string;
  subtitle: string;
  objective: string;
  deliverables: string[];
  steps: { title: string; description: string }[];
}

export interface MethodologyScheduleDay {
  day: string;
  tasks: string[];
  aiTips?: string[];
  note?: string;
}

export interface MethodologySchedulePhase {
  title: string;
  realDeadline: string;
  clientDeadline: string;
  days: MethodologyScheduleDay[];
}

export interface MethodologyContent {
  serviceKey: string;
  title: string;
  subtitle: string;
  date: string;
  introduction: string;
  principles: { title: string; description: string }[];
  phases: MethodologyPhase[];
  schedule: MethodologySchedulePhase[];
  totalDeadline?: { real: string; client: string };
}

export const methodologyContent: Record<string, MethodologyContent> = {
  "Identidade Visual": {
    serviceKey: "Identidade Visual",
    title: "Criação de Identidade Visual",
    subtitle: "Transformando Visão em Identidade Tangível e Estratégica",
    date: "Fevereiro, 2026",
    introduction:
      "Nossa metodologia para a criação de identidade visual foi cuidadosamente desenvolvida para transcender a mera estética, focando na estratégia de negócio e na conexão emocional com seu público. Acreditamos que uma marca de alto desempenho é construída sobre um alicerce sólido de pesquisa, propósito e comunicação visual coerente.",
    principles: [
      { title: "Foco Estratégico", description: "Todo design serve a um propósito de negócio." },
      { title: "Transparência", description: 'O cliente entende o "porquê" de cada etapa.' },
      { title: "Colaboração Dirigida", description: "O cliente é parte ativa, mas você lidera o processo especializado." },
      { title: "Entrega de Valor", description: "Não apenas um produto bonito, mas uma solução eficaz e duradoura." },
      { title: "Iteração Otimizada", description: "Revisões focadas e com propósito claro, maximizando a eficiência." },
    ],
    phases: [
      {
        title: "Fase 1: Imersão Estratégica (Discovery Profundo)",
        subtitle: "O Alicerce da Marca",
        objective: "Compreender o cerne do negócio, o mercado e as ambições do cliente. É aqui que construímos o alicerce estratégico.",
        deliverables: ["Briefing Estratégico Detalhado", "Análise SWOT (Forças, Fraquezas, Oportunidades, Ameaças)", "Análise de Concorrência Visual"],
        steps: [
          { title: "Reunião de Kick-off", description: "Entender profundamente a visão, desafios, objetivos e o que o sucesso significa para a marca do cliente." },
          { title: "Questionário de Identidade Visual", description: "Aplicação de um questionário provocativo que explora valores, público-alvo, distinções e emoções que a marca deve evocar." },
          { title: "Análise de Mercado e Concorrência", description: "Investigação aprofundada das tendências do setor, posicionamento dos concorrentes e identificação de lacunas e oportunidades visuais." },
          { title: "Definição da Persona/Target", description: "Quem é o cliente ideal? Quais são seus valores, necessidades e gatilhos emocionais?" },
        ],
      },
      {
        title: "Fase 2: Conceituação e Direção Criativa",
        subtitle: "Traduzindo a Estratégia em Visão",
        objective: "Traduzir os insights estratégicos em direções visuais coerentes e distintamente alinhadas ao propósito da marca.",
        deliverables: ["3-5 Moodboards Estratégicos", "Definição de Territórios Visuais"],
        steps: [
          { title: "Pesquisa de Imagem e Referências", description: "Coleta de inspirações visuais (cores, formas, tipografias, texturas) que ressoem com a estratégia definida." },
          { title: "Criação de Moodboards Conceituais", description: 'Desenvolvimento de painéis visuais. Cada moodboard representa uma "personalidade" ou "território visual" distinto para a marca, com uma breve justificativa estratégica.' },
          { title: "Apresentação e Discussão dos Moodboards", description: "Apresentação para o cliente, explicando a estratégia por trás de cada direção e direcionamento para a escolha de (uma ou duas) direções preferidas, focando em alinhamento estratégico, não em gosto pessoal." },
        ],
      },
      {
        title: "Fase 3: Design e Desenvolvimento de Conceitos",
        subtitle: "Dando Forma à Sua Identidade",
        objective: "Desenvolver as propostas de logotipos e os pilares visuais com base nas direções criativas aprovadas.",
        deliverables: ["Apresentação de 2-3 Conceitos de Identidade Visual", "Rationale Detalhado para Cada Conceito", "Mockups de Aplicações Básicas"],
        steps: [
          { title: "Esboços e Iterações Iniciais", description: "Exploração de formas, tipografias e símbolos, tanto digitalmente quanto analogicamente." },
          { title: "Desenvolvimento Detalhado dos Conceitos", description: "Criação de 2-3 propostas de logotipos robustas, com suas variações e sistemas gráficos iniciais (paleta de cores primária, tipografia principal)." },
          { title: "Criação de Mockups de Contexto", description: "Aplicação dos conceitos em itens básicos (cartão de visita, site, perfil de rede social) para o cliente visualizar em uso real e tangível." },
          { title: "Apresentação dos Conceitos", description: "Demonstração dos conceitos ao cliente, explicando o racional por trás de cada escolha, a conexão com a estratégia e como cada conceito aborda os desafios iniciais." },
        ],
      },
      {
        title: "Fase 4: Refinamento e Expansão do Sistema Visual",
        subtitle: "Construindo a Coerência da Marca",
        objective: "Aperfeiçoar o conceito escolhido e expandi-lo para um sistema visual completo, garantindo consistência e versatilidade.",
        deliverables: ["Identidade Visual Finalizada e Aprovada", "Progressão do Manual de Marca"],
        steps: [
          { title: "Revisões Estruturadas", description: "Aplicação do feedback do cliente (dentro do número de rodadas acordado), sempre com justificativa para as mudanças e, quando necessário, defendendo as escolhas para manter a integridade do projeto." },
          { title: "Desenvolvimento do Sistema de Cores", description: "Definição da paleta completa (primárias, secundárias, neutras, P&B; CMYK, RGB, HEX, Pantone)." },
          { title: "Definição do Sistema Tipográfico", description: "Escolha das fontes para títulos, corpo de texto e hierarquia visual completa." },
          { title: "Desenvolvimento de Elementos Gráficos", description: "Criação de padrões, ícones, ilustrações ou texturas que complementam e enriquecem a identidade visual." },
          { title: "Criação de Diretrizes de Uso", description: "Definição clara de como aplicar o logo, proporções, área de segurança e usos proibidos para manter a integridade da marca." },
        ],
      },
      {
        title: "Fase 5: Finalização e Entrega",
        subtitle: "A Materialização do Seu Valor",
        objective: "Entregar todos os arquivos essenciais e o manual de identidade de forma organizada, completa e profissional.",
        deliverables: ["Manual de Identidade Visual Completo", "Pasta Organizada de Arquivos-Fonte (Ai, Eps, Svg, Png, Jpg, Pdf)"],
        steps: [
          { title: "Elaboração do Manual de Identidade Visual", description: "Organização de todas as diretrizes da marca em um documento abrangente, esteticamente diagramado e de fácil consulta." },
          { title: "Preparação e Organização dos Arquivos", description: "Exportação do logotipo e demais elementos em todos os formatos necessários e resoluções adequadas para web e impressão." },
          { title: "Entrega Final", description: "Compartilhamento seguro dos arquivos via plataforma de nuvem ou link dedicado, acompanhado de uma explicação detalhada sobre como acessar e usar os materiais." },
          { title: "Reunião de Fechamento (Opcional)", description: "Para tirar dúvidas sobre o manual de marca e garantir que o cliente se sinta totalmente capacitado a aplicar a nova identidade de forma consistente." },
        ],
      },
    ],
    schedule: [
      {
        title: "Fase 1: Imersão Estratégica",
        realDeadline: "3-4 dias úteis",
        clientDeadline: "4-5 dias úteis",
        days: [
          { day: "Dia 1 (2h dedicadas)", tasks: ["Reunião de Kick-off (1h) + Envio do questionário"], note: "Se cliente não respondeu, prazo pausado aqui" },
          { day: "Dia 2 (1h dedicada)", tasks: ["Aguardando questionário + início da pesquisa de mercado"] },
          { day: "Dia 3 (2h dedicadas)", tasks: ["Análise de concorrência visual + definição de persona"] },
          { day: "Dia 4 (1h dedicada)", tasks: ["Compilação do briefing estratégico + SWOT", "Envio do briefing compilado para validação do cliente"], aiTips: ["ChatGPT/Claude para análise de mercado", "Perplexity para pesquisa de concorrentes", "Midjourney para primeiros testes de referências visuais"] },
        ],
      },
      {
        title: "Fase 2: Conceituação e Direção Criativa",
        realDeadline: "4-5 dias úteis",
        clientDeadline: "5-6 dias úteis",
        days: [
          { day: "Dia 5 (2h dedicadas)", tasks: ["Pesquisa visual aprofundada + coleta de referências", "Pinterest, Behance, Are.na, Typewolf"] },
          { day: "Dia 6 (2h dedicadas)", tasks: ["Criação dos moodboards (use IA para acelerar)", "Midjourney para geração de atmosferas visuais + curadoria humana estratégica"] },
          { day: "Dia 7 (1h dedicada)", tasks: ["Refinamento e estratégia dos moodboards", "Cada moodboard deve ter 1 parágrafo de rationale"] },
          { day: "Dia 8 (1h dedicada)", tasks: ["Preparação da apresentação", "Agendamento da reunião de apresentação"] },
          { day: "Dia 9", tasks: ["Reunião de apresentação dos moodboards (45min-1h)"], note: "Prazo pausado aguardando direção aprovada: 48h", aiTips: ["Midjourney para atmosferas e referências visuais", "ChatGPT para ajudar a escrever os rationales dos moodboards"] },
        ],
      },
      {
        title: "Fase 3: Design e Desenvolvimento de Conceitos",
        realDeadline: "6-8 dias úteis",
        clientDeadline: "8-10 dias úteis",
        days: [
          { day: "Dia 10 (2h dedicadas)", tasks: ["Esboços analógicos/digitais rápidos", "Mínimo 20 thumbnails de conceito (quantidade gera qualidade)"] },
          { day: "Dia 11-12 (2-3h dedicadas/dia)", tasks: ["Desenvolvimento digital do Conceito A", "Tipografia + símbolo + composição + variações básicas"] },
          { day: "Dia 13 (2-3h dedicadas)", tasks: ["Desenvolvimento digital do Conceito B", "Direção visual distinta do Conceito A"] },
          { day: "Dia 14 (1-2h dedicadas)", tasks: ["Criação dos mockups de contexto", "Cartão de visita, perfil digital, papelaria básica"] },
          { day: "Dia 15 (2h dedicadas)", tasks: ["Preparação da apresentação com storytelling", "Cada conceito = problema + solução + emoção + aplicação"] },
          { day: "Dia 16", tasks: ["Apresentação para o cliente (1-1h30)"], note: "Prazo pausado aguardando escolha: 48-72h", aiTips: ["Midjourney para explorar formas e símbolos", "Adobe Firefly para variações rápidas de conceito", "ChatGPT para construir o storytelling da apresentação"] },
        ],
      },
      {
        title: "Fase 4: Refinamento e Expansão do Sistema Visual",
        realDeadline: "5-7 dias úteis",
        clientDeadline: "6-8 dias úteis",
        days: [
          { day: "Dia 17 (2h dedicadas)", tasks: ["Aplicação do feedback + refinamento do logotipo escolhido", "Ajustes de forma, peso, espaçamento, proporção"] },
          { day: "Dia 18 (2h dedicadas)", tasks: ["Desenvolvimento do sistema de cores completo", "CMYK + RGB + HEX + Pantone (se aplicável)", "Teste de acessibilidade (contraste WCAG)"] },
          { day: "Dia 19 (1-2h dedicadas)", tasks: ["Sistema tipográfico completo", "Primária + Secundária + hierarquia + espaçamento"] },
          { day: "Dia 20 (2h dedicadas)", tasks: ["Elementos gráficos de apoio", "Padrões, ícones, texturas, formas complementares"] },
          { day: "Dia 21 (1h dedicada)", tasks: ["Diretrizes de uso (certos e errados)", "1ª Rodada de revisão enviada ao cliente"], note: "Aguardando feedback: 48h" },
          { day: "Dia 22 (1-2h dedicadas)", tasks: ["Aplicação da 2ª rodada de revisão (se necessário)", "Aprovação final do sistema visual"], note: "LIMITE: 2 rodadas de revisão inclusas. Rodadas adicionais = custo extra." },
        ],
      },
      {
        title: "Fase 5: Finalização e Entrega",
        realDeadline: "3-4 dias úteis",
        clientDeadline: "4-5 dias úteis",
        days: [
          { day: "Dia 23 (3h dedicadas)", tasks: ["Diagramação do Manual de Identidade Visual", "Conteúdo: logotipo, cores, tipografia, elementos, aplicações, usos corretos e incorretos"] },
          { day: "Dia 24 (2h dedicadas)", tasks: ["Exportação e organização de todos os arquivos", "AI + EPS + SVG + PDF + PNG (fundo transparente) + JPG", "Estrutura de pastas organizada e nomeada"] },
          { day: "Dia 25 (1h dedicada)", tasks: ["Checklist de qualidade final"] },
          { day: "Dia 26 (1h dedicada)", tasks: ["Entrega formal + email de encaminhamento profissional", "Agendamento da reunião de fechamento (30-45min)", "Solicitação de depoimento/avaliação do cliente"] },
        ],
      },
    ],
    totalDeadline: { real: "21-27 dias úteis", client: "26-34 dias úteis" },
  },

  "Logotipo Essencial": {
    serviceKey: "Logotipo Essencial",
    title: "Criação de Logotipo Essencial",
    subtitle: "Uma Marca Única com Essência e Propósito",
    date: "Março, 2026",
    introduction:
      "O serviço de Logotipo Essencial do Studio Kiiro entrega um logotipo profissional, estratégico e com identidade própria, sem a complexidade de um sistema visual completo. É ideal para negócios que precisam de uma marca forte e memorável com agilidade e objetividade.",
    principles: [
      { title: "Objetividade Criativa", description: "Foco na entrega de um logotipo impactante e funcional." },
      { title: "Estratégia Condensada", description: "Briefing e pesquisa direcionados ao essencial." },
      { title: "Qualidade Sem Excesso", description: "Menos etapas, mesma excelência técnica." },
      { title: "Entrega Ágil", description: "Prazos otimizados sem comprometer a qualidade." },
    ],
    phases: [
      {
        title: "Fase 1: Briefing e Direção Criativa",
        subtitle: "Entendendo o Essencial da Sua Marca",
        objective: "Captar a essência do negócio, suas ambições visuais e o direcionamento para o logotipo.",
        deliverables: ["Briefing de Logotipo Preenchido", "Pesquisa de Concorrência Visual", "1-2 Moodboards de Direção"],
        steps: [
          { title: "Reunião de Briefing", description: "Sessão objetiva para entender o negócio, público-alvo, valores e expectativas visuais do cliente." },
          { title: "Questionário de Logotipo", description: "Formulário direcionado explorando preferências estéticas, referências e restrições." },
          { title: "Pesquisa de Concorrência Visual", description: "Análise rápida dos concorrentes diretos para identificar padrões e oportunidades de diferenciação." },
          { title: "Criação de Moodboards", description: "Desenvolvimento de 1-2 painéis visuais com direção estética, paleta de cores e referências tipográficas para aprovação." },
        ],
      },
      {
        title: "Fase 2: Criação e Desenvolvimento do Logotipo",
        subtitle: "Dando Vida à Sua Marca",
        objective: "Desenvolver propostas de logotipo profissionais e estrategicamente embasadas.",
        deliverables: ["2 Propostas de Logotipo com Rationale", "Mockups de Contextualização"],
        steps: [
          { title: "Esboços e Exploração", description: "Geração de múltiplos thumbnails e direções visuais no papel e digitalmente." },
          { title: "Desenvolvimento Digital", description: "Criação de 2 propostas de logotipo completas no Illustrator, com variações de composição." },
          { title: "Mockups de Contexto", description: "Aplicação dos logotipos em cenários reais (cartão de visita, perfil digital, fachada) para visualização." },
          { title: "Apresentação ao Cliente", description: "Demonstração das propostas com storytelling e justificativa de cada escolha criativa." },
        ],
      },
      {
        title: "Fase 3: Refinamento e Ajustes",
        subtitle: "Polindo a Sua Marca",
        objective: "Refinar o logotipo escolhido até a versão final aprovada, garantindo perfeição técnica.",
        deliverables: ["Logotipo Refinado e Aprovado", "Versões Monocromáticas"],
        steps: [
          { title: "Aplicação de Feedback", description: "1 rodada de revisão inclusa, com ajustes direcionados de forma, cor, tipografia e proporção." },
          { title: "Refinamento Técnico", description: "Ajustes finos de kerning, espaçamento, pesos e equilíbrio visual do logotipo." },
          { title: "Criação de Versões", description: "Versões monocromáticas (preto e branco), negativo e versão reduzida para aplicações pequenas." },
          { title: "Validação", description: "Teste de funcionalidade em diferentes tamanhos, fundos e contextos de aplicação." },
        ],
      },
      {
        title: "Fase 4: Finalização e Entrega",
        subtitle: "Sua Marca Pronta para o Mundo",
        objective: "Entregar todos os arquivos organizados e prontos para uso imediato.",
        deliverables: ["Arquivos Completos (AI, EPS, SVG, PDF, PNG, JPG)", "Mini-guia de Uso (1 página)"],
        steps: [
          { title: "Exportação Completa", description: "Logotipo em todos os formatos necessários para web e impressão, com resoluções adequadas." },
          { title: "Mini-guia de Uso", description: "Documento de 1 página com orientações básicas de aplicação: cores, versões permitidas e área de proteção." },
          { title: "Organização da Entrega", description: "Pasta estruturada e nomeada profissionalmente para fácil acesso do cliente." },
          { title: "Encerramento Formal", description: "Email de entrega com orientações e solicitação de depoimento." },
        ],
      },
    ],
    schedule: [
      {
        title: "Fase 1: Briefing e Direção Criativa",
        realDeadline: "2-3 dias úteis",
        clientDeadline: "3-4 dias úteis",
        days: [
          { day: "Dia 1 (2h dedicadas)", tasks: ["Reunião de briefing (45min-1h) + envio do questionário"] },
          { day: "Dia 2 (1-2h dedicadas)", tasks: ["Pesquisa de concorrência visual", "Criação dos moodboards de direção"] },
          { day: "Dia 3 (1h dedicada)", tasks: ["Apresentação dos moodboards ao cliente"], note: "Prazo pausado aguardando aprovação: 24-48h", aiTips: ["Midjourney para referências visuais", "Perplexity para pesquisa de concorrentes"] },
        ],
      },
      {
        title: "Fase 2: Criação e Desenvolvimento",
        realDeadline: "3-4 dias úteis",
        clientDeadline: "4-5 dias úteis",
        days: [
          { day: "Dia 4 (2h dedicadas)", tasks: ["Esboços e exploração inicial", "Mínimo 15 thumbnails de conceito"] },
          { day: "Dia 5-6 (2h dedicadas/dia)", tasks: ["Desenvolvimento digital das 2 propostas de logotipo"] },
          { day: "Dia 7 (1-2h dedicadas)", tasks: ["Criação dos mockups + preparação da apresentação", "Apresentação ao cliente"], note: "Prazo pausado aguardando escolha: 48h", aiTips: ["Midjourney para explorar formas", "ChatGPT para storytelling da apresentação"] },
        ],
      },
      {
        title: "Fase 3: Refinamento e Ajustes",
        realDeadline: "2-3 dias úteis",
        clientDeadline: "3-4 dias úteis",
        days: [
          { day: "Dia 8 (2h dedicadas)", tasks: ["Aplicação do feedback + refinamento do logotipo escolhido"] },
          { day: "Dia 9 (1h dedicada)", tasks: ["Criação das versões monocromáticas e variações", "Testes de funcionalidade em diferentes tamanhos e fundos"] },
          { day: "Dia 10 (1h dedicada)", tasks: ["Envio para aprovação final do cliente"], note: "Aguardando aprovação: 24h" },
        ],
      },
      {
        title: "Fase 4: Finalização e Entrega",
        realDeadline: "1-2 dias úteis",
        clientDeadline: "2-3 dias úteis",
        days: [
          { day: "Dia 11 (2h dedicadas)", tasks: ["Exportação completa de arquivos", "Mini-guia de uso (1 página)", "Organização da pasta de entrega"] },
          { day: "Dia 12 (1h dedicada)", tasks: ["Entrega formal + email profissional", "Solicitação de depoimento"] },
        ],
      },
    ],
    totalDeadline: { real: "8-12 dias úteis", client: "12-16 dias úteis" },
  },

  "Branding Completo": {
    serviceKey: "Branding Completo",
    title: "Branding Completo",
    subtitle: "Construindo uma Marca com Propósito, Personalidade e Presença",
    date: "Março, 2026",
    introduction:
      "O Branding Completo do Studio Kiiro é o serviço mais abrangente que oferecemos. Vai além da identidade visual para construir um posicionamento estratégico sólido, uma personalidade de marca bem definida e um sistema visual completo e versátil, com manual de marca extenso e aplicações em múltiplos pontos de contato.",
    principles: [
      { title: "Profundidade Estratégica", description: "Imersão completa no universo do negócio antes de qualquer criação visual." },
      { title: "Coerência Sistêmica", description: "Cada elemento visual, verbal e comportamental reforça a mesma mensagem." },
      { title: "Versatilidade", description: "O sistema deve funcionar em qualquer contexto, formato ou plataforma." },
      { title: "Longevidade", description: "Uma marca construída para durar, não para seguir tendências passageiras." },
      { title: "Documentação Completa", description: "Manual de marca extenso para garantir consistência por qualquer pessoa que aplique a marca." },
    ],
    phases: [
      {
        title: "Fase 1: Imersão Estratégica e Posicionamento",
        subtitle: "O DNA da Marca",
        objective: "Mergulhar no universo do negócio para definir posicionamento, personalidade, arquétipos e território de marca com clareza absoluta.",
        deliverables: ["Documento de Posicionamento Estratégico", "Arquétipo de Marca Definido", "Análise de Mercado e Concorrência Completa", "Definição de Personas Detalhadas"],
        steps: [
          { title: "Sessão de Imersão Profunda", description: "Workshop de 2-3h com o cliente para explorar visão, missão, valores, diferenciais, público-alvo, concorrentes e aspirações da marca." },
          { title: "Análise de Mercado e Concorrência", description: "Pesquisa completa do setor, tendências, posicionamento dos concorrentes e mapeamento de oportunidades." },
          { title: "Definição de Arquétipos", description: "Identificação do arquétipo dominante e secundário da marca para guiar personalidade e tom." },
          { title: "Posicionamento Estratégico", description: "Definição clara do posicionamento da marca no mercado, proposta de valor e diferenciais competitivos." },
        ],
      },
      {
        title: "Fase 2: Conceituação e Direção Criativa",
        subtitle: "Traduzindo Estratégia em Universo Visual",
        objective: "Criar direções visuais ricas e embasadas na estratégia para definir o território estético da marca.",
        deliverables: ["3 Moodboards Estratégicos com Rationale", "Definição de Território Visual", "Direção Verbal Preliminar (Tom de Voz)"],
        steps: [
          { title: "Pesquisa Visual Aprofundada", description: "Curadoria extensiva de referências visuais, tipográficas, cromáticas e texturais alinhadas à estratégia." },
          { title: "Criação de 3 Moodboards", description: "Painéis visuais distintos, cada um representando um universo estético completo para a marca." },
          { title: "Definição de Tom de Voz", description: "Direcionamento verbal que complementa a identidade visual: como a marca fala, escreve e se comunica." },
          { title: "Apresentação e Aprovação", description: "Sessão de apresentação com justificativa estratégica de cada direção para aprovação." },
        ],
      },
      {
        title: "Fase 3: Criação do Logotipo e Sistema Visual",
        subtitle: "Dando Forma ao Universo da Marca",
        objective: "Desenvolver o logotipo e os pilares do sistema visual com profundidade e versatilidade.",
        deliverables: ["3 Propostas de Logotipo com Rationale", "Sistema de Cores Completo", "Tipografia Definida", "Elementos Gráficos de Apoio"],
        steps: [
          { title: "Exploração Extensiva", description: "Esboços aprofundados testando múltiplas abordagens visuais para o logotipo." },
          { title: "Desenvolvimento de 3 Propostas", description: "Três conceitos de logotipo completos com variações, sistema de cores e tipografia." },
          { title: "Elementos Gráficos", description: "Criação de padrões, texturas, ícones e formas complementares que ampliam o sistema visual." },
          { title: "Mockups Extensivos", description: "Aplicação em múltiplos pontos de contato para visualização completa." },
        ],
      },
      {
        title: "Fase 4: Refinamento e Expansão do Sistema",
        subtitle: "Blindando a Consistência da Marca",
        objective: "Refinar e expandir o sistema visual para cobrir todos os pontos de contato necessários.",
        deliverables: ["Sistema Visual Finalizado", "Papelaria Completa", "Aplicações em Materiais Diversos"],
        steps: [
          { title: "Refinamento do Logotipo", description: "Ajustes finos com base no feedback do cliente, mantendo a integridade do conceito." },
          { title: "Papelaria Completa", description: "Design de cartão de visita, papel timbrado, envelope, assinatura de e-mail e materiais corporativos." },
          { title: "Aplicações Digitais", description: "Templates para redes sociais, apresentações e materiais digitais." },
          { title: "Mockups Profissionais", description: "Visualização realista em fachada, uniformes, embalagens e demais aplicações relevantes." },
        ],
      },
      {
        title: "Fase 5: Manual de Marca Completo",
        subtitle: "O Guia Definitivo da Sua Marca",
        objective: "Documentar todo o sistema visual e verbal em um manual de marca completo e profissional.",
        deliverables: ["Manual de Marca (40-60 páginas)", "Diretrizes Detalhadas de Uso"],
        steps: [
          { title: "Diagramação do Manual", description: "Organização completa de todas as diretrizes em um documento esteticamente impecável de 40-60 páginas." },
          { title: "Diretrizes de Uso Detalhadas", description: "Regras claras de aplicação do logotipo, cores, tipografia, elementos e usos proibidos." },
          { title: "Tom de Voz e Comunicação", description: "Documentação do tom de voz da marca, exemplos de uso em diferentes contextos." },
          { title: "Revisão e Aprovação", description: "Revisão completa do manual com o cliente antes da finalização." },
        ],
      },
      {
        title: "Fase 6: Entrega e Alinhamento Final",
        subtitle: "Ativando a Nova Marca",
        objective: "Entregar todo o material organizado e capacitar o cliente para aplicar a marca com confiança.",
        deliverables: ["Pasta Completa de Arquivos", "Reunião de Apresentação do Manual", "Orientações de Gestão da Marca"],
        steps: [
          { title: "Exportação e Organização", description: "Todos os arquivos em formatos profissionais, organizados em estrutura de pastas padronizada." },
          { title: "Reunião de Apresentação", description: "Sessão de apresentação do manual completo ao cliente e sua equipe." },
          { title: "Orientações de Gestão", description: "Recomendações práticas de como manter a consistência da marca no dia a dia." },
          { title: "Encerramento Formal", description: "Email de entrega profissional com todos os materiais e solicitação de depoimento." },
        ],
      },
    ],
    schedule: [
      {
        title: "Fase 1: Imersão Estratégica",
        realDeadline: "4-5 dias úteis",
        clientDeadline: "5-7 dias úteis",
        days: [
          { day: "Dia 1-2 (3h dedicadas)", tasks: ["Workshop de imersão com o cliente (2-3h)", "Envio de questionários complementares"] },
          { day: "Dia 3-4 (2h dedicadas/dia)", tasks: ["Pesquisa de mercado e concorrência completa", "Definição de arquétipos e persona"] },
          { day: "Dia 5 (2h dedicadas)", tasks: ["Compilação do documento de posicionamento", "Envio para validação"], note: "Prazo pausado aguardando validação: 48h" },
        ],
      },
      {
        title: "Fase 2: Conceituação e Direção Criativa",
        realDeadline: "4-5 dias úteis",
        clientDeadline: "5-7 dias úteis",
        days: [
          { day: "Dia 6-7 (3h dedicadas/dia)", tasks: ["Pesquisa visual aprofundada", "Criação dos 3 moodboards estratégicos"] },
          { day: "Dia 8 (2h dedicadas)", tasks: ["Definição de tom de voz preliminar", "Refinamento dos moodboards"] },
          { day: "Dia 9 (1h dedicada)", tasks: ["Apresentação ao cliente"], note: "Prazo pausado aguardando aprovação: 48h" },
        ],
      },
      {
        title: "Fase 3: Criação do Logotipo e Sistema Visual",
        realDeadline: "7-9 dias úteis",
        clientDeadline: "9-12 dias úteis",
        days: [
          { day: "Dia 10-11 (2h dedicadas/dia)", tasks: ["Exploração extensiva de conceitos", "Mínimo 25 thumbnails"] },
          { day: "Dia 12-14 (2-3h dedicadas/dia)", tasks: ["Desenvolvimento digital das 3 propostas", "Sistema de cores e tipografia para cada conceito"] },
          { day: "Dia 15-16 (2h dedicadas/dia)", tasks: ["Elementos gráficos de apoio", "Mockups extensivos"] },
          { day: "Dia 17 (2h dedicadas)", tasks: ["Apresentação ao cliente"], note: "Prazo pausado aguardando escolha: 48-72h" },
        ],
      },
      {
        title: "Fase 4: Refinamento e Expansão",
        realDeadline: "5-7 dias úteis",
        clientDeadline: "7-9 dias úteis",
        days: [
          { day: "Dia 18-19 (2h dedicadas/dia)", tasks: ["Refinamento do logotipo escolhido", "Expansão do sistema de cores e tipografia"] },
          { day: "Dia 20-21 (2-3h dedicadas/dia)", tasks: ["Papelaria completa", "Aplicações digitais"] },
          { day: "Dia 22 (2h dedicadas)", tasks: ["Mockups profissionais + envio para revisão"], note: "Aguardando feedback: 48h" },
        ],
      },
      {
        title: "Fase 5: Manual de Marca Completo",
        realDeadline: "5-6 dias úteis",
        clientDeadline: "6-8 dias úteis",
        days: [
          { day: "Dia 23-26 (3h dedicadas/dia)", tasks: ["Diagramação do manual de marca completo (40-60 páginas)"] },
          { day: "Dia 27 (2h dedicadas)", tasks: ["Revisão interna e envio para aprovação do cliente"], note: "Aguardando aprovação: 48h" },
        ],
      },
      {
        title: "Fase 6: Entrega e Alinhamento Final",
        realDeadline: "2-3 dias úteis",
        clientDeadline: "3-4 dias úteis",
        days: [
          { day: "Dia 28 (2h dedicadas)", tasks: ["Exportação e organização de todos os arquivos"] },
          { day: "Dia 29 (1-2h dedicadas)", tasks: ["Reunião de apresentação do manual (1h)", "Orientações de gestão da marca"] },
          { day: "Dia 30 (1h dedicada)", tasks: ["Entrega formal + email profissional", "Solicitação de depoimento"] },
        ],
      },
    ],
    totalDeadline: { real: "27-35 dias úteis", client: "35-47 dias úteis" },
  },

  "Manual de Logotipo": {
    serviceKey: "Manual de Logotipo",
    title: "Manual de Logotipo",
    subtitle: "Documentando e Protegendo a Sua Marca",
    date: "Março, 2026",
    introduction:
      "O Manual de Logotipo é um serviço focado em documentar profissionalmente um logotipo já existente. Ideal para clientes que já possuem um logotipo mas não têm um manual de uso organizado, com diretrizes claras de aplicação, versões e especificações técnicas.",
    principles: [
      { title: "Organização Técnica", description: "Documentar cada aspecto do logotipo com precisão profissional." },
      { title: "Preservação da Marca", description: "Garantir que o logotipo será aplicado corretamente em qualquer contexto." },
      { title: "Clareza de Uso", description: "Diretrizes simples e diretas que qualquer pessoa pode seguir." },
      { title: "Completude", description: "Todos os formatos, versões e especificações necessárias em um único documento." },
    ],
    phases: [
      {
        title: "Fase 1: Recebimento e Diagnóstico",
        subtitle: "Entendendo o Material Existente",
        objective: "Receber, catalogar e diagnosticar tecnicamente todos os materiais existentes do logotipo.",
        deliverables: ["Briefing de Manual Preenchido", "Diagnóstico Técnico dos Arquivos", "Definição das Páginas do Manual"],
        steps: [
          { title: "Reunião de Briefing", description: "Sessão para entender a história do logotipo, como é usado atualmente e quais são as necessidades do manual." },
          { title: "Recebimento de Materiais", description: "Catalogação de todos os arquivos existentes do logotipo e materiais de marca." },
          { title: "Diagnóstico Técnico", description: "Avaliação da qualidade dos arquivos, formatos disponíveis e necessidade de reconstrução vetorial." },
          { title: "Definição do Escopo", description: "Planejamento das páginas e seções que o manual conterá." },
        ],
      },
      {
        title: "Fase 2: Reconstrução e Organização dos Arquivos",
        subtitle: "Preparando a Base Técnica",
        objective: "Reconstruir ou organizar os arquivos do logotipo para garantir qualidade profissional em todas as aplicações.",
        deliverables: ["Logotipo Vetorizado e Organizado", "Todas as Versões e Variações", "Documentação Técnica de Cores e Tipografia"],
        steps: [
          { title: "Reconstrução Vetorial", description: "Se necessário, reconstrução do logotipo em formato vetorial com precisão técnica." },
          { title: "Criação de Variações", description: "Desenvolvimento de versões monocromáticas, negativo, reduzida e demais variações necessárias." },
          { title: "Documentação de Cores", description: "Especificação completa das cores em CMYK, RGB, HEX e Pantone." },
          { title: "Documentação Tipográfica", description: "Identificação e documentação das fontes utilizadas no logotipo." },
        ],
      },
      {
        title: "Fase 3: Desenvolvimento do Manual",
        subtitle: "Construindo o Documento de Referência",
        objective: "Diagramar o manual completo com todas as diretrizes de uso do logotipo.",
        deliverables: ["Manual de Logotipo Completo (12-20 páginas)"],
        steps: [
          { title: "Diagramação da Capa e Apresentação", description: "Design da capa do manual e página de apresentação do logotipo." },
          { title: "Seção do Logotipo", description: "Apresentação do logotipo principal, versões, variações e construção geométrica." },
          { title: "Área de Proteção e Tamanho Mínimo", description: "Definição da área de respiro e dimensões mínimas para legibilidade." },
          { title: "Paleta de Cores e Tipografia", description: "Documentação visual das cores e fontes com especificações técnicas." },
          { title: "Aplicações e Usos Proibidos", description: "Exemplos de aplicações corretas e incorretas para referência." },
        ],
      },
      {
        title: "Fase 4: Revisão e Entrega",
        subtitle: "Finalizando e Entregando",
        objective: "Aplicar feedback, revisar tecnicamente e entregar o pacote completo.",
        deliverables: ["Manual em PDF Alta Resolução", "Pasta de Arquivos do Logotipo", "Documento Leia-me"],
        steps: [
          { title: "Aplicação de Feedback", description: "1 rodada de revisão inclusa para ajustes no manual." },
          { title: "Revisão Técnica Final", description: "Verificação de fontes incorporadas, resolução, cores e links." },
          { title: "Organização do Pacote", description: "Pasta estruturada com o manual e todos os arquivos do logotipo." },
          { title: "Entrega Formal", description: "Entrega via plataforma de nuvem com email profissional e documento Leia-me." },
        ],
      },
    ],
    schedule: [
      {
        title: "Fase 1: Recebimento e Diagnóstico",
        realDeadline: "1-2 dias úteis",
        clientDeadline: "2-3 dias úteis",
        days: [
          { day: "Dia 1 (1-2h dedicadas)", tasks: ["Reunião de briefing + recebimento de materiais", "Diagnóstico técnico dos arquivos"] },
          { day: "Dia 2 (1h dedicada)", tasks: ["Definição das páginas do manual", "Envio do plano para aprovação"], note: "Aguardando aprovação: 24h" },
        ],
      },
      {
        title: "Fase 2: Reconstrução e Organização",
        realDeadline: "2-3 dias úteis",
        clientDeadline: "2-3 dias úteis",
        days: [
          { day: "Dia 3 (2h dedicadas)", tasks: ["Reconstrução vetorial (se necessário)", "Criação de variações e versões monocromáticas"] },
          { day: "Dia 4 (1-2h dedicadas)", tasks: ["Documentação completa de cores (CMYK, RGB, HEX, Pantone)", "Identificação e documentação das fontes"] },
        ],
      },
      {
        title: "Fase 3: Desenvolvimento do Manual",
        realDeadline: "3-4 dias úteis",
        clientDeadline: "3-4 dias úteis",
        days: [
          { day: "Dia 5-6 (2-3h dedicadas/dia)", tasks: ["Diagramação completa do manual (12-20 páginas)"] },
          { day: "Dia 7 (1-2h dedicadas)", tasks: ["Revisão interna + envio para aprovação do cliente"], note: "Aguardando feedback: 48h" },
        ],
      },
      {
        title: "Fase 4: Revisão e Entrega",
        realDeadline: "1-2 dias úteis",
        clientDeadline: "2-3 dias úteis",
        days: [
          { day: "Dia 8 (1-2h dedicadas)", tasks: ["Aplicação de feedback + revisão técnica final"] },
          { day: "Dia 9 (1h dedicada)", tasks: ["Organização do pacote de entrega", "Entrega formal + email profissional"] },
        ],
      },
    ],
    totalDeadline: { real: "7-11 dias úteis", client: "9-13 dias úteis" },
  },

  "Design de Conteúdo para Redes Sociais": {
    serviceKey: "Design de Conteúdo para Redes Sociais",
    title: "Design de Conteúdo para Redes Sociais",
    subtitle: "Conteúdo Visual que Conecta, Engaja e Converte",
    date: "Março, 2026",
    introduction:
      "O serviço de Design de Conteúdo para Redes Sociais do Studio Kiiro transforma a presença digital do cliente em um feed profissional, consistente e estrategicamente desenhado. Criamos templates, layouts de feed e peças visuais que traduzem a identidade da marca em conteúdo que gera resultados.",
    principles: [
      { title: "Consistência Visual", description: "Cada peça reforça a identidade da marca no feed." },
      { title: "Estratégia de Conteúdo", description: "Design guiado por objetivos de comunicação e conversão." },
      { title: "Praticidade", description: "Templates replicáveis para autonomia do cliente no dia a dia." },
      { title: "Adaptabilidade", description: "Peças pensadas para múltiplas plataformas e formatos." },
    ],
    phases: [
      {
        title: "Fase 1: Briefing e Estratégia Visual",
        subtitle: "Definindo o Território Visual nas Redes",
        objective: "Entender a marca, o público e as metas de conteúdo para definir a direção visual nas redes sociais.",
        deliverables: ["Briefing Visual Completo", "Guia de Estilo para Redes Sociais", "Lista de Peças Aprovada"],
        steps: [
          { title: "Reunião de Briefing Visual", description: "Sessão para entender a marca, objetivos de conteúdo, tom de comunicação e referências visuais do cliente." },
          { title: "Levantamento da Identidade Visual", description: "Análise da identidade visual existente e adaptação para o contexto de redes sociais." },
          { title: "Definição do Guia de Estilo", description: "Paleta de cores para redes, tipografia, elementos gráficos e estilo fotográfico." },
          { title: "Aprovação da Lista de Peças", description: "Definição dos tipos e quantidade de peças que serão produzidas." },
        ],
      },
      {
        title: "Fase 2: Criação de Templates e Layout de Feed",
        subtitle: "Construindo a Base Visual do Conteúdo",
        objective: "Desenvolver templates reutilizáveis e o layout visual do feed que garantem consistência.",
        deliverables: ["Templates Base por Tipo de Peça", "Mockup de Layout de Feed (9-12 Posts)", "Checklist de Qualidade"],
        steps: [
          { title: "Desenvolvimento dos Templates", description: "Criação dos templates base para cada tipo de peça (post estático, carrossel, story, etc.)." },
          { title: "Checklist de Qualidade", description: "Verificação de consistência de cores, fontes, espaçamentos e alinhamento com a marca." },
          { title: "Mockup de Feed", description: "Simulação visual de como o feed ficará com 9-12 posts aplicando os templates." },
          { title: "Aprovação dos Templates", description: "Apresentação dos templates e mockup de feed ao cliente para validação." },
        ],
      },
      {
        title: "Fase 3: Produção das Peças",
        subtitle: "Criando o Conteúdo Visual",
        objective: "Produzir todas as peças visuais com qualidade e consistência usando os templates aprovados.",
        deliverables: ["Peças Visuais Finalizadas (Posts, Carrosséis, Stories)", "Revisão Interna de Qualidade"],
        steps: [
          { title: "Produção em Blocos", description: "Criação das peças organizadas por tipo (posts estáticos, carrosséis, stories) para eficiência." },
          { title: "Adaptação Criativa", description: "Variação dos templates mantendo a identidade visual: cada peça única mas reconhecível." },
          { title: "Revisão Interna", description: "Checklist de qualidade em cada peça antes de enviar ao cliente." },
          { title: "Organização para Revisão", description: "Peças organizadas por tipo e numeradas para facilitar o feedback do cliente." },
        ],
      },
      {
        title: "Fase 4: Revisão e Entrega",
        subtitle: "Finalizando e Preparando para Publicação",
        objective: "Aplicar feedback, exportar nos formatos corretos e entregar o pacote completo.",
        deliverables: ["Peças Revisadas e Aprovadas", "Arquivos Exportados por Plataforma", "Pasta Organizada de Entrega"],
        steps: [
          { title: "Aplicação de Feedback", description: "1 rodada de revisão inclusa, com ajustes nos templates e peças conforme feedback do cliente." },
          { title: "Exportação Otimizada", description: "Exportação nos formatos e dimensões corretos para cada plataforma (Instagram, LinkedIn, etc.)." },
          { title: "Organização da Entrega", description: "Pasta estruturada por tipo de peça e plataforma para fácil acesso." },
          { title: "Encerramento Formal", description: "Email de entrega com orientações de publicação e solicitação de depoimento." },
        ],
      },
    ],
    schedule: [
      {
        title: "Fase 1: Briefing e Estratégia Visual",
        realDeadline: "2-3 dias úteis",
        clientDeadline: "3-4 dias úteis",
        days: [
          { day: "Dia 1 (2h dedicadas)", tasks: ["Reunião de briefing visual (1h)", "Levantamento e análise da identidade visual"] },
          { day: "Dia 2 (1-2h dedicadas)", tasks: ["Definição do guia de estilo para redes sociais"] },
          { day: "Dia 3 (1h dedicada)", tasks: ["Envio da lista de peças para aprovação"], note: "Aguardando aprovação: 24-48h" },
        ],
      },
      {
        title: "Fase 2: Templates e Layout de Feed",
        realDeadline: "3-4 dias úteis",
        clientDeadline: "4-5 dias úteis",
        days: [
          { day: "Dia 4-5 (2-3h dedicadas/dia)", tasks: ["Criação dos templates base por tipo de peça"] },
          { day: "Dia 6 (2h dedicadas)", tasks: ["Mockup de layout de feed (9-12 posts)"] },
          { day: "Dia 7 (1h dedicada)", tasks: ["Apresentação dos templates ao cliente"], note: "Prazo pausado aguardando aprovação: 48h" },
        ],
      },
      {
        title: "Fase 3: Produção das Peças",
        realDeadline: "3-5 dias úteis",
        clientDeadline: "3-5 dias úteis",
        days: [
          { day: "Dia 8-10 (2-3h dedicadas/dia)", tasks: ["Produção em blocos por tipo de peça", "Posts estáticos → Carrosséis → Stories"] },
          { day: "Dia 11 (1h dedicada)", tasks: ["Revisão interna + organização para feedback do cliente"], note: "Aguardando feedback: 48h" },
        ],
      },
      {
        title: "Fase 4: Revisão e Entrega",
        realDeadline: "2-3 dias úteis",
        clientDeadline: "3-4 dias úteis",
        days: [
          { day: "Dia 12 (2h dedicadas)", tasks: ["Aplicação do feedback (1 rodada inclusa)"] },
          { day: "Dia 13 (1-2h dedicadas)", tasks: ["Exportação nos formatos corretos por plataforma", "Organização da estrutura de entrega"] },
          { day: "Dia 14 (1h dedicada)", tasks: ["Entrega formal + email profissional"] },
        ],
      },
    ],
    totalDeadline: { real: "10-15 dias úteis", client: "13-18 dias úteis" },
  },

  "Edição de Vídeo: Reels/Shorts": {
    serviceKey: "Edição de Vídeo: Reels/Shorts",
    title: "Edição de Vídeo: Reels/Shorts",
    subtitle: "Vídeos Curtos que Capturam Atenção e Geram Resultados",
    date: "Março, 2026",
    introduction:
      "O serviço de edição de Reels e Shorts do Studio Kiiro transforma material bruto em vídeos curtos profissionais, dinâmicos e otimizados para as plataformas. Cada vídeo é editado com atenção ao pacing, ritmo, trilha e identidade visual do cliente.",
    principles: [
      { title: "Ritmo e Pacing", description: "Cada segundo conta: edição rápida e envolvente." },
      { title: "Identidade Visual", description: "Elementos da marca integrados naturalmente ao vídeo." },
      { title: "Otimização por Plataforma", description: "Formato, duração e estilo adaptados para cada rede." },
      { title: "Qualidade Profissional", description: "Color grading, mixagem de áudio e transições polidas." },
    ],
    phases: [
      {
        title: "Fase 1: Briefing e Roteiro Visual",
        subtitle: "Planejando o Impacto",
        objective: "Entender o objetivo do vídeo, organizar o material bruto e definir o roteiro de edição.",
        deliverables: ["Briefing de Vídeo Preenchido", "Checklist do Material Bruto", "Roteiro/Script de Edição", "Referências de Trilha e Estilo"],
        steps: [
          { title: "Reunião de Briefing", description: "Sessão para entender o objetivo do vídeo, público-alvo, mensagem principal e tom desejado." },
          { title: "Checklist do Material Bruto", description: "Avaliação e organização do material recebido: qualidade, duração e usabilidade." },
          { title: "Roteiro de Edição", description: "Estruturação do script visual com sequência de takes, momentos-chave e timing." },
          { title: "Referências", description: "Pesquisa de trilhas, efeitos e estilos de edição alinhados ao briefing." },
        ],
      },
      {
        title: "Fase 2: Edição Bruta e Montagem (Rough Cut)",
        subtitle: "Construindo a Estrutura do Vídeo",
        objective: "Montar a primeira versão do vídeo com seleção de takes, ordem narrativa e trilha provisória.",
        deliverables: ["Rough Cut Completo", "Trilha Provisória Aplicada"],
        steps: [
          { title: "Organização do Projeto", description: "Importação, nomeação e organização dos clips no software de edição." },
          { title: "Seleção de Takes", description: "Escolha dos melhores takes e momentos para compor a narrativa." },
          { title: "Montagem do Rough Cut", description: "Primeira montagem com cortes, trilha provisória e ajuste de pacing." },
          { title: "Apresentação ao Cliente", description: "Envio do rough cut para feedback sobre estrutura e direção." },
        ],
      },
      {
        title: "Fase 3: Refinamento e Efeitos (Fine Cut)",
        subtitle: "Polindo Cada Detalhe",
        objective: "Refinar a edição com transições, color grading, mixagem de áudio e elementos visuais da marca.",
        deliverables: ["Fine Cut Finalizado", "Color Grading Aplicado", "Mixagem de Áudio Profissional"],
        steps: [
          { title: "Edição de Detalhe", description: "Ajustes finos de corte, transições e timing para fluidez perfeita." },
          { title: "Color Grading", description: "Correção de cor primária e look criativo aplicado em duas etapas." },
          { title: "Mixagem de Áudio", description: "Equalização de voz, trilha e efeitos sonoros para mixagem profissional." },
          { title: "Elementos Visuais", description: "Inclusão de gráficos, legendas, lower thirds e elementos da marca." },
        ],
      },
      {
        title: "Fase 4: Revisão e Exportação Final",
        subtitle: "Pronto para Publicar",
        objective: "Aplicar feedback final, revisar tecnicamente e exportar otimizado para cada plataforma.",
        deliverables: ["Vídeo Final Aprovado", "Exportação Otimizada por Plataforma"],
        steps: [
          { title: "Aplicação de Feedback", description: "1 rodada de revisão inclusa para ajustes finais de corte, cor ou áudio." },
          { title: "Revisão Técnica", description: "Verificação completa de qualidade: resolução, áudio, sincronização e elementos visuais." },
          { title: "Exportação Otimizada", description: "Exportação nos formatos e resoluções ideais para Instagram Reels, YouTube Shorts e TikTok." },
          { title: "Entrega Organizada", description: "Pasta estruturada com todas as versões e email de entrega profissional." },
        ],
      },
    ],
    schedule: [
      {
        title: "Fase 1: Briefing e Roteiro",
        realDeadline: "1-2 dias úteis",
        clientDeadline: "2-3 dias úteis",
        days: [
          { day: "Dia 1 (1-2h dedicadas)", tasks: ["Reunião de briefing + checklist do material", "Estruturação do roteiro de edição + pesquisa de referências"] },
        ],
      },
      {
        title: "Fase 2: Rough Cut",
        realDeadline: "1-2 dias úteis",
        clientDeadline: "2-3 dias úteis",
        days: [
          { day: "Dia 2 (2-3h dedicadas)", tasks: ["Organização do projeto + seleção de takes", "Montagem do rough cut + trilha provisória"] },
          { day: "Dia 3 (30min)", tasks: ["Envio do rough cut para feedback"], note: "Aguardando feedback: 24-48h" },
        ],
      },
      {
        title: "Fase 3: Fine Cut",
        realDeadline: "1-2 dias úteis",
        clientDeadline: "1-2 dias úteis",
        days: [
          { day: "Dia 4 (2-3h dedicadas)", tasks: ["Edição de detalhe + transições", "Color grading + mixagem de áudio", "Inclusão de elementos visuais da marca"] },
        ],
      },
      {
        title: "Fase 4: Revisão e Exportação",
        realDeadline: "1 dia útil",
        clientDeadline: "1-2 dias úteis",
        days: [
          { day: "Dia 5 (1-2h dedicadas)", tasks: ["Aplicação de feedback + revisão técnica", "Exportação otimizada por plataforma", "Entrega organizada"] },
        ],
      },
    ],
    totalDeadline: { real: "4-7 dias úteis", client: "6-10 dias úteis" },
  },

  "Edição de Vídeo: Institucional": {
    serviceKey: "Edição de Vídeo: Institucional",
    title: "Edição de Vídeo: Institucional",
    subtitle: "Vídeos Que Comunicam a Essência e a Credibilidade da Sua Marca",
    date: "Março, 2026",
    introduction:
      "O serviço de edição de vídeo institucional do Studio Kiiro transforma material bruto em peças audiovisuais profissionais que comunicam a essência da marca com sofisticação. Ideal para vídeos de apresentação da empresa, depoimentos, vídeos de cultura e conteúdo corporativo.",
    principles: [
      { title: "Narrativa Institucional", description: "Cada corte serve à história e ao posicionamento da marca." },
      { title: "Sofisticação Visual", description: "Color grading cinematográfico e transições elegantes." },
      { title: "Credibilidade", description: "Edição que transmite profissionalismo e confiança." },
      { title: "Versatilidade de Formato", description: "Otimizado para YouTube, LinkedIn, Instagram e site." },
    ],
    phases: [
      {
        title: "Fase 1: Briefing e Roteiro Visual",
        subtitle: "Definindo a Narrativa Institucional",
        objective: "Entender o objetivo institucional do vídeo, organizar o material e definir o roteiro de edição.",
        deliverables: ["Briefing de Vídeo Institucional", "Roteiro/Script de Edição", "Referências de Trilha e Estilo"],
        steps: [
          { title: "Reunião de Briefing", description: "Sessão para entender o objetivo institucional, mensagem-chave, público e canais de distribuição." },
          { title: "Checklist do Material", description: "Avaliação da qualidade e organização de todo o material bruto recebido." },
          { title: "Roteiro de Edição", description: "Estruturação narrativa com blocos temáticos, sequência lógica e timing." },
          { title: "Pesquisa de Referências", description: "Seleção de trilhas, estilos de edição e referências visuais institucionais." },
        ],
      },
      {
        title: "Fase 2: Edição Bruta e Montagem (Rough Cut)",
        subtitle: "Construindo a Narrativa",
        objective: "Montar a primeira versão do vídeo com foco na narrativa e na mensagem institucional.",
        deliverables: ["Rough Cut Institucional", "Trilha Provisória"],
        steps: [
          { title: "Organização do Projeto", description: "Importação e organização de todos os clips, áudios e assets no projeto de edição." },
          { title: "Montagem Narrativa", description: "Seleção de takes e montagem seguindo o roteiro com foco na mensagem institucional." },
          { title: "Trilha e Pacing", description: "Aplicação de trilha provisória e ajuste de ritmo para tom institucional." },
          { title: "Envio para Feedback", description: "Apresentação do rough cut ao cliente para validação da estrutura." },
        ],
      },
      {
        title: "Fase 3: Refinamento e Efeitos (Fine Cut)",
        subtitle: "Elevando a Qualidade Audiovisual",
        objective: "Refinar a edição com acabamento cinematográfico, áudio profissional e elementos da marca.",
        deliverables: ["Fine Cut Institucional", "Color Grading Narrativo", "Mixagem de Áudio Profissional"],
        steps: [
          { title: "Edição de Detalhe", description: "Transições suaves, cortes precisos e ritmo institucional adequado." },
          { title: "Color Grading Narrativo", description: "Correção de cor e look cinematográfico que reforça o tom da marca." },
          { title: "Mixagem de Áudio", description: "Equalização de vozes, trilha e ambientação sonora profissional." },
          { title: "Elementos da Marca", description: "Lower thirds, legendas, gráficos e logo animado integrados ao vídeo." },
        ],
      },
      {
        title: "Fase 4: Revisão e Exportação Final",
        subtitle: "Pronto para o Mundo",
        objective: "Aplicar feedback, revisar tecnicamente e exportar em formatos otimizados para cada plataforma.",
        deliverables: ["Vídeo Institucional Final", "Versões por Plataforma (YouTube, LinkedIn, Instagram)"],
        steps: [
          { title: "Aplicação de Feedback", description: "1 rodada de revisão inclusa para ajustes finais." },
          { title: "Revisão Técnica", description: "Verificação completa de qualidade audiovisual." },
          { title: "Exportação Multi-plataforma", description: "Versões otimizadas para YouTube, LinkedIn, Instagram e site." },
          { title: "Entrega Organizada", description: "Pasta estruturada com todas as versões e email de entrega." },
        ],
      },
    ],
    schedule: [
      {
        title: "Fase 1: Briefing e Roteiro",
        realDeadline: "2-3 dias úteis",
        clientDeadline: "3-4 dias úteis",
        days: [
          { day: "Dia 1 (2h dedicadas)", tasks: ["Reunião de briefing institucional + checklist do material"] },
          { day: "Dia 2 (1-2h dedicadas)", tasks: ["Estruturação do roteiro + pesquisa de referências"] },
        ],
      },
      {
        title: "Fase 2: Rough Cut",
        realDeadline: "2-3 dias úteis",
        clientDeadline: "3-4 dias úteis",
        days: [
          { day: "Dia 3-4 (2-3h dedicadas/dia)", tasks: ["Organização + montagem narrativa + trilha provisória"] },
          { day: "Dia 5 (30min)", tasks: ["Envio do rough cut para feedback"], note: "Aguardando feedback: 48h" },
        ],
      },
      {
        title: "Fase 3: Fine Cut",
        realDeadline: "2-3 dias úteis",
        clientDeadline: "2-3 dias úteis",
        days: [
          { day: "Dia 6-7 (2-3h dedicadas/dia)", tasks: ["Edição de detalhe + color grading + mixagem", "Inclusão de elementos da marca e legendas"] },
        ],
      },
      {
        title: "Fase 4: Revisão e Exportação",
        realDeadline: "1-2 dias úteis",
        clientDeadline: "2-3 dias úteis",
        days: [
          { day: "Dia 8-9 (1-2h dedicadas/dia)", tasks: ["Aplicação de feedback + revisão técnica", "Exportação multi-plataforma + entrega"] },
        ],
      },
    ],
    totalDeadline: { real: "7-11 dias úteis", client: "10-14 dias úteis" },
  },

  "Edição de Vídeo: Tutorial/Educativo": {
    serviceKey: "Edição de Vídeo: Tutorial/Educativo",
    title: "Edição de Vídeo: Tutorial/Educativo",
    subtitle: "Conteúdo Didático que Ensina com Clareza e Profissionalismo",
    date: "Março, 2026",
    introduction:
      "O serviço de edição de vídeo educativo do Studio Kiiro transforma aulas, tutoriais e conteúdos didáticos em vídeos profissionais com ritmo adequado, gráficos explicativos e elementos visuais que facilitam o aprendizado e mantêm a atenção do espectador.",
    principles: [
      { title: "Clareza Didática", description: "Cada elemento visual existe para facilitar o aprendizado." },
      { title: "Ritmo Educativo", description: "Pacing ajustado para compreensão, não para entretenimento rápido." },
      { title: "Gráficos Explicativos", description: "Elementos visuais que complementam e reforçam o conteúdo falado." },
      { title: "Acessibilidade", description: "Legendas, destaques e estrutura visual que facilitam o acompanhamento." },
    ],
    phases: [
      {
        title: "Fase 1: Briefing e Roteiro Visual",
        subtitle: "Planejando o Conteúdo Didático",
        objective: "Entender o conteúdo educativo, organizar o material e definir o roteiro com foco em didática visual.",
        deliverables: ["Briefing de Vídeo Educativo", "Roteiro/Script Didático", "Referências de Estilo e Ritmo"],
        steps: [
          { title: "Reunião de Briefing", description: "Sessão para entender o conteúdo, nível do público, objetivos de aprendizado e formato desejado." },
          { title: "Checklist do Material", description: "Avaliação do material bruto com foco em momentos-chave de aprendizado." },
          { title: "Roteiro Didático", description: "Estruturação do script com blocos de conteúdo, pontos de destaque e momentos para gráficos." },
          { title: "Pesquisa de Estilo", description: "Referências de edição educativa, ritmo e estilo de gráficos explicativos." },
        ],
      },
      {
        title: "Fase 2: Edição Bruta e Montagem (Rough Cut)",
        subtitle: "Estruturando o Conteúdo",
        objective: "Montar a primeira versão com foco no fluxo didático e ritmo de aprendizado.",
        deliverables: ["Rough Cut Educativo", "Trilha Provisória", "Marcações para Gráficos"],
        steps: [
          { title: "Organização do Projeto", description: "Importação e organização dos clips com marcação dos pontos-chave." },
          { title: "Montagem Didática", description: "Seleção de takes e montagem com foco na clareza da explicação." },
          { title: "Pacing Educativo", description: "Ajuste de ritmo para que o espectador acompanhe sem se perder nem se entediar." },
          { title: "Envio para Feedback", description: "Rough cut com marcações visuais indicando onde entrarão gráficos e legendas." },
        ],
      },
      {
        title: "Fase 3: Refinamento e Efeitos (Fine Cut)",
        subtitle: "Adicionando Camadas Didáticas",
        objective: "Refinar a edição com gráficos explicativos, legendas dinâmicas e elementos visuais da marca.",
        deliverables: ["Fine Cut Educativo", "Gráficos Explicativos", "Legendas Dinâmicas"],
        steps: [
          { title: "Edição de Detalhe", description: "L-cuts, J-cuts e transições que mantêm a fluidez do conteúdo educativo." },
          { title: "Color Grading", description: "Correção de cor e look limpo e profissional adequado ao conteúdo didático." },
          { title: "Gráficos Explicativos", description: "Criação de infográficos, destaques de texto, setas e elementos visuais que reforçam o conteúdo." },
          { title: "Legendas Dinâmicas", description: "Legendas sincronizadas com tipografia e cor da marca para acessibilidade." },
        ],
      },
      {
        title: "Fase 4: Revisão e Exportação Final",
        subtitle: "Pronto para Ensinar",
        objective: "Aplicar feedback, revisar e exportar otimizado para as plataformas de publicação.",
        deliverables: ["Vídeo Educativo Final", "Exportação Otimizada por Plataforma"],
        steps: [
          { title: "Aplicação de Feedback", description: "1 rodada de revisão inclusa para ajustes de conteúdo, gráficos ou timing." },
          { title: "Revisão Técnica", description: "Verificação de qualidade, sincronização de legendas e gráficos." },
          { title: "Exportação Otimizada", description: "Versões para YouTube, plataformas de curso e redes sociais." },
          { title: "Entrega Organizada", description: "Pasta com todas as versões e email de entrega profissional." },
        ],
      },
    ],
    schedule: [
      {
        title: "Fase 1: Briefing e Roteiro",
        realDeadline: "1-2 dias úteis",
        clientDeadline: "2-3 dias úteis",
        days: [
          { day: "Dia 1 (2h dedicadas)", tasks: ["Reunião de briefing + checklist do material", "Estruturação do roteiro didático + pesquisa de referências"] },
        ],
      },
      {
        title: "Fase 2: Rough Cut",
        realDeadline: "2-3 dias úteis",
        clientDeadline: "3-4 dias úteis",
        days: [
          { day: "Dia 2-3 (2-3h dedicadas/dia)", tasks: ["Organização + montagem didática + pacing educativo", "Marcação de pontos para gráficos"] },
          { day: "Dia 4 (30min)", tasks: ["Envio do rough cut para feedback"], note: "Aguardando feedback: 24-48h" },
        ],
      },
      {
        title: "Fase 3: Fine Cut",
        realDeadline: "2-3 dias úteis",
        clientDeadline: "2-3 dias úteis",
        days: [
          { day: "Dia 5-6 (2-3h dedicadas/dia)", tasks: ["Edição de detalhe + color grading", "Criação de gráficos explicativos + legendas dinâmicas"] },
        ],
      },
      {
        title: "Fase 4: Revisão e Exportação",
        realDeadline: "1-2 dias úteis",
        clientDeadline: "2-3 dias úteis",
        days: [
          { day: "Dia 7-8 (1-2h dedicadas/dia)", tasks: ["Aplicação de feedback + revisão técnica", "Exportação otimizada + entrega"] },
        ],
      },
    ],
    totalDeadline: { real: "6-10 dias úteis", client: "9-13 dias úteis" },
  },

  "Landing Page Simples": {
    serviceKey: "Landing Page Simples",
    title: "Landing Page Simples",
    subtitle: "Uma Página de Conversão Objetiva e Profissional",
    date: "Março, 2026",
    introduction:
      "A Landing Page Simples do Studio Kiiro é uma página única de até 6 seções, focada em conversão. Ideal para divulgar um serviço, produto ou evento específico, com design estratégico, responsividade completa e otimização para resultados.",
    principles: [
      { title: "Foco em Conversão", description: "Cada seção guia o visitante para a ação desejada." },
      { title: "Design Estratégico", description: "Hierarquia visual que prioriza o que importa." },
      { title: "Responsividade Total", description: "Experiência perfeita em qualquer dispositivo." },
      { title: "Performance", description: "Carregamento rápido e otimização para SEO básico." },
    ],
    phases: [
      {
        title: "Fase 1: Briefing e Estratégia Digital",
        subtitle: "Planejando a Página de Conversão",
        objective: "Definir objetivos, estrutura e conteúdo da landing page com foco em resultado.",
        deliverables: ["Briefing Digital Completo", "Arquitetura de Informação (até 6 seções)", "Levantamento de Conteúdos"],
        steps: [
          { title: "Reunião de Briefing", description: "Sessão para entender o objetivo da página, público-alvo, oferta e ação desejada." },
          { title: "Análise de Referências", description: "Pesquisa de landing pages de referência no segmento do cliente." },
          { title: "Arquitetura de Informação", description: "Definição das seções, hierarquia de conteúdo e fluxo de conversão." },
          { title: "Levantamento de Conteúdos", description: "Lista de textos, imagens e materiais necessários para a produção." },
        ],
      },
      {
        title: "Fase 2: Design e Prototipagem Visual",
        subtitle: "Criando a Experiência Visual",
        objective: "Desenvolver o design de todas as seções com hierarquia visual e estratégia de conversão.",
        deliverables: ["Design de Todas as Seções", "Versão Mobile/Responsiva", "Protótipo Visual Aprovado"],
        steps: [
          { title: "Design Desktop", description: "Desenvolvimento do layout de todas as seções com identidade visual e hierarquia de conversão." },
          { title: "Estratégia de CTA", description: "Posicionamento estratégico dos botões e calls-to-action ao longo da página." },
          { title: "Adaptação Mobile", description: "Design responsivo otimizado para a experiência em dispositivos móveis." },
          { title: "Aprovação do Protótipo", description: "Apresentação do design completo ao cliente para validação." },
        ],
      },
      {
        title: "Fase 3: Desenvolvimento e Construção",
        subtitle: "Transformando Design em Página Real",
        objective: "Construir a landing page com fidelidade ao design, responsividade e funcionalidades.",
        deliverables: ["Landing Page Funcional", "Formulários Integrados", "SEO Básico Configurado"],
        steps: [
          { title: "Construção das Seções", description: "Desenvolvimento de cada seção com fidelidade pixel-perfect ao design aprovado." },
          { title: "Responsividade", description: "Configuração de breakpoints e adaptação para todos os tamanhos de tela." },
          { title: "Formulários e Funcionalidades", description: "Integração de formulários de contato, WhatsApp e funcionalidades necessárias." },
          { title: "Performance e SEO", description: "Otimização de imagens, carregamento e configuração de SEO básico." },
        ],
      },
      {
        title: "Fase 4: Revisão e Ajustes",
        subtitle: "Refinando a Experiência",
        objective: "Aplicar feedback, testar em múltiplos dispositivos e preparar para publicação.",
        deliverables: ["Página Revisada e Aprovada", "Testes Cross-browser e Cross-device"],
        steps: [
          { title: "Aplicação de Feedback", description: "1 rodada de revisão inclusa para ajustes de design e conteúdo." },
          { title: "Testes de Dispositivos", description: "Verificação em navegadores e dispositivos diferentes para garantir consistência." },
          { title: "Revisão de Conteúdo", description: "Verificação final de textos, links, imagens e funcionalidades." },
          { title: "Aprovação Final", description: "Validação completa do cliente antes da publicação." },
        ],
      },
      {
        title: "Fase 5: Publicação e Entrega",
        subtitle: "Colocando a Página no Ar",
        objective: "Publicar a landing page no domínio do cliente e entregar a documentação de acesso.",
        deliverables: ["Página Publicada", "Documento de Acesso e Orientações"],
        steps: [
          { title: "Publicação", description: "Deploy da página no domínio do cliente com configuração de DNS se necessário." },
          { title: "Testes em Produção", description: "Verificação final da página publicada em múltiplos dispositivos." },
          { title: "Documento de Acesso", description: "Credenciais, orientações de gestão e recomendações de manutenção." },
          { title: "Entrega Formal", description: "Email de encerramento com todos os acessos e orientações." },
        ],
      },
    ],
    schedule: [
      {
        title: "Fase 1: Briefing e Estratégia",
        realDeadline: "1-2 dias úteis",
        clientDeadline: "2-3 dias úteis",
        days: [
          { day: "Dia 1 (2h dedicadas)", tasks: ["Reunião de briefing + análise de referências", "Arquitetura de informação + levantamento de conteúdos"] },
        ],
      },
      {
        title: "Fase 2: Design e Prototipagem",
        realDeadline: "3-4 dias úteis",
        clientDeadline: "4-5 dias úteis",
        days: [
          { day: "Dia 2-3 (2-3h dedicadas/dia)", tasks: ["Design de todas as seções (desktop)"] },
          { day: "Dia 4 (1-2h dedicadas)", tasks: ["Adaptação mobile + estratégia de CTA"] },
          { day: "Dia 5 (1h dedicada)", tasks: ["Apresentação ao cliente"], note: "Aguardando aprovação: 48h" },
        ],
      },
      {
        title: "Fase 3: Desenvolvimento",
        realDeadline: "3-5 dias úteis",
        clientDeadline: "3-5 dias úteis",
        days: [
          { day: "Dia 6-8 (2-3h dedicadas/dia)", tasks: ["Construção das seções + responsividade"] },
          { day: "Dia 9 (1-2h dedicadas)", tasks: ["Formulários + SEO + performance"] },
        ],
      },
      {
        title: "Fase 4: Revisão e Ajustes",
        realDeadline: "2-3 dias úteis",
        clientDeadline: "3-4 dias úteis",
        days: [
          { day: "Dia 10 (2h dedicadas)", tasks: ["Aplicação de feedback + testes cross-browser"] },
          { day: "Dia 11 (1h dedicada)", tasks: ["Revisão de conteúdo + aprovação final"], note: "Aguardando aprovação: 24-48h" },
        ],
      },
      {
        title: "Fase 5: Publicação e Entrega",
        realDeadline: "1 dia útil",
        clientDeadline: "1-2 dias úteis",
        days: [
          { day: "Dia 12 (1-2h dedicadas)", tasks: ["Publicação + testes em produção", "Documento de acesso + entrega formal"] },
        ],
      },
    ],
    totalDeadline: { real: "10-15 dias úteis", client: "13-19 dias úteis" },
  },

  "Landing Page Completa": {
    serviceKey: "Landing Page Completa",
    title: "Landing Page Completa",
    subtitle: "Uma Experiência Digital Completa e Estratégica",
    date: "Março, 2026",
    introduction:
      "A Landing Page Completa do Studio Kiiro é uma página robusta de até 12 seções, com estratégia de conversão avançada, design premium e funcionalidades expandidas. Ideal para lançamentos, serviços complexos ou ofertas que exigem mais informação e persuasão visual.",
    principles: [
      { title: "Conversão Avançada", description: "Múltiplos pontos de conversão estrategicamente posicionados." },
      { title: "Design Premium", description: "Visual impactante que transmite credibilidade e profissionalismo." },
      { title: "Experiência Completa", description: "Jornada do visitante planejada do início ao fim." },
      { title: "Performance e SEO", description: "Otimização completa para velocidade e indexação." },
    ],
    phases: [
      {
        title: "Fase 1: Briefing e Estratégia Digital",
        subtitle: "Planejamento Estratégico da Página",
        objective: "Definir a estratégia completa da landing page com arquitetura de até 12 seções.",
        deliverables: ["Briefing Digital Completo", "Arquitetura de Informação (até 12 seções)", "Estratégia de Conversão"],
        steps: [
          { title: "Reunião de Briefing Aprofundado", description: "Sessão completa para entender objetivos, público, oferta e jornada de conversão desejada." },
          { title: "Análise de Concorrência Digital", description: "Pesquisa de landing pages concorrentes e melhores práticas do segmento." },
          { title: "Arquitetura de Informação", description: "Estruturação das seções, fluxo narrativo e pontos de conversão estratégicos." },
          { title: "Levantamento de Conteúdos", description: "Lista completa de textos, depoimentos, cases, imagens e materiais necessários." },
        ],
      },
      {
        title: "Fase 2: Design e Prototipagem Visual",
        subtitle: "Criando uma Experiência Visual Premium",
        objective: "Desenvolver o design completo com hierarquia visual avançada e estratégia de conversão.",
        deliverables: ["Design de Todas as Seções", "Versão Mobile/Responsiva", "Estratégia de CTA Avançada"],
        steps: [
          { title: "Design Desktop Completo", description: "Layout de todas as seções com design premium e hierarquia de conversão avançada." },
          { title: "Microinterações", description: "Planejamento de animações, transições e efeitos que enriquecem a experiência." },
          { title: "Adaptação Mobile", description: "Design responsivo detalhado para cada breakpoint." },
          { title: "Aprovação", description: "Apresentação completa do protótipo com demonstração de fluxo." },
        ],
      },
      {
        title: "Fase 3: Desenvolvimento e Construção",
        subtitle: "Construindo a Experiência Digital",
        objective: "Desenvolver a página com todas as funcionalidades, animações e otimizações.",
        deliverables: ["Landing Page Funcional Completa", "Animações e Microinterações", "SEO e Performance Otimizados"],
        steps: [
          { title: "Construção das Seções", description: "Desenvolvimento pixel-perfect de todas as seções do design aprovado." },
          { title: "Animações e Interações", description: "Implementação de scroll animations, hover effects e microinterações." },
          { title: "Funcionalidades Avançadas", description: "Formulários, integrações, vídeos embutidos e demais funcionalidades." },
          { title: "Performance e SEO", description: "Otimização completa de imagens, lazy loading, meta tags e structured data." },
        ],
      },
      {
        title: "Fase 4: Revisão e Ajustes",
        subtitle: "Polindo a Experiência",
        objective: "Refinar, testar e aprovar a página completa.",
        deliverables: ["Página Revisada e Aprovada", "Testes Completos de QA"],
        steps: [
          { title: "Aplicação de Feedback", description: "1 rodada de revisão inclusa." },
          { title: "Testes de QA", description: "Verificação em múltiplos navegadores, dispositivos e resoluções." },
          { title: "Revisão Final", description: "Checagem completa de conteúdo, links e funcionalidades." },
          { title: "Aprovação", description: "Validação final do cliente." },
        ],
      },
      {
        title: "Fase 5: Publicação e Entrega",
        subtitle: "Ativando a Presença Digital",
        objective: "Publicar e entregar a página com documentação completa.",
        deliverables: ["Página Publicada", "Documentação Completa"],
        steps: [
          { title: "Publicação", description: "Deploy no domínio com configuração técnica completa." },
          { title: "Testes em Produção", description: "Verificação pós-deploy em ambiente real." },
          { title: "Documentação", description: "Credenciais, orientações e recomendações de manutenção." },
          { title: "Encerramento", description: "Entrega formal e solicitação de depoimento." },
        ],
      },
    ],
    schedule: [
      { title: "Fase 1: Briefing e Estratégia", realDeadline: "2-3 dias úteis", clientDeadline: "3-4 dias úteis", days: [{ day: "Dia 1-2 (2h dedicadas/dia)", tasks: ["Briefing + análise de concorrência + arquitetura de informação"] }] },
      { title: "Fase 2: Design e Prototipagem", realDeadline: "5-7 dias úteis", clientDeadline: "7-9 dias úteis", days: [{ day: "Dia 3-7 (2-3h dedicadas/dia)", tasks: ["Design completo de todas as seções + mobile + microinterações"] }, { day: "Dia 8 (1h dedicada)", tasks: ["Apresentação ao cliente"], note: "Aguardando aprovação: 48h" }] },
      { title: "Fase 3: Desenvolvimento", realDeadline: "5-7 dias úteis", clientDeadline: "5-7 dias úteis", days: [{ day: "Dia 9-14 (2-3h dedicadas/dia)", tasks: ["Construção + animações + funcionalidades + performance"] }] },
      { title: "Fase 4: Revisão e Ajustes", realDeadline: "2-3 dias úteis", clientDeadline: "3-4 dias úteis", days: [{ day: "Dia 15-16 (2h dedicadas/dia)", tasks: ["Feedback + testes de QA + aprovação"] }] },
      { title: "Fase 5: Publicação e Entrega", realDeadline: "1-2 dias úteis", clientDeadline: "1-2 dias úteis", days: [{ day: "Dia 17 (1-2h dedicadas)", tasks: ["Publicação + testes + documentação + entrega"] }] },
    ],
    totalDeadline: { real: "15-22 dias úteis", client: "19-26 dias úteis" },
  },

  "Site Institucional": {
    serviceKey: "Site Institucional",
    title: "Site Institucional",
    subtitle: "Presença Digital Profissional com Múltiplas Páginas",
    date: "Março, 2026",
    introduction:
      "O Site Institucional do Studio Kiiro é uma presença digital completa com 3-5 páginas estrategicamente planejadas. Ideal para empresas que precisam de um site profissional com informações sobre a empresa, serviços, portfólio e contato.",
    principles: [
      { title: "Navegação Intuitiva", description: "Experiência fluida entre as páginas." },
      { title: "Presença Profissional", description: "Design que transmite credibilidade institucional." },
      { title: "Responsividade", description: "Experiência perfeita em qualquer dispositivo." },
      { title: "SEO Estruturado", description: "Otimização para motores de busca em todas as páginas." },
    ],
    phases: [
      { title: "Fase 1: Briefing e Estratégia Digital", subtitle: "Planejando a Presença Institucional", objective: "Definir a estrutura do site com sitemap de 3-5 páginas e estratégia de conteúdo.", deliverables: ["Briefing Digital", "Sitemap (3-5 páginas)", "Arquitetura de Informação"], steps: [{ title: "Reunião de Briefing", description: "Sessão para entender o negócio, público, objetivos e conteúdo de cada página." }, { title: "Sitemap e Navegação", description: "Definição das páginas, hierarquia e fluxo de navegação." }, { title: "Arquitetura de Conteúdo", description: "Estruturação do conteúdo de cada página com seções e hierarquia." }, { title: "Levantamento de Materiais", description: "Lista de textos, imagens e materiais necessários para cada página." }] },
      { title: "Fase 2: Design e Prototipagem Visual", subtitle: "Criando a Identidade Digital", objective: "Desenvolver o design de todas as páginas com navegação e hierarquia visual consistente.", deliverables: ["Design de Todas as Páginas", "Navegação e Menu", "Versão Mobile"], steps: [{ title: "Design da Home", description: "Página principal com hero, seções de destaque e hierarquia de conversão." }, { title: "Páginas Internas", description: "Design de sobre, serviços, portfólio e contato com consistência visual." }, { title: "Sistema de Navegação", description: "Menu responsivo, footer e elementos de navegação global." }, { title: "Adaptação Mobile", description: "Responsividade completa de todas as páginas." }] },
      { title: "Fase 3: Desenvolvimento e Construção", subtitle: "Construindo o Site Completo", objective: "Desenvolver todas as páginas com fidelidade ao design e funcionalidades completas.", deliverables: ["Site Funcional Completo", "Formulários e Integrações", "SEO Configurado"], steps: [{ title: "Construção das Páginas", description: "Desenvolvimento de todas as páginas com fidelidade ao design." }, { title: "Navegação e Interações", description: "Menu responsivo, transições entre páginas e microinterações." }, { title: "Funcionalidades", description: "Formulários, mapas, redes sociais e demais integrações." }, { title: "SEO e Performance", description: "Meta tags, sitemap XML, schema markup e otimização de performance." }] },
      { title: "Fase 4: Revisão e Ajustes", subtitle: "Garantindo a Qualidade", objective: "Revisar, testar e aprovar o site completo.", deliverables: ["Site Revisado e Aprovado", "Testes de QA Completos"], steps: [{ title: "Feedback e Revisão", description: "1 rodada de revisão inclusa." }, { title: "Testes Cross-browser", description: "Verificação em múltiplos navegadores e dispositivos." }, { title: "Revisão de Conteúdo", description: "Verificação final de todos os textos e links." }, { title: "Aprovação", description: "Validação completa do cliente." }] },
      { title: "Fase 5: Publicação e Entrega", subtitle: "Colocando o Site no Ar", objective: "Publicar e entregar o site com documentação completa.", deliverables: ["Site Publicado", "Documentação de Acesso"], steps: [{ title: "Publicação", description: "Deploy no domínio com configuração de DNS e SSL." }, { title: "Testes Finais", description: "Verificação pós-deploy." }, { title: "Documentação", description: "Credenciais e orientações de gestão." }, { title: "Entrega", description: "Email de encerramento profissional." }] },
    ],
    schedule: [
      { title: "Fase 1: Briefing", realDeadline: "2-3 dias úteis", clientDeadline: "3-4 dias úteis", days: [{ day: "Dia 1-2 (2h dedicadas/dia)", tasks: ["Briefing + sitemap + arquitetura de conteúdo"] }] },
      { title: "Fase 2: Design", realDeadline: "5-7 dias úteis", clientDeadline: "7-9 dias úteis", days: [{ day: "Dia 3-8 (2-3h dedicadas/dia)", tasks: ["Design de todas as páginas + mobile"] }, { day: "Dia 9 (1h)", tasks: ["Apresentação"], note: "Aguardando aprovação: 48h" }] },
      { title: "Fase 3: Desenvolvimento", realDeadline: "5-8 dias úteis", clientDeadline: "5-8 dias úteis", days: [{ day: "Dia 10-16 (2-3h dedicadas/dia)", tasks: ["Construção de todas as páginas + funcionalidades + SEO"] }] },
      { title: "Fase 4: Revisão", realDeadline: "2-3 dias úteis", clientDeadline: "3-4 dias úteis", days: [{ day: "Dia 17-18 (2h dedicadas/dia)", tasks: ["Feedback + testes + aprovação"] }] },
      { title: "Fase 5: Publicação", realDeadline: "1-2 dias úteis", clientDeadline: "1-2 dias úteis", days: [{ day: "Dia 19 (1-2h)", tasks: ["Publicação + documentação + entrega"] }] },
    ],
    totalDeadline: { real: "15-23 dias úteis", client: "19-27 dias úteis" },
  },

  "Site Completo": {
    serviceKey: "Site Completo",
    title: "Site Completo",
    subtitle: "Uma Experiência Digital Robusta e Completa",
    date: "Março, 2026",
    introduction:
      "O Site Completo do Studio Kiiro é a solução mais abrangente para presença digital. Com 5-8 páginas, navegação complexa, funcionalidades avançadas e design premium, é ideal para empresas que precisam de um ecossistema digital completo.",
    principles: [
      { title: "Ecossistema Digital", description: "Todas as necessidades digitais em uma única solução." },
      { title: "Navegação Complexa", description: "Estrutura de menu e subpáginas para conteúdo extenso." },
      { title: "Funcionalidades Avançadas", description: "Integrações, formulários complexos e automações." },
      { title: "Performance Premium", description: "Otimização máxima de velocidade e SEO avançado." },
    ],
    phases: [
      { title: "Fase 1: Briefing e Estratégia Digital", subtitle: "Planejamento Completo do Ecossistema", objective: "Definir a estratégia completa com sitemap de 5-8 páginas e arquitetura robusta.", deliverables: ["Briefing Aprofundado", "Sitemap Completo (5-8 páginas)", "Arquitetura de Informação Detalhada"], steps: [{ title: "Briefing Aprofundado", description: "Workshop completo para mapear todas as necessidades digitais." }, { title: "Sitemap e Navegação", description: "Definição de todas as páginas, subpáginas e fluxos de navegação." }, { title: "Arquitetura Detalhada", description: "Estruturação completa de conteúdo para cada página." }, { title: "Levantamento Extensivo", description: "Lista de todos os materiais necessários para o projeto." }] },
      { title: "Fase 2: Design e Prototipagem Visual", subtitle: "Design Premium para Cada Página", objective: "Desenvolver o design completo de todas as páginas com navegação complexa.", deliverables: ["Design de Todas as Páginas", "Sistema de Navegação Complexo", "Versão Mobile Detalhada"], steps: [{ title: "Design da Home", description: "Página principal com design premium e hierarquia avançada." }, { title: "Páginas Internas", description: "Design de cada página interna com consistência e identidade." }, { title: "Navegação Complexa", description: "Menu multi-nível, breadcrumbs e navegação contextual." }, { title: "Mobile e Responsividade", description: "Adaptação detalhada para todos os dispositivos." }] },
      { title: "Fase 3: Desenvolvimento e Construção", subtitle: "Construindo o Ecossistema Digital", objective: "Desenvolver todas as páginas com funcionalidades avançadas e otimização máxima.", deliverables: ["Site Completo Funcional", "Funcionalidades Avançadas", "SEO Avançado"], steps: [{ title: "Construção", description: "Desenvolvimento pixel-perfect de todas as páginas." }, { title: "Funcionalidades Avançadas", description: "Formulários complexos, integrações, automações e recursos especiais." }, { title: "Animações e Interações", description: "Scroll animations, lazy loading e microinterações." }, { title: "SEO Avançado", description: "Schema markup, Open Graph, sitemap XML e otimização completa." }] },
      { title: "Fase 4: Revisão e Ajustes", subtitle: "QA Completo", objective: "Testar extensivamente e refinar o site.", deliverables: ["Site Aprovado", "QA Completo"], steps: [{ title: "Feedback", description: "1 rodada de revisão inclusa." }, { title: "QA Extensivo", description: "Testes em todos os dispositivos, navegadores e funcionalidades." }, { title: "Revisão", description: "Verificação final completa." }, { title: "Aprovação", description: "Validação do cliente." }] },
      { title: "Fase 5: Publicação e Entrega", subtitle: "Ativação do Ecossistema Digital", objective: "Publicar e entregar com documentação completa e orientações de gestão.", deliverables: ["Site Publicado", "Documentação Completa", "Orientações de Gestão"], steps: [{ title: "Publicação", description: "Deploy completo com configuração técnica." }, { title: "Testes Finais", description: "Verificação pós-deploy extensiva." }, { title: "Documentação", description: "Manual de acesso e gestão do site." }, { title: "Encerramento", description: "Entrega formal e capacitação do cliente." }] },
    ],
    schedule: [
      { title: "Fase 1: Briefing", realDeadline: "3-4 dias úteis", clientDeadline: "4-5 dias úteis", days: [{ day: "Dia 1-3 (2h dedicadas/dia)", tasks: ["Workshop de briefing + sitemap + arquitetura completa"] }] },
      { title: "Fase 2: Design", realDeadline: "7-10 dias úteis", clientDeadline: "9-12 dias úteis", days: [{ day: "Dia 4-12 (2-3h dedicadas/dia)", tasks: ["Design de todas as páginas + navegação + mobile"] }, { day: "Dia 13 (1h)", tasks: ["Apresentação"], note: "Aguardando aprovação: 48-72h" }] },
      { title: "Fase 3: Desenvolvimento", realDeadline: "8-12 dias úteis", clientDeadline: "8-12 dias úteis", days: [{ day: "Dia 14-24 (2-3h dedicadas/dia)", tasks: ["Construção de todas as páginas + funcionalidades avançadas + SEO"] }] },
      { title: "Fase 4: Revisão", realDeadline: "3-4 dias úteis", clientDeadline: "4-5 dias úteis", days: [{ day: "Dia 25-27 (2h dedicadas/dia)", tasks: ["QA extensivo + feedback + aprovação"] }] },
      { title: "Fase 5: Publicação", realDeadline: "1-2 dias úteis", clientDeadline: "1-2 dias úteis", days: [{ day: "Dia 28 (2h)", tasks: ["Publicação + documentação + entrega formal"] }] },
    ],
    totalDeadline: { real: "22-32 dias úteis", client: "26-36 dias úteis" },
  },

  "Personal Brand Kit": {
    serviceKey: "Personal Brand Kit",
    title: "Personal Brand Kit",
    subtitle: "Identidade Pessoal de Marca para Criadores de Conteúdo",
    date: "Março, 2026",
    introduction:
      "O Personal Brand Kit foi desenvolvido pelo Studio Kiiro para criadores de conteúdo, influenciadores e profissionais que constroem sua audiência usando o próprio nome como marca. Mais do que um logotipo, entregamos um sistema visual completo e pronto para usar, que transforma sua presença digital em uma marca reconhecível, consistente e profissional em todos os canais onde você aparece.",
    principles: [
      { title: "Autenticidade Visual", description: "O sistema deve refletir quem a pessoa realmente é, não uma versão corporativa de si mesma." },
      { title: "Praticidade Digital", description: "Tudo pensado para uso imediato nas redes sociais, sem depender de um designer para o dia a dia." },
      { title: "Consistência sem Engessamento", description: "O sistema dá liberdade criativa dentro de uma identidade reconhecível." },
      { title: "Conexão Emocional", description: "A estética deve atrair o público certo e repelir o público errado naturalmente." },
      { title: "Entrega Completa", description: "O criador recebe tudo que precisa para começar a publicar profissionalmente no mesmo dia." },
    ],
    phases: [
      {
        title: "Fase 1: Imersão e Descoberta Pessoal",
        subtitle: "Entendendo Quem Você É Como Marca",
        objective: "Mergulhar na essência da pessoa, compreendendo sua personalidade, seus valores, seu público, sua estética natural e como ela quer ser percebida no ambiente digital.",
        deliverables: ["Briefing Personal Brand Preenchido e Validado", "Mapa de Personalidade Visual", "Análise de Referências Aprovadas"],
        steps: [
          { title: "Reunião de Descoberta Pessoal", description: "Sessão de alinhamento aprofundada focada na pessoa: quem ela é, o que a torna única, seus valores inegociáveis, nicho, público-alvo e sentimento que sua presença visual deve provocar." },
          { title: "Análise do Perfil Digital Atual", description: "Investigação da presença digital existente, analisando perfis, tipo de conteúdo, estética atual e feedbacks do público." },
          { title: "Mapeamento do Público e Concorrência", description: "Análise dos criadores do mesmo nicho, identificando padrões estéticos e oportunidades de diferenciação visual." },
          { title: "Construção do Mapa de Personalidade Visual", description: "Definição do território visual em três eixos: quem o cliente é, para quem cria e como quer aparecer." },
        ],
      },
      {
        title: "Fase 2: Direção Visual e Moodboard",
        subtitle: "Traduzindo Personalidade em Estética",
        objective: "Transformar o mapa de personalidade em uma direção visual concreta e aprovada.",
        deliverables: ["2 Moodboards Editoriais com Direção Visual", "Paleta de Cores Preliminar", "Referências Tipográficas", "Direção Visual Aprovada"],
        steps: [
          { title: "Criação dos Moodboards Editoriais", description: "Dois painéis visuais editoriais distintos, cada um com imagens de referência, paleta de cores, tipografia e atmosfera visual." },
          { title: "Definição de Paleta de Cores Pessoal", description: "Paleta de 4-6 cores que refletem a personalidade, testadas para contraste e legibilidade em telas." },
          { title: "Seleção de Referências Tipográficas", description: "Curadoria de combinações tipográficas disponíveis no Canva para autonomia do cliente." },
          { title: "Apresentação e Aprovação", description: "Apresentação dos moodboards com a lógica estética e estratégica para escolha da direção." },
        ],
      },
      {
        title: "Fase 3: Criação do Logo e Sistema Visual",
        subtitle: "Construindo a Identidade que Representa Você",
        objective: "Desenvolver o logo pessoal e todos os elementos do sistema visual com base na direção aprovada.",
        deliverables: ["2 Propostas de Logo Pessoal com Rationale", "Sistema de Cores Finalizado (HEX e RGB)", "Sistema Tipográfico Digital", "Elemento Gráfico de Apoio", "Versão Circular para Foto de Perfil"],
        steps: [
          { title: "Esboços e Exploração do Logo Pessoal", description: "Sketches testando tratamentos tipográficos, monogramas, assinaturas estilizadas e combinações com elemento gráfico." },
          { title: "Desenvolvimento das Duas Propostas", description: "Duas propostas completas com versão principal, versão circular para perfil e versões P&B." },
          { title: "Sistema Visual Completo", description: "Paleta de cores com HEX e RGB, sistema tipográfico para títulos e corpo, elemento gráfico de apoio." },
          { title: "Apresentação com Mockups", description: "Propostas aplicadas em mockup de perfil, feed simulado, stories e post estático." },
        ],
      },
      {
        title: "Fase 4: Templates de Canva e Mockups",
        subtitle: "Entregando as Ferramentas para o Dia a Dia",
        objective: "Criar os 5 templates prontos no Canva e os mockups de apresentação final.",
        deliverables: ["5 Templates Prontos e Editáveis no Canva", "Mockup de Feed com 9 Posts Simulados", "Mockup de Perfil do Instagram Finalizado"],
        steps: [
          { title: "Criação dos Templates no Canva", description: "5 templates editáveis: 2 posts estáticos, 1 carrossel (capa + slide), 1 story e 1 highlight cover." },
          { title: "Configuração de Compartilhamento", description: "Templates compartilhados via link que copia automaticamente para a conta do cliente." },
          { title: "Mockup de Feed Final", description: "Grid de 9 posts simulados com conteúdos fictícios coerentes com o nicho do cliente." },
          { title: "Envio para Revisão", description: "Apresentação dos templates e mockup de feed para feedback do cliente." },
        ],
      },
      {
        title: "Fase 5: Mini-guia e Entrega Final",
        subtitle: "O Manual que Você Vai Querer Ler",
        objective: "Criar o mini-guia editorial e entregar o pacote completo de forma organizada.",
        deliverables: ["Mini-guia de Identidade Pessoal (12-16 páginas)", "Pasta Completa de Arquivos do Logo", "Templates do Canva Compartilhados", "Documento Leia-me"],
        steps: [
          { title: "Diagramação do Mini-guia Editorial", description: "Mini-guia no formato de lookbook da marca pessoal: capa, apresentação, logo, paleta, fontes, elemento gráfico, orientações de uso, feed e links." },
          { title: "Aplicação de Feedback", description: "Máximo 1 rodada de revisão inclusa no projeto." },
          { title: "Organização do Pacote Final", description: "Pasta completa com arquivos do logo em todos os formatos, templates via Canva, mini-guia em PDF e documento Leia-me." },
          { title: "Entrega Formal", description: "Compartilhamento via nuvem com email de encerramento e solicitação de depoimento." },
        ],
      },
    ],
    schedule: [
      {
        title: "Fase 1: Imersão e Descoberta Pessoal",
        realDeadline: "2-3 dias úteis",
        clientDeadline: "3-4 dias úteis",
        days: [
          { day: "Dia 1 (2h dedicadas)", tasks: ["Reunião de descoberta pessoal (1h-1h30)"], note: "Prazo pausado aguardando briefing completo: 24h" },
          { day: "Dia 2 (2h dedicadas)", tasks: ["Análise do perfil digital atual do cliente", "Análise de 5-8 criadores do mesmo nicho"] },
          { day: "Dia 3 (1h dedicada)", tasks: ["Construção do Mapa de Personalidade Visual", "Envio do mapa para validação"], note: "Prazo pausado aguardando validação: 24h", aiTips: ["ChatGPT/Claude para construção do mapa de personalidade", "Perplexity para pesquisa de tendências do nicho", "Midjourney para primeiros testes de referências visuais"] },
        ],
      },
      {
        title: "Fase 2: Direção Visual e Moodboard",
        realDeadline: "2-3 dias úteis",
        clientDeadline: "3-4 dias úteis",
        days: [
          { day: "Dia 1-2 (2-3h dedicadas/dia)", tasks: ["Criação dos 2 moodboards editoriais", "Cada um com nome da direção, imagens, paleta, tipografia, atmosfera e rationale"] },
          { day: "Dia 3 (1h dedicada)", tasks: ["Apresentação ao cliente (45min)"], note: "Prazo pausado aguardando aprovação: 48h", aiTips: ["Midjourney para imagens editoriais", "Adobe Color para teste de paletas", "ChatGPT para descrições dos moodboards"] },
        ],
      },
      {
        title: "Fase 3: Criação do Logo e Sistema Visual",
        realDeadline: "4-5 dias úteis",
        clientDeadline: "6-7 dias úteis",
        days: [
          { day: "Dia 1 (2h dedicadas)", tasks: ["Esboços e exploração do logo pessoal", "Mínimo 15 thumbnails de abordagens"] },
          { day: "Dia 2-3 (2-3h dedicadas/dia)", tasks: ["Desenvolvimento digital da Proposta A", "Logo principal + versão circular + monocromática"] },
          { day: "Dia 4 (2h dedicadas)", tasks: ["Desenvolvimento digital da Proposta B", "Criação do elemento gráfico de apoio"] },
          { day: "Dia 5 (2h dedicadas)", tasks: ["Criação dos mockups de apresentação", "Apresentação ao cliente (1h)"], note: "Prazo pausado aguardando escolha: 48-72h", aiTips: ["Midjourney para tratamentos tipográficos", "Adobe Firefly para variações", "ChatGPT para storytelling da apresentação"] },
        ],
      },
      {
        title: "Fase 4: Templates de Canva e Mockups",
        realDeadline: "2-3 dias úteis",
        clientDeadline: "3-4 dias úteis",
        days: [
          { day: "Dia 1-2 (3h dedicadas/dia)", tasks: ["Criação dos 5 templates no Canva", "Post Layout A + Post Layout B + Carrossel + Story + Highlight Cover"] },
          { day: "Dia 3 (2h dedicadas)", tasks: ["Mockup de feed final (9 posts simulados)", "Mockup de perfil completo do Instagram"], note: "Aguardando feedback: 48h", aiTips: ["ChatGPT para textos fictícios coerentes com o nicho", "Midjourney para imagens de referência dos mockups"] },
        ],
      },
      {
        title: "Fase 5: Mini-guia e Entrega Final",
        realDeadline: "2-3 dias úteis",
        clientDeadline: "3-4 dias úteis",
        days: [
          { day: "Dia 1 (1h dedicada)", tasks: ["Aplicação do feedback (máximo 1 rodada)"] },
          { day: "Dia 1-2 (3h dedicadas)", tasks: ["Diagramação do mini-guia editorial (12-16 páginas)", "Capa, logo, paleta, fontes, elemento, orientações, feed, templates, contracapa"] },
          { day: "Dia 3 (2h dedicadas)", tasks: ["Exportação completa de todos os arquivos", "Revisão técnica final", "Entrega via plataforma de nuvem", "Email profissional de encerramento + solicitação de depoimento"] },
        ],
      },
    ],
    totalDeadline: { real: "12-17 dias úteis", client: "18-23 dias úteis" },
  },

  "Apresentações Comerciais e Institucionais": {
    serviceKey: "Apresentações Comerciais e Institucionais",
    title: "Apresentações Comerciais e Institucionais",
    subtitle: "Comunicação com Autoridade, Fluidez e Identidade",
    date: "Março, 2026",
    introduction:
      "Nossa metodologia para criação de apresentações vai além dos slides estáticos. Desenvolvemos materiais imersivos, com animações estratégicas, hierarquia visual apurada e design de alto impacto, para que cada apresentação comunique com autoridade, fluidez e identidade. Seja para uma empresa, profissional, projeto social ou organização religiosa, o resultado é uma apresentação que não apenas informa: ela impressiona.",
    principles: [
      { title: "Narrativa Visual", description: "A história conduz o design, não o contrário." },
      { title: "Movimento com Propósito", description: "Animações existem para guiar o olhar, não para decorar." },
      { title: "Hierarquia Clara", description: "O que é mais importante chega primeiro, sempre." },
      { title: "Identidade Coerente", description: "Cada slide reflete a marca ou projeto com consistência." },
      { title: "Objetividade Imersiva", description: "Informação densa transformada em visual leve, dinâmico e memorável." },
    ],
    phases: [
      {
        title: "Fase 1: Briefing, Conteúdo e Estrutura Narrativa",
        subtitle: "Entendendo o Propósito e Organizando a Narrativa",
        objective: "Entender o propósito, o público e organizar o conteúdo em uma narrativa clara antes de qualquer design.",
        deliverables: [
          "Briefing de apresentação preenchido",
          "Mapa de conteúdo (estrutura narrativa dos slides)",
          "Definição do nível de animação (sutil, médio ou imersivo)",
        ],
        steps: [
          { title: "Briefing e Coleta de Materiais", description: "Reunião ou questionário cobrindo: objetivo, público-alvo, tom de comunicação, identidade visual existente, número estimado de slides e contexto de uso (projetada ao vivo, enviada por link, impressa, publicada em redes). Recebimento dos materiais do cliente." },
          { title: "Definição do Nível de Animação", description: "Sutil: transições suaves e entrada de elementos. Médio: animações por bloco, gráficos animados. Imersivo: slides em camadas, storytelling cinematográfico, motion design." },
          { title: "Mapa Narrativo", description: "Organização do conteúdo em estrutura narrativa (introdução, desenvolvimento, clímax, chamada para ação ou encerramento). Envio ao cliente para validação." },
        ],
      },
      {
        title: "Fase 2: Conceito Visual e Estilo",
        subtitle: "Definindo a Linguagem Visual e o Estilo de Animação",
        objective: "Definir a linguagem visual e o estilo de animação antes de produzir os slides, garantindo coerência e intenção em cada detalhe.",
        deliverables: [
          "Styleframe aprovado (capa + 1 slide interno de referência)",
          "Paleta de cores, tipografia e elementos visuais definidos",
          "Definição do estilo de animação (referência de movimento, tempo, easing)",
        ],
        steps: [
          { title: "Extração ou Criação de Identidade Visual", description: "Se o cliente tem identidade visual: extração de cores, fontes e padrões existentes. Se não tem: proposta de paleta e tipografia coerente com o tom, setor e público." },
          { title: "Criação do Styleframe", description: "Desenvolvimento de 1 styleframe (capa + slide de conteúdo) como referência visual e de movimento." },
          { title: "Definição do Estilo de Animação", description: "Velocidade das transições, tipo de entrada dos elementos (fade, slide, scale, wipe), uso de partículas, backgrounds dinâmicos ou vídeos de fundo se aplicável. Envio para aprovação." },
        ],
      },
      {
        title: "Fase 3: Produção dos Slides com Animações",
        subtitle: "Montagem Completa com Design Imersivo",
        objective: "Montar todos os slides com design imersivo e animações estratégicas, com base no mapa e no styleframe aprovados.",
        deliverables: [
          "Apresentação completa animada (versão para revisão)",
          "Arquivo no formato combinado (PowerPoint animado, Google Slides ou Keynote)",
        ],
        steps: [
          { title: "Produção Sequencial dos Slides", description: "Produção dos slides seguindo o mapa narrativo, aplicação da identidade visual, criação de animações por camada: entrada de título, texto, imagem/ícone e transições entre slides." },
          { title: "Infográficos e Elementos Visuais", description: "Desenvolvimento de infográficos animados (gráficos de barra, pizza, linha com animação de construção), tratamento de imagens e criação de elementos visuais próprios." },
          { title: "Slides de Impacto e Revisão Interna", description: "Criação de slides de citação, dado único em destaque, encerramento com CTA. Revisão interna de fluidez, timing das animações e legibilidade antes de enviar." },
          { title: "Envio para Revisão", description: "Exportação da versão de revisão e envio ao cliente com link de visualização." },
        ],
      },
      {
        title: "Fase 4: Revisão e Ajustes",
        subtitle: "Feedback Estruturado sem Perder Coerência",
        objective: "Aplicar o feedback do cliente de forma estruturada, ajustando conteúdo, design e animações sem perder a coerência visual.",
        deliverables: ["Apresentação revisada e aprovada"],
        steps: [
          { title: "1ª Rodada de Revisão", description: "Ajustes de texto, layout, cor, animações e ordem dos slides conforme feedback. Reenvio para aprovação final." },
          { title: "2ª Rodada de Revisão (se necessário)", description: "Aplicação de ajustes adicionais. Limite: 2 rodadas de revisão inclusas. Rodadas adicionais = custo extra definido em contrato." },
        ],
      },
      {
        title: "Fase 5: Finalização e Entrega",
        subtitle: "Arquivos Organizados e Prontos para Uso",
        objective: "Entregar os arquivos organizados, nos formatos corretos, com as animações preservadas e orientações de uso.",
        deliverables: [
          "Arquivo editável com animações (PowerPoint, Keynote ou Google Slides)",
          "Versão em PDF estática",
          "Versão exportada em vídeo MP4 (opcional)",
        ],
        steps: [
          { title: "Checklist de Qualidade Final", description: "Animações fluidas e sem travamentos? Fontes incorporadas corretamente? Imagens em resolução adequada? Versões exportadas (PDF + MP4 se aplicável)? Arquivo nomeado e organizado?" },
          { title: "Entrega Formal", description: "Entrega via link em nuvem + e-mail profissional. Orientação rápida ao cliente sobre como editar o arquivo com segurança (o que pode editar sem quebrar as animações)." },
          { title: "Encerramento", description: "Solicitação de depoimento/avaliação." },
        ],
      },
    ],
    schedule: [
      {
        title: "Fase 1: Briefing, Conteúdo e Estrutura Narrativa",
        realDeadline: "1-2 dias úteis",
        clientDeadline: "2-3 dias úteis",
        days: [
          { day: "Dia 1 (1h30 dedicada)", tasks: ["Reunião ou questionário de briefing", "Recebimento dos materiais do cliente", "Definição do nível de animação desejado"], aiTips: ["ChatGPT/Claude para reorganizar textos densos em bullets objetivos e impactantes", "ChatGPT para sugerir estrutura narrativa com base no objetivo e público"] },
          { day: "Dia 2 (1h dedicada)", tasks: ["Organização do conteúdo em mapa narrativo", "Envio do mapa ao cliente para validação"], note: "Prazo pausado aguardando aprovação do mapa: 24h" },
        ],
      },
      {
        title: "Fase 2: Conceito Visual e Estilo",
        realDeadline: "1-2 dias úteis",
        clientDeadline: "2-3 dias úteis",
        days: [
          { day: "Dia 3 (1-2h dedicadas)", tasks: ["Extração ou criação de identidade visual", "Criação de 1 styleframe (capa + slide de conteúdo)", "Definição do estilo de animação", "Envio para aprovação do cliente"], note: "Prazo pausado aguardando aprovação do styleframe: 24h", aiTips: ["Midjourney/Firefly para testar backgrounds, composições e atmosferas visuais", "ChatGPT para sugerir paletas coerentes com o setor e posicionamento"] },
        ],
      },
      {
        title: "Fase 3: Produção dos Slides com Animações",
        realDeadline: "3-4 dias úteis",
        clientDeadline: "4-5 dias úteis",
        days: [
          { day: "Dia 4-6 (2-3h dedicadas/dia)", tasks: ["Produção dos slides em sequência seguindo o mapa narrativo", "Aplicação da identidade visual em todos os slides", "Criação de animações por camada", "Desenvolvimento de infográficos animados", "Tratamento de imagens e criação de elementos visuais", "Criação de slides de impacto", "Revisão interna de fluidez e timing"], aiTips: ["ChatGPT para condensar textos longos em frases curtas e de impacto", "Midjourney para imagens de apoio e backgrounds", "Adobe Firefly para elementos gráficos e texturas de fundo"] },
          { day: "Dia 7", tasks: ["Exportação da versão de revisão", "Envio ao cliente com link de visualização"], note: "Prazo pausado aguardando feedback: 48h" },
        ],
      },
      {
        title: "Fase 4: Revisão e Ajustes",
        realDeadline: "1-2 dias úteis",
        clientDeadline: "2-3 dias úteis",
        days: [
          { day: "Dia 8 (1-2h dedicadas)", tasks: ["Aplicação da 1ª rodada de revisão", "Reenvio para aprovação final"], note: "Aguardando aprovação: 24h" },
          { day: "Dia 9 (se necessário)", tasks: ["Aplicação da 2ª rodada de revisão"], note: "LIMITE: 2 rodadas de revisão inclusas. Rodadas adicionais = custo extra." },
        ],
      },
      {
        title: "Fase 5: Finalização e Entrega",
        realDeadline: "1 dia útil",
        clientDeadline: "1-2 dias úteis",
        days: [
          { day: "Dia 10 (1-1h30 dedicada)", tasks: ["Checklist de qualidade final", "Entrega formal via link em nuvem + e-mail profissional", "Orientação ao cliente sobre edição segura do arquivo", "Solicitação de depoimento/avaliação"] },
        ],
      },
    ],
    totalDeadline: { real: "8-10 dias úteis", client: "12-14 dias úteis" },
  },
};

// List of all available service keys for navigation
export const availableMethodologies = Object.keys(methodologyContent);
