import { FunctionComponent } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../utils/useAuth';

export const Header: FunctionComponent = (): JSX.Element => {
  const { authed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <AppBar position="fixed" style={{ boxShadow: 'none', zIndex: 1000000 }} >
      <Toolbar style={{ gap: 25 }}>
        <Typography variant="h6" style={{ padding: '10px' }}>My Books App</Typography>
        <div style={{ flexGrow: 1 }} />
        <IconButton edge="end" color="inherit">
        </IconButton>
        {authed && <Button color='inherit' onClick={handleLogout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};