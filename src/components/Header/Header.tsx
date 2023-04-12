import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../utils/useAuth';

export const Header: FunctionComponent = (): JSX.Element => {
  const { userAuth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <AppBar position="fixed" style={{ boxShadow: 'none', zIndex: 1000000 }} >
      <Toolbar style={{ gap: 25 }}>
        <Grid>
          <Typography variant="h5">Transaction Management System</Typography>
        </Grid>
        <div style={{ flexGrow: 1 }} />
        <IconButton edge="end" color="inherit">
        </IconButton>
        {userAuth?.authed && <Button color='inherit' onClick={handleLogout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};