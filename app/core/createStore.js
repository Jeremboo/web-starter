import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from 'core/reducers/index.js';

export default (initialState = {}) => createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
