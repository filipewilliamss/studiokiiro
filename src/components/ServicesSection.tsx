import { motion } from "framer-motion";

const serviceCategories = [
  {
    category: "Identidade Visual",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    items: [
      { title: "Pacote 1 — Logotipo Essencial", description: "Criação de logotipo profissional com versões e arquivos prontos para uso." },
      { title: "Pacote 2 — Identidade Visual", description: "Logotipo + paleta de cores, tipografia e elementos visuais que posicionam sua marca." },
      { title: "Pacote 3 — Branding Completo", description: "Identidade visual completa com manual de marca, papelaria, aplicações e estratégia visual." },
      { title: "Serviço Avulso — Manual do Logotipo", description: "Para quem já tem logotipo mas precisa de um manual profissional e arquivos editáveis organizados." },
    ],
  },
  {
    category: "Design de Conteúdo para Redes Sociais",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    items: [
      { title: "Pacote Pontual", description: "Criação de posts, stories, carrosséis e templates sob demanda para campanhas ou necessidades específicas." },
      { title: "Retainer Mensal", description: "Gestão visual contínua das suas redes sociais com entregas recorrentes e consistência de marca." },
    ],
  },
  {
    category: "Edição de Vídeo",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    items: [
      { title: "Reels / Shorts", description: "Edições dinâmicas e envolventes para Instagram Reels, YouTube Shorts e TikTok." },
      { title: "Institucional (2-5min)", description: "Vídeos institucionais profissionais para apresentar sua empresa, produto ou serviço." },
      { title: "Tutorial / Educativo", description: "Vídeos didáticos e explicativos para cursos, onboarding ou conteúdo educacional." },
    ],
  },
  {
    category: "Sites e Landing Pages",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    items: [
      { title: "Landing Page Simples", description: "Página única com até 6 seções, otimizada para conversão e com design responsivo." },
      { title: "Landing Page Completa", description: "Página robusta com até 12 seções, estratégia de conversão avançada e design premium." },
      { title: "Site Institucional", description: "Presença digital completa com 3-5 páginas, alinhada à identidade da sua marca." },
      { title: "Site Completo", description: "Solução digital completa com 5-8 páginas, funcionalidades avançadas e integração total." },
    ],
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="section-padding">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Serviços</p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold">
            O que fazemos
          </h2>
        </motion.div>

        {/* Micro-highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center gap-3 px-5 py-3 rounded-full border border-primary/20 bg-primary/5 w-fit"
        >
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-xs text-muted-foreground">
            Todos os serviços incluem acesso ao{" "}
            <a href="/area-do-cliente" className="text-primary hover:underline underline-offset-4">
              painel exclusivo de acompanhamento
            </a>
          </span>
        </motion.div>

        <div className="space-y-16">
          {serviceCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary">
                  {cat.icon}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {cat.category}
                </h3>
              </div>
              <div className={`grid gap-4 ${cat.items.length > 2 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2'}`}>
                {cat.items.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group p-6 md:p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-surface-hover transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.1)]"
                  >
                    <h4 className="font-display text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
