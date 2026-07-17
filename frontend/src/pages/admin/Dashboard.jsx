import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import "../../styles/admin.css";

function Dashboard() {

    const navigate = useNavigate();

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);


    useEffect(() => {

        async function fetchDashboard() {

            try {

                setLoading(true);

                setError(false);

                const response = await api.get(
                    "/dashboard/"
                );

                setData(
                    response.data
                );

            }

            catch (error) {

                console.error(
                    "Dashboard Error:",
                    error.response?.data || error
                );

                setError(true);

            }

            finally {

                setLoading(false);

            }

        }

        fetchDashboard();

    }, []);


    if (loading) {

        return (

            <div className="admin-loading">

                Loading Dashboard...

            </div>

        );

    }


    if (error || !data) {

        return (

            <div className="dashboard-error-state">

                <h3>

                    Unable to load dashboard

                </h3>

                <p>

                    Dashboard data could not be loaded.
                    Please refresh the page and try again.

                </p>

            </div>

        );

    }


    const statistics = (
        data.statistics || {}
    );


    return (

        <div className="dashboard-page">

            <div className="admin-page-header dashboard-page-header">

                <div>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Monitor portal activity and information at a glance.
                    </p>

                </div>

            </div>


            <div className="dashboard-statistics">

                <div className="dashboard-stat-card">

                    <span className="dashboard-stat-label">

                        Total Booths

                    </span>

                    <strong className="dashboard-stat-value">

                        {statistics.total_booths ?? 0}

                    </strong>

                    <p>

                        Information booths available
                        in the portal.

                    </p>

                </div>


                <div className="dashboard-stat-card">

                    <span className="dashboard-stat-label">

                        Booth Views

                    </span>

                    <strong className="dashboard-stat-value">

                        {statistics.total_booth_views ?? 0}

                    </strong>

                    <p>

                        Total booth visits recorded
                        from employees.

                    </p>

                </div>


                <div className="dashboard-stat-card">

                    <span className="dashboard-stat-label">

                        Content Views

                    </span>

                    <strong className="dashboard-stat-value">

                        {statistics.total_content_views ?? 0}

                    </strong>

                    <p>

                        Total booth content views
                        recorded in the portal.

                    </p>

                </div>


                <div className="dashboard-stat-card">

                    <span className="dashboard-stat-label">

                        Announcements

                    </span>

                    <strong className="dashboard-stat-value">

                        {statistics.total_announcements ?? 0}

                    </strong>

                    <p>

                        Announcements currently stored
                        by the system.

                    </p>

                </div>


                <div className="dashboard-stat-card">

                    <span className="dashboard-stat-label">

                        Announcement Reads

                    </span>

                    <strong className="dashboard-stat-value">

                        {
                            statistics
                                .total_announcement_reads
                            ?? 0
                        }

                    </strong>

                    <p>

                        Employee announcement reading
                        activities recorded.

                    </p>

                </div>

            </div>


            <div className="dashboard-overview-grid">

                <section className="dashboard-overview-card">

                    <div className="dashboard-section-header">

                        <div>

                            <h2>

                                Latest Booths

                            </h2>

                            <p>

                                Recently created information
                                booths.

                            </p>

                        </div>

                        <button
                            type="button"
                            className="dashboard-text-action"
                            onClick={() =>
                                navigate("/management/booths")
                            }
                        >

                            View all

                        </button>

                    </div>


                    <div className="dashboard-overview-list">

                        {

                            data.latest_booths.length > 0

                            ?

                            data.latest_booths.map(

                                booth => (

                                    <button
                                        type="button"
                                        className="dashboard-list-item"
                                        key={booth.id}
                                        onClick={() =>
                                            navigate(
                                                `/management/booths/${booth.id}/contents`
                                            )
                                        }
                                    >

                                        <span>

                                            {booth.title}

                                        </span>

                                        <span className="dashboard-list-arrow">

                                            →

                                        </span>

                                    </button>

                                )

                            )

                            :

                            <div className="dashboard-list-empty">

                                No booths available.

                            </div>

                        }

                    </div>

                </section>


                <section className="dashboard-overview-card">

                    <div className="dashboard-section-header">

                        <div>

                            <h2>

                                Important Announcements

                            </h2>

                            <p>

                                Published announcements marked
                                as important.

                            </p>

                        </div>

                        <button
                            type="button"
                            className="dashboard-text-action"
                            onClick={() =>
                                navigate(
                                    "/management/announcements"
                                )
                            }
                        >

                            View all

                        </button>

                    </div>


                    <div className="dashboard-overview-list">

                        {

                            data
                                .important_announcements
                                .length > 0

                            ?

                            data
                                .important_announcements
                                .map(

                                    announcement => (

                                        <button
                                            type="button"
                                            className="dashboard-list-item"
                                            key={announcement.id}
                                            onClick={() =>
                                                navigate(
                                                    "/management/announcements"
                                                )
                                            }
                                        >

                                            <div className="dashboard-announcement-info">

                                                <span>

                                                    {announcement.title}

                                                </span>

                                                <small>

                                                    {
                                                        announcement.category
                                                    }

                                                </small>

                                            </div>

                                            <span className="dashboard-list-arrow">

                                                →

                                            </span>

                                        </button>

                                    )

                                )

                            :

                            <div className="dashboard-list-empty">

                                No important announcements.

                            </div>

                        }

                    </div>

                </section>

            </div>

        </div>

    );

}

export default Dashboard;