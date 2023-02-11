import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import './main.css';
import { AuthProvider } from "./utils/useAuth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
