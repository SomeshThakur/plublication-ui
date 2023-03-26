import { createContext, useContext, useState } from "react";

import { loginService } from "../services/AuthService";
import { UserDetails, UserRole } from "../types/users";

interface AuthContextData {
    userAuth: UserAuth | null;
    login(username: string, password: string): Promise<Token>;
    logout(): Promise<void>;
}

interface UserAuth {
    authed: string;
    role: UserRole;
    user: UserDetails
}

interface Token {
    message: string;
    token: string;
    errors: unknown;
}

export const authContext = createContext<AuthContextData>({} as AuthContextData);

function useAuth() {
    const [userAuth, setUserAuth] = useState<UserAuth | null>(null);

    return {
        userAuth,
        async login(username: string, password: string): Promise<Token> {
            const data = await loginService(username, password);
            if (data.token) {
                setUserAuth({
                    authed: data.token,
                    role: data.user.role,
                    user: data.user,
                });
            }
            return data;
        },
        logout() {
            return new Promise<void>((res) => {
                setUserAuth(null);
                res();
            });
        },
    };
}

export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default function AuthConsumer() {
    return useContext(authContext);
}
