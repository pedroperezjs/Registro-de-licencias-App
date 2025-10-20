import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context';
import {
  CompaniesPage,
  DashboardPage,
  LicensesPage,
  LoginPage,
  RegisterPage,
} from '../pages';
import { DashboardLayout } from '../components';

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route
              path="login"
              element={<LoginPage />}
            />
            <Route
              path="/register"
              element={<RegisterPage />}
            />
            <Route
              path="*"
              element={
                <Navigate
                  to="/login"
                  replace
                />
              }
            />
          </>
        ) : (
          <Route element={<DashboardLayout />}>
            <Route
              path="/"
              element={<DashboardPage />}
            />
            <Route
              path="/empresas"
              element={<CompaniesPage />}
            />
            <Route
              path="/licencias"
              element={<LicensesPage />}
            />
            <Route
              path="/*"
              element={<Navigate to="/" />}
            />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};
