import { Provider } from "react-redux";
import store from "@app/root";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRouter";
import { SnackbarProvider } from "notistack";
import { Notifications } from "react-push-notification";

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={5000}
      >
        <Notifications position="top-right" />

        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
