import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Briefing",
    description: "Entendemos suas necessidades, seu público e seus objetivos para alinhar expectativas e definir a direção criativa.",
  },
  {
    number: "02",
    title: "Pesquisa & Conceito",
    description: "Analisamos o mercado, referências e concorrentes para criar um conceito visual sólido e estratégico.",
  },
  {
    number: "03",
    title: "Criação",
    description: "Desenvolvemos a identidade visual, peças e materiais com atenção a cada detalhe, do conceito à execução.",
  },
  {
    number: "04",
    title: "Entrega & Suporte",
    description: "Entregamos todos os arquivos finais organizados, junto com o manual de marca e suporte para implementação.",
  },
];

const ProcessSection = () => {
  return (
    <section id="processo" className="section-padding border-t border-border bg-primary text-primary-foreground">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70 mb-4">Processo</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Como trabalhamos
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative"
            >
              <span className="font-display text-6xl md:text-7xl font-bold text-primary/10 leading-none">
                {step.number}
              </span>
              <h3 className="font-display text-xl font-bold mt-2 mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
