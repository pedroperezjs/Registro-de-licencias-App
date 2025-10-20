import { Box, Paper } from '@mui/material';
import { LoadingScreen, LoginForm } from '../../components';
import type { LoginFormData } from '../../shemas/authShema';
import { useAuth } from '../../context';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: 3 }}
      >
        <LoginForm onSubmit={handleLogin} />
      </Paper>
    </Box>
  );
};
