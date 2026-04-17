import kiiroLogo from "@/assets/logo.webp";

const Footer = () => {
  return (
    <footer className="bg-[#050605] border-t border-white/[0.08] pt-24 pb-12 px-6">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {/* Col 1: Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#" className="inline-block mb-8 transition-transform hover:scale-105 duration-300">
              <img src={kiiroLogo} alt="Studio Kiiro" className="h-10 md:h-12" />
            </a>
            <p className="text-white text-lg font-medium mb-4">
              Arte em cada pixel.
            </p>
            <p className="text-[#FFCA16] text-sm md:text-base max-w-[280px] leading-relaxed">
              Design estratégico que transforma marcas em referências visuais.
            </p>
          </div>

          {/* Col 2: Links */}
          <div className="flex flex-col items-center md:items-center">
            <h4 className="text-white font-bold tracking-[3px] text-xs uppercase mb-10">LINKS</h4>
            <ul className="space-y-4 text-center">
              {["Sobre", "Serviços", "Portfólio", "Contato"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                    className="text-white/60 hover:text-[#FFCA16] transition-colors duration-300 text-sm font-medium"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h4 className="text-white font-bold tracking-[3px] text-xs uppercase mb-10">CONTATO</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:contato@studiokiiro.com" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">
                  contato@studiokiiro.com
                </a>
              </li>
              <li className="text-white/60 text-sm">
                (11) 99107-6096
              </li>
              <li>
                <a href="https://instagram.com/studiokiiro" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">
                  @studiokiiro
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-center items-center">
          <p className="font-display text-[11px] text-white/30 tracking-[1px]">
            © 2026 Studio Kiiro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;