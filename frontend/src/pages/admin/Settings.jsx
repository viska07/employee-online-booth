import "../../styles/admin.css";

function Settings() {

    return (

        <div className="admin-page">

            <div className="page-number">

                <h1>
                    Settings
                </h1>

                <p>
                    Configure company information and system settings.
                </p>

            </div>

            <div className="settings-grid">

                {/* Company Information*/}

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
                            placeholder="PT Filtrona Indonesia"
                        />

                        <label>
                            Company Description
                        </label>

                        <textarea
                            rows="4"
                            placeholder="Employee Online Booth"
                        ></textarea>

                        <label>
                            Company Logo 
                        </label>

                        <input
                            type="file"
                        />

                    </div>

                </div>

                {/* Booth */}

                <div className="settings-card">

                    <h2>
                        Booth Settings
                    </h2>

                    <div className="settings-switch">

                        <label>
                            Show Featured Booth
                        </label>

                        <input type="checkbox" />
                        
                    </div>

                    <div className="settings switch">

                        <label>
                            Allow Guest Access
                        </label>

                        <input type="checkbox" />

                    </div>

                </div>

                {/* Announcement */}

                <div className="settings-card">

                    <h2>
                        Announcement Settings
                    </h2>

                    <labe>
                        Default Audience
                    </labe>

                    <select>

                        <option>
                            All Employees
                        </option>

                    </select>

                </div>

                {/* Maintenance */}

                <div className="settings-card">

                    <h2>
                        Maintenance
                    </h2>

                    <button className="secondary-button">
                        Reset Demo Data
                    </button>

                    <button className="secondary-button">
                        Clear Cache
                    </button>

                </div>

                {/* System */}

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

        </div>

    );

}

export default Settings;