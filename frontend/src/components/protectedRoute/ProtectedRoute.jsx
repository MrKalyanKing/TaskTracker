import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../Context/Context";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AppContext);

    if (loading) {
        return <div className="text-center mt-10">Checking for Authentication</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;