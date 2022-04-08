import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';


const PrivateRoute = ({
    children,
    ...rest
}: {
        children: JSX.Element;
}) => {
    let location = useLocation();

    const { isAuthenticated, loading } = useSelector((state: any) => state.AuthenticationService.isAuthenticated);
    
    if (loading) {
        return <div>Authentification en cours...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

export default PrivateRoute;