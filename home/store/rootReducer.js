import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
// import { staticReducers } from './staticReducers';


export default function rootReducer(asyncReducers) {
  return combineReducers({
    // ...staticReducers,
    counterReducer,
    ...asyncReducers,
  });
}
