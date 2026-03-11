const Footer = () => {
  return (
    <footer className="border-t border-border py-16 md:py-20">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Col 1 */}
          <div>
            <a href="#" className="font-display text-xl font-bold tracking-tight text-foreground inline-block mb-4">
              Studio <span className="text-primary">Kiiro</span>
            </a>
            <p className="text-muted-foreground text-sm mb-1">Arte em cada pixel.</p>
            <p className="text-muted-foreground text-sm">Design estratégico que transforma marcas em referências visuais.</p>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-foreground mb-4">Links</h3>
            <ul className="space-y-2">
              {["Sobre", "Serviços", "Portfólio", "Contato"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-foreground mb-4">Contato</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:contato@studiokiiro.com" className="hover:text-primary transition-colors">
                  contato@studiokiiro.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/5511991076096" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  (11) 99107-6096
                </a>
              </li>
              <li>
                <a href="https://instagram.com/studiokiiro" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  @studiokiiro
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground text-xs">
          © 2026 Studio Kiiro. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
