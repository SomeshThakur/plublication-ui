import { useTabContext } from "@mui/base";
import { Navigate, useLocation } from "react-router-dom";

import useAuth from "./useAuth";

export function RequireAuth({ children }: { children: any }) {
    const { userAuth } = useAuth();

    const location = useLocation();

    return userAuth?.authed?.length ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
}