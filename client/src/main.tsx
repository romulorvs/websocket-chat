import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider, createStore } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider createStore={createStore}>
      <App />
    </Provider>
  </>
);
