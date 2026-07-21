import { useState } from "react";
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

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await api.post(
                "/accounts/login/",
                {
                    username,
                    password,
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

        } catch {

            setError(
                "Username atau Password salah."
            );

        } finally {

            setLoading(false);

        }

    };

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

                        <img
                            src="/logo-filtrona.png"
                            alt="Filtrona"
                            className="login-logo"
                        />

                        <h1>

                            FILTRONA DIGITAL EXHIBITION

                        </h1>

                        <p>

                            Employee Learning & Information Portal

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

                            <div className="form-group">

                                <label>

                                    Username

                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

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
                                />

                            </div>

                            {

                                error && (

                                    <div className="login-error">

                                        {error}

                                    </div>

                                )

                            }

                            <button
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
                                <span>or</span>
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