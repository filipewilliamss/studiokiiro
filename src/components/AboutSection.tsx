import { motion } from "framer-motion";
import profilePicture from "@/assets/profile-picture.webp";

const AboutSection = () => {
  return (
    <section id="sobre" className="relative section-padding overflow-hidden bg-[#070807] border-t border-white/[0.05]">
      {/* Subtle background element */}
      <div className="absolute right-[-10%] top-[20%] w-[40%] aspect-square bg-[#FFCA16]/[0.02] rounded-full blur-[150px] pointer-events-none" />

      {/* Monumental background word */}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-6 md:-left-10 top-[8%] font-display font-[800] text-white/[0.025] leading-none tracking-extratight pointer-events-none select-none"
        style={{ fontSize: "clamp(100px, 18vw, 280px)" }}
      >
        sobre
      </motion.span>

      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Header Mobile & Desktop Title */}
          <div className="lg:col-span-12 mb-8 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[#FFCA16] text-[11px] font-bold uppercase tracking-[0.4em]">
                  A Mente Criativa
                </span>
              </div>
              <h2 className="font-display text-[52px] md:text-[88px] font-[800] text-white leading-[0.82] tracking-[-0.05em] max-w-5xl">
                Design pensado para o <span className="text-[#FFCA16] italic font-light">negócio</span>, não só para a estética.
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
              className="relative aspect-[3/4] overflow-hidden lg:grayscale lg:hover:grayscale-0 transition-all duration-1000 ease-in-out border border-white/5"
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
                Fundador do Studio Kiiro
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
                  O Studio Kiiro, fundado por Filipe Williams, nasceu para atender empresas que levam sua marca a sério e enxergam o design como um ativo de crescimento, não como um detalhe decorativo.
                </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <p className="text-white/50 text-[15px] leading-relaxed">
                  Trabalhamos com método e pesquisa, mergulhando no contexto de cada negócio para criar sistemas visuais consistentes, fáceis de aplicar e difíceis de confundir com o que já existe no mercado. Fugimos de soluções genéricas e de templates prontos para entregar identidade própria em cada ponto de contato.
                </p>
                <p className="text-white/50 text-[15px] leading-relaxed">
                  Seja na criação de uma identidade visual do zero ou na estruturação de uma presença digital completa, nosso foco é garantir que cada elemento visual cumpra um papel estratégico: reforçar o posicionamento, facilitar o reconhecimento e elevar a percepção de profissionalismo da sua marca.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 pt-8 border-t border-white/5"
            >
              {[
                { label: "projetos concluídos entre identidades visuais, materiais digitais e peças de marca.", value: "150+" },
                { label: "anos dedicados ao design de marcas e presença digital.", value: "6" },
                { label: "dos clientes retornam com novas demandas de design.", value: "92%" }
              ].map((stat, i) => (
                <div key={i} className={`flex flex-col ${i === 2 ? 'md:col-span-1' : ''}`}>
                  <span className="text-white font-bold text-2xl tracking-tighter leading-none">{stat.value}</span>
                  <span className="text-[#FFCA16]/60 text-[10px] uppercase tracking-[0.15em] mt-1.5 leading-tight">{stat.label}</span>
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