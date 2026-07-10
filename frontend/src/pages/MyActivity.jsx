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

    const getActivityIcon = (activity) => {

        if (
            activity.action === "VIEW" &&
            activity.is_content
        ) {

            return "📄";

        }

        if (
            activity.action === "VIEW"
        ) {

            return "🏢";

        }

        if (
            activity.action === "COMPLETE"
        ) {

            return "✅";

        }

        return "📌";

    };

    const getActivityText = (activity) => {

        if (

            activity.action === "VIEW" &&

            activity.is_content

        ) {

            return "Viewed Content";

        }

        if (

            activity.action === "VIEW"

        ) {

            return "Visited Booth";

        }

        if (

            activity.action === "COMPLETE"

        ) {

            return "Completed";

        }

        return activity.action;

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

                                                    getActivityIcon(activity)

                                                }

                                            </div>

                                            <div className="activity-info">

                                                <h3>

                                                    {

                                                        activity.is_content

                                                        ?

                                                        activity.content_title

                                                        :

                                                        activity.booth_title

                                                    }

                                                </h3>

                                                <p>

                                                    {

                                                        getActivityText(activity)

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