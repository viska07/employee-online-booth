import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";

import { useLanguage } from "../language/LanguageContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const {
    language,
    currentLanguage,
    changeLanguage,
  } = useLanguage();

  const {
    user,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

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
        FILTRONA DIGITAL EXHIBITION
      </Link>

      <div className="navbar-right">

        <div className="nav-links">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "active-nav" : ""
            }
          >
            {language.navbar.home}
          </NavLink>

          <NavLink
            to="/exhibitions"
            className={({ isActive }) =>
              isActive ? "active-nav" : ""
            }
          >
            {language.navbar.exhibitions}
          </NavLink>

          <NavLink
            to="/announcements"
            className={({ isActive }) =>
              isActive ? "active-nav" : ""
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
            onClick={() => changeLanguage("id")}
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
            onClick={() => changeLanguage("en")}
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

              {user?.username}

            </span>

          </div>

          {

            showMenu && (

              <div className="user-dropdown">

                <div className="dropdown-header">

                  <strong>

                    {user?.username}

                  </strong>

                  <small>

                    {user?.email}

                  </small>

                </div>

                <Link
                    to="/my-activity"
                    className="dropdown-link"
                >
                    📊 {language.navbar.myActivity}
                </Link>

                <button
                  className="logout-item"
                  onClick={handleLogout}
                >

                  <FaSignOutAlt />

                  {language.navbar.logout}

                </button>

              </div>

            )

          }

        </div>

      </div>

    </nav>

  );

}

export default Navbar;