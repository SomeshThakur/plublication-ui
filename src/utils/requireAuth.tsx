import { useLocation, Navigate } from "react-router-dom";
import useAuth from "./useAuth";

export function RequireAuth({ children }: { children: any }) {
    const { authed } = useAuth();
    const location = useLocation();

    return authed === true ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
}