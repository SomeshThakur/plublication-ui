import { useFetchWithAuth } from "../utils/fetchWithAuth";

export function usePublicationTypesService() {
    const fetchWithAuth = useFetchWithAuth();
    const apiUrl = import.meta.env.VITE_SERVER_URL;

    async function getPublicationTypes() {
        const response = await fetchWithAuth(`${apiUrl}/publication-types`);
        const data = await response.json();
        return data;
    }

    return {
        getPublicationTypes,
    };
}
