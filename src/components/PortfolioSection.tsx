import { Link } from "react-router-dom";
import akedahPag1 from "@/assets/akedah-pagina-1.webp";
import construmarPag1 from "@/assets/construmar-pagina-1.webp";
import teamluisaPag1 from "@/assets/teamluisa-pagina-1.webp";

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="bdsn-portfolio-section">

      <header className="bdsn-portfolio-header">
        <p className="bdsn-portfolio-label">Portfólio</p>
        <h2 className="bdsn-portfolio-heading">Identidade visual & branding</h2>
        <p className="bdsn-portfolio-intro">
          Uma seleção de projetos em que trabalhei identidade visual, estratégia e direção criativa
          para construir marcas com presença, contraste e personalidade.
        </p>
      </header>

      <div className="bdsn-portfolio-list">
        {/* PROJETO 1 – Akedah Podcast */}
        <article className="bdsn-portfolio-item">
          <div 
            className="bdsn-portfolio-bg"
            style={{ backgroundImage: `url(${akedahPag1})` }}
          ></div>

          <div className="bdsn-portfolio-overlay">
            <div className="bdsn-portfolio-meta">
              <span className="bdsn-chip">Identidade Visual</span>
              <span className="bdsn-year">2025</span>
            </div>

            <h3 className="bdsn-project-title">Akedah Podcast</h3>
            <p className="bdsn-project-subtitle">
              Identidade com presença, contraste e personalidade para um podcast que vive de voz e opinião.
            </p>

            <p className="bdsn-project-description">
              Construção de um sistema visual que traduz a essência do Akedah em formas, cores e tipografia
              marcantes. A nova identidade fortalece o posicionamento da marca, cria reconhecimento imediato
              e dá consistência para a comunicação em capas, redes sociais e materiais digitais.
            </p>

            <div className="bdsn-project-footer">
              <div className="bdsn-client">
                <span className="bdsn-client-label">Cliente</span>
                <span className="bdsn-client-name">Akedah Podcast</span>
              </div>
              <Link to="/projeto/akedah-podcast" className="bdsn-project-link">Ver projeto completo ↗</Link>
            </div>
          </div>
        </article>

        {/* PROJETO 2 – Construmar */}
        <article className="bdsn-portfolio-item">
          <div 
            className="bdsn-portfolio-bg"
            style={{ backgroundImage: `url(${construmarPag1})` }}
          ></div>

          <div className="bdsn-portfolio-overlay">
            <div className="bdsn-portfolio-meta">
              <span className="bdsn-chip">Branding</span>
              <span className="bdsn-year">2025</span>
            </div>

            <h3 className="bdsn-project-title">Construmar</h3>
            <p className="bdsn-project-subtitle">
              Sistema visual sólido para um mercado de alta competitividade.
            </p>

            <p className="bdsn-project-description">
              Desenvolvimento de um sistema visual que transmite credibilidade, clareza e força para a Construmar.
              A identidade foi pensada para funcionar em diversos pontos de contato — do digital ao físico —,
              reforçando a confiança na marca e posicionando a empresa com mais presença em um mercado disputado.
            </p>

            <div className="bdsn-project-footer">
              <div className="bdsn-client">
                <span className="bdsn-client-label">Cliente</span>
                <span className="bdsn-client-name">Construmar</span>
              </div>
              <Link to="/projeto/construmar" className="bdsn-project-link">Ver projeto completo ↗</Link>
            </div>
          </div>
        </article>

        {/* PROJETO 3 – Team Luísa Crosstraining */}
        <article className="bdsn-portfolio-item">
          <div 
            className="bdsn-portfolio-bg"
            style={{ backgroundImage: `url(${teamluisaPag1})` }}
          ></div>

          <div className="bdsn-portfolio-overlay">
            <div className="bdsn-portfolio-meta">
              <span className="bdsn-chip">Identidade Visual</span>
              <span className="bdsn-year">2024</span>
            </div>

            <h3 className="bdsn-project-title">Team Luísa Crosstraining</h3>
            <p className="bdsn-project-subtitle">
              Linguagem visual forte e memorável para uma marca de alta performance.
            </p>

            <p className="bdsn-project-description">
              Criação de um projeto visual com impacto, contraste e legibilidade em movimento. A identidade
              do Team Luísa Crosstraining foi construída para destacar a marca em ambientes físicos e digitais,
              reforçando sua presença no mercado e conectando a energia do treino com uma estética contemporânea.
            </p>

            <div className="bdsn-project-footer">
              <div className="bdsn-client">
                <span className="bdsn-client-label">Cliente</span>
                <span className="bdsn-client-name">Team Luísa Crosstraining</span>
              </div>
              <Link to="/projeto/team-luisa-crosstraining" className="bdsn-project-link">Ver projeto completo ↗</Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default PortfolioSection;