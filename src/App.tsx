import { Provider } from "react-redux";
import store from "@app/root";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRouter";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
