import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { FunctionComponent, useEffect, useState } from "react"
import { Link } from "react-router-dom";

import { useOrdersService } from "../../services/OrderService"
import { Order } from "../../types/orders";
import { pages } from "../../types/pages";
import useAuth from "../../utils/useAuth";

export const OrdersGrid: FunctionComponent = (): JSX.Element => {
    const { getOrders } = useOrdersService();
    const [orders, setOrders] = useState<Order[]>([]);
    const { userAuth } = useAuth();


    useEffect(() => {
        getOrders().then(orders => setOrders(orders.data));
    }, [])

    const getDateinReadableFormat = (createdAt: string) => {
        const date = new Date(createdAt);
        const dateString = date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', year: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' });
        return dateString;
    }

    return <Grid >
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: '5%' }}>
            <Typography variant="h4">Orders</Typography>
            {
                (userAuth?.role?.name === 'Admin' || userAuth?.role?.name === 'Distributor') &&
                <Link to={`/${pages['Create Order']}`}><Button variant="contained" color='secondary' >Create Order</Button> </Link>
            }
        </div>

        <TableContainer sx={{ minWidth: 800 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Date & Time</TableCell>
                        <TableCell>Publication Titles</TableCell>
                        <TableCell>Order Value</TableCell>
                        <TableCell>Ordered By</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orders?.length > 0 ? orders.map(order => <TableRow>
                            <TableCell align="left">{order.id}</TableCell>
                            <TableCell align="left">{
                                getDateinReadableFormat(order.createdAt)
                            }</TableCell>
                            <TableCell align="left">{order.items.map(item => <TableRow>
                                <TableCell title={`${item.amount}$`}>
                                    {item.quantity} x <span title={`${item.unitPrice}$`}> {item.publication.title}</span><br />
                                </TableCell>
                            </TableRow>)}
                            </TableCell>
                            <TableCell align="left">{order.amount}$</TableCell>
                            <TableCell align="left">{`${order.receiver.firstName}  ${order.receiver.lastName}`}</TableCell>
                        </TableRow>) :
                            <TableRow>
                                <TableCell>
                                    No Orders
                                </TableCell>
                            </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Grid >
}