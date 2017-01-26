import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { Provider } from 'mobx-react';

import Layout from 'views/Layout';
import Home from 'views/Home';

import store from './store';

const history = useRouterHistory(createHistory)({
  basename: window.location.pathname,
  // basename: process.env.BASENAME,
});

export default function Root() {
  return (
    <Provider {...store} >
      <Router history={history}>
        <Route path="/" component={Layout} >
          <IndexRoute component={Home} />
          <Route path="/home" component={Home} />
        </Route>
      </Router>
    </Provider>
  );
}
