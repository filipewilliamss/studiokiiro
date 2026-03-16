import { motion } from "framer-motion";
import { useState } from "react";

const serviceProcesses = [
  {
    label: "Identidade Visual",
    steps: [
      { number: "01", title: "Imersão e Estratégia", description: "Entendemos o negócio, o público e os objetivos para criar uma base estratégica sólida." },
      { number: "02", title: "Conceituação", description: "Traduzimos a estratégia em direções visuais com moodboards e referências curadas." },
      { number: "03", title: "Criação", description: "Desenvolvemos o logotipo e o sistema visual com atenção a cada detalhe." },
      { number: "04", title: "Refinamento", description: "Ajustamos e expandimos o sistema visual com base no seu feedback." },
      { number: "05", title: "Entrega", description: "Entregamos todos os arquivos organizados com manual de identidade visual." },
    ],
  },
  {
    label: "Personal Brand Kit",
    steps: [
      { number: "01", title: "Imersão Pessoal", description: "Descobrimos quem você é como marca, sua essência, público e como quer ser percebido." },
      { number: "02", title: "Direção Visual", description: "Criamos moodboards editoriais com paleta, tipografia e atmosfera visual para aprovação." },
      { number: "03", title: "Logo e Sistema", description: "Desenvolvemos seu logo pessoal, sistema de cores, tipografia e elemento gráfico de apoio." },
      { number: "04", title: "Templates", description: "Criamos 5 templates editáveis no Canva e mockups de feed e perfil do Instagram." },
      { number: "05", title: "Guia e Entrega", description: "Entregamos o mini-guia editorial, todos os arquivos e templates prontos para usar." },
    ],
  },
  {
    label: "Redes Sociais",
    steps: [
      { number: "01", title: "Briefing e Estratégia", description: "Definimos o guia de estilo, tipos de peças e formatos prioritários para suas redes." },
      { number: "02", title: "Templates e Layout", description: "Criamos os templates base e simulamos como o feed vai ficar com consistência visual." },
      { number: "03", title: "Produção", description: "Produzimos todas as peças (posts, carrosséis, stories) com excelência técnica." },
      { number: "04", title: "Entrega", description: "Entregamos as peças organizadas por plataforma e formato, prontas para publicar." },
    ],
  },
  {
    label: "Edição de Vídeo",
    steps: [
      { number: "01", title: "Briefing e Roteiro", description: "Definimos objetivo, público, tom e estrutura narrativa do vídeo." },
      { number: "02", title: "Rough Cut", description: "Montamos a estrutura do vídeo focando em narrativa e ritmo para sua aprovação." },
      { number: "03", title: "Fine Cut", description: "Refinamos com transições, color grading, mixagem de áudio e elementos gráficos." },
      { number: "04", title: "Exportação", description: "Exportamos otimizado para cada plataforma com revisão técnica completa." },
    ],
  },
  {
    label: "Sites e Landing Pages",
    steps: [
      { number: "01", title: "Estratégia Digital", description: "Definimos arquitetura de informação, seções e estrutura de conversão." },
      { number: "02", title: "Design", description: "Criamos o protótipo visual de alta fidelidade para desktop e mobile." },
      { number: "03", title: "Desenvolvimento", description: "Construímos o site com fidelidade ao design, responsividade e performance." },
      { number: "04", title: "Revisão", description: "Testes cross-browser, ajustes finais e aprovação para publicação." },
      { number: "05", title: "Publicação", description: "Publicamos no seu domínio com testes finais e documentação de acesso." },
    ],
  },
];

const ProcessSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProcess = serviceProcesses[activeIndex];

  return (
    <section id="processo" className="section-padding border-t border-border bg-primary text-primary-foreground">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70 mb-4">Processo</p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold">Como trabalhamos</h2>
        </motion.div>

        {/* Service tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {serviceProcesses.map((sp, i) => (
            <button
              key={sp.label}
              onClick={() => setActiveIndex(i)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                i === activeIndex
                  ? "bg-primary-foreground text-primary border-primary-foreground"
                  : "bg-transparent text-primary-foreground/60 border-primary-foreground/20 hover:border-primary-foreground/40 hover:text-primary-foreground"
              }`}
            >
              {sp.label}
            </button>
          ))}
        </div>

        {/* Steps */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`grid gap-8 ${activeProcess.steps.length > 4 ? "sm:grid-cols-2 lg:grid-cols-5" : `sm:grid-cols-2 lg:grid-cols-${activeProcess.steps.length}`}`}
        >
          {activeProcess.steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <span className="font-display text-6xl md:text-7xl font-bold text-primary-foreground/15 leading-none">
                {step.number}
              </span>
              <h3 className="font-display text-xl font-bold mt-2 mb-3 text-primary-foreground">
                {step.title}
              </h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

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
            <a href="/area-do-cliente" className="underline underline-offset-4 hover:text-primary-foreground transition-colors">
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
