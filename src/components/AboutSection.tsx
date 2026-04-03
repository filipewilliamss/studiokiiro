import { motion } from "framer-motion";
import profilePicture from "@/assets/profile-picture.png";

const AboutSection = () => {
  return (
    <section id="sobre" className="section-padding">
      <div className="container-editorial">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-end">
          {/* Left column - Title + Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Sobre</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                Seja muito
                <br />
                <span className="text-gradient-kiiro">bem-vindo!</span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-secondary-foreground mt-6 font-display">
                Filipe Williams — Designer Gráfico & Fundador do Studio Kiiro
              </p>
            </div>

            {/* Profile photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={profilePicture}
                  alt="Filipe Williams — Fundador do Studio Kiiro"
                  className="w-full object-cover aspect-[3/4] grayscale hover:grayscale-0 transition-all duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                {/* Accent border */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Text */}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
