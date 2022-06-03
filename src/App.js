import React from "react";
import "./App.css";
import Main from "./Main";
import { createStore } from "redux";
import { rootReducer } from "./reducers";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Plus Jakarta Sans",
  },
});

export default function App() {
  const persistConfig = {
    key: "root",
    storage: storageSession,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  let store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  let persistentStore = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistentStore}>
        <ThemeProvider theme={theme}>
          <Main />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
