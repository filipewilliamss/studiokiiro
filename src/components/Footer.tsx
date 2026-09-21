import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import kiiroLogo from "@/assets/logo.webp";

const Footer = () => {
  const [saoPauloTime, setSaoPauloTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setSaoPauloTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-[#050605] pt-24 pb-12 px-6 border-t border-white/[0.08] overflow-hidden">
      {/* Subtle bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#FFCA16]/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-white/[0.06]">
          {/* Brand Col */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-block transition-transform hover:scale-105 duration-500">
                <img src={kiiroLogo} alt="Studio Kiiro" className="h-9 w-auto" />
              </Link>
              <p className="mt-6 text-[15px] text-white/50 max-w-md leading-relaxed font-light">
                Design de alto padrão e inteligência estratégica para marcas que recusam o comum e buscam ser referências absolutas em seu mercado.
              </p>
            </div>

            {/* Live Studio Status Box */}
            <div className="mt-10 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md max-w-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                <div>
                  <span className="block text-white text-xs font-mono font-bold tracking-wider uppercase">
                    São Paulo, Brasil
                  </span>
                  <span className="block text-white/40 text-[10px] font-mono">
                    23°33'21"S 46°39'21"W
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="block text-[#FFCA16] text-xs font-mono font-bold">
                  {saoPauloTime ? `${saoPauloTime} BRT` : "--:--:--"}
                </span>
                <span className="block text-white/30 text-[9px] font-mono uppercase tracking-widest">
                  GMT-3 Live
                </span>
              </div>
            </div>
          </div>

          {/* Links Col */}
          <div className="md:col-span-3 lg:col-span-3 lg:col-start-7 flex flex-col gap-6">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.3em] font-mono">
              Navegação
            </h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { label: "Sobre o Estúdio", href: "sobre" },
                { label: "Serviços & Soluções", href: "servicos" },
                { label: "Cases Selecionados", href: "portfolio" },
                { label: "Metodologia", href: "processo" },
                { label: "Iniciar Contato", href: "contato" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={`/#${item.href}`}
                    onClick={(e) => {
                      if (window.location.pathname === "/") {
                        e.preventDefault();
                        document.getElementById(item.href)?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-[13px] text-white/50 hover:text-[#FFCA16] transition-colors duration-300 font-display"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/cases"
                  className="text-[13px] text-[#FFCA16]/80 hover:text-[#FFCA16] transition-colors duration-300 font-display font-semibold flex items-center gap-1.5"
                >
                  <span>Ver Todos os Cases</span>
                  <span className="text-[11px]">↗</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/area-do-cliente"
                  className="text-[13px] text-white/60 hover:text-[#FFCA16] transition-colors duration-300 font-display"
                >
                  Portal do Cliente
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact Col */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col gap-6">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.3em] font-mono">
              Conectar & Briefing
            </h4>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a
                  href="https://instagram.com/studiokiiro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-white/50 hover:text-[#FFCA16] transition-colors duration-300 flex items-center justify-between group"
                >
                  <span>Instagram Oficial</span>
                  <span className="text-white/20 group-hover:text-[#FFCA16] transition-colors">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511991076096"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-white/50 hover:text-[#FFCA16] transition-colors duration-300 flex items-center justify-between group"
                >
                  <span>WhatsApp Direto</span>
                  <span className="text-white/20 group-hover:text-[#FFCA16] transition-colors">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@studiokiiro.com"
                  className="text-[13px] text-white/50 hover:text-[#FFCA16] transition-colors duration-300 flex items-center justify-between group"
                >
                  <span>contato@studiokiiro.com</span>
                  <span className="text-white/20 group-hover:text-[#FFCA16] transition-colors">↗</span>
                </a>
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#FFCA16] block mb-1">
                Atendimento
              </span>
              <span className="text-[12px] text-white/40 font-light">
                Segunda a Sexta · 09h às 18h
              </span>
            </div>
          </div>
        </div>

        {/* Sculptural Branding Display */}
        <div className="pt-16 pb-8 overflow-hidden select-none pointer-events-none">
          <span className="font-display font-[800] text-[clamp(44px,11.5vw,160px)] leading-none tracking-[-0.06em] text-white/[0.04] block text-center whitespace-nowrap">
            STUDIO KIIRO
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-white/30 font-mono">
          <p>© {new Date().getFullYear()} Studio Kiiro. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Direção de Arte & Branding</span>
            <span>·</span>
            <span>São Paulo / Global</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;