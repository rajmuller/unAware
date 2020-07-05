import { createStore, applyMiddleware, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers/reducers";

const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
};

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducers,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
};
