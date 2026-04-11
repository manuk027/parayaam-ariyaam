import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";

type ProtectedRouteProps = {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />
    return <>{children}</>;
}

export default ProtectedRoute;