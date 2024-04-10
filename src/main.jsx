import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import InjectTailwind from "./InjectTailwind.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InjectTailwind>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </InjectTailwind>
  </React.StrictMode>
);
