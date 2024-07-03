
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRouter";
import { SnackbarProvider } from "notistack";
import { Notifications } from "react-push-notification";

function App() {
  return (
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={5000}
      >
        <Notifications position="top-right" />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SnackbarProvider>
  );
}

export default App;
