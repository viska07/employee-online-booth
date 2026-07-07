import { useLanguage } from "../language/LanguageContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function DynamicAnnouncement() {

    const navigate = useNavigate();
    const { language } = useLanguage();
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        api.get("/announcements/")
            .then((response) => {

                setAnnouncements(response.data);

            })
            .catch((error) => {

                console.error(error);

            })
            .finally(() => {

                setLoading(false);
                
            });

    }, []);

    return (

        <section className="announcement-section">

            <div className="section-title">

                <span className="section-badge">

                    {language.announcement.informationStage}

                </span>

                <h2>

                    {language.announcement.latestUpdates}

                </h2>

                <p>

                    {language.announcement.subtitle}

                </p>

            </div>

            {

                loading ? (

                    <p className="loading-text">

                        {language.announcement.loading}

                    </p>

                ) : (

                    <div className="announcement-grid">

                        {

                            announcements.length > 0 ? (

                                announcements.map((announcement) => (

                                    <div
                                        key={announcement.id}
                                        className="announcement-card"
                                    >

                                        <div className="announcement-card-top">

                                            {

                                                announcement.is_important && (

                                                    <span className="important-badge">

                                                        📌 {language.announcement.important}

                                                    </span>

                                                )

                                            }

                                            <span className="announcement-category">

                                                {announcement.category}

                                            </span>

                                        </div>

                                        <h3>

                                            {announcement.title}

                                        </h3>

                                        <p>

                                            {announcement.description}

                                        </p>

                                        <div className="announcement-card-footer">

                                            <span className="announcement-date">

                                                🕒 {

                                                    new Date(
                                                        announcement.created_at
                                                    ).toLocaleDateString(
                                                        "en-GB",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )

                                                }

                                            </span>

                                            <button
                                                className="announcement-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/announcement/${announcement.id}`
                                                    )
                                                }
                                            >

                                                {language.common.readMore} →

                                            </button>

                                        </div>

                                    </div>

                                ))

                            ) : (

                                <div className="empty-announcement">

                                    <div className="empty-icon">

                                        📭

                                    </div>

                                    <h3>

                                        {language.announcement.noAnnouncement}

                                    </h3>

                                    <p>

                                        {language.announcement.noAnnouncementDescription}

                                    </p>

                                </div>

                            )

                        }

                    </div>

                )

            }

        </section>

    );

}

export default DynamicAnnouncement;