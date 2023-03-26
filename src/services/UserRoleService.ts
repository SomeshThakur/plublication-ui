import { UserRole } from "../types/users";
import { useFetchWithAuth } from "../utils/fetchWithAuth";

export const useUserRolesService = () => {
    const fetchWithAuth = useFetchWithAuth();
    const apiUrl = import.meta.env.VITE_SERVER_URL;

    const getUserRoles = async (): Promise<UserRole[]> => {
        const response = await fetchWithAuth(`${apiUrl}/user-roles`);
        const data = await response.json();
        return data;
    };

    return { getUserRoles };
};
