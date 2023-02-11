import * as React from "react";

const authContext = React.createContext<Auth>({} as Auth);

type Auth = {
    authed: boolean;
    login(): Promise<void>;
    logout(): Promise<void>;
}

function useAuth() {
    const [authed, setAuthed] = React.useState(false);

    return {
        authed,
        login() {
            return new Promise<void>((res) => {
                setAuthed(true);
                res();
            });
        },
        logout() {
            return new Promise<void>((res) => {
                setAuthed(false);
                res();
            });
        }
    };
}

export const AuthProvider = ({ children }: { children: any }): JSX.Element => {
    const auth = useAuth();

    return <authContext.Provider value={auth}> {children} </authContext.Provider>;
}

export default function AuthConsumer() {
    return React.useContext(authContext);
}
