import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Briefing",
    description:
      "Entendemos suas necessidades, seu público e seus objetivos para alinhar expectativas e definir a direção criativa.",
    clientView:
      "Você recebe acesso ao painel e acompanha o briefing validado e a direção criativa aprovada.",
  },
  {
    number: "02",
    title: "Pesquisa & Conceito",
    description:
      "Analisamos o mercado, referências e concorrentes para criar um conceito visual sólido e estratégico.",
    clientView:
      "Na plataforma, você visualiza moodboards e referências apresentadas, tudo documentado.",
  },
  {
    number: "03",
    title: "Criação",
    description:
      "Desenvolvemos a identidade visual, peças e materiais com atenção a cada detalhe, do conceito à execução.",
    clientView:
      "Acompanhe o progresso em tempo real e envie feedbacks diretamente pelo painel.",
  },
  {
    number: "04",
    title: "Entrega & Suporte",
    description:
      "Entregamos todos os arquivos finais organizados, junto com o manual de marca e suporte para implementação.",
    clientView:
      "Todos os arquivos ficam disponíveis na sua biblioteca, organizados e prontos para download.",
  },
];

const ProcessSection = () => {
  return (
    <section
      id="processo"
      className="section-padding border-t border-border bg-primary text-primary-foreground"
    >
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70 mb-4">
            Processo
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold">
            Como trabalhamos
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative"
            >
              <span className="font-display text-6xl md:text-7xl font-bold text-primary-foreground/15 leading-none">
                {step.number}
              </span>
              <h3 className="font-display text-xl font-bold mt-2 mb-3 text-primary-foreground">
                {step.title}
              </h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
                {step.description}
              </p>
              {/* Client area connection */}
              <div className="flex items-start gap-2 pt-3 border-t border-primary-foreground/10">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-foreground/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-primary-foreground/50 text-xs leading-relaxed">
                  {step.clientView}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-primary-foreground/10 text-center"
        >
          <p className="text-primary-foreground/60 text-sm">
            Cada etapa é visível no seu{" "}
            <a
              href="/area-do-cliente"
              className="underline underline-offset-4 hover:text-primary-foreground transition-colors"
            >
              painel exclusivo
            </a>
            . Sem surpresas, sem dúvidas — só clareza do início ao fim.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
