import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider, CompaniesProvider } from './context';
import { AppRouter } from './routes/AppRouter';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CompaniesProvider>
          <AppRouter />
        </CompaniesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
