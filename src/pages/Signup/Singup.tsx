import { Grid, TextField, FormControlLabel, Radio, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";


export const SignUp: FunctionComponent = (): JSX.Element => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);
    const [sex, setSex] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Validate the form
        if (!firstName || !lastName || !age || !sex || !role) {
            setError("All fields are required");
            return;
        }
    }
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
            <Typography variant="h6">Sign up</Typography>

            <form style={{ padding: '50px' }} onSubmit={handleSubmit}>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            fullWidth
                            autoComplete="fname"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            autoComplete="lname"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="age"
                            name="age"
                            label="Age"
                            type="number"
                            fullWidth
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}></Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='subtitle1'>Sex:</Typography>
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={sex === "male"}
                                    onChange={(e) => setSex(e.target.value)}
                                    value="male"
                                    name="sex"
                                    color="primary"
                                />
                            }
                            label="Male"
                        />
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={sex === "female"}
                                    onChange={(e) => setSex(e.target.value)}
                                    value="female"
                                    name="sex"
                                    color="primary"
                                />
                            }
                            label="Female"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subtitle1'>Role:</Typography>
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={role === "author"}
                                    onChange={(e) => setRole(e.target.value)}
                                    value="author"
                                    name="role"
                                    color="primary"
                                />
                            }
                            label="Author"
                        />
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={role === "author"}
                                    onChange={(e) => setRole(e.target.value)}
                                    value="author"
                                    name="role"
                                    color="primary"
                                />
                            }
                            label="Author"
                        />
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={role === "author"}
                                    onChange={(e) => setRole(e.target.value)}
                                    value="author"
                                    name="role"
                                    color="primary"
                                />
                            }
                            label="Author"
                        />
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={role === "author"}
                                    onChange={(e) => setRole(e.target.value)}
                                    value="author"
                                    name="role"
                                    color="primary"
                                />
                            }
                            label="Author"
                        />
                    </Grid>
                </Grid>
                {error && (
                    <Grid item xs={12}>
                        <div style={{ color: "red" }}>{error}</div>
                    </Grid>
                )}
                <Grid item style={{ display: 'flex', flexDirection: 'column', margin: '25px', gap: '10px' }}>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Singup
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/login')}
                    >
                        Go to Login
                    </Button>
                </Grid>
            </form>
        </div >);
}