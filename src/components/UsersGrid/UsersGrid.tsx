import { Avatar, Box, Checkbox, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Icon from '@mui/material/Icon';
import { userRoles } from "../../types/users";

export const UsersGrid: FunctionComponent = (): JSX.Element => {

    return <Grid >
        <Typography variant="h4">Users</Typography>
        <TableContainer sx={{ minWidth: 800 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Role
                        </TableCell>
                        <TableCell align="center">
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        new Array(100).fill(0).map((_i, i) => (
                            <TableRow hover tabIndex={-1} role="checkbox" >

                                <TableCell component="th" scope="row" padding="none">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Avatar />
                                        <Typography variant="subtitle2" noWrap>
                                            {i} First Name
                                        </Typography>
                                    </Stack>
                                </TableCell>

                                <TableCell align="left">{userRoles[Math.floor(Math.random() * userRoles.length)]}</TableCell>

                                <TableCell align="center">
                                    <Box
                                        sx={{
                                            '& > :not(style)': {
                                                m: 2,
                                            },
                                        }}
                                    >
                                        <Icon >edit</Icon>
                                        <Icon >delete</Icon>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Grid >
}