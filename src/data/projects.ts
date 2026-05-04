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
    challenge: "O podcast precisava de uma identidade visual profissional que transmitisse seriedade e credibilidade, se diferenciando no mercado de podcasts saturado por marcas genéricas.",
    strategy: "Mapeamos o território simbólico do podcast e construímos um sistema visual baseado em contraste, profundidade e ritmo tipográfico, capaz de funcionar tanto no digital quanto em ativações físicas.",
    solution: "Criamos um manual completo com 11 páginas incluindo logo, variações, malha construtiva, paleta de cores, tipografia e aplicações.",
    result: "Identidade visual coesa e memorável que posicionou o podcast como referência no segmento, com reconhecimento imediato em todas as plataformas.",
    tags: ["Logo Design", "Manual de Marca", "Podcast", "Branding Estratégico"],
    logo: akedahLogo,
    pages: [
      akedahPag1, akedahPag2, akedahPag3, akedahPag4, akedahPag5,
      akedahPag6, akedahPag7, akedahPag8, akedahPag9, akedahPag10, akedahPag11,
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
