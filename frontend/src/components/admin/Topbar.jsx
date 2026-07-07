import { useAuth } from "../../context/AuthContext";

function Topbar() {

    const { user } = useAuth();

    return (

        <header className="admin-topbar">

            <div>

                <h2>
                    Dashboard
                </h2>

            </div>

            <div className="admin-user">

                <strong>

                    {user?.first_name || user?.username}

                </strong>

            </div>

        </header>

    );

}

export default Topbar;