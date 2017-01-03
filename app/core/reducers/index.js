import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import title from './asyncTitle';

export default combineReducers({
  title,
  routing: routerReducer,
});
