import akedahLogo from "@/assets/akedah-logo.webp";
import akedahBanner from "@/assets/akedah-banner.jpg.asset.json";
import construmarBanner from "@/assets/construmar-banner.jpg.asset.json";
import construmarLogoHorizontal from "@/assets/construmar-logo-horizontal.png.asset.json";
import tabernaculoBanner from "@/assets/tabernaculo-banner.jpg.asset.json";
import teamLuisaBanner from "@/assets/team-luisa-banner.jpg.asset.json";
import construmarLogo from "@/assets/construmar-logo.webp";
import construmarLogo2 from "@/assets/construmar-logo-2.png.asset.json";
import construmarVersoes from "@/assets/construmar-versoes.png.asset.json";
import construmarPaleta from "@/assets/construmar-paleta.png.asset.json";
import construmarMonocrom from "@/assets/construmar-monocrom.png.asset.json";
import construmarGrid from "@/assets/construmar-grid.png.asset.json";
import construmarReducao from "@/assets/construmar-reducao.png.asset.json";
import construmarTipo from "@/assets/construmar-tipo.png.asset.json";
import construmarPermit from "@/assets/construmar-permit.png.asset.json";
import construmarNaoPermit from "@/assets/construmar-nao-permit.png.asset.json";
import construmarCapa from "@/assets/construmar-capa.png.asset.json";
const tabernaculoLogo = "https://wqxuprmlsapiucjxleih.supabase.co/storage/v1/object/public/files/9481d825-bf40-4071-8b7d-1b437a6aeb93-logo.png";
import teamluisaLogo from "@/assets/teamluisa-logo.webp";
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

import tabernaculoPag2 from "@/assets/tabernaculo-pagina-2.webp";
import tabernaculoPag3 from "@/assets/tabernaculo-pagina-3.webp";
import tabernaculoPag4 from "@/assets/tabernaculo-pagina-4.webp";
import tabernaculoPag5 from "@/assets/tabernaculo-pagina-5.webp";
import tabernaculoPag6 from "@/assets/tabernaculo-pagina-6.webp";
import tabernaculoPag7 from "@/assets/tabernaculo-pagina-7.webp";
import tabernaculoPag8 from "@/assets/tabernaculo-pagina-8.webp";
import tabernaculoPag9 from "@/assets/tabernaculo-pagina-9.webp";
import tabernaculoPag10 from "@/assets/tabernaculo-pagina-10.webp";
import tabernaculoPag11 from "@/assets/tabernaculo-pagina-11.webp";
import tabernaculoPag12 from "@/assets/tabernaculo-pagina-12.webp";

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  coverImage?: string;
  bgColor: string;
  /**
   * Branded hero gradient. Reusable per-project: swap colors here to
   * re-skin the hero without touching the component.
   */
  heroGradient?: {
    from: string;
    to: string;
    titleColor: string;
    subtitleColor: string;
  };
  intro: string;

  /**
   * Optional "O Cliente" / context block for project detail pages.
   */
  clientContext?: {
    label: string;
    description: string;
  };

  /** Full-bleed banner image for the hero card */
  heroBanner?: string;
  /** Logo used in the "Próximo Projeto" block at the end of a project page */
  nextProjectLogo?: string;
  subtitle?: string;
  about?: string;
  challenge: string;
  objective?: string;
  concept?: string;
  variations?: string;
  secondaryVariations?: string;
  secondaryVariationsImage?: string;

  construction?: string;
  colors?: string;
  typography?: string;
  symbols?: string;
  nonRecommended?: string;
  instagramPosts?: string;
  instagramPostsImage?: string;
  applications?: string;
  finalResult?: string;
  
  // New fields for Tabernaculo
  monogram?: string;
  monogramImage?: string;
  symbol?: string;
  symbolImage?: string;
  biblicalSimbology?: string;
  englishIdentity?: string;
  englishIdentityImage?: string;
  missionsLogo?: string;
  missionsLogoImage?: string;
  animatedLogoVideo?: string;
  animatedLogoDescription?: string;
  minimumReduction?: string;
  minimumReductionImage?: string;

  strategy: string;
  solution: string;
  result: string;
  tags: string[];
  logo: string;
  pages: string[];
  videoBlock?: {
    title: string;
    url: string;
    description: string;
  };
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
    category: "Identidade visual",
    bgColor: "#2C1A0F",
    heroBanner: akedahBanner.url,
    heroGradient: {
      from: "#D4A574",
      to: "#E8963D",
      titleColor: "#FFF3E0",
      subtitleColor: "#F5DEB8",
    },
    intro: "Construção de uma identidade visual com presença, contraste e personalidade para fortalecer o posicionamento da marca.",
    subtitle: "Identidade visual para um podcast cristão que une profundidade, autenticidade e propósito em cada conversa.",
    about: "O Akedah Podcast nasce da necessidade de expressar identidade, profundidade e autenticidade em cada conversa. Mais do que uma marca visual, o nome \"Akedah\" carrega um significado poderoso, remetendo ao momento bíblico do sacrifício de fé e refletindo a essência do propósito do podcast: trazer à tona temas intensos, relevantes e espirituais com verdade e coragem.",
    challenge: "O projeto ainda não possuía uma identidade visual estruturada. As primeiras comunicações utilizavam visuais genéricos, que não traduziam a profundidade espiritual nem a seriedade das conversas. Isso dificultava a construção de uma presença consistente nas plataformas digitais e a criação de uma marca reconhecível para o público.",
    objective: "Criar uma identidade visual que traduzisse a essência do nome Akedah, fé, entrega e propósito, em um sistema de marca completo, flexível e memorável. A identidade precisava funcionar com clareza em capas de episódios, redes sociais, materiais promocionais e futuras expansões do podcast, mantendo sempre a mesma coerência visual.",
    concept: "O logotipo do Akedah Podcast nasce da intenção de comunicar humanidade, voz e proximidade, sem abrir mão da força e da clareza. A tipografia fluida, em estilo manuscrito, traduz a dimensão humana das conversas, enquanto a palavra \"PODCAST\", em caixa alta e laranja, reforça presença digital, intensidade e foco na mensagem.\n\nPara sustentar essa proposta, foi desenvolvido um sistema de identidade com variações de logotipo, malha construtiva, área de proteção, paleta de cores, tipografia e símbolos de apoio. Cada elemento foi pensado para garantir que a marca mantenha uma comunicação visual coerente, forte e memorável em todos os contextos de uso.",
    variations: "O logotipo do Akedah Podcast possui versões oficiais que asseguram flexibilidade e consistência visual em diferentes contextos de uso.\n\nA versão principal deve ser priorizada sempre que possível. As versões negativa e monocromática garantem contraste e legibilidade em fundos variados. Já a versão vertical é indicada para aplicações com pouco espaço horizontal, preservando a integridade e o impacto visual da marca.",
    construction: "A estrutura do logotipo foi construída com base em proporções que equilibram legibilidade, impacto visual e harmonia entre os elementos. A malha técnica evidencia o alinhamento entre a tipografia manuscrita, a base da palavra \"PODCAST\" e os elementos de apoio, garantindo consistência na reprodução da marca em diferentes escalas e formatos.\n\nTambém foram definidos a área de proteção e o tamanho mínimo de aplicação, tanto para meios digitais quanto impressos. A área de proteção estabelece um espaço livre mínimo ao redor do logotipo, evitando interferências visuais. A redução mínima assegura que, abaixo de determinados tamanhos, a leitura e o impacto visual não sejam comprometidos.",
    secondaryVariations: "Para garantir flexibilidade sem perder consistência, o Akedah Podcast conta com versões específicas do logotipo para diferentes contextos de uso. A versão principal é priorizada em situações gerais, enquanto as versões negativa, monocromática e vertical foram pensadas para aplicações com limitações de espaço ou necessidade de maior contraste. Esse conjunto de variações permite que a marca se adapte a fundos claros, escuros e formatos diversos, mantendo sempre a mesma personalidade e legibilidade.",
    secondaryVariationsImage: "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/17buzvu4g81-1779799536892.png",

    colors: "A identidade visual do Akedah Podcast utiliza uma paleta de cores que reforça seu posicionamento moderno, espiritual e acolhedor.\n\n– O bege claro traz suavidade e proximidade, funcionando como base neutra para composições.\n– O marrom escuro remete à profundidade, à raiz da mensagem e à seriedade do conteúdo.\n– O laranja vibrante destaca energia, presença digital e pontos de foco na comunicação.\n\nCada cor possui especificações próprias para uso em diferentes meios, garantindo consistência nas aplicações digitais e impressas.",
    typography: "A tipografia escolhida reflete a personalidade da marca, transmitindo seriedade, modernidade e acessibilidade.\n\n– A fonte manuscrita Darken Jellybean é utilizada no logotipo, reforçando humanidade, singularidade e a sensação de assinatura pessoal.\n– A fonte Podcast é aplicada em títulos e destaques, garantindo presença e legibilidade.\n– A Bebas Neue complementa o sistema tipográfico em contextos específicos, trazendo firmeza e clareza em composições de apoio.\n\nO uso consistente dessas famílias em materiais gráficos e digitais é fundamental para a construção de uma identidade sólida e reconhecível ao longo do tempo.",
    symbols: "Os símbolos do Akedah Podcast foram desenvolvidos como ícones de apoio à identidade visual. Eles não substituem o logotipo principal, mas reforçam os conceitos e valores do projeto em diferentes aplicações gráficas, digitais e promocionais.\n\n– O troféu reflete vitória, superação e conquistas, pessoais e coletivas, que o podcast busca incentivar em seus ouvintes e convidados.\n– A estrela evoca inspiração, propósito e destaque, simbolizando a relevância do projeto e sua contribuição no cenário de debates e reflexões.\n– A chave representa a virada de chave proporcionada pelas conversas e reflexões, simbolizando novas perspectivas e mudanças significativas que os convidados e o público podem vivenciar.",
    nonRecommended: "Para preservar a integridade e o reconhecimento da marca, o manual define exemplos claros de aplicações que não são permitidas. Entre os usos incorretos estão:\n– esticar ou comprimir o logotipo;\n– alterar as cores originais;\n– aplicar sombras, gradientes ou contornos não previstos;\n– girar ou inverter o logotipo;\n– utilizá‑lo em fundos sem contraste, que dificultem a leitura;\n– inserir efeitos ou tipografias não autorizadas.\n\nEvitar essas distorções é essencial para manter a força, a clareza e a consistência visual da identidade em qualquer contexto.",
    applications: "Para demonstrar o potencial da identidade visual, foram desenvolvidas simulações do logotipo e dos elementos da marca em diferentes superfícies e materiais: capas de episódios, posts para redes sociais, peças de divulgação e cartão de visita.\n\nEssas aplicações servem como referência visual para orientar o uso da marca no dia a dia e garantir que a identidade do Akedah Podcast se mantenha coerente, reconhecível e alinhada ao seu propósito em qualquer ponto de contato com o público.",
    finalResult: "O projeto resultou em uma identidade visual completa, tecnicamente estruturada e visualmente memorável, pronta para acompanhar o crescimento do Akedah Podcast em diferentes canais e formatos.\n\nCom o manual de identidade e o sistema de aplicações definidos, o podcast passa a contar com uma base sólida para se comunicar com consistência, reforçando sua mensagem de fé, profundidade e transformação em cada novo episódio.",
    strategy: "Mapeamos o território simbólico do podcast e construímos um sistema visual baseado em contraste, profundidade e ritmo tipográfico, capaz de funcionar tanto no digital quanto em ativações físicas.",
    solution: "Criamos um manual completo com 11 páginas incluindo logo, variações, malha construtiva, paleta de cores, tipografia e aplicações.",
    result: "Identidade visual coesa e memorável que posicionou o podcast como referência no segmento, com reconhecimento imediato em todas as plataformas.",
    tags: ["Logo Design", "Manual de Marca", "Podcast", "Branding Estratégico"],
    videoBlock: {
      title: "Vinheta de abertura",
      url: "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/c5gd52ps3vc-1779796422280.gif",
      description: "Esta vinheta foi criada para reforçar a identidade visual do podcast em cada episódio, conectando tipografia, cores e ritmo sonoro à essência do projeto: conversas profundas, autênticas e guiadas por propósito. Ela funciona como a assinatura visual e sonora da marca, abrindo e encerrando os conteúdos com consistência."
    },
    logo: akedahLogo,
    pages: [
      "https://wqxuprmlsapiucjxleih.supabase.co/storage/v1/object/public/files/0be7b96c-cdbe-49cb-8204-bd3aedb69fd1-Logo_Backgound_Marrom_1920x1080.png", 
      akedahPag2, 
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/2oh9p0w2s4s-1779798746900.png", 
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/kdno3twnwhl-1778460683658.png", 
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/5crxqn5dosm-1778460992251.png",
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/o0jdg67ugl-1778461519546.png",
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/1erxj049prw-1778461621817.png",
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/ot2f8gdzega-1778461772009.png",
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/gxgomdmador-1778461875600.png",
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/inp2apbic18-1778462036867.png",
    ],
    client: "Akedah Podcast",
    year: "2025",
    service: "Identidade Visual Completa",
    deliverables: ["Logotipo principal", "Manual de marca (11 páginas)", "Sistema tipográfico", "Paleta cromática", "Aplicações"],
    role: "Direção criativa, estratégia de marca e design",
  },
  {
    id: 2,
    slug: "construmar",
    title: "Construmar",
    category: "Logotipo essencial",
    bgColor: "#030304",
    heroGradient: {
      from: "#2D3748",
      to: "#718096",
      titleColor: "#F7FAFC",
      subtitleColor: "#CBD5E0",
    },
    heroBanner: construmarBanner.url,
    nextProjectLogo: construmarLogoHorizontal.url,
    coverImage: "/capa-site-kiiro.png",
    intro: "Sistema visual desenvolvido para transmitir credibilidade, clareza e força em um mercado altamente competitivo.",
    subtitle: "Identidade visual estratégica para uma marmoraria que une tradição, precisão e sofisticação.",
    about: "A Construmar Marmoraria buscou renovar sua marca para refletir o nível de excelência e cuidado artesanal aplicados em cada peça. O projeto focou em criar uma identidade que comunicasse solidez e precisão técnica, atraindo um público que valoriza design e qualidade superior em acabamentos de pedras naturais.",
    challenge: "A marca anterior não transmitia a sofisticação necessária para o novo posicionamento da empresa. Era preciso criar um sistema visual que se diferenciasse dos clichês do setor, trazendo uma linguagem moderna, limpa e que passasse confiança imediata aos clientes e parceiros arquitetos.",
    objective: "Desenvolver uma identidade visual minimalista e impactante que traduzisse a solidez da empresa e a precisão do seu trabalho. O sistema precisava ser versátil o suficiente para funcionar com clareza em diversos suportes, desde uniformes e frotas até catálogos e plataformas digitais.",
    concept: "O logotipo da Construmar foi concebido para expressar a interseção entre a força bruta da pedra e a precisão do corte industrial. A tipografia foi selecionada para evocar exclusividade, enquanto o layout valoriza o equilíbrio e a clareza visual, refletindo o compromisso da marca com a perfeição nos detalhes.",
    variations: "Para garantir que a marca mantenha sua integridade em diferentes contextos, foram desenvolvidas variações oficiais do logotipo. Essas versões permitem flexibilidade de aplicação em fundos claros e escuros, além de formatos verticais e horizontais, assegurando que a identidade seja sempre reconhecível e impactante.",
    colors: "A paleta de cores da Construmar é composta por tons sóbrios e elegantes, inspirados na estética natural das pedras nobres. O uso dessas cores reforça o posicionamento premium da marca e cria uma base neutra e sofisticada que valoriza as imagens dos produtos e projetos executados pela empresa.",
    secondaryVariations: "As versões monocromáticas foram criadas para situações onde a reprodução em cores é limitada ou quando se busca uma estética mais minimalista. Elas garantem que a força do símbolo e a legibilidade da tipografia permaneçam intactas, independentemente da técnica de impressão ou do suporte utilizado.",
    secondaryVariationsImage: construmarMonocrom.url,
    construction: "A construção do logotipo seguiu uma malha técnica rigorosa para garantir harmonia e equilíbrio em todas as suas partes. Cada proporção foi calculada para assegurar que o logotipo funcione perfeitamente em qualquer escala, mantendo a simetria e a precisão que são pilares da marca.",
    minimumReduction: "Para preservar a legibilidade da marca em tamanhos pequenos, foram estabelecidos limites de redução mínima. Essas diretrizes garantem que, mesmo em aplicações reduzidas como canetas ou pequenos selos digitais, a marca Construmar continue nítida e com leitura clara de todos os seus elementos.",
    minimumReductionImage: construmarReducao.url,
    typography: "A tipografia escolhida para a Construmar combina modernidade com um toque clássico, refletindo o equilíbrio entre inovação tecnológica e tradição artesanal. A escolha de fontes com traços limpos e alta legibilidade é fundamental para manter a comunicação da marca clara e sofisticada em todos os pontos de contato.",
    applications: "A identidade visual foi pensada para se adaptar com naturalidade a uma vasta gama de aplicações, desde o ambiente digital até suportes físicos como uniformes, frotas e sinalização. Cada aplicação foi testada para garantir que a marca reforce o profissionalismo e a autoridade da Construmar em qualquer situação.",
    nonRecommended: "Para manter a força e o reconhecimento da identidade visual, é fundamental evitar distorções ou usos incorretos da marca. O manual define claramente o que não deve ser feito, como alterar cores, deformar o símbolo ou utilizar o logotipo em fundos que comprometam sua visibilidade e prestígio.",
    finalResult: "O resultado final é uma identidade visual atemporal, sólida e altamente sofisticada. O novo sistema de marca permitiu que a Construmar se posicionasse com autoridade no mercado, comunicando com clareza seus valores de precisão, qualidade e compromisso com a excelência em cada projeto entregue.",
    strategy: "Desenvolvemos uma linguagem visual minimalista e potente, focada em tipografia de alta qualidade e composições equilibradas, elevando a percepção de valor da marca perante o mercado de arquitetura e design.",
    solution: "Entregamos um sistema de identidade completo, incluindo manual técnico detalhado e diretrizes de aplicação, garantindo que a nova marca seja gerida com consistência e profissionalismo em todos os canais.",
    result: "Uma marca renovada que transmite confiança e excelência, pronta para acompanhar o crescimento da Construmar e consolidar sua liderança no segmento de marmoraria premium.",
    tags: ["Logo Design", "Manual de Marca", "Marmoraria", "Rebranding"],
    logo: construmarLogo,
    pages: [
      construmarLogo2.url,
      construmarVersoes.url,
      construmarPaleta.url,
      construmarMonocrom.url,
      construmarGrid.url,
      construmarReducao.url,
      construmarTipo.url,
      construmarPermit.url,
      construmarNaoPermit.url,
    ],
    client: "Construmar",
    year: "2025",
    service: "Rebranding",
    deliverables: ["Logotipo redesenhado", "Manual de marca detalhado", "Versões monocromáticas", "Diretrizes de aplicação"],
    role: "Direção criativa e design de identidade",
  },
  {
    id: 3,
    slug: "tabernaculo-da-trindade",
    title: "Tabernáculo da Trindade",
    category: "Identidade visual",
    bgColor: "#05121C",
    heroGradient: {
      from: "#06121C",
      to: "#C2A782",
      titleColor: "#F5E8D0",
      subtitleColor: "#E0C89A",
    },
    heroBanner: tabernaculoBanner.url,
    finalResult: "O projeto resultou em uma identidade visual sólida e contemporânea que honra a tradição da igreja enquanto a posiciona com clareza no ambiente digital. Agora, a Igreja Tabernáculo da Trindade possui uma imagem profissional e reverente que reflete sua história desde 1998 e seu compromisso inabalável com a Palavra.",
    intro: "Atualização da identidade visual de uma igreja com história desde 1998, equilibrando tradição, simbologia bíblica e linguagem contemporânea.",
    subtitle: "Manual de Identidade Visual para a Igreja Tabernáculo da Trindade.",
    about: "Fundada em 1998, como fruto de um ministério familiar profundamente enraizado na fé, a igreja cresceu de um pequeno grupo para uma comunidade com alcance digital global, mantendo firme seu compromisso com a Palavra.\n\nNossa missão é clara: ser a Palavra em ação (Tiago 1:22–27), alcançando vidas por meio da pregação do Evangelho puro e do serviço prático. Este manual assegura que a comunicação visual reflita fielmente esse ministério — transmitindo seriedade, contemporaneidade e compromisso com a verdade bíblica.\n\nA identidade visual equilibra tradição e modernidade. O símbolo histórico — o Leão de Judá flamejante — permanece preservado em sua essência, agora atualizado com uma abordagem visual contemporânea. O sistema tipográfico complementa essa construção, oferecendo versatilidade e clareza para o contexto digital atual.",
    challenge: "O projeto de identidade visual precisava preservar a essência histórica da igreja enquanto modernizava sua comunicação para o ambiente digital, garantindo que a força teológica do Leão de Judá fosse transmitida com clareza e elegância.",
    objective: "Desenvolver um sistema completo que inclua logotipo, monograma, grid de construção, variações internacionais e assinaturas missionárias, mantendo a unidade e a reverência da marca em todas as suas frentes de atuação.",
    
    variations: "Esta é a versão PRINCIPAL para uso diário. Utilize em 80% das aplicações: redes sociais, slides, papelaria, assinaturas de email.\n\nAs versões alternativas foram criadas para garantir adaptação adequada a diferentes fundos, mantendo legibilidade e padrão visual.",
    
    monogram: "O monograma é uma versão simplificada da identidade visual, construída a partir das iniciais do nome “Igreja Tabernáculo da Trindade”. Ele foi desenvolvido para aplicações onde o uso do logotipo completo não é necessário, mantendo reconhecimento e unidade visual da marca.\n\nSua utilização é indicada para perfis em redes sociais, selos, materiais promocionais, marca d’água e pequenos formatos, garantindo legibilidade e identificação mesmo em tamanhos reduzidos.",
    
    construction: "O logotipo principal e o monograma foram desenvolvidos a partir de uma malha construtiva (grid), garantindo equilíbrio, alinhamento e proporções harmoniosas entre símbolo e tipografia.\n\nO uso do grid assegura consistência estrutural, organização visual e precisão geométrica na composição da marca. Essa construção técnica reforça a estabilidade e a solidez que a identidade representa.\n\nO grid não deve ser alterado ou reconstruído manualmente, preservando sempre as proporções originais do projeto.",
    
    symbol: "O símbolo representa o Leão de Judá, referência bíblica à autoridade, realeza e vitória de Cristo. Sua presença central na identidade reforça a soberania de Deus como fundamento do ministério.\n\nA composição luminosa e ascendente remete à glória divina, à presença do Espírito Santo e à vida transformada pelo Evangelho. O símbolo comunica força, proteção e esperança, tornando-se o principal elemento de reconhecimento da marca.",
    
    biblicalSimbology: "",
    
    englishIdentity: "A versão em inglês da marca — International Trinity Tabernacle — foi desenvolvida para comunicações com alcance global, mantendo a mesma estrutura, tipografia e conceitos visuais do logotipo original em português. Seu uso é indicado em materiais voltados a públicos internacionais, missões transculturais e conteúdos digitais em inglês, garantindo unidade de identidade em todos os contextos.",
    
    missionsLogo: "TT Missions é a identidade visual dedicada aos projetos missionários internacionais da Tabernáculo da Trindade. Essa assinatura representa o compromisso da igreja em levar o Evangelho além das fronteiras culturais e geográficas, servindo povos e nações com a mesma Palavra que a fundamenta desde 1998.\n\nO elemento da chama dentro da letra “O” reforça o caráter missional inflamado pelo Espírito Santo, que envia, capacita e sustenta cada ação em campo.",
    
    secondaryVariations: "O logotipo possui duas composições principais com o símbolo institucional: versão vertical e versão horizontal.\n\nA versão vertical reforça a hierarquia do símbolo como estandarte da identidade, sendo indicada para aplicações institucionais, materiais devocionais e formatos com maior altura. A versão horizontal foi desenvolvida para situações em que o espaço disponível é mais amplo que alto, como fachadas, cabeçalhos, banners e materiais digitais.",
    
    animatedLogoVideo: "https://wqxuprmlsapiucjxleih.supabase.co/storage/v1/object/public/files/dcea5c4a-888f-4a5f-bcfd-10febf11b697-animacao.mp4",
    animatedLogoDescription: "A animação do logotipo traz vida à identidade visual, destacando a força do Leão de Judá e a fluidez dos elementos gráficos. Criada para ser utilizada em aberturas de vídeos, mídias sociais e apresentações digitais, ela reforça o dinamismo e a modernidade da Igreja Tabernáculo da Trindade.",

    
    colors: "A paleta de cores foi definida para refletir os valores espirituais e institucionais da Tabernáculo da Trindade:\n\n– DOURADO (#C2A782): Representa a glória de Deus, realeza, santidade e autoridade espiritual.\n– AZUL MARINHO (#06121C): Simboliza eternidade, reverência e dimensão celestial.\n– PRETO (#000000): Comunica sobriedade, respeito e solidez.\n– BRANCO (#FFFFFF): Reforça pureza, luz e clareza.",
    
    typography: "A marca utiliza a Cinzel como tipografia principal, aplicada ao nome institucional e títulos, e a Source Sans 3 como tipografia de apoio, indicada para textos informativos e conteúdos digitais. Essa combinação garante identidade visual consistente, mantendo solenidade e legibilidade em todas as aplicações.",
    
    nonRecommended: "Para preservar a integridade e o reconhecimento da marca, o logotipo não deve sofrer alterações ou usos inadequados. Não é permitido alterar as cores oficiais, aplicar contornos ou efeitos adicionais, utilizar o logotipo sobre fundos sem contraste adequado, nem distorcer suas proporções por esticamento ou compressão.",
    
    strategy: "Atualizamos o sistema visual preservando o símbolo histórico do Leão de Judá e expandindo a marca em variações, monograma e assinaturas internacionais para diferentes frentes do ministério.",
    solution: "Manual de identidade completo, incluindo logotipo principal, monograma, grid de construção, simbologia bíblica, versão internacional, TT Missions, paleta de cores e tipografia.",
    result: "Identidade visual sólida, reverente e contemporânea, pronta para sustentar a comunicação da igreja em escala local e global, do púlpito às redes sociais.",
    tags: ["Identidade Visual", "Manual de Marca", "Igreja", "Branding"],
    logo: tabernaculoLogo,
    pages: [
      tabernaculoLogo, // P1 (Capas)
      tabernaculoPag2, // Placeholder
      tabernaculoPag3, // Placeholder
      tabernaculoPag4, // Placeholder
      tabernaculoPag5, // Placeholder
      tabernaculoPag6, // Placeholder
      tabernaculoPag7, // Placeholder
      tabernaculoPag8, // Placeholder
      tabernaculoPag9, // Placeholder
      tabernaculoPag10, // Placeholder
      tabernaculoPag11, // Placeholder
      tabernaculoPag12, // Placeholder
    ],
    client: "Igreja Tabernáculo da Trindade",
    year: "2026",
    service: "Identidade Visual",
    deliverables: ["Logotipo principal", "Monograma", "Versão internacional (ITT)", "Assinatura TT Missions", "Manual de marca (12 páginas)", "Paleta cromática e tipografia"],
    role: "Direção criativa e design de identidade",
  },
  {
    id: 4,
    slug: "team-luisa-crosstraining",
    heroBanner: teamLuisaBanner.url,
    title: "Team Luísa Crosstraining",
    category: "Logotipo essencial",
    coverImage: "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/itao7p6ecpb-1779904571956.png",
    bgColor: "#1D1D1B",
    heroGradient: {
      from: "#8B1A1A",
      to: "#F26522",
      titleColor: "#FFE8D6",
      subtitleColor: "#FFCBA4",
    },

    intro: "Projeto visual com linguagem forte e memorável, criado para destacar a marca e reforçar sua presença no mercado.",
    subtitle: "Rebranding dinâmico para uma comunidade de cross training que valoriza força, energia e união.",
    about: "O Team Luísa Crosstraining é mais do que um centro de treinamento; é uma comunidade vibrante e focada em resultados. O projeto de rebranding visou traduzir essa energia coletiva e a força individual em uma identidade visual que motivasse os alunos e atraísse novos membros.",
    challenge: "O box precisava de uma marca que se destacasse no saturado mercado fitness. O desafio era criar algo que comunicasse a intensidade do cross training, mas que também fosse acolhedor e representasse o senso de pertencimento da equipe.",
    objective: "Desenvolver uma identidade forte, moderna e extremamente versátil, capaz de estampar desde camisetas e equipamentos até uma presença digital marcante no Instagram, fortalecendo a marca como líder em sua região.",
    concept: "O conceito visual foca no movimento e no impacto. A tipografia 'bold' e pesada reflete a força dos treinos, enquanto elementos gráficos dinâmicos sugerem agilidade e evolução constante, criando uma marca que parece estar sempre em ação.",
    variations: "Foram criadas versões otimizadas para diferentes suportes: desde assinaturas horizontais para faixadas até ícones compactos para redes sociais e aplicações em vestuário, garantindo que a energia da marca seja transmitida em qualquer escala.",
    construction: "A construção do logotipo baseia-se em ângulos fortes e traços precisos. A malha técnica assegura que a marca mantenha sua força visual mesmo quando aplicada em materiais texturizados ou superfícies curvas de equipamentos esportivos.",
    colors: "A paleta de cores é intensa e energética, fugindo dos tons óbvios. A combinação de cores vibrantes com fundos escuros cria um contraste alto que é ideal para o ambiente de treino e para o destaque visual em mídias digitais.",
    typography: "A seleção tipográfica prioriza fontes robustas e com grande peso visual, refletindo a força e a determinação do cross training. O uso de uma tipografia 'bold' garante excelente legibilidade em diversas escalas, desde materiais impressos até aplicações digitais, mantendo a consistência e o impacto da marca em todos os pontos de contato.",
    instagramPosts: "Para as redes sociais, desenvolvemos um sistema de layouts dinâmicos e impactantes. O design dos posts para o Instagram foca na energia da comunidade Team Luísa, utilizando elementos gráficos que reforçam o movimento e a intensidade dos treinos, garantindo uma presença digital forte e reconhecível.",
    instagramPostsImage: "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/hhta7wcjj7h-1779903798291.png",
    symbols: "Elementos de apoio inspirados na rotina do box, como padrões de movimento e ícones de treino, foram integrados para criar um sistema visual completo. Eles ajudam a contar a história da marca em cada postagem ou material impresso.",
    nonRecommended: "Para preservar o impacto, o manual proíbe o uso de fontes leves demais, cores desbotadas ou aplicações que comprometam o contraste. A marca deve ser sempre apresentada with o máximo de força e clareza.",
    applications: "A versatilidade da marca é demonstrada em aplicações como bandeiras, fachadas e vestuário. O sistema visual foi projetado para manter sua integridade e impacto em diferentes materiais e superfícies, como moletons e sinalizações, reforçando o senso de pertencimento e a força da comunidade.",
    finalResult: "O projeto entregou uma identidade visual pulsante que transformou a percepção da marca. Agora, o Team Luísa possui uma imagem profissional que reflete a qualidade técnica dos seus treinos e a força da sua comunidade.",
    strategy: "Aplicamos um sistema gráfico com peso tipográfico marcante, paleta densa e ativações sociais que reforçam o senso de pertencimento da comunidade.",
    solution: "Rebranding completo com manual de 6 páginas, incluindo variações do logo, paleta energética, tipografia bold e layout de posts para Instagram.",
    result: "Marca com personalidade marcante que se destaca nas redes sociais e fortalece o senso de comunidade entre os alunos.",
    tags: ["Rebranding", "Social Media", "Cross Training"],
    logo: teamluisaLogo,
    pages: [
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/kr94vaushs-1779832145219.png", 
      teamluisaPag2, 
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/33lh3d1zz0e-1779832163138.png", 
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/1f28u9q45ph-1779904419347.png", 
      "", 
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/jjefhgq7cbf-1779832308538.png", 
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/1n8z4j65gvg-1779832362244.png", 
      "",
      "",
      "https://dohkkmvsrcuxssxmimxn.supabase.co/storage/v1/object/public/images/kzgfz4it0w-1779832480688.png",
    ],
    client: "Team Luísa Crosstraining",
    year: "2024",
    service: "Rebranding e Social Media",
    deliverables: ["Rebranding completo", "Manual de marca (6 páginas)", "Templates para Instagram", "Sistema visual"],
    role: "Direção criativa, branding e social design",
  },
];
