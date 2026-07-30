import "../../styles/admin.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Reports() {

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/booths/reports/"
            );

            setReport(response.data);

        } catch (error) {

            console.error("Failed to fetch report:", error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="admin-page">

            <div className="page-header">

                <h1>Reports</h1>

                <p>
                    Analyze employee activity and export reports.
                </p>

            </div>

            <div className="report-filter-card">

                <div className="report-filter-group">

                    <div className="report-field">

                        <label>From</label>

                        <input type="date" />

                    </div>

                    <div className="report-field">

                        <label>To</label>

                        <input type="date" />

                    </div>

                    <button className="primary-button">

                        Apply Filter

                    </button>

                </div>

            </div>

            <div className="report-card">

                <div className="report-card-header">

                    <h2>Booth Performance</h2>

                </div>

                <table className="report-table">

                    <thead>

                        <tr>

                            <th>No</th>
                            <th>Booth</th>
                            <th>Total Views</th>

                        </tr>

                    </thead>

                    <tbody>

                    {loading ? (

                        <tr>

                            <td colSpan="3" className="report-empty">

                                Loading...

                            </td>

                        </tr>

                    ) : report?.top_booths?.length ? (

                        report.top_booths.map((booth, index) => (

                            <tr key={booth.id}>

                                <td>{index + 1}</td>

                                <td>{booth.title}</td>

                                <td>{booth.views}</td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="3" className="report-empty">

                                No booth data found.

                            </td>

                        </tr>

                    )}

                    </tbody>

                </table>

            </div>

            <div className="report-card">

                <div className="report-card-header">

                    <h2>Recent Activities</h2>

                </div>

                <table className="report-table">

                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Employee</th>
                            <th>Booth</th>
                            <th>Action</th>
                            <th>Last Activity</th>
                        </tr>
                    </thead>

                    <tbody>

                    {loading ? (

                        <tr>

                            <td colSpan="5" className="report-empty">

                                Loading...

                            </td>

                        </tr>

                    ) : report?.recent_activities?.length ? (

                        report.recent_activities.map((activity, index) => (

                            <tr key={activity.user_email}>

                                <td>{index + 1}</td>

                                <td>

                                    <strong>{activity.user_name}</strong>

                                    <br />

                                    <small>{activity.user_email}</small>

                                </td>

                                <td>{activity.booth_title}</td>

                                <td>{activity.action}</td>

                                <td>

                                    {new Date(activity.created_at).toLocaleString("id-ID")}

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="5" className="report-empty">

                                No recent activity found.

                            </td>

                        </tr>

                    )}

                    </tbody>

                </table>

            </div>

            <div className="report-card">

                <div className="report-card-header">

                    <h2>Export Report</h2>

                </div>

                <div className="report-export-buttons">

                    <button className="secondary-button">

                        Export Excel

                    </button>

                    <button className="primary-button">

                        Export PDF

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Reports;