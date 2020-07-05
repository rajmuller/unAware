import { useMemo } from "react";
import { Store } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../store/reducers";

let store: Store | undefined;

function initStore(preloadedState: any) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: true,
  });
}

export const initializeStore = (preloadedState: any) => {
  // eslint-disable-next-line no-underscore-dangle
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

// eslint-disable-next-line no-shadow
export function useStore(initialState: unknown) {
  // eslint-disable-next-line no-shadow
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
