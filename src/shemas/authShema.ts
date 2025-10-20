import z from 'zod';

export const loginShema = z.object({
  email: z.string().email('Correo invalido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caractares'),
});

export const registerShema = z
  .object({
    name: z.string().min(2, 'El nombre es obligatorio'),
    email: z.string().email('Correo inválido'),
    password: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coincides',
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginShema>;
export type RegisterFormData = z.infer<typeof registerShema>;
