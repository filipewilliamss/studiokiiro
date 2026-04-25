import { Link } from "react-router-dom";
import akedahPag1 from "@/assets/akedah-pagina-1.webp";
import construmarPag1 from "@/assets/construmar-pagina-1.webp";
import teamluisaPag1 from "@/assets/teamluisa-pagina-1.webp";

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="bdsn-portfolio-section">
      <style>{`
        /* ===== SECTION BASE ===== */
        .bdsn-portfolio-section {
          width: 100%;
          min-height: 100vh;
          background: #050509;
          color: #ffffff;
          padding: 120px 40px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 60px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Inter", sans-serif;
        }

        .bdsn-portfolio-header {
          max-width: 960px;
          margin: 0 auto;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          margin-bottom: 40px;
        }

        .bdsn-portfolio-label {
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 12px;
          color: #FFCA16;
          font-weight: 700;
        }

        .bdsn-portfolio-heading {
          font-size: clamp(32px, 5vw, 48px);
          line-height: 1.1;
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .bdsn-portfolio-intro {
          font-size: 18px;
          line-height: 1.6;
          color: #b3b3b3;
          max-width: 640px;
          margin: 0;
        }

        /* ===== LISTA / ITENS ===== */
        .bdsn-portfolio-list {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .bdsn-portfolio-item {
          position: relative;
          height: 100vh;
          min-height: 640px;
          overflow: hidden;
          border-radius: 32px;
          background: #000000;
          color: #ffffff;
        }

        /* Imagem de fundo */
        .bdsn-portfolio-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: saturate(1.1) contrast(1.05);
          opacity: 0.9;
          transform: scale(1.02);
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease;
        }

        /* Gradiente para leitura */
        .bdsn-portfolio-item::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }

        /* Conteúdo textual */
        .bdsn-portfolio-overlay {
          position: relative;
          z-index: 2;
          height: 100%;
          padding: 80px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 24px;
        }

        /* Meta (categoria + ano) */
        .bdsn-portfolio-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bdsn-chip {
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
        }

        .bdsn-year {
          font-size: 13px;
          opacity: 0.7;
          font-weight: 500;
        }

        /* Título do projeto */
        .bdsn-project-title {
          font-size: clamp(32px, 4vw, 56px);
          line-height: 1;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.03em;
        }

        .bdsn-project-subtitle {
          font-size: clamp(18px, 2vw, 24px);
          line-height: 1.3;
          font-weight: 500;
          color: #FFCA16;
          max-width: 600px;
          margin: 0;
        }

        .bdsn-project-description {
          max-width: 640px;
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        /* Rodapé do projeto */
        .bdsn-project-footer {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          margin-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 32px;
        }

        .bdsn-client {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .bdsn-client-label {
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 11px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
        }

        .bdsn-client-name {
          font-size: 18px;
          font-weight: 600;
        }

        /* Link */
        .bdsn-project-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          color: #000;
          background: #FFCA16;
          padding: 16px 32px;
          border-radius: 999px;
          transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
        }

        .bdsn-project-link:hover {
          transform: translateY(-4px);
          background: #ffe07a;
          box-shadow: 0 20px 40px rgba(255, 202, 22, 0.2);
        }

        /* Hover card */
        .bdsn-portfolio-item:hover .bdsn-portfolio-bg {
          transform: scale(1.06);
          opacity: 1;
        }

        /* Responsivo */
        @media (max-width: 1024px) {
          .bdsn-portfolio-section { padding: 80px 24px; }
          .bdsn-portfolio-overlay { padding: 60px 40px; }
          .bdsn-project-footer { flex-direction: column; align-items: flex-start; gap: 32px; }
        }

        @media (max-width: 768px) {
          .bdsn-portfolio-section { padding: 60px 20px; }
          .bdsn-portfolio-overlay { padding: 40px 24px; }
          .bdsn-portfolio-item { height: 85vh; border-radius: 24px; }
          .bdsn-project-title { font-size: 32px; }
          .bdsn-project-subtitle { font-size: 18px; }
        }
      `}</style>

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