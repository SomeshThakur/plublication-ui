import { Grid, TextField, Button, Typography } from "@mui/material";
import { useState, FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../utils/useAuth";

export const Login: FunctionComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();
    const { state } = useLocation();

    const handleLogin = () => {
        login().then(() => {
            navigate("/dashboard");
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //TODO: Handling login
        if (username === "admin" && password === "password") {
            handleLogin();
        } else {
            setError("Incorrect username or password");
        }
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
            <Typography variant="h3">Publication UI</Typography>
            <Typography variant="h6">Login</Typography>

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
                    {error && (
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

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </Button>
                </Grid>
            </form>
        </div >
    );
};

export default Login;
