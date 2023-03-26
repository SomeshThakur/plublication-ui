import { NewOrder, Order } from "../types/orders";
import { useFetchWithAuth } from "../utils/fetchWithAuth";


export const useOrdersService = () => {
    const fetchWithAuth = useFetchWithAuth();
    const apiUrl = import.meta.env.VITE_SERVER_URL;

    const getOrders = async () => {
        const response = await fetchWithAuth(`${apiUrl}/orders`);
        const data = await response.json() as Order[];
        return { data, status: response.status };

    };

    const getOrderById = async (id: number) => {
        const response = await fetchWithAuth(`${apiUrl}/orders/${id}`);
        const data = await response.json() as Order;
        return { data, status: response.status };

    };

    const createOrder = async (order: NewOrder) => {
        const response = await fetchWithAuth(`${apiUrl}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });
        const data = await response.json();
        return { data, status: response.status };
    };

    const updateOrder = async (id: number, order: NewOrder): Promise<Order> => {
        const response = await fetchWithAuth(`${apiUrl}/orders/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });
        const data = await response.json();
        return data;
    };

    return {
        getOrders,
        getOrderById,
        createOrder,
        updateOrder,
    };
};
