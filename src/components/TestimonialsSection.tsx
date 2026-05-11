import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Daniel Silva",
    role: "Fundador, Akedah Podcast",
    text: "O Studio Kiiro entregou muito mais do que um logo, entregou uma identidade que me deu orgulho de apresentar o podcast. Profissionalismo e atenção aos detalhes impressionantes.",
    featured: true,
  },
  {
    name: "Danielle",
    role: "Proprietária, Construmar",
    text: "Desde que atualizamos nossa identidade visual, os clientes nos enxergam de forma completamente diferente. O manual de marca ficou impecável e fez toda a diferença.",
    featured: false,
  },
  {
    name: "Luisa Santos",
    role: "Fundadora, Team Luisa CT",
    text: "A nova marca transmite exatamente a energia que eu queria pro box. Os posts no Instagram ficaram muito mais profissionais e os alunos adoraram.",
    featured: false,
  },
];

const TestimonialsSection = () => {
  const featured = testimonials.find((t) => t.featured)!;
  const others = testimonials.filter((t) => !t.featured);

  return (
    <section className="section-padding border-t border-border">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Depoimentos</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold">
            O que dizem os clientes
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {/* Featured testimonial — larger */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="p-10 md:p-12 rounded-2xl border border-primary/20 bg-card flex flex-col justify-between"
          >
            <div>
              <svg className="w-10 h-10 text-primary/40 mb-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-foreground leading-relaxed text-lg md:text-xl mb-10">
                "{featured.text}"
              </p>
            </div>
            <div>
              <p className="font-display font-bold text-foreground text-lg">{featured.name}</p>
              <p className="text-sm text-muted-foreground">{featured.role}</p>
            </div>
          </motion.div>

          {/* Smaller testimonials stacked */}
          <div className="flex flex-col gap-8 md:gap-10">
            {others.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 rounded-2xl border border-border bg-card flex-1"
              >
                <svg className="w-7 h-7 text-primary/30 mb-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-secondary-foreground leading-relaxed text-base mb-6">
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
      </div>
    </section>
  );
};

export default TestimonialsSection;
