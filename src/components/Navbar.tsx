import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import kiiroLogo from "@/assets/logo.webp";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Contato", href: "#contato" },
];

interface NavbarProps {
  forceBlack?: boolean;
}

const Navbar = ({ forceBlack = true }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const getHref = (anchor: string) => (isHome ? anchor : `/${anchor}`);
  const logoHref = "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bgClass = scrolled 
    ? "bg-[#070807]/80 backdrop-blur-[10px] border-b border-white/10 shadow-lg" 
    : "bg-transparent";
  const textClass = "text-white/70 hover:text-white font-medium text-[13px] uppercase tracking-[1.5px] font-display";
  const areaClienteTextClass = "text-[#FFCA16] hover:bg-[#FFCA16]/10 border border-[#FFCA16] px-5 py-2 transition-all duration-300 text-[13px] uppercase tracking-[1.5px] font-display";
  const menuBtnClass = "text-white";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgClass}`}
    >
      <div className="container-editorial flex items-center justify-between h-16 md:h-20">
        <a href={logoHref} className="flex items-center gap-2 group">
          <img 
            src={kiiroLogo} 
            alt="Studio Kiiro" 
            className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105" 
          />
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={getHref(link.href)}
              className={`${textClass} transition-colors duration-300`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/area-do-cliente"
            className={`${areaClienteTextClass} rounded-none`}
          >
            Área do Cliente
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden ${menuBtnClass}`}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`lg:hidden border-b ${forceBlack ? "bg-black/95 backdrop-blur-md border-white/10" : "bg-background/95 backdrop-blur-md border-border"}`}
        >
          <div className="container-editorial py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={getHref(link.href)}
                onClick={() => setMenuOpen(false)}
                className={`text-sm transition-colors uppercase tracking-wide ${textClass}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/area-do-cliente"
              onClick={() => setMenuOpen(false)}
              className={`text-sm transition-colors uppercase tracking-wide font-medium ${areaClienteTextClass}`}
            >
              Área do Cliente
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
