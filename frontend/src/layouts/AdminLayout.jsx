import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

import "../styles/admin.css";

function AdminLayout() {

    return (

        <div className="admin-layout">

            <Sidebar />

            <div className="admin-main">

                <Topbar />

                <main className="admin-content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default AdminLayout;