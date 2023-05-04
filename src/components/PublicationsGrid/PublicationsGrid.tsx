import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { usePublicationsService } from "../../services/PublicationService";
import { pages } from "../../types/pages";
import { Publication } from "../../types/publication";
import useAuth from "../../utils/useAuth";

export const PublicationsGrid: FunctionComponent = (): JSX.Element => {
    const [publications, setPublications] = useState<Publication[]>([]);
    const { getPublications } = usePublicationsService();
    const { userAuth } = useAuth();


    useEffect(() => {
        getPublications().then(publications => {
            setPublications(publications);
        });
    }, [])


    return <Grid >
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: '5%' }}>
            <Typography variant="h4">Publications</Typography>
            {
                (userAuth?.role?.name === 'Admin' || userAuth?.role?.name === 'Author') &&
                <Link to={'/' + pages["Create Publication"]}><Button variant="contained" color='secondary' >Create Publication</Button> </Link>
            }
        </div>
        <TableContainer sx={{ minWidth: 800 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>SubTitle</TableCell>
                        <TableCell>Topic</TableCell>
                        <TableCell>Published Date</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Category</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        publications?.length > 0 ?
                            publications.map((publication) => (
                                <TableRow key={publication.id} hover tabIndex={-1} role="checkbox" >
                                    <TableCell align="left">
                                        <Link to={`/${publication.id}/${publication.category.id}/${pages["Publication Sections"]}`}>
                                            {publication.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">
                                        {publication.id}
                                    </TableCell><TableCell align="left">{publication.subTitle}</TableCell>
                                    <TableCell align="left">{publication.topic}</TableCell>
                                    <TableCell align="left">{publication.createdAt && publication.createdAt.split('T')[0]}</TableCell>
                                    <TableCell align="left">{publication.price}</TableCell>
                                    <TableCell align="left">{publication.type.name}</TableCell>
                                    <TableCell align="left">{publication.category.name}</TableCell>
                                </TableRow>
                            )) : <>No publicaitons available</>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Grid >
}