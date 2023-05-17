import store from "./components/redux/store";
import { Provider } from "react-redux";
import "./App.css";
import Theme from "./Theme";

function App() {
    return (
        <Provider store={store}>
            <Theme />
        </Provider>
    );
}

export default App;
