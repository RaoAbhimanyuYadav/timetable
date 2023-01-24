import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import store from "./components/redux/store";
import { Provider } from "react-redux";
import "./App.css";
import RouteSelector from "./RouteSelector";

const darkTheme = createTheme({
  palette: {
    mode: "light",
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
