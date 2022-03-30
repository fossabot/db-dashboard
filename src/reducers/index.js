import privKeyReducer from "./privKeyReducer";
import secretReducer from "./secretReducer";
import moatReducer from "./moatReducer";
import tableReducer from "./tableReducer";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  moat: moatReducer,
  selected: tableReducer,
  privKey: privKeyReducer,
  secret: secretReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    sessionStorage.removeItem("persist:root");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
