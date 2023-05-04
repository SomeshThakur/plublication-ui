import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { usePublicationSectionService } from '../../../services/PublicatoinSectionsService';
import { FormCustomEvent } from '../../../types/event';
import { PublicationSection, PublicationSectionType } from '../../../types/publication';


const PublicationSectionForm = () => {
    const { state }: { state: PublicationSection } = useLocation();

    const [title, setTitle] = useState(state?.title || '');
    const [content, setContent] = useState(state?.content || '');
    const [sectionTypeId, setSectionTypeId] = useState('');
    const [sectionTypes, setSectionTypes] = useState<PublicationSectionType[]>([]);
    const { getPublicationSectionTypes, updatePublicationSection, createPublicationSection } = usePublicationSectionService();
    const { publicationID, categoryID } = useParams();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (state === undefined || state === null || !state?.sectionType) return;
        if (!sectionTypes.length) return;
        setSectionTypeId(state?.sectionType?.id);
    }, [state, sectionTypes])


    useEffect(() => {
        if (!categoryID) return;
        getPublicationSectionTypes(categoryID).then(type => {
            setSectionTypes(type.data);
        })
    }, [categoryID])


    const handleTitleChange = (event: FormCustomEvent) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event: FormCustomEvent) => {
        setContent(event.target.value);
    };

    const handleSectionTypeChange = (event: FormCustomEvent) => {
        setSectionTypeId(event.target.value);
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();


        if (!title || !content) {
            setError("All fields are required.");
            return;
        }

        try {
            if (!publicationID) {
                setError("Publication ID is missing");
                return;
            }

            let response;
            if (state) {
                response = await updatePublicationSection(publicationID, {
                    id: state?.id,
                    title,
                    content,
                    sectionTypeId: Number(sectionTypeId)
                });
            } else {
                response = await createPublicationSection(publicationID, {
                    title,
                    content,
                    sectionTypeId: Number(sectionTypeId)
                });
            }

            if (response.status === 201) {
                setSuccess(`Publication section ${state ? 'updated' : 'created'} successfully`);
                if (!state)
                    clearAll();
                if (state) {
                    setTimeout(() => setSuccess(""), 5000)
                }
            } else {
                setError(response.data?.message);
            }
        } catch (error) {
            setError(error as string);
        }
    };

    const clearAll = () => {
        setTitle("");
        setContent("");
        setSectionTypeId("");
    }

    return (
        <Grid>
            <Typography variant="h4" margin={2}>Create Publication Section</Typography>

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
                <Grid item xs={12} marginY={1} >


                    <FormControl fullWidth required>
                        <InputLabel id="section-type-label">Section Type</InputLabel>
                        <Select
                            labelId="section-type-label"
                            id="section-type"
                            label="Section Type"

                            value={sectionTypeId}
                            onChange={handleSectionTypeChange}
                            required
                            fullWidth
                        >
                            <MenuItem value="" >
                                <em>Select a publication type </em>
                            </MenuItem>
                            {
                                sectionTypes?.length &&
                                sectionTypes.map(st =>
                                    <MenuItem key={st.id} value={st.id} >
                                        {st.name}
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container spacing={2} >
                    <Grid item xs={12} >
                        <TextField
                            id="title"
                            label="Title"
                            value={title}
                            onChange={handleTitleChange}
                            required
                            fullWidth

                        />
                    </Grid>
                    <Grid item xs={12} maxHeight={'500px'}>
                        <TextField
                            id="content"
                            label="Content"
                            value={content}
                            onChange={handleContentChange}
                            required
                            multiline
                            inputProps={{
                                style: {
                                    height: '450px',
                                    overflowX: 'scroll',
                                    wordWrap: 'break-word'
                                }
                            }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} marginX={"25%"} whiteSpace='nowrap' width={'150px'} >

                        <Button fullWidth type="submit" variant="contained" color="primary">{state ? 'Update' : 'Submit'}</Button>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};

export default PublicationSectionForm;
