// import "../public/newRelic.js"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store, persistor } from "./services/redux/store";
import { PersistGate } from "redux-persist/integration/react";

/**
 * This is a conditional logging of console logs and warnings in browser
 * Logs and warnings will not seen if the environtment isn't the dev envrironment
 */
if (process.env.REACT_APP_NODE_ENV !== "development") {
  // console.log = () => {}
  console.warn = () => {}
  console.error = () => {}
}

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    </Provider>
  ,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();