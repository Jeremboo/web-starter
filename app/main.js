import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from 'core/createStore';
import Layout from 'views/Layout';
import HomeView from 'views/HomeView';

// Enable react dev-tools (https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
window.React = React;

const initialState = {};
const store = createStore(initialState);

const history = syncHistoryWithStore(
  browserHistory,
  store,
);

ReactDOM.render(
  <Provider store={store} >
    <Router history={history}>
      <Route path="/" component={Layout} >
        <IndexRoute component={HomeView} />
        <Route path="/home" component={HomeView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
