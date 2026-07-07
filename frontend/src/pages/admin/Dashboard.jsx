import { useEffect, useState } from "react";
import api from "../../services/api";

import "../../styles/admin.css";

function Dashboard() {

    const [data, setData] = useState(null);

    useEffect(() => {

        api.get("/dashboard/")
            .then((response) => {

                setData(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    }, []);

    if (!data) {

        return (

            <div className="admin-loading">

                Loading Dashboard...

            </div>

        );

    }

    return (

        <div className="dashboard-page">

            <div className="admin-page-header">

                <h1>Dashboard</h1>

                <p>
                    Welcome back, Administrator.
                </p>

            </div>

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="stat-card-top">

                        <div>

                            <div className="stat-title">
                                Total Booths
                            </div>

                            <div className="stat-value">
                                {data.total_booths}
                            </div>

                        </div>

                        <div className="stat-icon">
                            🏢
                        </div>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-card-top">

                        <div>

                            <div className="stat-title">
                                Announcements
                            </div>

                            <div className="stat-value">
                                {data.total_announcements}
                            </div>

                        </div>

                        <div className="stat-icon">
                            📢
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;