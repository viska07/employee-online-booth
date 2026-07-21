import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {

    const {
        user,
        isGuest,
        loading,
    } = useAuth();

    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (!user && !isGuest) {

        return <Navigate to="/login" replace />;

    }

    return children;

}

export default ProtectedRoute;