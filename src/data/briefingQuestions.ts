// Briefing questions per project type — auto-selected based on project type

export interface BriefingQuestion {
  id: string;
  question: string;
  type: "text" | "textarea" | "select" | "checkbox" | "email" | "phone" | "section";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  /** If true, show a text input when specific options containing "→" are selected */
  hasConditionalText?: boolean;
}

// ==========================================
// BRIEFING 01 — LOGOTIPO ESSENCIAL
// ==========================================
const logotipoEssencial: BriefingQuestion[] = [
  { id: "s1", question: "Seção 1: Sobre o Negócio", type: "section" },
  { id: "brand_name", question: "Qual é o nome exato da marca?", type: "text", required: true },
  { id: "tagline", question: "Existe tagline ou slogan que deve aparecer junto ao logotipo?", type: "select", options: ["Sim", "Não"], hasConditionalText: true },
  { id: "segment", question: "Qual é o segmento ou área de atuação do negócio?", type: "text", required: true },
  { id: "business_description", question: "Descreva brevemente o que sua empresa faz e qual problema resolve para seus clientes:", type: "textarea", required: true },
  { id: "business_age", question: "Há quanto tempo o negócio existe?", type: "select", options: ["Estou abrindo agora", "Menos de 1 ano", "Entre 1 e 3 anos", "Mais de 3 anos"], required: true },

  { id: "s2", question: "Seção 2: Público e Posicionamento", type: "section" },
  { id: "ideal_client", question: "Quem é o seu cliente ideal? Descreva com o máximo de detalhes possível:", type: "textarea", required: true, placeholder: "Ex: Mulheres entre 30-45 anos, classe B, que valorizam produtos naturais e sustentáveis" },
  { id: "positioning", question: "Qual é o posicionamento desejado para a marca?", type: "select", options: ["Premium / Luxo", "Intermediário / Acessível com qualidade", "Popular / Democrático", "Técnico / Especialista", "Outro"], hasConditionalText: true },
  { id: "competitors", question: "Quais são os 3 principais concorrentes diretos da sua marca?", type: "textarea", placeholder: "Inclua o nome e o site se possível" },
  { id: "differentials", question: "O que diferencia sua marca dos concorrentes?", type: "textarea", required: true },

  { id: "s3", question: "Seção 3: Identidade e Personalidade da Marca", type: "section" },
  { id: "brand_personality", question: "Se sua marca fosse uma pessoa, como ela seria? Escolha as características que mais combinam:", type: "checkbox", options: ["Séria e profissional", "Descontraída e acessível", "Sofisticada e elegante", "Jovem e moderna", "Tradicional e confiável", "Criativa e inovadora", "Direta e objetiva", "Outro"] },
  { id: "emotions", question: "Quais emoções ou sensações seu logotipo deve provocar instantaneamente em quem o vê?", type: "textarea", placeholder: "Ex: Confiança, sofisticação, leveza, energia, exclusividade" },
  { id: "avoid", question: "Existe alguma cor ou estilo visual que você definitivamente NÃO quer no seu logotipo?", type: "textarea" },
  { id: "logo_style", question: "Você tem alguma preferência de estilo para o logotipo?", type: "select", options: ["Símbolo + Nome (ícone ao lado ou acima do nome)", "Apenas o nome (logotipo tipográfico)", "Monograma (iniciais da marca)", "Mascote ou ilustração", "Sem preferência — confio na sua direção criativa", "Outro"], hasConditionalText: true },

  { id: "s4", question: "Seção 4: Referências Visuais", type: "section" },
  { id: "liked_references", question: "Cole aqui links ou descreva até 3 logotipos que você admira visualmente e por quê:", type: "textarea", placeholder: "Não precisam ser do mesmo setor. O importante é o estilo visual que te atrai" },
  { id: "disliked_references", question: "Cole aqui links ou descreva até 3 logotipos que você NÃO gosta e por quê:", type: "textarea" },

  { id: "s5", question: "Seção 5: Aplicações e Contexto", type: "section" },
  { id: "usage_media", question: "Em quais mídias o logotipo será mais utilizado? (Selecione todas que se aplicam)", type: "checkbox", options: ["Instagram e redes sociais", "Site ou landing page", "Cartão de visita", "Papel timbrado e documentos", "Embalagens ou rótulos", "Fachada ou sinalização", "Camisetas ou uniformes", "Brindes", "Outro"] },
  { id: "additional_notes", question: "Existe alguma informação adicional que considera importante para a criação do seu logotipo?", type: "textarea" },

  { id: "s6", question: "Seção 6: Dados para Contato", type: "section" },
  { id: "contact_name", question: "Nome completo:", type: "text", required: true },
  { id: "contact_email", question: "E-mail para contato:", type: "email", required: true },
  { id: "contact_phone", question: "WhatsApp:", type: "phone", required: true },
  { id: "how_found", question: "Como você nos encontrou?", type: "select", options: ["Instagram", "Indicação de amigo ou cliente", "Google", "LinkedIn", "Outro"], hasConditionalText: true },
];

// ==========================================
// BRIEFING 02 — IDENTIDADE VISUAL
// ==========================================
const identidadeVisual: BriefingQuestion[] = [
  { id: "s1", question: "Seção 1: Sobre o Negócio", type: "section" },
  { id: "brand_name", question: "Qual é o nome exato da marca?", type: "text", required: true },
  { id: "tagline", question: "Existe tagline ou slogan?", type: "select", options: ["Sim", "Não", "Ainda não tenho mas gostaria de desenvolver"], hasConditionalText: true },
  { id: "segment", question: "Qual é o segmento ou área de atuação do negócio?", type: "text", required: true },
  { id: "business_description", question: "Descreva com profundidade o que sua empresa faz, qual problema resolve e qual transformação entrega aos clientes:", type: "textarea", required: true },
  { id: "brand_story", question: "Qual é a história ou propósito por trás da criação da marca?", type: "textarea" },
  { id: "business_age", question: "Há quanto tempo o negócio existe?", type: "select", options: ["Estou abrindo agora", "Menos de 1 ano", "Entre 1 e 3 anos", "Mais de 3 anos"] },

  { id: "s2", question: "Seção 2: Público e Posicionamento", type: "section" },
  { id: "ideal_client", question: "Descreva detalhadamente o perfil do seu cliente ideal:", type: "textarea", required: true, placeholder: "Idade, gênero, classe social, estilo de vida, valores, onde consome conteúdo, o que o motiva a comprar" },
  { id: "unwanted_client", question: "Quem você NÃO quer atrair com sua marca? Descreva o perfil de cliente que não é para você:", type: "textarea", placeholder: "Esta pergunta é tão importante quanto a anterior" },
  { id: "positioning", question: "Qual é o posicionamento desejado para a marca no mercado?", type: "select", options: ["Premium / Luxo", "Intermediário / Acessível com qualidade", "Popular / Democrático", "Técnico / Especialista", "Outro"], hasConditionalText: true },
  { id: "competitors", question: "Liste os 3 a 5 principais concorrentes diretos e indiretos da sua marca:", type: "textarea", placeholder: "Nome + site se possível" },
  { id: "differentials", question: "O que torna sua marca genuinamente diferente dos concorrentes?", type: "textarea", required: true },
  { id: "future_perception", question: "Em 10 anos, como você quer que sua marca seja percebida no mercado?", type: "textarea" },

  { id: "s3", question: "Seção 3: Personalidade e Valores da Marca", type: "section" },
  { id: "brand_values", question: "Quais são os 3 valores inegociáveis da sua marca?", type: "textarea", placeholder: "Ex: Transparência, Inovação, Cuidado com o cliente" },
  { id: "brand_persona", question: "Se sua marca fosse uma pessoa famosa ou um personagem, quem seria e por quê?", type: "textarea" },
  { id: "brand_personality", question: "Escolha os adjetivos que melhor descrevem a personalidade da sua marca:", type: "checkbox", options: ["Séria", "Descontraída", "Sofisticada", "Acessível", "Ousada", "Tradicional", "Inovadora", "Humana", "Técnica", "Criativa", "Confiável", "Exclusiva", "Outro"] },
  { id: "emotions", question: "Quais emoções sua identidade visual deve provocar instantaneamente?", type: "textarea" },
  { id: "avoid", question: "Existe alguma cor, estilo ou elemento visual que definitivamente NÃO deve fazer parte da sua identidade?", type: "textarea" },

  { id: "s4", question: "Seção 4: Referências Visuais", type: "section" },
  { id: "liked_references", question: "Cole links ou descreva até 5 marcas ou identidades visuais que você admira e explique por quê:", type: "textarea", placeholder: "Podem ser de qualquer setor" },
  { id: "disliked_references", question: "Cole links ou descreva até 3 marcas cujo visual você NÃO gosta e explique por quê:", type: "textarea" },
  { id: "color_preference", question: "Existe alguma paleta de cores que te atrai para a marca? Descreva ou cole referências:", type: "textarea" },

  { id: "s5", question: "Seção 5: Aplicações e Sistema Visual", type: "section" },
  { id: "usage_media", question: "Em quais mídias a identidade visual será mais aplicada? (Selecione todas que se aplicam)", type: "checkbox", options: ["Instagram e redes sociais", "Site ou landing page", "Cartão de visita", "Papel timbrado e documentos", "Embalagens ou rótulos", "Fachada ou sinalização", "Camisetas ou uniformes", "Apresentações e propostas", "Brindes e materiais promocionais", "Outro"] },
  { id: "existing_elements", question: "Você já possui algum elemento visual que deve ser mantido ou serve de referência?", type: "select", options: ["Sim", "Não, estou começando do zero"], hasConditionalText: true },
  { id: "additional_notes", question: "Existe alguma informação adicional relevante para o desenvolvimento da sua identidade visual?", type: "textarea" },

  { id: "s6", question: "Seção 6: Dados para Contato", type: "section" },
  { id: "contact_name", question: "Nome completo:", type: "text", required: true },
  { id: "contact_email", question: "E-mail para contato:", type: "email", required: true },
  { id: "contact_phone", question: "WhatsApp:", type: "phone", required: true },
  { id: "social_profile", question: "Site ou perfil nas redes sociais (se existir):", type: "text" },
  { id: "how_found", question: "Como você nos encontrou?", type: "select", options: ["Instagram", "Indicação de amigo ou cliente", "Google", "LinkedIn", "Outro"], hasConditionalText: true },
];

// ==========================================
// BRIEFING 03 — BRANDING COMPLETO
// ==========================================
const brandingCompleto: BriefingQuestion[] = [
  { id: "s1", question: "Seção 1: Sobre o Negócio e a Marca", type: "section" },
  { id: "brand_name", question: "Qual é o nome exato da marca?", type: "text", required: true },
  { id: "tagline", question: "Existe tagline ou slogan?", type: "select", options: ["Sim", "Não", "Quero desenvolver durante o projeto"], hasConditionalText: true },
  { id: "segment", question: "Qual é o segmento ou área de atuação?", type: "text", required: true },
  { id: "business_description", question: "Descreva profundamente o negócio: o que faz, qual problema resolve, qual transformação entrega e como gera valor para seus clientes:", type: "textarea", required: true },
  { id: "brand_purpose", question: "Qual é o propósito maior da marca? Por que ela existe além de gerar lucro?", type: "textarea", required: true },
  { id: "brand_story", question: "Qual é a história da criação da marca? Existe um ponto de virada ou uma motivação pessoal por trás dela?", type: "textarea" },
  { id: "business_age", question: "Há quanto tempo o negócio existe?", type: "select", options: ["Estou abrindo agora", "Menos de 1 ano", "Entre 1 e 3 anos", "Entre 3 e 10 anos", "Mais de 10 anos"] },

  { id: "s2", question: "Seção 2: Estratégia de Marca", type: "section" },
  { id: "brand_vision", question: "Qual é a visão da marca para os próximos 5 a 10 anos?", type: "textarea" },
  { id: "brand_values", question: "Quais são os 3 a 5 valores inegociáveis que guiam todas as decisões da marca?", type: "textarea", required: true },
  { id: "brand_mission", question: "Qual é a missão da marca em uma frase clara e objetiva?", type: "textarea" },
  { id: "perception_gap", question: "Como você quer que sua marca seja percebida versus como ela é percebida hoje?", type: "textarea" },
  { id: "brand_belief", question: "Existe alguma crença ou posicionamento forte que sua marca defende publicamente?", type: "textarea" },

  { id: "s3", question: "Seção 3: Público e Mercado", type: "section" },
  { id: "ideal_client", question: "Descreva com profundidade o perfil do seu cliente ideal:", type: "textarea", required: true, placeholder: "Idade, gênero, classe social, profissão, estilo de vida, valores, medos, desejos, como toma decisões de compra" },
  { id: "unwanted_client", question: "Quem você definitivamente NÃO quer como cliente? Descreva o perfil:", type: "textarea" },
  { id: "client_pains", question: "Quais são as principais dores e frustrações do seu cliente ideal que sua marca resolve?", type: "textarea" },
  { id: "competitors", question: "Liste os 5 principais concorrentes diretos e indiretos:", type: "textarea", placeholder: "Nome + site + o que fazem bem e o que fazem mal, na sua visão" },
  { id: "unique_factor", question: "O que torna sua marca genuinamente única e impossível de ser copiada?", type: "textarea", required: true },

  { id: "s4", question: "Seção 4: Personalidade e Comunicação da Marca", type: "section" },
  { id: "brand_persona", question: "Se sua marca fosse uma pessoa, descreva como ela seria em detalhes:", type: "textarea", placeholder: "Como ela se veste, como ela fala, o que ela lê, onde ela vai, quem ela admira" },
  { id: "brand_personality", question: "Escolha os adjetivos que definem a personalidade da marca:", type: "checkbox", options: ["Séria", "Descontraída", "Sofisticada", "Acessível", "Ousada", "Tradicional", "Inovadora", "Humana", "Técnica", "Criativa", "Confiável", "Exclusiva", "Provocadora", "Empática", "Outro"] },
  { id: "tone_of_voice", question: "Qual é o tom de voz da marca na comunicação?", type: "select", options: ["Formal e técnico", "Profissional mas acessível", "Descontraído e próximo", "Inspiracional e motivador", "Direto e objetivo", "Outro"], hasConditionalText: true },
  { id: "forbidden_words", question: "Quais palavras ou expressões sua marca NUNCA usaria?", type: "textarea" },
  { id: "emotions", question: "Quais emoções a identidade visual completa deve provocar instantaneamente?", type: "textarea" },

  { id: "s5", question: "Seção 5: Referências e Direção Visual", type: "section" },
  { id: "liked_references", question: "Cole links ou descreva até 5 marcas cujo branding completo você admira e explique por quê:", type: "textarea" },
  { id: "disliked_references", question: "Cole links ou descreva até 3 marcas cujo visual você NÃO gosta e explique por quê:", type: "textarea" },
  { id: "color_preference", question: "Existe alguma paleta de cores que te atrai? Descreva ou cole referências:", type: "textarea" },
  { id: "avoid", question: "Existe algum elemento visual, cor ou estilo que definitivamente NÃO deve fazer parte do branding?", type: "textarea" },

  { id: "s6", question: "Seção 6: Aplicações e Ecossistema da Marca", type: "section" },
  { id: "usage_media", question: "Em quais mídias e suportes a marca será aplicada? (Selecione todas que se aplicam)", type: "checkbox", options: ["Instagram e redes sociais", "Site ou landing page", "Cartão de visita", "Papel timbrado e documentos", "Embalagens ou rótulos", "Fachada ou sinalização", "Camisetas ou uniformes", "Apresentações e propostas comerciais", "Brindes e materiais promocionais", "Conteúdo em vídeo", "Outro"] },
  { id: "existing_elements", question: "Você já possui algum elemento visual existente que deve ser preservado ou serve de referência?", type: "select", options: ["Sim", "Não, estou começando do zero"], hasConditionalText: true },
  { id: "additional_notes", question: "Existe alguma informação adicional que considera essencial para o desenvolvimento do seu branding?", type: "textarea" },

  { id: "s7", question: "Seção 7: Dados para Contato", type: "section" },
  { id: "contact_name", question: "Nome completo:", type: "text", required: true },
  { id: "contact_email", question: "E-mail para contato:", type: "email", required: true },
  { id: "contact_phone", question: "WhatsApp:", type: "phone", required: true },
  { id: "social_profile", question: "Site ou perfil nas redes sociais (se existir):", type: "text" },
  { id: "budget", question: "Qual é o investimento aproximado que você está disposto a realizar neste projeto?", type: "select", options: ["Prefiro receber uma proposta personalizada", "Tenho um orçamento definido"], hasConditionalText: true },
  { id: "how_found", question: "Como você nos encontrou?", type: "select", options: ["Instagram", "Indicação de amigo ou cliente", "Google", "LinkedIn", "Outro"], hasConditionalText: true },
];

// ==========================================
// BRIEFING 04 — MANUAL DO LOGOTIPO
// ==========================================
const manualLogotipo: BriefingQuestion[] = [
  { id: "s1", question: "Seção 1: Sobre a Marca e o Logotipo Existente", type: "section" },
  { id: "brand_name", question: "Qual é o nome da marca?", type: "text", required: true },
  { id: "segment", question: "Qual é o segmento ou área de atuação?", type: "text", required: true },
  { id: "logo_creator", question: "Quem criou o logotipo originalmente?", type: "select", options: ["Um designer ou agência profissional", "Eu mesmo criei", "Não sei ao certo", "Outro"], hasConditionalText: true },
  { id: "logo_age", question: "Há quanto tempo esse logotipo está em uso?", type: "select", options: ["Menos de 1 ano", "Entre 1 e 3 anos", "Entre 3 e 5 anos", "Mais de 5 anos"] },
  { id: "logo_files", question: "Você possui os arquivos originais do logotipo? (Selecione os que tiver)", type: "checkbox", options: ["AI (Adobe Illustrator)", "EPS", "SVG", "PDF", "PNG", "JPG", "Não possuo nenhum arquivo editável"] },
  { id: "logo_colors", question: "Você sabe quais cores exatas foram usadas no logotipo? (Códigos HEX, RGB ou CMYK)", type: "select", options: ["Sim, tenho os códigos", "Não, não tenho os códigos", "Tenho uma ideia aproximada"], hasConditionalText: true },
  { id: "logo_font", question: "Você sabe qual fonte ou tipografia foi utilizada no logotipo?", type: "select", options: ["Sim, sei o nome da fonte", "Não sei o nome da fonte", "A tipografia foi customizada pelo designer"], hasConditionalText: true },

  { id: "s2", question: "Seção 2: Uso Atual e Necessidades", type: "section" },
  { id: "usage_media", question: "Em quais mídias o logotipo é mais utilizado atualmente? (Selecione todas que se aplicam)", type: "checkbox", options: ["Instagram e redes sociais", "Site ou landing page", "Cartão de visita", "Papel timbrado e documentos", "Embalagens ou rótulos", "Fachada ou sinalização", "Camisetas ou uniformes", "Outro"] },
  { id: "preferred_version", question: "Existe alguma versão do logotipo que você prefere ou usa mais no dia a dia?", type: "textarea", placeholder: "Ex: Prefiro a versão horizontal, ou uso mais a versão só com o símbolo" },
  { id: "incorrect_usage", question: "Você já percebeu usos incorretos do seu logotipo? Descreva quais:", type: "textarea", placeholder: "Ex: Cores erradas, logotipo distorcido, aplicado em fundos inadequados" },
  { id: "needs_guidelines", question: "Existe algum fornecedor, gráfica, designer ou funcionário que precise usar o logotipo e atualmente não tem orientações claras?", type: "select", options: ["Sim", "Não", "Talvez no futuro"] },

  { id: "s3", question: "Seção 3: Conteúdo do Manual", type: "section" },
  { id: "manual_sections", question: "Quais seções você considera mais importantes para o seu manual? (Selecione todas que deseja)", type: "checkbox", options: ["Logotipo principal e versões", "Versões monocromáticas (preto e branco)", "Área de proteção e proporção", "Redução mínima", "Paleta de cores com todos os códigos", "Tipografia utilizada no logotipo", "Tipografia complementar para materiais", "Aplicações proibidas", "Mockups de aplicação em contextos reais", "Fundos preferenciais para o logotipo", "Favicon e aplicações digitais"] },
  { id: "mockup_contexts", question: "Em quais contextos você mais precisaria de mockups de aplicação? (Selecione até 5)", type: "checkbox", options: ["Cartão de visita", "Papel timbrado", "Perfil de rede social (Instagram, LinkedIn)", "Caneca ou copo", "Camiseta ou uniforme", "Embalagem ou sacola", "Fachada ou placa", "Brinde", "Outro"] },

  { id: "s4", question: "Seção 4: Dados para Contato e Envio de Arquivos", type: "section" },
  { id: "contact_name", question: "Nome completo:", type: "text", required: true },
  { id: "contact_email", question: "E-mail para contato:", type: "email", required: true },
  { id: "contact_phone", question: "WhatsApp:", type: "phone", required: true },
  { id: "social_profile", question: "Site ou perfil nas redes sociais (se existir):", type: "text" },
  { id: "file_upload_note", question: "Envie aqui todos os arquivos do logotipo que você possui, em qualquer formato disponível. Também é bem-vindo qualquer material onde o logotipo aparece (prints de redes sociais, fotos de cartão de visita, PDFs, etc.)", type: "textarea", placeholder: "Cole links do Google Drive, Dropbox ou WeTransfer com os arquivos" },
  { id: "how_found", question: "Como você nos encontrou?", type: "select", options: ["Instagram", "Indicação de amigo ou cliente", "Google", "LinkedIn", "Outro"], hasConditionalText: true },
];

// ==========================================
// BRIEFING 05 — DESIGN DE CONTEÚDO PARA REDES SOCIAIS
// ==========================================
const designRedesSociais: BriefingQuestion[] = [
  { id: "s1", question: "Seção 1: Sobre a Marca", type: "section" },
  { id: "brand_name", question: "Qual é o nome da marca?", type: "text", required: true },
  { id: "segment", question: "Qual é o segmento ou área de atuação?", type: "text", required: true },
  { id: "business_description", question: "Descreva brevemente o que a marca faz e qual é o seu público-alvo:", type: "textarea", required: true },
  { id: "has_brand_identity", question: "Você possui identidade visual definida? (Logo, cores, tipografia)", type: "select", options: ["Sim, tenho manual de identidade visual completo", "Sim, tenho o logo e sei as cores, mas sem manual formal", "Tenho apenas o logotipo", "Não tenho identidade visual definida"], required: true },

  { id: "s2", question: "Seção 2: Redes Sociais e Objetivo", type: "section" },
  { id: "platforms", question: "Em quais plataformas as peças serão publicadas? (Selecione todas que se aplicam)", type: "checkbox", options: ["Instagram (Feed)", "Instagram (Stories)", "Instagram (Reels Cover)", "LinkedIn", "Facebook", "Pinterest", "TikTok", "Outro"], required: true },
  { id: "main_objective", question: "Qual é o principal objetivo das peças visuais?", type: "select", options: ["Gerar engajamento e reconhecimento de marca", "Vender produtos ou serviços diretamente", "Educar e gerar autoridade no nicho", "Atrair novos seguidores", "Divulgar promoções e ofertas", "Outro"], hasConditionalText: true },
  { id: "copy_responsible", question: "Quem será responsável por criar os textos e copies de cada post?", type: "select", options: ["Eu mesmo fornecerei todos os textos prontos", "Precisarei de sugestões de texto junto com o design", "Outra pessoa da equipe fornecerá os textos"] },

  { id: "s3", question: "Seção 3: Tipos de Peças", type: "section" },
  { id: "content_types", question: "Quais tipos de peças você precisa? (Selecione todas que se aplicam)", type: "checkbox", options: ["Posts estáticos informativos ou educativos", "Posts promocionais ou de oferta", "Posts de citação ou frase", "Carrosséis (sequência de slides)", "Stories", "Capa de destaque para Stories salvos", "Capa de Reels", "Outro"], required: true },
  { id: "volume", question: "Qual é o volume de peças que você precisa?", type: "select", options: ["Pacote pontual", "Mensal recorrente"], hasConditionalText: true },
  { id: "special_dates", question: "Existe alguma data comemorativa, campanha ou lançamento previsto que precise de atenção especial?", type: "textarea" },

  { id: "s4", question: "Seção 4: Estilo Visual e Referências", type: "section" },
  { id: "visual_style", question: "Como você descreveria o estilo visual que deseja para as peças?", type: "select", options: ["Clean e minimalista", "Colorido e vibrante", "Sofisticado e premium", "Moderno e tech", "Orgânico e natural", "Ousado e impactante", "Sem preferência — confio na direção criativa", "Outro"], hasConditionalText: true },
  { id: "liked_references", question: "Cole links ou perfis de marcas ou criadores que você admira visualmente nas redes sociais:", type: "textarea" },
  { id: "disliked_styles", question: "Existe algum estilo visual que você definitivamente NÃO quer nas suas peças?", type: "textarea" },

  { id: "s5", question: "Seção 5: Materiais e Informações da Marca", type: "section" },
  { id: "file_upload_note", question: "Envie aqui os arquivos da identidade visual da marca: logotipo (preferencialmente em AI, EPS, SVG ou PNG com fundo transparente), guia de cores, manual de marca (se existir) e qualquer referência visual relevante.", type: "textarea", placeholder: "Cole links do Google Drive, Dropbox ou WeTransfer com os arquivos" },
  { id: "additional_notes", question: "Existe alguma informação adicional relevante para a produção das peças?", type: "textarea" },

  { id: "s6", question: "Seção 6: Dados para Contato", type: "section" },
  { id: "contact_name", question: "Nome completo:", type: "text", required: true },
  { id: "contact_email", question: "E-mail para contato:", type: "email", required: true },
  { id: "contact_phone", question: "WhatsApp:", type: "phone", required: true },
  { id: "social_profile", question: "Perfil do Instagram ou site da marca:", type: "text" },
  { id: "how_found", question: "Como você nos encontrou?", type: "select", options: ["Instagram", "Indicação de amigo ou cliente", "Google", "LinkedIn", "Outro"], hasConditionalText: true },
];

// ==========================================
// BRIEFING 06 — EDIÇÃO DE VÍDEO
// ==========================================
const edicaoVideo: BriefingQuestion[] = [
  { id: "s1", question: "Seção 1: Sobre o Projeto", type: "section" },
  { id: "brand_name", question: "Qual é o nome da marca ou projeto?", type: "text", required: true },
  { id: "segment", question: "Qual é o segmento ou área de atuação?", type: "text", required: true },
  { id: "video_type", question: "Qual é o tipo de vídeo que precisa ser editado?", type: "select", options: ["Reels ou Short (até 90 segundos)", "Vídeo de feed (1 a 3 minutos)", "Vídeo institucional curto (2 a 5 minutos)", "Tutorial ou vídeo educativo (5 a 15 minutos)", "Pacote mensal de vídeos", "Outro"], required: true, hasConditionalText: true },
  { id: "duration", question: "Qual é a duração máxima esperada para o vídeo finalizado?", type: "text", placeholder: "Ex: Até 60 segundos, entre 3 e 5 minutos" },
  { id: "platforms", question: "Em quais plataformas o vídeo será publicado? (Selecione todas que se aplicam)", type: "checkbox", options: ["Instagram Reels", "Instagram Feed", "YouTube", "TikTok", "LinkedIn", "Facebook", "WhatsApp", "Outro"], required: true },

  { id: "s2", question: "Seção 2: Objetivo e Narrativa", type: "section" },
  { id: "video_objective", question: "Qual é o objetivo principal do vídeo?", type: "select", options: ["Vender um produto ou serviço", "Educar ou informar o público", "Apresentar a marca institucionalmente", "Entreter e gerar engajamento", "Depoimento ou prova social", "Outro"], hasConditionalText: true },
  { id: "has_script", question: "Existe roteiro ou script pronto para o vídeo?", type: "select", options: ["Sim, tenho roteiro completo", "Tenho uma ideia geral mas não está escrito", "Não tenho roteiro e precisarei de orientação para estruturar"] },
  { id: "cta", question: "Qual é a call-to-action principal do vídeo? O que o espectador deve fazer ao assistir?", type: "textarea", placeholder: "Ex: Entrar em contato pelo WhatsApp, acessar o link na bio, comprar o produto" },
  { id: "tone_energy", question: "Qual é o tom e a energia desejados para o vídeo?", type: "select", options: ["Dinâmico e acelerado", "Calmo e informativo", "Inspiracional e motivador", "Sério e profissional", "Descontraído e divertido", "Outro"], hasConditionalText: true },

  { id: "s3", question: "Seção 3: Material Bruto e Recursos", type: "section" },
  { id: "raw_material_status", question: "O material bruto (vídeos gravados) já está disponível para ser enviado?", type: "select", options: ["Sim, tenho todo o material pronto", "Tenho parte do material, o restante ainda será gravado", "Ainda não tenho material gravado"] },
  { id: "resolution", question: "Em qual resolução o material foi gravado?", type: "select", options: ["4K (3840x2160)", "Full HD (1920x1080)", "HD (1280x720)", "Não sei ao certo"] },
  { id: "audio_quality", question: "O áudio foi gravado com microfone externo ou apenas pelo microfone da câmera/celular?", type: "select", options: ["Microfone externo ou lapela profissional", "Microfone da câmera ou celular", "Não há narração, apenas imagens e música"] },
  { id: "music_preference", question: "Você tem preferência por algum estilo de trilha sonora?", type: "textarea", placeholder: "Ex: Instrumental animado, Lo-fi, música épica, eletrônica. Cole links de referência se possível" },

  { id: "s4", question: "Seção 4: Elementos Visuais e Identidade", type: "section" },
  { id: "has_brand_identity", question: "Você possui identidade visual definida para aplicar no vídeo? (Logo, cores, tipografia)", type: "select", options: ["Sim, tenho manual de identidade visual", "Tenho logo e sei as cores principais", "Não tenho identidade visual definida"] },
  { id: "graphic_elements", question: "Quais elementos gráficos você precisa no vídeo? (Selecione todos que se aplicam)", type: "checkbox", options: ["Legendas dinâmicas", "Subtítulos", "Lower thirds (nome, cargo, empresa)", "Logo da marca no vídeo", "Call-to-action visual", "Introdução animada (intro)", "Encerramento animado (outro)", "Outro"] },
  { id: "editing_references", question: "Cole aqui links de vídeos ou canais que você admira pelo estilo de edição:", type: "textarea" },

  { id: "s5", question: "Seção 5: Upload e Informações Adicionais", type: "section" },
  { id: "file_upload_note", question: "Envie aqui o material bruto disponível, o roteiro (se existir), arquivos da identidade visual (logo em PNG ou AI), referências de edição e qualquer outro material relevante. Para arquivos grandes, você pode compartilhar um link do Google Drive, Dropbox ou WeTransfer.", type: "textarea", placeholder: "Cole o link para os arquivos aqui" },
  { id: "mandatory_scenes", question: "Existe alguma cena, momento ou informação específica que é obrigatória no vídeo?", type: "textarea" },
  { id: "additional_notes", question: "Existe alguma informação adicional relevante para este projeto?", type: "textarea" },

  { id: "s6", question: "Seção 6: Dados para Contato", type: "section" },
  { id: "contact_name", question: "Nome completo:", type: "text", required: true },
  { id: "contact_email", question: "E-mail para contato:", type: "email", required: true },
  { id: "contact_phone", question: "WhatsApp:", type: "phone", required: true },
  { id: "social_profile", question: "Canal do YouTube ou perfil nas redes sociais:", type: "text" },
  { id: "how_found", question: "Como você nos encontrou?", type: "select", options: ["Instagram", "Indicação de amigo ou cliente", "Google", "LinkedIn", "Outro"], hasConditionalText: true },
];

// ==========================================
// BRIEFING 07 — SITES E LANDING PAGES
// ==========================================
const sitesLandingPages: BriefingQuestion[] = [
  { id: "s1", question: "Seção 1: Sobre o Negócio", type: "section" },
  { id: "brand_name", question: "Qual é o nome da marca ou empresa?", type: "text", required: true },
  { id: "segment", question: "Qual é o segmento ou área de atuação?", type: "text", required: true },
  { id: "business_description", question: "Descreva o que sua empresa faz, qual problema resolve e qual transformação entrega aos seus clientes:", type: "textarea", required: true },
  { id: "value_proposition", question: "Qual é a proposta de valor central da sua marca em uma frase:", type: "text", placeholder: "Ex: Ajudamos pequenas empresas a vender mais com design estratégico" },

  { id: "s2", question: "Seção 2: Objetivo e Tipo de Projeto", type: "section" },
  { id: "project_type", question: "Qual tipo de projeto você precisa?", type: "select", options: ["Landing Page simples (até 6 seções, foco em uma única conversão)", "Landing Page completa (até 12 seções, mais conteúdo e detalhes)", "Site institucional (3 a 5 páginas)", "Site completo (5 a 8 páginas)", "Não tenho certeza — quero uma recomendação"], required: true },
  { id: "main_objective", question: "Qual é o principal objetivo da página?", type: "select", options: ["Captar leads (e-mail ou WhatsApp)", "Vender um produto ou serviço diretamente", "Apresentar a empresa institucionalmente", "Divulgar um evento ou lançamento", "Portfólio ou apresentação de trabalhos", "Outro"], hasConditionalText: true },
  { id: "primary_action", question: "Qual é a ação principal que você quer que o visitante tome ao acessar a página?", type: "textarea", placeholder: "Ex: Preencher um formulário, clicar no botão do WhatsApp, comprar pelo link de pagamento" },

  { id: "s3", question: "Seção 3: Estrutura e Conteúdo", type: "section" },
  { id: "pages_needed", question: "Se for um site com múltiplas páginas, quais páginas você precisa? (Selecione todas que se aplicam)", type: "checkbox", options: ["Home (página inicial)", "Sobre nós ou Sobre mim", "Serviços ou Produtos", "Portfólio ou Casos de sucesso", "Depoimentos ou Avaliações", "Blog ou Conteúdo", "Contato", "Página de vendas específica", "Outro"] },
  { id: "copy_responsible", question: "Quem será responsável por fornecer os textos de cada página ou seção?", type: "select", options: ["Eu fornecerei todos os textos prontos", "Precisarei de orientação para estruturar os textos", "Outra pessoa da equipe fornecerá os textos"] },
  { id: "has_photos", question: "Você possui fotos profissionais da marca, equipe ou produto para usar no site?", type: "select", options: ["Sim, tenho fotos profissionais prontas", "Tenho algumas fotos mas não são profissionais", "Não tenho fotos e precisarei de imagens de banco"] },
  { id: "has_testimonials", question: "Você já possui depoimentos de clientes para incluir na página?", type: "select", options: ["Sim, tenho depoimentos escritos ou em vídeo", "Tenho alguns mas precisarei organizar", "Não tenho depoimentos ainda"] },

  { id: "s4", question: "Seção 4: Identidade Visual e Referências", type: "section" },
  { id: "has_brand_identity", question: "Você possui identidade visual definida para aplicar no site? (Logo, cores, tipografia)", type: "select", options: ["Sim, tenho manual de identidade visual completo", "Tenho logo e sei as cores e fontes principais", "Tenho apenas o logotipo", "Não tenho identidade visual definida"] },
  { id: "liked_references", question: "Cole links de 3 a 5 sites que você admira visualmente e explique o que te atrai em cada um:", type: "textarea" },
  { id: "disliked_references", question: "Cole links de sites que você NÃO gosta e explique por quê:", type: "textarea" },
  { id: "avoid", question: "Existe algum estilo visual, cor ou elemento que definitivamente NÃO deve aparecer no seu site?", type: "textarea" },

  { id: "s5", question: "Seção 5: Aspectos Técnicos", type: "section" },
  { id: "has_domain", question: "Você já possui domínio registrado?", type: "select", options: ["Sim", "Não, precisarei adquirir", "Não sei o que é isso"], hasConditionalText: true },
  { id: "features", question: "Você precisa de alguma funcionalidade específica no site? (Selecione todas que se aplicam)", type: "checkbox", options: ["Formulário de contato ou captação de leads", "Botão flutuante de WhatsApp", "Integração com ferramenta de e-mail marketing", "Chat online", "Área de blog ou notícias", "Galeria de fotos ou portfólio", "Vídeo de fundo ou incorporado", "Pop-up de captura", "Política de privacidade e cookies", "Outro"] },
  { id: "deadline", question: "Existe algum prazo específico para o lançamento do site?", type: "select", options: ["Sim", "Não tenho prazo definido"], hasConditionalText: true },

  { id: "s6", question: "Seção 6: Upload de Materiais", type: "section" },
  { id: "file_upload_note", question: "Envie aqui os arquivos da identidade visual (logo em AI, EPS, SVG ou PNG com fundo transparente), fotos da marca, textos já escritos, referências e qualquer outro material relevante. Para arquivos grandes, compartilhe um link do Google Drive ou Dropbox.", type: "textarea", placeholder: "Cole o link para os arquivos aqui" },
  { id: "additional_notes", question: "Existe alguma informação adicional que considera importante para o desenvolvimento do seu site?", type: "textarea" },

  { id: "s7", question: "Seção 7: Dados para Contato", type: "section" },
  { id: "contact_name", question: "Nome completo:", type: "text", required: true },
  { id: "contact_email", question: "E-mail para contato:", type: "email", required: true },
  { id: "contact_phone", question: "WhatsApp:", type: "phone", required: true },
  { id: "current_site", question: "Site atual (se existir e quiser que sirva de referência):", type: "text" },
  { id: "social_profile", question: "Perfil nas redes sociais:", type: "text" },
  { id: "how_found", question: "Como você nos encontrou?", type: "select", options: ["Instagram", "Indicação de amigo ou cliente", "Google", "LinkedIn", "Outro"], hasConditionalText: true },
];

// ==========================================
// BRIEFING 08 — PERSONAL BRAND KIT
// ==========================================
const personalBrandKit: BriefingQuestion[] = [
  { id: "s1", question: "Seção 1: Você e Sua Marca Pessoal", type: "section" },
  { id: "brand_name", question: "Qual é o seu nome ou nome artístico que será usado como marca?", type: "text", required: true },
  { id: "niche", question: "Qual é o seu nicho ou área de conteúdo principal?", type: "text", required: true, placeholder: "Ex: Finanças pessoais, moda sustentável, fitness, marketing digital, gastronomia" },
  { id: "content_time", question: "Há quanto tempo você produz conteúdo online?", type: "select", options: ["Estou começando agora", "Menos de 6 meses", "Entre 6 meses e 1 ano", "Entre 1 e 3 anos", "Mais de 3 anos"], required: true },
  { id: "platforms", question: "Em quais plataformas você está presente ou pretende estar? (Selecione todas que se aplicam)", type: "checkbox", options: ["Instagram", "TikTok", "YouTube", "LinkedIn", "Pinterest", "Podcast", "Twitter/X", "Outro"], required: true },
  { id: "value_description", question: "Descreva brevemente o que você faz e que valor ou transformação entrega para quem te acompanha:", type: "textarea", required: true },

  { id: "s2", question: "Seção 2: Sua Personalidade e Essência", type: "section" },
  { id: "personality_adjectives", question: "Descreva sua personalidade em até 5 adjetivos:", type: "text", required: true, placeholder: "Ex: Direta, criativa, acolhedora, irreverente, sofisticada" },
  { id: "place_metaphor", question: "Se você fosse um lugar do mundo, qual seria e por quê?", type: "textarea", placeholder: "Esta pergunta parece inusitada mas nos ajuda muito a entender sua essência visual" },
  { id: "core_values", question: "Quais são os seus 3 valores inegociáveis como criador e como pessoa?", type: "textarea", required: true },
  { id: "not_represent", question: "O que você definitivamente NÃO é e não quer que sua marca transmita?", type: "textarea", required: true, placeholder: "Esta resposta é tão importante quanto saber quem você é" },
  { id: "first_impression", question: "Qual sentimento você quer provocar em alguém que entra no seu perfil pela primeira vez?", type: "textarea", required: true, placeholder: "Ex: Inspiração, confiança, pertencimento, leveza, sofisticação" },

  { id: "s3", question: "Seção 3: Seu Público", type: "section" },
  { id: "ideal_audience", question: "Descreva o perfil de quem você quer atrair com sua marca pessoal:", type: "textarea", required: true, placeholder: "Idade aproximada, estilo de vida, o que essa pessoa busca, quais são seus desejos e medos" },
  { id: "unwanted_audience", question: "Quem você NÃO quer atrair? Descreva o perfil:", type: "textarea" },
  { id: "audience_feedback", question: "O que seu público fala sobre você nos comentários ou mensagens que mais te orgulha?", type: "textarea" },

  { id: "s4", question: "Seção 4: Estética e Referências Visuais", type: "section" },
  { id: "visual_aesthetic", question: "Como você descreveria a estética visual que representa você?", type: "select", options: ["Clean e minimalista", "Colorido e vibrante", "Sofisticado e premium", "Orgânico e natural", "Escuro e misterioso", "Retrô e nostálgico", "Moderno e tech", "Ousado e impactante", "Sem preferência definida — quero uma recomendação", "Outro"], required: true, hasConditionalText: true },
  { id: "liked_references", question: "Cole aqui perfis, feeds ou marcas que você admira visualmente e explique o que te atrai em cada um:", type: "textarea", placeholder: "Podem ser criadores, marcas, fotógrafos ou qualquer referência visual" },
  { id: "disliked_references", question: "Cole aqui exemplos de estética que você definitivamente NÃO quer para sua marca:", type: "textarea" },
  { id: "color_identity", question: "Existe alguma cor que representa você ou que você usa muito no dia a dia?", type: "textarea" },
  { id: "color_avoid", question: "Existe alguma cor que você definitivamente não quer na sua identidade?", type: "textarea" },

  { id: "s5", question: "Seção 5: Seu Conteúdo e Uso dos Templates", type: "section" },
  { id: "content_types", question: "Quais tipos de conteúdo você publica com mais frequência? (Selecione todos que se aplicam)", type: "checkbox", options: ["Posts educativos ou informativos", "Posts de citações ou frases", "Carrosséis com passo a passo ou listas", "Stories de bastidores ou dia a dia", "Reels ou vídeos curtos", "Conteúdo de vendas ou divulgação", "Outro"], required: true },
  { id: "canva_usage", question: "Você já usa o Canva para criar seus posts atualmente?", type: "select", options: ["Sim, uso com frequência", "Já usei mas não uso regularmente", "Nunca usei mas estou disposto a aprender", "Prefiro usar outra ferramenta"], required: true },
  { id: "professional_photos", question: "Você tem fotos profissionais suas para usar nos templates e no feed?", type: "select", options: ["Sim, tenho um bom banco de fotos profissionais", "Tenho algumas fotos mas não são profissionais", "Não tenho fotos profissionais ainda"], required: true },

  { id: "s6", question: "Seção 6: Situação Atual", type: "section" },
  { id: "existing_visual", question: "Você já tem algum elemento visual criado para sua marca pessoal?", type: "select", options: ["Sim, tenho logo e identidade visual definida", "Tenho apenas um logo ou algo básico", "Não tenho nada definido ainda"], required: true },
  { id: "existing_description", question: "Se marcou que já tem algo, envie ou descreva o que existe atualmente:", type: "textarea", placeholder: "Cole links do Google Drive, Dropbox ou WeTransfer com os arquivos" },
  { id: "biggest_problem", question: "Qual é o maior problema visual que você sente na sua presença digital hoje?", type: "textarea", placeholder: "Ex: Falta consistência, parece amador, não representa quem sou, não sei como padronizar" },

  { id: "s7", question: "Seção 7: Dados para Contato", type: "section" },
  { id: "contact_name", question: "Nome completo:", type: "text", required: true },
  { id: "contact_email", question: "E-mail para contato:", type: "email", required: true },
  { id: "contact_phone", question: "WhatsApp:", type: "phone", required: true },
  { id: "instagram_profile", question: "Perfil do Instagram (principal):", type: "text", required: true },
  { id: "other_profiles", question: "Outros perfis relevantes (YouTube, TikTok, LinkedIn):", type: "text" },
  { id: "how_found", question: "Como você nos encontrou?", type: "select", options: ["Instagram", "Indicação de amigo ou cliente", "Google", "LinkedIn", "Outro"], hasConditionalText: true },
];

// ==========================================
// MAP TO PROJECT TYPES
// ==========================================
export const briefingQuestions: Record<string, BriefingQuestion[]> = {
  "Logotipo Essencial": logotipoEssencial,
  "Identidade Visual": identidadeVisual,
  "Branding Completo": brandingCompleto,
  "Manual de Logotipo": manualLogotipo,
  "Personal Brand Kit": personalBrandKit,
  "Design de Conteúdo para Redes Sociais": designRedesSociais,
  "Edição de Vídeo — Reels/Shorts": edicaoVideo,
  "Edição de Vídeo — Institucional": edicaoVideo,
  "Edição de Vídeo — Tutorial/Educativo": edicaoVideo,
  "Landing Page Simples": sitesLandingPages,
  "Landing Page Completa": sitesLandingPages,
  "Site Institucional": sitesLandingPages,
  "Site Completo": sitesLandingPages,
};
