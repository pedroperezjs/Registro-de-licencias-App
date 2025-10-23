import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../AuthContext/AuthContext';
import type { LicenseFormData } from '../../shemas/licenseSchema';

export interface LicenseRow {
  id: string;
  company_id: string;
  employee_name: string;
  employee_rut: string;
  folio: string;
  grant_date: string;
  start_date: string;
  end_date: string;
  notes: string | null;
  user_id: string;
  created_at: string;
  company?: { nameCompany: string; rutCompany: string }[];
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

interface ContextProps {
  licenses: LicenseRow[];
  loading: boolean;
  addLicense: (id: LicenseFormData) => Promise<void>;
  deleteLicense: (id: string) => Promise<void>;
  snackbar: SnackbarState;
  closeSnackbar: () => void;
  fetchLicenses: () => Promise<void>;
}

const LicenseContext = createContext<ContextProps | undefined>(undefined);

export const useLicenses = () => {
  const context = useContext(LicenseContext);
  if (!context)
    throw new Error('useLicenses must be used inside LicencesProvider');
  return context;
};

export const LicensesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [licenses, setLicenses] = useState<LicenseRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const show = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message: message, severity: severity });
  };

  const closeSnackbar = () => {
    setSnackbar((e) => ({ ...e, open: false }));
  };

  const fetchLicenses = async () => {
    if (!user) {
      setLicenses([]);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('licenses')
        .select(
          `
          id, company_id, employee_name, employee_rut, folio,
          grant_date, start_date, end_date, notes,
          user_id, created_at,
          company:companies(nameCompany, rutCompany)
        `
        )
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setLicenses((data ?? []) as LicenseRow[]);
    } catch (e) {
      show('Error al cargar licencias', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toDate = (s: string) => new Date(`${s}T00:00:00Z`);
  const addLicense = async (d: LicenseFormData) => {
    if (!user) {
      show('No hay usuario autenticado', 'error');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...d,
        grant_date: toDate(d.grant_date).toISOString(),
        start_date: toDate(d.start_date).toISOString(),
        end_date: toDate(d.end_date).toISOString(),
        user_id: user.id,
      };
      const { data, error } = await supabase
        .from('licenses')
        .insert([payload])
        .select(
          `
          id, company_id, employee_name, employee_rut, folio,
          grant_date, start_date, end_date, notes,
          user_id, created_at,
          company:companies(nameCompany, rutCompany)
        `
        )
        .single();
      if (error) throw error;
      if (data) setLicenses((prev) => [data as LicenseRow, ...prev]);
      show('Licencia registrada con éxito');
    } catch (e: any) {
      show(e?.message ?? 'Error al registrar la licencia', 'error');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const deleteLicense = async (id: string) => {
    if (!user) {
      show('No hay usuario autenticado', 'error');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase
        .from('licenses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      if (error) throw error;
      setLicenses((prev) => prev.filter((l) => l.id !== id));
      show('Licencia eliminada');
    } catch (e: any) {
      show(e?.message ?? 'Error al eliminar la licencia', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, [user?.id]);

  return (
    <LicenseContext.Provider
      value={{
        licenses,
        loading,
        addLicense,
        deleteLicense,
        snackbar,
        closeSnackbar,
        fetchLicenses,
      }}
    >
      {children}
    </LicenseContext.Provider>
  );
};
