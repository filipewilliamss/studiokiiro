import { projects } from "@/data/projects";
import { Link } from "react-router-dom";

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="portfolio-section">
      <style>{`
        /* ===== SECTION BASE ===== */
        .portfolio-section {
          width: 100%;
          min-height: 100vh;
          background: #050509;
          color: #ffffff;
          padding: 80px 40px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 60px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Inter", sans-serif;
        }

        .portfolio-header {
          max-width: 960px;
          margin: 0 auto;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .portfolio-eyebrow {
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 12px;
          color: #f5f5f5;
          opacity: 0.7;
        }

        .portfolio-title {
          font-size: 40px;
          line-height: 1.1;
          font-weight: 700;
          margin: 0;
        }

        .portfolio-subtitle {
          font-size: 16px;
          line-height: 1.6;
          color: #b3b3b3;
          max-width: 640px;
          margin: 0;
        }

        /* ===== LISTA / ITENS ===== */
        .portfolio-list {
          display: flex;
          flex-direction: column;
          scroll-snap-type: y mandatory;
        }

        .portfolio-item {
          position: relative;
          height: 100vh;
          min-height: 640px;
          overflow: hidden;
          border-radius: 24px;
          margin-bottom: 40px;
          background: #000000;
          color: #ffffff;
          scroll-snap-align: start;
        }

        /* Imagem de fundo (projeto) */
        .portfolio-bg {
          position: absolute;
          inset: 0;
          background-image: var(--bg-image);
          background-size: cover;
          background-position: center;
          filter: saturate(1.1) contrast(1.05);
          opacity: 0.9;
          transform: scale(1.02);
          transition: transform 0.6s ease, opacity 0.6s ease, filter 0.6s ease;
        }

        /* Gradiente para ler o texto por cima da imagem */
        .portfolio-item::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top left, #ffffff10 0, transparent 50%),
                      linear-gradient(to top, #000000cc 0, #00000040 40%, #00000000 100%);
          pointer-events: none;
          z-index: 1;
        }

        /* Conteúdo textual */
        .portfolio-content {
          position: relative;
          z-index: 2;
          height: 100%;
          padding: 60px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 24px;
        }

        /* Meta (categoria + ano) */
        .portfolio-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #f3f3f3;
          opacity: 0.9;
        }

        .portfolio-tag {
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid #ffffff33;
          background: #00000066;
        }

        .portfolio-year {
          opacity: 0.8;
        }

        /* Título do projeto */
        .portfolio-project-title {
          font-size: 32px;
          line-height: 1.1;
          font-weight: 700;
          margin: 0;
        }

        /* Descrição */
        .portfolio-description {
          max-width: 520px;
          font-size: 15px;
          line-height: 1.6;
          color: #e3e3e3;
          margin: 0;
        }

        /* Parte de baixo: cliente + link */
        .portfolio-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .portfolio-client {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 13px;
        }

        .portfolio-client .label {
          text-transform: uppercase;
          letter-spacing: 0.16em;
          opacity: 0.6;
        }

        .portfolio-client .value {
          font-size: 15px;
          font-weight: 500;
        }

        /* Botão / link */
        .portfolio-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          text-decoration: none;
          color: #fede3a;
          border-radius: 999px;
          padding: 10px 18px;
          background: #00000080;
          border: 1px solid #fede3a55;
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }

        .portfolio-link-icon {
          font-size: 14px;
          transition: transform 0.25s ease;
        }

        .portfolio-link:hover {
          background: #fede3a;
          color: #000000;
          box-shadow: 0 12px 30px #00000088;
          transform: translateY(-1px);
        }

        .portfolio-link:hover .portfolio-link-icon {
          transform: translate(2px, -2px);
        }

        /* Hover geral do card */
        .portfolio-item:hover .portfolio-bg {
          transform: scale(1.06);
          filter: saturate(1.2) contrast(1.08);
          opacity: 1;
        }

        /* ===== SCROLL SNAP ===== */
        html {
          scroll-behavior: smooth;
        }

        /* ===== RESPONSIVO ===== */
        @media (max-width: 1024px) {
          .portfolio-section {
            padding: 60px 24px;
          }
          .portfolio-content {
            padding: 40px 24px;
          }
          .portfolio-title {
            font-size: 32px;
          }
          .portfolio-project-title {
            font-size: 26px;
          }
          .portfolio-item {
            border-radius: 16px;
            min-height: 560px;
          }
        }

        @media (max-width: 768px) {
          .portfolio-section {
            padding: 40px 20px;
          }
          .portfolio-title {
            font-size: 26px;
          }
          .portfolio-subtitle {
            font-size: 14px;
          }
          .portfolio-content {
            padding: 32px 20px;
            justify-content: flex-end;
          }
          .portfolio-item {
            height: 90vh;
            min-height: 520px;
            margin-bottom: 32px;
          }
          .portfolio-bottom {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

      {/* Título da seção */}
      <div className="portfolio-header">
        <p className="portfolio-eyebrow">PORTFÓLIO</p>
        <h2 className="portfolio-title">
          Identidades visuais que conectam marcas<br />
          com pessoas reais.
        </h2>
        <p className="portfolio-subtitle">
          Uma seleção dos projetos mais recentes de branding, identidade visual e direção criativa.
        </p>
      </div>

      {/* Lista de projetos */}
      <div className="portfolio-list">
        {projects.map((project) => (
          <article 
            key={project.id} 
            className="portfolio-item"
          >
            <div 
              className="portfolio-bg" 
              style={{ "--bg-image": `url(${project.pages[0]})` } as React.CSSProperties}
            ></div>

            <div className="portfolio-content">
              <div className="portfolio-meta">
                <span className="portfolio-tag">{project.category.toUpperCase()}</span>
                <span className="portfolio-year">{project.year}</span>
              </div>

              <h3 className="portfolio-project-title">{project.title}</h3>

              <p className="portfolio-description">
                {project.intro}
              </p>

              <div className="portfolio-bottom">
                <div className="portfolio-client">
                  <span className="label">Cliente</span>
                  <span className="value">{project.client}</span>
                </div>
                <Link to={`/projeto/${project.slug}`} className="portfolio-link">
                  Ver projeto completo
                  <span className="portfolio-link-icon">↗</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;