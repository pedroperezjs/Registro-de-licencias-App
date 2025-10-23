import { z } from 'zod';

const toDate = (s: string) => new Date(`${s}T00:00:00Z`);

export const licenseSchema = z
  .object({
    company_id: z.string().uuid({ message: 'Empresa requerida' }),
    employee_name: z.string().trim().min(1, 'Nombre del empleado es requerido'),
    employee_rut: z.string().min(1, 'El RUT es requerido'),
    folio: z.string().trim().min(1, 'Folio es requerido'),
    grant_date: z.iso.date({
      error: 'Fecha de otorgamiento requerida',
    }),
    start_date: z.iso.date({ error: 'Fecha de inicio requerida' }),
    end_date: z.iso.date({ error: 'Fecha de término requerida' }),
    notes: z.string().trim().optional(),
  })
  .refine((date) => toDate(date.start_date) <= toDate(date.end_date), {
    message: 'La fecha de inicio no puede ser posterior a la de término',
    path: ['end_date'],
  });

export type LicenseFormData = z.infer<typeof licenseSchema>;
