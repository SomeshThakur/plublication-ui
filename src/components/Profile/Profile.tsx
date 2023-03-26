import { Container, Grid, TextField, Typography } from "@mui/material";
import { FunctionComponent } from "react";

import useAuth from "../../utils/useAuth";

export const Profile: FunctionComponent = (): JSX.Element => {
    const { userAuth } = useAuth();

    return <Container>
        <Typography variant="h4" gutterBottom>
            My Profile
        </Typography>

        <Grid container spacing={2} >
            <Grid item xs={12} sm={6}>
                <TextField
                    label="First Name"
                    InputProps={{
                        readOnly: true,
                    }}
                    value={userAuth?.user.firstName}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Last Name"
                    InputProps={{
                        readOnly: true,
                    }}
                    value={userAuth?.user.lastName}

                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="User ID"
                    type='number'
                    value={userAuth?.user?.mobile}
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Role"
                    InputProps={{
                        readOnly: true,
                    }}
                    value={userAuth?.user?.role?.name}
                    fullWidth
                />
            </Grid>


        </Grid>
    </Container>
}