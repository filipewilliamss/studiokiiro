import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const method = [
  {
    title: "Estratégia",
    copy: "A marca começa no que precisa ser dito. Encontramos o ponto de vista que dá direção ao projeto.",
  },
  {
    title: "Identidade",
    copy: "Transformamos essa direção em símbolo, tipografia, cor e ritmo para a marca ser reconhecida.",
  },
  {
    title: "Presença",
    copy: "Organizamos o sistema nos pontos de contato que aproximam a marca das pessoas.",
  },
];

const KiiroMethodSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="processo" className="relative overflow-hidden bg-[#111311] text-white">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,202,22,0.11),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(255,255,255,0.045),transparent_28%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-6 py-28 sm:px-10 md:py-40 lg:grid-cols-[0.82fr_1.18fr] lg:px-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFCA16]">Processo</p>
          <h2 className="max-w-xl text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.8] tracking-[-0.08em] text-balance">
            Dar forma<br />
            <em className="font-normal">exige intenção.</em>
          </h2>
          <p className="mt-9 max-w-md text-base leading-relaxed text-white/58 md:text-lg">
            Um caminho claro para transformar uma ideia em uma presença que permanece.
          </p>
          <a
            href="#contato"
            className="mt-10 inline-flex items-center gap-3 border-b border-white/35 pb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white transition-colors hover:border-[#FFCA16] hover:text-[#FFCA16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCA16] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111311]"
          >
            Conversar sobre um projeto
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>

        <div className="border-t border-white/16">
          {method.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : index * 0.08 }}
              className="group border-b border-white/16 py-10 md:py-14"
            >
              <div className="grid gap-5 md:grid-cols-[0.75fr_1fr_auto] md:items-start md:gap-8">
                <h3 className="text-4xl font-bold tracking-[-0.06em] transition-colors duration-300 group-hover:text-[#FFCA16] md:text-6xl">
                  {item.title}
                </h3>
                <p className="max-w-md text-base leading-relaxed text-white/58 md:pt-2 md:text-lg">{item.copy}</p>
                <ArrowUpRight className="mt-1 hidden h-6 w-6 text-white/38 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FFCA16] md:block" strokeWidth={1.25} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KiiroMethodSection;

