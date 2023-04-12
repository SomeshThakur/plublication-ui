import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { usePublicationCategoryService } from "../../../services/PublicaitonCategoryService";
import { usePublicationsService } from "../../../services/PublicationService";
import { usePublicationTypesService } from "../../../services/PublicationTypesService";
import { pages } from "../../../types/pages";
import { Category, Publication, PublicationType } from "../../../types/publication";

export const PublicationForm = () => {
    const [publication, setPublication] = useState<Publication>("" as unknown as Publication);
    const [title, setTitle] = useState(publication?.title || "");
    const [type, setType] = useState(publication?.type || "");
    const [topic, setTopic] = useState(publication?.topic || "");
    const [subTitle, setSubTitle] = useState(publication?.subTitle || "");
    const [price, setPrice] = useState(publication?.subTitle || "");
    const [category, setCategory] = useState<Category>(publication?.category || "" as unknown as Category);
    const [categoryTypes, setCategoryTypes] = useState<Category[]>([]);
    const [publicationTypes, setPublicationTypes] = useState<PublicationType[]>([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");



    const { getPublicationTypes } = usePublicationTypesService();
    const { getPublicationCategories } = usePublicationCategoryService();
    const { createPublication } = usePublicationsService();



    useEffect(() => {
        const fetchPublicationTypes = async () => {
            try {
                const types = await getPublicationTypes();
                setPublicationTypes(types);
            } catch (err) {
                setError("Failed to fetch publication types.");
            }
        };
        const fetchPublicationCategories = async () => {
            try {
                const types = await getPublicationCategories();
                setCategoryTypes(types);
            } catch (err) {
                setError("Failed to fetch publication category types.");
            }
        }

        fetchPublicationTypes();
        fetchPublicationCategories();
    }, []);


    const clearAll = () => {
        setTitle("");
        setCategory("" as unknown as Category);
        setType(null as unknown as PublicationType);
        setTopic("");
        setPrice("");
        setSubTitle("");
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!title || !type || !subTitle || !category || !topic || !price.trim()?.length) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await createPublication({
                category_id: Number(category),
                identification_number: String((Math.random() * 1e+10).toFixed(0)),
                published_date: new Date().toISOString().split('T')[0],// "2023-03-19"
                sub_title: subTitle,
                title,
                topic,
                price,
                type_id: Number(type)
            });
            if (response.status === 201) {
                setSuccess("Publication Created");

                clearAll();
            } else {
                setError(response.data?.message);
            }
        } catch (error) {
            setError(error as string);
        }
    };

    return (
        <Grid>
            <Typography variant="h4" margin={2}>Create Publication</Typography>

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
                <Grid container spacing={2} >
                    <Grid item xs={12} >
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    < Grid item xs={12}  >
                        <TextField
                            label="Sub Title"
                            value={subTitle}
                            onChange={(e) => setSubTitle(e.target.value)}
                            fullWidth
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <FormControl fullWidth >
                            <InputLabel id="type-label-1" > Category </InputLabel>
                            <Select
                                labelId="type-label-1"
                                label="Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as Category)}>
                                <MenuItem value="" >
                                    <em>Select a category </em>
                                </MenuItem>
                                {
                                    categoryTypes.map((t) => (
                                        <MenuItem key={t.id} value={t.id} >
                                            {t.name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl >
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth >
                            <InputLabel id="type-label" >Publication Type </InputLabel>
                            <Select
                                labelId="type-label"
                                label="Publication Type"
                                value={type}
                                onChange={(e) => setType(e.target.value as PublicationType)}>
                                <MenuItem value="" >
                                    <em>Select a publication type </em>
                                </MenuItem>
                                {
                                    publicationTypes.map((t) => (
                                        <MenuItem key={t.id} value={t.id} >
                                            {t.name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl >
                    </Grid>

                    < Grid item xs={12} sm={6}>
                        <TextField
                            label="Topic / Tags"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            fullWidth

                            rows={4}
                        />
                    </Grid>
                    < Grid item xs={12} sm={6}>
                        <TextField
                            type={'number'}
                            label="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            fullWidth

                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={6} marginLeft={"25%"} whiteSpace='nowrap' width={'150px'} >
                        <Stack spacing={2} >
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                {/* {publicationId ? "Update" : "Create"} */}
                                Create
                            </Button>

                            <Link to={"/" + pages["All Publications"]}>
                                <Button type="submit" variant="contained" color="secondary" fullWidth>
                                    Back
                                </Button>
                            </Link>

                        </Stack>
                    </Grid>
                </Grid>
            </Box >
        </Grid >
    );
}

