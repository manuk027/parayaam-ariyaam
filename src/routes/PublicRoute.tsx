import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { type ReactNode } from "react";

type PublicRouteProps = {
    children: ReactNode;
};

function PublicRoute({ children }: PublicRouteProps) {
    const { user } = useAuth();
    if (user) return <Navigate to="/blogs" replace />;
    return <>{children}</>;
}

export default PublicRoute;