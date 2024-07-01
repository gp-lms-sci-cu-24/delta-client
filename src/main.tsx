import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "@/dev";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import store from "@app/root";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
      <Provider store={store}>
        <App />
      </Provider>
    </DevSupport>
  </React.StrictMode>,
);
