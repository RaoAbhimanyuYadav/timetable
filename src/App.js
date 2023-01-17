import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import store from "./components/redux/store";
import { Provider } from "react-redux";
import "./App.css";
import Routes from "./Routes";

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
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
