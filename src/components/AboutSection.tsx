import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="sobre" className="section-padding">
      <div className="container-editorial">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: Label */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Sobre</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Design com
              <br />
              <span className="text-gradient-kiiro">estratégia</span>
            </h2>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-secondary-foreground leading-relaxed">
              O Studio Kiiro é um estúdio de design focado em criar identidades visuais que vão além da estética — cada projeto é construído com estratégia, pesquisa e atenção aos detalhes.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Trabalhamos com empreendedores, pequenas empresas e criadores de conteúdo que entendem o valor de uma marca forte e consistente. Nossa abordagem une criatividade e pensamento estratégico para entregar resultados que comunicam, diferenciam e conectam.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              De identidades visuais completas a conteúdo para redes sociais e edição de vídeo, cada entrega carrega o mesmo compromisso: arte em cada pixel.
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
