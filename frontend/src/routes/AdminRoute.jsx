import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {

    const { user, loading } = useAuth();

    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (!user) {

        return <Navigate to="/login" replace />;

    }

    if (!user.is_staff) {

        return <Navigate to="/403" replace />;

    }

    return children;

}

export default AdminRoute;