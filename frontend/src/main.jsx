import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Context from "./Context.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>
);
