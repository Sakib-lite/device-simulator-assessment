import { createTheme } from '@mui/material/styles';
import { palette } from './palette';

export const theme = createTheme({
  palette,
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: palette.text.primary,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: palette.text.primary,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: palette.text.primary,
    },
    body1: {
      fontSize: '0.875rem',
      color: palette.text.primary,
    },
    body2: {
      fontSize: '0.75rem',
      color: palette.text.secondary,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
        },
        switchBase: {
          padding: 0,
          margin: 2,
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: palette.primary.main,
              opacity: 1,
            },
          },
        },
        thumb: {
          width: 22,
          height: 22,
        },
        track: {
          borderRadius: 13,
          backgroundColor: palette.divider,
          opacity: 1,
        },
      },
    },
  },
});
