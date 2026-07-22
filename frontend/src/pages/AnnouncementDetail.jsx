import { useEffect, useState } from "react";
import { useLanguage } from "../language/LanguageContext";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "../styles/announcement.css";

function AnnouncementDetail() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [announcement, setAnnouncement] = useState(null);
    const [loading, setLoading] = useState(true);
    const { language } = useLanguage();
    const { isGuest } = useAuth();

    useEffect(() => {

        async function fetchAnnouncement() {

            try {

                const response = await api.get(

                    `/announcements/${id}/`

                );

                setAnnouncement(
                    response.data
                );

                if (!isGuest) {

                    try {

                        await api.post(

                            "/announcements/activity/",

                            {

                                announcement: Number(id),

                                action: "READ",

                            }

                        );

                    }

                    catch (activityError) {

                        console.error(

                            "Read Activity Error:",

                            activityError.response?.data

                        );

                    }

                }

            }

            catch (error) {

                console.error(

                    "Announcement Detail Error:",

                    error.response?.data

                );

                setAnnouncement(null);

            }

            finally {

                setLoading(false);

            }

        }

        fetchAnnouncement();

    }, [id]);


    if (loading) {

        return (

            <>

                <Navbar />

                <div className="announcement-detail-page">

                    <p className="loading-text">

                        {language.announcement.loading}

                    </p>

                </div>

            </>

        );

    }

    if (!announcement) {

        return (

            <>

                <Navbar />

                <div className="announcement-detail-page">

                    <div className="empty-announcement">

                        <div className="empty-icon">

                            📭

                        </div>

                        <h3>

                            {language.announcement.announcementNotFound}

                        </h3>

                        <p>

                            {language.announcement.notFoundDescription}

                        </p>

                    </div>

                </div>

            </>

        );

    }

    return (

        <>

            <Navbar />

            <div className="announcement-detail-page">

                <div className="announcement-header">

                    <h1>

                        {announcement.title}

                    </h1>

                    <p>

                        {language.announcement.detailDescription}

                    </p>

                </div>

                <button
                    className="back-button"
                    onClick={() => navigate("/announcements")}
                >

                    ← {language.announcement.backToAnnouncements}

                </button>

                <div className="announcement-detail-card">

                    <div className="detail-top">

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

                    <div className="detail-meta">

                        <div className="meta-box">

                            👥

                            <span>

                                {announcement.target_audience}

                            </span>

                        </div>

                        <div className="meta-box">

                            🕒

                            <span>

                                {

                                    new Date(
                                        announcement.created_at
                                    ).toLocaleDateString(
                                        "en-GB",
                                        {
                                            day:"2-digit",
                                            month:"long",
                                            year:"numeric"
                                        }
                                    )

                                }

                            </span>

                        </div>

                    </div>

                    <hr className="detail-divider"/>

                    <div className="detail-content">

                        <p>

                            {announcement.description}

                        </p>

                    </div>

                    {

                        announcement.attachment && (

                            <div className="attachment-box">

                                <h3>

                                    {language.announcement.attachment}

                                </h3>

                                <a
                                    href={`http://127.0.0.1:8000${announcement.attachment}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="download-button"
                                >

                                    📎 {language.announcement.downloadAttachment}

                                </a>

                            </div>

                        )

                    }

                </div>

            </div>

        </>

    );

}

export default AnnouncementDetail;