import { useForm } from 'react-hook-form';
import { loginShema, type LoginFormData } from '../../shemas/authShema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void | void>;
  isSubmitting?: boolean;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginShema),
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 300,
        maxWidth: 400,
        mx: 'auto',
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
      >
        Iniciar Sesión
      </Typography>
      <TextField
        label="Correo electrónico"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        size="small"
      />
      <TextField
        label="Contraseña"
        type="password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        size="small"
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ mt: 1 }}
      >
        {isSubmitting ? <CircularProgress size={24} /> : 'Ingresar'}
      </Button>
    </Box>
  );
};
