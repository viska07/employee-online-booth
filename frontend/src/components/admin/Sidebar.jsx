import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
    FaChartPie,
    FaDesktop,
    FaBullhorn,
    FaUsers,
    FaChartBar,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {

    const navigate = useNavigate();

    const { logout } = useAuth();

    function handleLogout() {

        logout();

        navigate("/login");

    }

    return (

        <aside className="admin-sidebar">

            <div>
                <div className="sidebar-header"></div>
                <h2>
                    FILTRONA
                </h2>

                <p>
                    MANAGEMENT
                </p>

                <NavLink
                    to="/management"
                    end
                >

                    <FaChartPie />

                    <span>Dashboard</span>

                </NavLink>

                <NavLink
                    to="/management/booths"
                >

                    <FaDesktop />

                    <span>Booths</span>

                </NavLink>

                <NavLink
                    to="/management/announcements"
                >

                    <FaBullhorn />

                    <span>Announcements</span>

                </NavLink>

                <NavLink
                    to="/management/employees"
                >

                    <FaUsers />

                    <span>Employees</span>

                </NavLink>

                <NavLink
                    to="/management/reports"
                >

                    <FaChartBar />

                    <span>Reports</span>

                </NavLink>

                <NavLink
                    to="/management/settings"
                >

                    <FaCog />

                    <span>Settings</span>

                </NavLink>

            </div>

            <div className="sidebar-bottom">

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt />

                    <span>Logout</span>

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;