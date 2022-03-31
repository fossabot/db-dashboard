import privKeyReducer from "./privKeyReducer";
import secretReducer from "./secretReducer";
import moatReducer from "./moatReducer";
import dataReducer from "./dataReducer";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  moat: moatReducer,
  privKey: privKeyReducer,
  secret: secretReducer,
  data: dataReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    sessionStorage.removeItem("persist:root");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
