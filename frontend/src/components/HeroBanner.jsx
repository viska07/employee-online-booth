import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useLanguage } from "../language/LanguageContext";

function HeroBanner() {

  const navigate = useNavigate();

  const { language } = useLanguage();

  const [stats, setStats] = useState({
    total_booths: 0,
    total_updates: 0,
    total_featured: 0,
  });

  useEffect(() => {

    api.get("/booths/stats/")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  return (

    <section className="hero-dashboard">

      <div className="hero-left">

        <div className="hero-badge">
          {language.hero.badge}
        </div>

        <h1>
          {language.hero.title}
        </h1>

        <p>
          {language.hero.description}
        </p>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={() => navigate("/exhibitions")}
          >
            {language.hero.explore}
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/announcements")}
          >
            {language.hero.updates}
          </button>

        </div>

      </div>

      <div className="hero-right">

        <div className="hero-visual">

          <div className="hero-stat-card">

            <h2>
              {stats.total_booths}
            </h2>

            <span>
              {language.hero.areas}
            </span>

          </div>

          <div className="hero-stat-card">

            <h2>
              {stats.total_updates}
            </h2>

            <span>
              {language.hero.updatesStat}
            </span>

          </div>

          <div className="hero-stat-card">

            <h2>
              {stats.total_featured}
            </h2>

            <span>
              {language.hero.featured}
            </span>

          </div>

        </div>

      </div>

    </section>

  );
}

export default HeroBanner;