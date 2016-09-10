import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import todos from './todos';
import visibilityFilter from './visibilityFilter';
import text from './text';

export default combineReducers({
  todos,
  visibilityFilter,
  text,
  routing: routerReducer,
});
