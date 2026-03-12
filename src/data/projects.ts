import akedahLogo from "@/assets/akedah-logo.png";
import construmarLogo from "@/assets/construmar-logo.png";
import temploLogo from "@/assets/templo-logo.png";
import teamluisaLogo from "@/assets/teamluisa-logo.png";
import construmarPag1 from "@/assets/construmar-pagina-1.png";
import construmarPag2 from "@/assets/construmar-pagina-2.png";
import construmarPag3 from "@/assets/construmar-pagina-3.png";
import construmarPag4 from "@/assets/construmar-pagina-4.png";
import construmarPag5 from "@/assets/construmar-pagina-5.png";
import construmarPag6 from "@/assets/construmar-pagina-6.png";
import construmarPag7 from "@/assets/construmar-pagina-7.png";
import construmarPag8 from "@/assets/construmar-pagina-8.png";
import construmarPag9 from "@/assets/construmar-pagina-9.png";
import akedahPag1 from "@/assets/akedah-pagina-1.png";
import akedahPag2 from "@/assets/akedah-pagina-2.png";
import akedahPag3 from "@/assets/akedah-pagina-3.png";
import akedahPag4 from "@/assets/akedah-pagina-4.png";
import akedahPag5 from "@/assets/akedah-pagina-5.png";
import akedahPag6 from "@/assets/akedah-pagina-6.png";
import akedahPag7 from "@/assets/akedah-pagina-7.png";
import akedahPag8 from "@/assets/akedah-pagina-8.png";
import akedahPag9 from "@/assets/akedah-pagina-9.png";
import akedahPag10 from "@/assets/akedah-pagina-10.png";
import akedahPag11 from "@/assets/akedah-pagina-11.png";
import teamluisaPag1 from "@/assets/teamluisa-pagina-1.png";
import teamluisaPag2 from "@/assets/teamluisa-pagina-2.png";
import teamluisaPag3 from "@/assets/teamluisa-pagina-3.png";
import teamluisaPag4 from "@/assets/teamluisa-pagina-4.png";
import teamluisaPag5 from "@/assets/teamluisa-pagina-5.png";
import teamluisaPag6 from "@/assets/teamluisa-pagina-6.png";
import temploPag1 from "@/assets/templo-pagina-1.png";
import temploPag2 from "@/assets/templo-pagina-2.png";
import temploPag3 from "@/assets/templo-pagina-3.png";
import temploPag4 from "@/assets/templo-pagina-4.png";
import temploPag5 from "@/assets/templo-pagina-5.png";
import temploPag6 from "@/assets/templo-pagina-6.png";
import temploPag7 from "@/assets/templo-pagina-7.png";
import temploPag8 from "@/assets/templo-pagina-8.png";
import type { Project } from "@/components/PortfolioSection";

export const projects: Project[] = [
  {
    id: 1,
    title: "Akedah Podcast",
    category: "Identidade Visual",
    bgColor: "#2D1A11",
    intro: "Uma identidade visual que traduz profundidade teológica em linguagem visual contemporânea — posicionando o podcast como referência no segmento.",
    challenge: "O podcast precisava de uma identidade visual profissional que transmitisse seriedade e credibilidade, se diferenciando no mercado de podcasts.",
    solution: "Criamos um manual completo com 11 páginas incluindo logo, variações, malha construtiva, paleta de cores, tipografia e aplicações.",
    result: "Identidade visual coesa e memorável que posicionou o podcast como referência no segmento, com reconhecimento imediato em todas as plataformas.",
    tags: ["Logo Design", "Manual de Marca", "Podcast", "Branding Estratégico"],
    logo: akedahLogo,
    pages: [
      akedahPag1, akedahPag2, akedahPag3, akedahPag4, akedahPag5,
      akedahPag6, akedahPag7, akedahPag8, akedahPag9, akedahPag10, akedahPag11,
    ],
  },
  {
    id: 2,
    title: "Construmar Marmoraria",
    category: "Identidade Visual",
    bgColor: "#f5f4ef",
    intro: "Rebranding que elevou uma marmoraria tradicional ao patamar premium — comunicando sofisticação em cada ponto de contato.",
    challenge: "A marmoraria precisava de um rebranding que comunicasse sofisticação e qualidade, alinhado ao mercado premium de pedras naturais.",
    solution: "Desenvolvemos uma identidade visual elegante com manual de 9 páginas, incluindo versões monocromáticas e aplicações específicas para o segmento.",
    result: "Nova marca que transmite confiança e profissionalismo, com aplicações consistentes em todos os pontos de contato da empresa.",
    tags: ["Logo Design", "Manual de Marca", "Marmoraria", "Rebranding"],
    logo: construmarLogo,
    pages: [
      construmarPag1, construmarPag2, construmarPag3,
      construmarPag4, construmarPag5, construmarPag6,
      construmarPag7, construmarPag8, construmarPag9,
    ],
  },
  {
    id: 3,
    title: "Templo de Deus",
    category: "Identidade Visual",
    bgColor: "#191919",
    intro: "Uma marca que equilibra reverência e modernidade — conectando gerações através de uma identidade visual atemporal.",
    challenge: "A igreja buscava uma identidade visual moderna que mantivesse a reverência e espiritualidade, atraindo tanto o público tradicional quanto o jovem.",
    solution: "Manual de marca com 8 páginas, incluindo variações do logotipo, paleta de cores harmoniosa e guia completo de uso da marca.",
    result: "Marca que equilibra tradição e modernidade, com forte presença visual nas redes sociais e materiais impressos da igreja.",
    tags: ["Logo Design", "Manual de Marca", "Igreja"],
    logo: temploLogo,
    pages: [
      temploPag1, temploPag2, temploPag3, temploPag4,
      temploPag5, temploPag6, temploPag7, temploPag8,
    ],
  },
  {
    id: 4,
    title: "Team Luisa Cross Training",
    category: "Identidade Visual",
    bgColor: "#1d1e1b",
    intro: "Energia, força e comunidade — traduzidos em uma marca dinâmica que inspira dentro e fora do box.",
    challenge: "O box de cross training precisava de uma identidade forte e dinâmica que refletisse energia, força e comunidade.",
    solution: "Rebranding completo com manual de 6 páginas, incluindo variações do logo, paleta energética, tipografia bold e layout de posts para Instagram.",
    result: "Marca com personalidade marcante que se destaca nas redes sociais e fortalece o senso de comunidade entre os alunos.",
    tags: ["Rebranding", "Social Media", "Cross Training"],
    logo: teamluisaLogo,
    pages: [
      teamluisaPag1, teamluisaPag2, teamluisaPag3,
      teamluisaPag4, teamluisaPag5, teamluisaPag6,
    ],
  },
];
