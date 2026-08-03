import "../../styles/admin.css";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { resetDemoData } from "../../services/reportService";

function Reports() {

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [resetOptions, setResetOptions] = useState({

        reset_booth_views: true,

        reset_booth_activity: true,

        reset_announcement_readers: true,

    });

    const [resetLoading, setResetLoading] = useState(false);

    useEffect(() => {
        fetchReport();
    }, []);

    const handleResetDemo = async () => {

        const confirmReset = window.confirm(

            "Reset selected demo data?"

        );

        if (!confirmReset) {

            return;

        }

        try {

            setResetLoading(true);

            await resetDemoData(
                resetOptions
            );

            alert(
                "Demo data berhasil direset."
            );

            fetchReport();

        } catch (error) {

            console.error(error);

            alert(
                "Gagal reset demo data."
            );

        } finally {

            setResetLoading(false);

        }

    };

    const fetchReport = async () => {

        try {

            setLoading(true);

            const response = await axios.get(

                "http://127.0.0.1:8000/api/booths/reports/",

                {

                    params: {

                        from: fromDate || undefined,

                        to: toDate || undefined,

                    }

                }

            );

            setReport(response.data);

        } catch (error) {

            console.error(

                "Failed to fetch report:",

                error

            );

        } finally {

            setLoading(false);

        }

    };

    const exportExcel = () => {

        if (!report) {

            return;

        }

        const workbook = XLSX.utils.book_new();

        // ==========================
        // Sheet 1 - Booth Performance
        // ==========================

        const boothSheet = report.top_booths.map(

            (booth, index) => ({

                No: index + 1,

                Booth: booth.title,

                Views: booth.views,

            })

        );

        const worksheet1 = XLSX.utils.json_to_sheet(
            boothSheet,
            {
                origin: "A4"
            }
        );

        worksheet1["A1"] = {
            t: "s",
            v: "Employee Online Booth"
        };

        worksheet1["A2"] = {
            t: "s",
            v: `Generated : ${new Date().toLocaleString("id-ID")}`
        };

        worksheet1["!cols"] = [

            { wch: 8 },

            { wch: 40 },

            { wch: 15 },

        ];

        XLSX.utils.book_append_sheet(

            workbook,

            worksheet1,

            "Booth Performance Report"

        );

        // ==========================
        // Sheet 2 - Recent Activity
        // ==========================

        const activitySheet = report.recent_activities.map(

            (activity, index) => ({

                No: index + 1,

                Employee: activity.user_name,

                NIK: activity.user_nik || "-",

                Booth: activity.booth_title,

                Action: activity.action,

                Date: new Date(
                    activity.created_at
                ).toLocaleString("id-ID"),

            })

        );

        const worksheet2 = XLSX.utils.json_to_sheet(
            activitySheet,
            {
                origin: "A4"
            }
        );

        worksheet2["A1"] = {
            t: "s",
            v: "Employee Online Booth"
        };

        worksheet2["A2"] = {
            t: "s",
            v: `Generated : ${new Date().toLocaleString("id-ID")}`
        };

        worksheet2["!cols"] = [

            { wch: 8 },

            { wch: 25 },

            { wch: 15 },

            { wch: 18 },

            { wch: 12 },

            { wch: 28 },

        ];

        XLSX.utils.book_append_sheet(

            workbook,

            worksheet2,

            "Employee Activity Report"

        );

        const excelBuffer = XLSX.write(

            workbook,

            {

                bookType: "xlsx",

                type: "array",

            }

        );

        const file = new Blob(

            [excelBuffer],

            {

                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",

            }

        );

        const today = new Date()
            .toISOString()
            .slice(0,10);

        saveAs(

            file,

            `Employee_Booth_Report_${today}.xlsx`

        );

    };

    const exportPDF = () => {

        if (!report) {

            return;

        }

        const doc = new jsPDF();

        doc.setFontSize(18);

        doc.text(

            "Employee Online Booth Report",

            14,

            20

        );

        doc.setFontSize(10);

        doc.text(

            `Generated : ${new Date().toLocaleString("id-ID")}`,

            14,

            28

        );

        // ============================
        // Booth Performance
        // ============================

        autoTable(doc, {

            startY: 38,

            head: [[

                "No",

                "Booth",

                "Views"

            ]],

            body: report.top_booths.map(

                (booth, index) => [

                    index + 1,

                    booth.title,

                    booth.views,

                ]

            ),

        });

        // ============================
        // Recent Activity
        // ============================

        autoTable(doc, {

            startY: doc.lastAutoTable.finalY + 15,

            head: [[

                "No",

                "Employee",

                "Booth",

                "Action",

                "Date"

            ]],

            body: report.recent_activities.map(

                (activity, index) => [

                    index + 1,

                    activity.user_name,

                    activity.booth_title,

                    activity.action,

                    new Date(

                        activity.created_at

                    ).toLocaleString("id-ID"),

                ]

            ),

        });

        const today = new Date()

            .toISOString()

            .slice(0,10);

        doc.save(

            `Employee_Booth_Report_${today}.pdf`

        );

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

                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e)=>
                                setFromDate(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div className="report-field">

                        <label>To</label>

                        <input
                            type="date"
                            value={toDate}
                            onChange={(e)=>
                                setToDate(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <button
                        className="primary-button"
                        onClick={fetchReport}
                    >
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

                    <h2>

                        Reset Demo Data

                    </h2>

                </div>

                <div className="report-reset-list">

                    <label>

                        <input
                            type="checkbox"
                            checked={resetOptions.reset_booth_views}
                            onChange={(e)=>

                                setResetOptions({

                                    ...resetOptions,

                                    reset_booth_views:e.target.checked,

                                })

                            }
                        />

                        Reset Booth Views

                    </label>

                    <label>

                        <input
                            type="checkbox"
                            checked={resetOptions.reset_booth_activity}
                            onChange={(e)=>

                                setResetOptions({

                                    ...resetOptions,

                                    reset_booth_activity:e.target.checked,

                                })

                            }
                        />

                        Reset Booth Activities

                    </label>

                    <label>

                        <input
                            type="checkbox"
                            checked={resetOptions.reset_announcement_readers}
                            onChange={(e)=>

                                setResetOptions({

                                    ...resetOptions,

                                    reset_announcement_readers:e.target.checked,

                                })

                            }
                        />

                        Reset Announcement Readers

                    </label>

                </div>

                <button

                    className="table-delete-button"

                    onClick={handleResetDemo}

                    disabled={resetLoading}

                >

                    {

                        resetLoading

                        ?

                        "Resetting..."

                        :

                        "Reset Demo Data"

                    }

                </button>

            </div>

            <div className="report-card">

                <div className="report-card-header">

                    <h2>Export Report</h2>

                </div>

                <div className="report-export-buttons">

                    <button

                        className="secondary-button"

                        onClick={exportExcel}

                    >

                        Export Excel

                    </button>

                    <button

                        className="primary-button"

                        onClick={exportPDF}

                    >

                        Export PDF

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Reports;