import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import "./index.css";
import { store, persistor } from "./redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxProvider } from "react-redux";

// const store = configureStore();

const base = process.env.ROOT_URL;
console.log("base: ", base);

render(
  <ReduxProvider store={store}>
    <Router basename={base}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
