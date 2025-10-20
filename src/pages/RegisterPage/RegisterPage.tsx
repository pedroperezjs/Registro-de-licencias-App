import { Box, Paper } from '@mui/material';
import { RegisterForm } from '../../components';
import type { RegisterFormData } from '../../shemas/authShema';

export const RegisterPage = () => {
  const handleRegister = async (data: RegisterFormData) => {
    console.log('Register data:', data);
    // 🔐 Aquí conectarás con Supabase o tu backend
    // Ejemplo (cuando integremos Supabase):
    // const { data: user, error } = await supabase.auth.signUp({
    //   email: data.email,
    //   password: data.password,
    // });
  };

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
