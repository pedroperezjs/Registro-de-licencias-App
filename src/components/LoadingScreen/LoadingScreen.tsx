import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingScreen = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        zIndex: 10,
      }}
    >
      <CircularProgress size={60} />
      <Typography
        variant="h6"
        sx={{ mt: 2 }}
      >
        Cargando...
      </Typography>
    </Box>
  );
};
