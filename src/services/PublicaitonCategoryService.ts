import { useFetchWithAuth } from "../utils/fetchWithAuth";

export function usePublicationCategoryService() {
    const fetchWithAuth = useFetchWithAuth();
    const apiUrl = import.meta.env.VITE_SERVER_URL;

    async function getPublicationCategories() {
        const response = await fetchWithAuth(`${apiUrl}/publication-categories`);
        const data = await response.json();
        return data;
    }

    return {
        getPublicationCategories,
    };
}
