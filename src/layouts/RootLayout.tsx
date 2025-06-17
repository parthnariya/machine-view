import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MenuIcon from '@mui/icons-material/Menu';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router';

import { NavLink } from '@/components/NavLink';
import Condition from '@/components/UI/Condition';
import { ROUTE_PATHS, ROUTE_PATHS_TITLES } from '@/routes/path';

const drawerWidth = 240;

const RootLayout = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const currentRouteKey = Object.keys(ROUTE_PATHS).find(
    (key) =>
      ROUTE_PATHS[key as keyof typeof ROUTE_PATHS] ===
      location.pathname.slice(1),
  ) as keyof typeof ROUTE_PATHS | undefined;

  const pageTitle = currentRouteKey
    ? ROUTE_PATHS_TITLES[currentRouteKey]
    : 'Unknown Page';

  const drawerContent = (
    <List component="nav">
      <NavLink
        to={ROUTE_PATHS.SCATTER_PAGE}
        label={ROUTE_PATHS_TITLES.SCATTER_PAGE}
        prefixIcon={<SsidChartIcon />}
      />
      <NavLink
        to={ROUTE_PATHS.TREE_VISUALIZATION}
        label={ROUTE_PATHS_TITLES.TREE_VISUALIZATION}
        prefixIcon={<AccountTreeIcon />}
      />
    </List>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <CssBaseline />
      <AppBar
        position="static"
        component={'header'}
        sx={{ flexShrink: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexGrow: 1, p: 0 }}>
        <Condition>
          <Condition.If condition={isMobile}>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
            >
              {drawerContent}
            </Drawer>
          </Condition.If>
          <Condition.Else>
            <Drawer
              variant="permanent"
              sx={{
                flexShrink: 0,
                width: drawerWidth,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                  position: 'relative',
                },
              }}
              open
            >
              {drawerContent}
            </Drawer>
          </Condition.Else>
        </Condition>

        <Container
          component="main"
          sx={{
            padding: 0,
            flexGrow: 1,
            overflowY: 'auto',
            '& .MuiContainer-root': {
              padding: 0,
            },
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default RootLayout;
