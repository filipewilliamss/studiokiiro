import kiiroLogo from "@/assets/logo.webp";

const Footer = () => {
  return (
    <footer className="bg-[#050605] py-[60px] px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[35%_30%_35%] gap-12 md:gap-0">
          {/* Coluna 1 */}
          <div className="flex flex-col items-start">
            <a href="#" className="inline-block transition-transform hover:scale-105 duration-300">
              <img src={kiiroLogo} alt="Studio Kiiro" className="h-10" />
            </a>
            <p className="mt-4 font-display font-normal text-[14px] text-white/50">
              Arte em cada pixel.
            </p>
            <p className="font-display font-normal text-[14px] text-[#FFCA16] max-w-[280px]">
              Design estratégico que transforma marcas em referências visuais.
            </p>
          </div>

          {/* Coluna 2 */}
          <div className="flex flex-col items-start md:items-center">
            <div className="flex flex-col items-start">
              <h4 className="font-display font-semibold text-[12px] text-white uppercase tracking-[2px] mb-5">
                LINKS
              </h4>
              <ul className="flex flex-col gap-3">
                {["Sobre", "Serviços", "Portfólio", "Contato"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                      className="font-display font-normal text-[14px] text-white/60 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Coluna 3 */}
          <div className="flex flex-col items-start md:items-end">
            <div className="flex flex-col items-start">
              <h4 className="font-display font-semibold text-[12px] text-white uppercase tracking-[2px] mb-5">
                CONTATO
              </h4>
              <ul className="flex flex-col gap-3">
                <li className="font-display font-normal text-[14px] text-white/60">
                  contato@studiokiiro.com
                </li>
                <li className="font-display font-normal text-[14px] text-white/60">
                  (11) 99107-6096
                </li>
                <li className="font-display font-normal text-[14px] text-white/60">
                  @studiokiiro
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="mt-10 border-t border-white/[0.08]" />

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="font-display font-normal text-[12px] text-white/30">
            © 2026 Studio Kiiro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;