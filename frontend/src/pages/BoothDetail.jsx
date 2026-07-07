import { useLanguage } from "../language/LanguageContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/boothDetail.css";
import api from "../services/api";

function BoothDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [booth, setBooth] = useState(null);
  const [contents, setContents] = useState([]);
  const [viewedContents, setViewedContents] = useState([]);
  const { language } = useLanguage();
  const [previewImage, setPreviewImage] = useState(false);
  const getContentIcon = (type) => {

    switch(type){

      case "VIDEO":
        return "🎥";

      case "DOCUMENT":
        return "📄";

      case "PRESENTATION":
        return "📊";

      case "ARTICLE":
        return "📰";

      default:
        return "📁";
    }

  };

    const getButtonText = (type) => {

      switch(type){

        case "VIDEO":
          return language.booth.watchVideo;

        case "DOCUMENT":
          return language.booth.openDocument;

        case "PRESENTATION":
          return language.booth.openPresentation;

        case "ARTICLE":
          return language.booth.readArticle;

        default:
          return language.booth.open;
      }

    };

    const isViewed = (contentId) => {

        return viewedContents.includes(contentId);
    };
    
  const handleOpenResource = async (content) => {
    try {

      await api.post("/booths/activity/", {

        booth: booth.id,
        content: content.id,
        action: "OPEN",

      });

      setViewedContents((previous) => {

          if (previous.includes(content.id)) {
              return previous;
          }
          return [...previous, content.id];

      });

    } catch (error) {

      console.error("Activity Error :", error);

    }

    window.open(

      `http://127.0.0.1:8000${content.file}`,

      "_blank"

    );

  };

  useEffect(() => {
    api
      .get("/booths/")
      .then((response) => {
        const selectedBooth = response.data.find(
          (item) => item.id === Number(id)
        );

        setBooth(selectedBooth);

        if (selectedBooth) {
          api.post(`/booths/${selectedBooth.id}/view/`);

          api.post("/booths/activity/", {
            booth: selectedBooth.id,
            action: "VIEW",
          })
          .catch((error) => {
            console.error(error);
          });

          api
            .get(`/booths/${selectedBooth.id}/contents/`)
            .then((response) => {
              setContents(response.data);
            })
            .catch((error) => {
              console.error(error);
            });

          api
            .get(`/booths/${selectedBooth.id}/viewed-contents/`)
            .then((response) => {
                setViewedContents(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!booth) {
    return (
      <p style={{ padding: "40px" }}>
        {language.booth.loading}
      </p>
    );
  }

      return (
      <>
        <Navbar />

        <div className="booth-detail">

          {/* HERO */}
          <div className="detail-hero">
            <h1>{booth.title}</h1>
            <p>{booth.description}</p>
          </div>

      {/* MAIN LAYOUT */}
      <div className="booth-layout">

          <aside className="booth-sidebar">

              <div className="poster-panel">

                  {booth.thumbnail && (

                      <img
                          src={`http://127.0.0.1:8000${booth.thumbnail}`}
                          className="resource-thumbnail"
                          onClick={() => setPreviewImage(true)}
                      />

                  )}

              </div>

              <div className="booth-information">

                  <h3>
                      {language.booth.information}
                  </h3>

                  <div className="info-item">

                      <span>📚 {language.booth.materials}</span>

                      <strong>

                          {contents.length}

                      </strong>

                  </div>

                  <div className="info-item">

                      <span>👀 {language.booth.viewed}</span>

                      <strong>

                          {viewedContents.length}

                      </strong>

                  </div>

                  <div className="info-item">

                      <span>🏢 Booth</span>

                      <strong>

                          {booth.title}

                      </strong>

                  </div>

              </div>

          </aside>

        {/* CONTENT */}
        <section className="content-list">

          <div className="resources-header">

            <h2>
              {language.booth.title}
            </h2>

            <p>
              {language.booth.description}
            </p>

          </div>

          {contents.length > 0 ? (

            <div className="content-grid">

              {contents.map((content) => (

                <div
                  key={content.id}
                  className="content-card"
                >

                  <div className="content-header">

                    <div className="content-icon">
                      {getContentIcon(content.type)}
                    </div>

                    <div className="content-info">

                      <h3>
                        {content.title}
                      </h3>

                      <div
                        className={
                          isViewed(content.id)
                            ? "resource-status viewed"
                            : "resource-status not-viewed"
                        }
                      >

                        <span>
                          {isViewed(content.id) ? "✓" : "○"}
                        </span>

                        <span>
                          {isViewed(content.id)
                            ? "Viewed"
                            : "Not Viewed"}
                        </span>

                      </div>

                      <p>
                        {content.description}
                      </p>

                    </div>

                  </div>

                  <div className="content-meta">

                    <div className="meta-left">

                      <span
                        className={`content-type ${content.type.toLowerCase()}`}
                      >

                        {getContentIcon(content.type)}

                        <span>
                          {language.booth.types[content.type]}
                        </span>

                      </span>

                    </div>

                    <div className="meta-right">

                      <div className="meta-item">

                        <span>📅</span>

                        <span>

                          {new Date(
                            content.created_at
                          ).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )}

                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="content-action">

                    <button
                      className="resource-button"
                      onClick={() =>
                        handleOpenResource(content)
                      }
                    >

                      {getButtonText(content.type)}

                    </button>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <p>
              {language.booth.noResources}
            </p>

          )}

        </section>

      </div>

    </div>

    {previewImage && (

    <div
        className="image-preview"
        onClick={() => setPreviewImage(false)}
    >

        <img
            src={`http://127.0.0.1:8000${booth.thumbnail}`}
            className="preview-image"
        />

    </div>

    )}

  </>
);
}

export default BoothDetail;