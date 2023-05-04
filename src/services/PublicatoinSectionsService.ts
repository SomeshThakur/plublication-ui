import { PublicationSection } from "../types/publication";
import { useFetchWithAuth } from "../utils/fetchWithAuth";

export function usePublicationSectionService() {
    const fetchWithAuth = useFetchWithAuth();
    const apiUrl = import.meta.env.VITE_SERVER_URL;

    async function getPublicationSectionTypes(category_id: string) {
        const response = await fetchWithAuth(`/${apiUrl}/publication-section-types?category_id=${category_id}`);
        const data = await response.json();
        return { data, status: response.status };

    }

    async function fetchPublicationSections(publicationId: string) {
        const response = await fetchWithAuth(`/${apiUrl}/publications/${publicationId}/publication-sections`);
        const data = await response.json();
        return { data, status: response.status };

    }

    async function createPublicationSection(publicationId: string, { title, content, sectionTypeId }: PublicationSection) {
        const body = {
            title,
            content,
            section_type_id: sectionTypeId,
        };
        const response = await fetchWithAuth(`/${apiUrl}/publications/${publicationId}/publication-sections`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return { data, status: response.status };

    }

    async function updatePublicationSection(publicationId: string, { title, content, sectionTypeId, id }: PublicationSection) {
        const body = {
            title,
            content,
            section_type_id: sectionTypeId,
        };
        const response = await fetchWithAuth(`/${apiUrl}/publications/${publicationId}/publication-sections/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return { data, status: response.status };

    }

    return {
        getPublicationSectionTypes,
        fetchPublicationSections,
        createPublicationSection,
        updatePublicationSection
    };
}
