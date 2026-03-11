import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Daniel Silva",
    role: "Fundador, Akedah Podcast",
    text: "O Studio Kiiro entregou muito mais do que um logo — entregou uma identidade que me deu orgulho de apresentar o podcast. Profissionalismo e atenção aos detalhes impressionantes.",
  },
  {
    name: "Fernanda Costa",
    role: "Proprietária, Construmar",
    text: "Desde que atualizamos nossa identidade visual, os clientes nos enxergam de forma completamente diferente. O manual de marca ficou impecável e fez toda a diferença.",
  },
  {
    name: "Luisa Ferreira",
    role: "Fundadora, Team Luisa CT",
    text: "A nova marca transmite exatamente a energia que eu queria pro box. Os posts no Instagram ficaram muito mais profissionais e os alunos adoraram.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding border-t border-border">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Depoimentos</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            O que dizem os clientes
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 rounded-2xl border border-border bg-card"
            >
              <svg className="w-8 h-8 text-primary/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-secondary-foreground leading-relaxed mb-8 text-base">
                "{t.text}"
              </p>
              <div>
                <p className="font-display font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
