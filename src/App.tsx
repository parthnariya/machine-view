import { ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router';

import { router } from '@/routes';
import { theme } from '@/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
