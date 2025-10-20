import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { Box, Button, Typography } from '@mui/material';

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
      >
        Bienvenido {user?.user_metadata?.name || user?.email}
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
      >
        Cerrar sesión
      </Button>
    </Box>
  );
};
