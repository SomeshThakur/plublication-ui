import styled from "@emotion/styled";
import { Card, CardHeader, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useOrdersService } from "../../services/OrderService";
import { usePublicationsService } from "../../services/PublicationService";
import { useUserService } from "../../services/UserService";
import { pages } from "../../types/pages";
import useAuth from "../../utils/useAuth";


const Dashboard: React.FC = () => {
    const [publicationsCount, setPublicationsCount] = useState<number>();
    const [userCount, setUserCount] = useState<number>();
    const [orderCount, setOrderCount] = useState<number>();
    const { getPublications } = usePublicationsService();
    const { getOrders } = useOrdersService();


    const { getUsers } = useUserService();
    const { userAuth } = useAuth();

    const canSeePubsCount = useMemo(() => {
        return userAuth?.role?.name === 'Admin' || userAuth?.role?.name === 'Distributor';
    }, [userAuth]);

    const canSeeUsersCount = useMemo(() => {
        return userAuth?.role?.name === 'Admin';
    }, [userAuth]);

    const canSeeOrdersCount = useMemo(() => {
        return userAuth?.role?.name === 'Admin' || userAuth?.role?.name === 'Distributor';
    }, [userAuth]);

    useEffect(() => {
        if (userAuth?.authed && canSeePubsCount) {
            getPublications().then(p => setPublicationsCount(p?.length));
            getUsers().then(u => setUserCount(u?.length));
            getOrders().then(o => setOrderCount(o.data?.length));
        }
    }, [userAuth]);

    return (
        <StyledContainer>
            <Grid container spacing={3}>
                {canSeePubsCount &&
                    <Grid item xs={12} sm={4}>
                        <Link to={'/' + pages["All Publications"]} style={{ textDecoration: 'none' }}>
                            <StyledCard>
                                <StyledCircle color="#f44336">
                                    <StyledTypography variant="h4">{publicationsCount}</StyledTypography>
                                </StyledCircle>
                                <CardHeader title="Number of Publications" />
                            </StyledCard>
                        </Link>
                    </Grid>
                }
                {
                    canSeeUsersCount && <Grid item xs={12} sm={4}>
                        <Link to={'/' + pages["All Users"]} style={{ textDecoration: 'none' }}>
                            <StyledCard>
                                <StyledCircle color="#4caf50">
                                    <StyledTypography variant="h4">{userCount}</StyledTypography>
                                </StyledCircle>
                                <CardHeader title="Number of Users" />
                            </StyledCard>
                        </Link>
                    </Grid>

                }
                {canSeeOrdersCount &&
                    <Grid item xs={12} sm={4}>
                        <Link to={'/' + pages["All Orders"]} style={{ textDecoration: 'none' }}>
                            <StyledCard>
                                <StyledCircle color="#2196f3">
                                    <StyledTypography variant="h4">{orderCount}</StyledTypography>
                                </StyledCircle>
                                <CardHeader title="Number of Orders" />
                            </StyledCard>
                        </Link>
                    </Grid>
                }
                {
                    !canSeePubsCount && !canSeePubsCount && !canSeeUsersCount && (
                        <Grid item xs={12} sm={4}>
                            No data for the role: {userAuth?.role?.name}
                        </Grid>

                    )
                }
            </Grid>
        </StyledContainer>
    );
};

const StyledContainer = styled(Container)({});

const StyledCard = styled(Card)({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.2)",
});


const StyledTypography = styled(Typography)({
    textAlign: "center",
});
const StyledCircle = styled("div")((props) => ({
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: props.color,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    margin: "20px 0",
}));
export default Dashboard;
