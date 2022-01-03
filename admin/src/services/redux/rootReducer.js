import { combineReducers } from "redux";
import { sessionReducer } from "redux-react-session";
import toastReducer from "./appNotifications/reducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  toast: toastReducer,
})

export default rootReducer
