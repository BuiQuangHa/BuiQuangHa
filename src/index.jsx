import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./app";
import "./assets/styles/main.less";
import { AuthProvider } from "./context/AuthContext";
import { Providers } from "./providers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Providers>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </Providers>,
);
