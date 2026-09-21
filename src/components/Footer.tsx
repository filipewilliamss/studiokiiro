import { Link } from "react-router-dom";
import kiiroLogo from "@/assets/logo.webp";

const Footer = () => {
  return (
    <footer className="bg-transparent py-20 px-6 border-t border-white/5">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block transition-transform hover:scale-105 duration-500">
              <img src={kiiroLogo} alt="Studio Kiiro" className="h-10 w-auto" />
            </Link>
            <p className="mt-8 text-[14px] text-white/40 max-w-sm leading-relaxed">
              Design que transforma marcas e projetos em referências visuais. Criamos projetos memoráveis para quem não aceita o comum.
            </p>
          </div>

          {/* Links Col */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.3em]">
              Navegação
            </h4>
            <ul className="flex flex-col gap-4">
              {["Sobre", "Serviços", "Portfólio", "Contato"].map((link) => {
                const id = link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return (
                  <li key={link}>
                    <Link
                      to={`/#${id}`}
                      className="text-[13px] text-white/50 hover:text-[#FFCA16] transition-colors duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                );
              })}

            </ul>
          </div>

          {/* Social Col */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.3em]">
              Conectar
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a 
                  href="https://instagram.com/studiokiiro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[13px] text-white/50 hover:text-[#FFCA16] transition-colors duration-300 flex items-center gap-2"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/5511991076096" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[13px] text-white/50 hover:text-[#FFCA16] transition-colors duration-300 flex items-center gap-2"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contato@studiokiiro.com"
                  className="text-[13px] text-white/50 hover:text-[#FFCA16] transition-colors duration-300 flex items-center gap-2"
                >
                  E-mail
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-white/20 uppercase tracking-[0.2em]">
            © 2026 Studio Kiiro. Todos os direitos reservados.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] text-white/10 uppercase tracking-[0.3em]">São Paulo, Brasil</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;