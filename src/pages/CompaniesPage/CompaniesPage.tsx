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
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback, useState } from 'react';
import { ConfirmDialog } from '../../components';

export const CompaniesPage = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

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
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: { nameCompany: '', rutCompany: '' },
  });

  const normalizeRut = useCallback((rut: string) => {
    return rut.replace(/\./g, '').replace(/\s+/g, '');
  }, []);

  const onSubmit = async (data: CompanyFormData) => {
    const cleaned = { ...data, rutCompany: normalizeRut(data.rutCompany) };

    await addCompany(cleaned);
    reset();
  };

  const handleConfirmDelete = async () => {
    if (!targetId) return;
    setDeleting(true);
    try {
      await deleteCompany(targetId);
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
      setTargetId(null);
    }
  };

  const askDelete = (id: string) => {
    setTargetId(id);
    setConfirmOpen(true);
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TextField
            label="Nombre de la empresa"
            fullWidth
            {...register('nameCompany')}
            error={!!errors.nameCompany}
            helperText={errors.nameCompany?.message}
            sx={{ mb: 2 }}
            required
            autoFocus={!confirmOpen}
          />

          <TextField
            label="RUT de la empresa"
            fullWidth
            {...register('rutCompany')}
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
                  onClick={() => askDelete(company.id)}
                  disabled={deleting || loading}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${company.nameCompany} — ${company.rutCompany}`}
              />
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

      <ConfirmDialog
        open={confirmOpen}
        title="Eliminar empresa"
        message="¿Seguro que deseas eliminar esta empresa? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleting}
      />
    </Box>
  );
};
