import { Avatar, Box, Checkbox, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Icon from '@mui/material/Icon';

export const PublicationsGrid: FunctionComponent = (): JSX.Element => {

    return <Grid >
        <Typography variant="h4">Publications</Typography>
        <TableContainer sx={{ minWidth: 800 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Author
                        </TableCell>
                        <TableCell>
                            Year
                        </TableCell>
                        <TableCell>
                            Published
                        </TableCell>
                        <TableCell>
                            Notes
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

                                <TableCell align="left">Author name</TableCell>

                                <TableCell align="left">{Math.floor(new Date().getFullYear() - Math.random() * 100)}</TableCell>

                                <TableCell align="left">yes</TableCell>

                                <TableCell align="left">
                                    Some sententce......
                                </TableCell>

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