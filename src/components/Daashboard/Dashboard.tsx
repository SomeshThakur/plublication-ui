import styled from "@emotion/styled";
import { Grid, CardHeader, CardContent, Container, Card, Typography } from "@mui/material";
import React from "react";


const Dashboard: React.FC = () => {
    return (
        <StyledContainer>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <StyledCard>
                        <StyledCircle color="#f44336">
                            <StyledTypography variant="h4">100</StyledTypography>
                        </StyledCircle>
                        <CardHeader title="Number of Publications" />
                    </StyledCard>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StyledCard>
                        <StyledCircle color="#4caf50">
                            <StyledTypography variant="h4">50</StyledTypography>
                        </StyledCircle>
                        <CardHeader title="Number of Users" />
                    </StyledCard>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StyledCard>
                        <StyledCircle color="#2196f3">
                            <StyledTypography variant="h4">20</StyledTypography>
                        </StyledCircle>
                        <CardHeader title="Number of Orders" />
                    </StyledCard>
                </Grid>
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
