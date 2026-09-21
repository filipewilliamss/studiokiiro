import { motion } from "framer-motion";
import areaDoClienteMockup from "@/assets/area-do-cliente-mockup.webp";

const benefits = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Transparência total",
    description: "Acompanhe cada fase da metodologia em tempo real, com prazos claros e status de produção.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: "Briefing sem atrito",
    description: "Link exclusivo e direto para responder ao briefing do seu projeto em qualquer dispositivo.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    title: "Arquivos centralizados",
    description: "Todos os entregáveis (SVG, PNG, manuais e vídeos) organizados e disponíveis para download a qualquer momento.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Financeiro organizado",
    description: "Visualize orçamentos, parcelas, prazos e status de pagamento com total clareza.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Feedback & histórico",
    description: "Histórico completo de aprovações, revisões e observações centralizadas sem se perder no WhatsApp.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Acesso seguro e exclusivo",
    description: "Ambiente protegido com credenciais dedicadas para sua empresa e equipe.",
  },
];

const ClientAreaSection = () => {
  return (
    <section id="area-cliente" className="relative section-padding border-t border-white/[0.05] bg-[#070807] text-white overflow-hidden">
      {/* Monumental backdrop word */}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute right-[-4%] top-[4%] font-display font-[800] text-white/[0.015] md:text-white/[0.025] leading-none tracking-extratight pointer-events-none select-none"
        style={{ fontSize: "clamp(90px, 18vw, 260px)" }}
      >
        portal
      </motion.span>

      <div className="container-editorial relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FFCA16] animate-pulse" />
            <span className="text-[#FFCA16] text-[11px] font-bold uppercase tracking-[0.4em]">
              Plataforma Studio Kiiro
            </span>
          </div>
          <h2 className="font-display text-[40px] sm:text-[54px] md:text-[76px] font-[800] text-white leading-[0.88] tracking-[-0.04em] mb-6">
            Acompanhe seu projeto em <span className="text-[#FFCA16] italic font-light">tempo real.</span>
          </h2>
          <p className="text-white/60 text-base md:text-xl max-w-2xl leading-relaxed font-light">
            No Studio Kiiro, cada cliente conta com um portal tecnológico exclusivo. Você visualiza etapas, responde briefings, acessa arquivos finais e confere o financeiro com organização e pontualidade militar.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16 md:mb-24">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group p-6 rounded-2xl border border-white/[0.08] bg-[#0c0d0c]/80 hover:bg-[#121412] hover:border-[#FFCA16]/40 transition-all duration-300 backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFCA16]/10 border border-[#FFCA16]/30 flex items-center justify-center text-[#FFCA16] mb-4 group-hover:scale-110 group-hover:bg-[#FFCA16] group-hover:text-black transition-all duration-300">
                {b.icon}
              </div>
              <h4 className="font-display text-base font-bold text-white mb-2 tracking-tight">
                {b.title}
              </h4>
              <p className="text-white/55 text-sm leading-relaxed font-light">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mockup Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Subtle glow behind mockup */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#FFCA16]/10 via-white/5 to-[#FFCA16]/10 blur-2xl opacity-40 rounded-3xl -z-10" />

          <div className="rounded-2xl border border-white/10 bg-[#0c0d0c] overflow-hidden shadow-2xl">
            {/* Browser chrome bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-black/50 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/[0.04] border border-white/5">
                <svg className="w-3 h-3 text-[#FFCA16]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-[11px] text-white/50 font-mono tracking-wider">
                  studiokiiro.com/area-do-cliente
                </span>
              </div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-[#FFCA16] bg-[#FFCA16]/10 px-2.5 py-0.5 rounded">
                Ambiente Seguro
              </div>
            </div>

            {/* Screenshot of Client Area */}
            <div className="overflow-hidden relative group">
              <img
                src={areaDoClienteMockup}
                alt="Interface da Área do Cliente do Studio Kiiro"
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.01]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Action CTA below mockup */}
          <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-4">
            <a
              href="/area-do-cliente"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FFCA16] text-black font-display font-bold text-xs uppercase tracking-[0.2em] shadow-[0_4px_25px_rgba(255,202,22,0.25)] hover:shadow-[0_4px_35px_rgba(255,202,22,0.45)] hover:scale-[1.02] transition-all duration-300"
            >
              <span>Acessar Área do Cliente</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white/70 hover:text-white font-display text-xs uppercase tracking-[0.16em] transition-all duration-300"
            >
              <span>Tirar Dúvidas</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientAreaSection;
