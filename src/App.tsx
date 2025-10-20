import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider } from './context';
import { AppRouter } from './routes/AppRouter';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
