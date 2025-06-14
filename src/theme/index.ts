import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    danger: Palette['primary'];
  }
  interface PaletteOptions {
    danger?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    success: {
      main: '#28a745',
    },
    warning: {
      main: '#ffc107',
    },
    danger: {
      main: '#dc3545',
    },
    background: {
      default: '#f8f9fa',
    },
  },
});
