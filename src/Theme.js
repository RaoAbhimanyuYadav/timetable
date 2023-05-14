import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import RouteSelector from "./RouteSelector";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                  primary: {
                      main: "#2196f3",
                  },
                  secondary: {
                      main: "#ffa03a",
                  },
                  divider: "#000",
                  background: {
                      default: "#fff",
                      paper: "#fff",
                  },
                  text: {
                      primary: "#010101",
                      secondary: "#121212",
                  },
                  border: "#000",
              }
            : {
                  // palette values for dark mode
                  primary: {
                      main: "#2196f3",
                  },
                  secondary: {
                      main: "#ffa03a",
                  },
                  divider: "#1f1f1f",
                  background: {
                      default: "#0c1237",
                      paper: "#22135e",
                  },
                  text: {
                      primary: "#c2bb92",
                      secondary: "#ffa03a",
                  },
                  border: "#9b7373",
              }),
    },
});

const Theme = () => {
    const mode = useSelector((state) => state.profile.theme);

    // Update the theme only if the mode changes
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouteSelector />
        </ThemeProvider>
    );
};

export default Theme;
