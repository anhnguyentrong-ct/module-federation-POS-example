export default function createApiMiddleware(client) {
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
