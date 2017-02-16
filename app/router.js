import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { Provider } from 'mobx-react';

import Layout from 'views/Layout';
import Home from 'views/Home';

import store from './store';

const history = useRouterHistory(createHistory)({
  basename: process.env.BASENAME.length > 0 ? process.env.BASENAME : window.location.pathname,
});

export const openPath = (path) => {
  if (history.getCurrentLocation().pathname !== path) {
    history.push(path);
  }
};

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
