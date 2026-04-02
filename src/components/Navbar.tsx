import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import kiiroLogo from "@/assets/logo.png";

const BASE_URL = "https://studiokiiro.com";

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

  const getHref = (anchor: string) => (isHome ? anchor : `${BASE_URL}/${anchor}`);
  const logoHref = "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bgClass = "bg-black border-b border-white/10 shadow-lg";
  const textClass = "text-white/80 hover:text-primary";
  const areaClienteTextClass = "text-primary hover:text-primary/80";
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
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={getHref(link.href)}
              className={`text-sm transition-colors duration-300 tracking-wide uppercase ${textClass}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/area-do-cliente"
            className={`text-sm transition-colors duration-300 tracking-wide uppercase font-medium ${areaClienteTextClass}`}
          >
            Área do Cliente
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden ${menuBtnClass}`}
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
          className={`md:hidden border-b ${forceBlack ? "bg-black/95 backdrop-blur-md border-white/10" : "bg-background/95 backdrop-blur-md border-border"}`}
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
