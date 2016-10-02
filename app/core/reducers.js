import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import title from 'containers/AsyncTitle/modules/reducers';

export default combineReducers({
  title,
  routing: routerReducer,
});
