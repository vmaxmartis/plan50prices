import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#0074BA",
    },
    secondary: {
      main: "#47D7BC",
    },
    error: {
      main: "#c73927",
    },
  },
});

export default theme;
