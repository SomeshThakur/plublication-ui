import { NewUserDetails, UserDetails } from "../types/users";
import { useFetchWithAuth } from "../utils/fetchWithAuth";

const apiUrl = import.meta.env.VITE_SERVER_URL;

export const useUserService = () => {
    const fetchWithAuth = useFetchWithAuth();

    const getUsers = async () => {
        const response = await fetchWithAuth(`/${apiUrl}/users`);
        const data = await response.json();
        return data;
    };

    const getUserById = async (id: string) => {
        const response = await fetchWithAuth(`/${apiUrl}/users/${id}`);
        const data = await response.json();
        return { data, status: response.status };

    };

    const createUser = async (user: NewUserDetails) => {
        const response = await fetchWithAuth(`/${apiUrl}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return { data, status: response.status };
    };

    const updateUser = async (id: number, user: object) => {
        const response = await fetchWithAuth(`/${apiUrl}/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return data;
    };


    return {
        getUsers,
        getUserById,
        createUser,
        updateUser,
    };
};
