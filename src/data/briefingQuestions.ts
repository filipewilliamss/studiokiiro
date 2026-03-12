// Briefing questions per project type — auto-selected based on project type

export interface BriefingQuestion {
  id: string;
  question: string;
  type: "text" | "textarea" | "select";
  options?: string[];
  required?: boolean;
}

const commonBrandQuestions: BriefingQuestion[] = [
  { id: "company_name", question: "Qual o nome da empresa/marca?", type: "text", required: true },
  { id: "segment", question: "Qual o segmento de atuação?", type: "text", required: true },
  { id: "target_audience", question: "Quem é o público-alvo? (idade, perfil, interesses)", type: "textarea", required: true },
  { id: "competitors", question: "Quais são seus principais concorrentes?", type: "textarea" },
  { id: "differentials", question: "Quais são os diferenciais da sua marca/empresa?", type: "textarea", required: true },
  { id: "brand_personality", question: "Se sua marca fosse uma pessoa, como ela seria? (ex: sofisticada, divertida, minimalista, ousada)", type: "textarea" },
  { id: "colors_preference", question: "Tem preferência ou restrição de cores?", type: "textarea" },
  { id: "references", question: "Tem referências visuais que admira? (pode citar marcas, links ou estilos)", type: "textarea" },
  { id: "avoid", question: "Existe algo que você NÃO quer na identidade? (estilos, cores, elementos)", type: "textarea" },
];

const commonVideoQuestions: BriefingQuestion[] = [
  { id: "video_objective", question: "Qual o objetivo do vídeo?", type: "textarea", required: true },
  { id: "target_audience", question: "Quem é o público-alvo do vídeo?", type: "textarea", required: true },
  { id: "platform", question: "Em qual plataforma o vídeo será publicado?", type: "text", required: true },
  { id: "duration", question: "Qual a duração desejada?", type: "text" },
  { id: "style_reference", question: "Tem referências de estilo de edição que gosta? (links ou descrições)", type: "textarea" },
  { id: "music_preference", question: "Tem preferência de estilo de trilha sonora?", type: "textarea" },
  { id: "brand_elements", question: "Já possui identidade visual (logo, cores, fontes) para incluir no vídeo?", type: "select", options: ["Sim", "Não", "Parcialmente"] },
  { id: "subtitles", question: "O vídeo precisa de legendas?", type: "select", options: ["Sim", "Não"] },
  { id: "raw_material", question: "Como será enviado o material bruto? (Google Drive, WeTransfer, etc.)", type: "text" },
  { id: "additional_notes", question: "Observações adicionais ou informações importantes:", type: "textarea" },
];

const commonWebQuestions: BriefingQuestion[] = [
  { id: "company_name", question: "Qual o nome da empresa/marca?", type: "text", required: true },
  { id: "segment", question: "Qual o segmento de atuação?", type: "text", required: true },
  { id: "site_objective", question: "Qual o principal objetivo do site? (vender, apresentar serviços, captar leads, etc.)", type: "textarea", required: true },
  { id: "target_audience", question: "Quem é o público-alvo?", type: "textarea", required: true },
  { id: "has_domain", question: "Já possui domínio? Se sim, qual?", type: "text" },
  { id: "has_hosting", question: "Já possui hospedagem?", type: "select", options: ["Sim", "Não", "Não sei"] },
  { id: "has_brand", question: "Já possui identidade visual (logo, cores, fontes)?", type: "select", options: ["Sim", "Não", "Parcialmente"] },
  { id: "references", question: "Sites de referência que admira (pode citar links):", type: "textarea" },
  { id: "content_ready", question: "Já tem os textos e imagens para o site ou precisa de apoio?", type: "select", options: ["Tenho tudo pronto", "Tenho parcialmente", "Preciso de apoio"] },
  { id: "features", question: "Funcionalidades desejadas (formulário de contato, WhatsApp, galeria, blog, etc.):", type: "textarea" },
  { id: "competitors", question: "Quais são seus principais concorrentes online?", type: "textarea" },
  { id: "deadline_notes", question: "Tem alguma data limite ou urgência para o lançamento?", type: "text" },
  { id: "additional_notes", question: "Observações adicionais:", type: "textarea" },
];

export const briefingQuestions: Record<string, BriefingQuestion[]> = {
  "Logotipo Essencial": [
    ...commonBrandQuestions,
    { id: "has_symbol", question: "Deseja que o logotipo tenha algum símbolo/ícone ou apenas texto?", type: "select", options: ["Apenas texto (logotipo)", "Texto + símbolo", "Tanto faz, confio na direção criativa"] },
    { id: "usage", question: "Onde o logotipo será usado? (redes sociais, cartão de visita, fachada, etc.)", type: "textarea" },
    { id: "additional_notes", question: "Observações adicionais ou informações importantes:", type: "textarea" },
  ],
  "Identidade Visual": [
    ...commonBrandQuestions,
    { id: "has_logo", question: "Já possui logotipo? Se sim, deseja mantê-lo ou criar um novo?", type: "select", options: ["Não tenho", "Tenho e quero manter", "Tenho mas quero um novo"] },
    { id: "materials_needed", question: "Quais materiais precisa além do logo? (cartão de visita, papel timbrado, assinatura de e-mail, etc.)", type: "textarea" },
    { id: "brand_values", question: "Quais são os valores e missão da sua marca?", type: "textarea" },
    { id: "additional_notes", question: "Observações adicionais ou informações importantes:", type: "textarea" },
  ],
  "Branding Completo": [
    ...commonBrandQuestions,
    { id: "has_logo", question: "Já possui logotipo? Se sim, deseja mantê-lo ou criar um novo?", type: "select", options: ["Não tenho", "Tenho e quero manter", "Tenho mas quero um novo"] },
    { id: "brand_values", question: "Quais são os valores, missão e visão da sua marca?", type: "textarea", required: true },
    { id: "brand_voice", question: "Como sua marca se comunica? (tom de voz: formal, descontraído, técnico, inspiracional)", type: "textarea" },
    { id: "materials_needed", question: "Quais materiais/aplicações precisa? (papelaria, redes sociais, embalagens, uniformes, fachada, etc.)", type: "textarea" },
    { id: "growth_plans", question: "Quais os planos de crescimento da marca para os próximos meses/anos?", type: "textarea" },
    { id: "additional_notes", question: "Observações adicionais ou informações importantes:", type: "textarea" },
  ],
  "Manual de Logotipo": [
    { id: "company_name", question: "Qual o nome da empresa/marca?", type: "text", required: true },
    { id: "has_files", question: "Possui os arquivos originais do logotipo? (AI, EPS, SVG, etc.)", type: "select", options: ["Sim, tenho os arquivos editáveis", "Tenho apenas PNG/JPG", "Não tenho certeza"], required: true },
    { id: "has_colors", question: "Já tem as cores definidas com códigos? (HEX, RGB, CMYK)", type: "select", options: ["Sim", "Não", "Parcialmente"] },
    { id: "has_typography", question: "Sabe quais fontes são usadas no logotipo?", type: "select", options: ["Sim", "Não"] },
    { id: "usage_contexts", question: "Em quais contextos o logotipo é mais usado? (digital, impresso, fachada, veículo, etc.)", type: "textarea" },
    { id: "additional_notes", question: "Observações adicionais ou informações importantes:", type: "textarea" },
  ],
  "Design de Conteúdo para Redes Sociais": [
    { id: "company_name", question: "Qual o nome da empresa/marca?", type: "text", required: true },
    { id: "segment", question: "Qual o segmento de atuação?", type: "text", required: true },
    { id: "platforms", question: "Em quais redes sociais o conteúdo será publicado?", type: "textarea", required: true },
    { id: "target_audience", question: "Quem é o público-alvo?", type: "textarea", required: true },
    { id: "has_brand", question: "Já possui identidade visual (logo, cores, fontes)?", type: "select", options: ["Sim", "Não", "Parcialmente"], required: true },
    { id: "content_types", question: "Que tipos de peças precisa? (posts estáticos, carrosséis, stories, capas, etc.)", type: "textarea", required: true },
    { id: "quantity", question: "Quantas peças precisa aproximadamente?", type: "text" },
    { id: "content_pillars", question: "Quais são os pilares de conteúdo da marca? (educativo, bastidores, venda, depoimentos, etc.)", type: "textarea" },
    { id: "style_reference", question: "Tem referências de estilo visual para as redes? (links ou @perfis)", type: "textarea" },
    { id: "brand_voice", question: "Qual o tom de voz da marca nas redes? (descontraído, profissional, inspiracional)", type: "textarea" },
    { id: "additional_notes", question: "Observações adicionais:", type: "textarea" },
  ],
  "Edição de Vídeo — Reels/Shorts": commonVideoQuestions,
  "Edição de Vídeo — Institucional": commonVideoQuestions,
  "Edição de Vídeo — Tutorial/Educativo": commonVideoQuestions,
  "Landing Page Simples": commonWebQuestions,
  "Landing Page Completa": commonWebQuestions,
  "Site Institucional": [
    ...commonWebQuestions,
    { id: "pages", question: "Quais páginas o site deve ter? (Home, Sobre, Serviços, Contato, Blog, etc.)", type: "textarea", required: true },
  ],
  "Site Completo": [
    ...commonWebQuestions,
    { id: "pages", question: "Quais páginas o site deve ter? (Home, Sobre, Serviços, Portfólio, Blog, Contato, etc.)", type: "textarea", required: true },
    { id: "integrations", question: "Precisa de integrações específicas? (pagamentos, agendamentos, CRM, etc.)", type: "textarea" },
  ],
};
