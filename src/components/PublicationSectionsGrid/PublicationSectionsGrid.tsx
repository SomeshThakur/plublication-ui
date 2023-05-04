import { Edit } from "@mui/icons-material";
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { usePublicationSectionService } from "../../services/PublicatoinSectionsService";
import { pages } from "../../types/pages";
import { PublicationSection } from "../../types/publication";
import useAuth from "../../utils/useAuth";

export const PublicationSectionsGrid: FunctionComponent = (): JSX.Element => {
    const [publicationSections, setPublicationSections] = useState<PublicationSection[]>([]);
    const { fetchPublicationSections } = usePublicationSectionService();
    const { userAuth } = useAuth();
    const { publicationID, categoryID } = useParams();


    useEffect(() => {
        if (!publicationID) return;

        fetchPublicationSections(publicationID).then(publicationSections => {
            setPublicationSections(publicationSections.data);
        });
    }, [publicationID])


    return <Grid >
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: '5%' }}>
            <Link to={'/' + pages["All Publications"]}>
                <Button>{'< Back'}</Button>
            </Link>
            <Typography variant="h4">Publication Section</Typography>
            {
                (userAuth?.role?.name === 'Admin' || userAuth?.role?.name === 'Editor' || userAuth?.role?.name === 'Author') &&
                <Link to={`/${publicationID}/${categoryID}/${pages["Create Publication Section"]}`}><Button variant="contained" color='secondary' >Create Publication Section</Button> </Link>
            }
        </div>
        <TableContainer sx={{ minWidth: 800 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Title
                        </TableCell>
                        <TableCell>
                            Content
                        </TableCell>
                        <TableCell>
                            Section Type
                        </TableCell>
                        {userAuth?.role.name === 'Editor' || userAuth?.role.name === 'Admin' &&
                            <TableCell>
                                Actions
                            </TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        publicationSections?.length > 0 ?
                            publicationSections.map((publication) => (
                                <TableRow key={publication.id} hover tabIndex={-1} role="checkbox" >
                                    <TableCell align="left">{publication.title}</TableCell>
                                    <TableCell align="left">{publication.content}</TableCell>
                                    <TableCell align="left">{publication?.sectionType?.name}</TableCell>
                                    {userAuth?.role.name === 'Editor' || userAuth?.role.name === 'Admin' &&
                                        <TableCell>
                                            <Link to={`/${publicationID}/${categoryID}/${pages["Create Publication Section"]}`} state={publication}>
                                                <Edit style={{ cursor: 'pointer' }} titleAccess="Edit" />
                                            </Link>
                                        </TableCell>
                                    }
                                </TableRow>
                            )) :
                            <TableRow >
                                <TableCell >
                                    No Data
                                </TableCell>
                            </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Grid >
}