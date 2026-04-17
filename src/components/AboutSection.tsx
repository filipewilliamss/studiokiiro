import { motion } from "framer-motion";
import profilePicture from "@/assets/profile-picture.webp";

const AboutSection = () => {
  return (
    <section id="sobre" className="relative section-padding overflow-hidden bg-[#070807] grid-pattern">
      <div className="container-editorial relative z-10">
        <section className="sobre-section">
          {/* BLOCO TÍTULO: fica acima da foto */}
          <div className="sobre-titulo">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 border border-[#FFCA16] text-[#FFCA16] text-[11px] font-bold uppercase tracking-[3px] mb-8">
                SOBRE
              </span>
              <h2 className="font-display text-[40px] md:text-[56px] font-[800] text-white leading-[0.95] tracking-[-2px] mb-4">
                Seja muito <br />
                <span className="text-[#FFCA16]">bem-vindo!</span>
              </h2>
              <p className="text-white font-display text-[10.2px] md:text-[11.9px] font-medium tracking-tight">
                Filipe Williams — Designer Gráfico & Fundador do Studio Kiiro
              </p>
            </motion.div>
          </div>

          {/* BLOCO INFERIOR: foto e parágrafos juntos */}
          <div className="sobre-conteudo">
            <motion.img 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="sobre-foto border border-white/10" 
              src={profilePicture} 
              alt="Filipe Williams"
            />
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="sobre-paragrafos"
            >
              <p className="text-white">
                Olá! Eu sou o Filipe Williams, designer gráfico há 6 anos e a mente criativa por trás do Studio Kiiro. Minha história com o design começou muito antes de eu conhecer a área — sempre vivi cercado por arte, desenho, animação e música. Quando descobri o design gráfico, foi amor à primeira vista: encontrei o lugar onde criatividade e estratégia se encontram.
              </p>
              <p className="text-white/60">
                Construí minha carreira na prática e na raça. Sem atalhos. Aprendi com cada projeto entregue, com cada cliente atendido e com cada desafio superado. Hoje me especializo em Identidade Visual e Artes para Mídias Sociais — áreas onde posso unir técnica apurada, olhar artístico e pensamento estratégico para gerar resultados reais para marcas e negócios.
              </p>
              <p className="text-white/60">
                Já desenvolvi identidades visuais para empreendedores, pequenas empresas, ministérios de alcance internacional e negócios consolidados no mercado. Um dos projetos que mais me orgulha foi o rebranding de uma empresa de assistência técnica — depois do novo visual, o número de alunos cresceu e o negócio expandiu. Ver meu trabalho ganhar vida e gerar impacto real é o que me motiva todos os dias.
              </p>
              <p className="text-white/60">
                Mais do que entregar um logo bonito, meu compromisso é entender a essência de cada marca e traduzi-la visualmente de forma única e memorável. Trabalho com uma metodologia consistente, estou em constante evolução e busco sempre as tendências mais atuais do mercado — para que o seu projeto não apenas se destaque hoje, mas continue relevante no futuro.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AboutSection;