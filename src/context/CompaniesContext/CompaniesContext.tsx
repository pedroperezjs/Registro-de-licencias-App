import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { CompanyFormData } from '../../shemas/companieSchema';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../AuthContext/AuthContext';

interface CompanyProps {
  id: string;
  nameCompany: string;
  rutCompany: string;
  created_at: string;
  user_id: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

interface CompaniesContextType {
  companies: CompanyProps[];
  loading: boolean;
  addCompany: (data: CompanyFormData) => Promise<void>;
  fetchCompanies: () => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;
  snackbar: SnackbarState;
  handleCloseSnackbar: () => void;
}

const CompaniesContext = createContext<CompaniesContextType | undefined>(
  undefined
);

export const useCompanies = () => {
  const context = useContext(CompaniesContext);
  if (!context)
    throw new Error('useCompanies debe usarse dentro de CompaniesProvider');
  return context;
};

export const CompaniesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = (
    message: string,
    severity: 'success' | 'error' = 'success'
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const fetchCompanies = async () => {
    if (!user) {
      setCompanies([]);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', user.id) // Filtra por el usuario actual (consistente con RLS)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCompanies((data ?? []) as CompanyProps[]);
    } catch (e) {
      showSnackbar('Error al cargar empresas', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addCompany = async (data: CompanyFormData) => {
    if (!user) {
      showSnackbar('No hay usuario autenticado', 'error');
      return;
    }
    setLoading(true);
    try {
      const { data: inserted, error } = await supabase
        .from('companies')
        .insert([{ ...data, user_id: user.id }]) // IMPORTANT: enviar user_id
        .select()
        .single();

      if (error) throw error;
      if (inserted) {
        setCompanies((prev) => [inserted as CompanyProps, ...prev]); // actualiza local sin refetch
      }
      showSnackbar('Empresa registrada con éxito', 'success');
    } catch (e) {
      showSnackbar('Error al agregar la empresa', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async (id: string) => {
    if (!user) {
      showSnackbar('No hay usuario autenticado', 'error');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id); // seguridad adicional desde cliente

      if (error) throw error;

      setCompanies((prev) => prev.filter((c) => c.id !== id));
      showSnackbar('Empresa eliminada', 'success');
    } catch (e) {
      showSnackbar('Error al eliminar la empresa', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <CompaniesContext.Provider
      value={{
        companies,
        loading,
        addCompany,
        fetchCompanies,
        deleteCompany,
        handleCloseSnackbar,
        snackbar,
      }}
    >
      {children}
    </CompaniesContext.Provider>
  );
};
