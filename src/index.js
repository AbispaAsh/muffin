import React from "react";
import ReactDOM from "react-dom";
import "./css/style.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import reducer, { initialState } from "./js/reducer";
import { StateProvider } from "./js/StateProvider";
import { useAuth } from "./js/firebase";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
