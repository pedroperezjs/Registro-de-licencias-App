import z from 'zod';

export const companySchema = z.object({
  nameCompany: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  rutCompany: z.string().trim().min(1, 'El RUT es obligatorio'),
});

export type CompanyFormData = z.infer<typeof companySchema>;
