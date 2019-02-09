import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#7289DA',
      main: '#7289DA',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#99AAB5',
      main: '#99AAB5',
      dark: '#b0b0b0',
      contrastText: '#000',
    },
  },
});
