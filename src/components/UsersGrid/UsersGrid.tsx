import { Avatar, Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useUserService } from "../../services/UserService";
import { pages } from "../../types/pages";
import { UserDetails } from "../../types/users";
import useAuth from "../../utils/useAuth";

export const UsersGrid: FunctionComponent = (): JSX.Element => {
    const { userAuth } = useAuth();
    const { getUsers } = useUserService();

    const [users, setUsers] = useState<UserDetails[]>();

    useEffect(() => {
        getUsers().then(users => {
            setUsers(users);
        });
    }, []);

    return <Grid >
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: '5%' }}>
            <Typography variant="h4">Users</Typography>
            {
                userAuth?.role?.name === 'Admin' &&
                <Link to={'/' + pages["Create User"]}><Button variant="contained" color='secondary' >Create User</Button> </Link>
            }
        </div>
        <TableContainer sx={{ minWidth: 800 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            ID
                        </TableCell>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Username
                        </TableCell>
                        <TableCell>
                            User Number
                        </TableCell>
                        <TableCell>
                            Password
                        </TableCell>
                        <TableCell>
                            Role
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users?.length &&
                        users.map((user) => (
                            <TableRow hover key={user.id} tabIndex={-1} role="checkbox" >
                                <TableCell align="left">{user.id}</TableCell>
                                <TableCell component="th" scope="row" padding="none">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Avatar />
                                        <Typography variant="subtitle2" noWrap>
                                            {user.firstName} {user.lastName}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell component="th" scope="row" padding="none">{user.userName}</TableCell>
                                <TableCell component="th" scope="row" padding="none">{user.password}</TableCell>
                                <TableCell component="th" scope="row" padding="none">{user.mobile}</TableCell>
                                <TableCell align="left">{user.role.name}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Grid >
}