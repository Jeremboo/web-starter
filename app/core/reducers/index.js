import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import text from './text';

export default combineReducers({
  text,
  routing: routerReducer,
});
