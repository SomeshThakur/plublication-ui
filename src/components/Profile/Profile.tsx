import { Container, FormControl, Table, TableBody, TableCell, TableRow, TextField, Typography, Avatar } from "@mui/material";
import { FunctionComponent } from "react";

export const Profile: FunctionComponent = (): JSX.Element => {
    return <Container>
        <Typography variant="h4" gutterBottom>
            My Profile
        </Typography>
        <Table >
            <TableBody >
                <TableRow>
                    <TableCell >
                        <Avatar />
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell padding="normal">
                        <TextField label="FirstName" value={"First Name"} variant="outlined" />
                    </TableCell>
                    <TableCell padding="normal">
                        <TextField label="LastName" value={"Last Name"} variant="outlined" />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <TextField label="Age" value={"26"} type="number" variant="outlined" />
                    </TableCell>
                    <TableCell>
                        <FormControl >
                            <TextField label="Sex" value={"Male"} variant="outlined" />
                        </FormControl>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Container>
}