import { useForm } from 'react-hook-form';
import {
  companySchema,
  type CompanyFormData,
} from '../../shemas/companieSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCompanies } from '../../context';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback } from 'react';

export const CompaniesPage = () => {
  const {
    companies,
    addCompany,
    deleteCompany,
    loading,
    snackbar,
    handleCloseSnackbar,
  } = useCompanies();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  const normalizeRut = useCallback((rut: string) => {
    return rut.replace(/\./g, '').replace(/\s+/g, '');
  }, []);

  const onSubmit = async (data: CompanyFormData) => {
    const cleaned = { ...data, rutCompany: normalizeRut(data.rutCompany) };

    try {
      await addCompany(cleaned);
      reset();
    } catch {}
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ mb: 3 }}
      >
        Registrar Empresa
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Nombre de la empresa"
            fullWidth
            autoFocus
            {...register('nameCompany')}
            error={!!errors.nameCompany}
            helperText={errors.nameCompany?.message}
            sx={{ mb: 2 }}
            required
          />

          <TextField
            label="RUT de la empresa"
            fullWidth
            {...register('rutCompany', {
              onBlur: (e) => {
                const val = normalizeRut(e.target.value);
                setValue('rutCompany', val, { shouldValidate: true });
              },
            })}
            error={!!errors.rutCompany}
            helperText={errors.rutCompany?.message}
            sx={{ mb: 2 }}
            required
          />

          <Button
            variant="contained"
            type="submit"
            disabled={loading || isSubmitting}
            startIcon={
              loading || isSubmitting ? (
                <CircularProgress size={18} />
              ) : undefined
            }
          >
            {loading || isSubmitting ? 'Guardando…' : 'Agregar empresa'}
          </Button>
        </form>
      </Paper>

      {loading ? (
        <CircularProgress />
      ) : companies.length === 0 ? (
        <Typography color="text.secondary">
          No hay empresas registradas todavía.
        </Typography>
      ) : (
        <List>
          {companies.map((company) => (
            <ListItem
              key={company.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="Eliminar empresa"
                  onClick={() => deleteCompany(company.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Typography>
                {company.nameCompany} — {company.rutCompany}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}

      {/* Snackbar global del contexto */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
