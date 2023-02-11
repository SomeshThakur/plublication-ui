import { Avatar, Box, Checkbox, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Icon from '@mui/material/Icon';

export const PaymentsGrid: FunctionComponent = (): JSX.Element => {

    return <Grid >
        <Typography variant="h4">Payments</Typography>
        <TableContainer sx={{ minWidth: 800 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Payment
                        </TableCell>
                        <TableCell>
                            Date
                        </TableCell>
                        <TableCell>
                            Deposited
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        new Array(10).fill(0).map((_i, i) => (
                            <TableRow hover tabIndex={-1} role="checkbox" >


                                <TableCell component="th" scope="row" padding="none">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Typography variant="subtitle2" noWrap>
                                            {i} First Name
                                        </Typography>
                                    </Stack>
                                </TableCell>

                                <TableCell align="left">{Math.floor(Math.random() * 10 + 10)}$</TableCell>

                                <TableCell align="left">{new Date().toLocaleDateString()}</TableCell>

                                <TableCell align="left">yes</TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Grid >
}