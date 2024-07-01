import { Provider } from "react-redux";
import store from "@app/root";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRouter";
import { SnackbarProvider } from "notistack";
import { useAnnouncements } from "@features/admin/announcement/useAnnouncements";
import { Notifications } from "react-push-notification";

function App() {
  const announcements = useAnnouncements();
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
