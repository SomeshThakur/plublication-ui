import { Alert, Box, Button, debounce, Grid, TextField, Typography } from '@mui/material';
import { KeyboardEvent, useEffect, useState } from 'react';

import { useOrdersService } from '../../../services/OrderService';
import { usePublicationsService } from '../../../services/PublicationService';
import { useUserService } from '../../../services/UserService';
import { FormCustomEvent } from '../../../types/event';
import { Publication } from '../../../types/publication';
import { UserDetails } from '../../../types/users';
import useAuth from '../../../utils/useAuth';



const CreateOrderForm = () => {
    const [receiver, setReceiver] = useState('');
    const [publicationId, setPublicationID] = useState('');
    const [publication, setPublication] = useState<Publication>(null as unknown as Publication);
    const [orderQuantity, setOrderQuantity] = useState('');
    const [total, setTotal] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { createOrder } = useOrdersService();
    const { getPublicationById } = usePublicationsService();
    const { getUserById } = useUserService();
    const { userAuth } = useAuth();

    useEffect(() => {
        if (userAuth?.role?.name === 'Distributor')
            setReceiver(userAuth?.user?.id);
    }, [userAuth])

    const handleReceiverId = async (event: KeyboardEvent<HTMLDivElement>) => {
        const id = (event.target as HTMLInputElement).value;
        if (!id) return;
        const response = await getUserById(id);
        if (response.status !== 200) {
            setError(response.data.message);
            return;
        }
        const user = response.data as UserDetails;
        if (!user) {
            setSuccess("");

            setError('No user found');
            return;
        }
        if (user?.role?.name !== 'Distributor') {
            setSuccess("");

            setError('User is not distributor');
            return;
        }
        setError("");
        setSuccess("User found: " + user.firstName)
        setReceiver(id);
    };

    const handlePublicationId = async (event: KeyboardEvent<HTMLDivElement>) => {
        const id = (event.target as HTMLInputElement).value;
        if (!id) return;
        const response = await getPublicationById(id);
        if (response.status !== 200) {
            setSuccess("");
            setError(response.data.message);
            return;
        }
        const publication = response.data as Publication;
        setError("");
        setSuccess("Found publication, title: " + publication.title);
        if (orderQuantity)
            setTotal(publication.price * Number(orderQuantity))

        setPublication(publication);
        setPublicationID(id);
    };

    const handleOrderQuantity = (event: FormCustomEvent) => {
        setOrderQuantity(event.target.value);
        if (publication) {
            setTotal(publication.price * Number(event.target.value))
        }
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();


        if (!receiver || !publicationId || !orderQuantity) {
            setError("All fields are required.");
            return;
        }

        try {

            const response = await createOrder({
                receiver_id: receiver,
                order_items: [{
                    publication_id: publicationId,
                    quantity: orderQuantity
                }],
            });
            if (response.status === 201) {
                setSuccess("Order Created");

                clearAll();
            } else {
                setError(response.data?.message);
            }
        } catch (error) {
            setError(error as string);
        }
    };

    const clearAll = () => {
        setReceiver("");
        setPublicationID("");
        setOrderQuantity("");
    }

    return (
        <Grid>
            <Typography variant="h4">Create Order</Typography>
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
                            id="Distributor ID"
                            label="Distributor ID"
                            value={receiver}
                            onChange={(e => setReceiver(e.target.value))}
                            onKeyUp={debounce(handleReceiverId, 300)}
                            required
                            fullWidth
                            disabled={userAuth?.role?.name !== 'Admin'}
                        />
                    </Grid>
                    <Grid item xs={12} maxHeight={'500px'}>
                        <TextField
                            label="Publication ID"
                            id="publicationId"
                            value={publicationId}
                            onChange={(e => setPublicationID(e.target.value))}
                            onKeyUp={debounce(handlePublicationId, 300)}
                            required
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} maxHeight={'500px'}>
                        <TextField
                            id="orderQuantity"
                            label={'Quantity'}
                            type='number'
                            value={orderQuantity}
                            inputProps={{ min: 10, max: 100 }}
                            onChange={handleOrderQuantity}
                            required
                            fullWidth
                        />

                    </Grid>
                    <Grid item xs={12} >
                        <Typography sx={{ color: 'text.primary', fontSize: 18, fontWeight: 'medium' }} variant={'overline'}>Total: {total}$</Typography>
                    </Grid>
                    <Grid item xs={12} marginX={"25%"} whiteSpace='nowrap' width={'150px'} >
                        <Button fullWidth type="submit" variant="contained" color="primary">Order</Button>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};

export default CreateOrderForm;
