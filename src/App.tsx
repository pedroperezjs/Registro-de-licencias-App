import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider, CompaniesProvider } from './context';
import { AppRouter } from './routes/AppRouter';
import { theme } from './theme/theme';
import { LicensesProvider } from './context/LicenseContext/LicenseContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CompaniesProvider>
          <LicensesProvider>
            <AppRouter />
          </LicensesProvider>
        </CompaniesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
