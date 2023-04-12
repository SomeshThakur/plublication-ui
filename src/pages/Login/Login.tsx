import { Button, Grid, TextField, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../utils/useAuth";

export const Login: FunctionComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = await login(username, password);

        if (!(data.token)) {
            setError(data.message || 'Incorrect username or password');
            return;
        }
        navigate("/dashboard");
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            width: '100vw'
        }}>
            <Typography variant="h3">Transaction Management System for a publisher</Typography>

            <form style={{ padding: '50px' }} onSubmit={handleSubmit}>
                <Grid style={{ display: 'flex', gap: '10px' }} container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Grid>
                    {(error.length > 0) && (
                        <Grid item xs={12}>
                            <div style={{ color: "red" }}>{error}</div>
                        </Grid>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Login
                    </Button>

                </Grid>
            </form>
        </div >
    );
};

export default Login;
