import kiiroLogo from "@/assets/logo.webp";

const Footer = () => {
  return (
    <footer className="bg-[#050605] border-t border-white/[0.08] py-20 px-6">
      <div className="container-editorial max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
          {/* Logo Left */}
          <div className="flex justify-center md:justify-start">
            <a href="#" className="inline-block transition-transform hover:scale-105 duration-300">
              <img src={kiiroLogo} alt="Studio Kiiro" className="h-10 md:h-12" />
            </a>
          </div>

          {/* Links Center */}
          <div className="flex justify-center">
            <ul className="flex flex-wrap justify-center gap-8 md:gap-12 text-[12px] font-bold uppercase tracking-[2px]">
              {["SOBRE", "SERVIÇOS", "PORTFÓLIO", "CONTATO"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                    className="text-white hover:text-[#FFCA16] transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Right */}
          <div className="flex justify-center md:justify-end gap-6">
            <a 
              href="https://instagram.com/studiokiiro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[#FFCA16] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a 
              href="mailto:contato@studiokiiro.com"
              className="text-white hover:text-[#FFCA16] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
            <a 
              href="https://wa.me/5511991076096" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[#FFCA16] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M3.05 11c.5 4.5 4.5 8.5 9 9 1.5.2 2.5-.2 3.5-1l3.5 1.5-1.5-3.5c.8-1 1.2-2 1-3.5-.5-4.5-4.5-8.5-9-9-4.5.5-8.5 4.5-9 9z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/[0.05] text-center">
          <p className="font-display text-[12px] text-white/30 tracking-[1px]">
            © 2025 Studio Kiiro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;