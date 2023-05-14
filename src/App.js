import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import store from "./components/redux/store";
import { Provider } from "react-redux";
import "./App.css";
import RouteSelector from "./RouteSelector";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
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
