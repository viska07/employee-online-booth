import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../language/LanguageContext";
import Navbar from "../components/Navbar";
import "../styles/booth.css";
import api from "../services/api";

function Exhibitions() {

  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [progressData, setProgressData] = useState([]);
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {

    api
      .get("/booths/")
      .then((response) => {
        setBooths(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

    api
      .get("/booths/progress/")
      .then((response) => {
        setProgressData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    }, []);

  const filteredBooths = booths.filter((booth) =>

    booth.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    ||

    booth.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

  );

  const handleEnterBooth = (boothId) => {

    navigate(`/booth/${boothId}`);

  };

  const getProgress = (boothId) => {
    return (
        progressData.find(
            (item) => item.booth === boothId
        ) || {
            opened: 0,
            total: 0,
            progress: 0,
            status: "NEW",
        }
    );
};

  return (

    <>

      <Navbar />

      <div className="exhibitions-page">

        <div className="page-header">

          <h1>

            {language.exhibitionPage.title}

          </h1>

          <p>

            {language.exhibitionPage.description}

          </p>

        </div>

        <div className="search-container">
            <div className="search-box">
                <span className="search-icon">
                    🔍
                </span>
                <input
                    type="text"
                    className="search-input"
                    placeholder={language.exhibitionPage.search}
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }/>
            </div>

        </div>

        <div className="booth-counter">

            {language.exhibitionPage.showing}

            {" "}

            <strong>

                {filteredBooths.length}

            </strong>

            {" "}

            {language.exhibitionPage.booths}

        </div>

        {loading ? (

          <p
            style={{
              textAlign: "center",
              marginTop: "40px",
            }}
          >

            {language.exhibitionPage.loading}

          </p>

        ) : (

          <div className="booth-grid">

            {filteredBooths.length > 0 ? (

              filteredBooths.map((booth) => (

                <div
                  key={booth.id}
                  className="exhibition-card"
                >

                  <div className="exhibition-banner">

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

                  <div className="exhibition-content">

                    <h3>
                      {booth.title}
                    </h3>

                    {(() => {

                      const progress = getProgress(booth.id);

                      return (

                          <>

                              <div
                                  className={`progress-status ${progress.status.toLowerCase()}`}
                              >

                                  {
                                      progress.status === "NEW"
                                          ? `🆕 ${language.booth.new}`
                                          : progress.status === "IN_PROGRESS"
                                          ? `📖 ${language.booth.inProgress}`
                                          : `✅ ${language.booth.completed}`
                                  }

                              </div>

                              <div className="progress-wrapper">

                                  <div className="progress-header">

                                      <span>{language.booth.learningProgress}</span>

                                      <strong>{progress.progress}%</strong>

                                  </div>

                                  <div className="progress-track">

                                      <div
                                          className="progress-fill"
                                          style={{
                                              width: `${progress.progress}%`
                                          }}
                                      ></div>

                                  </div>

                                  <div className="progress-info">

                                      {progress.opened} / {progress.total} {language.booth.materials}

                                  </div>

                              </div>

                          </>

                      );

                  })()} 
                    <p>

                      {booth.description}

                    </p>

                    <button
                      className="visit-booth-btn"
                      onClick={() =>
                        handleEnterBooth(booth.id)
                      }
                    >

                      {language.exhibitionPage.explore}

                    </button>

                  </div>

                </div>

              ))

            ) : (

              <p
                style={{
                  textAlign: "center",
                  width: "100%",
                }}
              >

                {language.exhibitionPage.noData}

              </p>

            )}

          </div>

        )}

      </div>

    </>

  );

}

export default Exhibitions;