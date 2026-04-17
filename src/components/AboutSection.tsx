import { motion } from "framer-motion";
import profilePicture from "@/assets/profile-picture.webp";

const AboutSection = () => {
  return (
    <section id="sobre" className="relative section-padding overflow-hidden bg-[#070807] grid-pattern">
      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 border border-white/10 overflow-hidden">
              <img 
                src={profilePicture} 
                alt="Filipe Williams" 
                className="w-full h-auto transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#FFCA16]/20 -z-10" />
          </motion.div>

          {/* Right column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <span className="inline-block px-4 py-1.5 border border-[#FFCA16] text-[#FFCA16] text-[11px] font-bold uppercase tracking-[3px] rounded-none mb-8">
              SOBRE
            </span>
            <h2 className="font-display text-[40px] md:text-[56px] font-[800] text-white leading-[0.95] tracking-[-2px] mb-4">
              Seja muito <br />
              <span className="text-[#FFCA16]">bem-vindo!</span>
            </h2>
            <p className="text-[#FFCA16] font-display text-base md:text-lg font-medium mb-10 tracking-tight">
              Filipe Williams — Designer Gráfico & Fundador do Studio Kiiro
            </p>
            
            <div className="space-y-6 max-w-xl">
              <p className="text-white text-lg leading-relaxed">
                Olá! Eu sou o Filipe Williams, designer gráfico há 6 anos e a mente criativa por trás do Studio Kiiro. Minha história com o design começou muito antes de eu conhecer a área — sempre vivi cercado por arte, desenho, animação e música. Quando descobri o design gráfico, foi amor à primeira vista: encontrei o lugar onde criatividade e estratégia se encontram.
              </p>
              
              <p className="text-white/60 text-base leading-relaxed">
                Construí minha carreira na prática e na raça. Sem atalhos. Aprendi com cada projeto entregue, com cada cliente atendido e com cada desafio superado. Hoje me especializo em Identidade Visual e Artes para Mídias Sociais — áreas onde posso unir técnica apurada, olhar artístico e pensamento estratégico para gerar resultados reais para marcas e negócios.
              </p>
              
              <p className="text-white/60 text-base leading-relaxed">
                Já desenvolvi identidades visuais para empreendedores, pequenas empresas, ministérios de alcance internacional e negócios consolidados no mercado. Um dos projetos que mais me orgulha foi o rebranding de uma empresa de assistência técnica — depois do novo visual, o número de alunos cresceu e o negócio expandiu. Ver meu trabalho ganhar vida e gerar impacto real é o que me motiva todos os dias.
              </p>
              
              <p className="text-white/60 text-base leading-relaxed">
                Mais do que entregar um logo bonito, meu compromisso é entender a essência de cada marca e traduzi-la visualmente de forma única e memorável. Trabalho com uma metodologia consistente, estou em constante evolução e busco sempre as tendências mais atuais do mercado — para que o seu projeto não apenas se destaque hoje, mas continue relevante no futuro.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;