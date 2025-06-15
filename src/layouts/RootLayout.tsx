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
import { Outlet, NavLink } from 'react-router';

import { ROUTE_PATHS } from '@/routes/path';

const RootLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        component={'header'}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Page 1
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Drawer variant="permanent" style={{ display: 'block' }}>
          <Toolbar />
          <List component="nav">
            <ListItem component={NavLink} to={ROUTE_PATHS.SCATTER_PAGE}>
              <ListItemIcon>
                <SsidChartIcon />
              </ListItemIcon>
              <ListItemText primary="Scatter Page" />
            </ListItem>
            <ListItem component={NavLink} to={ROUTE_PATHS.TREE_VISUALIZATION}>
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
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default RootLayout;
