import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import kiiroLogo from "@/assets/logo.webp";

const navLinks = [
  { label: "Sobre", href: "sobre" },
  { label: "Serviços", href: "servicos" },
  { label: "Cases", href: "portfolio", badge: "04" },
  { label: "Processo", href: "processo" },
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bgClass = scrolled
    ? "bg-black/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3.5 md:py-4"
    : "bg-transparent py-6 md:py-8";

  const textClass = `link-magnetic ${
    forceBlack ? "text-white/60" : "text-black/60"
  } hover:text-[#FFCA16] font-bold text-[11px] uppercase tracking-[0.24em] font-display transition-all duration-300`;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgClass}`}
    >
      <div className="container-editorial flex items-center justify-between h-14 md:h-16">
        <Link to={logoHref} className="flex items-center gap-3 group relative">
          <img
            src={kiiroLogo}
            alt="Studio Kiiro"
            className="h-8 md:h-9 w-auto transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Live Studio Status (Desktop Center) */}
        <div className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
          <span className="text-white/60 font-mono text-[10px] tracking-widest uppercase">
            São Paulo · Disponível p/ Projetos
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navLinks.map((link, idx) => {
            const href = `/#${link.href}`;
            return (
              <Link
                key={link.href}
                to={href}
                className={`relative group flex items-center ${textClass}`}
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
                <span className="text-white/25 mr-1.5 font-mono text-[9px] tracking-normal group-hover:text-[#FFCA16]/60 transition-colors">
                  0{idx + 1}
                </span>
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded bg-[#FFCA16]/15 border border-[#FFCA16]/30 text-[#FFCA16] font-mono text-[9px] font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <Link
            to="/area-do-cliente"
            className="group relative inline-flex items-center gap-2 text-[#FFCA16] border border-[#FFCA16]/40 hover:border-[#FFCA16] hover:bg-[#FFCA16] hover:text-black px-5 py-2.5 rounded-full transition-all duration-300 text-[11px] font-bold uppercase tracking-[0.2em] font-display shadow-[0_0_20px_rgba(255,202,22,0.12)] hover:shadow-[0_0_30px_rgba(255,202,22,0.35)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFCA16] group-hover:bg-black transition-colors animate-pulse" />
            <span>Área do Cliente</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden p-2 rounded-lg bg-white/[0.04] border border-white/10 ${
            forceBlack ? "text-white" : "text-black"
          } hover:text-[#FFCA16] transition-colors`}
          aria-label="Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden border-b bg-black/95 backdrop-blur-2xl border-white/10"
        >
          <div className="container-editorial py-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] w-fit mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/60 font-mono text-[10px] tracking-wider uppercase">
                São Paulo · Vagas Abertas
              </span>
            </div>

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
                className="text-sm transition-colors uppercase tracking-wider text-white/80 hover:text-[#FFCA16] font-display flex items-center justify-between py-2 border-b border-white/[0.04]"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded bg-[#FFCA16]/20 text-[#FFCA16] text-[10px] font-mono">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            <Link
              to="/area-do-cliente"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#FFCA16] text-black font-display font-bold text-xs uppercase tracking-[0.2em] shadow-lg mt-3"
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
