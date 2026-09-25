import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Volume2, VolumeX, ArrowUpRight } from "lucide-react";
import logo from "@/assets/kiiro-mark.svg";
import { isSoundMuted, toggleSound } from "@/utils/soundEffects";
import "@/styles/kiiro-experience.css";

export default function Navbar({ forceBlack = true }: { forceBlack?: boolean }) {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(isSoundMuted);
  const { pathname } = useLocation();
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      // Se estiver no topo da página (dentro do Hero), sempre mantém expandido na forma original
      if (currentScrollY <= 140) {
        setCompact(false);
      } else if (diff > 8) {
        // Rolando a página para baixo: retrai para o formato compacto
        setCompact(true);
      } else if (diff < -8) {
        // Rolando a página para cima: expande novamente voltando à forma original
        setCompact(false);
        setOpen(false);
      }

      lastScrollY.current = currentScrollY;
    };

    // Suporte também para detecção imediata do movimento da roda do mouse (scroll up/down)
    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY > 140) {
        if (e.deltaY > 12) {
          setCompact(true);
        } else if (e.deltaY < -12) {
          setCompact(false);
          setOpen(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });

    const sound = () => setMuted(isSoundMuted());
    window.addEventListener("kiiro-sound-toggle", sound);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("kiiro-sound-toggle", sound);
    };
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const links = [
    { label: "Serviços", to: "/#servicos" },
    { label: "Projetos", to: "/#portfolio" },
    { label: "Processo", to: "/#processo" },
    { label: "Sobre", to: "/sobre" }
  ];
  return <header className="kiiro-header" data-compact={compact && !open} data-light={!forceBlack}>
    <nav className="kiiro-glass" aria-label="Navegação principal">
      <Link className="kiiro-nav-logo" to="/" aria-label="Studio Kiiro, início"><img src={logo} alt="Studio Kiiro" /></Link>
      <span className="kiiro-nav-status" aria-live="polite">disponível para projetos</span>
      <div className="kiiro-nav-links">{links.map(link => <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>{link.label}</Link>)}</div>
      <Link className="kiiro-nav-contact" to="/area-do-cliente">Área do cliente <ArrowUpRight size={17} /></Link>
      <button className="kiiro-nav-icon" onClick={() => setMuted(toggleSound())} aria-label={muted ? "Ativar som" : "Desativar som"} aria-pressed={!muted}>{muted ? <VolumeX size={17} /> : <Volume2 size={17} />}</button>
      <button className="kiiro-nav-icon kiiro-menu-toggle" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="kiiro-menu" onClick={() => setOpen(!open)}>{open ? <X size={19} /> : <Menu size={19} />}</button>
    </nav>
    {open && <div id="kiiro-menu" className="kiiro-menu">{links.map(link => <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>{link.label}</Link>)}<Link to="/area-do-cliente">Área do cliente</Link></div>}
  </header>;
}
