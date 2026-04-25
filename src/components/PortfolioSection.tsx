import { useState, useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";

const PortfolioSection = () => {
  const [activeTab, setActiveTab] = useState("Identidade Visual");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get index of entry.target among all .portfolio-card elements
            const allCards = Array.from(document.querySelectorAll('.portfolio-card'));
            const index = allCards.indexOf(entry.target as Element);
            
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 120);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach(card => observer.observe(card));

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, [activeTab]);

  const filteredProjects = projects.filter(p => p.category === activeTab);

  // If "Redes Sociais" is selected and no projects are found, show some placeholders
  const displayProjects = activeTab === "Redes Sociais" && filteredProjects.length === 0 
    ? [
        { id: 101, title: "Social Media 01", category: "Redes Sociais", logo: "", slug: "social-1", pages: [] },
        { id: 102, title: "Social Media 02", category: "Redes Sociais", logo: "", slug: "social-2", pages: [] },
      ]
    : filteredProjects;

  return (
    <section id="portfolio" className="bg-[#070807] py-24 md:py-36 overflow-hidden">
      <style>{`
        .portfolio-cards-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
        }

        .portfolio-card {
          position: relative;
          width: 100%;
          height: 85vh;
          overflow: hidden;
          cursor: pointer;
          text-decoration: none;
          display: block;
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .portfolio-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .card-imagem {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .card-imagem img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .portfolio-card:hover .card-imagem img {
          transform: scale(1.04);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.85) 0%,
            rgba(0,0,0,0.2) 40%,
            transparent 70%
          );
          transition: background 0.4s ease;
        }

        .portfolio-card:hover .card-overlay {
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.9) 0%,
            rgba(0,0,0,0.35) 50%,
            rgba(0,0,0,0.1) 100%
          );
        }

        .card-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px 48px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
        }

        .card-numero {
          font-family: Poppins, sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: rgba(255,202,22,0.6);
          letter-spacing: 2px;
          flex-shrink: 0;
          margin-bottom: 4px;
        }

        .card-texto {
          flex: 1;
        }

        .card-nome {
          font-family: Poppins, sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 6px 0;
          letter-spacing: -1px;
          line-height: 1;
        }

        .card-categoria {
          font-family: Poppins, sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #FFCA16;
          text-transform: uppercase;
          letter-spacing: 3px;
        }

        .card-arrow {
          font-size: 32px;
          color: #FFCA16;
          opacity: 0;
          transform: translateX(-12px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          flex-shrink: 0;
          margin-bottom: 8px;
        }

        .portfolio-card:hover .card-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .portfolio-tabs {
          display: flex;
          gap: 32px;
          margin-bottom: 64px;
          justify-content: center;
        }

        .portfolio-tab {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.4);
          font-family: Poppins, sans-serif;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 3px;
          cursor: pointer;
          transition: color 0.3s ease;
          position: relative;
          padding-bottom: 8px;
        }

        .portfolio-tab.active {
          color: #FFCA16;
        }

        .portfolio-tab.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: #FFCA16;
        }

        @media (max-width: 768px) {
          .card-info {
            padding: 32px 24px;
            flex-direction: column;
            align-items: flex-start;
          }
          .card-nome {
            font-size: 28px;
          }
          .card-arrow {
            display: none;
          }
          .portfolio-card {
            height: 70vh;
          }
        }
      `}</style>

      <div className="container-editorial">
        <div className="portfolio-tabs">
          {["Identidade Visual", "Redes Sociais"].map((tab) => (
            <button
              key={tab}
              className={`portfolio-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="portfolio-cards-container" ref={containerRef}>
          {displayProjects.map((project, index) => {
            const hasBgImage = project.pages && project.pages.length > 0;
            const bgImage = hasBgImage ? project.pages[0] : null;

            return (
              <Link
                key={project.id}
                to={`/projeto/${project.slug}`}
                className="portfolio-card"
                style={!hasBgImage ? { height: '60vh' } : {}}
              >
                <div className="card-imagem" style={!hasBgImage ? { background: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center' } : {}}>
                  {hasBgImage ? (
                    <img src={bgImage} alt={project.title} />
                  ) : (
                    <img src={project.logo} alt={project.title} style={{ width: 'auto', height: '40%', objectFit: 'contain' }} />
                  )}
                  <div className="card-overlay"></div>
                </div>
                <div className="card-info">
                  <span className="card-numero">{String(index + 1).padStart(2, '0')}</span>
                  <div className="card-texto">
                    <h3 className="card-nome">{project.title}</h3>
                    <span className="card-categoria">
                      {project.category}
                    </span>
                  </div>
                  <span className="card-arrow">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;