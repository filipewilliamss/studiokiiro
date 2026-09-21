import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import kiiroLogo from "@/assets/logo.webp";

const navLinks = [
  { label: "Sobre", href: "sobre" },
  { label: "Serviços", href: "servicos" },
  { label: "Processo", href: "processo" },
  { label: "Portfólio", href: "portfolio" },
  { label: "Contato", href: "contato" },
];


interface NavbarProps {
  forceBlack?: boolean;
}

const Navbar = ({ forceBlack = true }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  
  const logoHref = "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bgClass = scrolled 
    ? (forceBlack ? "bg-black/90 border-white/[0.05]" : "bg-white/90 border-black/[0.05]") + " backdrop-blur-[20px] border-b py-4" 
    : "bg-transparent py-6 md:py-8";
    
  const textClass = `link-magnetic ${forceBlack ? 'text-white/55' : 'text-black/55'} hover:text-[#FFCA16] font-bold text-[11px] uppercase tracking-[0.28em] font-display transition-colors duration-500`;
  const areaClienteTextClass = "relative overflow-hidden text-[#FFCA16] border border-[#FFCA16]/30 hover:border-[#FFCA16] hover:bg-[#FFCA16] hover:text-black px-6 py-2.5 transition-all duration-500 text-[11px] font-bold uppercase tracking-[0.25em] font-display";

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${bgClass}`}
    >
      <div className="container-editorial flex items-center justify-between h-16 md:h-20">
        <Link to={logoHref} className="flex items-center gap-2 group">
          <img 
            src={kiiroLogo} 
            alt="Studio Kiiro" 
            className="h-9 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105" 
          />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link, idx) => {
            const href = `/#${link.href}`;
            return (
              <Link
                key={link.href}
                to={href}
                className={textClass}
                onClick={(e) => {
                  if (isHome) {
                    e.preventDefault();
                    const element = document.getElementById(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
              >
                <span className={`${forceBlack ? 'text-white/30' : 'text-black/30'} mr-2 font-mono text-[9px] tracking-normal`}>
                  0{idx + 1}
                </span>
                {link.label}
              </Link>
            );
          })}

          <Link
            to="/area-do-cliente"
            className="group inline-flex items-center gap-2.5 text-[#FFCA16] border border-[#FFCA16]/40 hover:border-[#FFCA16] hover:bg-[#FFCA16] hover:text-black px-5 py-2 rounded-full transition-all duration-300 text-[11px] font-bold uppercase tracking-[0.2em] font-display shadow-[0_0_15px_rgba(255,202,22,0.1)] hover:shadow-[0_0_20px_rgba(255,202,22,0.3)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFCA16] group-hover:bg-black transition-colors animate-pulse" />
            <span>Área do Cliente</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden ${forceBlack ? 'text-white' : 'text-black'} hover:text-[#FFCA16] transition-colors`}
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
              <Link
                key={link.href}
                to={`/#${link.href}`}
                onClick={(e) => {
                  setMenuOpen(false);
                  if (isHome) {
                    e.preventDefault();
                    const element = document.getElementById(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
                className={`text-sm transition-colors uppercase tracking-wide ${textClass}`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/area-do-cliente"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#FFCA16] text-black font-display font-bold text-xs uppercase tracking-[0.2em] shadow-lg mt-2"
            >
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>Acessar Área do Cliente</span>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
