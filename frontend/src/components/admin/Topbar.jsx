import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Topbar() {

    const { user } = useAuth();
    const location = useLocation();

    function getPageTitle() {

        const pathname = location.pathname;

        if (
            /^\/management\/booths\/\d+\/contents$/.test(pathname)
        ) {

            return "Content Management";

        }

        if (pathname === "/management/booths") {

            return "Booths";

        }

        if (pathname === "/management/announcements") {

            return "Announcements";

        }

        if (pathname === "/management/employees") {

            return "Employees";

        }

        if (pathname === "/management/reports") {

            return "Reports";

        }

        if (pathname === "/management/settings") {

            return "Settings";

        }

        return "Dashboard";

    }

    const displayName = (

        user?.first_name
        || user?.username
        || "Administrator"

    );

    return (

        <header className="admin-topbar">

            <div className="admin-topbar-title">

                <h2>
                    {getPageTitle()}
                </h2>

            </div>

            <div className="admin-user">

                <strong>
                    {displayName}
                </strong>

            </div>

        </header>

    );

}

export default Topbar;