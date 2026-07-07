import { useLanguage } from "../language/LanguageContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function DynamicBooths() {

  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const { language } = useLanguage();

  const filteredBooths = booths.filter(
    (booth) =>
      booth.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      booth.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {

    api
      .get("/booths/")
      .then((response) => {

        setBooths(response.data);

      })
      .catch((error) => {

        console.error("API Error:", error);

      })
      .finally(() => {

        setLoading(false);

      });

  }, []);

  const handleEnterBooth = (boothId) => {

    navigate(`/booth/${boothId}`);

  };

  return (

    <section className="featured-booths">

      <div className="section-title">

        <span className="section-badge">

          {language.exhibition.badge}

        </span>

        <h2>

          {language.exhibition.title}

        </h2>

        <p>

          {language.exhibition.description}

        </p>

        <div className="search-container">

          <input
            type="text"
            className="search-input"
            placeholder={language.exhibition.search}
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>

      </div>

      {loading ? (

        <p style={{ textAlign: "center" }}>

          {language.exhibition.loading}

        </p>

      ) : (

        <>

          <div className="booth-grid">

            {filteredBooths.length > 0 ? (

              filteredBooths
                .slice(0, 6)
                .map((booth) => (

                  <div
                    key={booth.id}
                    className="dynamic-booth-card"
                  >

                    <div className="area-banner">

                      {booth.thumbnail ? (

                        <img
                          src={`http://127.0.0.1:8000${booth.thumbnail}`}
                          alt={booth.title}
                          className="booth-thumbnail"
                        />

                      ) : (

                        <div className="booth-placeholder">

                          <span className="placeholder-icon">

                            🏢

                          </span>

                        </div>

                      )}

                    </div>

                    <div className="area-content">

                      <h3>

                        {booth.title}

                      </h3>

                      <p>

                        {booth.description}

                      </p>

                      <button
                        onClick={() =>
                          handleEnterBooth(booth.id)
                        }
                      >

                        {language.exhibition.explore}

                      </button>

                    </div>

                  </div>

                ))

            ) : (

              <p style={{ textAlign: "center" }}>

                {language.exhibition.noData}

              </p>

            )}

          </div>

          <div className="view-all-container">

            <button
              className="view-all-btn"
              onClick={() =>
                navigate("/exhibitions")
              }
            >

              {language.exhibition.viewAll}

            </button>

          </div>

        </>

      )}

    </section>

  );

}

export default DynamicBooths;