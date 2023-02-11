import { Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Stack } from "@mui/material"
import { FunctionComponent } from "react"

export const OrdersGrid: FunctionComponent = (): JSX.Element => {
    return <Grid >
        <Typography variant="h4">Orders</Typography>
        <TableContainer sx={{ minWidth: 800 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Order Value
                        </TableCell>
                        <TableCell>
                            Date
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        new Array(10).fill(0).map((_i, i) => (
                            <TableRow hover tabIndex={-1} role="checkbox" >


                                <TableCell component="th" scope="row" padding="none">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Typography variant="body1" noWrap>
                                            {i} First Name
                                        </Typography>
                                    </Stack>
                                </TableCell>

                                <TableCell align="left">{Math.floor(Math.random() * 10 + 10)}$</TableCell>

                                <TableCell align="left">{new Date().toLocaleDateString()}</TableCell>



                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Grid >
}