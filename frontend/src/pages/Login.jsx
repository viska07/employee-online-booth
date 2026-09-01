import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const {
        login,
        guestLogin,
    } = useAuth();

    const [identifier, setIdentifier] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    // =========================================
    // COMPANY INFORMATION
    // =========================================

    const [companyName, setCompanyName] = useState(
        "FILTRONA DIGITAL EXHIBITION"
    );

    const [companyDescription, setCompanyDescription] =
        useState(
            "Employee Learning & Information Portal"
        );

    const [companyLogo, setCompanyLogo] = useState(
        "/logo-filtrona.png"
    );


    useEffect(() => {

        const fetchCompanyInformation = async () => {

            try {

                const response = await api.get(
                    "/accounts/settings/"
                );

                const data = response.data;


                if (data.company_name) {

                    setCompanyName(
                        data.company_name
                    );

                }


                if (data.company_description) {

                    setCompanyDescription(
                        data.company_description
                    );

                }


                if (data.company_logo) {

                    if (
                        data.company_logo.startsWith(
                            "http"
                        )
                    ) {

                        setCompanyLogo(
                            data.company_logo
                        );

                    } else {

                        setCompanyLogo(
                            `http://127.0.0.1:8000${data.company_logo}`
                        );

                    }

                }

            } catch (error) {

                console.error(
                    "Failed to load company information:",
                    error
                );

            }

        };


        fetchCompanyInformation();

    }, []);


    // =========================================
    // LOGIN
    // =========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");


        try {

            const response = await api.post(
                "/accounts/login/",
                {
                    username: identifier,
                    password: password,
                }
            );


            const access = response.data.access;


            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${access}`;


            const profile = await api.get(
                "/accounts/profile/"
            );


            login(
                profile.data,
                access
            );


            if (profile.data.is_staff) {

                navigate("/management");

            } else {

                navigate("/");

            }

        } catch (error) {

            setError(
                error.response?.data?.detail ||
                "NIK/No. HP atau password salah."
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // GUEST LOGIN
    // =========================================

    const handleGuestLogin = () => {

        guestLogin();

        navigate("/");

    };


    return (

        <div className="login-page">

            <div className="login-container">


                {/* ================= LEFT ================= */}

                <div className="login-left">

                    <div className="login-brand">

                        {companyLogo && (

                            <img
                                src={companyLogo}
                                alt=""
                                className="login-logo"
                            />

                        )}

                        <h1>
                            {companyName}
                        </h1>

                        <p>
                            {companyDescription}
                        </p>

                    </div>


                    <div className="company-information">


                        <div className="company-card">

                            <div className="company-icon">
                                🏢
                            </div>

                            <div>

                                <h3>
                                    Corporate Information
                                </h3>

                                <p>
                                    Access exhibition booths,
                                    company news,
                                    learning materials,
                                    and important announcements.
                                </p>

                            </div>

                        </div>


                        <div className="company-card">

                            <div className="company-icon">
                                📚
                            </div>

                            <div>

                                <h3>
                                    Digital Learning
                                </h3>

                                <p>
                                    Learn anywhere through
                                    presentations,
                                    videos,
                                    documents,
                                    and articles.
                                </p>

                            </div>

                        </div>


                        <div className="company-card">

                            <div className="company-icon">
                                📢
                            </div>

                            <div>

                                <h3>
                                    Stay Updated
                                </h3>

                                <p>
                                    Receive the latest company
                                    announcements and exhibition updates.
                                </p>

                            </div>

                        </div>


                    </div>

                </div>


                {/* ================= RIGHT ================= */}

                <div className="login-right">

                    <div className="login-card">


                        <div className="login-header">

                            <h2>
                                Welcome Back
                            </h2>

                            <p>
                                Please sign in using your employee account.
                            </p>

                        </div>


                        <form onSubmit={handleSubmit}>


                            {/* ================= IDENTIFIER ================= */}

                            <div className="form-group">

                                <label>
                                    NIK / No. HP
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter NIK or No. HP"
                                    value={identifier}
                                    onChange={(e) =>
                                        setIdentifier(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* ================= PASSWORD ================= */}

                            <div className="form-group">

                                <label>
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* ================= ERROR ================= */}

                            {error && (

                                <div className="login-error">
                                    {error}
                                </div>

                            )}


                            {/* ================= LOGIN BUTTON ================= */}

                            <button
                                type="submit"
                                className="login-button"
                                disabled={loading}
                            >

                                {
                                    loading
                                        ? "Signing In..."
                                        : "Sign In"
                                }

                            </button>


                        </form>


                        <div className="login-footer">

                            <span>
                                Don't have an account?
                            </span>

                            <Link to="/register">
                                Create Account
                            </Link>


                            <div className="guest-divider">

                                <span>
                                    or
                                </span>

                            </div>


                            <button
                                type="button"
                                className="guest-button"
                                onClick={handleGuestLogin}
                            >
                                Continue as Guest
                            </button>

                        </div>


                    </div>

                </div>


            </div>

        </div>

    );

}

export default Login;