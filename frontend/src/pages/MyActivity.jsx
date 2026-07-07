import { useEffect, useState } from "react";
import { useLanguage } from "../language/LanguageContext";
import Navbar from "../components/Navbar";
import api from "../services/api";

function MyActivity() {

    const [activities, setActivities] = useState([]);
    const { language, currentLanguage } = useLanguage();

    useEffect(() => {

        api.get("/booths/my-activity/")
            .then((response) => {

                setActivities(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    }, []);

    const getActivityIcon = (action) => {

        switch (action) {

            case "VIEW":
                return "👁️";

            case "OPEN":
                return "📄";

            case "COMPLETE":
                return "✅";

            default:
                return "📌";

        }

    };

    const getActivityText = (action) => {

        switch (action) {

            case "VIEW":
                return language.activity.viewedBooth;

            case "OPEN":
                return language.activity.openedResource;

            case "COMPLETE":
                return language.activity.completed;

            default:
                return action;

        }

    };

    const getBadgeClass = (action) => {

        switch (action) {

            case "VIEW":
                return "activity-badge activity-view";

            case "OPEN":
                return "activity-badge activity-open";

            case "COMPLETE":
                return "activity-badge activity-complete";

            default:
                return "activity-badge";

        }

    };

    return (

        <>

            <Navbar />

            <div className="activity-page">

                <div className="activity-header">

                    <h1>

                        {language.activity.title}

                    </h1>

                    <p>

                        {language.activity.description}

                    </p>

                </div>

                {

                    activities.length === 0 ? (

                        <div className="empty-activity">

                            <div
                                style={{
                                    fontSize: "60px"
                                }}
                            >

                                📂

                            </div>

                            <h2>

                                {language.activity.emptyTitle}

                            </h2>

                            <p>

                                {language.activity.emptyDescription}

                            </p>

                        </div>

                    ) : (

                        <div className="activity-list">

                            {

                                activities.map((activity) => (

                                    <div
                                        key={activity.id}
                                        className="activity-card"
                                    >

                                        <div className="activity-left">

                                            <div className="activity-icon">

                                                {

                                                    getActivityIcon(
                                                        activity.action
                                                    )

                                                }

                                            </div>

                                            <div className="activity-info">

                                                <h3>

                                                    {activity.booth_title}

                                                </h3>

                                                <p>

                                                    {

                                                        getActivityText(
                                                            activity.action
                                                        )

                                                    }

                                                </p>

                                                <div className="activity-date">

                                                    {

                                                        new Date(
                                                            activity.created_at
                                                        ).toLocaleString(

                                                            currentLanguage === "id"
                                                                ? "id-ID"
                                                                : "en-GB",

                                                            {
                                                                dateStyle: "full",
                                                                timeStyle: "short",
                                                            }

                                                        )

                                                    }

                                                </div>

                                            </div>

                                        </div>

                                        <div
                                            className={
                                                getBadgeClass(
                                                    activity.action
                                                )
                                            }
                                        >

                                            {

                                                getActivityText(
                                                    activity.action
                                                )

                                            }

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </>

    );

}

export default MyActivity;