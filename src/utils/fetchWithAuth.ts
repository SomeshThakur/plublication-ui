import { useContext } from "react";

import { authContext } from "./useAuth";

export const useFetchWithAuth = () => {
    const auth = useContext(authContext);

    const fetchWithAuth = async (
        input: RequestInfo,
        init?: RequestInit | undefined
    ): Promise<Response> => {
        const config: RequestInit = { ...init };

        if (auth.userAuth?.authed) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${auth.userAuth.authed}`,
            };
        }

        return fetch(input, config);
    };

    return fetchWithAuth;
};
