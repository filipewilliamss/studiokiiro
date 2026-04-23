import { motion } from "framer-motion";
import profilePicture from "@/assets/profile-picture.webp";

const AboutSection = () => {
  return (
    <section id="sobre" className="relative section-padding overflow-hidden bg-[#070807]">
      {/* Subtle background element */}
      <div className="absolute right-[-10%] top-[20%] w-[40%] aspect-square bg-[#FFCA16]/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Header Mobile & Desktop Title */}
          <div className="lg:col-span-12 mb-8 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="inline-block text-[#FFCA16] text-[11px] font-bold uppercase tracking-[0.4em] mb-6">
                A Mente Criativa
              </span>
              <h2 className="font-display text-[48px] md:text-[80px] font-[800] text-white leading-[0.85] tracking-extratight max-w-4xl">
                Design com <span className="text-[#FFCA16]">propósito</span> e visão estratégica.
              </h2>
            </motion.div>
          </div>

          {/* Left: Image Side */}
          <div className="lg:col-span-5 relative group">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out border border-white/5"
            >
              <img 
                src={profilePicture} 
                alt="Filipe Williams"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-in-out"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700" />
            </motion.div>
            
            <div className="absolute -bottom-6 -right-6 hidden md:block w-32 h-32 border-r border-b border-[#FFCA16]/30" />
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <p className="font-display text-[12px] font-bold text-white tracking-[0.2em] uppercase">
                Filipe Williams
              </p>
              <p className="text-[#FFCA16]/60 text-[10px] uppercase tracking-[0.1em] mt-1">
                Founder & Creative Director
              </p>
            </motion.div>
          </div>

          {/* Right: Content Side */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-8"
            >
              <p className="text-white text-[18px] md:text-[22px] font-light leading-relaxed text-balance">
                Olá! Eu sou o Filipe Williams, designer gráfico há 6 anos e a mente criativa por trás do Studio Kiiro. Encontrei no design o lugar onde criatividade e estratégia se encontram.
              </p>
              
              <div className="w-20 h-[1px] bg-[#FFCA16]/40" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <p className="text-white/50 text-[15px] leading-relaxed">
                  Construí minha carreira na prática. Sem atalhos. Aprendi com cada projeto entregue, com cada cliente atendido e com cada desafio superado. Hoje me especializo em Identidade Visual e Artes para Mídias Sociais — áreas onde posso unir técnica apurada e pensamento estratégico.
                </p>
                <p className="text-white/50 text-[15px] leading-relaxed">
                  Mais do que entregar um logo bonito, meu compromisso é entender a essência de cada marca e traduzi-la visualmente de forma única e memorável. Busco sempre as tendências mais atuais para que o seu projeto não apenas se destaque hoje, mas continue relevante no futuro.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-8 pt-8 border-t border-white/5"
            >
              {[
                { label: "Projetos", value: "300+" },
                { label: "Anos de XP", value: "06" },
                { label: "Retenção", value: "95%" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-white font-bold text-2xl tracking-tighter">{stat.value}</span>
                  <span className="text-[#FFCA16]/60 text-[10px] uppercase tracking-[0.2em]">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;