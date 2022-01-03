import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { sessionService } from "redux-react-session";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

/**
 * This condition is only implement for dev environment
 */

const composeEnhancers =
  process.env.REACT_APP_NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;
const persistConfig = {
  key: "root",
  storage,
  whitelist: [""],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

const validateSession = (session) => {
  return true;
};

const options = {
  alixPartnersCheckAuth: true,
  redirectPath: "/",
  driver: "COOKIES",
  expires: null,
  validateSession,
};
sessionService.initSessionService(store, options);

export { store, persistor };
