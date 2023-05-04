export const loginService = async (user_name: string, password: string) => {
    const res = await fetch(import.meta.env.VITE_SERVER_URL + '/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_name,
            password
        })
    });
    const data = await res.json();

    return data;
}