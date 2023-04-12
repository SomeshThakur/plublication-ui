import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useUserRolesService } from "../../../services/UserRoleService";
import { useUserService } from "../../../services/UserService";
import { pages } from "../../../types/pages";
import { UserRole } from "../../../types/users";


export const CreateUserForm: FunctionComponent = (): JSX.Element => {
    const [userId, setUserId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { getUserRoles } = useUserRolesService();
    const [confirmPassword, setConfirmPassword] = useState("");
    const { createUser } = useUserService();

    const [userRoles, setUserRoles] = useState<UserRole[]>([]);

    const fetchUserRoles = async () => {
        try {
            const roles = await getUserRoles();
            setUserRoles(roles);
        } catch (err) {
            setError("Failed to fetch user roles.");
        }
    };

    useEffect(() => {
        fetchUserRoles();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!userId || !firstName || !password || !role) {
            setSuccess("");
            setError("All fields are required.");
            return;
        }

        if (userId.length < 10) {
            setSuccess("");
            setError("User Number should have 10 digits.");
            return;
        }
        if (password !== confirmPassword) {
            setSuccess("");
            setError("Passwords do not match.");
            return;
        }

        try {
            const { data, status } = await createUser({ first_name: firstName, last_name: lastName, password, role_id: role, mobile: userId, employee_code: userId });
            if (status === 201) {
                setError("");
                setSuccess(data.message);
                clearAll();
            } else {
                let errMsg = data.message.replace(/Mobile/g, 'UserID');
                if (Object.keys(data.errors)?.length) {
                    errMsg += ` | More info: ${Object.entries(data.errors).join(',').replace(/(Mobile|mobile)/g, 'user-id')}`;
                }
                setSuccess("");
                setError(errMsg);
            }
        } catch (err) {
            setSuccess("");
            setError("Failed to create user.");
        }
    };

    const clearAll = () => {
        setUserId("");
        setRole("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
    }

    return (
        <Grid>
            <Typography variant="h4" margin={2}>Create User</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ width: "95%" }}>
                <Grid >
                    {error && (
                        <Alert severity="error" sx={{ marginBottom: 2 }} onClose={() => setError("")}>
                            {error}
                        </Alert>
                    )}
                    {
                        success && (
                            <Alert severity="success" sx={{ marginBottom: 2 }} onClose={() => setSuccess("")}>
                                {success}
                            </Alert>
                        )
                    }
                </Grid>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <TextField
                            label="User Number"
                            type='number'

                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>

                        <TextField
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                label="Role"
                                value={role}
                                onChange={(e) => setRole(e.target.value as string)}
                            >
                                <MenuItem value="">
                                    <em>Select a role</em>
                                </MenuItem>
                                {userRoles.map((r) => (
                                    <MenuItem key={r.id} value={r.id}>
                                        {r.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} marginLeft={"25%"} whiteSpace='nowrap' width={'150px'} >
                        <Stack spacing={2} >
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Create
                            </Button>

                            <Link to={"/" + pages["All Users"]}>
                                <Button type="submit" variant="contained" color="secondary" fullWidth>
                                    Back
                                </Button>
                            </Link>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};
