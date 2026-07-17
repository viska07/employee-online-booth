import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BoothDetail from "./pages/BoothDetail";
import Exhibitions from "./pages/Exhibitions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyActivity from "./pages/MyActivity";
import Announcements from "./pages/Announcements";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import Forbidden from "./pages/Forbidden";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Booths from "./pages/admin/Booths";
import BoothContents from "./pages/admin/BoothContents";
import AnnouncementsAdmin from "./pages/admin/Announcements";
import Employees from "./pages/admin/Employees";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import { ToastContainer } from "react-toastify";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ===========================
                    PUBLIC ROUTES
                =========================== */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/403"
                    element={<Forbidden />}
                />

                {/* ===========================
                    EMPLOYEE ROUTES
                =========================== */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/exhibitions"
                    element={
                        <ProtectedRoute>
                            <Exhibitions />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/booth/:id"
                    element={
                        <ProtectedRoute>
                            <BoothDetail />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/announcements"
                    element={
                        <ProtectedRoute>
                            <Announcements />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/announcement/:id"
                    element={
                        <ProtectedRoute>
                            <AnnouncementDetail />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-activity"
                    element={
                        <ProtectedRoute>
                            <MyActivity />
                        </ProtectedRoute>
                    }
                />

                {/* ===========================
                    ADMIN ROUTES
                =========================== */}

                <Route
                    path="/management"
                    element={
                        <AdminRoute>
                            <AdminLayout />
                        </AdminRoute>
                    }
                >

                    <Route
                        index
                        element={<Dashboard />}
                    />

                    <Route
                        path="booths"
                        element={<Booths />}
                    />

                    <Route
                        path="booths/:boothId/contents"
                        element={<BoothContents />}
                    />

                    <Route
                        path="announcements"
                        element={<AnnouncementsAdmin />}
                    />

                    <Route
                        path="employees"
                        element={<Employees />}
                    />

                    <Route
                        path="reports"
                        element={<Reports />}
                    />

                    <Route
                        path="settings"
                        element={<Settings />}
                    />

                </Route>

            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="light"
            />

        </BrowserRouter>

    );

}

export default App;