import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Outlet, NavLink, useLocation } from 'react-router';

import { ROUTE_PATHS, ROUTE_PATHS_TITLES } from '@/routes/path';

const RootLayout = () => {
  const location = useLocation();

  const currentRouteKey = Object.keys(ROUTE_PATHS).find(
    (key) =>
      ROUTE_PATHS[key as keyof typeof ROUTE_PATHS] ===
      location.pathname.slice(1),
  ) as keyof typeof ROUTE_PATHS | undefined;

  const pageTitle = currentRouteKey
    ? ROUTE_PATHS_TITLES[currentRouteKey]
    : 'Unknown Page';

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
          <Typography variant="h6" noWrap>
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Drawer
          variant="permanent"
          sx={{
            flexShrink: 0,
            width: 240,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              position: 'relative',
            },
          }}
        >
          <List component="nav">
            <ListItem
              component={NavLink}
              to={ROUTE_PATHS.SCATTER_PAGE}
              sx={{
                textDecoration: 'none',
                '&.active': {
                  backgroundColor: (theme) => theme.palette.action.selected,
                },
              }}
            >
              <ListItemIcon>
                <SsidChartIcon />
              </ListItemIcon>
              <ListItemText primary="Scatter Page" />
            </ListItem>
            <ListItem
              component={NavLink}
              to={ROUTE_PATHS.TREE_VISUALIZATION}
              sx={{
                textDecoration: 'none',
                '&.active': {
                  backgroundColor: (theme) => theme.palette.action.selected,
                },
              }}
            >
              <ListItemIcon>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary="Tree Visualization" />
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            bgcolor: (theme) => theme.palette.danger.main,
            p: 3,
            flexGrow: 1,
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default RootLayout;
