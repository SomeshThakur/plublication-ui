import { NewPublication, Publication } from "../types/publication";
import { useFetchWithAuth } from "../utils/fetchWithAuth";


export const usePublicationsService = () => {
    const fetchWithAuth = useFetchWithAuth();
    const apiUrl = import.meta.env.VITE_SERVER_URL;

    const getPublications = async (): Promise<Publication[]> => {
        const response = await fetchWithAuth(`${apiUrl}/publications`);
        const data = await response.json();
        return data;
    };

    const getPublicationById = async (id: string) => {
        const response = await fetchWithAuth(`${apiUrl}/publications/${id}`);
        const data = await response.json();
        return { data, status: response.status };

    };

    const createPublication = async (publication: NewPublication) => {
        const response = await fetchWithAuth(`${apiUrl}/publications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(publication),
        });
        const data = await response.json();
        return { data, status: response.status };
    };

    const updatePublication = async (id: number, publication: NewPublication): Promise<Publication> => {
        const response = await fetchWithAuth(`${apiUrl}/publications/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(publication),
        });
        const data = await response.json();
        return data;
    };

    return {
        getPublications,
        getPublicationById,
        createPublication,
        updatePublication,
    };
};
