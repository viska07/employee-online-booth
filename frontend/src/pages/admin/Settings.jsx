import "../../styles/admin.css";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Settings() {

    const [settings, setSettings] = useState({
        company_name: "",
        company_description: "",
        company_logo: null,
        default_audience: "EMPLOYEE",
        booth_per_page: 10,
        announcement_per_page: 10,
        featured_limit: 5,
    });

    const [logoPreview, setLogoPreview] = useState(null);

    const [showFeaturedBooth, setShowFeaturedBooth] = useState(true);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    useEffect(() => {

        fetchSettings();

    }, []);


    const fetchSettings = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                "/accounts/settings/"
            );

            setSettings(response.data);

            setShowFeaturedBooth(
                response.data.show_featured_booth
            );

            if (response.data.company_logo) {

                setLogoPreview(
                    `http://127.0.0.1:8000${response.data.company_logo}`
                );

            }

        } catch (error) {

            console.error(
                "Failed to fetch settings:",
                error
            );

            setError(
                "Failed to load system settings."
            );

        } finally {

            setLoading(false);

        }

    };


    const handleChange = (event) => {

        const { name, value } = event.target;

        setSettings((previous) => ({

            ...previous,

            [name]: value,

        }));

    };


    const handleNumberChange = (event) => {

        const { name, value } = event.target;

        setSettings((previous) => ({

            ...previous,

            [name]: Number(value),

        }));

    };


    const handleLogoChange = (event) => {

        const file = event.target.files[0];

        if (!file) {

            return;

        }

        setSettings((previous) => ({

            ...previous,

            company_logo: file,

        }));

        setLogoPreview(
            URL.createObjectURL(file)
        );

    };


    const handleSave = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);

            setMessage("");

            setError("");

            const formData = new FormData();

            formData.append(
                "company_name",
                settings.company_name
            );

            formData.append(
                "company_description",
                settings.company_description || ""
            );

            formData.append(
                "default_audience",
                settings.default_audience
            );

            formData.append(
                "booth_per_page",
                settings.booth_per_page
            );

            formData.append(
                "announcement_per_page",
                settings.announcement_per_page
            );

            formData.append(
                "featured_limit",
                settings.featured_limit
            );

            formData.append(
                "show_featured_booth",
                showFeaturedBooth
            );

            if (
                settings.company_logo instanceof File
            ) {

                formData.append(
                    "company_logo",
                    settings.company_logo
                );

            }

            const response = await api.put(
                "/accounts/settings/",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            setSettings(response.data);

            if (response.data.company_logo) {

                setLogoPreview(
                    `http://127.0.0.1:8000${response.data.company_logo}`
                );

            }

            setMessage(
                "Settings saved successfully."
            );

        } catch (error) {

            console.error(
                "Failed to save settings:",
                error
            );

            console.error(
                "Server response:",
                error.response?.data
            );

            setError(
                "Failed to save settings."
            );

        } finally {

            setSaving(false);

        }

    };


    if (loading) {

        return (

            <div className="admin-page">

                <div className="page-header">

                    <h1>
                        Settings
                    </h1>

                    <p>
                        Loading system settings...
                    </p>

                </div>

            </div>

        );

    }


    return (

        <div className="admin-page">

            <div className="page-header">

                <h1>
                    Settings
                </h1>

                <p>
                    Configure company information and system settings.
                </p>

            </div>


            {message && (

                <div className="settings-success">

                    {message}

                </div>

            )}


            {error && (

                <div className="settings-error">

                    {error}

                </div>

            )}


            <form
                onSubmit={handleSave}
            >

                <div className="settings-grid">


                    {/* =========================
                        COMPANY INFORMATION
                    ========================== */}

                    <div className="settings-card">

                        <h2>
                            Company Information
                        </h2>

                        <div className="settings-form">

                            <label>
                                Company Name
                            </label>

                            <input
                                type="text"
                                name="company_name"
                                value={
                                    settings.company_name
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Company name"
                            />


                            <label>
                                Company Description
                            </label>

                            <textarea
                                name="company_description"
                                rows="4"
                                value={
                                    settings.company_description || ""
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Company description"
                            ></textarea>


                            <label>
                                Company Logo
                            </label>

                            {logoPreview && (

                                <div className="settings-logo-preview">

                                    <img
                                        src={logoPreview}
                                        alt="Company Logo"
                                    />

                                </div>

                            )}


                            <input
                                type="file"
                                accept="image/*"
                                onChange={
                                    handleLogoChange
                                }
                            />

                        </div>

                    </div>


                    {/* =========================
                        BOOTH SETTINGS
                    ========================== */}

                    <div className="settings-card">

                        <h2>
                            Booth Settings
                        </h2>

                        <div className="settings-switch">

                            <label>
                                Show Featured Booth
                            </label>

                            <input
                                type="checkbox"
                                checked={showFeaturedBooth}
                                onChange={(event) =>
                                    setShowFeaturedBooth(
                                        event.target.checked
                                    )
                                }
                            />

                        </div>

                        <div className="settings-switch">

                            <label>
                                Allow Guest Access
                            </label>

                            <input
                                type="checkbox"
                                checked={
                                    settings.default_audience === "PUBLIC"
                                }
                                onChange={(event) => {

                                    setSettings(
                                        (previous) => ({

                                            ...previous,

                                            default_audience:
                                                event.target.checked
                                                    ? "PUBLIC"
                                                    : "EMPLOYEE",

                                        })
                                    );

                                }}
                            />

                        </div>


                        <div className="settings-form">

                            <label>
                                Booths Per Page
                            </label>

                            <input
                                type="number"
                                name="booth_per_page"
                                min="1"
                                value={
                                    settings.booth_per_page
                                }
                                onChange={
                                    handleNumberChange
                                }
                            />

                        </div>

                    </div>


                    {/* =========================
                        ANNOUNCEMENT SETTINGS
                    ========================== */}

                    <div className="settings-card">

                        <h2>
                            Announcement Settings
                        </h2>

                        <div className="settings-form">

                            <label>
                                Default Audience
                            </label>

                            <select
                                name="default_audience"
                                value={
                                    settings.default_audience
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option value="EMPLOYEE">
                                    All Employees
                                </option>

                                <option value="PUBLIC">
                                    Public
                                </option>

                            </select>


                            <label>
                                Announcements Per Page
                            </label>

                            <input
                                type="number"
                                name="announcement_per_page"
                                min="1"
                                value={
                                    settings.announcement_per_page
                                }
                                onChange={
                                    handleNumberChange
                                }
                            />

                        </div>

                    </div>


                    {/* =========================
                        SYSTEM INFORMATION
                    ========================== */}

                    <div className="settings-card">

                        <h2>
                            System Information
                        </h2>

                        <div className="system-info">

                            <p>

                                <strong>
                                    Version
                                </strong>

                                <span>
                                    v1.0.0
                                </span>

                            </p>


                            <p>

                                <strong>
                                    Backend
                                </strong>

                                <span>
                                    Django 6
                                </span>

                            </p>


                            <p>

                                <strong>
                                    Frontend
                                </strong>

                                <span>
                                    React + Vite
                                </span>

                            </p>


                            <p>

                                <strong>
                                    Database
                                </strong>

                                <span>
                                    MySQL
                                </span>

                            </p>

                        </div>

                    </div>

                </div>


                {/* =========================
                    SAVE BUTTON
                ========================== */}

                <div className="settings-actions">

                    <button
                        type="submit"
                        className="primary-button"
                        disabled={saving}
                    >

                        {saving
                            ? "Saving..."
                            : "Save Changes"
                        }

                    </button>

                </div>

            </form>

        </div>

    );

}

export default Settings;