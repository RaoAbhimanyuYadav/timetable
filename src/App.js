import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import store from "./components/redux/store";
import { Provider } from "react-redux";
import "./App.css";
import RouteSelector from "./RouteSelector";
import { amber, deepOrange, grey } from "@mui/material/colors";

// 817e6a -- normal text
// 0c1237 -- background

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#2196f3",
        },
        secondary: {
            main: "#9c27b0",
        },
        divider: deepOrange[700],
        background: {
            default: "#0c1237",
            paper: "#22135e",
        },
        text: {
            primary: "#c2bb92",
            secondary: "#ffa03a",
        },
        border: "#9b7373",
    },
});

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <RouteSelector />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
