import { motion } from "framer-motion";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contato" className="section-padding border-t border-border">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Contato</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Vamos conversar
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Preencha o formulário e solicite um orçamento. Respondemos em até 24h.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          action="https://formsubmit.co/contato@studiokiiro.com"
          method="POST"
          className="space-y-6"
        >
          <input type="hidden" name="_subject" value="Nova Mensagem do Site Studio Kiiro!" />
          <input type="hidden" name="_next" value="https://studiokiiro.com/obrigado" />

          <div>
            <label htmlFor="name" className="block text-sm font-display uppercase tracking-widest text-muted-foreground mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-0 transition-colors font-body text-base"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-display uppercase tracking-widest text-muted-foreground mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-0 transition-colors font-body text-base"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="whatsapp" className="block text-sm font-display uppercase tracking-widest text-muted-foreground mb-2">
              WhatsApp *
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              required
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-0 transition-colors font-body text-base"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-display uppercase tracking-widest text-muted-foreground mb-2">
              Serviço desejado *
            </label>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-foreground focus:border-primary focus:ring-0 transition-colors font-body text-base"
            >
              <option value="" className="bg-card text-foreground">Selecione...</option>
              <option value="Logotipo com Manual" className="bg-card text-foreground">Logotipo com Manual</option>
              <option value="Identidade Visual Completa" className="bg-card text-foreground">Identidade Visual Completa</option>
              <option value="Social Media" className="bg-card text-foreground">Social Media</option>
              <option value="Edição de Vídeo" className="bg-card text-foreground">Edição de Vídeo</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-display uppercase tracking-widest text-muted-foreground mb-2">
              Mensagem *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-0 transition-colors resize-none font-body text-base"
              placeholder="Conte sobre seu projeto..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-primary text-primary-foreground font-display font-semibold rounded-full text-base hover:bg-kiiro-dark transition-all duration-300 mt-4"
          >
            Enviar Mensagem
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
