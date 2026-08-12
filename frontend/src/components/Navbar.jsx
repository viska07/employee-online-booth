import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";

import { useLanguage } from "../language/LanguageContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Navbar() {

    const {
        language,
        currentLanguage,
        changeLanguage,
    } = useLanguage();

    const {
        user,
        isGuest,
        logout,
    } = useAuth();

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);

    const [companyName, setCompanyName] = useState(
        "FILTRONA DIGITAL EXHIBITION"
    );

    const [companyLogo, setCompanyLogo] = useState(null);


    useEffect(() => {

        const fetchCompanyInformation = async () => {

            try {

                const response = await api.get(
                    "/accounts/settings/"
                );

                if (response.data.company_name) {

                    setCompanyName(
                        response.data.company_name
                    );

                }

                if (response.data.company_logo) {

                    setCompanyLogo(
                        `http://127.0.0.1:8000${response.data.company_logo}`
                    );

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


    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    return (

        <nav className="navbar">

            <Link
                to="/"
                className="logo"
            >

                {companyLogo && (

                    <img
                        src={companyLogo}
                        alt={companyName}
                        className="navbar-company-logo"
                    />

                )}

                <span>
                    {companyName}
                </span>

            </Link>


            <div className="navbar-right">

                <div className="nav-links">

                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "active-nav"
                                : ""
                        }
                    >

                        {language.navbar.home}

                    </NavLink>


                    <NavLink
                        to="/exhibitions"
                        className={({ isActive }) =>
                            isActive
                                ? "active-nav"
                                : ""
                        }
                    >

                        {language.navbar.exhibitions}

                    </NavLink>


                    <NavLink
                        to="/announcements"
                        className={({ isActive }) =>
                            isActive
                                ? "active-nav"
                                : ""
                        }
                    >

                        {language.navbar.announcements}

                    </NavLink>

                </div>


                <div className="language-switch">

                    <span className="language-label">
                        🌐
                    </span>


                    <button
                        className={
                            currentLanguage === "id"
                                ? "active-language"
                                : ""
                        }
                        onClick={() =>
                            changeLanguage("id")
                        }
                    >

                        ID

                    </button>


                    <span className="divider">
                        |
                    </span>


                    <button
                        className={
                            currentLanguage === "en"
                                ? "active-language"
                                : ""
                        }
                        onClick={() =>
                            changeLanguage("en")
                        }
                    >

                        EN

                    </button>

                </div>


                <div
                    className="user-menu"
                    onClick={() =>
                        setShowMenu(!showMenu)
                    }
                >

                    <div className="user-info">

                        <FaRegUserCircle
                            className="user-icon"
                        />

                        <span>

                            {isGuest
                                ? "Guest"
                                : user?.username}

                        </span>

                    </div>


                    {showMenu && (

                        <div
                            className="user-dropdown"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            <div className="dropdown-header">

                                <strong>

                                    {isGuest
                                        ? "Guest User"
                                        : user?.username}

                                </strong>


                                <small>

                                    {isGuest
                                        ? "Public Access"
                                        : user?.email}

                                </small>

                            </div>


                            {!isGuest && (

                                <Link
                                    to="/my-activity"
                                    className="dropdown-link"
                                >

                                    📊{" "}
                                    {
                                        language.navbar.myActivity
                                    }

                                </Link>

                            )}


                            <button
                                className="logout-item"
                                onClick={handleLogout}
                            >

                                <FaSignOutAlt />

                                {isGuest
                                    ? "Exit Guest"
                                    : language.navbar.logout}

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </nav>

    );

}

export default Navbar;