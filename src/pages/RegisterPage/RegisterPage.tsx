import { Box, Paper } from '@mui/material';
import { LoadingScreen, RegisterForm } from '../../components';
import type { RegisterFormData } from '../../shemas/authShema';
import { useAuth } from '../../context';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterFormData) => {
    const { name, email, password } = data;
    await register({ name, email, password });
    navigate('/');
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
        <RegisterForm onSubmit={handleRegister} />
      </Paper>
    </Box>
  );
};
