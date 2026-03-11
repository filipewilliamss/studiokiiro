import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="sobre" className="section-padding">
      <div className="container-editorial">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Sobre</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Seja muito
              <br />
              <span className="text-gradient-kiiro">bem-vindo!</span>
            </h2>
            <p className="text-lg text-secondary-foreground mt-6 font-display">
              Filipe Williams — Designer Gráfico & Fundador do Studio Kiiro
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-secondary-foreground leading-relaxed">
              Olá! Eu sou o Filipe Williams, designer gráfico há 6 anos e a mente criativa por trás do Studio Kiiro. Minha história com o design começou muito antes de eu conhecer a área — sempre vivi cercado por arte, desenho, animação e música. Quando descobri o design gráfico, foi amor à primeira vista: encontrei o lugar onde criatividade e estratégia se encontram.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Construí minha carreira na prática e na raça. Sem atalhos. Aprendi com cada projeto entregue, com cada cliente atendido e com cada desafio superado. Hoje me especializo em Identidade Visual e Artes para Mídias Sociais — áreas onde posso unir técnica apurada, olhar artístico e pensamento estratégico para gerar resultados reais para marcas e negócios.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Já desenvolvi identidades visuais para empreendedores, pequenas empresas, ministérios de alcance internacional e negócios consolidados no mercado. Um dos projetos que mais me orgulha foi o rebranding de uma empresa de assistência técnica — depois do novo visual, o número de alunos cresceu e o negócio expandiu. Ver meu trabalho ganhar vida e gerar impacto real é o que me motiva todos os dias.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Mais do que entregar um logo bonito, meu compromisso é entender a essência de cada marca e traduzi-la visualmente de forma única e memorável. Trabalho com uma metodologia consistente, estou em constante evolução e busco sempre as tendências mais atuais do mercado — para que o seu projeto não apenas se destaque hoje, mas continue relevante no futuro.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <div className="w-12 h-px bg-primary" />
              <span className="text-sm text-primary uppercase tracking-widest font-display">Arte em cada pixel</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
