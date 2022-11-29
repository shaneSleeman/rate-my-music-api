import { createTheme } from "@mui/system";

// Replicate Spotify-like colours
const themeOptions = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#11cb5f",
      dark: "#11cb5f",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#11cb5f",
      paper: "#11cb5f",
    },
  },
  typography: {
    fontFamily: "Do Hyeon",
  },
  shape: {
    borderRadius: 16,
  },
});

export default themeOptions;
