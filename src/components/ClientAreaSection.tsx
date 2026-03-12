import { motion } from "framer-motion";

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Transparência total",
    description: "Acompanhe cada fase do projeto em tempo real, sem precisar perguntar.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    title: "Arquivos centralizados",
    description: "Todos os entregáveis organizados em um só lugar, disponíveis a qualquer momento.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Financeiro detalhado",
    description: "Visualize valores, parcelas e status de pagamento com clareza e organização.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Comunicação direta",
    description: "Envie mensagens e feedbacks diretamente pela plataforma, tudo registrado.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Acesso seguro e exclusivo",
    description: "Login protegido com acesso apenas aos seus projetos e informações.",
  },
];

const ClientAreaSection = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-editorial">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70 mb-4">
            Área do Cliente
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Acompanhe seu projeto
            <br />
            em tempo real
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl leading-relaxed">
            No Studio Kiiro, cada cliente tem acesso a um painel exclusivo onde
            acompanha as fases do projeto, acessa arquivos entregues e visualiza
            o financeiro — tudo com transparência e organização.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-24">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex gap-4 p-6 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-all duration-500"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground">
                {b.icon}
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-primary-foreground mb-1">
                  {b.title}
                </h4>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {b.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mockup placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 overflow-hidden">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-primary-foreground/10 bg-primary-foreground/5">
              <span className="w-3 h-3 rounded-full bg-destructive/60" />
              <span className="w-3 h-3 rounded-full bg-primary-foreground/30" />
              <span className="w-3 h-3 rounded-full bg-primary-foreground/20" />
              <span className="ml-4 text-xs text-primary-foreground/50 font-mono">
                studiokiiro.com/area-do-cliente
              </span>
            </div>

            {/* Placeholder for screenshots */}
            <div className="aspect-video flex items-center justify-center bg-primary-foreground/5">
              <div className="text-center px-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-primary-foreground/30 flex items-center justify-center">
                  <svg className="w-7 h-7 text-primary-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-primary-foreground/50 text-sm">
                  Insira aqui os prints ou mockups da interface da Área do Cliente
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <a
              href="/area-do-cliente"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary-foreground text-primary font-display font-bold text-sm uppercase tracking-wider hover:bg-primary-foreground/90 transition-colors duration-300"
            >
              Acessar minha área
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientAreaSection;
