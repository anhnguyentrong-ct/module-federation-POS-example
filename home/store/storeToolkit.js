import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import ClientConfig from './ClientConfig';
// import { createWrapper } from 'next-redux-wrapper';
import config from '../config';
import createApiMiddleware from './createApiMiddleware';
import { staticReducers } from './staticReducers'

function createRootReducer(asyncReducers = {}) {
  const combinedReducer = combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });

  return combinedReducer;
}

const makeStore = () => {
  const clientConfig = new ClientConfig(config, undefined, undefined);
  const middlewares = [createApiMiddleware(clientConfig)];
  const store = configureStore({
    reducer: createRootReducer(),
    // @ts-ignore
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // temporary turn off because our legacy app-wrapper reducer is using promise in action, a promise can't be serialized
        thunk: true,
        immutableCheck: false, // temporary turn off some legacy reducer is quite large
      }).concat(middlewares),
  });

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {};
  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, reducer) => {
    if (store.asyncReducers[key]) return;
    store.asyncReducers[key] = reducer;
    const newRootReducer = createRootReducer(store.asyncReducers);
    store.replaceReducer(newRootReducer);
  };

  // for RTK
  setupListeners(store.dispatch);

  return store;
};

const asyncStore = makeStore();

export default asyncStore;
