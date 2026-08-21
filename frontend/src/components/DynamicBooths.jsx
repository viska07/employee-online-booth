import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLanguage } from "../language/LanguageContext";
import api from "../services/api";

function DynamicBooths() {

  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {

    const fetchBooths = async () => {

      try {

        const response = await api.get("/booths/");

        setBooths(response.data);

      } catch (error) {

        console.error(
          "Failed to load booths:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchBooths();

  }, []);

  const filteredBooths = booths.filter(
    (booth) => {

      const keyword =
        searchTerm.toLowerCase().trim();

      if (!keyword) {
        return true;
      }

      return (
        booth.title
          ?.toLowerCase()
          .includes(keyword) ||

        booth.description
          ?.toLowerCase()
          .includes(keyword)
      );

    }
  );

  const displayedBooths =
    filteredBooths.slice(0, 6);

  const handleEnterBooth = (boothId) => {

    navigate(`/booth/${boothId}`);

  };

  const formatDate = (date) => {

    if (!date) {
      return null;
    }

    try {

      return new Date(date).toLocaleDateString(
        "id-ID",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );

    } catch {

      return null;

    }

  };

  return (

    <section className="featured-booths">

      {/* ================= HEADER ================= */}

      <div className="featured-booths-header">

        <div className="featured-header-text">

          <span className="section-badge">
            {language.exhibition.badge}
          </span>

          <h2>
            {language.exhibition.title}
          </h2>

          <p>
            {language.exhibition.description}
          </p>

        </div>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="featured-search">

        <span className="featured-search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder={
            language.exhibition.search
          }
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        {searchTerm && (

          <button
            className="clear-search"
            onClick={() =>
              setSearchTerm("")
            }
            type="button"
          >
            ×
          </button>

        )}

      </div>

      {/* ================= CONTENT ================= */}

      {loading ? (

        <div className="featured-loading">

          <div className="loading-spinner"></div>

          <p>
            {language.exhibition.loading}
          </p>

        </div>

      ) : (

        <>

          {displayedBooths.length > 0 ? (

            <div className="featured-booth-grid">

              {displayedBooths.map((booth) => (

                <article
                  key={booth.id}
                  className="featured-booth-card"
                >

                  {/* ================= IMAGE ================= */}

                  <div className="featured-booth-image">

                    {booth.thumbnail ? (

                      <img
                        src={`http://127.0.0.1:8000${booth.thumbnail}`}
                        alt={booth.title}
                      />

                    ) : (

                      <div className="featured-placeholder">

                        <span>
                          🏢
                        </span>

                      </div>

                    )}

                    {booth.is_featured && (

                      <div className="featured-badge">

                        ★ Featured

                      </div>

                    )}

                  </div>

                  {/* ================= CONTENT ================= */}

                  <div className="featured-booth-content">

                    <div className="booth-category">

                      <span className="category-icon">
                        ✦
                      </span>

                      Digital Exhibition

                    </div>

                    <h3>
                      {booth.title}
                    </h3>

                    <p className="featured-description">

                      {booth.description ||
                        "Jelajahi informasi dan materi digital pada area pameran ini."}

                    </p>

                    {/* ================= META ================= */}

                    <div className="booth-meta">

                      <span className="meta-item">

                        <span className="meta-icon">
                          👁
                        </span>

                        {booth.view_count ?? 0} views

                      </span>

                      {formatDate(
                        booth.published_at
                      ) && (

                        <>
                          <span className="meta-divider">
                            •
                          </span>

                          <span className="meta-item">

                            <span className="meta-icon">
                              📅
                            </span>

                            {formatDate(
                              booth.published_at
                            )}

                          </span>

                        </>

                      )}

                    </div>

                    {/* ================= BUTTON ================= */}

                    <button
                      className="featured-enter-btn"
                      onClick={() =>
                        handleEnterBooth(
                          booth.id
                        )
                      }
                    >

                      <span>
                        {language.exhibition.explore}
                      </span>

                      <span className="enter-arrow">
                        →
                      </span>

                    </button>

                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div className="featured-empty">

              <div className="featured-empty-icon">
                🔎
              </div>

              <h3>
                {language.exhibition.noData}
              </h3>

              <p>
                Tidak ditemukan area pameran
                yang sesuai dengan pencarian.
              </p>

            </div>

          )}

          {/* ================= VIEW ALL ================= */}

          <div className="featured-bottom">

            <button
              className="featured-view-all"
              onClick={() =>
                navigate("/exhibitions")
              }
            >

              <span>
                {language.exhibition.viewAll}
              </span>

              <span className="view-all-arrow">
                →
              </span>

            </button>

          </div>

        </>

      )}

    </section>

  );

}

export default DynamicBooths;