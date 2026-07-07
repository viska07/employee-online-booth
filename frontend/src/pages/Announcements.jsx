import { useEffect, useState } from "react";
import { useLanguage } from "../language/LanguageContext";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

import "../styles/announcement.css";

function Announcements() {

    const navigate = useNavigate();

    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const { language } = useLanguage();
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

    const filteredAnnouncements = announcements.filter((item) =>

        item.title.toLowerCase().includes(search.toLowerCase()) ||

        item.description.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <>

            <Navbar />

            <div className="announcements-page">

                <div className="announcement-header">

                    <h1>

                        {language.announcement.title}

                    </h1>

                    <p>

                        {language.announcement.subtitle}

                    </p>

                </div>

                <div className="announcement-search">

                    <span className="search-icon">

                        🔍

                    </span>

                    <input
                        type="text"
                        placeholder={language.announcement.search}
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <div className="announcement-counter">

                    {language.common.showing}{" "}

                    <strong>

                        {filteredAnnouncements.length}

                    </strong>{" "}

                    {language.announcement.plural}

                </div>

                {

                    loading ? (

                        <p className="loading-text">

                            {language.announcement.loading}

                        </p>

                    ) : (

                        <div className="announcement-list">

                            {

                                filteredAnnouncements.length > 0 ? (

                                    filteredAnnouncements.map((announcement) => (

                                        <div
                                            key={announcement.id}
                                            className="announcement-item"
                                        >

                                            <div className="announcement-top">

                                                {

                                                    announcement.is_important && (

                                                        <span className="important-badge">

                                                            📌 {language.announcement.important}

                                                        </span>

                                                    )

                                                }

                                                <span
                                                    className={`category-badge ${announcement.category.toLowerCase()}`}
                                                >

                                                    {announcement.category}

                                                </span>

                                            </div>

                                            <h2>

                                                {announcement.title}

                                            </h2>

                                            <p>

                                                {announcement.description}

                                            </p>

                                            <div className="announcement-footer">

                                                <div className="announcement-date">

                                                    <span>

                                                        🕒

                                                    </span>

                                                    <span>

                                                        {

                                                            new Date(
                                                                announcement.created_at
                                                            ).toLocaleDateString(
                                                                "en-GB",
                                                                {
                                                                    day: "2-digit",
                                                                    month: "long",
                                                                    year: "numeric",
                                                                }
                                                            )

                                                        }

                                                    </span>

                                                </div>

                                                <button
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

                                            {language.announcement.searchNotFound}

                                        </p>

                                    </div>

                                )

                            }

                        </div>

                    )

                }

            </div>

        </>

    );

}

export default Announcements;