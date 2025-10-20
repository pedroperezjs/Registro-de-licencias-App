import { useForm } from 'react-hook-form';
import { registerShema, type RegisterFormData } from '../../shemas/authShema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void> | void;
  isSubmitting?: boolean;
}

export const RegisterForm = ({ onSubmit, isSubmitting }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerShema),
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
        Crear cuenta
      </Typography>

      <TextField
        label="Nombre"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        size="small"
      />

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

      <TextField
        label="Confirmar contraseña"
        type="password"
        {...register('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        size="small"
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ mt: 1 }}
      >
        {isSubmitting ? <CircularProgress size={24} /> : 'Registrarse'}
      </Button>
    </Box>
  );
};
