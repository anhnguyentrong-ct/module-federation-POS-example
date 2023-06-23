import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import ClientConfig from './ClientConfig';
import config from '../config';
import createRootReducer from './rootReducer';

const createThunkMiddleware = (extraArgument) => {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}

/**
 * API Middleware to handle api request side effects and provide consistent api response states
 * This middleware expect an action with the shape of:
 * ```
 * {
 *   types: [LOADING, SUCCESS, FAIL],
 *   promise: (clientConfig) => apiPromise,
 * };
 * ```
 * TODO: need unit test
 * @param {Object} client
 * @returns {Function} api middleware
 */
 export function createApiMiddleware(client) {
  return () => (next) => (action) => {
    const { promise, types, ...rest } = action;
    if (typeof promise !== 'function') {
      return next(action);
    }
    if (types.length !== 3) {
      throw new Error('API Middleware expect 3 action types: [REQUEST, SUCCESS, FAIL]');
    }

    const [REQUEST, SUCCESS, FAIL] = types;
    next({ type: REQUEST, ...rest });
    const actionPromise = promise(client);
    return actionPromise
      .then((result) => next({ result, type: SUCCESS, ...rest }))
      .catch((error) => next({ error, type: FAIL, ...rest }));
  };
}


const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

/**
 * @type {import('next-redux-wrapper').MakeStore<any>}
 * @param {import('next-redux-wrapper').Context & {ctx: any} } context
 * @return {any}
 */
const initStore = (context) => {
  const { ctx = {} } = context;
  const clientConfig = new ClientConfig(config, ctx.req, ctx.res);
  /** @type {Array<any>} */
  const middlewares = [createThunkMiddleware(clientConfig), createApiMiddleware(clientConfig)];
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const store = createStore(createRootReducer(), enhancer);

  store.asyncReducers = {};
  store.injectReducer = (key, reducer) => {
    if (store.asyncReducers[key]) return;
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createRootReducer(store.asyncReducers));
  };
  return store;
};

export const wrapper = createWrapper(initStore);
