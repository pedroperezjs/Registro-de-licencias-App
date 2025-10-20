import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { Box, Button, Typography } from '@mui/material';
import { LoadingScreen } from '../../components';

export const DashboardPage = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err: any) {
      console.error(err);
    }
  };

  if (loading) return <LoadingScreen />;

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
