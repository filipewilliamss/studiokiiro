import akedahLogo from "@/assets/akedah-logo.webp";
import construmarLogo from "@/assets/construmar-logo.webp";
import temploLogo from "@/assets/templo-logo.webp";
import teamluisaLogo from "@/assets/teamluisa-logo.webp";
import construmarPag1 from "@/assets/construmar-pagina-1.webp";
import construmarPag2 from "@/assets/construmar-pagina-2.webp";
import construmarPag3 from "@/assets/construmar-pagina-3.webp";
import construmarPag4 from "@/assets/construmar-pagina-4.webp";
import construmarPag5 from "@/assets/construmar-pagina-5.webp";
import construmarPag6 from "@/assets/construmar-pagina-6.webp";
import construmarPag7 from "@/assets/construmar-pagina-7.webp";
import construmarPag8 from "@/assets/construmar-pagina-8.webp";
import construmarPag9 from "@/assets/construmar-pagina-9.webp";
import akedahPag1 from "@/assets/akedah-pagina-1.webp";
import akedahPag2 from "@/assets/akedah-pagina-2.webp";
import akedahPag3 from "@/assets/akedah-pagina-3.webp";
import akedahPag4 from "@/assets/akedah-pagina-4.webp";
import akedahPag5 from "@/assets/akedah-pagina-5.webp";
import akedahPag6 from "@/assets/akedah-pagina-6.webp";
import akedahPag7 from "@/assets/akedah-pagina-7.webp";
import akedahPag8 from "@/assets/akedah-pagina-8.webp";
import akedahPag9 from "@/assets/akedah-pagina-9.webp";
import akedahPag10 from "@/assets/akedah-pagina-10.webp";
import akedahPag11 from "@/assets/akedah-pagina-11.webp";
import teamluisaPag1 from "@/assets/teamluisa-pagina-1.webp";
import teamluisaPag2 from "@/assets/teamluisa-pagina-2.webp";
import teamluisaPag3 from "@/assets/teamluisa-pagina-3.webp";
import teamluisaPag4 from "@/assets/teamluisa-pagina-4.webp";
import teamluisaPag5 from "@/assets/teamluisa-pagina-5.webp";
import teamluisaPag6 from "@/assets/teamluisa-pagina-6.webp";
import temploPag1 from "@/assets/templo-pagina-1.webp";
import temploPag2 from "@/assets/templo-pagina-2.webp";
import temploPag3 from "@/assets/templo-pagina-3.webp";
import temploPag4 from "@/assets/templo-pagina-4.webp";
import temploPag5 from "@/assets/templo-pagina-5.webp";
import temploPag6 from "@/assets/templo-pagina-6.webp";
import temploPag7 from "@/assets/templo-pagina-7.webp";
import temploPag8 from "@/assets/templo-pagina-8.webp";

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  bgColor: string;
  intro: string;
  subtitle?: string; // New field
  about?: string; // New field
  challenge: string;
  objective?: string; // New field
  concept?: string; // New field
  variations?: string; // New field
  construction?: string; // New field
  colors?: string; // New field
  typography?: string; // New field
  symbols?: string; // New field
  nonRecommended?: string; // New field
  applications?: string; // New field
  finalResult?: string; // New field
  strategy: string;
  solution: string;
  result: string;
  tags: string[];
  logo: string;
  pages: string[];
  // Ficha técnica
  client: string;
  year: string;
  service: string;
  deliverables: string[];
  role: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "akedah-podcast",
    title: "Akedah Podcast",
    category: "Identidade Visual",
    bgColor: "#2D1A11",
    intro: "Construção de uma identidade visual com presença, contraste e personalidade para fortalecer o posicionamento da marca.",
    subtitle: "Identidade visual para um podcast cristão que une profundidade, autenticidade e propósito em cada conversa.",
    about: "O Akedah Podcast nasce da necessidade de expressar identidade, profundidade e autenticidade em cada conversa. Mais do que uma marca visual, o nome “Akedah” carrega um significado poderoso, remetendo ao momento bíblico do sacrifício de fé e refletindo a essência do propósito do podcast: trazer à tona temas intensos, relevantes e espirituais com verdade e coragem.",
    challenge: "O projeto ainda não possuía uma identidade visual estruturada. As primeiras comunicações utilizavam visuais genéricos, que não traduziam a profundidade espiritual nem a seriedade das conversas. Isso dificultava a construção de uma presença consistente nas plataformas digitais e a criação de uma marca reconhecível para o público.",
    objective: "Criar uma identidade visual que traduzisse a essência do nome Akedah — fé, entrega e propósito — em um sistema de marca completo, flexível e memorável. A identidade precisava funcionar com clareza em capas de episódios, redes sociais, materiais promocionais e futuras expansões do podcast, mantendo sempre a mesma coerência visual.",
    concept: "O logotipo do Akedah Podcast nasce da intenção de comunicar humanidade, voz e proximidade, sem abrir mão da força e da clareza. A tipografia fluida, em estilo manuscrito, traduz a dimensão humana das conversas, enquanto a palavra “PODCAST”, em caixa alta e laranja, reforça presença digital, intensidade e foco na mensagem.\n\nPara sustentar essa proposta, foi desenvolvido um sistema de identidade com variações de logotipo, malha construtiva, área de proteção, paleta de cores, tipografia e símbolos de apoio. Cada elemento foi pensado para garantir que a marca mantenha uma comunicação visual coerente, forte e memorável em todos os contextos de uso.",
    variations: "O logotipo do Akedah Podcast possui versões oficiais que asseguram flexibilidade e consistência visual em diferentes contextos de uso.\n\nA versão principal deve ser priorizada sempre que possível. As versões negativa e monocromática garantem contraste e legibilidade em fundos variados. Já a versão vertical é indicada para aplicações com pouco espaço horizontal, preservando a integridade e o impacto visual da marca.",
    construction: "A estrutura do logotipo foi construída com base em proporções que equilibram legibilidade, impacto visual e harmonia entre os elementos. A malha técnica evidencia o alinhamento entre a tipografia manuscrita, a base da palavra “PODCAST” e os elementos de apoio, garantindo consistência na reprodução da marca em diferentes escalas e formatos.\n\nTambém foram definidos a área de proteção e o tamanho mínimo de aplicação, tanto para meios digitais quanto impressos. A área de proteção estabelece um espaço livre mínimo ao redor do logotipo, evitando interferências visuais. A redução mínima assegura que, abaixo de determinados tamanhos, a leitura e o impacto visual não sejam comprometidos.",
    colors: "A identidade visual do Akedah Podcast utiliza uma paleta de cores que reforça seu posicionamento moderno, espiritual e acolhedor.\n\n– O bege claro traz suavidade e proximidade, funcionando como base neutra para composições.\n– O marrom escuro remete à profundidade, à raiz da mensagem e à seriedade do conteúdo.\n– O laranja vibrante destaca energia, presença digital e pontos de foco na comunicação.\n\nCada cor possui especificações próprias para uso em diferentes meios, garantindo consistência nas aplicações digitais e impressas.",
    typography: "A tipografia escolhida reflete a personalidade da marca, transmitindo seriedade, modernidade e acessibilidade.\n\n– A fonte manuscrita Darken Jellybean é utilizada no logotipo, reforçando humanidade, singularidade e a sensação de assinatura pessoal.\n– A fonte Podcast é aplicada em títulos e destaques, garantindo presença e legibilidade.\n– A Bebas Neue complementa o sistema tipográfico em contextos específicos, trazendo firmeza e clareza em composições de apoio.\n\nO uso consistente dessas famílias em materiais gráficos e digitais é fundamental para a construção de uma identidade sólida e reconhecível ao longo do tempo.",
    symbols: "Os símbolos do Akedah Podcast foram desenvolvidos como ícones de apoio à identidade visual. Eles não substituem o logotipo principal, mas reforçam os conceitos e valores do projeto em diferentes aplicações gráficas, digitais e promocionais.\n\n– O troféu reflete vitória, superação e conquistas — pessoais e coletivas — que o podcast busca incentivar em seus ouvintes e convidados.\n– A estrela evoca inspiração, propósito e destaque, simbolizando a relevância do projeto e sua contribuição no cenário de debates e reflexões.\n– A chave representa a virada de chave proporcionada pelas conversas e reflexões, simbolizando novas perspectivas e mudanças significativas que os convidados e o público podem vivenciar.",
    nonRecommended: "Para preservar a integridade e o reconhecimento da marca, o manual define exemplos claros de aplicações que não são permitidas. Entre os usos incorretos estão:\n– esticar ou comprimir o logotipo;\n– alterar as cores originais;\n– aplicar sombras, gradientes ou contornos não previstos;\n– girar ou inverter o logotipo;\n– utilizá‑lo em fundos sem contraste, que dificultem a leitura;\n– inserir efeitos ou tipografias não autorizadas.\n\nEvitar essas distorções é essencial para manter a força, a clareza e a consistência visual da identidade em qualquer contexto.",
    applications: "Para demonstrar o potencial da identidade visual, foram desenvolvidas simulações do logotipo e dos elementos da marca em diferentes superfícies e materiais: capas de episódios, posts para redes sociais, peças de divulgação e cartão de visita.\n\nEssas aplicações servem como referência visual para orientar o uso da marca no dia a dia e garantir que a identidade do Akedah Podcast se mantenha coerente, reconhecível e alinhada ao seu propósito em qualquer ponto de contato com o público.",
    finalResult: "O projeto resultou em uma identidade visual completa, tecnicamente estruturada e visualmente memorável, pronta para acompanhar o crescimento do Akedah Podcast em diferentes canais e formatos.\n\nCom o manual de identidade e o sistema de aplicações definidos, o podcast passa a contar com uma base sólida para se comunicar com consistência, reforçando sua mensagem de fé, profundidade e transformação em cada novo episódio.",
    strategy: "Mapeamos o território simbólico do podcast e construímos um sistema visual baseado em contraste, profundidade e ritmo tipográfico, capaz de funcionar tanto no digital quanto em ativações físicas.",
    solution: "Criamos um manual completo com 11 páginas incluindo logo, variações, malha construtiva, paleta de cores, tipografia e aplicações.",
    result: "Identidade visual coesa e memorável que posicionou o podcast como referência no segmento, com reconhecimento imediato em todas as plataformas.",
    tags: ["Logo Design", "Manual de Marca", "Podcast", "Branding Estratégico"],
    logo: akedahLogo,
    pages: [
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/57r59rwo33m-1778087724805.png", 
      akedahPag2, 
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/g1agffozk0j-1778460596593.png", 
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/kdno3twnwhl-1778460683658.png", 
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/5crxqn5dosm-1778460992251.png",
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/o0jdg67ugl-1778461519546.png",
      akedahPag7, akedahPag8, akedahPag9, akedahPag10, akedahPag11,
    ],
    client: "Akedah Podcast",
    year: "2024",
    service: "Identidade Visual Completa",
    deliverables: ["Logotipo principal", "Manual de marca (11 páginas)", "Sistema tipográfico", "Paleta cromática", "Aplicações"],
    role: "Direção criativa, estratégia de marca e design",
  },
  {
    id: 2,
    slug: "construmar",
    title: "Construmar",
    category: "Identidade Visual",
    bgColor: "#f5f4ef",
    intro: "Sistema visual desenvolvido para transmitir credibilidade, clareza e força em um mercado altamente competitivo.",
    challenge: "A marmoraria precisava de um rebranding que comunicasse sofisticação e qualidade, alinhado ao mercado premium de pedras naturais.",
    strategy: "Trabalhamos uma linguagem visual minimalista, ancorada em tipografia editorial e composições generosas — afastando a marca do clichê industrial.",
    solution: "Desenvolvemos uma identidade visual elegante com manual de 9 páginas, incluindo versões monocromáticas e aplicações específicas para o segmento.",
    result: "Nova marca que transmite confiança e profissionalismo, com aplicações consistentes em todos os pontos de contato da empresa.",
    tags: ["Logo Design", "Manual de Marca", "Marmoraria", "Rebranding"],
    logo: construmarLogo,
    pages: [
      construmarPag1, construmarPag2, construmarPag3,
      construmarPag4, construmarPag5, construmarPag6,
      construmarPag7, construmarPag8, construmarPag9,
    ],
    client: "Construmar",
    year: "2024",
    service: "Rebranding",
    deliverables: ["Logotipo redesenhado", "Manual de marca (9 páginas)", "Versões monocromáticas", "Aplicações comerciais"],
    role: "Direção criativa e design de identidade",
  },
  {
    id: 3,
    slug: "templo-de-deus",
    title: "Templo de Deus",
    category: "Identidade Visual",
    bgColor: "#191919",
    intro: "Direção visual pensada para comunicar sofisticação, equilíbrio e valor percebido em um segmento sensível e estratégico.",
    challenge: "A marca buscava uma identidade visual moderna que transmitisse autoridade científica sem perder a sensibilidade humana do cuidado terapêutico.",
    strategy: "Construímos uma assinatura visual com tipografia refinada e símbolo geométrico minimalista, equilibrando ciência e acolhimento em todas as aplicações.",
    solution: "Manual de marca com 8 páginas, incluindo variações do logotipo, paleta de cores harmoniosa e guia completo de uso da marca.",
    result: "Marca que equilibra autoridade técnica e proximidade humana, com forte presença visual nas redes sociais e materiais impressos.",
    tags: ["Logo Design", "Manual de Marca", "Saúde"],
    logo: temploLogo,
    pages: [
      temploPag1, temploPag2, temploPag3, temploPag4,
      temploPag5, temploPag6, temploPag7, temploPag8,
    ],
    client: "Templo de Deus",
    year: "2024",
    service: "Identidade Visual",
    deliverables: ["Logotipo principal", "Manual de marca (8 páginas)", "Paleta cromática", "Guia de aplicação"],
    role: "Direção criativa e design",
  },
  {
    id: 4,
    slug: "team-luisa-crosstraining",
    title: "Team Luísa Crosstraining",
    category: "Identidade Visual",
    bgColor: "#1d1e1b",
    intro: "Projeto visual com linguagem forte e memorável, criado para destacar a marca e reforçar sua presença no mercado.",
    challenge: "O box de cross training precisava de uma identidade forte e dinâmica que refletisse energia, força e comunidade — sem cair nos clichês esportivos.",
    strategy: "Aplicamos um sistema gráfico com peso tipográfico marcante, paleta densa e ativações sociais que reforçam o senso de pertencimento da comunidade.",
    solution: "Rebranding completo com manual de 6 páginas, incluindo variações do logo, paleta energética, tipografia bold e layout de posts para Instagram.",
    result: "Marca com personalidade marcante que se destaca nas redes sociais e fortalece o senso de comunidade entre os alunos.",
    tags: ["Rebranding", "Social Media", "Cross Training"],
    logo: teamluisaLogo,
    pages: [
      teamluisaPag1, teamluisaPag2, teamluisaPag3,
      teamluisaPag4, teamluisaPag5, teamluisaPag6,
    ],
    client: "Team Luísa Crosstraining",
    year: "2024",
    service: "Rebranding e Social Media",
    deliverables: ["Rebranding completo", "Manual de marca (6 páginas)", "Templates para Instagram", "Sistema visual"],
    role: "Direção criativa, branding e social design",
  },
];
