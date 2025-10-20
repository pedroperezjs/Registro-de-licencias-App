import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItem,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

const drawerWidth = 240;

export const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user, loading } = useAuth();

  const nameUser = user?.user_metadata?.name;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/')}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/empresas')}>
            <ListItemText primary="Empresas" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/licencias')}>
            <ListItemText primary="Licencias" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  if (loading) return <LoadingScreen />;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Registro de Licencias
          </Typography>

          <Box>
            <Typography
              variant="body2"
              sx={{ display: 'inline', mr: 2 }}
            >
              Bienvenido {nameUser}
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleLogout}
              sx={{ fontSize: 15 }}
            >
              Cerrar Sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        {/* Drawer para móviles */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Drawer permanente en desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          open
        >
          <Toolbar />
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
